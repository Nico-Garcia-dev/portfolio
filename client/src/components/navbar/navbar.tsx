import { NavLink } from "react-router";
import "./navbar.css";
import { useState } from "react";
import type { KeyboardEvent } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      toggleMenu();
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <span>Nicolas Garcia</span>
        <span>Développeur</span>
      </div>

      <button
        type="button"
        className="burger-menu"
        onClick={toggleMenu}
        onKeyDown={handleKeyDown}
        aria-expanded={menuOpen}
        aria-label="Menu de navigation"
      >
        <span className={`burger-bar ${menuOpen ? "open" : ""}`} />
        <span className={`burger-bar ${menuOpen ? "open" : ""}`} />
        <span className={`burger-bar ${menuOpen ? "open" : ""}`} />
      </button>

      <ul className={`link-list ${menuOpen ? "open" : ""}`}>
        <li>
          <NavLink to="/" onClick={closeMenu}>
            Accueil
          </NavLink>
        </li>
        <li>
          <NavLink to="/projects" onClick={closeMenu}>
            Projets
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" onClick={closeMenu}>
            A propos
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" onClick={closeMenu}>
            Contact
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
