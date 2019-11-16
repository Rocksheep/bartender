import { Database } from 'sqlite3';

export class PokemonLeagueCardCodeRepository {
    async getCodeByUsername(username: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const db = new Database('database/bartender.db');

            db.get('SELECT * FROM pokemonCodes WHERE username = ?', [username], (err, row) => {
                if (err) {
                    return reject(err);
                }
                if (!row) {
                    return reject(new Error('User not found'));
                }

                return resolve(row.code);
            });
            db.close();
        });
    }

    async storeCode(username: string, friendCode: string): Promise<void> {
        const db = new Database('database/bartender.db');

        try {
            await this.getCodeByUsername(username);
            console.log('updating pokemonCodes for ' + username);
            db.run('UPDATE pokemonCodes SET code=? WHERE username=?', [friendCode, username]);
        } catch (err) {
            db.run('INSERT INTO pokemonCodes (username, code) VALUES (?, ?)', [username, friendCode]);
            console.log('storing pokemonCodes for ' + username);
        }

        db.close();
    }
}
