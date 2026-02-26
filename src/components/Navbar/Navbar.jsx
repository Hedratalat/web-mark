import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Portfolio", id: "portfolio" },
    { name: "Contact", id: "contact" },
  ];

  const scrollToSection = (id) => {
    const scroll = () => {
      const section = document.getElementById(id);
      const navbar = document.querySelector("nav");
      const navbarHeight = navbar?.offsetHeight || 80;
      if (section) {
        window.scrollTo({
          top:
            section.getBoundingClientRect().top +
            window.pageYOffset -
            navbarHeight,
          behavior: "smooth",
        });
      }
    };

    if (location.pathname !== "/") {
      navigate("/", { replace: false });
      setTimeout(scroll, 100);
    } else {
      scroll();
    }

    setMenuOpen(false);
  };

  return (
    <nav
      className="sticky top-0 z-50 backdrop-blur-md shadow-md border-b"
      style={{
        background: "color-mix(in srgb, var(--accent) 10%, #050505)",
        borderColor: "var(--accent-20)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => scrollToSection("home")}
          >
            <img
              src="/public/logomark.png"
              alt="logo"
              className="h-10 w-10 object-contain -translate-y-1"
            />

            <span
              className="text-2xl font-bold shine-text"
              style={{ fontFamily: "'Hello Shine', cursive" }}
            >
              Mark Yousry
            </span>
          </div>

          {/* Desktop Links */}
          <ul className="hidden lg:flex items-center gap-7">
            {navLinks.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className="text-gray-300 hover:transition-colors duration-200 text-lg font-semibold"
                  style={{ "--tw-text-opacity": 1 }}
                  onMouseEnter={(e) => (e.target.style.color = "var(--accent)")}
                  onMouseLeave={(e) => (e.target.style.color = "")}
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-lg text-gray-300 transition-colors"
              style={{}}
              onMouseEnter={(e) => (e.target.style.color = "var(--accent)")}
              onMouseLeave={(e) => (e.target.style.color = "")}
            >
              {menuOpen ? <FaTimes size={26} /> : <FaBars size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <ul
            className="flex flex-col items-center gap-5 py-6 rounded-xl mt-2"
            style={{
              background: "color-mix(in srgb, var(--accent) 8%, #050505)",
            }}
          >
            {navLinks.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className="text-gray-300 text-xl font-semibold transition-colors"
                  onMouseEnter={(e) => (e.target.style.color = "var(--accent)")}
                  onMouseLeave={(e) => (e.target.style.color = "")}
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
