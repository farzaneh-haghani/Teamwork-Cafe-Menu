import React, { useEffect } from "react";
import { useState, useContext } from "react";
import Category from "./Categories";
import Menu from "./Menu";
import AppContext from "./Context";

const Home = () => {
  const { data } = useContext(AppContext);

  const [menuItems, setMenuItems] = useState(data);
  const allCategories = ["all", ...new Set(data.map((item) => item.category))];

  useEffect(() => {
    setMenuItems(data);
  }, [data]);

  const filterItems = (category) => {
    if (category === "all") {
      setMenuItems(data);
      return;
    }
    const newItems = data.filter((item) => item.category === category);
    setMenuItems(newItems);
  };

  return (
    <div className="App">
      <h2>
        <u>Our Menu</u>
      </h2>
      <Category categories={allCategories} filterItems={filterItems} />
      <Menu items={menuItems} />
    </div>
  );
};

export default Home;
