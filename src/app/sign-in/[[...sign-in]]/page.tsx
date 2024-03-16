"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<{ [key: string]: string }>({});
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:4200/api/login", {
        email,
        password,
      });
      console.log(res);
      setData(res.data);
      setIsLoading(false);
    } catch (errors: any) {
      setErrors(errors.response?.data.errors);
      setMessage(errors.response?.data.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (data.message === "Login successful") {
      router.push("/");
    }
  }, [data, router]);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r  from-rose-100 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[350px] w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign In
            </h2>
          </div>
          {message && <div className="text-center text-red-500">{message}</div>}
          <form className="mt-8 space-y-3" action="#" method="POST">
            <input type="hidden" name="remember" value="true" />

            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="rounded-md w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {errors && <div className="text-red-500 py-0">{errors.email}</div>}
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="rounded-md w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {errors && (
              <div className="text-red-500 py-0">{errors.password}</div>
            )}

            <div>
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isLoading && <Loader2 className="w-4 mr-2 animate-spin" />}
                Sign In
              </button>
            </div>
          </form>
          <p className="mt-2 text-center text-sm text-gray-600">
            Don’t have an account yet?{" "}
            <Link
              href="/sign-up"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
export default Login;
