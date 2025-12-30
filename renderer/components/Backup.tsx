import React, { useState, useEffect } from "react";
import { FaDatabase } from "react-icons/fa";
import { LuRefreshCcw } from "react-icons/lu";
import { CiClock2 } from "react-icons/ci";
import Button from "./ui/Button";

const ManualBackup = () => {
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [progress, setProgress] = useState(0);
  const [lastBackup, setLastBackup] = useState("Oct 24, 2023 - 04:12 PM");

  const handleBackup = () => {
    setIsBackingUp(true);
    setProgress(0);
  };

  useEffect(() => {
    let interval;
    if (isBackingUp && progress < 100) {
      interval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 5, 100));
      }, 200);
    } else if (progress === 100) {
      setIsBackingUp(false);
      setLastBackup(
        new Date().toLocaleString([], {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      );
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isBackingUp, progress]);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 text-primary-900">
            <FaDatabase size={24} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-primary-900">
              Database Backup
            </h3>
            <p className="text-sm text-primary-800">
              Secure your data locally or to cloud
            </p>
          </div>
        </div>
        {isBackingUp && (
          <span className="flex items-center gap-1.5 text-xs font-medium text-primary-900 animate-pulse">
            <span className="w-2 h-2 bg-primary-900 rounded-full"></span>
            Processing
          </span>
        )}
      </div>

      {/* Status Info */}
      <div className="mb-6 space-y-3">
        <div className="flex justify-between items-center text-sm">
          <span className="text-primary-900 flex items-center gap-2">
            <CiClock2 size={14} /> Last Backup:
          </span>
          <span className="font-medium text-primary-900">{lastBackup}</span>
        </div>

        {/* Progress Bar Container */}
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary-900 bg-primary-300">
                {progress === 100 ? "Complete" : "Task Progress"}
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-primary-900">
                {progress}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary-100">
            <div
              style={{ width: `${progress}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-900 transition-all duration-300 ease-out"
            ></div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <Button
        title={isBackingUp ? "Backing up Data..." : "Start Manual Backup"}
        icon={
          <LuRefreshCcw
            size={18}
            className={`${isBackingUp ? "animate-spin" : ""}`}
          />
        }
        extraClass={`w-full py-3 px-4 font-medium transition-all duration-200 ${
          isBackingUp
            ? "bg-primary-100 text-primary-900 cursor-not-allowed"
            : "bg-primary-900 text-white hover:bg-primary-800 active:scale-95"
        }`}
        handleClick={handleBackup}
        disabled={isBackingUp}
      />
    </div>
  );
};

export default ManualBackup;
