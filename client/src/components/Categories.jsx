import React from "react";

const Categories = ({ categories, filterItems }) => {
  return (
    <section class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
      <ul class="flex flex-wrap -mb-px">
        {categories.sort().map((category, index) => {
          return (
            <li
              class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 mr-2 cursor-pointer"
              type="button"
              key={index}
              onClick={() => filterItems(category)}
            >
              {category}
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Categories;
