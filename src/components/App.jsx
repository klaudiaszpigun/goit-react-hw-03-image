import { useState } from 'react';
//import '../index.css';
import { Button } from './Button';
import { ImageGallery } from './ImageGallery';
import { Loader } from './Loader';
import { Searchbar } from './Searchbar';

const API_KEY = '42409060-380322e351fb08456a6a2d09f';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="div">
      <div className="container">
        <Searchbar onSubmit={handleSubmit} />
        {loading && <Loader />}
        {images.length > 0 && (
          <>
            <ImageGallery images={images} />
            <Button className="button" onClick={handleLoadMore}>
              Load more
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
