import React, { useEffect } from "react";
import Swal from "sweetalert2";
import LoginForm from "../../components/LoginForm/LoginForm";
import { useUser } from "../../context/UserContext";

export default function Login() {

    const {handleLoginSuccess} = useUser();

  useEffect(() => {
    Swal.fire({
      title: "Cuenta de prueba",
      html: `
        <p><strong>Email:</strong> martinalejandrorodriguez@gmail.com</p>
        <p><strong>Password:</strong> bootcamp2025</p>
      `,
      icon: "info",
      confirmButtonText: "Entendido",
    });
  }, []);

  return (
    <main className="container">
      <LoginForm onLoginSuccess={handleLoginSuccess} />
    </main>
  );
}
