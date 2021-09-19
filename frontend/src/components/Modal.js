import React from 'react'
import { Modal, Button } from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux'
import { ShowModal, HideModal, OPTION_BUTTON_MODAL } from '../actions/modalActions'
import { deleteProduct } from '../actions/productActions'


export const ModalS = () => {
    
    const dispatch = useDispatch()
    const modalDetails = useSelector((state) => state.modalDetails)
    const { status, title, description, variantPrimary, variantSecondary, data } = modalDetails.modal

    return (
        <>
          <Modal
            show={status}
            /* onHide={handleClose} */
            onClick={() => { dispatch(HideModal()); }}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {description}
            </Modal.Body>
            <Modal.Footer>
              <Button variant={variantSecondary} /* onClick={handleClose} */  onClick={() => { dispatch(HideModal({})); }} >
                Close
              </Button>
              {/* <Button variant={variantPrimary}  onClick={() => { dispatch(OPTION_BUTTON_MODAL({ data, confirm :'ok' }))  }}>Understood</Button> */}
              <Button variant={variantPrimary}  onClick={() => {  dispatch(deleteProduct(data))  }}>Understood</Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    
}

/* ModalS.defaultProps = {
    variantPrimary: 'info',
    variantSecondary: 'info',
    variant: 'info',
  } */
