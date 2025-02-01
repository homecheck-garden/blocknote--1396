"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronDown, Filter, RefreshCw, X, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import type { filterOption } from './types'


export default function EnhancedFilterButton() {
const [filters , setFilters ] = useState<filterOption[]>( [
    { id: "status", label: "Status", color: "bg-red-100 text-red-800 hover:bg-red-200" },
    { id: "priority", label: "Priority", color: "bg-blue-100 text-blue-800 hover:bg-blue-200" },
    { id: "tags", label: "Tags", color: "bg-green-100 text-green-800 hover:bg-green-200" },
    { id: "assignee", label: "Assignee", color: "bg-purple-100 text-purple-800 hover:bg-purple-200" },
  ])
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isAddingNewTag, setIsAddingNewTag] = useState(false)
  const [newTagName, setNewTagName] = useState("")
  const newTagInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    selectAllFilters()
  }, [])

  const toggleFilter = (filterId: string) => {
    setSelectedFilters((prev) => (prev.includes(filterId) ? prev.filter((id) => id !== filterId) : [...prev, filterId]))
  }

  const selectAllFilters = () => {
    setSelectedFilters(filters.map((option) => option.id))
  }

  const handleXClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    selectAllFilters()
    console.log('handleXClick')
  }

  const addNewTag = () => {
    if (newTagName.trim()) {
      const baseName = newTagName.toLowerCase().replace(/\s+/g, "-")
      
      // 동일한 이름의 태그 개수 확인
      const existingTags = filters.filter(tag => 
        tag.id === baseName || tag.id.startsWith(`${baseName}-`)
      ).length

      // 새 태그 ID 생성 (중복 시 번호 추가)
      const newTagId = existingTags > 0 ? `${baseName}-${existingTags}` : baseName
      
      const newTag = {
        id: newTagId,
        label: existingTags > 0 ? `${newTagName} ${existingTags}` : newTagName,
        color: `bg-yellow-100 text-yellow-800 hover:bg-yellow-200`,
      }
      
      setFilters((prev) => [...prev, newTag])
      setSelectedFilters((prev) => [...prev, newTag.id])
      setNewTagName("")
      setIsAddingNewTag(false)
    } else {
      setIsAddingNewTag(false)
    }
  }

  const deleteTag = (tagId: string) => {
    //setFilterOptions((prev) => prev.filter((option) => option.id !== tagId))
    setSelectedFilters((prev) => prev.filter((id) => id !== tagId))
    setFilters((prev) => prev.filter((option) => option.id !== tagId))
  }


  const getButtonText = () => {
    if (selectedFilters.length === 0) return "선택되지 않음"
    if (selectedFilters.length === filters.length) return "필터"
    if (selectedFilters.length === 1) {
      return filters.find((option) => option.id === selectedFilters[0])?.label
    }
    return `${selectedFilters.length}개 선택됨`
  }

  const isAllSelected = selectedFilters.length === filters.length
  const isPartiallySelected = selectedFilters.length > 0 && selectedFilters.length < filters.length
  const isNoneSelected = selectedFilters.length === 0

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`h-8 ${
            isPartiallySelected || isNoneSelected
              ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground/90"
              : " hover:bg-accent hover:text-accent-foreground"
          }`}
        >
          {!isPartiallySelected && !isNoneSelected && <Filter className="h-4 w-4" />}
          {getButtonText()}
          {isPartiallySelected ? (
            <div className="ml-2 h-4 w-4 cursor-pointer"  onClick={handleXClick} >
                <X/>
            </div>
          ) : (
            <ChevronDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-0" align="start">
        <div className="p-2">
          {filters.map((option) => (
            <div key={option.id} className="flex items-center space-x-2 py-1">
                <div className="flex items-center space-x-2 flex-1">
                <Checkbox
                    id={option.id}
                    checked={selectedFilters.includes(option.id)}
                    onCheckedChange={() => toggleFilter(option.id)}
                />
                <label
                    htmlFor={option.id}
                    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 px-2 py-1 rounded cursor-pointer transition-colors ${option.color}`}
                >
                    {option.label}
                </label>
              </div>

                <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => deleteTag(option.id)}>
                  <X className="h-4 w-4" />
                </Button>
            </div>
          ))}


        {isAddingNewTag ? (
            <div className="flex items-center space-x-2 py-1">
              <Input
                ref={newTagInputRef}
                type="text"
                placeholder="새 태그 이름"
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                onBlur={addNewTag}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    addNewTag()
                  }
                }}
                className="flex-grow text-sm"
              />
            </div>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start px-2 py-1 mt-1"
              onClick={() => setIsAddingNewTag(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              새 태그 추가
            </Button>
          )}
        </div>
        <Separator />
        <div className="p-2 flex justify-end">
          <Button variant="ghost" size="sm" onClick={selectAllFilters}>
            <RefreshCw className="mr-2 h-4 w-4" />
            초기화
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

