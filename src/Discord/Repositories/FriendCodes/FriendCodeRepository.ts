import { Database } from 'sqlite3';
import { IFriendCodeRepository } from './IFriendCodeRepository';

export class FriendCodeRepository implements IFriendCodeRepository {
    async getFriendCodeByUsername(username: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const db = new Database('database/bartender.db');

            db.get('SELECT * FROM friendCodes WHERE username = ?', [username], (err, row) => {
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

    async storeFriendCode(username: string, friendCode: string): Promise<void> {
        const db = new Database('database/bartender.db');

        try {
            await this.getFriendCodeByUsername(username);
            console.log('updating friendcode for ' + username);
            db.run('UPDATE friendCodes SET code=? WHERE username=?', [friendCode, username]);
        } catch (err) {
            db.run('INSERT INTO friendCodes (username, code) VALUES (?, ?)', [username, friendCode]);
            console.log('storing friendcode for ' + username);
        }

        db.close();
    }
}
