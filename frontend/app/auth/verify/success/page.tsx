"use client";

import React from "react";
import Lottie from "react-lottie-player";
import successAnimation from "@/public/lottie/success.json";
import { useRouter } from "next/navigation";

const VerificationSuccess = () => {
  
  const router = useRouter();

  return (
    <section className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center">
        {/* Lottie Animation */}
        <Lottie
          loop={false}
          animationData={successAnimation}
          play
          className="w-40 h-40 mx-auto"
        />

        <h1 className="text-2xl font-bold text-gray-800 mt-4">Email Sent Successfully!</h1>
        <p className="text-gray-600 mt-2">
          We have sent a verification link to your email. Please check your inbox and verify your account.
        </p>

        <button
          onClick={() => router.push("/auth/login")}
          className="mt-6 bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Back to Login
        </button>
      </div>
    </section>
  );
};

export default VerificationSuccess;
