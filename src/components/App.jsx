import { useState } from 'react';
import { Button } from './Button';
import { ImageGallery } from './ImageGallery';
import { Loader } from './Loader';
import { Modal } from './Modal';
import { Searchbar } from './Searchbar';

const API_KEY = '42409060-380322e351fb08456a6a2d09f';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState('');

  const handleSubmit = async query => {
    setQuery(query);
    setImages([]);
    setLoading(true);
    try {
      const response = await fetch(
        `https://pixabay.com/api/?q=${query}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );
      const data = await response.json();
      setImages(data.hits);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://pixabay.com/api/?q=${query}&page=${
          Math.floor(images.length / 12) + 1
        }&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );
      const data = await response.json();
      setImages(prevImages => [...prevImages, ...data.hits]);
    } catch (error) {
      console.error('Error fetching more images:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageClick = imageUrl => {
    setModalImageUrl(imageUrl);
  };

  const closeModal = () => {
    setModalImageUrl('');
  };

  return (
    <div>
      <Searchbar onSubmit={handleSubmit} />
      {loading && <Loader />}
      {images.length > 0 && (
        <>
          <ImageGallery images={images} onImageClick={handleImageClick} />
          <Button onClick={handleLoadMore}>Load more</Button>
        </>
      )}
      {modalImageUrl && <Modal imageUrl={modalImageUrl} onClose={closeModal} />}
    </div>
  );
};
