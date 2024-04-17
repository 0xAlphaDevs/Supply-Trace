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
import { combinedTransactions } from "@/constants/transactions";
import { PastTransactions, Transaction } from "@/lib/types";

enum TransactionType {
    Buy = "Buy",
    Sell = "Sell",
}

interface FinalTransaction extends Transaction {
    type: TransactionType;
    counterParty: string;
}


export function PastTransactionsTable() {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    // Make buy and sell transactions distinct and finally combine them
    const buyTransactions = combinedTransactions.buyTransactions.map((transaction) => ({
        ...transaction,
        type: TransactionType.Buy,
        counterParty: transaction.from,
    }));

    const sellTransactions = combinedTransactions.sellTransactions.map((transaction) => ({
        ...transaction,
        type: TransactionType.Sell,
        counterParty: transaction.to,
    }));

    const finalTransactions: FinalTransaction[] = [...buyTransactions, ...sellTransactions]

    const columns: ColumnDef<FinalTransaction>[] = [
        {
            accessorKey: "attestationId",
            header: "Attestation Id",
            cell: ({ row }) => {
                const attestationId = parseInt(row.getValue("attestationId"));
                return <div className="capitalize">{attestationId}</div>;
            },
        },
        {
            accessorKey: "type",
            header: "Transaction Type",
            cell: ({ row }) => <div className="">{row.getValue("type")}</div>,
        },
        {
            accessorKey: "timestamp",
            header: "Date",
            cell: ({ row }) => {
                const date = new Date(row.getValue("timestamp"));
                const dayMonthYear = date.toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                });
                const time = date.toLocaleTimeString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                });
                return (
                    <div className="flex flex-col">
                        <div>{dayMonthYear}</div>
                        <div>{time}</div>
                    </div>
                );
            }

        },
        {
            accessorKey: "counterParty",
            header: "Counter Party",
            cell: ({ row }) => (
                <div className="lowercase">{row.getValue("counterParty")}</div>
            ),
        },
        {
            accessorKey: "transactionValue",
            header: () => <div className="">Transaction Value</div>,
            cell: ({ row }) => {
                const amount = parseFloat(row.getValue("transactionValue"));
                const formatted = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                }).format(amount);

                return <div className=" font-medium">{formatted} </div>;
            },
        },
    ];


    const table = useReactTable({
        data: finalTransactions,
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
                    value={(table.getColumn("attestationId")?.getFilterValue() as string) ?? ""}
                    onChange={(event) => table.getColumn("attestationId")?.setFilterValue(event.target.value)}
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
