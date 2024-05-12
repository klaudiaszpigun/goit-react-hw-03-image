import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from './Button';
import { ImageGallery } from './ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem';
import { Loader } from './Loader';
import { Modal } from './Modal';
import { Searchbar } from './Searchbar';

export const App = () => {
  //State
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchedImages, setSearchedImages] = useState('');
  const [totalHits, setTotalHits] = useState(0);
  const [disabledButton, setDisabledButton] = useState(true);
  const [images, setImages] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalSrc, setModalSrc] = useState('');

  const fetchGallery = async (q, page) => {
    const baseURL = `https://pixabay.com/api/?q=${q}&page=${page}&key=42474865-55c278fe0045234625bd75cd9&image_type=photo&orientation=horizontal&per_page=12`;
    try {
      const response = await axios.get(baseURL);
      return response.data;
    } catch (error) {
      console.error('Fetching error:', error);
    }
  };

  useEffect(() => {
    if (!searchedImages) return;

    //fetch value from input
    const fetchSearchedValue = async () => {
      setIsLoading(true);
      await fetchGallery(searchedImages, currentPage)
        .then(results => {
          //if less than 12 results, turn off the button
          if (results.hits.length < 12) {
            setImages(results.hits);
            setDisabledButton(true);
          } else if (currentPage === 1) {
            setDisabledButton(false);
            setImages(results.hits);
            setTotalHits(() => results.totalHits);
          } else {
            setImages(results.hits);
          }
        })
        .catch(e => {
          console.error(e);
        });

      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };

    fetchSearchedValue();
  }, [searchedImages, currentPage]);

  //load more images
  const loadMore = () => {
    setCurrentPage(currentPage => currentPage + 1);
    setTotalHits(totalHits => totalHits - 12);
  };

  //handle data from searchbar
  const handleValue = data => {
    setSearchedImages(data);
    setCurrentPage(1);
    setTotalHits(0);
  };

  //Modal- handle data from image and change the state to open/close modal
  const handleImageClick = image => {
    setOpenModal(true);
    setModalSrc(image.largeImageURL);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <Searchbar handleValue={handleValue} />
      <ImageGallery>
        {isLoading ? (
          <Loader />
        ) : (
          <ImageGalleryItem images={images} onClick={handleImageClick} />
        )}
      </ImageGallery>
      {totalHits !== 0 && (
        <Button disabled={disabledButton} onClick={loadMore} />
      )}
      {openModal && <Modal onClick={closeModal} openModal={modalSrc} />}
    </div>
  );
};
