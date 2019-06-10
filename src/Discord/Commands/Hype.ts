import { Command } from "../Interfaces/Command";

export class Hype implements Command {
    public static signature: string = '.hype';

    private images: Array<string> = [
        'https://i.imgur.com/SwCGeRF.jpg',
        'https://i.imgur.com/iXkB5rx.jpg',
    ];

    getContent(): string {
        return '';
    }

    getOptions(): Object {
        const index = Math.floor(Math.random() * this.images.length);

        return {
            file: this.images[index],
        };
    }
}