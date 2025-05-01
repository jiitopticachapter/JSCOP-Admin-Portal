import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { MdOutlineEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Button from "react-bootstrap/Button";
import UserDeleteModal from "../../components/Modals/UserDeleteModal";
import UserUpdateModal from "../../components/Modals/UserUpdateModal";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Stack from "react-bootstrap/Stack";
import Spinner from "react-bootstrap/Spinner";
import UserVerifyModal from "../../components/Modals/UserVerifyModal";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [modalShowEdit, setModalShowEdit] = useState(false);
  const [modalShowDelete, setModalShowDelete] = useState(false);
  const [modalShowVerify, setModalShowVerify] = useState(false);

  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const [usersDetails, setUserDetails] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [activeDay, setActiveDay] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getFunction = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("userInfo")).jwt
            }`,
          },
        };
        const response = await axios.get(`admin/allUsers`, config);
        setAllUsers(response.data);
        setUserDetails(response.data);
        setLoading(false);
      } catch (err) {
        localStorage.removeItem("userInfo");
        navigate("/login");
      }
    };
    setLoading(true);
    getFunction();
  }, []);

  const updateUserDetails = (updatedDetails) => {
    setUserDetails(
      usersDetails.map((user) => (user === details ? updatedDetails : user))
    );
  };

  const handleUnverifiedUser = () => {
    const newUser = allUsers.filter((user) => !user.verified);
    setUserDetails(newUser);
  };

  const handleVerifiedUser = () => {
    const newUser = allUsers.filter((user) => user.verified);
    setUserDetails(newUser);
  };

  const searchUser = (event) => {
    const newUser = allUsers.filter((user) =>
      user.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setUserDetails(newUser);
  };

  const handleSendTicket = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userInfo")).jwt
          }`,
        },
      };
      await axios.post(`/admin/sendTicketafterVerification/${id}`, {}, config);
      toast.success("Ticket Sent Successfully");
    } catch (err) {
      console.log(err);
    }
  };

  const handleDayFilter = (day) => {
    if (activeDay === day) {
      setActiveDay(null);
      setUserDetails(allUsers);
    } else {
      let filteredUsers = [];
      if (day === "both") {
        filteredUsers = allUsers.filter((user) => user.selectedDay === "both");
      } else {
        filteredUsers = allUsers.filter(
          (user) => user.selectedDay === day || user.selectedDay === "both"
        );
      }
      setActiveDay(day);
      setUserDetails(filteredUsers);
    }
  };

  return (
    <>
      <UserUpdateModal
        show={modalShowEdit}
        onHide={() => setModalShowEdit(false)}
        details={details}
      />
      <UserDeleteModal
        show={modalShowDelete}
        onHide={() => setModalShowDelete(false)}
        details={details}
      />
      <UserVerifyModal
        show={modalShowVerify}
        onHide={() => setModalShowVerify(false)}
        allusers={allUsers}
        details={details}
      />

      <Stack
        direction="horizontal"
        gap={3}
        className="my-2 d-flex justify-content-center"
      >
        <Button variant="primary" onClick={() => setUserDetails(allUsers)}>
          All Users
        </Button>
        <Button variant="primary" onClick={handleVerifiedUser}>
          Verified User
        </Button>
        <Button variant="primary" onClick={handleUnverifiedUser}>
          Unverified User
        </Button>
        <Button variant="primary">
          <Link to="/scanqr" style={{ color: "white", textDecoration: "none" }}>
            Scan Qr
          </Link>
        </Button>
      </Stack>

      <Stack
        direction="horizontal"
        gap={3}
        className="my-2 d-flex justify-content-center"
      >
        <input
          type="text"
          placeholder="Search User"
          onChange={searchUser}
          className="w-50 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </Stack>

      <div className="d-flex justify-content-center gap-2 flex-wrap mb-4">
        <button
          onClick={() => handleDayFilter("day1")}
          className={`px-4 py-2 rounded-md font-medium transition-all duration-200 shadow-sm ${
            activeDay === "day1"
              ? "bg-blue-600 text-white"
              : "bg-white text-blue-600 border border-blue-300 hover:bg-blue-50 hover:border-blue-400"
          }`}
        >
          Day 1
        </button>
        <button
          onClick={() => handleDayFilter("day2")}
          className={`px-4 py-2 rounded-md font-medium transition-all duration-200 shadow-sm ${
            activeDay === "day2"
              ? "bg-blue-600 text-white"
              : "bg-white text-blue-600 border border-blue-300 hover:bg-blue-50 hover:border-blue-400"
          }`}
        >
          Day 2
        </button>
        <button
          onClick={() => handleDayFilter("both")}
          className={`px-4 py-2 rounded-md font-medium transition-all duration-200 shadow-sm ${
            activeDay === "both"
              ? "bg-blue-600 text-white"
              : "bg-white text-blue-600 border border-blue-300 hover:bg-blue-50 hover:border-blue-400"
          }`}
        >
          Both Days
        </button>
        <button
          onClick={() => {
            setActiveDay(null);
            setUserDetails(allUsers);
          }}
          className="px-4 py-2 rounded-md font-medium transition-all duration-200 shadow-sm bg-red-100 text-red-700 border border-red-300 hover:bg-red-200"
        >
          Reset Filters
        </button>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center w-100 my-8">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Table responsive="sm" striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>College Name</th>
              <th>Selected Day</th>
              <th>Batch</th>
              <th>Department</th>
              <th>Hosteller/DayScholar</th>
              <th>Enrollment</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {usersDetails.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phoneNo}</td>
                <td>JIIT</td>
                <td>{user.selectedDay}</td>
                <td>{user.batch}</td>
                <td>{user.branch}</td>
                <td>{user.enrollmentType}</td>
                <td>{user.enrollmentNo}</td>
                <td>
                  <a href={user.payment.url} target="_blank" rel="noreferrer">
                    Photo
                  </a>
                </td>
                <td className="d-flex">
                  <button
                    className={`btn ${
                      user.verified ? "btn-success" : "btn-warning"
                    } mx-2`}
                    onClick={() => {
                      setDetails(user);
                      setModalShowVerify(true);
                    }}
                  >
                    {user.verified ? "Verified" : "Verify"}
                  </button>
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => {
                      setDetails(user);
                      setModalShowEdit(true);
                    }}
                  >
                    <MdOutlineEdit />
                  </button>
                  <button
                    className="btn btn-danger me-2"
                    onClick={() => {
                      setDetails(user);
                      setModalShowDelete(true);
                    }}
                  >
                    <MdDelete />
                  </button>
                  <button
                    className="btn btn-secondary me2"
                    onClick={() => handleSendTicket(user._id)}
                  >
                    Send Ticket
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default Dashboard;
