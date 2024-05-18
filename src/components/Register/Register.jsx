import React, { useState } from "react";
import "./Register.css";
import { useFirebase } from "../../context/firebase";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";


const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const firebase = useFirebase();
  // console.log(firebase);

  async function handleSubmit(event) {
    event.preventDefault();
    setEmail("");
    setPassword("");
    try {
      const result = await firebase.SignUpWithEmailAndPassword(email, password);

      navigate("/login");

      toast.success("Registeration successful", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      localStorage.setItem("user", JSON.stringify(result));
    } catch (error) {
      console.log("error occured");
      toast.error("Unable to register");
    }
  }

  return (
    <div className="register-container">
      <div className="register-form">
        <h1 className="register-title">Register</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="register-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="register-input"
          />
          <button type="submit" className="register-button" style={{marginBottom:"10px"}}>
            Register
          </button>
          Already have an account??<Link to="/login" > login</Link>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Register;
