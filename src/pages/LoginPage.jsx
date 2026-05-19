import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

function LoginPage() {

    const navigate = useNavigate();

    const [login, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin(e) {

        e.preventDefault();

        try {

            const response = await api.post(
                "/auth/login",
                {
                    login,
                    password,
                }
            );

            // save token
            localStorage.setItem(
                "token",
                response.data.token
            );

            toast.success("Login Successful");

            // redirect
            navigate("/dashboard");

        } catch (error) {

            console.log(
                error.response?.data || error.message
            );

            toast.error("Invalid Credentials");
        }
    }

    return (

        <div className="min-h-screen bg-black flex items-center justify-center px-4">

            <form
                onSubmit={handleLogin}
                className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl flex flex-col gap-5"
            >

                <div>

                    <h1 className="text-4xl font-bold text-white">
                        Welcome Back
                    </h1>

                    <p className="text-zinc-400 mt-2">
                        Login to your account
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
                    Login
                </button>

                <p className="text-zinc-400 text-sm text-center">

                    Don't have an account?

                    <Link
                        to="/register"
                        className="text-blue-500 ml-2"
                    >
                        Register
                    </Link>

                </p>

            </form>

        </div>
    );
}

export default LoginPage;