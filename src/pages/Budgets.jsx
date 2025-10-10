import React from 'react'
import { TabsTrigger } from '../components/Slide-bar/Tabes'

function Budgets() {
    return (
        <TabsTrigger
            value="budgets"
            className="data-[state=active]:bg-[#6366f1] data-[state=active]:text-white text-gray-200"
        >
            Budgets
        </TabsTrigger>
    )
}

export default Budgets
