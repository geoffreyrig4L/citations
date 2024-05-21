"use client";
import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  Navbar as NextUINavbar,
} from "@nextui-org/navbar";
import NextLink from "next/link";
import { Logo } from "@/components/icons";
import { ThemeSwitch } from "@/components/theme-switch";
import { Button } from "@nextui-org/button";
import {
  Avatar,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export const Navbar = () => {
  const { data: session } = useSession();

  console.log(session);

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">Quotetier</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="py-4" justify="end">
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
        <Divider orientation="vertical" />
        <NavbarItem>
          {session ? (
            <Dropdown>
              <DropdownTrigger>
                <Avatar
                  className="cursor-pointer"
                  name={session.user?.name || ""}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="new">New file</DropdownItem>
                <DropdownItem key="copy">Copy link</DropdownItem>
                <DropdownItem key="edit">Edit file</DropdownItem>
                <DropdownItem
                  key="delete"
                  className="text-danger"
                  color="danger"
                >
                  Delete file
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Button as={Link} color="secondary" href="/signIn" variant="solid">
              Connexion
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>
      {/* <NavbarMenu>
        {searchInput}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu> */}
    </NextUINavbar>
  );
};
