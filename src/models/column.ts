export class Column {
    name: string;
    type: string;
    nullable: boolean;

    constructor(
        name: string,
        type: string,
        nullable: boolean,
    ) {
        this.name = name;
        this.type = type;
        this.nullable = nullable;
    }

    getFieldDefinition(indent = 1) {
        return ' '.repeat(indent * 4) + `public ${this.name}: ${this.type};`;
    }
}