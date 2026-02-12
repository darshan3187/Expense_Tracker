import React, { useId } from "react";
import { cn } from "../../lib/utils";
import { ChevronDown } from "lucide-react";

const Select = React.forwardRef(({
    className,
    options = [],
    label,
    error,
    placeholder = "Select an option",
    ...props
}, ref) => {
    const id = useId();

    return (
        <div className="w-full space-y-2">
            {label && (
                <label
                    htmlFor={id}
                    className="text-sm font-medium text-zinc-400 block ml-0.5"
                >
                    {label}
                </label>
            )}
            <div className="relative">
                <select
                    id={id}
                    className={cn(
                        "flex h-11 w-full appearance-none rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm text-zinc-100 shadow-sm transition-all duration-200",
                        "focus-visible:outline-none focus-visible:border-indigo-500/50 focus-visible:ring-2 focus-visible:ring-indigo-500/20",
                        "disabled:cursor-not-allowed disabled:opacity-50",
                        error && "border-red-500/50 focus-visible:border-red-500/50 focus-visible:ring-red-500/20",
                        className
                    )}
                    ref={ref}
                    {...props}
                >
                    {placeholder && <option value="" disabled selected>{placeholder}</option>}
                    {options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 pointer-events-none" />
            </div>
            {error && (
                <p className="text-xs text-red-400 font-medium ml-0.5">{error.message}</p>
            )}
        </div>
    );
});

Select.displayName = "Select";

export { Select };
