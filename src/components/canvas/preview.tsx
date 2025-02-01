import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

import {  useGetSelectedFields} from '@/functions/firebase'
import type { Canvas } from '../../types/canvas'
import { useEffect, useState } from "react"

interface CanvasCardProps {
  id: string
  onClick: (id: string) => void
}

export function CanvasCard({ id, onClick }: CanvasCardProps) {

  const [loading, setLoading ]= useState<boolean>(true)
  const [name, setName ] = useState<string>('')
  const [lastModified, setLastModified ] = useState<Date>(new Date())
  const [thumbnail, setThumbnail ] = useState<string>('')

  useEffect(() => {
    
    const realtimeDatabaseKeyValueFunction = useGetSelectedFields();

    async function fetchPreviewItem() {

      const previewItemProperties = await realtimeDatabaseKeyValueFunction.getSelectedFields<Canvas>(`/canvas/${id}`, ["name"])

      if(!previewItemProperties) {
        return;
      }

      setName(previewItemProperties.name)
      setLastModified(new Date(previewItemProperties.lastModified))
      setThumbnail(previewItemProperties.thumbnail)
      setLoading(false)
    }

    fetchPreviewItem();
    

  }, [id ]);

  return (
    loading ? <Card className="overflow-hidden">
    <Skeleton className="w-full h-0 pb-[60%]" />
    <div className="p-3">
      <Skeleton className="h-5 w-3/4 mb-2" />
      <Skeleton className="h-4 w-1/2" />
    </div>
    </Card> :
    <Card
      className="cursor-pointer hover:bg-[#EBEAE8] transition-colors border-none shadow-none overflow-hidden group"
      onClick={() => onClick(id)}
    >
      <div className="relative w-full pt-[60%] bg-white overflow-hidden group-hover:opacity-90 transition-opacity">
        <Image
          src={ thumbnail ?? '/placeholder.svg?height=200&width=200' }
          alt={"canvas_preview"}
          layout="fill"
          objectFit="cover"
          className="absolute top-0 left-0"
        />
      </div>
      <div className="p-3">
        <p className="font-medium text-left text-sm truncate">{name}</p>
        <p className="text-xs text-[#787774] mt-1">
          마지막으로 수정한 날짜 {lastModified.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}
         </p>
      </div>
    </Card>
  )
}


