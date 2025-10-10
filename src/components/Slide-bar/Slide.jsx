import React from 'react'
import { TabsTrigger } from '../Slide-bar/Tabes'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Slide() {
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()

    const slideItems = [
        // NOTE: The name 'Expense' is used in your code, but 'Expenses' is visible in the image.
        // I'll keep 'Expense' for code consistency but use the image style.
        {
            name: 'Expense',
            slug: '/',
            active: true // Assuming 'Expense' is always visible
        },
        {
            name: 'Analytics',
            slug: '/analytics',
            active: !authStatus
        },
        {
            name: 'Budgets',
            slug: '/budgets',
            active: !authStatus
        }
    ]

    return (
        // Key changes: 
        <div className='flex rounded-xl'>
            {slideItems.map((item) =>
                item.active ?
                    (
                        <TabsTrigger
                            key={item.name}
                            value={item.name}
                            // Styling for active state and general appearance:
                            className="data-[state=active]:bg-[#6366f1] data-[state=active]:text-white 
                                text-gray-200 
                                rounded-lg sm:px-4 px-3 lg:px-6
                                sm:m-4 m-2 lg:m-2
                                font-medium whitespace-nowrap 
                                transition-colors duration-200"
                            onClick={() => navigate(item.slug)}
                        >
                            {item.name}
                        </TabsTrigger>
                    ) : null
            )}
        </div>
    )
}

export default Slide