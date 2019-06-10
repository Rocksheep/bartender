export interface DiscordClient {
    /**
     * Connects to Discord using the given token
     * 
     * @param token The Discord Bot token
     */
    connect(token: string): void;

    /**
     * On message received
     */
    addOnMessageListener(callback: Function): void;
}