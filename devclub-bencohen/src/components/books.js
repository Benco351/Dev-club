import React, { useState, useEffect } from "react";
import { getDatagoogle, onChangeinput } from "../assets/constants";
import { Grid } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  divider: {
    width: "100%",
    height: "0.1ch",
    maxWidth: 1200,
    backgroundColor: "theme.palette.background.paper",
    margin: "11px 0px 11px 0px",
  },
  root: {
    backgroundColor: "var(--main-color-regular)",
    width: "50%",
    borderRight: "1px solid var(--main-color-light)",
    overflow: "hidden",
  },
});
const Books = () => {
  const classes = useStyles();
  const [input, setInput] = useState("");
  const [loadinginfo, setLoadingInfo] = useState(false);
  const [books, setBooks] = useState([]);
  const [specificBook, setSpecificBook] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const onChangeinput = (e) => {
    setInput(e.target.value);
  };

  const getBooks = async () => {
    if (input.length >= 3 && input.length <= 10) {
      const response = await getDatagoogle(input);
      setBooks(response.data.items);
      return response.data;
    }
  };

  const showBookInfo = (e) => {
    const element = e.target.innerText;
    const response = books.find((book) => {
      if (book.volumeInfo.title === element) {
        return book.volumeInfo;
      }
    });
    setSpecificBook(response["volumeInfo"]);
    setLoadingInfo(true);
  };

  const handleWishList = () => {
    setWishlist([...wishlist, specificBook.title]);
  };

  useEffect(() => {
    getBooks();
  }, [input]);

  return (
    <>
      <Grid item container className={classes.root}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <div class="container">
            <span>Search:</span>
            <input
              value={input}
              name="query"
              type="text"
              onChange={onChangeinput}
            />
          </div>
        </Grid>
        <Divider className={classes.divider} />
        {books?.length > 0 && (
          <div className="books">
            <ul>
              {books?.map((book, index) => (
                <li key={index} onClick={showBookInfo}>
                  {book.volumeInfo.title}
                </li>
              ))}
            </ul>
          </div>
        )}
        <Divider className={classes.divider} />
        {loadinginfo && (
          <div className="details">
            <span>Author: {specificBook.authors} </span>
            <br></br>
            <span>Publish year: {specificBook.publishedDate}</span>
          </div>
        )}
        <Divider className={classes.divider} />
        <button className="wishlist btn" onClick={handleWishList}>
          add to wishList
        </button>
        <Divider className={classes.divider} />
        {wishlist?.map((element, index) => (
          <p>
            <div key={index + "abc"} className="wishlist">
              {element}
            </div>
          </p>
        ))}
      </Grid>
    </>
  );
};
export default Books;
