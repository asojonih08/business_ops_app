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

const ICON_SIZE = 19;

const navigationLinks = [
  {
    title: "Profile",
    href: "/profile",
    icon: <CgProfile size={ICON_SIZE} />,
  },
  {
    title: "Account Settings",
    href: "/account",
    icon: <RiListSettingsLine size={ICON_SIZE} />,
  },
  {
    title: "Notification Settings",
    href: "/notifications",
    icon: <PiBroadcast size={ICON_SIZE} />,
  },
  {
    title: "Support",
    href: "/support",
    icon: <MdOutlineSupportAgent size={ICON_SIZE} />,
  },
];

const toggles = [
  {
    title: "Notifications",
    icon: <FaRegBell size={ICON_SIZE} />,
  },
  {
    title: "Dark Mode",
    icon: <AiOutlineMoon size={ICON_SIZE} />,
  },
];

export default function UserAccountMenu() {
  const pathname = usePathname();
  return (
    <nav className="text-base text-textColor-300 font-semibold">
      <ul className="flex flex-col gap-1 m-2">
        <li className="mb-2">
          <UserAvatarCard />
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
                <MdOutlineKeyboardArrowRight size={ICON_SIZE} />
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
              <Separator className="my-2" />
            )}
          </li>
        ))}
        <li
          className="rounded-lg border-transparent border-[0.2px]  text-red-600
            hover:text-textColor-base hover:bg-textColor-100/80 hover:duration-150"
        >
          <span className="flex justify-between items-center p-1.5 ml-2">
            <span className="flex gap-4 items-center ">
              <IoLogOutOutline size={ICON_SIZE} />
              Logout Account
            </span>
            <MdOutlineKeyboardArrowRight size={ICON_SIZE} />
          </span>
        </li>
      </ul>
    </nav>
  );
}
