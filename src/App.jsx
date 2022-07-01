import './App.css';
import { useNavigate, BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalState";
import { useState, useEffect } from "react";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import NamePrompt from "./components/NamePrompt";
import OrgPrompt from "./components/OrgPrompt";
import Dashboard from "./components/Dashboard";

function App() {
  const [loggedUser, setLoggedUser] = useState("");
  const [loggedID, setLoggedID] = useState("");

  return (
    <Router>
      <GlobalProvider>
        <Routes>
          <Route
            path="/agendas/login"
            element={
              <Login
                loggedUser={loggedUser}
                setLoggedUser={(email) => setLoggedUser(email)}
                setLoggedID={(id) => setLoggedID(id)}
              />
            }
          />
          <Route
            path="/agendas/name-prompt"
            element={
              <NamePrompt
              loggedUser={loggedUser}
              setLoggedUser={(email) => setLoggedUser(email)}
              setLoggedID={(id) => setLoggedID(id)}
              />
            }
          />
          <Route
            path="/agendas/org-prompt"
            element={
              <OrgPrompt
                loggedUser={loggedUser}
                setLoggedUser={(email) => setLoggedUser(email)}
                setLoggedID={(id) => setLoggedID(id)}
              />
            }
          />
          <Route
            path="/agendas/dashboard"
            element={
              <Dashboard
                loggedUser={loggedUser}
                setLoggedUser={(email) => setLoggedUser(email)}
                setLoggedID={(id) => setLoggedID(id)}
              />
            }
          />
          <Route path="/agendas/signup" element={<SignUp/>}/>
        </Routes>
      </GlobalProvider>
    </Router>
  );
}

export default App;
