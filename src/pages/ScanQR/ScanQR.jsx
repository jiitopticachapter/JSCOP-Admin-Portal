import { Html5QrcodeScanner } from "html5-qrcode";
import { useState, useEffect } from "react";


const ScanQR = () => {
    const [scanResult, setScanResult] = useState('');
    const [user, setUser] = useState('');
    useEffect(() => {
        let qr_id;
        const qrCodeScanner = new Html5QrcodeScanner("reader", {
            fps: 5,
            qrbox: {
                width: 250,
                height: 250
            }
        });
        qrCodeScanner.render(success, error);

        function success(qrCodeMessage) {
            qr_id = qrCodeMessage
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
            try {
                // Step 1: Fetch userId by QR code
                const userIdResponse = await fetch(`${import.meta.env.VITE_LOCALHOST}/admin/getQrUser/${qrId}`, {
                    method: "GET",   // use GET if your backend expects GET
                    headers: {
                        "Content-Type": "application/json",
                       "Authorization": `Bearer ${JSON.parse(localStorage.getItem("userInfo")).jwt}`
                    },
                    credentials: "include"
                });
        
                if (!userIdResponse.ok) {
                    console.log("QR code not found");
                    return;
                }
        
                const userIdData = await userIdResponse.json();  // <-- Extract real data
                console.log("Fetched userId data:", userIdData);
        
                // Now assuming userIdData contains something like { userId: "12345" }
                const userId = userIdData.user;  // adjust according to what your backend sends
        
                // Step 2: Fetch full user details using the userId
                const userResponse = await fetch(`${import.meta.env.VITE_LOCALHOST}/admin/user/${userId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include"
                });
        
                if (userResponse.ok) {
                    const userData = await userResponse.json();
                    setUser(userData);
                    console.log("Fetched user data:", userData);
                } else {
                    console.log("User not found");
                }
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };
        


    }, []);


    const handleTicketValidation = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_LOCALHOST}/admin/verifyTicket/${scanResult}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${JSON.parse(localStorage.getItem("userInfo")).jwt}`
                },
                credentials: "include"
            });
    
            console.log(response);
    
            if (response.ok) {
                alert("Ticket Verified");
            } else {
                const data = await response.json();  // ✅ Add await here
                console.log(data);
    
                if (data.message) {
                    alert(data.message);   // ✅ show backend message
                } else {
                    alert("Some error occurred");
                }
            }
        } catch (error) {
            console.error("Error validating ticket:", error);
            alert("Something went wrong!");
        }
    };
    

    return (
        <>
            <h1>Qr scan platform</h1>
            {scanResult ?
                <div>
                    Success : <a href={scanResult} target="_blank">{scanResult}</a>
                    <br />
                    <div>
                        <h3>User Details: {user.name}</h3>
                        <h3>User PhoneNo: {user.email}</h3>
                        <h3>User Phone Number: {user.phoneNo}</h3>
                        <h2>User College: {user.college}</h2>
                        <h2>User Enrollment No: {user.enrollmentNo}</h2>
                        <button onClick={handleTicketValidation}>Vaidate ticket</button>
                        <br />
                        <br />
                        <button onClick={() => window.location.reload()}>Scan Again</button>
                    </div>
                </div>
                :
                <div id="reader"></div>
            }


        </>
    )
};

export default ScanQR;
