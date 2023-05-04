import { log } from "console";
import "../styles/navbar.css";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState("Login");
  const [logout, setLogout] = useState("Logout");

  useEffect(() => {
    if (sessionStorage.getItem("user") !== undefined) {
      let user: string | null = sessionStorage.getItem("user");
      if (user !== null && user.length > 0) {
        setUser(user);
      } else {
        setLogout("");
      }
    }
  });

  const onLogout = (): void => {
    sessionStorage.removeItem("user");
    setUser("Login");
    setLogout("Logout");
    window.location.reload();
  };

  return (
    <nav className="nav">
      <a href="/" className="site-title">
        {" "}
        DealMonkey
      </a>
      <ul>
        <li className="active">
          <a href="/login">{user}</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <button className="bg-orange-400 logoutBtn" onClick={onLogout}>
            {logout}
          </button>
        </li>
      </ul>
    </nav>
  );
}
