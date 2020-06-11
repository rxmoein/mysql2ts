export const DataTypesMap = {
    char: 'string',
    varchar: 'string',
    text: 'string',
    tinytext: 'string',
    mediumtext: 'string',
    longtext: 'string',
    time: 'string',
    geometry: 'string',
    set: 'string',
    enum: 'string',
    integer: 'number',
    int: 'number',
    smallint: 'number',
    mediumint: 'number',
    bigint: 'number',
    double: 'number',
    decimal: 'number',
    numeric: 'number',
    float: 'number',
    year: 'number',
    tinyint: 'boolean',
    json: 'Object',
    date: 'string', // TODO: Add option for treating as date
    datetime: 'string',
    timestamp: 'string',
    tinyblob: 'Buffer',
    mediumblob: 'Buffer',
    longblob: 'Buffer',
    blob: 'Buffer',
    binary: 'Buffer',
    varbinary: 'Buffer',
    bit: 'Buffer',
}

export const toolsString = `export function throwNull2NonNull(field: string, d: any): never {
    return errorHelper(field, d, 'non-nullable object', false);
}

/**
 * Throw an error when value is not array
 * @param d Meaning data
 * @param nullable Is this field nullable
 * @param field The field name
 */
export function throwNotObject(field: string, d: any, nullable: boolean): never {
    return errorHelper(field, d, 'object', nullable);
}

/**
 * Throw an error when value is not array
 * @param d Meaning data
 * @param nullable Is this field nullable
 * @param field The field name
 */
export function throwIsArray(field: string, d: any, nullable: boolean): never {
    return errorHelper(field, d, 'object', nullable);
}

/**
 * Checks if the value is a number
 * @param d Meaning data
 * @param nullable Is this field nullable
 * @param field The field name
 */
export function checkNumber(d: any, nullable: boolean, field: string): void {
    if (typeof (d) !== 'number' && (!nullable || (nullable && d !== null && d !== undefined))) {
        errorHelper(field, d, 'number', nullable);
    }
}

/**
 * Checks if the value is a boolean
 * @param d Meaning data
 * @param nullable Is this field nullable
 * @param field The field name
 */
export function checkBoolean(d: any, nullable: boolean, field: string): void {
    if (typeof (d) !== 'boolean' && (!nullable || (nullable && d !== null && d !== undefined))) {
        errorHelper(field, d, 'boolean', nullable);
    }
}

/**
 * Checks if the value is a string
 * @param d Meaning data
 * @param nullable Is this field nullable
 * @param field The field name
 */
export function checkString(d: any, nullable: boolean, field: string): void {
    if (typeof (d) !== 'string' && (!nullable || (nullable && d !== null && d !== undefined))) {
        errorHelper(field, d, 'string', nullable);
    }
}

/**
 * Helps to create an understandable error message
 * @param field The field name that is being checked
 * @param d Meaning data
 * @param type That the type should be
 * @param nullable Is this field nullable or not
 */
export function errorHelper(field: string, d: any, type: string, nullable: boolean): never {
    if (nullable) {
        type += ', null, or undefined';
    }
    throw new TypeError('Expected ' + type + ' at ' + field + ' but found:\n' + JSON.stringify(d));
}

/**
 * Checks if the value is array or not
 * @param d Meaning data
 * @param field The field name
 */
export function checkArray(d: any, field: string): void {
    if (!Array.isArray(d) && d !== null && d !== undefined) {
        errorHelper(field, d, 'array', true);
    }
}
`;

export const initialCreateValidationString = `        if (obj === null || obj === undefined) {
            throwNull2NonNull(field, obj);
        } else if (typeof (obj) !== 'object') {
            throwNotObject(field, obj, false);
        } else if (Array.isArray(obj)) {
            throwIsArray(field, obj, false);
        }`;