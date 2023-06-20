import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function UserModal({ adoptCount, user }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="button text me-3">
        <button
          variant="primary"
          className="btn  mx-auto d-block btn-primary"
          onClick={handleShow}
        >
          profile
        </button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title className="mx-auto text-center">
            User Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column justify-content-center">
          <div className="d-inline-block mx-auto">
            <b>Name: </b> {user.name}
          </div>
          <div className="d-inline-block mx-auto">
            <b>email: </b> {user.email}
          </div>
          <div className="d-inline-block mx-auto">
            <b>Pokemon Count: </b> {adoptCount}
          </div>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UserModal;
