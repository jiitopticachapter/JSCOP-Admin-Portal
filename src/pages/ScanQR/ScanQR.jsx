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
                const data = response.json();
                console.log(data);
            }
            else{
                console.log("Not found")
            }
            
        }
        
  
        

    }, []);


    return (
        <>
            <h1>Qr scan platform</h1>
            {scanResult ? 
              <div>
                Success : <a href={scanResult} target="_blank">{scanResult}</a>
              </div>
              :
              <div id="reader"></div>
            }
   
        
        </>
    )
};

export default ScanQR;
