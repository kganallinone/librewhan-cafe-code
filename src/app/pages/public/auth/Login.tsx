import React, { useState } from "react";
import { ASSETS } from "../../../config/assetConfig";
import { useAuth } from "../../../hooks/useAuth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { authenticate } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const result = await authenticate(email, password);
      console.log(result);
      if (result.success) {
        setLoading(false);
        location.reload();
      }
    } catch (error) {
      setLoading(false);
      setError("An error occurred during login.");
      console.error("An error occurred during login:", error);
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen">
      <div
        className="w-[70vw] bg-cover bg-center"
        style={{ backgroundImage: `url(${ASSETS.IMAGES.BG1})` }}
      >
        {/* Optional content or overlay can go here */}
      </div>
      <div className="w-[30vw] flex items-center justify-center bg-white p-8 shadow-md">
        <div className="w-full">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-500"
              />
            </div>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <button
              type="submit"
              disabled={loading}
              className={`w-full p-2 rounded-md text-white ${
                loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
              } transition duration-200`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
