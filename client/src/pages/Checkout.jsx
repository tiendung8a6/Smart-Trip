import React, { useState } from "react";
import axios from "axios";
import { Toaster, toast } from "sonner"; // Import Toaster và toast từ thư viện sonner
import { useParams } from "react-router-dom"; // Import useParams từ React Router
import useStore from "../store";

const Checkout = () => {
  const { setIsLoading } = useStore();

  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const { paymentType } = useParams(); // Trích xuất paymentType từ URL

  const handlePayment = async () => {
    if (!email) {
      toast.error("Vui lòng nhập email.");
      return;
    }
    if (!phone) {
      toast.error("Vui lòng nhập số điện thoại.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:8800/payment/stripe/${paymentType}`,
        { email, phone }
      ); // Sử dụng paymentType từ useParams
      window.location.href = response.data.url;
    } catch (error) {
      const err = error?.response?.data?.message;
      toast.error(err);
      setIsLoading(false);
      return err;
    }
  };

  if (!paymentType) {
    return (
      <div className="w-full h-full py-8 flex items-center justify-center">
        <span className="text-xl text-slate-500">Loading...</span>
      </div>
    );
  }

  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

  // Định nghĩa các giá trị cho mỗi paymentType
  let points, amount, name;
  switch (paymentType) {
    case "silver":
      name = "Gói Bạc";
      points = 100;
      amount = 100000;
      break;
    case "gold":
      name = "Gói Vàng";
      points = 200;
      amount = 200000;
      break;
    case "diamond":
      name = "Gói Kim Cương";
      points = 350;
      amount = 300000;
      break;
    default:
      points = 0;
      amount = 0;
  }
  const formatCurrency = (value) => {
    return value.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };
  return (
    <>
      <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32"></div>
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Thông Tin Tổng Quan</p>
          <p className="text-gray-400">
            Kiểm tra thông tin. Và lựa chọn phương thức thanh toán phù hợp.
          </p>
          <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
            <div className="flex flex-col rounded-lg bg-white sm:flex-row">
              <img
                className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                alt=""
              />
              <div className="flex w-full flex-col px-4 py-4">
                <span className="font-semibold">{name}</span>
                <span className="float-right text-gray-400">{points} Điểm</span>
                <p className="text-lg font-bold">{formatCurrency(amount)}</p>
              </div>
            </div>
          </div>
          <p className="mt-8 text-lg font-medium">Phương Thức Thanh Toán</p>
          <form className="mt-5 grid gap-6">
            <div className="relative">
              <input
                className="peer hidden"
                id="radio_1"
                type="radio"
                name="radio"
                defaultChecked="true"
              />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white" />
              <label
                className="peer-checked:border-2 peer-checked:border-sky-600 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                htmlFor="radio_1"
              >
                <img
                  className="w-14 object-contain"
                  src="https://pipedream.com/s.v0/app_OD5hrX/logo/orig"
                  alt=""
                />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">Thanh Toán Stripe</span>
                  <p className="text-slate-500 text-sm leading-6">
                    Thời gian nhận điểm: 24 giờ
                  </p>
                </div>
              </label>
            </div>
            <div className="relative">
              <input
                className="peer hidden"
                id="radio_2"
                type="radio"
                name="radio"
                defaultChecked=""
              />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white" />
              <label
                className="peer-checked:border-2 peer-checked:border-sky-600 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                htmlFor="radio_2"
              >
                <img
                  className="w-14 object-contain"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQULr3Ust3Yw-IS1KvGuHQFys81W1ava9Ohd8gduuRPXA&s"
                  alt=""
                />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">Thanh toán </span>
                  <p className="text-slate-500 text-sm leading-6">
                    Xử lý: 2-4 Days
                  </p>
                </div>
              </label>
            </div>
          </form>
        </div>
        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <p className="text-xl font-medium">Thông tin tài khoản</p>
          <p className="text-gray-400">
            Hoàn tất quá trình thanh toán của bạn bằng cách cung cấp chi tiết
            thông tin bên dưới.
          </p>
          <div className="">
            {/* EMAIL */}
            <label
              htmlFor="email"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                id="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="email@gmail.com"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </div>
            </div>
            {/* SDT */}
            <label
              htmlFor="card-holder"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Số Điện Thoại <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="number"
                id="card-holder"
                name="card-holder"
                min="0"
                step="1"
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Nhập số điện thoại"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                  />
                </svg>
              </div>
            </div>
            {/* Total */}
            <div className="mt-6 border-t border-b py-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Giá Tiền</p>
                <p className="font-semibold text-gray-900">
                  {formatCurrency(amount)}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Điểm</p>
                <p className="font-semibold text-gray-900">{points} Điểm</p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Tổng</p>
              <p className="text-2xl font-semibold text-gray-900">
                {formatCurrency(amount)}
              </p>
            </div>
          </div>
          <button
            onClick={handlePayment}
            className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
          >
            Thanh Toán
          </button>
        </div>
        <Toaster richColors />
      </div>
    </>
  );
};

export default Checkout;