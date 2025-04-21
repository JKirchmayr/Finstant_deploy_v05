// import CompanySheet from "@/components/CompanySheet"
import CompanySheet from "@/components/CompanySheet"
import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"
import { ExternalLink } from "lucide-react"
import Link from "next/link"

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
        className="mr-4"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="mr-4"
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
      return <CompanySheet company={row.original}>{row.original.name}</CompanySheet>
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
    accessorKey: "sales_in_meur",
    header: () => <div className="text-left min-w-[110px]">Sales in EURm</div>,
    cell: ({ row }) => (
      <div>{row.original.sales_in_meur !== null || "" ? row.original.sales_in_meur : "-"}</div>
    ),
  },
  {
    accessorKey: "ebitda_in_meur",
    header: () => <div className="text-left min-w-[110px]">EBITDA in EURm</div>,
    cell: ({ row }) => (
      <div>{row.original.ebitda_in_meur !== null || "" ? row.original.ebitda_in_meur : "-"}</div>
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
    accessorKey: "hq_country",
    header: () => <div className="text-left min-w-[110px]">HQ Country</div>,
    cell: ({ row }) => (
      <div>{row.original.hq_country !== null || "" ? row.original.hq_country : "-"}</div>
    ),
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
