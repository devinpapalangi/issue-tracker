"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import classNames from "classnames";

const Navbar = () => {
  const currentPath = usePathname();

  const navItems = [
    {
      href: "/",
      label: "Dashboard",
    },
    {
      href: "/issues",
      label: "Issues",
    },
  ];

  return (
    <nav className="flex space-x-6 h-14 px-5 border-b items-center mb-5 ">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6">
        {navItems.map((item) => (
          <li
            key={item.href}
            className={classNames({
              "hover:text-zinc-800 transition-colors": true,
              "text-zinc-900": item.href === currentPath,
              "text-zinc-500": item.href !== currentPath,
            })}
          >
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
