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
}