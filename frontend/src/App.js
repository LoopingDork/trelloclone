import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './admin/Login'
import Register from './admin/Register'
import Dashboard from "./admin/Dashboard";
import EditData from "./edit/EditData";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/:paramTitle/:paramDescription/:paramOrder/:paramLabel/:paramListId/:paramDueDate/edit/:paramId" element={<EditData />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
