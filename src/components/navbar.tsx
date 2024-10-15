"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import { Box, Container, Flex } from "@radix-ui/themes";

const Navbar = () => {
  const currentPath = usePathname();
  const { status, data: session } = useSession();

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
    <nav className="py-3 px-5 border-b  mb-5 ">
      <Container>
        <Flex justify={"between"}>
          <Flex align={"center"} gap={"2"}>
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
          </Flex>
          <Box>
            {status === "authenticated" && (
              <Link
                href="/api/auth/signout"
                className="hover:text-zinc-800 transition-colors"
              >
                Sign out
              </Link>
            )}
            {status === "unauthenticated" && (
              <Link
                href="/api/auth/signin"
                className="hover:text-zinc-800 transition-colors"
              >
                Sign In
              </Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default Navbar;
