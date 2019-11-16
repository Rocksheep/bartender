import {AbstractCommand} from "./AbstractCommand";

export class Hype extends AbstractCommand {
    public static signature: string = '.hype';

    private images: Array<string> = [
        'https://i.imgur.com/SwCGeRF.jpg',
        'https://i.imgur.com/iXkB5rx.jpg',
    ];

    public static build(author: string, message: string): Hype {
        return new Hype(message);
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
