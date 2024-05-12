import { useEffect, useState } from 'react';
import { Button } from './Button';
import { ImageGallery } from './ImageGallery';
import { Loader } from './Loader';
import { Modal } from './Modal';
import { Searchbar } from './Searchbar';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState('');

  const handleSearch = newQuery => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const handleImageClick = imageUrl => {
    setSelectedImageUrl(imageUrl);
  };

  const handleCloseModal = () => {
    setSelectedImageUrl('');
  };

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://pixabay.com/api/?q=${query}&page=${page}&key=42409060-380322e351fb08456a6a2d09f&image_type=photo&orientation=horizontal&per_page=12`
        );
        const data = await response.json();
        setImages(prevImages => [...prevImages, ...data.hits]);
        setPage(prevPage => prevPage + 1);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  });

  return (
    <div className="app">
      <Searchbar onSubmit={handleSearch} />
      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={handleImageClick} />
      )}
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && (
        <Button onClick={() => setPage(page + 1)} isDisabled={isLoading} />
      )}
      {selectedImageUrl && (
        <Modal imageUrl={selectedImageUrl} onClose={handleCloseModal} />
      )}
    </div>
  );
};
