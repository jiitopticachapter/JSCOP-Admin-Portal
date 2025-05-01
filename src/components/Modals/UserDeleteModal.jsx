import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function UserDeleteModal(props) {
    const handleDelete = async () => {
        // write code to delete the user
        const res = await fetch(`${import.meta.env.VITE_LOCALHOST}/admin/user/${props.details._id}`, {

            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${
                    JSON.parse(localStorage.getItem("userInfo")).jwt
                  }`,
            },
            credentials: "include",
           

        }).then(() => {
            console.log("deleting!!");
            props.onHide();
            window.location.reload();

        })
        // if (res.status == 200) {
        //     console.log("deleted user");
        //     props.onHide();
        // }

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
