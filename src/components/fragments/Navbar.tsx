"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { HamburgerMenuIcon, Cross2Icon } from "@radix-ui/react-icons";

const NavbarComponent = () => {
  const pathName = usePathname();
  const hiddenPaths = ["/quiz/", "/login", "/register"];
  const shouldNotRenderNavbar = hiddenPaths.some((path) =>
    pathName.startsWith(path)
  );

  const [isOpenMenu, setIsOpenMenu] = useState(false);

  if (shouldNotRenderNavbar) return;

  return (
    <>
      <nav className="flex justify-between items-center w-full h-[65px] border-2">
        <h1 className="mx-4 text-xl font-semibold">Questify</h1>
        <Button
          variant="outline"
          className="z-50 mx-4 md:z-0 md:hidden"
          onClick={() => setIsOpenMenu((prev) => (prev ? false : true))}
        >
          {!isOpenMenu ? (
            <HamburgerMenuIcon className="size-5" />
          ) : (
            <Cross2Icon className="size-5" />
          )}
        </Button>
        <ul
          className={cn(
            isOpenMenu ? "translate-y-0" : "-translate-y-full",
            "absolute top-0 inset-x-0	h-svh duration-700 flex flex-col justify-evenly items-center bg-background md:static md:translate-y-0 md:flex-row md:w-6/12 md:h-full md:bg-transparent"
          )}
        >
          <li>
            <Link href="/" onClick={() => setIsOpenMenu(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/quiz" onClick={() => setIsOpenMenu(false)}>
              Quiz
            </Link>
          </li>
          <li>
            <Link href="/dashboard" onClick={() => setIsOpenMenu(false)}>
              Account
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavbarComponent;
