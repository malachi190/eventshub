import React, { useEffect } from "react";
import { useNavigate, redirect } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

export default function PrivateRoute({ children }) {
  const { user } = useAuth();
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/')
    }
  }, []);
  return <div>{children}</div>;
}
