import { Paper, PinInput } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { Loading } from "../components";
import { useResend, useVerification } from "../hooks/auth-hook";
import useStore from "../store/store";

const OTPVerification = () => {
  const otpData = JSON.parse(localStorage.getItem("otp_data"));
  const navigate = useNavigate();

  const { user } = useStore((state) => state);
  const { mutate, isPending } = useVerification(toast);
  const resend = useResend(toast);

  const [seconds, setSeconds] = useState(120);
  const [countdown, setCountdown] = useState(null);
  const [showPage, setShowPage] = useState(true); // State để điều khiển hiển thị trang

  useEffect(() => {
    setCountdown(
      setInterval(() => {
        setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000)
    );

    return () => clearInterval(countdown); // Clear interval on unmount
  }, []);

  useEffect(() => {
    if (seconds === 0) {
      clearInterval(countdown);
    }
  }, [seconds, countdown]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleSubmit = (val) => {
    mutate({ id: otpData.id, otp: val });
  };

  const handleResendOTP = () => {
    resend.mutate(otpData.id);
  };

  useEffect(() => {
    if (!otpData?.otpLevel) {
      setShowPage(false); // Không có dữ liệu OTP thì ẩn trang
    }
    if (user?.emailVerified) {
      setShowPage(false); // Email đã được xác minh thì ẩn trang
    }
  }, [otpData, user]);

  useEffect(() => {
    if (showPage === false) {
      // Nếu không hiển thị trang thì chuyển hướng
      alert("Account has automatically been activated. Try login");
      navigate("/auth");
      localStorage.removeItem("otp_data");
    }
  }, [showPage]);

  if (!showPage) return null; // Nếu không hiển thị trang thì return null

  return (
    <div
      className={`w-full h-screen flex flex-col items-center justify-center ${
        localStorage.getItem("theme") === "dark"
          ? "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#302943] via-slate-900 to-black"
          : "bg-white"
      }`}
    >
      <Paper
        shadow="lg"
        p="xl"
        className={`${
          localStorage.getItem("theme") === "dark"
            ? "bg-[#0e1627]"
            : " bg-white"
        }`}
      >
        <div className="flex flex-col items-center justify-center mb-6 ">
          <p
            className={`text-2xl font-semibold text-center ${
              localStorage.getItem("theme") === "dark"
                ? "text-gray-400"
                : "text-slate-700"
            }`}
          >
            OTP Verification
          </p>
          <span
            className={`text-sm ${
              localStorage.getItem("theme") === "dark"
                ? "text-gray-500"
                : "text-slate-700"
            }`}
          >
            Please OTP code sent to your mail.
          </span>
        </div>
        <PinInput
          oneTimeCode
          autoFocus={true}
          type="number"
          length={6}
          size="xl"
          onComplete={(value) => handleSubmit(value)}
        />

        <div className="pt-5 flex items-center justify-center gap-3 text-base">
          {seconds === 0 ? (
            <a
              className="text-base text-blue-600 underline cursor-pointer"
              onClick={() => handleResendOTP()}
            >
              Resend
            </a>
          ) : (
            <>
              <p>OTP will expire in:</p>
              <span className="text-rose-600 font-semibold">
                {formatTime(seconds)}
              </span>
            </>
          )}
        </div>

        {/* <Loading visible={isPending || resend.isPending} /> */}
        <Toaster richColors />
      </Paper>
    </div>
  );
};

export default OTPVerification;
