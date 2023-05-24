import { useEffect, useRef, useState } from "react";
import { Searchbar } from "./components/Searchbar/Searchbar";
import { ImageGallery } from "./components/ImageGallery/ImageGallery";
import { MyModal } from "./components/Modal/Modal";
import { Loader } from "./components/Loader/Loader";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import Button from "@mui/material/Button";

import "./App.css";

const API_KEY = "35565772-7bd4f47208013e8d69d75afde";
const URL = "https://pixabay.com/api/";
const per_page = 12;

export const App = () => {
  const [images, setImages] = useState([]);
  const [searchedWord, setSearchedWord] = useState("");
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(null);
  const [clickedImg, setClickedImg] = useState("");
  const [isModalShown, setIsModalShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // state = {
  //   images: [],
  //   searchedWord: "",
  //   page: 1,
  //   totalHits: null,
  //   clickedImg: "",
  //   isModalShown: false,
  //   isLoading: false,
  //   error: null,
  // };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formatedString = evt.currentTarget.elements.input.value
      .split(" ")
      .join("+");
    setSearchedWord(formatedString);
  };

  const handleClick = () => {
    setPage(page + 1);
  };

  const onShowModal = (clickedImg) => {
    setClickedImg(clickedImg);
    setIsModalShown(true);
  };

  const onCloseModal = () => {
    setIsModalShown(false);
  };

  const fetchImgs = async () => {
    return fetch(
      `${URL}?key=${API_KEY}&q=${searchedWord}&image_type=photo&orientation=horizontal&per_page=${per_page}&page=${page}`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(new Error("Failed to find any images"));
        }
      })
      .then((imagesData) => {
        if (!imagesData.total) {
          console.log("Did found anything :(");
          Notify.warning("Nothing found for this selection, try again");
          setIsLoading(false);
        } else {
          const selectedProperties = imagesData.hits.map(
            ({ id, webformatURL, largeImageURL }) => {
              return { id, webformatURL, largeImageURL };
            }
          );
          setIsLoading(false);
          setImages((prevState) => [...prevState, ...selectedProperties]);
          setTotalHits(imagesData.totalHits);
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (searchedWord) {
      setPage(1);
      setTotalHits(null);
      setImages([]);
      setIsLoading(true);
      fetchImgs();
    }
  }, [searchedWord]);

  useEffect(() => {
    if (page > 1) {
      setIsLoading(true);
      fetchImgs();
    }
  }, [page]);

  return (
    <>
      {isModalShown && (
        <MyModal clickedImg={clickedImg} onClose={onCloseModal} />
      )}
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery images={images} openImg={onShowModal} />
      {isLoading ? (
        <Loader />
      ) : (
        totalHits / per_page > page && (
          <Button variant="outlined" onClick={handleClick}>
            Load More
          </Button>
        )
      )}
    </>
  );
};

export default App;
