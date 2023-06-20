import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function AppDetails() {
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
          About App
        </button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title className="mx-auto text-center">App Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column ">
          <div className="d-inline-block ">
            This is an application that simulates a virtual Pokemon adoption
            scenario.
          </div>
          <div className="d-inline-block ">
            <b>Step 1.</b> You have to register yourself.
          </div>
          <div className="d-inline-block ">
            <b>Step 2.</b> Now login with your details and you will see list of
            pokemons.
          </div>
          <div className="d-inline-block ">
            <b>Step 3.</b> Adopt the pokemons whichever you want.
          </div>
          <div className="d-inline-block ">
            <b>Step 4.</b> You can see you adopted pokemons in your dashboard.
          </div>
          <div className="d-inline-block ">
            <b>Step 5.</b> Now you have to feed you pokemons according to their
            health status.
          </div>
          <div className="d-inline-block ">
            <b>Step 6.</b> The health of pokemons decreases by 10% after every
            23 hours. So feed your pokemons to keep it alive.
          </div>
          <div className="d-inline-block ">
            <b className="text-danger">Note</b> You can't adopt a pokemon that
            is already adopted by other users.
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

export default AppDetails;
