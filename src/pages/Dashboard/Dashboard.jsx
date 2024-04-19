import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { MdOutlineEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Button from "react-bootstrap/Button";
import UserDeleteModal from "../../components/Modals/UserDeleteModal";
import UserUpdateModal from "../../components/Modals/UserUpdateModal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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

    const navigate = useNavigate();

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
                // console.log("response", response);
                setAllUsers(response.data);
                setUserDetails(response.data);
                setLoading(false);
            } catch (err) {
                localStorage.removeItem("userInfo");
                navigate("/login");
            }
        };
        setLoading(true);
        // console.log(response);
        getFunction();
    }, []);

    // Function to update user details
    const updateUserDetails = (updatedDetails) => {
        setUserDetails(
            usersDetails.map((user) =>
                user === details ? updatedDetails : user
            )
        );
    };

    const handleUnverifiedUser = (event) => {
        const newUser = allUsers.filter((user) => {
            return user.verified == false;
        });
        // console.log("newUser", newUser);
        setUserDetails(newUser);
    };

    const handleVerifiedUser = async (event) => {
        const newUser = allUsers.filter((user) => {
            return user.verified == true;
        });
        setUserDetails(newUser);
    };

    const searchUser = (event) => {
        const newUser = allUsers.filter((user) => {
            return user.name
                .toLowerCase()
                .includes(event.target.value.toLowerCase());
        });
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
            const res = await axios.post(
                `/admin/sendTicketafterVerification/${id}`,
                {},
                config
            );
            console.log("After Sending Ticket", res);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <UserUpdateModal
                show={modalShowEdit}
                onHide={() => setModalShowEdit(false)}
                details={details} //Pass details to the modal
                // onUpdate={updateUserDetails} // Pass the update function to the modal
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
                setUserDetails={setUserDetails}
            />
            <Stack
                direction="horizontal"
                gap={3}
                className="my-2 d-flex justify-content-center"
            >
                <Button
                    variant="primary"
                    onClick={() => setUserDetails(allUsers)}
                >
                    All Users
                </Button>
                <Button variant="primary" onClick={handleVerifiedUser}>
                    Verified User
                </Button>
                <Button variant="primary" onClick={handleUnverifiedUser}>
                    Unverified User
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
                    className="form-control w-50"
                />
            </Stack>
            {loading ? (
                <div className="d-flex justify-content-center align-items-center  w-100 my-8">
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
                            <th>Batch</th>
                            <th>Department</th>
                            <th>Hosteller/DayScholar</th>
                            <th>Enrollment</th>
                            <th>Payment</th>
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
                                    <td>{user.phoneNo}</td>
                                    <td>JIIT</td>
                                    <td>{user.batch}</td>
                                    <td>{user.branch}</td>
                                    <td>{user.enrollmentType}</td>
                                    <td>{user.enrollmentNo}</td>
                                    <td>
                                        <a
                                            href={user.payment.url}
                                            target="_blank"
                                        >
                                            Photo
                                        </a>
                                    </td>
                                    <td className="d-flex">
                                        <button
                                            className={`btn ${
                                                user.verified
                                                    ? "btn-success"
                                                    : "btn-warning"
                                            } mx-2`}
                                            onClick={() => {
                                                setDetails(user);
                                                setModalShowVerify(true);
                                            }}
                                        >
                                            {user.verified
                                                ? "Verified"
                                                : "Verify"}
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
                                        <br></br>
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
                                            onClick={() =>
                                                handleSendTicket(user._id)
                                            }
                                        >
                                            Send Ticket
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            )}
        </>
    );
};

export default Dashboard;
