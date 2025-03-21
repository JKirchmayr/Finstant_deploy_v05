import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"
import { ExternalLink } from "lucide-react"
import Link from "next/link"

export const column: ColumnDef<IInvestor>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "logo",
    header: "Logo",
    cell: ({ row }) => (
      <div className="w-[70px] h-[40px] flex items-center justify-center overflow-hidden rounded-md">
        {/* <img
          src={row.getValue("logo") !== null ? row.getValue("logo") : "/images/no-logo.png"}
          alt="logo"
          className="h-full object-contain"
        /> */}
        <div className="w-full h-full bg-gray-100"></div>
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: () => <div className="text-left min-w-[110px]">Firm Name</div>,
  },
  
  {
    accessorKey: "website",
    header: () => <div className="text-left">Website</div>,
    cell: ({ row }) => {
      return (
        <Link
          href={row.original.website !== null ? row.original.website : "/"}
          className="hover:underline hover:text-primary transition-all inline-flex gap-1 items-center w-[100px] overflow-hidden"
        >
          {row.original.website === null && "-"}
          {row.original.website !== null && (
            <div className="size-3">
              <ExternalLink size={12} className="size-3" />
            </div>
          )}
          <p className="truncate">{row.getValue("website")}</p>
        </Link>
      )
    },
  },
  {
    accessorKey: "status",
    header: () => <div className="text-left min-w-[100px]">Status</div>,
    cell: ({ row }) => <div>{row.original.type !== null || "" ? row.original.type : "-"}</div>,
  },
  {
    accessorKey: "description",
    header: () => <div className="text-left overflow-hidden w-[300px]">Description</div>,
    cell: ({ row }) => {
      return (
        <p className="w-full text-ellipsisoverflow-hidden text-ellipsis line-clamp-2">
          {row.getValue("description")}
        </p>
      )
    },
  },

]
