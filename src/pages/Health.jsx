import { useEffect, useState } from "react";

function Health() {
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const base = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/auth';
    const url = `${base}/health`;
    fetch(url, { credentials: 'include' })
      .then(async (res) => {
        if (!res.ok) throw new Error(`${res.status}`);
        const data = await res.json();
        setMessage(data?.message ?? "ok");
        setStatus("ok");
      })
      .catch((err) => {
        setMessage(`Error: ${err.message}`);
        setStatus("error");
      });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Health</h1>
        {status === "loading" && (
          <p className="text-gray-600">Checking...</p>
        )}
        {status !== "loading" && (
          <p className="text-gray-800">{message}</p>
        )}
      </div>
    </div>
  );
}

export default Health;


