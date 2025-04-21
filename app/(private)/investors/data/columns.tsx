// import InvestorSheet from "@/components/InvestorSheet"
import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"
import { ExternalLink } from "lucide-react"
import Link from "next/link"

const formatCellValue = (value: any) => (value === null || value === "" ? "-" : value)

export const columns: ColumnDef<any>[] = [
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
          src={
            row.getValue("logo") !== null && row.getValue("logo") !== ""
              ? row.getValue("logo")
              : "/images/no-logo.png"
          }
          className="h-full object-contain"
        />
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: () => <div className="text-left min-w-[110px]">Firm Name</div>,
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
  {
    accessorKey: "website",
    header: () => <div className="text-left">Website</div>,
    cell: ({ row }) => {
      return (
        <Link
          href={row.original.website !== null ? row.original.website : "/"}
          target="_blank"
          className="hover:underline hover:text-primary transition-all inline-flex gap-1 items-center w-[100px] overflow-hidden"
        >
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
    accessorKey: "companies",
    header: () => <div className="text-left min-w-[260px]">Portpolio companies</div>,
    cell: ({ row }) => {
      const companies = row.getValue("companies") as any[]
      return (
        <div className="inline-flex gap-1.5 w-[260px] overflow-auto no-scrollbar">
          {companies.length === 0 && "-"}
          {companies.map((company, index) => {
            return (
              <span
                key={index}
                className="inline-block cursor-pointer bg-[#F3F5FF] mb-auto text-nowrap text-xs rounded-md border border-gray-200 px-1 py-0.5"
              >
                {company.name}
              </span>
            )
          })}
        </div>
      )
    },
  },
  {
    accessorKey: "investment_focus",
    header: () => <div className="text-left min-w-[150px]">Investment Strategy</div>,
    cell: ({ row }) => {
      // @ts-ignore
      const arrayList = row.original.investment_focus
      return (
        <div className="inline-flex gap-1.5 w-[260px] overflow-auto no-scrollbar">
          {arrayList.length === 0 && "-"}
          {arrayList.map((item: string, index: number) => {
            return (
              <span
                key={index}
                className="inline-block bg-[#F3F5FF] mb-auto text-nowrap text-xs rounded-md border border-gray-200 px-1 py-0.5"
              >
                {item}
              </span>
            )
          })}
        </div>
      )
    },
  },
  {
    accessorKey: "investment_regions",
    header: () => <div className="text-left min-w-[100px] whitespace-nowrap">Region</div>,
    cell: ({ row }) => {
      // @ts-ignore
      const arrayList = row.original.investment_regions
      return (
        <div className="inline-flex gap-1.5 min-w-[100px] overflow-auto no-scrollbar">
          {arrayList.length === 0 && "-"}
          {arrayList.map((item: string, index: number) => {
            return (
              <span
                key={index}
                className="inline-block bg-[#F3F5FF] mb-auto text-nowrap text-xs rounded-md border border-gray-200 px-1 py-0.5"
              >
                {item}
              </span>
            )
          })}
        </div>
      )
    },
  },

  {
    accessorKey: "investment_countries",
    header: () => <div className="text-left min-w-[100px]">Countries</div>,
    cell: ({ row }) => {
      // @ts-ignore
      if (
        row.original.investment_countries === undefined ||
        row.original.investment_countries.length === 0
      ) {
        return "-"
      }
      const arrayList = row.original.investment_countries

      return (
        <div className="inline-flex min-w-[100px] gap-1.5 overflow-auto no-scrollbar">
          {arrayList.length === 0 && "-"}
          {arrayList.map((item: string, index: number) => {
            return (
              <span
                key={index}
                className="inline-block bg-[#F3F5FF] mb-auto text-nowrap text-xs rounded-md border border-gray-200 px-1 py-0.5"
              >
                {item}
              </span>
            )
          })}
        </div>
      )
    },
  },
  {
    accessorKey: "pe_investment_strategy",
    header: () => (
      <div className="text-left min-w-[100px] whitespace-nowrap">PE Investment Strategy</div>
    ),
    cell: ({ row }) => {
      // @ts-ignore
      const arrayList = row.original.pe_investment_strategy
      return (
        <div className="inline-flex gap-1.5 w-[260px] overflow-auto no-scrollbar">
          {arrayList.length === 0 && "-"}
          {arrayList.map((item: string, index: number) => {
            return (
              <span
                key={index}
                className="inline-block bg-[#F3F5FF] mb-auto text-nowrap text-xs rounded-md border border-gray-200 px-1 py-0.5"
              >
                {item}
              </span>
            )
          })}
        </div>
      )
    },
  },
  {
    accessorKey: "pe_industry_focus",
    header: () => (
      <div className="text-left min-w-[100px] whitespace-nowrap">PE Industry Focus</div>
    ),
    cell: ({ row }) => {
      // @ts-ignore
      const arrayList = row.original.pe_industry_focus
      return (
        <div className="inline-flex gap-1.5 w-[260px] overflow-auto no-scrollbar">
          {arrayList.length === 0 && "-"}
          {arrayList.map((item: string, index: number) => {
            return (
              <span
                key={index}
                className="inline-block bg-[#F3F5FF] mb-auto text-nowrap text-xs rounded-md border border-gray-200 px-1 py-0.5"
              >
                {item}
              </span>
            )
          })}
        </div>
      )
    },
  },
  {
    accessorKey: "vc_technology_themes",
    header: () => <div className="text-left min-w-[100px] whitespace-nowrap">VC Technology</div>,
    cell: ({ row }) => {
      // @ts-ignore
      const arrayList = row.original.vc_technology_themes
      return (
        <div className="inline-flex gap-1.5 w-[260px] overflow-auto no-scrollbar">
          {arrayList.length === 0 && "-"}
          {arrayList.map((item: string, index: number) => {
            return (
              <span
                key={index}
                className="inline-block bg-[#F3F5FF] mb-auto text-nowrap text-xs rounded-md border border-gray-200 px-1 py-0.5"
              >
                {item}
              </span>
            )
          })}
        </div>
      )
    },
  },
  {
    accessorKey: "re_sub_focus",
    header: () => <div className="text-left min-w-[100px] whitespace-nowrap">RE Sub Focus</div>,
    cell: ({ row }) => {
      // @ts-ignore
      const arrayList = row.original.re_sub_focus
      return (
        <div className="inline-flex gap-1.5 w-[260px] overflow-auto no-scrollbar">
          {arrayList.length === 0 && "-"}
          {arrayList.map((item: string, index: number) => {
            return (
              <span
                key={index}
                className="inline-block bg-[#F3F5FF] mb-auto text-nowrap text-xs rounded-md border border-gray-200 px-1 py-0.5"
              >
                {item}
              </span>
            )
          })}
        </div>
      )
    },
  },
  {
    accessorKey: "investor_type",
    header: () => <div className="text-left min-w-[100px]">Investor Type</div>,
    cell: ({ row }) => (
      <div>{row.original.investor_type !== null || "" ? row.original.investor_type : "-"}</div>
    ),
  },
  {
    accessorKey: "min_deal_size_meur",
    header: () => (
      <div className="text-left min-w-[110px] whitespace-nowrap">
        Min Deal Size <span className="text-[10px]">(mEUR)</span>
      </div>
    ),
    cell: ({ row }) => (
      <div>
        {row.original.min_deal_size_meur !== null || "" ? row.original.min_deal_size_meur : "-"}
      </div>
    ),
  },
  {
    accessorKey: "max_deal_size_meur",
    header: () => (
      <div className="text-left min-w-[110px] whitespace-nowrap">
        Max Deal Size <span className="text-[10px]">(mEUR)</span>
      </div>
    ),
    cell: ({ row }) => (
      <div>
        {row.original.max_deal_size_meur !== null || "" ? row.original.max_deal_size_meur : "-"}
      </div>
    ),
  },
  {
    accessorKey: "min_ebitda_meur",
    header: () => (
      <div className="text-left min-w-[110px] whitespace-nowrap">
        Min EBITDA <span className="text-[10px]">(mEUR)</span>
      </div>
    ),
    cell: ({ row }) => (
      <div>{row.original.min_ebitda_meur !== null || "" ? row.original.min_ebitda_meur : "-"}</div>
    ),
  },
  {
    accessorKey: "max_ebitda_meur",
    header: () => (
      <div className="text-left min-w-[110px] whitespace-nowrap">
        Max EBITDA <span className="text-[10px] ">(mEUR)</span>
      </div>
    ),
    cell: ({ row }) => (
      <div>{row.original.max_ebitda_meur !== null || "" ? row.original.max_ebitda_meur : "-"}</div>
    ),
  },
  {
    accessorKey: "min_ticket_meur",
    header: () => (
      <div className="text-left min-w-[110px]">
        Min Ticket <span className="text-[10px]">(mEUR)</span>
      </div>
    ),
    cell: ({ row }) => (
      <div>{row.original.min_ticket_meur !== null || "" ? row.original.min_ticket_meur : "-"}</div>
    ),
  },
  {
    accessorKey: "max_ticket_meur",
    header: () => (
      <div className="text-left min-w-[110px]">
        Max Ticket <span className="text-[10px]">(mEUR)</span>
      </div>
    ),
    cell: ({ row }) => (
      <div>{row.original.max_ticket_meur !== null || "" ? row.original.max_ticket_meur : "-"}</div>
    ),
  },
  {
    accessorKey: "hq_country",
    header: () => <div className="text-left min-w-[100px]">HQ Country</div>,
    cell: ({ row }) => (
      <div>{row.original.hq_country !== null || "" ? row.original.hq_country : "-"}</div>
    ),
  },
  {
    accessorKey: "hq_city",
    header: () => <div className="text-left min-w-[100px]">HQ City</div>,
    cell: ({ row }) => (
      <div>{row.original.hq_city !== null || "" ? row.original.hq_city : "-"}</div>
    ),
  },
  {
    accessorKey: "hq_zip",
    header: () => <div className="text-left min-w-[100px]">HQ Zip</div>,
    cell: ({ row }) => <div>{row.original.hq_zip !== null || "" ? row.original.hq_zip : "-"}</div>,
  },
  {
    accessorKey: "hq_address",
    header: () => <div className="text-left min-w-[160px]">HQ Address</div>,
    cell: ({ row }) => (
      <div>{row.original.hq_address !== null || "" ? row.original.hq_address : "-"}</div>
    ),
  },
  {
    accessorKey: "address",
    header: () => <div className="text-left min-w-[160px]">Address</div>,
    cell: ({ row }) => (
      <div>{row.original.address !== null || "" ? row.original.address : "-"}</div>
    ),
  },
  {
    accessorKey: "email",
    header: () => <div className="text-left min-w-[100px]">Email</div>,
    cell: ({ row }) => <div>{row.original.email !== null || "" ? row.original.email : "-"}</div>,
  },
  {
    accessorKey: "telephone",
    header: () => <div className="text-left min-w-[100px] whitespace-nowrap">Telephone</div>,
    cell: ({ row }) => (
      <div className="whitespace-nowrap">
        {row.original.telephone !== null || "" ? row.original.telephone : "-"}
      </div>
    ),
  },
]
