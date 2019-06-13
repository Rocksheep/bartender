import { Hype } from "@/Discord/Commands/Hype";

describe('Hype command', () => {
    it('returns empty content', () => {
        const command = new Hype('');
        expect(command.getContent()).toBe('');
    });

    it('returns a file', () => {
        const command = new Hype('');
        const options = command.getOptions();

        expect(Object.keys(options)).toContain('file');
    })
});