/* eslint-disable react/prop-types */
import app from "../app";
import { getAuth, signOut } from "firebase/auth";
const auth = getAuth(app);

function Home({ correo }) {
  return (
    <div>
      <h2>Bienvenido {correo}</h2>
      <button onClick={() => signOut(auth)}>Logout</button>
    </div>
  );
}

export default Home;
