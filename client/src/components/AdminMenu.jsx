import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AppContext from "./Context";
import SearchItem from "./SearchItem";

const AdminMenu = () => {
  const { data, setId } = useContext(AppContext);
  const [activeRow, setActiveRow] = useState(null);
  const [adminData, setAdminData] = useState(data);

  useEffect(() => {
    setAdminData(data);
  }, [data]);

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
    const data = await response.json();
    setAdminData(data);
    alert("Your item deleted");
  };

  const editHandler = (id) => {
    setId(id);
  };

  return (
    <div>
      <SearchItem setAdminData={setAdminData} />
      <h4>Menu Items</h4>
      <button onClick={() => setAdminData(data)}>All</button>

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
          {adminData?.map((menuItem) => {
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
                  <button onClick={() => deleteHandler(id)}>Delete</button>
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
