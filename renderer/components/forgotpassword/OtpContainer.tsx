import React, { useState, useRef, useMemo, useEffect } from "react";
import Button from "../ui/Button";

// const OtpContainer = ({ finalOtp, setFinalOtp, handleOtpSumbmit, loading }) => {
//   // 1. State for the OTP array (initialized to 6 empty strings)
//   const [otp, setOtp] = useState(new Array(6).fill(""));

//   // 2. Ref for accessing the input elements directly to manage focus
//   const inputRefs = useRef([]);

//   // 3. Derived state: The full OTP string
//   const fullOtp = useMemo(() => otp.join(""), [otp]);

//   // 4. Function to handle input change
//   const handleChange = (element, index) => {
//     // Ensure only a single digit is entered and it's a number
//     if (isNaN(element.value)) return;

//     // Update the state array
//     const newOtp = [...otp];
//     // Take only the last character entered, to handle paste events
//     newOtp[index] = element.value.slice(-1);
//     setOtp(newOtp);

//     // Auto-focus to the next input field
//     if (element.value !== "" && index < 5) {
//       inputRefs.current[index + 1]?.focus();
//     }
//   };

//   // 5. Function to handle key-down events (e.g., Backspace)
//   const handleKeyDown = (e, index) => {
//     // If Backspace is pressed and the current field is empty, move focus to the previous field
//     if (e.key === "Backspace" && index > 0 && otp[index] === "") {
//       inputRefs.current[index - 1]?.focus();
//     }
//   };

//   // 6. Function to handle paste event
//   const handlePaste = (e) => {
//     e.preventDefault();
//     const pasteData = e.clipboardData.getData("text").trim();

//     // Validate the pasted data: must be 6 digits
//     if (pasteData.length === 6 && /^\d+$/.test(pasteData)) {
//       const newOtp = pasteData.split("");
//       setOtp(newOtp);

//       // Optionally, move focus to the last input field after paste
//       inputRefs.current[5]?.focus();
//     }
//   };

//   // 7. Function for submission (Simulated)
//   const handleSubmit = () => {
//     if (fullOtp.length === 6) {
//       alert(`OTP Entered: ${fullOtp}`);
//       // In a real application, you would send 'fullOtp' to your backend
//     } else {
//       alert("Please enter the complete 6-digit OTP.");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
//       <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
//         <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
//           Enter OTP
//         </h2>
//         <p className="text-sm text-gray-500 mb-8 text-center">
//           A 6-digit code has been sent to your mobile number.
//         </p>

//         {/* OTP Input Fields Container */}
//         <div className="flex justify-between space-x-2" onPaste={handlePaste}>
//           {otp.map((data, index) => (
//             <input
//               key={index}
//               type="text"
//               name={`otp-${index}`}
//               maxLength="1" // Crucial for single-digit input
//               value={data}
//               onChange={(e) => handleChange(e.target, index)}
//               onKeyDown={(e) => handleKeyDown(e, index)}
//               ref={(el) => (inputRefs.current[index] = el)} // Attach ref
//               className="w-12 h-14 text-center text-2xl font-semibold
//                          border border-gray-300 rounded-lg shadow-inner
//                          focus:border-blue-500 focus:ring-1 focus:ring-blue-500
//                          transition duration-150 ease-in-out
//                          bg-gray-50 hover:bg-white"
//               // Automatically focus on the first input on load
//               autoFocus={index === 0}
//             />
//           ))}
//         </div>

//         <div className="mt-8">
//           <button
//             onClick={handleSubmit}
//             // Tailwind class for button styling, disabled state included
//             className={`w-full py-3 rounded-lg text-white font-bold transition duration-300 ease-in-out
//                         ${
//                           fullOtp.length === 6
//                             ? "bg-blue-600 hover:bg-blue-700"
//                             : "bg-gray-400 cursor-not-allowed"
//                         }`}
//             disabled={fullOtp.length !== 6}
//           >
//             Verify & Proceed
//           </button>
//         </div>

//         {/* Helper text/resend link */}
//         <div className="mt-4 text-center">
//           <p className="text-sm text-gray-500">
//             Didn't receive the code?
//             <button className="text-blue-600 hover:text-blue-700 font-medium ml-1">
//               Resend Code
//             </button>
//           </p>
//         </div>

//         {/* For testing/debugging */}
//         {/* <p className="mt-4 text-center text-xs text-green-600">
//           Current OTP: {fullOtp}
//         </p> */}
//       </div>
//     </div>
//   );
// };

// export default OtpContainer;

const OTP_LENGTH = 6;

const OtpContainer = ({ finalOtp, setFinalOtp, handleOtpSumbmit, loading }) => {
  // 1. Internal state for the individual input fields (6 empty strings)
  const [otpDigits, setOtpDigits] = useState(new Array(OTP_LENGTH).fill(""));

  // 2. Ref for accessing the input elements to manage focus
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  // 3. Derived state: The full OTP string to be used for submission
  const fullOtp = useMemo(() => otpDigits.join(""), [otpDigits]);

  // Sync the external finalOtp state with the internal fullOtp whenever it changes
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

  // --- Rendered Component ---

  return (
    <div className="w-[30rem] bg-primary-50">
      <h3 className="text-center font-bold text-4xl mb-4 text-primary-900">
        OTP Verification
      </h3>
      <p className="text-center text-lg mb-5 text-primary-900">
        Enter The {OTP_LENGTH}-Digit OTP You Have Received!
      </p>
      {/* Attach onSubmit to the form and onPaste to the container */}
      <form onSubmit={handleOtpSumbmit} className="p-4 w-[27rem] mx-auto">
        <div className="mb-5" onPaste={handlePaste}>
          <div className="relative flex gap-2 justify-center">
            {/* Render the 6 individual OTP input fields */}
            {otpDigits.map((data, index) => (
              <input
                key={index}
                type="text"
                name={`otp-${index}`}
                maxLength={1}
                value={data}
                onChange={(e) => handleChange(e.currentTarget, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => { inputRefs.current[index] = el; }} // Attach ref (returns void)
                // Tailwind classes for individual OTP boxes
                className="w-10 h-12 text-center text-xl font-semibold 
                           bg-primary-100 border border-primary-900 text-primary-900 
                           rounded-md focus:outline-primary-900 focus:ring-1 
                           focus:ring-primary-900 block p-2 transition duration-150"
                autoFocus={index === 0} // Focus the first input on component load
              />
            ))}
          </div>
        </div>

        <Button
          buttonType="submit"
          // Title is conditionally rendered
          title={loading ? "Wait..." : "Verify OTP"}
          extraClass={`font-semibold py-2 w-full transition duration-300 ease-in-out
                      ${
                        fullOtp.length === OTP_LENGTH && !loading
                          ? "bg-primary-800 text-white hover:bg-primary-900"
                          : "bg-gray-400 text-gray-700 cursor-not-allowed"
                      }`}
          loading={loading}
          // Disable if loading or if OTP is not complete
          disabled={loading || fullOtp.length !== OTP_LENGTH}
        />
      </form>
      <div className="mt-4 text-center">
        <p className="text-md font-semibold text-gray-500">
          Didn't receive the code?
          <Button title="Resend Code" extraClass="text-primary-700 hover:text-primary-900 font-medium ml-1"/>
        </p>
      </div>
      ?
    </div>
  );
};

export default OtpContainer;
