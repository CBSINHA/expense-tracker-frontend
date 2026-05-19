import { useState } from "react";
import { Link } from "react-router-dom";

import toast from "react-hot-toast";

import api from "../services/api";

function RegisterPage() {

  const [username, setUsername] =
      useState("");

  const [email, setEmail] =
      useState("");

  const [password, setPassword] =
      useState("");

  async function handleRegister(e) {

    e.preventDefault();

    try {

      const payload = {

        username,
        password,
      };

      // only send email if entered
      if (email.trim() !== "") {

        payload.email = email;
      }

      const response = await api.post(
          "/auth/register",
          payload
      );

      console.log(response.data);

      toast.success(
          "Registered Successfully"
      );

      // clear form
      setUsername("");
      setEmail("");
      setPassword("");

    } catch (error) {

      console.log(
          error.response?.data ||
          error.message
      );

      toast.error(
          "Registration Failed"
      );
    }
  }

  return (

      <div className="min-h-screen bg-black flex items-center justify-center px-4">

        <form
            onSubmit={handleRegister}
            className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl flex flex-col gap-5"
        >

          <div>

            <h1 className="text-4xl font-bold text-white">
              Create Account
            </h1>

            <p className="text-zinc-400 mt-2">
              Start tracking your expenses easily
            </p>

          </div>

          {/* username */}

          <div className="flex flex-col gap-2">

            <label className="text-zinc-300 text-sm">
              Username
            </label>

            <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) =>
                    setUsername(e.target.value)
                }
                className="bg-zinc-800 text-white p-3 rounded-xl outline-none border border-zinc-700 focus:border-blue-500"
                required
            />

          </div>

          {/* email */}

          <div className="flex flex-col gap-2">

            <label className="text-zinc-300 text-sm">

              Email

              <span className="text-zinc-500 ml-2">
              (Optional)
            </span>

            </label>

            <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) =>
                    setEmail(e.target.value)
                }
                className="bg-zinc-800 text-white p-3 rounded-xl outline-none border border-zinc-700 focus:border-blue-500"
            />

          </div>

          {/* password */}

          <div className="flex flex-col gap-2">

            <label className="text-zinc-300 text-sm">
              Password
            </label>

            <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) =>
                    setPassword(e.target.value)
                }
                className="bg-zinc-800 text-white p-3 rounded-xl outline-none border border-zinc-700 focus:border-blue-500"
                required
            />

          </div>

          {/* button */}

          <button
              className="bg-blue-600 hover:bg-blue-700 transition-all text-white font-semibold p-3 rounded-xl mt-2"
          >
            Register
          </button>

          {/* login redirect */}

          <p className="text-zinc-400 text-sm text-center">

            Already have an account?

            <Link
                to="/"
                className="text-blue-500 ml-2"
            >
              Login
            </Link>

          </p>

        </form>

      </div>
  );
}

export default RegisterPage;