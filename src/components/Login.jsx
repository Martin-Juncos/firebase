import { useState } from "react";
import app from "../app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
const auth = getAuth(app);

function Login() {
  const [registrado, setRegistrado] = useState(false);
  const handleAuth = (e) => {
    e.preventDefault();
    const correo = e.target.email.value;
    const password = e.target.password.value;
    if (registrado) {
      try {
        createUserWithEmailAndPassword(auth, correo, password);
      } catch (error) {
        console.log(error);
        alert("Problemas en el registro");
      }
    } else {
      try {
        signInWithEmailAndPassword(auth, correo, password);
      } catch (error) {
        console.log(error);
        alert("La contraseña o el pass son incorrectos");
      }
    }
  };
  return (
    <div>
      <h2>{registrado ? "Registro" : "Login"}</h2>
      <div>
        <form onSubmit={handleAuth}>
          <input type="email" name="email" id="email" />
          <input type="password" name="password" id="password" />
          <button>{registrado ? "Registrarse" : "Iniciar sesion"}</button>
        </form>
      </div>
      <div>
        {registrado ? "Ya tienes cuenta...  " : "No tienes cuenta?   "}
        <button onClick={() => setRegistrado(!registrado)}>
          {registrado ? "Iniciar sesion" : "Registrarse"}
        </button>
      </div>
    </div>
  );
}

export default Login;
