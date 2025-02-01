"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { ArrowLeft } from "lucide-react"
import { Panel } from "@xyflow/react"
import FilterButton from "@/components/element/filter-button/enhanced"
import IconButton from "@/components/element/icon-button"

interface HeaderProps {
  initialTitle: string
  onTitleChange?: (newTitle: string) => void
}

export function ReactFlowHeaderControls({ initialTitle, onTitleChange }: HeaderProps) {
  const [title, setTitle] = useState(initialTitle)

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value
    setTitle(newTitle)
    if (typeof onTitleChange === "function") {
      onTitleChange(newTitle)
    }
  }



  return (
    <Panel className="!m-0" position="top-center">
        <header className={`react-flow__header-controls flex items-center justify-between px-4 py-1 bg-background w-screen max-w-screen transition-all duration-300 border`}>
            <Link href="/" passHref>
                <IconButton icon={<ArrowLeft className="h-4 w-4" />} onClick={()=>{}}/>
            </Link>
            <div className="flex items-center space-x-2 flex-grow">
                <Input
                value={title}
                onChange={handleTitleChange}
                className={`max-w-xs border-transparent  bg-transparent focus-visible:outline-none !focus:ring-0 !focus:ring-offset-0`}
                placeholder="캔버스 이름을 설정해주세요."
                aria-label="Canvas title"
                />
            </div>
            <FilterButton/>
        </header>
    </Panel>
  )
}

