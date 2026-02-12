import React, { useId } from 'react';
import { cn } from '../../lib/utils';
import { AlertCircle } from 'lucide-react';

const Input = React.forwardRef(({
    className,
    error,
    label,
    type = "text",
    hint,
    startIcon: StartIcon,
    endIcon: EndIcon,
    ...props
}, ref) => {
    const id = useId();

    return (
        <div className='w-full space-y-2'>
            {label && (
                <label
                    htmlFor={id}
                    className='text-sm font-medium text-zinc-400 block ml-0.5'
                >
                    {label}
                </label>
            )}
            <div className="relative group">
                {StartIcon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none group-focus-within:text-indigo-400 transition-colors">
                        <StartIcon size={16} />
                    </div>
                )}

                <input
                    type={type}
                    id={id}
                    className={cn(
                        "flex h-11 w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm text-zinc-100 shadow-sm transition-all duration-200",
                        "placeholder:text-zinc-600",
                        "focus-visible:outline-none focus-visible:border-indigo-500/50 focus-visible:ring-2 focus-visible:ring-indigo-500/20",
                        "disabled:cursor-not-allowed disabled:opacity-50",
                        StartIcon && "pl-10",
                        EndIcon && "pr-10",
                        error && "border-red-500/50 focus-visible:border-red-500/50 focus-visible:ring-red-500/20",
                        className
                    )}
                    ref={ref}
                    {...props}
                />

                {EndIcon && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500">
                        <EndIcon size={16} />
                    </div>
                )}
            </div>

            {(error || hint) && (
                <div className="flex items-center gap-1.5 ml-0.5">
                    {error && <AlertCircle className="w-3.5 h-3.5 text-red-400" />}
                    <p className={cn(
                        "text-xs",
                        error ? "text-red-400 font-medium" : "text-zinc-500"
                    )}>
                        {error ? error.message : hint}
                    </p>
                </div>
            )}
        </div>
    );
});

Input.displayName = "Input";

export { Input };
