import { BrowserRouter, Route, Routes } from "react-router-dom";
import Form from "./Components/Form";
import { LogHistory } from "./Components/LogHistory";
import Layout from "./Pages/Layout";
import { CssBaseline } from "@mui/material";

function App() {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Form />} />
            <Route path="/logs" element={<LogHistory />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
