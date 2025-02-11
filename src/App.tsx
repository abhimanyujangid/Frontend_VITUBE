import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./store/Slices/authSlic";
import Layout from "./Layout/Layout";
import AuthLayout from "./components/AuthLayout";
import HomePage from "./pages/HomePage";
import SearchVideos from "./pages/SearchVideos";
import Login from "./components/Login";
import SignUp from "./components/Signup";

function App() {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getCurrentUser());
  // }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />} >
        <Route path="" element={<AuthLayout authentication={false}><HomePage /></AuthLayout>} />
        <Route path="/search/:query" element={ <AuthLayout authentication={false}><SearchVideos /></AuthLayout>}/>
        </Route>
        <Route path="/login" element={ <AuthLayout authentication={false}> <Login /> </AuthLayout>}/> 
        <Route path="/signup" element={ <AuthLayout authentication={false}> <SignUp /></AuthLayout> }/>
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

