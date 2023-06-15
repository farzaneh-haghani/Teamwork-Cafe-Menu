import React, { useContext, useEffect, useState } from "react";
import AppContext from "./Context";

function Edit() {
  const { id, data, setData } = useContext(AppContext);

  const [fetchSuccess, setFetchSuccess] = useState(false);
  const [title, setTitle] = useState("");
  const [descript, setDescript] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState("");

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
    } catch (error) {
      alert(error);
      console.error(error);
    } finally {
      alert("Successfully updated menu item.")
    }
  };
return (
  <>
    {fetchSuccess && (
  <form>
    <fieldset>
      <legend>Edit Item</legend>

      <div>
        <label htmlFor="title">Title</label>
        <input
          style={{ width: '100%', height: 'auto' }}
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="category">Category</label>
        <input
          style={{ width: '100%', height: 'auto' }}
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="price">Price</label>
        <input
          style={{ width: '100%', height: 'auto' }}
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="image">Image</label>
        <input
           style={{ width: '100%', height: 'auto' }}
          id="image"
          value={img}
          onChange={(e) => setImg(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="descript">Description</label>
        <textarea
           style={{ width: '100%', height: 'auto' }}
          id="descript"
          value={descript}
          onChange={(e) => setDescript(e.target.value)}
        ></textarea>
      </div>

      <button type="button" onClick={editItem}>Submit Change</button>
    </fieldset>
  </form>
)}
  </>
);

}

export default Edit;
