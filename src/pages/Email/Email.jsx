import React from "react";
import './Email.css'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Form from 'react-bootstrap/Form';

const EmailForm = (
  <div>
     <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Subject</Form.Label>
        <Form.Control type="email" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Message</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>
    </Form>
  </div>
)

const Email = () => {
  return(
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
        {EmailForm}
      </Tab>
      <Tab eventKey="selectId" title="Select Id">
        Tab content for Profile
      </Tab>
      <Tab eventKey="preview" title="Preview">
        Tab content for Loooonger Tab
      </Tab>
    </Tabs>
    </div>
    </>
  );
};

export default Email;
