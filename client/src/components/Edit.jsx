import React, { useContext, useState } from "react";
import AppContext from "./Context";

function Edit() {
  const { id } = useContext(AppContext);

  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();
  const [category, setCategory] = useState();
  const [price, setPrice] = useState();
  const [img, setImg] = useState();

  const editItem = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3005/editForm", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, title, desc, category, price, img }),
    });
    const data = await res.json();
    console.log({ data });
  };

  // Populate Post
  //////////////////////////////////////////
  //  const populatePost = (key, title, content) => {
  //   setUpdateID(key);
  //   setUpdateTitle(title);
  //   setUpdateContent(content);
  // }

  return (
    <div>
      <h4>Edit Item</h4>
      <label for="title"> Title</label>
      <input
        id="title"
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <label for="category">Category</label>
      <input
        id="category"
        placeholder="Category"
        onChange={(e) => setCategory(e.target.value)}
      />
      <br />
      <label for="price"> Price</label>
      <input
        id="price"
        placeholder="Price"
        onChange={(e) => setPrice(e.target.value)}
      />
      <br />
      <label for="image"> Image</label>
      <input
        id="image"
        placeholder="Image"
        onChange={(e) => setImg(e.target.value)}
      />
      <br />
      <textarea
        placeholder="Description"
        onChange={(e) => setDesc(e.target.value)}
      ></textarea>
      <br />
      <button onClick={editItem}>Submit Change</button>
    </div>
  );
}

export default Edit;
