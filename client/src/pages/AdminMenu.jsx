import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AppContext from "../components/Context";
import SearchItem from "../components/SearchItem";

const AdminMenu = () => {
  const { data, setId, adminData, setAdminData } = useContext(AppContext);
  const [activeRow, setActiveRow] = useState(null);
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
    <>
      <div>
        <SearchItem setAdminData={setAdminData} />
        <button onClick={() => setAdminData(data)}>All</button>
      </div>
      <div>
        <Link to="/admin/form">
          <button>ADD ITEM</button>
        </Link>
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
              const { id, title, category, descript, price, img } = menuItem;
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
                  <td>
                    <img src={img} alt={title} style={{ width: "100px" }} />
                  </td>
                  <td>{descript}</td>
                  <td>
                    <Link to="/admin/form">
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
    </>
  );
};

export default AdminMenu;
