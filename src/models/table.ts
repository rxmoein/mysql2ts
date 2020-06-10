import { Column } from "./column";

export class Table {
    name: string;
    columns: Column[];

    constructor(name: string, columns: Column[]) {
        this.name = name;
        this.columns = columns;
    }
}