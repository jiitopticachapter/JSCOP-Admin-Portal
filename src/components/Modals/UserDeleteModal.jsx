import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function UserDeleteModal(props) {
    const handleDelete = () => {
        // write code to delete the user

        console.log("Delete");
    };
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter-edit"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter-delete">
                    {props.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Confirm Delete</h4>
                <p>
                    Are you sure, you want to delete the user? This action
                    cannot be undone. Click on "Yes" to proceed.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleDelete}>Yes</Button>
                <Button onClick={props.onHide}>No</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default UserDeleteModal;
