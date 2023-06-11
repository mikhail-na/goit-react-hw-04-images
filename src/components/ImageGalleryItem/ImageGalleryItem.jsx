import PropTypes from 'prop-types';
import { useState } from "react";
import { Item, Img } from "./ImageGalleryItem.module";
import { Modal } from "components/Modal/Modal";


export const GalleryListItem = ({ galleryItem: { webformatURL, largeImageURL, tags, id} }) => {

  // console.log(tags);
  const [isOpen, setIsOpen] = useState(false)

  const switchModal = () => {
    setIsOpen( isOpen => !isOpen )
  }


  return (
    <>
      <Item
        key={id}
        onClick={switchModal}>
        <Img src={webformatURL} alt={tags} />
      </Item>
      {isOpen && (
        <Modal
          largeImageURL={largeImageURL}
          alt={tags}
          onClose={switchModal}
        />
      )}
    </>
  );
};


GalleryListItem.propTypes = {
  galleryItem: PropTypes.shape({
    tags: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
};