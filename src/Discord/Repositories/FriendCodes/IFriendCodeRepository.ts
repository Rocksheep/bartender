import { FriendCode } from '../../Types/FriendCode';

export interface IFriendCodeRepository {
    all(): Promise<Array<FriendCode>>;
    storeFriendCode(username: string, friendCode: string): Promise<void>
    getFriendCodeByUsername(username: string): Promise<string>
}
