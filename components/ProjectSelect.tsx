"use client";
import React, { Dispatch, SetStateAction, useState } from "react";

import { motion } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { BsFilePerson, BsFilePersonFill } from "react-icons/bs";
import { Project } from "@/types";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.25,
      staggerChildren: 0.15,
    },
  },
};
const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

interface ProjectSelectProps {
  projects: Project[];
  clientNames: (string | undefined)[];
  selectedProject: Project | null;
  setSelectedProject: Dispatch<SetStateAction<Project | null>>
}

export default function ProjectSelect({
  projects,
  clientNames,
  selectedProject,
  setSelectedProject
}: ProjectSelectProps) {

  return (
    <motion.ul
      animate={"visible"}
      variants={container}
      initial={"hidden"}
      className="h-fit w-fit grid grid-rows-2 grid-cols-3 place-items-center place-content-center gap-x-8 gap-y-4 my-4 2xl:gap-x-10 2xl:gap-y-5 2xl:my-5"
    >
      {projects.map((project, index) => (
        <motion.li
          onClick={() => setSelectedProject(project)}
          variants={item}
          key={index}
          whileHover={selectedProject?.id !== project.id ? { scale: 1.03 } : {}}
          className={`h-24 w-[144px] 2xl:h-32 2xl:w-48 bg-white rounded-lg hover:border-[2px] hover:border-PRIMARY-500/60 border-[2px] duration-200 ${
            selectedProject?.id === project.id
              ? "border-PRIMARY-500/60"
              : "border-textColor-300/35"
          }`}
        >
          <div className="flex flex-col justify-between h-full w-full p-3">
            <span className="flex justify-between">
              <h3 className="font-bold text-ACCENT-900 text-xs 2xl:text-base">
                {project.name}
              </h3>
              <span
                className={`${
                  selectedProject?.id === project.id
                    ? "bg-PRIMARY-500/50"
                    : "bg-textColor-100/70"
                } rounded-[2px] h-2 w-2 2xl:h-2.5 2xl:w-2.5`}
              ></span>
            </span>
            <span>
              <span className="flex gap-1 items-center text-[8px] 2xl:text-[11.5px] font-medium text-textColor-400 tracking-wide">
                <BsFilePerson /> {clientNames[index]}
              </span>
              <span className="flex gap-1 items-center text-[8px] 2xl:text-[11.5px] font-medium text-textColor-400 tracking-wide">
                <FaLocationCrosshairs /> {project.street_address}
              </span>
            </span>
          </div>
        </motion.li>
      ))}
    </motion.ul>
  );
}

//hover:from-PRIMARY-50/50 hover:to-PRIMARY-base hover:bg-gradient-to-r
