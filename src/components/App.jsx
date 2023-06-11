import { useState, useEffect } from 'react';
// import PropTypes from 'prop-types'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Api from 'services/Api';

import { SearchbarEl } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';

import { AppContainer } from './App.module';

const serviceApi = new Api();


export const App = () => {

  const [galleryItems, setGalleryItems] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasButton, setHasButton] = useState(false);
  const [error, setError] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (inputValue === '') return;

    const handleFetchItems = (nextQuery, nextPage) => {
      setLoading( true );
      setError( false );

      serviceApi.query = nextQuery;
      serviceApi.page = nextPage;

      serviceApi
        .fetchData()
        .then(data => {

          if (!data.totalHits || data.hits.length === 0) {
            return toast.error(
              'Sorry, we could not find any images matching your request. Please try again.'
            );
          }

          serviceApi.hits = data.totalHits;

          const fetchedData = data.hits.map(
            ({ webformatURL, largeImageURL, id, tags }) => ({
              webformatURL,
              largeImageURL,
              id,
              tags,
            })
          );

          setGalleryItems((prevItems)=> [...prevItems, ...fetchedData]);
          setLoading(false);
          setHasButton(() => page <= Math.round(data.totalHits / 12));
        

          if (nextPage === 1) {
            toast.success(`Congratulations! We found ${serviceApi.hits} images.`);
          }
        
       
        })
        .catch(err => {
          setLoading(false)
          console.log(err.message);
        })
        .finally(() => (
          setLoading(false)
        ))
    
      
    }

    handleFetchItems(inputValue, page);
    setLoading(false);
    

  }, [inputValue, page, loading]);

  function handleFormSubmit(inputValue) {
    setInputValue('');
    setGalleryItems([]);
    setPage(1);
    setHasButton(false);
    setInputValue(inputValue);
  }

  const handleLoadMore = () => {
    setPage(() => page + 1);
    setHasButton(false);
    setLoading(true);
  };

 

  return (
    <AppContainer>
      <SearchbarEl onSubmit={handleFormSubmit} />

      {!error && <ImageGallery galleryItems={galleryItems} />}

      {error && <h2>Hello, Enter a keyword, please..</h2>}

      {hasButton && <Button onClick={handleLoadMore} />}

      {loading && <Loader />}

      <ToastContainer
        draggablePercent={60}
        position="bottom-left"
        autoClose={2000}
        theme="dark" />
    </AppContainer>
  );
};