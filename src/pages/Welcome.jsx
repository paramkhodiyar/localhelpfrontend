import { useMemo } from "react";
import { useState, useEffect } from "react";
function Welcome() {
  const params = new URLSearchParams(window.location.search);
  const name = useMemo(() => params.get("name") || "User", [params]);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center">
        Hello there, welcome {name} !
      </h1>
    </div>
  );
}

export default Welcome;


