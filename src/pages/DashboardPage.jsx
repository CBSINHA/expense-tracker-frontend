import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../services/api";

function DashboardPage() {

    const navigate = useNavigate();

    const [expenses, setExpenses] = useState([]);

    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [customCategory, setCustomCategory] =
        useState("");
    const [date, setDate] = useState("");

    // total expenses
    const totalExpenses = expenses.reduce(
        (total, expense) =>
            total + expense.amount,
        0
    );

    // fetch expenses
    async function fetchExpenses() {

        try {

            const response = await api.get(
                "/expenses"
            );

            setExpenses(response.data);

        } catch (error) {

            console.log(
                error.response?.data ||
                error.message
            );

            toast.error(
                "Failed To Fetch Expenses"
            );
        }
    }

    // add expense
    async function handleAddExpense(e) {

        e.preventDefault();

        try {

            const payload = {

                title,

                amount,

                category:
                    category === "Other"
                        ? customCategory
                        : category,
            };

            // only send date if selected
            if (date !== "") {

                payload.date = date;
            }

            await api.post(
                "/expenses",
                payload
            );

            toast.success(
                "Expense Added"
            );

            // clear form
            setTitle("");
            setAmount("");
            setCategory("");
            setCustomCategory("");
            setDate("");

            // refresh expenses
            fetchExpenses();

        } catch (error) {

            console.log(
                error.response?.data ||
                error.message
            );

            toast.error(
                "Failed To Add Expense"
            );
        }
    }

    // delete expense
    async function handleDelete(id) {

        try {

            await api.delete(
                `/expenses/${id}`
            );

            toast.success(
                "Expense Deleted"
            );

            fetchExpenses();

        } catch (error) {

            console.log(
                error.response?.data ||
                error.message
            );

            toast.error(
                "Failed To Delete Expense"
            );
        }
    }

    // logout
    function handleLogout() {

        localStorage.removeItem("token");

        toast.success("Logged Out");

        navigate("/", {
            replace: true,
        });
    }

    useEffect(() => {

        fetchExpenses();

    }, []);

    return (

        <div className="min-h-screen bg-black text-white p-6">

            {/* navbar */}

            <div className="flex justify-between items-center mb-8">

                <div>

                    <h1 className="text-4xl font-bold">
                        Expense Tracker
                    </h1>

                    <p className="text-zinc-400 mt-1">
                        Track your daily expenses
                    </p>

                </div>

                <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl"
                >
                    Logout
                </button>

            </div>

            {/* total expenses */}

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-8">

                <h2 className="text-zinc-400 text-lg">
                    Total Expenses
                </h2>

                <p className="text-4xl font-bold mt-2">
                    ₹ {totalExpenses}
                </p>

            </div>

            {/* add expense form */}

            <form
                onSubmit={handleAddExpense}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-4 mb-8"
            >

                <h2 className="text-2xl font-semibold">
                    Add Expense
                </h2>

                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) =>
                        setTitle(e.target.value)
                    }
                    className="bg-zinc-800 p-3 rounded-xl outline-none"
                    required
                />

                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) =>
                        setAmount(e.target.value)
                    }
                    className="bg-zinc-800 p-3 rounded-xl outline-none"
                    required
                />

                {/* category dropdown */}

                <select
                    value={category}
                    onChange={(e) =>
                        setCategory(e.target.value)
                    }
                    className="bg-zinc-800 p-3 rounded-xl outline-none"
                    required
                >

                    <option value="">
                        Select Category
                    </option>

                    <option value="Food">
                        Food
                    </option>

                    <option value="Travel">
                        Travel
                    </option>

                    <option value="Shopping">
                        Shopping
                    </option>

                    <option value="Bills">
                        Bills
                    </option>

                    <option value="Entertainment">
                        Entertainment
                    </option>

                    <option value="Other">
                        Other
                    </option>

                </select>

                {/* custom category */}

                {category === "Other" && (

                    <input
                        type="text"
                        placeholder="Enter Custom Category"
                        value={customCategory}
                        onChange={(e) =>
                            setCustomCategory(
                                e.target.value
                            )
                        }
                        className="bg-zinc-800 p-3 rounded-xl outline-none"
                        required
                    />

                )}

                {/* optional date */}

                <div className="flex flex-col gap-2">

                    <label className="text-zinc-300 text-sm">

                        Date

                        <span className="text-zinc-500 ml-2">
              (Optional)
            </span>

                    </label>

                    <input
                        type="date"
                        value={date}
                        onChange={(e) =>
                            setDate(e.target.value)
                        }
                        className="bg-zinc-800 p-3 rounded-xl outline-none"
                    />

                </div>

                <button
                    className="bg-blue-600 hover:bg-blue-700 p-3 rounded-xl"
                >
                    Add Expense
                </button>

            </form>

            {/* expenses list */}

            <div className="grid gap-4">

                {expenses.length === 0 ? (

                    <div className="text-zinc-400">
                        No expenses found
                    </div>

                ) : (

                    expenses.map((expense) => (

                        <div
                            key={expense.id}
                            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex justify-between items-center"
                        >

                            <div>

                                <h3 className="text-xl font-semibold">
                                    {expense.title}
                                </h3>

                                <p className="text-zinc-400">
                                    ₹ {expense.amount}
                                </p>

                                <p className="text-zinc-500 text-sm">
                                    {expense.category}
                                </p>

                                <p className="text-zinc-500 text-sm">
                                    {expense.date || "No Date"}
                                </p>

                            </div>

                            <button
                                onClick={() =>
                                    handleDelete(
                                        expense.id
                                    )
                                }
                                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl"
                            >
                                Delete
                            </button>

                        </div>
                    ))
                )}

            </div>

        </div>
    );
}

export default DashboardPage;