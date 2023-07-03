import React, { useContext, useEffect, useState } from "react";
import AppContext from "../components/Context";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

function Form() {
  const { id, setId, data, setData, setAdminData } = useContext(AppContext);

  const [fetchSuccess, setFetchSuccess] = useState(false);
  const [title, setTitle] = useState("");
  const [descript, setDescript] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState("");
  const navigate = useNavigate();

  const fetchEditData = async () => {
    try {
      const res = await fetch(`http://localhost:3005/admin/meals/${id}/edit`);
      if (!res.ok) {
        throw new Error("Failed to find menu item");
      }
      const editData = await res.json();
      setFetchSuccess(true);
      setCategory(editData.category);
      setDescript(editData.descript);
      setImg(editData.img);
      setTitle(editData.title);
      setPrice(editData.price);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEditData();
    // eslint-disable-next-line
  }, []);

  const editItem = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3005/admin/meals/${id}/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          category: category,
          price: price,
          img: img,
          descript: descript,
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to update menu item");
      }
      const { item: updatedItem } = await res.json();
      const updatedMenuItems = data.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      );
      setData(updatedMenuItems);
      alert("Successfully updated menu item.");
    } catch (error) {
      alert(error);
      console.error(error);
    } finally {
      setId(0);
      navigate("/admin");
    }
  };

  const addHandler = async (e) => {
    e.preventDefault();
    if (!title && !category && !price && !img && !descript) {
      alert("Please Fill all * fields!");
      return;
    }
    try {
      const res = await fetch("http://localhost:3005/admin/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          category,
          price,
          img,
          descript,
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to add your item!");
      }
      const { item } = await res.json();
      data.push(item);
      setData(data);
      setAdminData(data);
      alert("Your Item Added!");
    } catch (err) {
      console.error(err);
    } finally {
      navigate("/admin");
    }
  };

  return (
    <form>
      <fieldset>
        <legend>Edit Item</legend>
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="category">Category</label>
          <select
            name="category"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="" disabled>
              Choose one
            </option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
          </select>
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            style={{ width: "100%", height: "auto" }}
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="image">Image</label>
          <input
            id="image"
            value={img}
            onChange={(e) => setImg(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="descript">Description</label>
          <textarea
            id="descript"
            value={descript}
            onChange={(e) => setDescript(e.target.value)}
            required
          ></textarea>
        </div>
        <Link to="/admin">
          <button>Back</button>
        </Link>
        {fetchSuccess ? (
          <button type="button" onClick={editItem}>
            Submit
          </button>
        ) : (
          <button onClick={addHandler}>ADD</button>
        )}
      </fieldset>
    </form>
  );
}

export default Form;
