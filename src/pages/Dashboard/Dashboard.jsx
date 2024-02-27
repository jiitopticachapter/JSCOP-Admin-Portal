import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

const Dashboard = () => {
  const [usersDetails, setUserDetails] = useState([
    {
      name: "harsh sharma",
      phone: "1238",
      email: "1238",
      batch: "1238",
      department: "1238",
    },
    {
      name: "harsh sharma",
      phone: "1238",
      email: "1238",
      batch: "1238",
      department: "1238",
    },
    {
      name: "harsh sharma",
      phone: "1238",
      email: "1238",
      batch: "1238",
      department: "1238",
    },
  ]);

  return (
    <>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Batch</th>
            <th>Department</th>
          </tr>
        </thead>
        <tbody>
          {usersDetails.map((user, index) => {
            <tr>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.batch}</td>
              <td>{user.department}</td>
            </tr>;
          })}
        </tbody>
      </Table>
    </>
  );
};

export default Dashboard;
