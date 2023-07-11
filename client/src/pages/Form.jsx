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
    <form class="w-full max-w-sm">
      <fieldset>
        <legend class="mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-4xl text-gray-800 dark:text-gray-300  hover:text-brightRedLight">
          Edit Item
        </legend>
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label
              class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="title"
            >
              Title
            </label>
          </div>
          <div class="md:w-2/3">
            <input
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 
leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
        </div>
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label
              class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="category"
            >
              Category
            </label>
          </div>
          <div class="md:w-2/3">
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
        </div>
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label
              class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="price"
            >
              Price
            </label>
          </div>
          <div class="md:w-2/3">
            <input
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 
leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              style={{ width: "100%", height: "auto" }}
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
        </div>
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label
              class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="image"
            >
              Image
            </label>
          </div>
          <div class="md:w-2/3">
            <input
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 
leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="image"
              value={img}
              onChange={(e) => setImg(e.target.value)}
              required
            />
          </div>
        </div>
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label
              class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="descript"
            >
              Description
            </label>
          </div>
          <div class="md:w-2/3">
            <textarea
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 
leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="descript"
              value={descript}
              onChange={(e) => setDescript(e.target.value)}
              required
            ></textarea>
          </div>
        </div>
        <div class="md:flex md:items-center">
          <div class="md:w-1/3"></div>
          <div class="md:w-2/3">
            <Link to="/admin">
              <button>Back</button>
            </Link>
            {fetchSuccess ? (
              <button
                class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none 
text-white font-bold py-2 px-4 rounded"
                type="button"
                onClick={editItem}
              >
                Submit
              </button>
            ) : (
              <button
                class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none 
text-white font-bold py-2 px-4 rounded"
                onClick={addHandler}
              >
                ADD
              </button>
            )}
          </div>
        </div>
      </fieldset>
    </form>
  );
}

export default Form;
