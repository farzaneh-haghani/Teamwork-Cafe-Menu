import React, { useState } from "react";
// import AppContext from "./Context";

function Add() {
  const { id, setId } = useState();

  const [title, setTitle] = useState();
  const [descript, setDescript] = useState();
  const [category, setCategory] = useState();
  const [price, setPrice] = useState();
  const [img, setImg] = useState();

  const addItem = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3005/AddForm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, title, descript, category, price, img }),
    });
    const data = await res.json();
    console.log({ data });
  };

  return (
    <div>
      <h4>Add Item</h4>

      <label for="id"> id</label>
      <input id="id" placeholder="Id" onChange={(e) => setId(e.target.value)} />
      <br />
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
        onChange={(e) => setDescript(e.target.value)}
      ></textarea>
      <br />

      <button onClick={addItem}>Submit</button>
    </div>
  );
}

export default Add;
