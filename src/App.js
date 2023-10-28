import logo from "./logo.svg";
import "./App.css";

import ChatPage from "./components/Chat";
import Nav from "./components/Nav";
import Test from "./components/Test";
import UserLogin from "./components/UserLogin";
import PageNotFound from "./components/PageNotFound";
import Employees from "./components/Employees";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AuthGuard from "./AuthGuard";

function App() {
  // Check the value as a string

  return (
    <div className="App">
      <Router>
        <Nav user={{ userName: localStorage.getItem("name"), role: localStorage.getItem("role") }} />
        <Routes>
          <Route path="/" element={<UserLogin />} />
          <Route exact path="/dashboard" element={<AuthGuard><Dashboard /></AuthGuard>} />
          <Route exact path="/manage" element={<AuthGuard><Employees /></AuthGuard>} />
          <Route exact path="/chat" element={<AuthGuard><ChatPage /></AuthGuard>} />
          <Route exact path="/login" element={<AuthGuard><Login /></AuthGuard>} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
