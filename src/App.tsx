import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./store/Slices/authSlic";
import Layout from "./Layout/Layout";
import AuthLayout from "./components/AuthLayout";
import HomePage from "./pages/HomePage";

function App() {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getCurrentUser());
  // }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />} >
        <Route path="" element={<AuthLayout authentication={false}>
             <HomePage />
        </AuthLayout>} />
        </Route>
      </Routes>
      <Toaster
                position="top-right"
                reverseOrder={true}
                toastOptions={{
                    error: {
                        style: { borderRadius: "0", color: "red" },
                    },
                    success: {
                        style: { borderRadius: "0", color: "green" },
                    },
                    duration: 2000,
                }}
            />
    </>
  );
}

export default App;

