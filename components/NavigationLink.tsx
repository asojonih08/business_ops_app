import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Arrow } from "@radix-ui/react-tooltip";

interface NavigationLinkProps {
  pathname: string;
  title: string;
  href: string;
  icon: any;
  isExpanded: boolean;
}

export default function NavigationLink({
  pathname,
  title,
  href,
  icon,
  isExpanded,
}: NavigationLinkProps) {
  return (
    <TooltipProvider key={href} delayDuration={isExpanded ? 1000000000 : 150}>
      <Tooltip>
        <TooltipTrigger>
          <li
            className={`rounded-lg border-transparent border-[0.2px] antialiased
                hover:duration-150
              ${
                pathname === href
                  ? "bg-primary-base hover:bg-none text-textColor-base border-textColor-base/10"
                  : "hover:text-textColor-base hover:bg-textColor-100/80"
              }`}
          >
            <Link
              className="flex gap-2 items-center p-1.5"
              key={title}
              href={href}
            >
              <motion.div
                animate={isExpanded ? { scale: 1 } : { scale: 1.3 }}
                transition={{ duration: 0.15 }}
                whileHover={
                  !isExpanded && !(pathname === href) ? { scale: 1.4 } : {}
                }
                className={`${isExpanded ? "" : "p-1"}`}
              >
                {icon}
              </motion.div>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {title}
                </motion.div>
              )}
            </Link>
          </li>
        </TooltipTrigger>
        <TooltipContent
          className="border-transparent h-7 3xl:h-9 flex items-center"
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
          <p className="text-textColor-700 text-[13px] 3xl:text-[18px]">{title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
