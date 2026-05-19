import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import api from "../services/api";

function DashboardPage() {

    const navigate = useNavigate();

    const [expenses, setExpenses] =
        useState([]);

    const [title, setTitle] =
        useState("");

    const [amount, setAmount] =
        useState("");

    const [category, setCategory] =
        useState("");

    const [
        customCategory,
        setCustomCategory
    ] = useState("");

    const [date, setDate] =
        useState("");

    const [searchKeyword,
        setSearchKeyword] =
        useState("");

    const [filterCategory,
        setFilterCategory] =
        useState("");

    const [
        customFilterCategory,
        setCustomFilterCategory
    ] = useState("");

    const [page, setPage] =
        useState(0);

    const [sizeInput, setSizeInput] =
        useState("5");

    const totalExpenses =
        expenses.reduce(
            (total, expense) =>
                total + expense.amount,
            0
        );

    // fetch paginated expenses

    async function fetchExpenses() {

        try {

            // show all entries

            if (
                sizeInput.toLowerCase() === "all"
            ) {

                const response =
                    await api.get(
                        "/expenses"
                    );

                setExpenses(response.data);

                return;
            }

            const parsedSize =
                Number(sizeInput);

            const response =
                await api.get(
                    `/expenses/paginated?page=${page}&size=${parsedSize}`
                );

            setExpenses(
                response.data.content
            );

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

            // optional date

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

    // search expenses

    async function handleSearch() {

        try {

            if (
                searchKeyword.trim() === ""
            ) {

                fetchExpenses();
                return;
            }

            const response =
                await api.get(
                    `/expenses/search?keyword=${searchKeyword}`
                );

            setExpenses(response.data);

        } catch (error) {

            console.log(
                error.response?.data ||
                error.message
            );

            toast.error(
                "Search Failed"
            );
        }
    }

    // filter expenses

    async function handleFilter() {

        try {

            if (
                filterCategory === ""
            ) {

                fetchExpenses();
                return;
            }

            const categoryToFilter =

                filterCategory === "Other"
                    ? customFilterCategory
                    : filterCategory;

            const response =
                await api.get(
                    `/expenses/category/${categoryToFilter}`
                );

            setExpenses(response.data);

        } catch (error) {

            console.log(
                error.response?.data ||
                error.message
            );

            toast.error(
                "Filter Failed"
            );
        }
    }

    // sort expenses

    async function handleSort(field) {

        try {

            const response =
                await api.get(
                    `/expenses/sorted/${field}`
                );

            setExpenses(response.data);

        } catch (error) {

            console.log(
                error.response?.data ||
                error.message
            );

            toast.error(
                "Sort Failed"
            );
        }
    }

    // logout

    function handleLogout() {

        localStorage.removeItem(
            "token"
        );

        toast.success(
            "Logged Out"
        );

        navigate("/", {
            replace: true,
        });
    }

    useEffect(() => {

        fetchExpenses();

    }, [page, sizeInput]);

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

            {/* controls */}

            <div className="grid md:grid-cols-3 gap-4 mb-8">

                {/* search */}

                <div className="flex gap-2">

                    <input
                        type="text"
                        placeholder="Search Expenses"
                        value={searchKeyword}
                        onChange={(e) =>
                            setSearchKeyword(
                                e.target.value
                            )
                        }
                        className="bg-zinc-800 p-3 rounded-xl outline-none w-full"
                    />

                    <button
                        onClick={handleSearch}
                        className="bg-blue-600 px-4 rounded-xl"
                    >
                        Search
                    </button>

                </div>

                {/* filter */}

                <div className="flex flex-col gap-2">

                    <select
                        value={filterCategory}
                        onChange={(e) => {

                            setFilterCategory(
                                e.target.value
                            );
                        }}
                        className="bg-zinc-800 p-3 rounded-xl outline-none"
                    >

                        <option value="">
                            All Categories
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

                    {filterCategory === "Other" && (

                        <input
                            type="text"
                            placeholder="Enter Custom Category"
                            value={customFilterCategory}
                            onChange={(e) =>
                                setCustomFilterCategory(
                                    e.target.value
                                )
                            }
                            className="bg-zinc-800 p-3 rounded-xl outline-none"
                        />

                    )}

                </div>

                <button
                    onClick={handleFilter}
                    className="bg-green-600 rounded-xl"
                >
                    Apply Filter
                </button>

            </div>

            {/* sorting */}

            <div className="flex flex-wrap gap-3 mb-8">

                <button
                    onClick={() =>
                        handleSort("amount")
                    }
                    className="bg-zinc-800 px-4 py-2 rounded-xl"
                >
                    Sort By Amount
                </button>

                <button
                    onClick={() =>
                        handleSort("date")
                    }
                    className="bg-zinc-800 px-4 py-2 rounded-xl"
                >
                    Sort By Date
                </button>

                <button
                    onClick={() =>
                        handleSort("title")
                    }
                    className="bg-zinc-800 px-4 py-2 rounded-xl"
                >
                    Sort By Title
                </button>

                <button
                    onClick={fetchExpenses}
                    className="bg-blue-600 px-4 py-2 rounded-xl"
                >
                    Reset
                </button>

            </div>

            {/* entries per page */}

            <div className="flex items-center gap-3 mb-8">

                <label className="text-zinc-400">

                    Entries Per Page

                </label>

                <input
                    type="text"
                    value={sizeInput}
                    onChange={(e) => {

                        setPage(0);

                        setSizeInput(
                            e.target.value
                        );
                    }}
                    placeholder="5 or all"
                    className="bg-zinc-800 p-2 rounded-xl outline-none w-32"
                />

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

                {/* category */}

                <select
                    value={category}
                    onChange={(e) =>
                        setCategory(
                            e.target.value
                        )
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

                    <div className="text-zinc-400 text-center">

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
                                    {expense.date ||
                                        "No Date"}
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

            {/* pagination */}

            <div className="flex justify-center gap-4 mt-8">

                <button
                    disabled={page === 0}
                    onClick={() =>
                        setPage(page - 1)
                    }
                    className="bg-zinc-800 px-4 py-2 rounded-xl disabled:opacity-50"
                >
                    Previous
                </button>

                <span className="flex items-center">
                    Page {page + 1}
                </span>

                <button
                    onClick={() =>
                        setPage(page + 1)
                    }
                    className="bg-zinc-800 px-4 py-2 rounded-xl"
                >
                    Next
                </button>

            </div>

        </div>
    );
}

export default DashboardPage;