import React, { useState, useEffect } from "react";
import { getCategories, list } from "./apiCore";
import Card from "./Card";

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: "",
    search: "",
    results: [],
    searched: false,
  });

  const { categories, category, search, results, searched } = data;

  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData({ ...data, categories: data });
      }
    });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const searchData = () => {
    if (search) {
      list({ search: search || undefined, category: category }).then(
        (response) => {
          if (response.error) {
            console.log(response.error);
          } else {
            setData({ ...data, results: response, searched: true });
          }
        }
      );
    }
  };

  const searchSubmit = (e) => {
    e.preventDefault();
    searchData();
  };

  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value, searched: false });
  };

  const searchMessage = (searched, results) => {
    if (searched && results.length > 0) {
      return `Found ${results.length} products`;
    }
    if (searched && results.length < 1) {
      return `No products found`;
    }
  };

  const searchedProducts = (results = []) => {
    return (
      <div>
        <h2 className='mt-4 mb-4'>{searchMessage(searched, results)}</h2>
        <div className='row'>
          {results.map((product, i) => (
            <div className='col-4 mb-3'>
              <Card key={i} product={product} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const searchForm = () => (
    <div>
      <form onSubmit={searchSubmit}>
        <span className=''>
          <div className='search-bar'>
            <div className='custom-select'>
              <select className='' onChange={handleChange("category")}>
                <option value='All'>All</option>
                {categories.map((c, i) => (
                  <option key={i} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <input
              type='search'
              className='form-control'
              onChange={handleChange("search")}
              placeholder='What are you looking for?'
              style={{ fontSize: "15px" }}
            />
          </div>
          <div className='' style={{ border: "none" }}>
            <button className=''>Search</button>
          </div>
        </span>
      </form>
    </div>
  );

  return (
    <div className='row search-field'>
      <div className='container mb-3'>{searchForm()}</div>
      <div className='container-fluid mb-3'>{searchedProducts(results)}</div>
    </div>
  );
};

export default Search;
