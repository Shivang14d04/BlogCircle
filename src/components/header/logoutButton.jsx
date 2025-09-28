import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

export default function LogoutButton() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };

  return (
    <button
      onClick={logoutHandler}
      className="
        bg-[#0A0908] text-[#F2F4F3]
        px-5 py-2
        rounded-lg
        font-medium
        shadow-md
        transition-all
        duration-300
        hover:bg-[#1c1c1b]
        hover:shadow-lg
        focus:outline-none
        focus:ring-2
        focus:ring-[#0A0908]/50
        active:scale-95
      "
    >
      Logout
    </button>
  );
}
