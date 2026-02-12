import React from 'react';
import { cn } from '../../lib/utils';

export function Card({ children, className, variant = 'default', ...props }) {
    const variants = {
        default: "bg-surface/50 backdrop-blur-sm border border-border/50 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300",
        solid: "bg-zinc-900 border border-zinc-800 shadow-md",
        ghost: "bg-transparent border-transparent hover:bg-zinc-900/50"
    };

    return (
        <div
            className={cn(
                "rounded-xl overflow-hidden group",
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

Card.Header = ({ children, className }) => (
    <div className={cn("p-6 border-b border-border/50", className)}>
        {children}
    </div>
);

Card.Body = ({ children, className }) => (
    <div className={cn("p-6", className)}>
        {children}
    </div>
);

Card.Footer = ({ children, className }) => (
    <div className={cn("p-6 border-t border-border/50 bg-zinc-900/30", className)}>
        {children}
    </div>
);

Card.Title = ({ children, className }) => (
    <h3 className={cn("text-lg font-semibold text-zinc-100", className)}>
        {children}
    </h3>
);

Card.Description = ({ children, className }) => (
    <p className={cn("text-sm text-zinc-400 mt-1", className)}>
        {children}
    </p>
);
