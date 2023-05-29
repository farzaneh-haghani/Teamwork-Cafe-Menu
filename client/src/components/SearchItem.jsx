import { useState, useContext } from "react";
import AppContext from "./Context";

function SearchItem({ setAdminData }) {
  const [keyword, setKeyword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    fetch(`http://localhost:3005/admin/q?str=${keyword}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("No items match.");
        }
        return response.json();
      })
      .then((data) => {
        setAdminData(data);
        setKeyword("");
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
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
      <button>Search</button>
    </form>
  );
}

export default SearchItem;
