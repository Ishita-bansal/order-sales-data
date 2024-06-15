import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Addsales, Login } from "../pages";
import { useSelector } from "react-redux";

const Router = () => {
  const isLoggedUser = useSelector((state) => state.loginReducer.isLoggedin);
  console.log("isLoggedUser", isLoggedUser);

  const PrivateRouter = ({ element }) => {
    return isLoggedUser ? element : <Navigate to="/login" />;
  };

  const PublicRouter = ({ element }) => {
    return !isLoggedUser ? element : <Navigate to="/add-sales" />;
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<PublicRouter element={<Login />} />} />
          <Route
            path="/add-sales"
            element={<PrivateRouter element={<Addsales />} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
