import "./styles/registerStyles.css";
import React, { useRef, useState } from "react";
import Layout from "../../layout/Layout";
import sideImg from "../../../assets/signup.png";
import { Input } from "rsuite";
import { useAuth } from "../../../context/AuthContext";
import { AuthProvider } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Register = () => {
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false)
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const navigate = useNavigate()

  const { signup, user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setErrors("Password do not match, check again");
    }

    try {
      setErrors("");
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      navigate('/events')
    } catch (e) {
      console.log("error", e);
    }

    setLoading(false)
  };
  return (
    <Layout>
      <AuthProvider>
        <div className="register_main_container">
          <div className="main_img">
            <img src={sideImg} alt="" />
          </div>

          <div className="main_register_form">
            <div className="main_header_wrapper">
              <h2>Register</h2>
            </div>
            <form action="" className="form" onSubmit={handleSubmit}>
              <div className="input_group">
                <label htmlFor="">Email</label>
                <Input
                  type="email"
                  name="email"
                  placeholder="enter your email address"
                  ref={emailRef}
                />
              </div>
              <div className="input_group">
                <label htmlFor="">Password</label>
                <Input type="password" name="password" ref={passwordRef} />
              </div>
              <div className="input_group">
                <label htmlFor="">Confirm Password</label>
                <Input
                  type="password"
                  name="password"
                  ref={confirmPasswordRef}
                />
                {errors && (
                  <p style={{ color: "red", fontFamily: "Montserrat" }}>
                    {errors}
                  </p>
                )}
              </div>
              <div className="login_btn">
                <button disabled={loading}>register</button>
              </div>
            </form>

            <div className="alternate">
              <p>Already have an account? <Link to={'/'}>Sign In</Link></p>
            </div>  
          </div>
        </div>
      </AuthProvider>
    </Layout>
  );
};

export default Register;
