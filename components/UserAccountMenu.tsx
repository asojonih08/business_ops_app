"use client";
import React from "react";

import { CgProfile } from "react-icons/cg";
import { PiBroadcast } from "react-icons/pi";
import { RiListSettingsLine } from "react-icons/ri";
import { MdOutlineSupportAgent } from "react-icons/md";
import { FaRegBell } from "react-icons/fa";
import { AiOutlineMoon } from "react-icons/ai";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";

import UserAvatarCard from "./UserAvatarCard";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { Switch } from "@/components/ui/switch";
import { usePathname } from "next/navigation";

const ICON_SIZE_3XL = 19;
const ICON_SIZE = 14;
const iconClassName = `text-[${ICON_SIZE}px] xl:text-[${ICON_SIZE_3XL}px]`;

const navigationLinks = [
  {
    title: "Profile",
    href: "/profile",
    icon: <CgProfile className={iconClassName} />,
  },
  {
    title: "Account Settings",
    href: "/account",
    icon: <RiListSettingsLine className={iconClassName} />,
  },
  {
    title: "Notification Settings",
    href: "/notifications",
    icon: <PiBroadcast className={iconClassName} />,
  },
  {
    title: "Support",
    href: "/support",
    icon: <MdOutlineSupportAgent className={iconClassName} />,
  },
];

const toggles = [
  {
    title: "Notifications",
    icon: <FaRegBell className={iconClassName} />,
  },
  {
    title: "Dark Mode",
    icon: <AiOutlineMoon className={iconClassName} />,
  },
];

export default function UserAccountMenu() {
  const pathname = usePathname();
  return (
    <nav className="text-[13px] xl:text-[15px] text-textColor-600 font-semibold">
      <ul className="flex flex-col gap-1 m-1 xl:m-2">
        <li className="mb-1 xl:my-2 px-2">
          <UserAvatarCard showNameEmail />
        </li>

        {navigationLinks.map((navigationLink, index) => (
          <>
            <li
              className={`rounded-lg border-transparent border-[0.2px]
            hover:duration-150 
          ${
            pathname === navigationLink.href
              ? "bg-primary-base hover:bg-none text-textColor-base border-textColor-base/10"
              : "hover:text-textColor-base hover:bg-textColor-100/80"
          }`}
            >
              <Link
                className="p-1.5 ml-2 flex justify-between items-center"
                key={navigationLink.title}
                href={navigationLink.href}
              >
                <span className="flex gap-4 items-center ">
                  {navigationLink.icon}
                  {navigationLink.title}
                </span>
                <MdOutlineKeyboardArrowRight className={iconClassName} />
              </Link>
            </li>

            {(index + 1) % 2 === 0 && index !== 0 && (
              <Separator className="my-2" />
            )}
          </>
        ))}

        {toggles.map((toggle, index) => (
          <li>
            <span
              className="flex gap-2 items-center justify-between p-1.5 ml-2 "
              key={toggle.title}
            >
              <span className="flex gap-4 items-center">
                {toggle.icon}
                {toggle.title}
              </span>
              <Switch />
            </span>

            {(index + 1) % 2 === 0 && index !== 0 && (
              <Separator className="my-1.5 xl:my-2" />
            )}
          </li>
        ))}
        <li
          className="rounded-lg border-transparent border-[0.2px]  text-red-600
            hover:text-textColor-base hover:bg-textColor-100/80 hover:duration-150"
        >
          <span className="flex justify-between items-center p-1.5 ml-2">
            <span className="flex gap-4 items-center ">
              <IoLogOutOutline className={iconClassName} />
              Logout Account
            </span>
            <MdOutlineKeyboardArrowRight className={iconClassName} />
          </span>
        </li>
      </ul>
    </nav>
  );
}
