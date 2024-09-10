import React from "react";
import CreateEstimate from "@/components/CreateEstimate";
import ProjectTotals from "@/components/ProjectTotals";
import EstimateSummary from "@/components/EstimateSummary";
import ProjectItems from "@/components/ProjectItems";

export default function Page() {
  return (
    <div className="h-full my-auto w-full flex gap-4 2xl:gap-6 justify-between">
      <div className="h-full w-[45%] flex flex-col gap-4 2xl:gap-6 rounded-2xl">
        <div className="px-6 py-4 2xl:px-8 2xl:py-5 rounded-2xl h-[15%] bg-white flex flex-col gap-6 items-center">
          <ProjectTotals />
        </div>
        <div className="px-8 py-5 2xl:px-8 2xl:py-7 rounded-2xl bg-white h-[85%]">
          <CreateEstimate />
        </div>
      </div>
      <div className="w-[55%] flex flex-col gap-6 justify-between">
        <div className="px-6 py-5 2xl:px-8 2xl:py-8 rounded-2xl h-[50%] bg-white">
          <EstimateSummary />
        </div>
        <div className="px-6 py-5 2xl:px-8 2xl:py-7 h-[50%] bg-white w-full rounded-2xl">
          <ProjectItems />
        </div>
      </div>
    </div>
  );
}
