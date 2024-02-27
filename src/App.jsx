import { BrowserRouter, Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <>
      <>
        <BrowserRouter>
          <NoteState>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/whatsapp" element={<Whatsapp />} />
              <Route path="/email" element={<Email />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </NoteState>
        </BrowserRouter>
      </>
    </>
  );
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default App;
