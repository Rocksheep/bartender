import { Database } from 'sqlite3';
import { PokemonCode } from '../../Types/PokemonCode';

export class PokemonLeagueCardCodeRepository {
    private connect() {
        return new Database('database/bartender.db');
    }

    async all(): Promise<Array<PokemonCode>> {
        return new Promise((resolve, reject) => {
            const db = this.connect();

            db.all('SELECT * FROM pokemonCodes', (err, rows) => {
                if (err) {
                    return reject(err);
                }

                return resolve(rows.map(row => {
                    return {
                        username: row.username,
                        code: row.code
                    };
                }));
            });
        });
    }

    async getCodeByUsername(username: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const db = this.connect();

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
        const db = this.connect();

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

    async deleteCode(username: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const db = this.connect();

            db.run('DELETE FROM pokemonCodes where username=?', [username], (err) => {
                if (err) {
                    return reject();
                }

                return resolve();
            });

            db.close();
        });
    }
}
