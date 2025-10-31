import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const API_BASE = import.meta.env.VITE_API_URL || "https://localhelpbackend-fix.onrender.com/api/auth";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await axios.post(`${API_BASE}/signup`, formData);
      setMessage("Account created successfully.");
      console.log(res.data);
    } catch (err) {
      setMessage(err?.response?.data?.message || "Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white border rounded-2xl shadow-sm p-6">
          <h2 className="text-2xl font-semibold tracking-tight">Create your account</h2>
          <p className="text-gray-600 text-sm mt-1">Join Local Help for free</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                onChange={handleChange}
                className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                onChange={handleChange}
                className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                onChange={handleChange}
                className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-blue-600 text-white py-2.5 font-medium hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          {message && (
            <div className="mt-4 text-sm text-center text-gray-700">{message}</div>
          )}

          <div className="mt-6 text-sm text-center text-gray-600">
            Already have an account? {" "}
            <Link className="text-blue-600 hover:underline" to="/login">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
