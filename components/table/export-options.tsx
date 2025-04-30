import React from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { MoreHorizontal } from "lucide-react"

type ExportOptionsProps = {
  children?: React.ReactNode
  data: any[]
  onExport: (arg0: "csv" | "excel") => void
}
export function ExportOptions({
  data,
  onExport,
  children,
}: ExportOptionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children ?? (
          <Button size="sm">
            <MoreHorizontal />
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="text-xs font-medium cursor-pointer"
            onClick={() => onExport("csv")}>
            Export CSV
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-xs font-medium cursor-pointer"
            onClick={() => onExport("excel")}>
            Export Excel
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
