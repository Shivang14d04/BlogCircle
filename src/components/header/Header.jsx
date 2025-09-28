import React from "react";
import { LogoutButton, Logo, Container } from "../index";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <Container>
        <nav className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Logo />
          </Link>

          {/* Navigation */}
          <ul className="flex items-center gap-4 md:gap-6 ml-auto">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="
                        px-4 py-2 
                        rounded-lg 
                        text-[15px] font-medium 
                        text-[#0A0908]
                        transition-colors duration-200
                        hover:bg-[#F2F4F3]
                      "
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {authStatus && <li><LogoutButton /></li>}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
