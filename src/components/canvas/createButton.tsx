import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface CreateCanvasProps {
  onClick: () => void
}

export function CreateCanvas({ onClick }: CreateCanvasProps) {
  return (
    <Button
      variant="outline"
      className="w-full h-full min-h-[200px] border-dashed border-2 border-[#D3D1CB] bg-white hover:bg-[#EBEAE8] hover:border-[#B3B3B3] transition-all flex flex-col items-center justify-center gap-2 text-[#37352F]"
      onClick={onClick}
    >
      <Plus className="w-8 h-8" />
      <span className="font-medium text-base">새 캔버스</span>
    </Button>
  )
}

