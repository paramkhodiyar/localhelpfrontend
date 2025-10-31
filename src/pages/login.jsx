import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000/api/auth";
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpPhase, setOtpPhase] = useState(false);
  const [useOtp, setUseOtp] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await axios.post(`${API_BASE}/login`, formData, {
        withCredentials: true,
      });
      setMessage("Logged in successfully.");
      const name = formData.email;
      navigate(`/welcome?name=${encodeURIComponent(name)}`);
    } catch (err) {
      setMessage(err?.response?.data?.message || "Login failed. Check credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async () => {
    setOtpLoading(true);
    setMessage("");
    try {
      const res = await axios.post(`${API_BASE}/send-otp`, { email: formData.email }, {
        withCredentials: true,
      });
      setOtpPhase(true);
      setMessage(res?.data?.message || "OTP sent. Check your email.");
    } catch (err) {
      setMessage(err?.response?.data?.error || "Failed to send OTP.");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setOtpLoading(true);
    setMessage("");
    try {
      const res = await axios.post(`${API_BASE}/verify-otp`, { email: formData.email, otp }, {
        withCredentials: true,
      });
      setMessage(res?.data?.message || "OTP verified. Logged in.");
      const name = formData.email;
      navigate(`/welcome?name=${encodeURIComponent(name)}`);
    } catch (err) {
      setMessage(err?.response?.data?.error || "Invalid or expired OTP.");
    } finally {
      setOtpLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white border rounded-2xl shadow-sm p-6">
          <h2 className="text-2xl font-semibold tracking-tight">Welcome back</h2>
          <p className="text-gray-600 text-sm mt-1">Sign in to your account</p>

          {!useOtp ? (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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
                {loading ? "Signing in..." : "Sign in"}
              </button>
              <button
                type="button"
                className="w-full rounded-md border py-2.5 font-medium mt-2 hover:bg-gray-50"
                onClick={() => {
                  setUseOtp(true);
                  setMessage("");
                }}
              >
                Login with OTP
              </button>
            </form>
          ) : (
            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="otpEmail"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {!otpPhase ? (
                <button
                  type="button"
                  disabled={otpLoading || !formData.email}
                  onClick={handleSendOtp}
                  className="w-full rounded-md bg-indigo-600 text-white py-2.5 font-medium hover:bg-indigo-700 disabled:opacity-60"
                >
                  {otpLoading ? "Sending OTP..." : "Send OTP"}
                </button>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Enter OTP</label>
                    <input
                      type="text"
                      name="otp"
                      placeholder="6-digit code"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button
                    type="button"
                    disabled={otpLoading || !otp}
                    onClick={handleVerifyOtp}
                    className="w-full rounded-md bg-green-600 text-white py-2.5 font-medium hover:bg-green-700 disabled:opacity-60"
                  >
                    {otpLoading ? "Verifying..." : "Verify OTP"}
                  </button>
                </div>
              )}
              <button
                type="button"
                className="w-full rounded-md border py-2.5 font-medium mt-2 hover:bg-gray-50"
                onClick={() => {
                  setUseOtp(false);
                  setOtpPhase(false);
                  setOtp("");
                  setMessage("");
                }}
              >
                Login with password
              </button>
            </div>
          )}

          {message && (
            <div className="mt-4 text-sm text-center text-gray-700">{message}</div>
          )}

          <div className="mt-6 text-sm text-center text-gray-600">
            Don’t have an account? {" "}
            <Link className="text-blue-600 hover:underline" to="/signup">Create one</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
