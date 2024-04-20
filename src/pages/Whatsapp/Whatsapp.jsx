import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { alignPropType } from "react-bootstrap/esm/types";
import { whatsappMessage } from "../Services/user";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Whatsapp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
    names: [],
    phones: [],
  });

  const doSend = async (e) => {
    // e.preventDefault();
    const timestamp = Date.now().toString();  
    const jsonData = {
      taskName: formData.subject,
      message: formData.message,
      phoneNumbers: formData.phones,
      timeStamp: timestamp,
    };

    try {
      const res = await whatsappMessage(jsonData);
      alert(JSON.stringify(res.data));
    } catch (error) {
      console.error("Can't send :", error);
      alert("An error occurred during sending WhatsApp message. Please try again later.");
    }
  };

  const [usersDetails, setUserDetails] = useState([
    {
      name: "harsh sharma",
      phone: "911232230",
      email: "harsh@gmail.com",
      batch: "B8",
      department: "ce",
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
      name: "Sanju",
      phone: "12454353468",
      email: "dfdf@238",
      batch: "1238",
      department: "1238",
    },
    {
      name: "Sanju",
      phone: "12454353468",
      email: "dfdf@238",
      batch: "1238",
      department: "1238",
    },
    {
      name: "Sanju",
      phone: "12454353468",
      email: "dfdf@238",
      batch: "1238",
      department: "1238",
    },
    {
      name: "Sanju",
      phone: "12454353468",
      email: "dfdf@238",
      batch: "1238",
      department: "1238",
    },
    {
      name: "Sanju",
      phone: "12454353468",
      email: "dfdf@238",
      batch: "1238",
      department: "1238",
    },
    {
      name: "Sanju",
      phone: "12454353468",
      email: "dfdf@238",
      batch: "1238",
      department: "1238",
    },
    {
      name: "Sanju",
      phone: "12454353468",
      email: "dfdf@238",
      batch: "1238",
      department: "1238",
    },
    {
      name: "Sanju",
      phone: "12454353468",
      email: "dfdf@238",
      batch: "1238",
      department: "1238",
    },
    {
      name: "Sanju",
      phone: "12454353468",
      email: "dfdf@238",
      batch: "1238",
      department: "1238",
    },
    {
      name: "Sanju",
      phone: "12454353468",
      email: "dfdf@238",
      batch: "1238",
      department: "1238",
    },
  ]);
  
  useEffect( () => {
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

  }, [])

  const handleCheckboxChange = (event, phone, name) => {
    const { checked } = event.target;

    if (checked) {
      const newPhones = formData.phones;
      const newNames = formData.names;
      newPhones.push(phone);
      newNames.push(name);
      setFormData((prev) => {
        return {
          ...prev,
          phones: newPhones,
          names: newNames,
        };
      });
    } else {
      setFormData((prev) => {
        return {
          ...prev,
          phones: prev.phones.filter((e) => e !== phone),
          names: prev.names.filter((e) => e !== name),
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

  return (
    <>
      <div className="email_page">
        <h1>Whatsapp</h1>
        <Tabs
          defaultActiveKey="compose"
          id="justify-tab-example"
          className="mb-3 w-100"
          justify
        >
          <Tab eventKey="compose" title="Compose Message">
            <div>
              <Form>
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
                    <th>Phone No.</th>
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
                        <td>{user.phone}</td>
                        <td>{user.batch}</td>
                        <td>{user.department}</td>
                        <td style={{ textAlign: "center" }}>
                          <input
                            className="selectelements"
                            type="checkbox"
                            onChange={(event) =>
                              handleCheckboxChange(event, user.phone, user.name)
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

                  const array = [];
                  const n = [];
                  for (let i = 0; i < usersDetails.length; i++) {
                    array.push(usersDetails[i].phone);
                    n.push(usersDetails[i].name);
                  }
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    phones: array,
                    names: n,
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

                  const array = [];
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    phones: array,
                    names: array,
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
              <Card
                style={{
                  width: "900px",
                  marginBottom: "10px",
                }}
              >
                <Card.Body>
                  <Card.Title>Message</Card.Title>
                  <Card.Text>{formData.message}</Card.Text>
                </Card.Body>
              </Card>
              <div
                style={{
                  backgroundColor: "white",
                  padding: "25px",
                  borderRadius: "10px",
                }}
              >
                <Card.Title>Phone</Card.Title>
                <div style={gridContainerStyle}>
                  {formData.names.map((name, index) => (
                    <div key={index} style={gridItemStyle}>
                      <table>
                        <tbody>
                          <tr>
                            <td> {name} </td>
                          </tr>
                          <tr>
                            <td> {formData.phones[index]} </td>
                          </tr>
                        </tbody>
                      </table>
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

export default Whatsapp;
