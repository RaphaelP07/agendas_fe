import './App.css';
import { useNavigate, BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalState";
import { useState, useEffect } from "react";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import NamePrompt from "./components/NamePrompt";
import OrgPrompt from "./components/OrgPrompt";
import OrgForm from "./components/OrgForm";
import Dashboard from "./components/Dashboard";
import Organisation from "./components/Organisation";
import Meeting from "./components/Meeting";

function App() {
  const [loggedUser, setLoggedUser] = useState("");
  const [loggedID, setLoggedID] = useState("");
  const [alert, setAlert] = useState('')
  const [orgAction, setOrgAction] = useState('')

  return (
    <Router>
      <GlobalProvider>
        <div className={alert === '' ? '' : 'alert'}>
          <p>{alert}</p>
        </div>
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
                setAlert={(alert) => setAlert(alert)}
              />
            }
          />
          <Route
            path="/agendas/org-prompt"
            element={
              <OrgPrompt
                setAlert={(alert) => setAlert(alert)}
                setOrgAction={(action) => setOrgAction(action)}
              />
            }
          />
          <Route
            path="/agendas/org-form"
            element={
              <OrgForm
                orgAction={orgAction}
                setAlert={(alert) => setAlert(alert)}
              />
            }
          />
          <Route path="agendas/meetings">
            <Route
              path=':meetingId'
              element={
                <Meeting
                  setAlert={(alert) => setAlert(alert)}
                />
              }
            />
          </Route>
          <Route
            path="/agendas/organisations"
            element={
              <Dashboard
                loggedUser={loggedUser}
                setLoggedUser={(email) => setLoggedUser(email)}
                setLoggedID={(id) => setLoggedID(id)}
                setAlert={(alert) => setAlert(alert)}
              />
            }
          >
            <Route 
              path=":organisationId" 
              element={
                <Organisation
                setAlert={(alert) => setAlert(alert)}
                />
              }
            />
          </Route>
          <Route path="/agendas/signup" element={<SignUp/>}/>
        </Routes>
      </GlobalProvider>
    </Router>
  );
}

export default App;
