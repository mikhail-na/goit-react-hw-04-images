import PropTypes from 'prop-types'
import { useEffect } from 'react';
import { Overlay, ModalContainer, Img} from './Modal.module';

export const Modal = ({ onClose, largeImageURL, alt }) => {

  // onClose();
  //!================================================================
  useEffect(() => {
    const handleKeydown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeydown)

    return (
      window.removeEventListener('keydown', handleKeydown)
    )
  }, [onClose]) //!   <================================
  //!================================================================
  

   const handleOverlayClick = (e) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  }

  return (
    <Overlay onClick={handleOverlayClick}>
      <ModalContainer >
        <Img src={largeImageURL} alt={alt} />
      </ModalContainer>
    </Overlay>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  // alt: PropTypes.arrayOf(PropTypes.string).isRequired,
}