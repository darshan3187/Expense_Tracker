import React from 'react'
import { TabsTrigger } from '../components/Slide-bar/Tabes'

function Expense() {
    return (
        <TabsTrigger
            value="expenses"
            className="data-[state=active]:bg-[#6366f1] data-[state=active]:text-white text-gray-200"
        >
            Expenses
        </TabsTrigger>
    )
}

export default Expense
