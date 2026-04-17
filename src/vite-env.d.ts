/// <reference types="vite/client" />
declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    const component: DefineComponent<{}, {}, any>
    export default component
}

declare namespace SocketIOClient {
    interface Socket {
        connected: boolean
        on(event: string, callback: (...args: any[]) => void): this
        emit(event: string, ...args: any[]): this
        connect(): this
        disconnect(): this
        removeAllListeners(): this
    }
}

declare module 'socket.io-client' {
    function io(url: string, options?: Record<string, unknown>): SocketIOClient.Socket
    export default io
}
