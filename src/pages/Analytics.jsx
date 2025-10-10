import React from 'react'
import { TabsTrigger } from '../components/Slide-bar/Tabes'

function Analytics() {
    return (
        
        <TabsTrigger
            value="analytics"
            className="data-[state=active]:bg-[#6366f1] data-[state=active]:text-white text-gray-200"
        >
            Analytics
        </TabsTrigger>
    )
}

export default Analytics
