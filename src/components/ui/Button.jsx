import React from 'react';
import { cn } from '../../lib/utils';
import { Loader2 } from 'lucide-react';

const Button = React.forwardRef(({
    className,
    variant = 'default',
    size = 'default',
    isLoading = false,
    children,
    disabled,
    ...props
}, ref) => {

    const variants = {
        default: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-500/10 active:scale-[0.98]",
        secondary: "bg-zinc-800 text-zinc-100 hover:bg-zinc-700 border border-zinc-700 active:scale-[0.98]",
        outline: "border border-zinc-700 bg-transparent text-zinc-300 hover:bg-zinc-800 hover:text-white active:scale-[0.98]",
        ghost: "bg-transparent text-zinc-300 hover:bg-zinc-800 hover:text-white active:scale-[0.98]",
        destructive: "bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20 active:scale-[0.98]",
        link: "text-indigo-400 underline-offset-4 hover:underline",
    };

    const sizes = {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-md px-8 text-base",
        icon: "h-10 w-10 p-0 items-center justify-center flex",
    };

    return (
        <button
            className={cn(
                "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                variants[variant],
                sizes[size],
                className
            )}
            ref={ref}
            disabled={isLoading || disabled}
            {...props}
        >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {children}
        </button>
    );
});

Button.displayName = "Button";

export { Button };
