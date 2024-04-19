import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

function UserVerifyModal(props) {
    const [loading, setLoading] = useState(false);

    const handleVerify = async () => {
        setLoading(true);
        // write code to verify the user
        const config = {
            headers: {
                Authorization: `Bearer ${
                    JSON.parse(localStorage.getItem("userInfo")).jwt
                }`,
            },
        };
        try {
            const response = await axios.get(
                `/admin/verify/${props.details._id}`,
                config
            );
            console.log(response);
            if (response.data == "User Verified") {
                toast.success("User Verified Successfully, sending ticket");
                try {
                    const res = await axios.post(
                        `/admin/sendTicket/${props.details._id}`,
                        {},
                        config
                    );
                    console.log(res);
                } catch (err) {
                    toast.error("Error in Sending the Ticket");
                }
                window.location.reload();
            } else {
                toast.error("User Verification Failed");
                props.onHide();
            }
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
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
                    <h4>Confirm Verification</h4>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    Are you sure, you want to Verify {props.details?.name}?
                    <br /> This action cannot be undone. <br />
                    Click on <b>Yes</b> to Confirm Verification.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleVerify}>Yes</Button>
                <Button onClick={props.onHide}>No</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default UserVerifyModal;
