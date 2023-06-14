import React from "react";
import "../App.css";

const Menu = ({ items }) => {
  return (
    <div class="grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items?.map((menuItem) => {
        const { id, title, img, descript, price } = menuItem;
        return (
          <article
            key={id}
            class="my-8 rounded shadow-lg shadow-gray-200 dark:shadow-gray-900 bg-white dark:bg-gray-800 duration-300 hover:-translate-y-1 cursor-pointer"
          >
            <img
              src={img}
              alt={title}
              class="rounded-t h-72 w-full object-cover"
            />
            <div class="p-8 text-left">
              <header class="text-lg mb-4 font-bold leading-relaxed text-gray-800 dark:text-gray-300">
                <h4 class="mt-3 font-semibold text-lg">{title}</h4>
                <h4>£{Math.floor(price) * 10}</h4>
              </header>
              <p class="leading-5 text-gray-500 dark:text-gray-400">
                {descript}
              </p>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default Menu;
