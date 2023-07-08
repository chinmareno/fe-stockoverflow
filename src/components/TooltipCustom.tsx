import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ReactNode } from "react";

interface TooltipProps {
  children: ReactNode;
  tooltip: string;
}
const TooltipCustom = ({ children, tooltip }: TooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          className="text-[#333333 ] disabled: bg-[#F1F1F1] font-semibold capitalize
opacity-80 dark:bg-[#333333] dark:text-[#FFFFFF]"
        >
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipCustom;
