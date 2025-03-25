"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store/store";
import { verifyEmail } from "@/app/store/features/authSlice";
import LoadingSpinner from "@/app/components/spinner/LoadingSpinner";
import dynamic from "next/dynamic";
import successAnimation from "@/public/lottie/success.json";
import errorAnimation from "@/public/lottie/error.json";


// ✅ Dynamically import Lottie to prevent SSR issues
const Lottie = dynamic(() => import("react-lottie-player"), { ssr: false });


const VerifyEmail = () => {
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const dispatch = useDispatch<AppDispatch>();

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setStatus("error");
        setMessage("Invalid or missing verification token.");
        return;
      }

      try {
        const response = await dispatch(verifyEmail(token));
        if (response.payload.success) {
          setStatus("success");
          setMessage(response.payload.message);
        } else {
          if (response.payload.status === 401) {
            setStatus("success");
            setMessage(response.payload.message);
          } else {
            setStatus("error");
            setMessage(response.payload.message);
          }
        }
      } catch (error) {
        console.error("Verification error:", error);
        setStatus("error");
        setMessage("Something went wrong. Please try again.");
      }
    };

    verify();
  }, [token]); // ✅ Runs only when `token` changes

  return (
    <section className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center">
        {status === "loading" && (
          <>
            <LoadingSpinner />
            <p className="text-gray-600 mt-2">Verifying email, please wait...</p>
          </>
        )}

        {status === "success" && (
          <>
            <Lottie loop={false} animationData={successAnimation} play className="w-40 h-40 mx-auto" />
            <h1 className="text-2xl font-bold text-gray-800 mt-4">Email Verified Successfully!</h1>
            <p className="text-gray-600 mt-2">{message || "You can now log in to your account."}</p>
            <button
              onClick={() => router.push("/auth/login")}
              className="mt-6 bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Back to Login
            </button>
          </>
        )}

        {status === "error" && (
          <>
            <Lottie loop={false} animationData={errorAnimation} play className="w-40 h-40 mx-auto" />
            <h1 className="text-2xl font-bold text-red-600 mt-4">Verification Failed</h1>
            <p className="text-gray-600 mt-2">{message || "The verification link is invalid or expired."}</p>
          </>
        )}
      </div>
    </section>
  );
};

export default VerifyEmail;
