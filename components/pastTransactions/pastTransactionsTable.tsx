"use client"

import * as React from "react";
import {
    CaretSortIcon,
    ChevronDownIcon,
    DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { transactions, Transaction } from "@/constants/transactions";


export function PastTransactionsTable() {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    const columns: ColumnDef<Transaction>[] = [
        {
            accessorKey: "proposalId",
            header: " Id",
            cell: ({ row }) => {
                const proposalId = parseInt(row.getValue("proposalId"));
                return <div className="capitalize">{proposalId}</div>;
            },
        },
        {
            accessorKey: "description",
            header: "Item Name",
            cell: ({ row }) => <div className="">{row.getValue("description")}</div>,
        },
        {
            accessorKey: "createdAt",
            header: "Sell Date",
            cell: ({ row }) => (
                <div className=" font-semibold px-2 bg-orange-50 hover:text-white hover:bg-orange-900 inline-block rounded-full ">
                    {row.getValue("createdAt")}
                </div>
            ),
        },
        {
            accessorKey: "createdBy",
            header: "Buyer",
            cell: ({ row }) => (
                <div className="lowercase">{row.getValue("createdBy")}</div>
            ),
        },
        {
            accessorKey: "bid",
            header: () => <div className="">Price</div>,
            cell: ({ row }) => {
                const amount = parseFloat(row.getValue("bid")) / 10 ** 18;
                const formatted = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                }).format(amount);

                return <div className=" font-medium">{formatted} GHO</div>;
            },
        },
    ];

    const table = useReactTable({
        data: transactions,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    return (
        <div className="w-full p-12 ">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Search a transaction by Id..."
                    value={(table.getColumn("proposalId")?.getFilterValue() as string) ?? ""}
                    onChange={(event) => table.getColumn("proposalId")?.setFilterValue(event.target.value)}
                    className="max-w-sm w-96 font-semibold border-orange-900 "
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto bg-orange-300  ">
                            Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table.getAllColumns().filter((column) => column.getCanHide()).map((column) => (
                            <DropdownMenuCheckboxItem
                                key={column.id}
                                className="capitalize"
                                checked={column.getIsVisible()}
                                onCheckedChange={(value) => column.toggleVisibility(!!value)}
                            >
                                {column.id}
                            </DropdownMenuCheckboxItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border z-10 shadow-md bg-orange-400 bg-opacity-20 my-4 z-80  ">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="">
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id} className="font-bold text-center ">
                                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} className="font-thin hover:text-orange-800 dark:hover:bg-purple-300/10 dark:hover:text-purple-50">
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="text-center">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
