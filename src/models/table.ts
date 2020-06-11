import { Column } from './column';

export class Table {
    name: string;
    columns: Column[];

    constructor(name: string, columns: Column[]) {
        this.name = name;
        this.columns = columns;
    }

    getClassDefinitionString(): string {
        const output: string[] = [];

        output.push(`export class ${this.name} {`);
        for (const column of this.columns) {
            output.push(column.getFieldDefinition());
        }
        output.push(`}`);

        return output.join('\n');
    }
}