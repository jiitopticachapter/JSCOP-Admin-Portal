import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { MdOutlineEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function MyVerticallyCenteredModalEdit(props) {
  console.log("propssss", props);
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    name: props.details ? props.details.name : "",
    email: props.details ? props.details.email : "",
    phone: props.details ? props.details.phone : "",
    batch: props.details ? props.details.batch : "",
    department: props.details ? props.details.department : "",
    // name: "",
    // email: "",
    // phone: "",
    // batch: "",
    // department: "",
  });

  useEffect(() => {
    console.log("njfhdhfjdhfdhfd", props);
    setFormData({
      name: props.details ? props.details.name : "",
      email: props.details ? props.details.email : "",
      phone: props.details ? props.details.phone : "",
      batch: props.details ? props.details.batch : "",
      department: props.details ? props.details.department : "",
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    // event.preventDefault(); // Prevent default form submission
    // // Create updated details object
    // const updatedDetails = {
    //   ...props.details,
    //   ...formData,
    // };
    // // Call onUpdate prop to update user details
    // props.onUpdate(updatedDetails);
    // props.onHide(); // Hide modal after update

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
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
              value={formData.phone}
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

          <Form.Group controlId="formDepartment">
            <Form.Label>Department</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter department"
              name="department"
              value={formData.department}
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

function MyVerticallyCenteredModalDelete(props) {
  console.log(props);
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
          Are you sure, you want to delete the user? This action cannot be
          undone. Click on "Yes" to proceed.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button>Yes</Button>
        <Button onClick={props.onHide}>No</Button>
      </Modal.Footer>
    </Modal>
  );
}

const Dashboard = () => {
  const [modalShowEdit, setModalShowEdit] = useState(false);
  const [modalShowDelete, setModalShowDelete] = useState(false);
  const [details, setDetails] = useState(null);

  const [usersDetails, setUserDetails] = useState([
    {
      name: "harsh sharma",
      email: "1238",
      phone: "1238",
      batch: "1238",
      department: "1238",
    },
    {
      name: "ABC Hero",
      email: "1238",
      phone: "1238",
      batch: "1238",
      department: "1238",
    },
    {
      name: "XYZ Man",
      email: "1238",
      phone: "1238",
      batch: "1238",
      department: "1238",
    },
  ]);

  // Function to update user details
  const updateUserDetails = (updatedDetails) => {
    setUserDetails(
      usersDetails.map((user) => (user === details ? updatedDetails : user))
    );
  };

  return (
    <>
      <MyVerticallyCenteredModalEdit
        show={modalShowEdit}
        onHide={() => setModalShowEdit(false)}
        details={details} //Pass details to the modal
        // onUpdate={updateUserDetails} // Pass the update function to the modal
      />

      <MyVerticallyCenteredModalDelete
        show={modalShowDelete}
        onHide={() => setModalShowDelete(false)}
        details={details}
      />
      <Table responsive="sm" striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Batch</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {usersDetails.map((user, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.batch}</td>
                <td>{user.department}</td>
                <td>
                  <button
                    onClick={() => {
                      setDetails(user);
                      setModalShowEdit(true);
                    }}
                  >
                    <MdOutlineEdit />
                  </button>
                  <br></br>
                  <button
                    onClick={() => {
                      setDetails(user);
                      setModalShowDelete(true);
                    }}
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default Dashboard;
