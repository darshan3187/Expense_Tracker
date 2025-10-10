import React from 'react'
import { TabsList, TabsTrigger, Tabs } from './Tabes'
import Expense from '../../pages/Expense'
import Analytics from '../../pages/Analytics'
import Budgets from '../../pages/Budgets'

function SlideBar() {
  return (
    <Tabs defaultValue="expenses" className="mt-4 space-y-6">
      <TabsList className="grid w-full grid-cols-3 max-w-md bg-[#1a1a1a] border border-[#2a2a2a]">
        <Expense />
        <Analytics />
        <Budgets />
      </TabsList>
    </Tabs>
  )
}

export default SlideBar
