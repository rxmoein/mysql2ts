import 'reflect-metadata';

interface Type<T> {
    new(...args: any[]): T;
}

export type GenericClassDecorator<T> = (target: T) => void;

export const Service = (): GenericClassDecorator<Type<object>> => {
    return (target: Type<object>) => {
        // do something with `target`, e.g. some kind of validation or passing it to the Injector and store them
    };
};