import React, { useState, useEffect } from "react";
import Axios from "axios";

const BOOKMARKED_RECIPES_URL = "http://localhost:8080/favorites";

export const BookmarkedRecipesContext = React.createContext();

export const BookmarkedRecipesProvider = (props) => {
  const [bookmarkedRecipes, setBookmarkedRecipes] = useState([]);

  const bookmarkedTheme = {
    color: "yellow",
  };

  const defaultTheme = {
    color: "grey",
  };

  const getData = () => {
    Axios.get(BOOKMARKED_RECIPES_URL).then((resp) =>
      setBookmarkedRecipes(resp.data)
    );
  };

  const updateData = (data) => {
    Axios.put(BOOKMARKED_RECIPES_URL, data, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => {
      setBookmarkedRecipes(resp.data);
    });
  };

  const escapeUriCharacters = (uri) => {
    return uri.replace(/\//g, "%2F").replace(/:/g, "%3A").replace(/#/g, "%23");
  };

  const checkIfBookmarked = (uri) => {
    return bookmarkedRecipes.includes(escapeUriCharacters(uri));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <BookmarkedRecipesContext.Provider
      value={{
        updateData,
        escapeUriCharacters,
        checkIfBookmarked,
        bookmarkedTheme,
        defaultTheme,
      }}
    >
      {props.children}
    </BookmarkedRecipesContext.Provider>
  );
};