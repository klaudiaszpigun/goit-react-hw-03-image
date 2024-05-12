import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from './Button';
import { ImageGallery } from './ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem';
import { Loader } from './Loader';
import { Modal } from './Modal';
import { Searchbar } from './Searchbar';

export const App = () => {
  //
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchedImages, setSearchedImages] = useState('');
  const [totalHits, setTotalHits] = useState(0);
  const [disabledButton, setDisabledButton] = useState(true);
  const [images, setImages] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalSrc, setModalSrc] = useState('');

  // pobieranie danych z API
  const fetchGallery = async (q, page) => {
    const baseURL = `https://pixabay.com/api/?q=${q}&page=${page}&key=42474865-55c278fe0045234625bd75cd9&image_type=photo&orientation=horizontal&per_page=12`;
    try {
      const response = await axios.get(baseURL);
      return response.data;
    } catch (error) {
      console.error('Fetching error:', error);
    }
  };

  // przy zmienieniu strony lub zmienieniu frazy wyszukiwania wykonuje się useEffect który wywołuje pobranie danych z API z podanymi w stateach wartościacch
  useEffect(() => {
    if (!searchedImages) return;

    //fetch value from input
    const fetchSearchedValue = async () => {
      setIsLoading(true);
      await fetchGallery(searchedImages, currentPage)
        .then(results => {
          // jeśli wyników jest mniej niż 12, ustaw stateowi images tablicę obiektów z danymi  i zdezaktywuj przycisk load more
          if (results.hits.length < 12) {
            setImages(results.hits);
            setDisabledButton(true);
          }
          // jeśli wyników jest więcej niż 12 i state currentPage to 1
          else if (currentPage === 1) {
            // aktywuj przycisk load more
            setDisabledButton(false);
            // ustaw stateowi images tablicę obiektów z danymi
            setImages(results.hits);
            // ustaw stateowi totalHits liczbę zdjęć
            setTotalHits(() => results.totalHits);
          }
          // jeśli wyników jest więcej niż 12 i state currentPage nie jest 1 to po prostu wyświetlamy wyniki
          else {
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

  // ładuje więcej wyników => paginacja
  const loadMore = () => {
    // ustawia dla currentPage wartość większą o 1 od poprzedniej
    setCurrentPage(currentPage => currentPage + 1);
    // odejmuje od stateu wszystkich zdjęc 12
    setTotalHits(totalHits => totalHits - 12);
  };

  // przy zmianie inputu wartość inputu zapisuje się w state, a przy przesłaniu formularza pobiera wartość ze stateu i używa ją jako parametru przy wywołaniu funkcji handleValue
  const handleValue = data => {
    setSearchedImages(data);
    setCurrentPage(1);
    setTotalHits(0);
  };

  // przy kliknięciu na zdjęcie w komponencie ImageGalleryItem
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
