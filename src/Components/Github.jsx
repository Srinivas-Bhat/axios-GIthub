import React, { useEffect, useState } from "react";
import { fetchUsers } from "./FetchUsers";

function Github() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  useEffect(() => {
    handleSearch(query, page, limit);
  }, [page, limit]);
  const handleSearch = () => {
    setLoading(true);
    setError(false);
    fetchUsers(query, page, limit)
      .then((res) => {
        console.log(res.data.items);
        setData(res.data.items);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  console.log(page);

  return (
    <div>
      <h1>GITHUB</h1>
      {loading && <h2>Loading...!!</h2>}
      {error ? <h2>Error....!!</h2> : null}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <select name="" id="" onChange={(e) => setLimit(e.target.value)}>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
      </select>
      <br />
      <hr />
      {data.map((el) => (
        <div
          key={el.id}
          style={{
            display: "flex",
            width: "350px",
            gap: "30px",
            marginBottom: "30px",
            margin: "auto",
            border: "1px solid #e1e1e1"
          }}
        >
          <img src={el.avatar_url} alt="" width="80px" height="80px" />
          <h2>{el.login}</h2>
        </div>
      ))}
      <button onClick={() => setPage(page - 1)}>Prev</button>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
}

export default Github;
