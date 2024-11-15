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

import { SquareChartGantt } from "lucide-react";

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
import { BiDetail } from "react-icons/bi";
import { start } from "repl";

// TODO: fix transition for logo scaling

const ICON_SIZE = 14;
const ICON_SIZE_2XL = 19;
const iconClassName = `text-[${ICON_SIZE}px] 2xl:text-[${ICON_SIZE_2XL}px]`;

const navigationLinks = [
  {
    title: "Dashboard",
    href: "/",
    icon: <AiOutlineHome className={iconClassName} />,
    authRole: "user",
  },
  {
    title: "Projects",
    href: "/projects",
    icon: <AiOutlineProject className={iconClassName} />,
    authRole: "user",
  },
  {
    title: "Clients",
    href: "/clients",
    icon: <AiOutlineUser className={iconClassName} />,
    authRole: "user",
  },
  {
    title: "Proposals",
    href: "/proposals",
    icon: <BiDetail className={iconClassName} />,
    authRole: "user",
  },
  {
    title: "Estimates",
    href: "/estimates",
    icon: <RiCalculatorLine className={iconClassName} />,
    authRole: "user",
  },
  {
    title: "Invoices",
    href: "/invoices",
    icon: <LiaFileInvoiceDollarSolid className={iconClassName} />,
    authRole: "user",
  },
  {
    title: "Operation",
    href: "/operation",
    icon: <CgBriefcase className={iconClassName} />,
    authRole: "admin",
  },
  {
    title: "Admin",
    href: "/admin",
    icon: (
      <MdOutlineAdminPanelSettings
        className={`text-[${ICON_SIZE + 2}px] 2xl:text-[${
          ICON_SIZE_2XL + 2
        }px]`}
      />
    ),
    authRole: "admin",
  },
  {
    title: "Settings",
    href: "/settings",
    icon: <FiSettings className={iconClassName} />,
    authRole: "user",
  },
];
const linksAmount = navigationLinks.length;

const sidebarAnimation = {
  open: {
    width: "18%",
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

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.nav
      variants={sidebarAnimation}
      animate={isExpanded ? "open" : "closed"}
      className="text-sm 2xl:text-[19px] text-textColor-600 font-semibold h-[97vh] my-auto ml-4 bg-white rounded-2xl shadow-sm overflow-hidden"
    >
      <AnimatePresence>
        <ul
          className={`py-5 2xl:py-6 flex flex-col gap-2.5 mx-4 h-full justify-between  ${
            isExpanded ? "overflow-hidden" : "w-[2.83rem]"
          }`}
        >
          <div
            className={`flex flex-col  ${
              isExpanded ? "gap-2.5" : "gap-3.5 items-center"
            }`}
          >
            {/* Logo */}
            <div className="p-1.5 mb-2 2xl:mb-2.5 flex items-center justify-between text-textColor-base">
              {isExpanded ? (
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Logo
                    className={"h-9 w-9 2xl:h-10 2xl:w-10"}
                    textClassName="text-[11.5px] 2xl:text-[15px]"
                    separatorClassName={"w-[0.8px] h-11 2xl:w-[1px] 2xl:h-14"}
                  />
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
                        <LogoIcon className="h-6 w-6 2xl:h-8 2xl:w-8" />
                      </TooltipTrigger>
                      <TooltipContent
                        className="border-transparent h-7 2xl:h-8 flex items-center"
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
                        <p className="text-textColor-700 text-[13px] 2xl:text-[18px]">
                          Expand
                        </p>
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
                    style={{ fontSize: ICON_SIZE + 8 }}
                    className={`2xl:text-[${
                      ICON_SIZE_2XL + 8
                    }px] text-textColor-600 hover:cursor-pointer`}
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
            <Separator className="w-[96%] h-[1px] 2xl:h-[1.5px] mx-auto my-3 2xl:my-3.5 bg-textColor-400/20" />
          </div>
          {/* Admin and Settings Links */}
          <div
            className={`flex flex-col ${
              isExpanded ? "gap-2.5" : "gap-2.5 2xl:gap-3.5 items-center"
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
            <Separator className="w-[96%] h-[1px] 2xl:h-[1.8px] mx-auto my-3 2xl:my-3.5 bg-textColor-400/20" />
            {/* User Account */}
            <motion.div
              className={`overflow-visible 
              `}
            >
              <UserAccount showNameEmailArrow={isExpanded} />
            </motion.div>
          </div>
        </ul>
      </AnimatePresence>
    </motion.nav>
  );
}
