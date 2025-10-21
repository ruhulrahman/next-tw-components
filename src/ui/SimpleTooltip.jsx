import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

const SimpleTooltip = ({ icon, text, children }) => (
    <TooltipProvider delayDuration={0}>
        <Tooltip>
            <TooltipTrigger>
                {children || icon}
            </TooltipTrigger>
            <TooltipContent className="text-xs font-medium max-w-[300px] text-wrap">
                <p>{text}</p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
);

export default SimpleTooltip;