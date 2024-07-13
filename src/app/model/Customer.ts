import { Transaction } from "./Transaction";

export interface Customer {
    id: number;
    name: string;
    transactions?: Transaction[];
}