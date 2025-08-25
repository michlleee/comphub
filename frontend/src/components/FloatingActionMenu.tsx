"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, X, LogOut, User, Settings, Trophy } from "lucide-react";

export function FloatingActionMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    console.log("Logging out...");
    router.push("/login");
  };

  const handleExploreCompetitions = () => {
    router.push("/competitions");
  };

  const handleProfile = () => {
    router.push("/profile");
  };

  const handleSettings = () => {
    router.push("/settings");
  };

  const menuItems = [
    {
      icon: Trophy,
      label: "Explore Competitions",
      onClick: handleExploreCompetitions,
      color: "from-slate-600 to-blue-500",
    },
    // {
    //   icon: User,
    //   label: "Profile",
    //   onClick: handleProfile,
    //   color: "from-slate-600 to-emerald-500",
    // },
    {
      icon: LogOut,
      label: "Logout",
      onClick: handleLogout,
      color: "from-slate-600 to-rose-500",
    },
  ];

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <div
        className={`absolute bottom-16 left-0 space-y-3 transition-all duration-300 ${
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
