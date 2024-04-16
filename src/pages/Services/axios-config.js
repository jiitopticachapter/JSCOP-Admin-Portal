import axios from "axios";

const publicReq  = axios.create();
// const privateReq = axios.create();

// privateReq.interceptors.request.use((config)=>{
//     const token  = localStorage.getItem("token");
//     if(token)
//     {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });

// export {privateReq};
export default publicReq;
