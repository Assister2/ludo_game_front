import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function DailogModal(props) {
  return (
    <Modal
    {...props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    show={true}
    onHide={() => props.setIsOpen(false)}
    // backdrop={true}
    // onBackdropClick={() => props.setIsOpen(false)}
    // onClick={closeModal}
  >
   
    <Modal.Body style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
      
      <p style={{textAlign:'center'}}>
<b style={{textAlign:'center'}}>{props.data}</b>
      </p>
    </Modal.Body>
   
  </Modal>
  );
}

export default DailogModal;