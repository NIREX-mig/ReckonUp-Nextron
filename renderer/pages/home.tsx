import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { FaRegUser, FaUnlockAlt } from "react-icons/fa";
import { APiRes } from "../types";
import Button from "../components/ui/Button";
import toast, { Toaster } from "react-hot-toast";
import Input from "../components/ui/Input";
import { appTitle } from "../constents";

export default function HomePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [loginData, setLoginData] = useState({
    username: "app-admin",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    window.ipc.send("login", {
      username: loginData.username,
      password: loginData.password,
    });

    window.ipc.on("login", (res: APiRes) => {
      if (res?.success) {
        setLoading(false);
        localStorage.setItem("logedinUser", JSON.stringify(res.data));
        toast.success(res.message);
        setLoginData((prev) => ({
          ...prev,
          password: "",
        }));
        setTimeout(() => {
          router.push("/dashboard/");
        }, 500);
      } else {
        setLoginData((prev) => ({
          ...prev,
          password: "",
        }));
        setLoading(false);
        toast.error(res.message);
      }
    });
  };

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
            unoptimized
          />
        </div>
        <div className="w-[30rem]">
          <h1 className="text-center font-bold text-4xl mb-10  text-primary-950">
            Welcome To ReckonUp
          </h1>
          <h3 className="text-center font-bold text-3xl mb-4 text-primary-900">
            Sign In
          </h3>
          <p className="text-center text-lg mb-5 text-primary-800">
            Enter your Username and Password to Sign In.
          </p>

          <form onSubmit={handleSubmit} className="p-4 w-[27rem] mx-auto">
            <Input
              lable="Username"
              lableStyle="text-black font-semibold"
              className="w-full select-none bg-primary-50 border border-primary-900 text-primary-900 text-md font-semibold rounded-md focus:outline-primary-900 block p-2 placeholder:px-1 indent-8 mb-5"
              name="username"
              type="text"
              placeholder="Enter your username"
              value={loginData.username}
              icon={<FaRegUser className="text-primary-900" />}
              col
              required
              readOnly
            />
            <Input
              lable="Username"
              lableStyle="text-black font-semibold"
              type="password"
              autoComplete="off"
              value={loginData.password}
              onChange={(e) =>
                setLoginData((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
              className="w-full bg-primary-50 border border-primary-900 text-primary-900 text-md font-semibold rounded-md focus:outline-primary-900 block p-2 placeholder:px-1 indent-8"
              icon={<FaUnlockAlt className="text-primary-900" />}
              placeholder="•••••••••"
              col
              required
            />
            <Link href="/forgot" draggable="false">
              <p className=" font-semibold hover:underline inline-block mb-5 focus:outline-primary-900">
                Forger Password
              </p>
            </Link>
            <Button
              title="Sign In"
              extraClass="py-2 bg-primary-900 text-white hover:bg-primary-800 w-full text-lg"
              buttonType="submit"
              loading={loading}
              disabled={loading}
            />
          </form>
        </div>
      </section>
    </React.Fragment>
  );
}
