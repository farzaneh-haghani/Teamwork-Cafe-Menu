import React from "react";
import items from "../data.json";
import { Link } from "react-router-dom";
const AdminMenu = () => {
  return (
    <div className="section-center">
      <table>
        <tr>
          <th>Id</th>
          <th>Image</th>
          <th>Item</th>
          <th>Description</th>
          <th>Price</th>
        </tr>
        {items.map((menuItem) => {
          const { id, title, desc, price, img } = menuItem;
          return (
            <tr key={id}>
              <td></td>
              <td>{title}</td>
              <td>{desc}</td>
              <td>{price}</td>
              <td>
                <Link to="/editForm">
                  <button>Edit</button>
                </Link>
              </td>

              <td>
                <button>Delete</button>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default AdminMenu;
