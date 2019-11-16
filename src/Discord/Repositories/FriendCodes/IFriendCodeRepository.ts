export interface IFriendCodeRepository {
    storeFriendCode(username: string, friendCode: string): Promise<void>
    getFriendCodeByUsername(username: string): Promise<string>
}
