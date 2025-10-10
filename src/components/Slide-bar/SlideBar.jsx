import React from 'react'
import { TabsList, TabsTrigger, Tabs } from './Tabes'
import Slide from './Slide'

function SlideBar() {
  return (
    <Tabs defaultValue="expenses" className="mt-4 space-y-6">
      <TabsList className="grid w-10 grid-cols-3 max-w-md bg-[#1a1a1a] border border-[#2a2a2a]">
        <Slide /> 
      </TabsList>
    </Tabs>
  )
}

export default SlideBar
