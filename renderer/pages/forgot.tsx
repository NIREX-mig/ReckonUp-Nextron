import React, { useRef, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import NewPasswordContainer from "../components/forgotpassword/NewPasswordContainer";
import OtpContainer from "../components/forgotpassword/OtpContainer";
import ForgotContainer from "../components/forgotpassword/ForgotContainer";
import { useRouter } from "next/router";
import { APiRes } from "../types";
import toast, { Toaster } from "react-hot-toast";
import { useIsOnline } from "react-use-is-online";
import Link from "next/link";
import { appTitle } from "../constents";

// Unified Step Management
const STEPS = {
  FORGOT: "forgot",
  OTP: "otp",
  NEW_PASSWORD: "newPassword",
};

export default function ForgotPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { isOffline } = useIsOnline();

  const [username, setUsername] = useState("app-admin");
  const [finalOtp, setFinalOtp] = useState("");
  const [formData, setFormData] = useState({
    newpassword: "",
    comfirmpassword: "",
  });

  const [step, setStep] = useState(STEPS.FORGOT);

  // Use a ref instead of localStorage for temporary token
  const tempToken = useRef(null);

  const handleOnChange = (e) => {
    setUsername(e.target.value);
  };

  // Function to handle the first step: send username/email
  const handleUsernameSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    window.ipc.send("forgotpasswordemail", { username });

    window.ipc.on("forgotpasswordemail", (res: APiRes) => {
      if (res.success) {
        tempToken.current = res.data;
        toast.success(res.message);
        setLoading(false);
        setStep(STEPS.OTP);
      } else {
        setLoading(false);
        toast.error(res.message);
      }
    });
  };

  const handleOtpSumbmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = tempToken.current;
    if (!token) {
      toast.error("Session expired or missing token. Start over.");
      setStep(STEPS.FORGOT);
      setLoading(false);
      router.push("/home");
      return;
    }

    window.ipc.send("validateotp", { otp: finalOtp, token });

    window.ipc.on("validateotp", (res: APiRes) => {
      if (res.success) {
        setLoading(false);
        toast.success(res.message);
        setStep(STEPS.NEW_PASSWORD);
      } else {
        setLoading(false);
        toast.error(res.message);
      }
    });
  };

  const handleNewPasswordSubmit = async (e) => {
    e.preventDefault();

    // Client-side guard (should match NewPasswordContainer logic)
    const passwordMatch = formData.newpassword === formData.comfirmpassword;

    if (!passwordMatch) {
      toast.error("Please ensure passwords match and meet the minimum length.");
      return;
    }

    setLoading(true);

    const token = tempToken.current;
    if (!token) {
      toast.error("Session expired or missing token. Start over.");
      setStep(STEPS.FORGOT);
      setLoading(false);
      router.push("/home");
      return;
    }

    window.ipc.send("forgotpassword", {
      newpassword: formData.newpassword,
      token,
    });

    window.ipc.on("forgotpassword", (res: APiRes) => {
      if (res.success) {
        setLoading(false);
        tempToken.current = null; // Clear token after success
        toast.success(res.message);
        // Redirect logic
        router.push("/home");
      } else {
        setLoading(false);
        toast.error(res.message);
      }
    });
  };

  const handleResendOtp = async (e) => {
    e.preventDefault();
    tempToken.current = null;
    window.ipc.send("forgotpasswordemail", { username });

    window.ipc.on("forgotpasswordemail", (res: APiRes) => {
      if (res.success) {
        tempToken.current = res.data;
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    });
  };

  if (isOffline) {
    return (
      <section className="w-full h-screen flex justify-center items-center">
        <Head>
          width={300}
          <title>{appTitle}</title>
        </Head>
        <div className="flex flex-col justify-center items-center gap-10">
          <Image
            src="/NoInternet.gif"
            alt="nointernetgif"
            height={300}
            width={300}
            draggable="false"
            priority
          />
          <h1 className="text-black text-2xl font-bold">
            No Internet Connection Is Found. Check your Connection And Try Again
          </h1>
          <Link
            href="/home"
            draggable="false"
            className="px-7 py-2 bg-btn rounded-full bg-primary-800 text-white font-semibold"
          >
            Go Back
          </Link>
        </div>
      </section>
    );
  }

  return (
    <React.Fragment>
      <Head>
        <title>{appTitle}</title>
      </Head>
      <section className="bg-primary-50 h-screen flex justify-center gap-5 items-center">
        <Toaster />
        <div className="bg-primary-50 rounded-lg p-4">
          <Image
            src="/LoginAnimation.gif"
            alt="loginanimationgif"
            width={500}
            height={500}
            className=""
            draggable="false"
            priority
          />
        </div>
        {step === STEPS.FORGOT && (
          <ForgotContainer
            username={username}
            handleOnChange={handleOnChange}
            handleUsernameSubmit={handleUsernameSubmit}
            loading={loading}
          />
        )}
        {step === STEPS.OTP && (
          <OtpContainer
            resendOtp={handleResendOtp}
            setFinalOtp={setFinalOtp}
            handleOtpSumbmit={handleOtpSumbmit}
            loading={loading}
          />
        )}
        {step === STEPS.NEW_PASSWORD && (
          <NewPasswordContainer
            formData={formData}
            setFormData={setFormData}
            handleNewPasswordSubmit={handleNewPasswordSubmit}
            loading={loading}
          />
        )}
      </section>
    </React.Fragment>
  );
}
