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
    <div class="bg-gray-100 dark:bg-gray-900 py-10 px-12 text-center">
      <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-4xl lg:text-4xl text-gray-800 dark:text-gray-300  hover:text-brightRedLight">
        Add Item
      </h1>
      <br />
      <br />
      <form class="w-full max-w-sm">
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label
              class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              for="id"
            >
              {" "}
              Id
            </label>
          </div>
          <div class="md:w-1/3">
            <input
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 
leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="id"
              placeholder="Id"
              onChange={(e) => setId(e.target.value)}
            />
          </div>
        </div>
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label
              class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              for="title"
            >
              {" "}
              Title
            </label>
          </div>
          <div class="md:w-1/3">
            <input
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 
leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="title"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label for="category">Category</label>
          </div>
          <div class="md:w-1/3">
            <input
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 
leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="category"
              placeholder="Category"
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
        </div>
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label for="price"> Price</label>
          </div>
          <div class="md:w-1/3">
            <input
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 
leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="price"
              placeholder="Price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label for="image"> Image</label>
          </div>
          <div class="md:w-1/3">
            <input
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 
leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="image"
              placeholder="Image"
              onChange={(e) => setImg(e.target.value)}
            />
          </div>
        </div>

        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label for="text"> Description</label>
          </div>
          <div class="md:w-1/3">
            <textarea
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 
leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              placeholder="Description"
              onChange={(e) => setDescript(e.target.value)}
            ></textarea>
          </div>
        </div>

        <div class="md:flex md:items-center">
          <div class="md:w-1/3"></div>
          <div class="md:w-2/3">
            <button
              class="shadow bg-brightRed hover:bg-purple-400 focus:shadow-outline focus:outline-none 
text-white font-bold py-2 px-4 rounded"
              type="button"
              onClick={addItem}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Add;
