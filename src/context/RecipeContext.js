import React, { createContext, useState, useEffect } from "react";
import Axios from "axios";

export const RecipeContext = createContext();

export const RecipeProvider = (props) => {
  const API_ID = "29f808e6";
  const API_KEY = "172c8533603f02665a8920e3ee1ea944";
  const [queryString, setQueryString] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [indexOfFromInUrl, setIndexOfFromInUrl] = useState(0);
  const [indexOfToInUrl, setIndexOfToInUrl] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterQuery, setFilterQuery] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const search = (searchQuery, filterQuery) => {
    setSearchQuery(searchQuery);
    setFilterQuery(filterQuery);
    const actualUrl = `https://api.edamam.com/search?q=${searchQuery}&app_id=${API_ID}&app_key=${API_KEY}${filterQuery}`;
    if (actualUrl !== queryString) {
      setIndexOfFromInUrl(0);
      setIndexOfToInUrl(10);
      setLoading(true);
      setRecipes([]);
      setQueryString(actualUrl);
    }
  };

  const loadMoreRecipes = () => {
    const actualUrl = `https://api.edamam.com/search?q=${searchQuery}&app_id=${API_ID}&app_key=${API_KEY}&from=${indexOfFromInUrl}&to=${indexOfToInUrl}${filterQuery}`;
    setQueryString(actualUrl);
  };

  const getData = (url) => {
    Axios.get(url).then((resp) =>
      resp.data.hits.map((data) =>
        setRecipes((prevRecipes) => [...prevRecipes, data.recipe])
      )
    );
  };

  useEffect(() => {
    setTimeout(() => {
      if (recipes.length === 0) {
        setLoading(false);
      }
    }, 2500);
  }, [recipes]);

  useEffect(() => {
    if (queryString !== "") {
      getData(queryString);
      setIndexOfFromInUrl((index) => index + 10);
      setIndexOfToInUrl((index) => index + 10);
    }
  }, [queryString]);

  useEffect(() => {}, [loading]);

  return (
    <RecipeContext.Provider
      value={{
        search,
        queryString,
        recipes,
        loading,
        setLoading,
        selectedRecipe,
        setSelectedRecipe,
        loadMoreRecipes,
      }}
    >
      {props.children}
    </RecipeContext.Provider>
  );
};
