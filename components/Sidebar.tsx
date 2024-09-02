"use client";
import React, { useState } from "react";
import "@/app/globals.css";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineProject } from "react-icons/ai";
import { RiCalculatorLine } from "react-icons/ri";
import { AiOutlineUser } from "react-icons/ai";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { TbArrowBarToLeft } from "react-icons/tb";
import { CgBriefcase } from "react-icons/cg";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";

import { Separator } from "./ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Arrow } from "@radix-ui/react-tooltip";

import Logo from "./Logo";
import UserAccount from "./UserAccountCard";
import SiteSearch from "./SiteSearch";
import LogoIcon from "./LogoIcon";
import NavigationLink from "./NavigationLink";

// TODO: fix transition for logo scaling

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
    title: "Estimate",
    href: "/estimate",
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

const sidebarAnimation = {
  open: {
    width: "20rem",
    transition: {
      ease: [0.17, 0.67, 0.83, 0.67],
      duration: 0.3,
      damping: 100,
    },
  },
  closed: {
    width: "4.9rem",
    transition: {
      duration: 0.2,
      damping: 100,
    },
  },
};

export default function Sidebar() {
  const pathname = usePathname();

  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <motion.nav
      variants={sidebarAnimation}
      animate={isExpanded ? "open" : "closed"}
      className="text-[19px] text-textColor-600 font-semibold h-[98vh] ml-4 my-auto w-[20rem] bg-white rounded-2xl shadow-sm overflow-hidden"
    >
      <AnimatePresence>
        <ul
          className={`flex flex-col gap-2.5 mx-4 py-6 h-full justify-between  ${
            isExpanded ? "overflow-hidden" : "w-[2.83rem]"
          }`}
        >
          <div
            className={`flex flex-col  ${
              isExpanded ? "gap-2.5" : "gap-3.5 items-center"
            }`}
          >
            {/* Logo */}
            <div className="p-1.5 mb-2.5 flex items-center justify-between text-textColor-base">
              {isExpanded ? (
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Logo height={50} width={50} />
                </motion.div>
              ) : (
                <motion.div
                  className="hover:cursor-pointer"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  <TooltipProvider
                    key={"Logo"}
                    delayDuration={isExpanded ? 1000000000 : 150}
                  >
                    <Tooltip>
                      <TooltipTrigger>
                        <LogoIcon height={33} width={33} />
                      </TooltipTrigger>
                      <TooltipContent
                        className="border-transparent"
                        side="right"
                        sideOffset={30}
                      >
                        <Arrow
                          style={{
                            fill: "white",
                            filter: "drop-shadow(0 0 4px gray)",
                            clipPath: "inset(0 -10px -10px -10px)",
                          }}
                        />
                        <p className="text-textColor-base">Expand</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </motion.div>
              )}
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <TbArrowBarToLeft
                    className="text-textColor-600 hover:cursor-pointer"
                    size={27}
                    onClick={() => setIsExpanded(!isExpanded)}
                  />
                </motion.div>
              )}
            </div>
            {/* Search */}
            {isExpanded ? (
              <motion.div>
                <SiteSearch />
              </motion.div>
            ) : (
              <motion.div
                className="p-1.5 bg-[#EAEDF1] rounded-lg border-textColor-base/10 border-[0.2px] hover:cursor-pointer"
                whileHover={{ scale: 1.1 }}
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <IoSearch size={ICON_SIZE + 3} className="text-textColor-600" />
              </motion.div>
            )}
            {navigationLinks.map((navigationLink, index) =>
              linksAmount - 2 !== index && linksAmount - 1 !== index ? (
                <NavigationLink
                  key={navigationLink.title}
                  pathname={pathname}
                  title={navigationLink.title}
                  href={navigationLink.href}
                  icon={navigationLink.icon}
                  isExpanded={isExpanded}
                />
              ) : null
            )}
            <Separator className="w-[96%] h-[1.5px] mx-auto my-3.5 bg-textColor-400/20" />
          </div>
          {/* Admin and Settings Links */}
          <div
            className={`flex flex-col ${
              isExpanded ? "gap-2.5" : "gap-3.5 items-center"
            }`}
          >
            {navigationLinks.map(
              (navigationLink, index) =>
                index >= linksAmount - 2 && (
                  <NavigationLink
                    key={navigationLink.title}
                    pathname={pathname}
                    title={navigationLink.title}
                    href={navigationLink.href}
                    icon={navigationLink.icon}
                    isExpanded={isExpanded}
                  />
                )
            )}
            <Separator className="w-[96%] h-[1.8px] mx-auto my-3.5 bg-textColor-400/20" />
            {/* User Account */}
            <motion.div
              className={`overflow-visible ${
                isExpanded ? "px-1.5" : "-mt-0.5 ml-[0.25px]"
              }`}
            >
              <UserAccount showNameEmailArrow={isExpanded} />
            </motion.div>
          </div>
        </ul>
      </AnimatePresence>
    </motion.nav>
  );
}
