export interface Configuration {
    DatabaseHost: string;
    DatabaseUsername: string;
    DatabasePassword: string;
    DatabaseName: string;
    DatabasePort: string;
    OutputDirectory: string;
    Mode: 'basic' | 'advanced';
    NamingConvention: 'camelCase' | 'pascalCase' | 'snakeCase';
}