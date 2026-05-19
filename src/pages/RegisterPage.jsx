import { useState } from "react";
import api from "../services/api";

function RegisterPage() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(e) {

    e.preventDefault();

    try {

      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      console.log(response.data);

      alert("Registered successfully");

    } catch (error) {

      console.log(error.response?.data || error.message);

      alert("Registration failed");
    }
  }

  return (

    <div className="h-screen bg-gray-900 flex justify-center items-center">

      <form
        onSubmit={handleRegister}
        className="bg-gray-800 p-8 rounded-xl w-96 flex flex-col gap-4"
      >

        <h1 className="text-white text-3xl font-bold">
          Register
        </h1>

        <input
          type="text"
          placeholder="Name"
          className="p-3 rounded"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="p-3 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="p-3 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="bg-blue-500 text-white p-3 rounded"
        >
          Register
        </button>

      </form>

    </div>
  );
}

export default RegisterPage;