import React from "react"
import DataTable from "@/components/chat/data-table"
import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowRightToLine, ExternalLink } from "lucide-react"
import Link from "next/link"
import { useCoPilotStore } from "@/store/copilotStore"
import { responseToColumns } from "@/lib/orchestrator/transformers/responseToColumns"
import { useChatLayoutStore } from "@/store/chatLayout"

const RenderData = () => {
  const { result } = useCoPilotStore()
  const { setLayout } = useChatLayoutStore()

  console.log("result: ", result)

  if (!result || !result) {
    return <div className="text-gray-400 p-4">No data yet.</div>
  }

  const columns = responseToColumns()
  const rows = result.companies.length ? result.companies : result?.investors

  return (
    <div className="bg-white overflow-hidden relative">
      <button
        onClick={() => setLayout("chat")}
        className="p-1 border border-r border-t border-b hover:text-gray-800 text-gray-500 cursor-pointer border-gray-200 rounded-r-sm absolute -left-0 top-1"
      >
        <ArrowRightToLine size={16} />
      </button>
      <DataTable
        columns={columns}
        data={rows ? rows : []}
        isLoading={false}
        loadMoreData={() => console.log("")}
        hasMoreData
      />
    </div>
  )
}

interface ICompany {
  id: string
  name: string
  description: string
  current_investor: string | null
  status: string
  sector: string
  created_at: string // ISO 8601 date string
  website: string | null
  sales_in_eurm: number
  ebitda_in_eurm: number | null
  marge: number
  year_finacials: any | null
  entry_year: number | null
  logo: string | null
}

export const columns: ColumnDef<ICompany>[] = [
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
        <img
          src={row.getValue("logo") !== null ? row.getValue("logo") : "/images/no-logo.png"}
          alt="logo"
          className="h-full object-contain"
        />
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: () => <div className="text-left min-w-[110px]">Firm Name</div>,
    cell: ({ row }) => {
      return <p>{row.original.name}</p>
    },
  },
  {
    accessorKey: "description",
    header: () => (
      <div className="text-left overflow-hidden w-[300px]  line-clamp-2">Description</div>
    ),
    cell: ({ row }) => {
      return (
        <p className="w-full text-ellipsis overflow-hidden line-clamp-2">
          {row.getValue("description")}
        </p>
      )
    },
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
    cell: ({ row }) => <div>{row.original.status !== null || "" ? row.original.status : "-"}</div>,
  },
  {
    accessorKey: "sector",
    header: () => <div className="text-left min-w-[100px]">Sector</div>,
    cell: ({ row }) => <div>{row.original.sector !== null || "" ? row.original.sector : "-"}</div>,
  },

  {
    accessorKey: "sales_in_eurm",
    header: () => <div className="text-left min-w-[110px]">Sales in EURm</div>,
    cell: ({ row }) => (
      <div>{row.original.sales_in_eurm !== null || "" ? row.original.sales_in_eurm : "-"}</div>
    ),
  },
  {
    accessorKey: "ebitda_in_eurm",
    header: () => <div className="text-left min-w-[110px]">EBITDA in EURm</div>,
    cell: ({ row }) => (
      <div>{row.original.ebitda_in_eurm !== null || "" ? row.original.ebitda_in_eurm : "-"}</div>
    ),
  },
  {
    accessorKey: "marge",
    header: () => <div className="text-left min-w-[110px]">Marge</div>,
    cell: ({ row }) => <div>{row.original.marge !== null || "" ? row.original.marge : "-"}</div>,
  },
  {
    accessorKey: "min_ticket_meur",
    header: () => (
      <div className="text-left min-w-[110px]">
        Min Ticket <span className="text-[10px]">(mEUR)</span>
      </div>
    ),
    cell: ({ row }) => <div>-</div>,
  },
  {
    accessorKey: "year_finacials",
    header: () => <div className="text-left min-w-[110px]">Year Finacials</div>,
    cell: ({ row }) => (
      <div>{row.original.year_finacials !== null || "" ? row.original.year_finacials : "-"}</div>
    ),
  },
  {
    accessorKey: "entry_year",
    header: () => <div className="text-left min-w-[110px]">Entry Year</div>,
    cell: ({ row }) => (
      <div>{row.original.entry_year !== null || "" ? row.original.entry_year : "-"}</div>
    ),
  },
]

export default RenderData
