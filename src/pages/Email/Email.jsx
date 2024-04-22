import React from "react";
import "./Email.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { alignPropType } from "react-bootstrap/esm/types";
import { EmailSend } from "../Services/user";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Email = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
    emails: [],
  });

  const [usersDetails, setUserDetails] = useState([
    {
      name: " sharma",
      phone: "123811111",
      email: "fdf@238",
      batch: "1238",
      department: "1238",
    },
    {
      name: "kshitij Gupta",
      phone: "12334328",
      email: "f@238",
      batch: "1238",
      department: "1238",
    },
    {
      name: "harsh sharma",
      phone: "1238",
      email: "fdf@238",
      batch: "1238",
      department: "1238",
    },
    {
      name: "kshitij Gupta",
      phone: "12334328",
      email: "f@238",
      batch: "1238",
      department: "1238",
    },
    {
      name: "harsh sharma",
      phone: "1238",
      email: "fdf@238",
      batch: "1238",
      department: "1238",
    },
  ]);

  const handleCheckboxChange = (event, email) => {
    const { checked } = event.target;
    // console.log(email);
    // console.log("check", checked)

    if (checked) {
      const newEmails = formData.emails;
      newEmails.push(email);
      setFormData((prev) => {
        return {
          ...prev,
          emails: newEmails,
        };
      });
    } else {
      setFormData((prev) => {
        return {
          ...prev,
          emails: prev.emails.filter((e) => e !== email),
        };
      });
    }
    // console.log("formdata", formData);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    // setFormData({
    //   ...formData,
    //   [name]: value
    // })
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
    console.log(formData);
  };

  useEffect(() => {
    const getFunction = async () => {
      try {
        // console.log(
        //     "Token",
        //     JSON.parse(localStorage.getItem("userInfo"))
        // );
        const config = {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("userInfo")).jwt
            }`,
          },
        };
        const response = await axios.get("/admin/allUsers", config);
        console.log("response", response);
        // setAllUsers(response.data);
        setUserDetails(response.data);
        // setLoading(false);
      } catch (err) {
        localStorage.removeItem("userInfo");
        navigate("/login");
      }
    };
    // setLoading(true);
    // console.log(response);
    getFunction();
  }, []);

  const gridContainerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 200px)", // Adjust column width as needed
    gap: "10px", // Adjust gap between grid items as needed
    // marginBottom: "100px",
  };
  const gridItemStyle = {
    backgroundColor: "lightblue",
    border: "1px solid gray",
    padding: "10px",
    textAlign: "center",
  };

  const doSend = async (e) => {
    const jsonData = {
      subject: formData.subject,
      customText: formData.message,
      selectedEmails: formData.emails,
    };

    try {
      const res = await EmailSend(jsonData);
      alert(JSON.stringify(res.data));
    } catch (error) {
      console.error("Can't send :", error);
      alert("An error occurred during sending Email. Please try again later.");
    }
  };

  return (
    <>
      <div className="email_page">
        <h1>Email</h1>
        <Tabs
          defaultActiveKey="compose"
          id="justify-tab-example"
          className="mb-3 w-100"
          justify
        >
          <Tab eventKey="compose" title="Compose Mail">
            <div>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Subject</Form.Label>
                  <Form.Control
                    type="email"
                    name="subject"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="message"
                    onChange={handleChange}
                    cols={70}
                    rows={7}
                  />
                </Form.Group>
              </Form>
            </div>
          </Tab>
          <Tab eventKey="selectId" title="Select Id">
            <div>
              <Table style={{ width: "100%" }} striped bordered hover>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Batch</th>
                    <th>Department</th>
                    <th>Select Id</th>
                  </tr>
                </thead>

                <tbody>
                  {usersDetails.map((user, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.phoneNo}</td>
                        <td>{user.batch}</td>
                        <td>{user.branch}</td>
                        <td style={{ textAlign: "center" }}>
                          <input
                            className="selectelements"
                            type="checkbox"
                            onChange={(event) =>
                              handleCheckboxChange(event, user.name, user.email)
                            }
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>

              <Button
                style={{ margin: "10px" }}
                variant="dark"
                onClick={() => {
                  const checkboxes =
                    document.querySelectorAll(".selectelements");
                  checkboxes.forEach((checkbox) => {
                    checkbox.checked = true;
                  });

                  const emails = [];
                  for (let i = 0; i < usersDetails.length; i++) {
                    emails.push(usersDetails[i].email);
                  }
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    emails: emails,
                  }));
                }}
              >
                Select All
              </Button>
              <Button
                variant="dark"
                onClick={() => {
                  const checkboxes =
                    document.querySelectorAll(".selectelements");
                  checkboxes.forEach((checkbox) => {
                    checkbox.checked = false;
                  });

                  const emails = [];
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    emails: emails,
                  }));
                }}
              >
                DeSelect All
              </Button>
            </div>
          </Tab>
          <Tab eventKey="preview" title="Preview">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Card style={{ width: "900px", marginBottom: "10px" }}>
                <Card.Body>
                  <Card.Title>Subject</Card.Title>
                  <Card.Text>{formData.subject}</Card.Text>
                </Card.Body>
              </Card>

              <Card
                style={{
                  width: "900px",
                  marginBottom: "10px",
                }}
              >
                <Card.Body>
                  <Card.Title>Message</Card.Title>
                  <pre>{formData.message}</pre>
                </Card.Body>
              </Card>
              <div
                style={{
                  backgroundColor: "white",
                  padding: "25px",
                  borderRadius: "10px",
                }}
              >
                <Card.Title>Emails</Card.Title>
                <div style={gridContainerStyle}>
                  {formData.emails.map((email, index) => (
                    <div key={index} style={gridItemStyle}>
                      {email}
                    </div>
                  ))}
                </div>
              </div>
              <Button
                style={{ textAlign: "center", margin: "20px" }}
                variant="dark"
                onClick={doSend}
              >
                Send
              </Button>
            </div>
          </Tab>
        </Tabs>
      </div>
    </>
  );
};

export default Email;
