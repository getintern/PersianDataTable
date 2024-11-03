import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useState } from 'react';
import { Input } from '../ui/input';
import DateFilter from './dateFiltets/DateFilter';
import dateBetweenFilterFn from './isWithInRange';
import { DataTablePagination } from './pagination-table';
import { DataTableViewOptions } from './viewoption-table';

export function DataTable({ columns, data }) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    // sorting
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),

    // filtering
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,

    // visibility
    onColumnVisibilityChange: setColumnVisibility,

    // date between filters
    filterFns: {
      dateBetweenFilterFn: dateBetweenFilterFn,
    },

    //
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
  });

  const findDateHandler = () => {
    let targetHeader;
    table.getHeaderGroups().forEach((headerGroup) => {
      headerGroup.headers.map((header) => {
        console.log(header)
        if (header.id === 'createdDate') {
          targetHeader = <DateFilter column={header.column} />;
        }
      });
    });
    return targetHeader;
  };

  const handleSearchInput = (e) => {
    const inputValue = e.target.value;
    setGlobalFilter(inputValue); // You can decide how to handle invalid input
  };

  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full items-center justify-between">
        <div>{findDateHandler()}</div>
        <div className="flex items-center gap-3">
          {/* searching */}
          <div className="flex items-center py-4">
            <Input
              type="text"
              placeholder="جستجو..."
              value={globalFilter || ''}
              onChange={handleSearchInput} // Update search input
            />
          </div>
          {/* visibility */}
          <DataTableViewOptions table={table} />
        </div>
      </div>
      <div className="rounded-md border">
        <div className="relative overflow-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <>
                    <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                      ))}
                    </TableRow>
                  </>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    دیتای برای نمایش وجود ندارد.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
