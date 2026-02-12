import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from './Button';

export function Modal({ isOpen, onClose, title, children, className }) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
                onClick={onClose}
            />

            <div
                className={cn(
                    "relative w-full max-w-lg transform rounded-xl border border-zinc-800 bg-zinc-900 shadow-2xl transition-all animate-in zoom-in-95 duration-200 sm:scale-100",
                    className
                )}
            >
                <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-4">
                    <h3 className="text-lg font-semibold text-zinc-100">
                        {title}
                    </h3>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onClose}
                        className="h-8 w-8 text-zinc-400 hover:text-white"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                <div className="px-6 py-4 max-h-[80vh] overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
}
