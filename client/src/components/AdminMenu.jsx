
import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AppContext from "./Context";
import SearchItem from "./SearcItem";

const AdminMenu = () => {
  const { data } = useContext(AppContext);
  const [menuData, setMenuData] = useState(data);

  useEffect(() => {
    setMenuData(data)
  }, [data]);

    const { setId } = useContext(AppContext);
    let [activeRow, setActiveRow] = useState(null);

    function handleClick(rowId) {
        setActiveRow(rowId === activeRow ? null : rowId);
      }

      const editHandler = (id) => {
        setId(id);
      };

  return (
    <div>
      <SearchItem setMenuData={setMenuData}/>
      <h4>Menu Items</h4>
      <button onClick={() => setMenuData(data)}>All</button>
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
            return (
              <tr key={menuItem.id}
                onClick={() => handleClick(menuItem.id)}
                style={{
                  backgroundColor: menuItem.id === activeRow ? "#c2c1c6" : "#f7f7f7"
                }}
              >
                <td>{menuItem.id}</td>
                <td>{menuItem.title}</td>
                <td>{menuItem.category}</td>
                <td>{menuItem.price}</td>
                <td>{menuItem.img}</td>
                <td>{menuItem.desc}</td>
                <td><Link to ="/editForm"> <button onClick={() => editHandler(menuItem.id)}>Edit</button></Link></td>
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
}

export default AdminMenu;

