"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { NavbarProps, NavItemProps } from "./types";
import { useAuth } from "@/lib/useAuth";
import { useEffect } from "react";

const NavItem = ({ href, children, isActive }: NavItemProps) => {
  const baseClasses =
    "px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200";
  const activeClasses = "bg-blue-600 text-white";
  const inactiveClasses = "text-gray-700 hover:text-blue-600 hover:bg-blue-50";

  return (
    <Link
      href={href}
      className={twMerge(
        baseClasses,
        isActive ? activeClasses : inactiveClasses
      )}
    >
      {children}
    </Link>
  );
};

const Navbar = ({ className = "" }: NavbarProps) => {
  const pathname = usePathname();
  const { logout, isAuthenticated, isLoading } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) router.replace("/login");
  }, [pathname, isAuthenticated, isLoading]);

  if (!isAuthenticated) {
    return null;
  }

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/employees", label: "Employees" },
    { href: "/profile", label: "Profile" },
  ];

  return (
    <nav
      className={twMerge(
        "bg-white border-b border-gray-200 px-6 py-4",
        className
      )}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-1">
          <div className="text-xl font-bold text-gray-900 mr-8">TEST App</div>
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              isActive={pathname === item.href}
            >
              {item.label}
            </NavItem>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={logout}
            className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
