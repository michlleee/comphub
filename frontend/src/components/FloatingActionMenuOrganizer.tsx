"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, X, LogOut } from "lucide-react";
import { toast } from "sonner";
import api from "@/api/axios";

export function FloatingActionMenuOrganizer() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const { data } = await api.post(
        `${backendURL}/api/auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      toast.success(data.message);
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (error) {
      console.log(error);
      toast.error("Fail to log out. Please try again");
    }
  };

  const menuItems = [
    {
      icon: LogOut,
      label: "Logout",
      onClick: handleLogout,
      color: "from-slate-600 to-rose-500",
    },
  ];

  return (
    <div className="fixed top-6 left-6 z-50">
      <div
        className={`absolute top-16 left-0 space-y-3 transition-all duration-300 ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className={`transform transition-all duration-300 ${
                isOpen
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-8 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <button
                onClick={item.onClick}
                className={`group flex items-center space-x-3 bg-gradient-to-r ${item.color} text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200`}
                title={item.label}
              >
                <Icon size={20} />
                <span className="text-sm font-medium whitespace-nowrap">
                  {item.label}
                </span>
              </button>
            </div>
          );
        })}
      </div>

      <button
        onClick={toggleMenu}
        className={`w-14 h-14 bg-gradient-to-r from-slate-700 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center ${
          isOpen ? "rotate-180" : "rotate-0"
        }`}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>
  );
}
