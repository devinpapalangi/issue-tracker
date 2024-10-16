"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import Skeleton from "./skeleton";

const Navbar = () => {
  return (
    <nav className="py-3 px-5 border-b  mb-5 ">
      <Container>
        <Flex justify={"between"}>
          <Flex align={"center"} gap={"2"}>
            <AppLogo />
            <GeneralNavigation />
          </Flex>
          <Box></Box>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

const AppLogo = () => {
  return (
    <Link href="/">
      <AiFillBug />
    </Link>
  );
};

const GeneralNavigation = () => {
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
    <ul className="flex space-x-6">
      {navItems.map((item) => (
        <li
          key={item.href}
          className={classNames({
            "nav-link": true,
            "!text-zinc-900": item.href === currentPath,
          })}
        >
          <Link href={item.href}>{item.label}</Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading") {
    return <Skeleton width="2rem" height="2rem" borderRadius="2rem" />;
  }

  if (status === "unauthenticated") {
    return (
      <Link
        href="/api/auth/signin"
        className={classNames({
          "nav-link": true,
        })}
      >
        Sign In
      </Link>
    );
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Avatar
          // @ts-ignore
          src={session.user!.image!}
          fallback="?"
          size={"2"}
          radius="full"
          className="cursor-pointer"
          referrerPolicy="no-referrer"
        />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Label>
          <Text size={"2"}>
            {
              // @ts-ignore
              session.user!.email
            }
          </Text>
        </DropdownMenu.Label>
        <DropdownMenu.Item>
          <Link href="/api/auth/signout">Sign out</Link>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default Navbar;
