import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { MdOutlineEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

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
      <Table responsive="sm" striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Email</th>
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
                  <button>
                    <MdOutlineEdit />
                  </button>
                  <button>
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
