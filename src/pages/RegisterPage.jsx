import { useState } from "react";
import api from "../services/api";

function RegisterPage() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(e) {

    e.preventDefault();

    try {

      const payload = {
        username,
        password,
      };

      // only add email if user entered one
      if (email.trim() !== "") {
        payload.email = email;
      }

      const response = await api.post(
        "/auth/register",
        payload
      );

      console.log(response.data);

      alert("Registered Successfully");

    } catch (error) {

      console.log(
        error.response?.data || error.message
      );

      alert("Registration Failed");
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

        <div className="flex flex-col gap-2">

          <label className="text-zinc-300 text-sm">
            Username
          </label>

          <input
            type="text"
            placeholder="Enter username"
            className="bg-zinc-800 text-white p-3 rounded-xl outline-none border border-zinc-700 focus:border-blue-500"
            onChange={(e) =>
              setUsername(e.target.value)
            }
            required
          />

        </div>

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
            className="bg-zinc-800 text-white p-3 rounded-xl outline-none border border-zinc-700 focus:border-blue-500"
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

        </div>

        <div className="flex flex-col gap-2">

          <label className="text-zinc-300 text-sm">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter password"
            className="bg-zinc-800 text-white p-3 rounded-xl outline-none border border-zinc-700 focus:border-blue-500"
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

        </div>

        <button
          className="bg-blue-600 hover:bg-blue-700 transition-all text-white font-semibold p-3 rounded-xl mt-2"
        >
          Register
        </button>

      </form>

    </div>
  );
}

export default RegisterPage;