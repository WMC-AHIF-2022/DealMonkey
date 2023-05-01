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
          <a href="/login">Login</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
      </ul>
    </nav>
  );
}
