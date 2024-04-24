import {Html5QrcodeScanner} from "html5-qrcode";
import{ useState , useEffect} from "react";


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
            setScanResult(qrCodeMessage);
            qrCodeScanner.clear();
        }

        function error(err) {
            console.error(err);
        }

        const getUserDetail = async (qrId) => {

            const response = await fetch(`${import.meta.env.VITE_LOCALHOST}/admin/getUser/${qrId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include"
            });

            if(response.ok){
                const data = await response.json();
                setUser(data);
                console.log(data);
            }
            else{
                console.log("Not found")
            }
            
        }
        
  
        

    }, []);


    const handleTicketValidation = async () =>{
        const response = await fetch(`${import.meta.env.VITE_LOCALHOST}/admin/verifyTicket/${scanResult}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include"
        });

        if(response.ok){
            alert("Ticket Verified")
            console.log("Ticket Verified")
        }
        else{
            alert("Ticket Not Verified")
            console.log("Ticket Not Verified")
        }
    }

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
                    {/* <button onClick={() => windows.location.reload()}>Scan Again</button> */}
                </div>
              </div>
              :
              <div id="reader"></div>
            }
   
        
        </>
    )
};

export default ScanQR;
