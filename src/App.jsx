import './App.css';
import { useNavigate, BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalState";
import { useState, useEffect } from "react";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

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
          <Route path="/agendas/signup" element={<SignUp/>}/>
        </Routes>
      </GlobalProvider>
    </Router>
  );
}

export default App;
