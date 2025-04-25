import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"

export function normalizeKey(label: string) {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/gi, "_")
    .replace(/^_|_$/g, "")
}

// Generic row type: each row is a Record of string keys and any values
export function responseToColumns() {
  const baseColumns: ColumnDef<Record<string, any>>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="mx-auto border-gray-400"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="mr-4  border-gray-400"
        />
      ),
      enableSorting: false,
      enableHiding: false,

      size: 108,
    },
    {
      accessorKey: "company_name",
      header: "Company name",
      enableColumnFilter: true,
      cell: ({ row }) => {
        const value = row.original.company_name
        return value ?? "-"
      },
    },
    {
      accessorKey: "description",
      header: "Description",
      enableColumnFilter: true,
      cell: ({ row }) => {
        const value = row.original.description
        return value ?? "-"
      },
    },
  ]

  return [...baseColumns]
}
