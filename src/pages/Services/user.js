import publicReq from "./axios-config";

const whatsappMessage = (data) => {
    console.log("inside process : data -> "+JSON.stringify(data));
    return publicReq.post("/api/send-message", JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  };
  

export {whatsappMessage};