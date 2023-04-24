import "../styles/navbar.css";
export default function Navbar() {
  return (
    <nav className="nav">
      <a href="/" className="site-title">
        {" "}
        DealMonkey
      </a>
      <ul>
        <li className="active">
          <a href="/Login">Login</a>
        </li>
        <li>
          <a href="/Dashboard">Dashboard</a>
        </li>
      </ul>
    </nav>
  );
}
