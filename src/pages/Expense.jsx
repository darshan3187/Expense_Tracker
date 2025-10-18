import React, { useState } from 'react';
import Input from "../components/Input"
import Select from '../components/Select';


// Main Component
export default function Expenses() {

    const [openModal, setOpenModal] = useState(false);
    // Modal Form Component
    function ExpenseModal({ open, onClose }) {

        if (!open) return null;

        return (
            <div className="fixed inset-0 bg-opacity-70 z-50 flex items-center justify-center">
                <div className="bg-gray-900 rounded-2xl shadow-lg w-[400px] p-6 absolute text-white">
                    <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-300 text-2xl">&times;</button>
                    <h2 className="text-2xl font-semibold mb-1">Add New Expense</h2>
                    <p className="text-gray-400 mb-6 text-sm">Enter the details of your expense</p>
                    <form className="space-y-5">
                        <div>
                            <Input
                                
                                type="date"
                                className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500 text-white"
                            />
                        </div>
                        <div>
                            <Input
                                
                                label="Amount"
                                min="0"
                                type="number"
                                className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500 text-white"
                                placeholder="0.00" />
                        </div>
                        <div>
                            <label className='inline-block mb-1 pl-1'>Category</label>
                            <Select
                                options={['Food & Dining', 'Transport', 'Shopping', 'Bills & Utilities', 'Healthcare', 'Education', 'Travel', 'Personal Care', 'Other']}
                            />
                        </div>
                        <div>
                            <label className="inline-block mb-1 pl-2">Description</label>
                            <textarea className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500 text-white" rows={2} placeholder="What was this expense for?" />
                        </div>
                        <div>
                            <label className="inline-block mb-1 pl-2 pb-1">Receipt (Optional)</label>
                            <div className="border border-dashed border-gray-600 rounded-xl flex flex-col items-center justify-center p-5">
                                <span className="text-3xl mb-2">&#8682;</span>
                                <p className="text-gray-400">Click to upload receipt</p>
                                <p className="text-xs text-gray-500 mt-1">Max 5MB</p>
                                <input type="file" className="opacity-0 absolute p-15 w-90 cursor-pointer" />
                            </div>
                        </div>
                        <button type="submit" className="w-full py-2 mt-4 bg-indigo-600 rounded-lg hover:bg-indigo-700 text-white font-semibold">Add Expense</button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className='p-5'>
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 has-[>svg]:px-3 group bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] hover:from-[#4f46e5] hover:to-[#7c3aed] transition-all duration-300 hover:shadow-[0_0_25px_rgba(99,102,241,0.7)] hover:scale-105 relative overflow-hidden"
                onClick={() => setOpenModal(true)}>
                Add Expense
            </button>
            
            <ExpenseModal open={openModal} onClose={() => setOpenModal(false)} />
        </div>
    );
}