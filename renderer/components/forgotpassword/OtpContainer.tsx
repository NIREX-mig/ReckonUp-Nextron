import React, { useState, useRef, useMemo, useEffect } from "react";
import Button from "../ui/Button";

const OTP_LENGTH = 6;

const OtpContainer = ({
  setFinalOtp,
  handleOtpSumbmit,
  loading,
  resendOtp,
}) => {
  // 1. Internal state for the individual input fields (6 empty strings)
  const [otpDigits, setOtpDigits] = useState(new Array(OTP_LENGTH).fill(""));

  // 2. Ref for accessing the input elements to manage focus
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  // 3. Derived state: The full OTP string to be used for submission
  const fullOtp = useMemo(() => otpDigits.join(""), [otpDigits]);

  useEffect(() => {
    // This ensures the parent component's state (`finalOtp`) is always up-to-date
    // with the combined input from the 6 boxes.
    setFinalOtp(fullOtp);
  }, [fullOtp, setFinalOtp]);

  // --- Core OTP Logic ---

  // Handle input change: updates digit, enforces single digit, and moves focus
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtpDigits = [...otpDigits];
    // Take only the last character entered (handles paste/rapid typing)
    newOtpDigits[index] = element.value.slice(-1);
    setOtpDigits(newOtpDigits);

    // Auto-focus to the next input field
    if (element.value !== "" && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle key-down events (e.g., Backspace for backward navigation)
  const handleKeyDown = (e, index) => {
    // If Backspace is pressed and the current field is empty, move focus to the previous field
    if (e.key === "Backspace" && index > 0 && otpDigits[index] === "") {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste event for quickly filling all fields
  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").trim();

    // Validate the pasted data: must be 6 digits
    if (pasteData.length === OTP_LENGTH && /^\d+$/.test(pasteData)) {
      const newOtpDigits = pasteData.split("").slice(0, OTP_LENGTH);
      setOtpDigits(newOtpDigits);

      // Move focus to the last input field after paste
      inputRefs.current[OTP_LENGTH - 1]?.focus();
    }
  };

  return (
    <div className="w-[30rem] bg-primary-50">
      <h3 className="text-center font-bold text-4xl mb-4 text-primary-900">
        OTP Verification
      </h3>
      <p className="text-center text-lg mb-5 text-primary-900">
        Enter The {OTP_LENGTH}-Digit OTP You Have Received!
      </p>
      <form onSubmit={handleOtpSumbmit} className="p-4 w-[27rem] mx-auto">
        <div className="mb-5" onPaste={handlePaste}>
          <div className="relative flex gap-2 justify-center">
            {otpDigits.map((data, index) => (
              <input
                key={index}
                type="text"
                name={`otp-${index}`}
                maxLength={1}
                value={data}
                onChange={(e) => handleChange(e.currentTarget, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                className="w-10 h-12 text-center text-xl font-semiboldbg-primary-100 border border-primary-900 text-primary-900 rounded-md focus:outline-primary-900 focus:ring-1 focus:ring-primary-900 block p-2 transition duration-150"
                autoFocus={index === 0}
              />
            ))}
          </div>
        </div>

        <Button
          buttonType="submit"
          title={loading ? "Wait..." : "Verify OTP"}
          extraClass={`font-semibold py-2 w-full transition duration-300 ease-in-out ${
            fullOtp.length === OTP_LENGTH && !loading
              ? "bg-primary-800 text-white hover:bg-primary-900"
              : "bg-gray-400 text-gray-700 cursor-not-allowed"
          }`}
          loading={loading}
          disabled={loading || fullOtp.length !== OTP_LENGTH}
        />
      </form>
      <div className="mt-4 text-center">
        <p className="text-md font-semibold text-gray-500">
          Didn't receive the code?
          <Button
            title="Resend Code"
            handleClick={resendOtp}
            extraClass="text-primary-700 hover:text-primary-900 font-medium ml-1"
          />
        </p>
      </div>
    </div>
  );
};

export default OtpContainer;
