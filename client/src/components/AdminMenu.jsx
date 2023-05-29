import React, { useState, useContext } from "react";
import dataJson from "../data.json";
import { Link } from "react-router-dom";
import AppContext from "./Context";
import SearchItem from "./SearcItem";

const AdminMenu = () => {
  const { menuData, setMenuData, setId } = useContext(AppContext);
  const [activeRow, setActiveRow] = useState(null);

  const editHandler = (id) => {
    setId(id);
  };

  function handleClick(rowId) {
    setActiveRow(rowId === activeRow ? null : rowId);
  }

  return (
    <div>
      <SearchItem />
      <h4>Menu Items</h4>
      <button onClick={() => setMenuData(dataJson)}>All</button>
      <table>
        <thead>
          <tr>
            <th className="table-titles">Id</th>
            <th className="table-titles">Title</th>
            <th className="table-titles">Category</th>
            <th className="table-titles">Price</th>
            <th className="table-titles">Image</th>
            <th className="table-titles">Description</th>
            <th className="table-titles">Edit</th>
            <th className="table-titles">Delete</th>
          </tr>
        </thead>

        <tbody>
          {menuData?.map((menuItem) => {
            const { id, title, category, desc, price, img } = menuItem;
            return (
              <tr
                key={id}
                onClick={() => handleClick(id)}
                style={{
                  backgroundColor:
                    menuItem.id === activeRow ? "#c2c1c6" : "#f7f7f7",
                }}
              >
                <td>{id}</td>
                <td>{title}</td>
                <td>{category}</td>
                <td>{price}</td>
                <td>{img}</td>
                <td>{desc}</td>
                <td>
                  <Link to="/editForm">
                    <button onClick={() => editHandler(id)}>Edit</button>
                  </Link>
                </td>
                <td>
                  <button>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminMenu;
