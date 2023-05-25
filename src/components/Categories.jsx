import React from "react";

const Categories = ({ categories, filterItems }) => {
  return (
    <section>
      {categories.map((category, index) => {
        return (
          <button
            type="button"
            key={index}
            onClick={() => filterItems(category)}
          >
            {category}
          </button>
        );
      })}
    </section>
  );
};

export default Categories;
<<<<<<< HEAD:src/Categories.jsx

=======
>>>>>>> development:src/components/Categories.jsx
