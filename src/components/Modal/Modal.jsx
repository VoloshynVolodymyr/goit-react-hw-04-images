import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, ModalWindow } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({image, onClose}) => {



  useEffect(() => {
    const handleKeydown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeydown);
return(() => {
  window.removeEventListener('keydown', handleKeydown);
})
}, [onClose])


  

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

    const { largeImageURL } = image;

    return createPortal(
      <Overlay onClick={handleBackdropClick}>
        <ModalWindow>
          <img src={largeImageURL} alt={largeImageURL} />
        </ModalWindow>
      </Overlay>,
      modalRoot
    );
  }

Modal.propTypes = {
  image: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};