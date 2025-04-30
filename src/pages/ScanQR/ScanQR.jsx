// import { Html5QrcodeScanner } from "html5-qrcode";
// import { useState, useEffect } from "react";

// const ScanQR = () => {
//   const [scanResult, setScanResult] = useState("");
//   const [user, setUser] = useState("");
//   useEffect(() => {
//     let qr_id;
//     const qrCodeScanner = new Html5QrcodeScanner("reader", {
//       fps: 5,
//       qrbox: {
//         width: 250,
//         height: 250,
//       },
//     });
//     qrCodeScanner.render(success, error);

//     function success(qrCodeMessage) {
//       qr_id = qrCodeMessage;
//       getUserDetail(qr_id);
//       console.log(qr_id);
//       setScanResult(qrCodeMessage);
//       qrCodeScanner.clear();
//     }

//     function error(err) {
//       console.error(err);
//     }

//     const getUserDetail = async (qrId) => {
//       console.log("this is getUserDetail function");
//       try {
//         // Step 1: Fetch userId by QR code
//         const userIdResponse = await fetch(
//           `${import.meta.env.VITE_LOCALHOST}/admin/getQrUser/${qrId}`,
//           {
//             method: "GET", // use GET if your backend expects GET
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${
//                 JSON.parse(localStorage.getItem("userInfo")).jwt
//               }`,
//             },
//             credentials: "include",
//           }
//         );

//         if (!userIdResponse.ok) {
//           console.log("QR code not found");
//           return;
//         }

//         const userIdData = await userIdResponse.json(); // <-- Extract real data
//         console.log("Fetched userId data:", userIdData);

//         // Now assuming userIdData contains something like { userId: "12345" }
//         const userId = userIdData.user; // adjust according to what your backend sends

//         // Step 2: Fetch full user details using the userId
//         const userResponse = await fetch(
//           `${import.meta.env.VITE_LOCALHOST}/admin/user/${userId}`,
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             credentials: "include",
//           }
//         );

//         if (userResponse.ok) {
//           const userData = await userResponse.json();
//           setUser(userData);
//           console.log("Fetched user data:", userData);
//         } else {
//           console.log("User not found");
//         }
//       } catch (error) {
//         console.error("Error fetching user details:", error);
//       }
//     };
//   }, []);

//   const handleTicketValidation = async () => {
//     try {
//       const response = await fetch(
//         `${import.meta.env.VITE_LOCALHOST}/admin/verifyTicket/${scanResult}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${
//               JSON.parse(localStorage.getItem("userInfo")).jwt
//             }`,
//           },
//           credentials: "include",
//         }
//       );

//       console.log(response);

//       if (response.ok) {
//         alert("Ticket Verified");
//       } else {
//         const data = await response.json(); // ✅ Add await here
//         console.log(data);

//         if (data.message) {
//           alert(data.message); // ✅ show backend message
//         } else {
//           alert("Some error occurred");
//         }
//       }
//     } catch (error) {
//       console.error("Error validating ticket:", error);
//       alert("Something went wrong!");
//     }
//   };

//   return (
//     <>
//       <h1>Qr scan platform</h1>
//       {scanResult ? (
//         <div>
//           Success :{" "}
//           <a href={scanResult} target="_blank">
//             {scanResult}
//           </a>
//           <br />
//           <div>
//             <h3>User Details: {user.name}</h3>
//             <h3>User PhoneNo: {user.email}</h3>
//             <h3>User Phone Number: {user.phoneNo}</h3>
//             <h2>User College: {user.college}</h2>
//             <h2>User Enrollment No: {user.enrollmentNo}</h2>
//             <button onClick={handleTicketValidation}>Vaidate ticket</button>
//             <br />
//             <br />
//             <button onClick={() => window.location.reload()}>Scan Again</button>
//           </div>
//         </div>
//       ) : (
//         <div id="reader"></div>
//       )}
//     </>
//   );
// };

// export default ScanQR;

import { Html5QrcodeScanner } from "html5-qrcode";
import { useState, useEffect } from "react";

const ScanQR = () => {
  const [scanResult, setScanResult] = useState("");
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isValidated, setIsValidated] = useState(false);

  useEffect(() => {
    let qr_id;
    const qrCodeScanner = new Html5QrcodeScanner("reader", {
      fps: 5,
      qrbox: {
        width: 250,
        height: 250,
      },
    });
    qrCodeScanner.render(success, error);

    function success(qrCodeMessage) {
      qr_id = qrCodeMessage;
      getUserDetail(qr_id);
      console.log(qr_id);
      setScanResult(qrCodeMessage);
      qrCodeScanner.clear();
    }

    function error(err) {
      console.error(err);
    }

    const getUserDetail = async (qrId) => {
      console.log("this is getUserDetail function");
      setIsLoading(true);
      setError("");

      try {
        // Step 1: Fetch userId by QR code
        const userIdResponse = await fetch(
          `${import.meta.env.VITE_LOCALHOST}/admin/getQrUser/${qrId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("userInfo")).jwt
              }`,
            },
            credentials: "include",
          }
        );

        if (!userIdResponse.ok) {
          setError("QR code not found");
          setIsLoading(false);
          return;
        }

        const userIdData = await userIdResponse.json();
        console.log("Fetched userId data:", userIdData);

        const userId = userIdData.user;

        // Step 2: Fetch full user details using the userId
        const userResponse = await fetch(
          `${import.meta.env.VITE_LOCALHOST}/admin/user/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("userInfo")).jwt
              }`,
            },
            credentials: "include",
          }
        );

        if (userResponse.ok) {
          const userData = await userResponse.json();
          setUser(userData);
          console.log("Fetched user data:", userData);
        } else {
          setError("User not found");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        setError("Failed to fetch user details");
      } finally {
        setIsLoading(false);
      }
    };
  }, []);

  const handleTicketValidation = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_LOCALHOST}/admin/verifyTicket/${scanResult}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("userInfo")).jwt
            }`,
          },
          credentials: "include",
        }
      );

      console.log(response);

      if (response.ok) {
        setIsValidated(true);
      } else {
        const data = await response.json();
        console.log(data);

        if (data.message) {
          alert(data.message);
        } else {
          alert("Some error occurred");
        }
      }
    } catch (error) {
      console.error("Error validating ticket:", error);
      alert("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleScanAgain = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          {/* <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white text-center">
              QR Ticket Scanner
            </h1>
            <p className="text-blue-100 text-center text-sm mt-1">
              Scan attendee QR codes to verify tickets
            </p>
          </div> */}

          {/* Content */}
          <div className="p-6">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-center items-center mt-4 text-gray-600">
                  Processing...
                </p>
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-600 font-medium">{error}</p>
                <button
                  onClick={handleScanAgain}
                  className="mt-4 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
                  style={{
                    padding: "5px",
                    color: "black ! important",
                  }}
                >
                  Try Again
                </button>
              </div>
            ) : scanResult ? (
              <div className="space-y-5">
                {/* Success Banner */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-green-100 rounded-full p-2">
                      {/* <svg
                        className="w-5 h-5 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg> */}
                    </div>
                    <div className="flex flex-col items-center justify-center text-center">
                      <h3 className="text-sm font-medium text-green-800">
                        QR Code Scanned Successfully
                      </h3>
                      <div className="mt-1 text-sm text-green-700">
                        {/* <p>Source: {scanResult}</p> */}
                        Success :{" "}
                        <a href={scanResult} target="_blank">
                          {scanResult}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* User Details Table */}
                <div className="bg-white border rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 border-b">
                    <h3 className="text-lg font-medium text-gray-900">
                      Attendee Information
                    </h3>
                  </div>
                  <table className="min-w-full divide-y divide-gray-200">
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-3 w-1/3 text-sm font-medium text-gray-600 bg-gray-50">
                          Name:-
                        </td>
                        <td className="px-2 py-3 w-2/3 text-sm text-gray-900">
                          {user.name || "N/A"}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 w-1/3 text-sm font-medium text-gray-600 bg-gray-50">
                          Email:-
                        </td>
                        <td className="px-2 py-3 w-2/3 text-sm text-gray-900">
                          {user.email || "N/A"}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 w-1/3 text-sm font-medium text-gray-600 bg-gray-50">
                          Phone:-
                        </td>
                        <td className="px-2 py-3 w-2/3 text-sm text-gray-900">
                          {user.phoneNo || "N/A"}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 w-1/3 text-sm font-medium text-gray-600 bg-gray-50">
                          College:-
                        </td>
                        <td className="px-2 py-3 w-2/3 text-sm text-gray-900">
                          {user.college || "N/A"}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 w-1/3 text-sm font-medium text-gray-600 bg-gray-50">
                          Enrollment:-
                        </td>
                        <td className="px-2 py-3 w-2/3 text-sm text-gray-900">
                          {user.enrollmentNo || "N/A"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-row gap-3 justify-center pt-2">
                  {isValidated ? (
                    <div className="w-full bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                      <div className="flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-green-600 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="text-green-800 font-medium">
                          Ticket Validated Successfully
                        </span>
                      </div>
                      <button
                        onClick={handleScanAgain}
                        className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-200"
                      >
                        Scan Next Ticket
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex flex-col items-center gap-4">
                        <div
                          className="flex flex-row gap-4"
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            padding: "15px 10px",
                          }}
                        >
                          <button
                            onClick={handleTicketValidation}
                            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-200 flex items-center justify-center"
                            // disabled={isLoading}
                          >
                            {/* {isLoading ? (
                              <span className="flex items-center">
                                Processing...
                              </span>
                            ) : ( */}
                            <span
                              className="flex "
                              style={{
                                padding: "5px",
                                color: "black",
                              }}
                            >
                              Validate Ticket
                            </span>
                            {/* )} */}
                          </button>
                          <button
                            onClick={handleScanAgain}
                            className="px-6 py-2 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-md transition-colors duration-200 flex items-center justify-center"
                            style={{
                              padding: "5px",
                              color: "black",
                            }}
                          >
                            Scan Again
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-4">
                  <p className="text-blue-800 text-sm">
                    Position the QR code within the scanner frame to verify the
                    ticket.
                  </p>
                </div>
                <div
                  id="reader"
                  className="border-2 border-dashed border-blue-200 rounded-lg p-4 min-h-64 flex items-center justify-center"
                >
                  {/* QR Scanner will be initialized here */}
                  <p className="text-gray-500">QR Scanner loading...</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Ticket Verification System
        </div>
      </div>
    </div>
  );
};

export default ScanQR;
