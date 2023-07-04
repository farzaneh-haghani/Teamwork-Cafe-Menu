import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AppContext from "./Context";
import SearchItem from "./SearchItem";

const AdminMenu = () => {
  const { data, setData, setId } = useContext(AppContext);
  const [activeRow, setActiveRow] = useState(null);
  const [adminData, setAdminData] = useState(data);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    setAdminData(data);
  }, [data, isDeleted]);

  function handleClick(rowId) {
    setActiveRow(rowId === activeRow ? null : rowId);
  }

  const deleteHandler = async (id) => {
    const response = await fetch(`http://localhost:3005/admin/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();

    if (response.ok) {
      const itemIndex = data.findIndex((item) => item.id === id);
      data.splice(itemIndex, 1);
      setIsDeleted(!isDeleted);
    }
    alert("Your item deleted");
  };

  const editHandler = (id) => {
    setId(id);
  };

  return (
    <div>
      <SearchItem setAdminData={setAdminData} />
      <br />
      <br />
      <h4 class="mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-4xl text-gray-800 dark:text-gray-300  hover:text-brightRedLight">
        Menu Items
      </h4>
      <button onClick={() => setAdminData(data)}>All</button>
      <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div class="overflow-hidden">
              <table class="min-w-full text-left text-sm font-light">
                <thead class="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" class="px-6 py-4">
                      Id
                    </th>
                    <th scope="col" class="px-6 py-4">
                      Title
                    </th>
                    <th scope="col" class="px-6 py-4">
                      Category
                    </th>
                    <th scope="col" class="px-6 py-4">
                      Price
                    </th>
                    <th scope="col" class="px-6 py-4">
                      Image
                    </th>
                    <th scope="col" class="px-6 py-4">
                      Description
                    </th>
                    <th scope="col" class="px-6 py-4">
                      Edit
                    </th>
                    <th scope="col" class="px-6 py-4">
                      Delete
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {adminData?.map((menuItem) => {
                    const { id, title, category, descript, price, img } =
                      menuItem;
                    return (
                      <tr
                        class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                        key={id}
                        onClick={() => handleClick(id)}
                        style={{
                          backgroundColor:
                            menuItem.id === activeRow ? "#c2c1c6" : "#f7f7f7",
                        }}
                      >
                        <td class="whitespace-nowrap px-6 py-4 font-medium">
                          {id}
                        </td>
                        <td class="whitespace-nowrap px-6 py-4">{title}</td>
                        <td class="whitespace-nowrap px-6 py-4">{category}</td>
                        <td class="whitespace-nowrap px-6 py-4">{price}</td>
                        <td class="whitespace-nowrap px-6 py-4">{img}</td>
                        <td class="whitespace-nowrap px-6 py-4">{descript}</td>
                        <td class="whitespace-nowrap px-6 py-4">
                          <Link to="/editForm">
                            <button onClick={() => editHandler(id)}>
                              Edit
                            </button>
                          </Link>
                        </td>
                        <td class="whitespace-nowrap px-6 py-4">
                          <button onClick={() => deleteHandler(id)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMenu;
