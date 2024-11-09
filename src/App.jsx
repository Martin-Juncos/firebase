import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import app from "../src/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
const auth = getAuth(app);

function App() {
  const [usuario, setUsuario] = useState(null);
  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase) {
      setUsuario(usuarioFirebase);
    } else {
      setUsuario(null);
    }
  });

  return (
    <>
      <h3>App</h3>
      {usuario ? <Home correo={usuario.email} /> : <Login />}
    </>
  );
}

export default App;
