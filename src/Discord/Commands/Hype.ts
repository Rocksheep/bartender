import { Command } from "@/Discord/Interfaces/Command";

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
        return {
            file: this.images[this.randomIndex],
        };
    }

    get randomIndex(): number {
        return Math.floor(Math.random() * this.numberOfImages);
    }

    get numberOfImages(): number {
        return this.images.length;
    }
}