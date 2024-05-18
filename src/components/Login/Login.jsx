import React, { useState } from "react";
import "./Login.css";
import { useFirebase } from "../../context/firebase";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const firebase = useFirebase();

  async function handleSubmit(event) {
    event.preventDefault();
    setEmail("");
    setPassword("");
    try {
      const result = await firebase.SignInWithEmailAndPassword(email, password);

      toast.success("Login successful", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      navigate("/home");
      console.log(result);
    } catch (error) {
      console.log("error occured");
      toast.error("enter valid email and password");
    }
  }

  return (
    <div className="login-container">
      <div className="login-form">
        <h1 className="login-title">Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="login-input"
          />
          <button
            type="submit"
            className="login-button"
            style={{ marginBottom: "10px" }}
          >
            Login
          </button>
          Don't have an account??<Link to="/register"> register</Link>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
