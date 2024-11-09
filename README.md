### 🗒️ Guía de Integración de Firebase en React para Autenticación

La autenticación con **Firebase** en React simplifica la gestión de usuarios en aplicaciones, ofreciendo métodos de inicio de sesión, registro y verificación del estado de la sesión. A continuación, se explican los conceptos clave y se presentan ejemplos de código para implementar esta funcionalidad.

---

## 1. **Configuración inicial de Firebase en React**

### `firebaseConfig`

Contiene las credenciales de tu proyecto Firebase. Este objeto configura la conexión entre tu aplicación y Firebase.

```javascript
// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
```

**Explicación**: Aquí se inicializa la app de Firebase con las credenciales del proyecto, y `auth` proporciona el objeto de autenticación para los métodos de Firebase.

---

## 2. **Manejo de Estado de Autenticación**

### `onAuthStateChanged`

Permite escuchar cambios en el estado de autenticación (inicio o cierre de sesión) y actualizar la interfaz.

```javascript
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>{user ? <p>Bienvenido, {user.email}</p> : <p>Inicia Sesión</p>}</div>
  );
};
```

**Explicación**: `onAuthStateChanged` escucha cambios en el estado de autenticación. En este caso, actualiza el componente con los datos del usuario actual.

---

## 3. **Registro de Usuarios**

### `createUserWithEmailAndPassword`

Permite registrar un usuario con email y contraseña.

```javascript
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Usuario registrado:", userCredential.user);
    } catch (error) {
      console.error("Error en el registro:", error.message);
    }
  };

  return (
    <div>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
      />
      <button onClick={handleRegister}>Registrar</button>
    </div>
  );
};
```

**Explicación**: Al hacer clic en el botón, `createUserWithEmailAndPassword` registra al usuario. Si el registro es exitoso, se muestra el usuario; en caso contrario, se muestra un error.

---

## 4. **Inicio de Sesión**

### `signInWithEmailAndPassword`

Autentica a un usuario existente con email y contraseña.

```javascript
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Usuario logueado:", userCredential.user);
    } catch (error) {
      console.error("Error en el inicio de sesión:", error.message);
    }
  };

  return (
    <div>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
      />
      <button onClick={handleLogin}>Iniciar Sesión</button>
    </div>
  );
};
```

**Explicación**: `signInWithEmailAndPassword` verifica las credenciales. Si son correctas, el usuario se autentica y la aplicación actualiza el estado.

---

## 5. **Cerrar Sesión**

### `signOut`

Cierra la sesión del usuario actual.

```javascript
import { signOut } from "firebase/auth";
import { auth } from "./firebase";

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Sesión cerrada exitosamente");
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
    }
  };

  return <button onClick={handleLogout}>Cerrar Sesión</button>;
};
```

**Explicación**: `signOut` elimina la sesión actual del usuario en Firebase y permite al usuario iniciar sesión nuevamente si lo desea.

---

## Resumen del Código Completo

A continuación, una aplicación completa integrando autenticación básica con Firebase:

```javascript
// src/App.js
import React, { useState, useEffect } from "react";
import {
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebase";

const App = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error en el registro:", error.message);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error en el inicio de sesión:", error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
    }
  };

  return (
    <div>
      {user ? (
        <>
          <p>Bienvenido, {user.email}</p>
          <button onClick={handleLogout}>Cerrar Sesión</button>
        </>
      ) : (
        <>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
          />
          <button onClick={handleRegister}>Registrar</button>
          <button onClick={handleLogin}>Iniciar Sesión</button>
        </>
      )}
    </div>
  );
};

export default App;
```

En esta aplicación:

- **`onAuthStateChanged`** se usa para escuchar el estado de la sesión.
- **`createUserWithEmailAndPassword`** para registrar nuevos usuarios.
- **`signInWithEmailAndPassword`** para que usuarios existentes inicien sesión.
- **`signOut`** para cerrar sesión de manera segura.

Este enfoque permite gestionar todo el ciclo de autenticación de usuarios en una aplicación React.

Made by Prof. Martin with a lot of 💖 and ☕
