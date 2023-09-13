import React, { useRef, useState } from "react";
import "./styles/loginStyles.css";
import Layout from "../../layout/Layout";
import sideImg from "../../../assets/signup.png";
import { FaApple, FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { Input } from "rsuite";
import { useAuth } from "../../../context/AuthContext";
import { AuthProvider } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();

  const { login, user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setErrors("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/events");
    } catch (e) {
      console.log("error", e);
      setErrors("Sign In failed");
    }

    setLoading(false);
  };

  return (
    <Layout>
      <AuthProvider>
        <div className="login_main_container">
          <div className="main_img">
            <img src={sideImg} alt="" />
          </div>

          <div className="main_login_form">
            <div className="main_header_wrapper">
              <h2>Sign In</h2>
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
              <div className="login_btn">
                <button disabled={loading}>sign in</button>
              </div>
            </form>

            <div className="other_logins">
              <div className="other_header_text">
                <span></span> <p>Or sign in with</p> <span></span>
              </div>
              <div className="media">
                <div className="medium">
                  <button>
                    <FaSquareXTwitter />
                  </button>
                </div>
                <div className="medium">
                  <button>
                    <FcGoogle />
                  </button>
                </div>
                <div className="medium">
                  <button>
                    <FaApple />
                  </button>
                </div>
                <div className="medium">
                  <button>
                    <FaLinkedin style={{ color: "#4361ee" }} />
                  </button>
                </div>
              </div>
            </div>

            <div className="error">
              <p style={{ color: "red", fontFamily: "Montserrat" }}>{errors}</p>
            </div>
          </div>
        </div>
      </AuthProvider>
    </Layout>
  );
};

export default Login;
