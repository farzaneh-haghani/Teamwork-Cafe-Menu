import { useState } from "react";

function SearchItem({setMenuData}) {
  const [keyword, setKeyword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setKeyword("");
      fetch(`http://localhost:3005/menu/q?str=${keyword}`)
        .then((response) => {
          if (!response.ok){
              throw new Error("No items match.");
          }
          return response.json()})
        .then((data) => {
          setMenuData(data);
        })
        .catch((error) => {
        console.log(error);
        alert(error);
        })
  }

  return (
    <form onSubmit={handleSubmit}>
    <legend>Search Items</legend>
    <label htmlFor="keyword">Keyword</label>
    <input
      value={keyword}
      onChange={(event) => setKeyword(event.target.value)}
      type="text"
      id="keyword"
      name="keyword"
    />
    <button>Seach</button>
  </form>
  );
}

export default SearchItem;
