import React, { useState, useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { Searchbar } from './Searchbar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import { Modal } from './Modal/Modal';
import * as API from '../API/api';
import { AppStyle } from './App.styled';

const Status = {
  PENDING: 'pending',
  RESOLVED: 'resolved',
  ERROR: 'error',
  MODAL: 'modal',
};

export const App = () => {
  const [filter, setFilter] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState('');
  const [currentImage, setCurrentImage] = useState(null);

  const myRef = React.createRef();

  useEffect(() => {
    const fetchImages = async () => {
      if (filter === '') {
        setStatus(Status.ERROR);
        return;
      }

      setStatus(Status.PENDING);

      try {
        const { hits, total } = await API.getImages(filter, page);
        setImages(prevImages => [...prevImages, ...hits]);
        setStatus(Status.RESOLVED);
        setTotal(total);

        if (hits.length === 0) {
          setStatus(Status.ERROR);
          toast.error('No image found');
        }
      } catch (error) {
        setStatus(Status.ERROR);
      }
    };

    fetchImages();
  }, [page, filter]);
  const handleSearchbarSubmit = userFilter => {
    if (filter === userFilter) {
      return;
    }
    setImages([]);
    setFilter(userFilter);
    setPage(1);
  };

  const handleLoadMoreButtonClick = () => {
    setPage(prevPage => prevPage + 1);
    setTimeout(() => myRef.current.scrollIntoView(), 1000);
  };

  const handleImageClick = userImage => {
    setCurrentImage(userImage);
    setStatus(Status.MODAL);
  };

  const handleModalClose = () => {
    setStatus(Status.RESOLVED);
  };

  return (
    <AppStyle>
      <Searchbar onSubmit={handleSearchbarSubmit} />
      {images.length !== 0 && (
        <>
          <ImageGallery images={images} onClick={handleImageClick} />
          {status === 'resolved' && images.length !== total && (
            <div
              ref={myRef}
              style={{
                marginRight: 'auto',
                marginLeft: 'auto',
                maxHeight: '40px',
              }}
            >
              <Button text="Load more" onClick={handleLoadMoreButtonClick} />
            </div>
          )}
        </>
      )}
      {status === Status.PENDING && <Loader />}
      <Toaster position="top-center" />
      {status === Status.MODAL && (
        <Modal ref={myRef} image={currentImage} onClose={handleModalClose} />
      )}
    </AppStyle>
  );
};
