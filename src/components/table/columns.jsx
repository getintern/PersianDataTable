import { LuMoreHorizontal } from '@/components/icons/index';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { DataTableColumnHeader } from './DataTableColumnHeader';

const paymentCol = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'createdDate',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="تاریخ" />;
    },
    cell: ({ row }) => {
      // Convert the string to a Date object
      const date = new Date(row.getValue('createdDate'));
      let text = date.toLocaleDateString('fa-IR');

      return <div className="capitalize">{text}</div>;
    },
    filterFn: 'dateBetweenFilterFn',
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="ایمیل" />;
    },
  },
  {
    accessorKey: 'price',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="مبلغ" />;
    },
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">
          <span>{row?.original.price?.toLocaleString('fa-IR')}</span>
          <span className="mr-1 text-xs text-gray-400">ریال</span>
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: () => {
      return <span className="text-xs">عملیات</span>;
    },
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu dir="right">
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <LuMoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>Copy payment ID</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export { paymentCol };

