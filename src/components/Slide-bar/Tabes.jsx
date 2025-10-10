import React from "react";
// Assuming you have installed @radix-ui/react-tabs
import * as TabsPrimitive from "@radix-ui/react-tabs";

/**
 * Utility function to conditionally join class names.
 * This replaces the 'cn' import typically found in './utils'.
 * @param {string[]} classes - A list of class names or conditional values.
 * @returns {string} The joined class string.
 */
function cn(...classes) {
    // Filters out null, undefined, 0, false, and joins the remaining strings with a space.
    return classes.filter(Boolean).join(' ');
}

// --- Component Definitions ---

/**
 * The main Tabs root component.
 * @param {object} props - Component props including className.
 */
function Tabs({ className, ...props }) {
    return (
        <TabsPrimitive.Root
            data-slot="tabs"
            className={cn("flex flex-col gap-2", className)}
            {...props}
        />
    );
}

/**
 * The container for the Tabs triggers (list).
 * @param {object} props - Component props including className.
 */
function TabsList({ className, ...props }) {
    return (
        <TabsPrimitive.List
            data-slot="tabs-list"
            className={cn(
                "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-xl p-[3px] flex",
                className,
            )}
            {...props}
        />
    );
}

/**
 * The clickable element that controls the active tab.
 * @param {object} props - Component props including className.
 */
function TabsTrigger({ className, ...props }) {
    return (
        <TabsPrimitive.Trigger
            data-slot="tabs-trigger"
            className={cn(
                "data-[state=active]:bg-card dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-xl border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                className,
            )}
            {...props}
        />
    );
}

/**
 * The content panel associated with a specific tab value.
 * @param {object} props - Component props including className.
 */
function TabsContent({ className, ...props }) {
    return (
        <TabsPrimitive.Content
            data-slot="tabs-content"
            className={cn("flex-1 outline-none", className)}
            {...props}
        />
    );
}

// Ensure proper exports for use in other files
export { Tabs, TabsList, TabsTrigger, TabsContent };