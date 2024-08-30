"use client";

import Link from "next/link";
import React from "react";
import "@/app/globals.css";

import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineCalculator } from "react-icons/ai";
import { MdOutlineAnalytics } from "react-icons/md";
import { AiOutlineProject } from "react-icons/ai";
import { RiCalculatorLine } from "react-icons/ri";
import { CgCalculator } from "react-icons/cg";
import { AiOutlineUser } from "react-icons/ai";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { TbArrowBarToLeft } from "react-icons/tb";
import { TiBriefcase } from "react-icons/ti";
import { CgBriefcase } from "react-icons/cg";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { FiSettings } from "react-icons/fi";

import { Separator } from "./ui/separator";
import Logo from "./Logo";
import UserAccount from "./UserAccountCard";
import SiteSearch from "./SiteSearch";
import { usePathname } from "next/navigation";

const ICON_SIZE = 19;

const navigationLinks = [
  {
    title: "Dashboard",
    href: "/",
    icon: <AiOutlineHome size={ICON_SIZE} />,
    authRole: "user",
  },
  {
    title: "Projects",
    href: "/projects",
    icon: <AiOutlineProject size={ICON_SIZE} />,
    authRole: "user",
  },
  {
    title: "Clients",
    href: "/clients",
    icon: <AiOutlineUser size={ICON_SIZE} />,
    authRole: "user",
  },
  {
    title: "Proposal",
    href: "/proposal",
    icon: <RiCalculatorLine size={ICON_SIZE} />,
    authRole: "user",
  },
  {
    title: "Invoices",
    href: "/invoices",
    icon: <LiaFileInvoiceDollarSolid size={ICON_SIZE} />,
    authRole: "user",
  },
  {
    title: "Operation",
    href: "/operation",
    icon: <CgBriefcase size={ICON_SIZE} />,
    authRole: "admin",
  },
  {
    title: "Admin",
    href: "/admin",
    icon: <MdOutlineAdminPanelSettings size={ICON_SIZE} />,
    authRole: "admin",
  },
  {
    title: "Settings",
    href: "/settings",
    icon: <FiSettings size={ICON_SIZE} />,
    authRole: "user",
  },
];
const linksAmount = navigationLinks.length;

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="text-[19px] text-textColor-300 font-semibold h-[98vh] ml-4 my-auto w-[20rem] bg-white rounded-2xl shadow-sm">
      <ul className="flex flex-col gap-2.5 mx-4 py-7 h-full justify-between">
        <div className="flex flex-col gap-2.5">
          <div className="p-1.5 mb-3 flex items-center justify-between text-textColor-base">
            <Logo />
            <TbArrowBarToLeft className="text-textColor-300" size={27} />
          </div>
          <SiteSearch />
          {navigationLinks.map((navigationLink, index) =>
            linksAmount - 2 !== index && linksAmount - 1 !== index ? (
              <li
                className={`rounded-lg border-transparent border-[0.2px]
                hover:duration-150
              ${
                pathname === navigationLink.href
                  ? "bg-primary-base hover:bg-none text-textColor-base border-textColor-base/10"
                  : "hover:text-textColor-base hover:bg-textColor-100/80"
              }`}
                key={navigationLink.href}
              >
                <Link
                  className="flex gap-2 items-center p-1.5"
                  key={navigationLink.title}
                  href={navigationLink.href}
                >
                  {navigationLink.icon}
                  {navigationLink.title}
                </Link>
              </li>
            ) : null
          )}
          <Separator className="w-[96%] h-[1.8px] mx-auto my-3.5 bg-textColor-100" />
        </div>
        {/* Admin and Settings Links */}
        <div className="flex flex-col gap-2.5">
          <li
            className={`rounded-lg border-transparent border-[0.2px]
              hover:duration-150
            ${
              pathname === navigationLinks[linksAmount - 2].href
                ? "bg-primary-base hover:bg-none text-textColor-base border-textColor-base/10"
                : "hover:text-textColor-base hover:bg-textColor-100/80"
            }`}
            key={navigationLinks[linksAmount - 2].href}
          >
            <Link
              className="flex gap-2 items-center p-1.5"
              key={navigationLinks[linksAmount - 2].title}
              href={navigationLinks[linksAmount - 2].href}
            >
              {navigationLinks[linksAmount - 2].icon}
              {navigationLinks[linksAmount - 2].title}
            </Link>
          </li>
          <li
            className={`rounded-lg border-transparent border-[0.2px]
              hover:duration-150
            ${
              pathname === navigationLinks[linksAmount - 1].href
                ? "bg-primary-base hover:bg-none text-textColor-base border-textColor-base/10"
                : "hover:text-textColor-base hover:bg-textColor-100/80"
            }`}
            key={navigationLinks[linksAmount - 1].href}
          >
            <Link
              className="flex gap-2 items-center p-1.5"
              key={navigationLinks[linksAmount - 1].title}
              href={navigationLinks[linksAmount - 1].href}
            >
              {navigationLinks[linksAmount - 1].icon}
              {navigationLinks[linksAmount - 1].title}
            </Link>
          </li>
          <Separator className="w-[96%] h-[1.8px] mx-auto my-3.5 bg-textColor-100" />
          <div className="px-1.5">
            <UserAccount />
          </div>
        </div>
      </ul>
    </nav>
  );
}
