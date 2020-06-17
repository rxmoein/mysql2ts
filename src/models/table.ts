import { initialCreateValidationString, constructorComments, createMethodComments, toOriginalMethodComment } from './values';
import { upperFirst, formatName } from '../core/utils';
import { Configuration } from './config';
import { Column } from './column';

export class Table {
    name: string;
    columns: Column[];

    constructor(name: string, columns: Column[]) {
        this.name = name;
        this.columns = columns;
    }

    getClassDefinitionString(config: Configuration): string {
        this.columns.sort((a, b) => {
            return a.name.length - b.name.length;
        });

        const output: string[] = [];

        if (config.Mode === 'advanced') {
            output.push(this.getImports());
        }

        output.push(`export class ${upperFirst(this.name)} {`);

        for (const column of this.columns) {
            output.push(column.getFieldDefinition(config));
        }

        output.push('');
        output.push(this.getConstructor(config));

        output.push('');
        if (config.Mode === 'advanced') {
            output.push(this.getCreateMethod());
            output.push(this.getToOriginalMethod(config));
        }

        output.push(`}`);

        return output.join('\n');
    }

    private getConstructor(config: Configuration, indent = 1): string {
        const output: string[] = [];

        output.push(constructorComments);

        if (config.Mode === 'basic') {
            output.push(' '.repeat(indent * 4) + `constructor(obj: any) {`);
        } else {
            output.push(' '.repeat(indent * 4) + `private constructor(obj: any) {`);
        }

        for (const column of this.columns) {
            output.push(' '.repeat((indent + 1) * 4) + `this.${formatName(config, column.name)} = obj.${column.name};`);
        }
        output.push(' '.repeat(indent * 4) + `}`);
        return output.join('\n');
    }

    private getCreateMethod(indent = 1): string {
        const output = [];

        output.push(createMethodComments);
        output.push(' '.repeat(indent * 4) + `public static Create(obj: any, field: string = 'root'): ${upperFirst(this.name)} {`);
        output.push(initialCreateValidationString);
        output.push('');

        for (const column of this.columns) {
            output.push(' '.repeat((indent + 1) * 4) + `check${upperFirst(column.type)}(obj.${column.name}, ${column.nullable}, field + '.${column.name}');`);
        }

        output.push('');
        output.push(' '.repeat((indent + 1) * 4) + `return new ${upperFirst(this.name)}(obj);`);
        output.push(' '.repeat(indent * 4) + '}');

        return output.join('\n');
    }

    private getToOriginalMethod(config: Configuration, indent = 1): string {
        const output = [];

        output.push('');
        output.push(toOriginalMethodComment);
        output.push(' '.repeat(indent * 4) + `public originalObject(json: boolean = false): any {`);
        output.push(' '.repeat((indent + 1) * 4) + 'const output: any = {};')
        output.push('');

        for (const col of this.columns) {
            output.push(' '.repeat((indent + 1) * 4) + `output.${col.name} = this.${formatName(config, col.name)};`);
        }

        output.push('');
        output.push(' '.repeat((indent + 1) * 4) + 'if (json) {')
        output.push(' '.repeat((indent + 2) * 4) + 'return JSON.stringify(output);')
        output.push(' '.repeat((indent + 1) * 4) + '} else {')
        output.push(' '.repeat((indent + 2) * 4) + 'return output;')
        output.push(' '.repeat((indent + 1) * 4) + '}')
        output.push(' '.repeat(indent * 4) + `}`);

        return output.join('\n');
    }

    private getImports() {
        const output = [];
        let imports = ['throwNull2NonNull', 'throwNotObject', 'throwIsArray'];
        for (const column of this.columns) {
            imports.push(`check${upperFirst(column.type)}`);
        }
        imports = imports.filter((v, i) => imports.indexOf(v) === i);
        output.push(`import { ${imports.join(', ')}} from './needed-utils';`);
        output.push('');
        return output.join('\n');
    }
}