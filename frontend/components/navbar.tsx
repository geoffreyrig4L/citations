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
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const { data: session, status: status } = useSession();
  const router = useRouter();

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">QuoteTier</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="py-4" justify="end">
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
        <Divider orientation="vertical" />
        <NavbarItem>
          {status != "loading" && (
            <div>
              {session ? (
                <Dropdown>
                  <DropdownTrigger>
                    <div className="flex items-center gap-4 cursor-pointer">
                      <Avatar name={session.user?.name || ""} />
                      <h4 className="font-bold">{session.user?.name || ""}</h4>
                    </div>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Static Actions">
                    <DropdownItem
                      key="profile"
                      onClick={() =>
                        router.push(`/profile/@${session?.username || ""}`)
                      }
                    >
                      Profil
                    </DropdownItem>
                    <DropdownItem
                      key="logout"
                      className="text-danger"
                      color="danger"
                      onClick={async () => await signOut({ callbackUrl: "/" })}
                    >
                      Déconnexion
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              ) : (
                <Button
                  as={Link}
                  color="secondary"
                  href="/signIn"
                  variant="solid"
                >
                  Connexion
                </Button>
              )}
            </div>
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
