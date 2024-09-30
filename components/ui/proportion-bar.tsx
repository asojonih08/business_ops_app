import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ProportionBarProps {
  width?: number | null;
  barHeight?: number | null;
  items: {
    label: string;
    value: number;
  }[];
  style?: {
    gap: number | null;
    rounded: string | null;
  };
}

export default function ProportionBar({
  width = 100,
  barHeight = 16,
  items,
  style,
}: ProportionBarProps) {
  const defaultColors = ["#93C5FD", "#6649F2", "#4962F2", "#49CDF2", "#9D49F2"];
  items = items.sort((a, b) => b.value - a.value);
  const total = items.reduce((currTotal, item) => currTotal + item.value, 0);
  const percentages = items.map((item) =>
    Math.round((item.value / total) * 100)
  );

  return (
    <div className={`w-[${width}%] h-full flex flex-col items-end gap-2`}>
      <div className="w-full flex items-center gap-2 justify-between text-xs tracking-wide uppercase text-textColor-base font-medium mt-1">
        <span>Materials Breakdown</span>
        <div className="flex items-center gap-3">
          {items.map((item, index) => (
            <div key={item.label} className="flex gap-1 items-center">
              <span
                className={`h-1.5 w-1.5 rounded-full`}
                style={{
                  backgroundColor: defaultColors[index],
                  opacity: "90%",
                }}
              />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full h-full flex gap-1.5 items-center">
        {items.map((item, index) => (
          <TooltipProvider key={item.label} delayDuration={50}>
            <Tooltip>
              <TooltipTrigger
                className={`rounded-sm`}
                style={{
                  flexBasis: `${percentages[index]}%`,
                  backgroundColor: defaultColors[index],
                  opacity: "76%",
                  height: `${barHeight}px`,
                }}
              ></TooltipTrigger>
              <TooltipContent>
                <span className="text-[11.5px] rounded-sm bg-white h-3 w-28 font-medium tracking-wide flex justify-between items-center">
                  <div className="flex gap-1.5 items-center">
                    <span
                      className={`h-3 w-3 rounded-sm`}
                      style={{ backgroundColor: defaultColors[index] }}
                    ></span>
                    <p className="text-textColor-800/70">{item.label}</p>
                  </div>
                  <span className="font-medium text-textColor-base">
                    ${item.value}
                  </span>
                </span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
}
