export interface Command {
    getContent(): Promise<string>;
    getOptions(): Object
}
