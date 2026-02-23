import { NavLink } from "react-router-dom";
import { X } from "lucide-react";

export default function SideBarDash({ isOpen, setIsOpen }) {
  const navItems = [
    { to: "portfolio", label: "Portfolio" },
    { to: "messages", label: "Messages" },
  ];

  return (
    <>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 min-h-screen bg-black text-white shadow-lg w-64 p-6 
          flex flex-col overflow-y-auto transition-transform duration-300 z-50
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="lg:hidden absolute top-4 right-4 text-white"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold tracking-wide border-b border-white mb-8 pb-4">
          Dashboard
        </h2>

        <nav className="flex-1">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block text-lg font-medium rounded-xl px-4 py-2 cursor-pointer 
                    transition-all duration-200 ${
                      isActive
                        ? "bg-purple-700 text-white"
                        : "text-white hover:bg-purple-600"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
