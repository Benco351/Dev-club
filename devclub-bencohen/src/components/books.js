import React, { useState, useEffect } from "react";
import { getDatagoogle, onChangeinput } from "../assets/constants";
const Books = () => {
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
    <div className="container">
      <span>Search:</span>
      <input value={input} name="query" type="text" onChange={onChangeinput} />

      <button className="btn-1">search</button>

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
      {loadinginfo && (
        <div className="details">
          <span>Author: {specificBook.authors} </span>
          <br></br>
          <span>Publish year: {specificBook.publishedDate}</span>
        </div>
      )}
      <button className="wishlist btn" onClick={handleWishList}>
        add to wishList
      </button>
      {wishlist?.map((element, index) => (
        <div key={index + "abc"} className="wishlist">
          {element}
        </div>
      ))}
    </div>
  );
};
export default Books;
