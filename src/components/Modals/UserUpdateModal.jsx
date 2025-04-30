import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";

function UserUpdateModal(props) {
  // console.log("propssss", props);
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    name: props.details ? props.details.name : "",
    email: props.details ? props.details.email : "",
    phoneNo: props.details ? props.details.phoneNo : "",
    batch: props.details ? props.details.batch : "",
    branch: props.details ? props.details.branch : "",
    selectedDay: props.details ? props.details.selectedDay : "",

    // name: "",
    // email: "",
    // phone: "",
    // batch: "",
    // department: "",
  });

  useEffect(() => {
    console.log("props.details", props.details);
    setFormData({
      name: props.details ? props.details.name : "",
      email: props.details ? props.details.email : "",
      phoneNo: props.details ? props.details.phoneNo : "",
      batch: props.details ? props.details.batch : "",
      branch: props.details ? props.details.branch : "",
      selectedDay: props.details ? props.details.selectedDay : "",
      enrollmentNo: props.details ? props.details.enrollmentNo : "",
    });
  }, [props.details]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch(
        `${import.meta.env.VITE_LOCALHOST}/admin/user/${props.details._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("userInfo")).jwt
            }`,
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );

      if (res.ok) {
        const data = await res.json();
        console.log("Update successful:", data);
        props.onHide();
        window.location.reload();
      } else {
        console.error("Update failed:", await res.text());
      }
    } catch (err) {
      console.error("Error updating user:", err);
    }

    // event.preventDefault(); // Prevent default form submission
    // // Create updated details object
    // const updatedDetails = {
    //   ...props.details,
    //   ...formData,
    // };
    // // Call onUpdate prop to update user details
    // props.onUpdate(updatedDetails);
    // props.onHide(); // Hide modal after update

    // const form = event.currentTarget;
    // if (form.checkValidity() === false) {
    //     event.preventDefault();
    //     event.stopPropagation();
    // }
    // setValidated(true);
    ///  const form = event.currentTarget;
    // if (form.checkValidity() === false) {
    //     event.preventDefault();
    //     event.stopPropagation();
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
        <Modal.Title id="contained-modal-title-vcenter-edit">
          Edit Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>You can edit the below info </h4>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a name.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Enter phone number"
              name="phone"
              value={formData.phoneNo}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid phone number.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formBatch">
            <Form.Label>Batch</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter batch"
              name="batch"
              value={formData.batch}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a batch number.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formSelectedDay">
            <Form.Label>Selected Day</Form.Label>
            <Form.Select
              name="selectedDay"
              value={formData.selectedDay}
              onChange={handleChange}
              required
            >
              <option value="">Choose a day</option>
              <option value="day1">Day 1</option>
              <option value="day2">Day 2</option>
              <option value="bothDays">Both</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select a day.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formDepartment">
            <Form.Label>Enrollment</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter enrollment"
              name="enrollment"
              value={formData.enrollmentNo}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a department.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formDepartment">
            <Form.Label>Department</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter department"
              name="department"
              value={formData.branch}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a department.
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default UserUpdateModal;
