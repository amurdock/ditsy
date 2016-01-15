// Type definitions for Node.js v4.x
// Project: http://nodejs.org/
// Definitions by: Microsoft TypeScript <http://typescriptlang.org>, DefinitelyTyped <https://github.com/borisyankov/DefinitelyTyped>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/************************************************
*                                               *
*               Node.js v4.x API                *
*                                               *
************************************************/

interface Error {
    stack?: string;
}


// compat for TypeScript 1.5.3
// if you use with --target es3 or --target es5 and use below definitions,
// use the lib.es6.d.ts that is bundled with TypeScript 1.5.3.
interface MapConstructor {}
interface WeakMapConstructor {}
interface SetConstructor {}
interface WeakSetConstructor {}

/************************************************
*                                               *
*                   GLOBAL                      *
*                                               *
************************************************/
declare var process: NodeJS.Process;
declare var global: NodeJS.Global;

declare var __filename: string;
declare var __dirname: string;

declare function setTimeout(callback: (...args: any[]) => void, ms: number, ...args: any[]): NodeJS.Timer;
declare function clearTimeout(timeoutId: NodeJS.Timer): void;
declare function setInterval(callback: (...args: any[]) => void, ms: number, ...args: any[]): NodeJS.Timer;
declare function clearInterval(intervalId: NodeJS.Timer): void;
declare function setImmediate(callback: (...args: any[]) => void, ...args: any[]): any;
declare function clearImmediate(immediateId: any): void;

interface NodeRequireFunction {
    (id: string): any;
}

interface NodeRequire extends NodeRequireFunction {
    resolve(id:string): string;
    cache: any;
    extensions: any;
    main: any;
}

declare var require: NodeRequire;

interface NodeModule {
    exports: any;
    require: NodeRequireFunction;
    id: string;
    filename: string;
    loaded: boolean;
    parent: any;
    children: any[];
}

declare var module: NodeModule;

// Same as module.exports
declare var exports: any;
declare var SlowBuffer: {
    new (str: string, encoding?: string): Buffer;
    new (size: number): Buffer;
    new (size: Uint8Array): Buffer;
    new (array: any[]): Buffer;
    prototype: Buffer;
    isBuffer(obj: any): boolean;
    byteLength(string: string, encoding?: string): number;
    concat(list: Buffer[], totalLength?: number): Buffer;
};


// Buffer class
interface Buffer extends NodeBuffer {}

/**
 * Raw data is stored in instances of the Buffer class.
 * A Buffer is similar to an array of integers but corresponds to a raw memory allocation outside the V8 heap.  A Buffer cannot be resized.
 * Valid string encodings: 'ascii'|'utf8'|'utf16le'|'ucs2'(alias of 'utf16le')|'base64'|'binary'(deprecated)|'hex'
 */
declare var Buffer: {
    /**
     * Allocates a new buffer containing the given {str}.
     *
     * @param str String to store in buffer.
     * @param encoding encoding to use, optional.  Default is 'utf8'
     */
    new (str: string, encoding?: string): Buffer;
    /**
     * Allocates a new buffer of {size} octets.
     *
     * @param size count of octets to allocate.
     */
    new (size: number): Buffer;
    /**
     * Allocates a new buffer containing the given {array} of octets.
     *
     * @param array The octets to store.
     */
    new (array: Uint8Array): Buffer;
    /**
     * Allocates a new buffer containing the given {array} of octets.
     *
     * @param array The octets to store.
     */
    new (array: any[]): Buffer;
    prototype: Buffer;
    /**
     * Returns true if {obj} is a Buffer
     *
     * @param obj object to test.
     */
    isBuffer(obj: any): obj is Buffer;
    /**
     * Returns true if {encoding} is a valid encoding argument.
     * Valid string encodings in Node 0.12: 'ascii'|'utf8'|'utf16le'|'ucs2'(alias of 'utf16le')|'base64'|'binary'(deprecated)|'hex'
     *
     * @param encoding string to test.
     */
    isEncoding(encoding: string): boolean;
    /**
     * Gives the actual byte length of a string. encoding defaults to 'utf8'.
     * This is not the same as String.prototype.length since that returns the number of characters in a string.
     *
     * @param string string to test.
     * @param encoding encoding used to evaluate (defaults to 'utf8')
     */
    byteLength(string: string, encoding?: string): number;
    /**
     * Returns a buffer which is the result of concatenating all the buffers in the list together.
     *
     * If the list has no items, or if the totalLength is 0, then it returns a zero-length buffer.
     * If the list has exactly one item, then the first item of the list is returned.
     * If the list has more than one item, then a new Buffer is created.
     *
     * @param list An array of Buffer objects to concatenate
     * @param totalLength Total length of the buffers when concatenated.
     *   If totalLength is not provided, it is read from the buffers in the list. However, this adds an additional loop to the function, so it is faster to provide the length explicitly.
     */
    concat(list: Buffer[], totalLength?: number): Buffer;
    /**
     * The same as buf1.compare(buf2).
     */
    compare(buf1: Buffer, buf2: Buffer): number;
};

/************************************************
*                                               *
*               GLOBAL INTERFACES               *
*                                               *
************************************************/
declare module NodeJS {
    export interface ErrnoException extends Error {
        errno?: number;
        code?: string;
        path?: string;
        syscall?: string;
        stack?: string;
    }

    export interface EventEmitter {
        addListener(event: string, listener: Function): EventEmitter;
        on(event: string, listener: Function): EventEmitter;
        once(event: string, listener: Function): EventEmitter;
        removeListener(event: string, listener: Function): EventEmitter;
        removeAllListeners(event?: string): EventEmitter;
        setMaxListeners(n: number): EventEmitter;
        getMaxListeners(): number;
        listeners(event: string): Function[];
        emit(event: string, ...args: any[]): boolean;
        listenerCount(type: string): number;
    }

    export interface ReadableStream extends EventEmitter {
        readable: boolean;
        read(size?: number): string|Buffer;
        setEncoding(encoding: string): void;
        pause(): void;
        resume(): void;
        pipe<T extends WritableStream>(destination: T, options?: { end?: boolean; }): T;
        unpipe<T extends WritableStream>(destination?: T): void;
        unshift(chunk: string): void;
        unshift(chunk: Buffer): void;
        wrap(oldStream: ReadableStream): ReadableStream;
    }

    export interface WritableStream extends EventEmitter {
        writable: boolean;
        write(buffer: Buffer|string, cb?: Function): boolean;
        write(str: string, encoding?: string, cb?: Function): boolean;
        end(): void;
        end(buffer: Buffer, cb?: Function): void;
        end(str: string, cb?: Function): void;
        end(str: string, encoding?: string, cb?: Function): void;
    }

    export interface ReadWriteStream extends ReadableStream, WritableStream {}

    export interface Process extends EventEmitter {
        stdout: WritableStream;
        stderr: WritableStream;
        stdin: ReadableStream;
        argv: string[];
        execPath: string;
        abort(): void;
        chdir(directory: string): void;
        cwd(): string;
        env: any;
        exit(code?: number): void;
        getgid(): number;
        setgid(id: number): void;
        setgid(id: string): void;
        getuid(): number;
        setuid(id: number): void;
        setuid(id: string): void;
        version: string;
        versions: {
            http_parser: string;
            node: string;
            v8: string;
            ares: string;
            uv: string;
            zlib: string;
            openssl: string;
        };
        config: {
            target_defaults: {
                cflags: any[];
                default_configuration: string;
                defines: string[];
                include_dirs: string[];
                libraries: string[];
            };
            variables: {
                clang: number;
                host_arch: string;
                node_install_npm: boolean;
                node_install_waf: boolean;
                node_prefix: string;
                node_shared_openssl: boolean;
                node_shared_v8: boolean;
                node_shared_zlib: boolean;
                node_use_dtrace: boolean;
                node_use_etw: boolean;
                node_use_openssl: boolean;
                target_arch: string;
                v8_no_strict_aliasing: number;
                v8_use_snapshot: boolean;
                visibility: string;
            };
        };
        kill(pid:number, signal?: string|number): void;
        pid: number;
        title: string;
        arch: string;
        platform: string;
        memoryUsage(): { rss: number; heapTotal: number; heapUsed: number; };
        nextTick(callback: Function): void;
        umask(mask?: number): number;
        uptime(): number;
        hrtime(time?:number[]): number[];

        // Worker
        send?(message: any, sendHandle?: any): void;
    }

    export interface Global {
        Array: typeof Array;
        ArrayBuffer: typeof ArrayBuffer;
        Boolean: typeof Boolean;
        Buffer: typeof Buffer;
        DataView: typeof DataView;
        Date: typeof Date;
        Error: typeof Error;
        EvalError: typeof EvalError;
        Float32Array: typeof Float32Array;
        Float64Array: typeof Float64Array;
        Function: typeof Function;
        GLOBAL: Global;
        Infinity: typeof Infinity;
        Int16Array: typeof Int16Array;
        Int32Array: typeof Int32Array;
        Int8Array: typeof Int8Array;
        Intl: typeof Intl;
        JSON: typeof JSON;
        Map: MapConstructor;
        Math: typeof Math;
        NaN: typeof NaN;
        Number: typeof Number;
        Object: typeof Object;
        Promise: Function;
        RangeError: typeof RangeError;
        ReferenceError: typeof ReferenceError;
        RegExp: typeof RegExp;
        Set: SetConstructor;
        String: typeof String;
        Symbol: Function;
        SyntaxError: typeof SyntaxError;
        TypeError: typeof TypeError;
        URIError: typeof URIError;
        Uint16Array: typeof Uint16Array;
        Uint32Array: typeof Uint32Array;
        Uint8Array: typeof Uint8Array;
        Uint8ClampedArray: Function;
        WeakMap: WeakMapConstructor;
        WeakSet: WeakSetConstructor;
        clearImmediate: (immediateId: any) => void;
        clearInterval: (intervalId: NodeJS.Timer) => void;
        clearTimeout: (timeoutId: NodeJS.Timer) => void;
        console: typeof console;
        decodeURI: typeof decodeURI;
        decodeURIComponent: typeof decodeURIComponent;
        encodeURI: typeof encodeURI;
        encodeURIComponent: typeof encodeURIComponent;
        escape: (str: string) => string;
        eval: typeof eval;
        global: Global;
        isFinite: typeof isFinite;
        isNaN: typeof isNaN;
        parseFloat: typeof parseFloat;
        parseInt: typeof parseInt;
        process: Process;
        root: Global;
        setImmediate: (callback: (...args: any[]) => void, ...args: any[]) => any;
        setInterval: (callback: (...args: any[]) => void, ms: number, ...args: any[]) => NodeJS.Timer;
        setTimeout: (callback: (...args: any[]) => void, ms: number, ...args: any[]) => NodeJS.Timer;
        undefined: typeof undefined;
        unescape: (str: string) => string;
        gc: () => void;
        v8debug?: any;
    }

    export interface Timer {
        ref() : void;
        unref() : void;
    }
}

/**
 * @deprecated
 */
interface NodeBuffer {
    [index: number]: number;
    write(string: string, offset?: number, length?: number, encoding?: string): number;
    toString(encoding?: string, start?: number, end?: number): string;
    toJSON(): any;
    length: number;
    equals(otherBuffer: Buffer): boolean;
    compare(otherBuffer: Buffer): number;
    copy(targetBuffer: Buffer, targetStart?: number, sourceStart?: number, sourceEnd?: number): number;
    slice(start?: number, end?: number): Buffer;
    writeUIntLE(value: number, offset: number, byteLength: number, noAssert?: boolean): number;
    writeUIntBE(value: number, offset: number, byteLength: number, noAssert?: boolean): number;
    writeIntLE(value: number, offset: number, byteLength: number, noAssert?: boolean): number;
    writeIntBE(value: number, offset: number, byteLength: number, noAssert?: boolean): number;
    readUIntLE(offset: number, byteLength: number, noAssert?: boolean): number;
    readUIntBE(offset: number, byteLength: number, noAssert?: boolean): number;
    readIntLE(offset: number, byteLength: number, noAssert?: boolean): number;
    readIntBE(offset: number, byteLength: number, noAssert?: boolean): number;
    readUInt8(offset: number, noAsset?: boolean): number;
    readUInt16LE(offset: number, noAssert?: boolean): number;
    readUInt16BE(offset: number, noAssert?: boolean): number;
    readUInt32LE(offset: number, noAssert?: boolean): number;
    readUInt32BE(offset: number, noAssert?: boolean): number;
    readInt8(offset: number, noAssert?: boolean): number;
    readInt16LE(offset: number, noAssert?: boolean): number;
    readInt16BE(offset: number, noAssert?: boolean): number;
    readInt32LE(offset: number, noAssert?: boolean): number;
    readInt32BE(offset: number, noAssert?: boolean): number;
    readFloatLE(offset: number, noAssert?: boolean): number;
    readFloatBE(offset: number, noAssert?: boolean): number;
    readDoubleLE(offset: number, noAssert?: boolean): number;
    readDoubleBE(offset: number, noAssert?: boolean): number;
    writeUInt8(value: number, offset: number, noAssert?: boolean): number;
    writeUInt16LE(value: number, offset: number, noAssert?: boolean): number;
    writeUInt16BE(value: number, offset: number, noAssert?: boolean): number;
    writeUInt32LE(value: number, offset: number, noAssert?: boolean): number;
    writeUInt32BE(value: number, offset: number, noAssert?: boolean): number;
    writeInt8(value: number, offset: number, noAssert?: boolean): number;
    writeInt16LE(value: number, offset: number, noAssert?: boolean): number;
    writeInt16BE(value: number, offset: number, noAssert?: boolean): number;
    writeInt32LE(value: number, offset: number, noAssert?: boolean): number;
    writeInt32BE(value: number, offset: number, noAssert?: boolean): number;
    writeFloatLE(value: number, offset: number, noAssert?: boolean): number;
    writeFloatBE(value: number, offset: number, noAssert?: boolean): number;
    writeDoubleLE(value: number, offset: number, noAssert?: boolean): number;
    writeDoubleBE(value: number, offset: number, noAssert?: boolean): number;
    fill(value: any, offset?: number, end?: number): Buffer;
}

/************************************************
*                                               *
*                   MODULES                     *
*                                               *
************************************************/
declare module "buffer" {
    export var INSPECT_MAX_BYTES: number;
}

declare module "querystring" {
    export interface StringifyOptions {
        encodeURIComponent?: Function;
    }

    export interface ParseOptions {
        maxKeys?: number;
        decodeURIComponent?: Function;
    }

    export function stringify<T>(obj: T, sep?: string, eq?: string, options?: StringifyOptions): string;
    export function parse(str: string, sep?: string, eq?: string, options?: ParseOptions): any;
    export function parse<T extends {}>(str: string, sep?: string, eq?: string, options?: ParseOptions): T;
    export function escape(str: string): string;
    export function unescape(str: string): string;
}

declare module "events" {
    export class EventEmitter implements NodeJS.EventEmitter {
        static EventEmitter: EventEmitter;
        static listenerCount(emitter: EventEmitter, event: string): number; // deprecated
        static defaultMaxListeners: number;

        addListener(event: string, listener: Function): EventEmitter;
        on(event: string, listener: Function): EventEmitter;
        once(event: string, listener: Function): EventEmitter;
        removeListener(event: string, listener: Function): EventEmitter;
        removeAllListeners(event?: string): EventEmitter;
        setMaxListeners(n: number): EventEmitter;
        getMaxListeners(): number;
        listeners(event: string): Function[];
        emit(event: string, ...args: any[]): boolean;
        listenerCount(type: string): number;
    }
}

declare module "http" {
    import * as events from "events";
    import * as net from "net";
    import * as stream from "stream";

    export interface RequestOptions {
        protocol?: string;
        host?: string;
        hostname?: string;
        family?: number;
        port?: number
        localAddress?: string;
        socketPath?: string;
        method?: string;
        path?: string;
        headers?: { [key: string]: any };
        auth?: string;
        agent?: Agent|boolean;
    }

    export interface Server extends events.EventEmitter {
        listen(port: number, hostname?: string, backlog?: number, callback?: Function): Server;
        listen(port: number, hostname?: string, callback?: Function): Server;
        listen(path: string, callback?: Function): Server;
        listen(handle: any, listeningListener?: Function): Server;
        close(cb?: any): Server;
        address(): { port: number; family: string; address: string; };
        maxHeadersCount: number;
    }
    /**
     * @deprecated Use IncomingMessage
     */
    export interface ServerRequest extends IncomingMessage {
        connection: net.Socket;
    }
    export interface ServerResponse extends events.EventEmitter, stream.Writable {
        // Extended base methods
        write(buffer: Buffer): boolean;
        write(buffer: Buffer, cb?: Function): boolean;
        write(str: string, cb?: Function): boolean;
        write(str: string, encoding?: string, cb?: Function): boolean;
        write(str: string, encoding?: string, fd?: string): boolean;

        writeContinue(): void;
        writeHead(statusCode: number, reasonPhrase?: string, headers?: any): void;
        writeHead(statusCode: number, headers?: any): void;
        statusCode: number;
        statusMessage: string;
        headersSent: boolean;
        setHeader(name: string, value: string): void;
        sendDate: boolean;
        getHeader(name: string): string;
        removeHeader(name: string): void;
        write(chunk: any, encoding?: string): any;
        addTrailers(headers: any): void;

        // Extended base methods
        end(): void;
        end(buffer: Buffer, cb?: Function): void;
        end(str: string, cb?: Function): void;
        end(str: string, encoding?: string, cb?: Function): void;
        end(data?: any, encoding?: string): void;
    }
    export interface ClientRequest extends events.EventEmitter, stream.Writable {
        // Extended base methods
        write(buffer: Buffer): boolean;
        write(buffer: Buffer, cb?: Function): boolean;
        write(str: string, cb?: Function): boolean;
        write(str: string, encoding?: string, cb?: Function): boolean;
        write(str: string, encoding?: string, fd?: string): boolean;

        write(chunk: any, encoding?: string): void;
        abort(): void;
        setTimeout(timeout: number, callback?: Function): void;
        setNoDelay(noDelay?: boolean): void;
        setSocketKeepAlive(enable?: boolean, initialDelay?: number): void;

        // Extended base methods
        end(): void;
        end(buffer: Buffer, cb?: Function): void;
        end(str: string, cb?: Function): void;
        end(str: string, encoding?: string, cb?: Function): void;
        end(data?: any, encoding?: string): void;
    }
    export interface IncomingMessage extends events.EventEmitter, stream.Readable {
        httpVersion: string;
        headers: any;
        rawHeaders: string[];
        trailers: any;
        rawTrailers: any;
        setTimeout(msecs: number, callback: Function): NodeJS.Timer;
        /**
         * Only valid for request obtained from http.Server.
         */
        method?: string;
        /**
         * Only valid for request obtained from http.Server.
         */
        url?: string;
        /**
         * Only valid for response obtained from http.ClientRequest.
         */
        statusCode?: number;
        /**
         * Only valid for response obtained from http.ClientRequest.
         */
        statusMessage?: string;
        socket: net.Socket;
    }
    /**
     * @deprecated Use IncomingMessage
     */
    export interface ClientResponse extends IncomingMessage { }

	export interface AgentOptions {
		/**
		 * Keep sockets around in a pool to be used by other requests in the future. Default = false
		 */
		keepAlive?: boolean;
		/**
		 * When using HTTP KeepAlive, how often to send TCP KeepAlive packets over sockets being kept alive. Default = 1000.
		 * Only relevant if keepAlive is set to true.
		 */
		keepAliveMsecs?: number;
		/**
		 * Maximum number of sockets to allow per host. Default for Node 0.10 is 5, default for Node 0.12 is Infinity
		 */
		maxSockets?: number;
		/**
		 * Maximum number of sockets to leave open in a free state. Only relevant if keepAlive is set to true. Default = 256.
		 */
		maxFreeSockets?: number;
	}

    export class Agent {
		maxSockets: number;
		sockets: any;
		requests: any;

		constructor(opts?: AgentOptions);

		/**
		 * Destroy any sockets that are currently in use by the agent.
		 * It is usually not necessary to do this. However, if you are using an agent with KeepAlive enabled,
		 * then it is best to explicitly shut down the agent when you know that it will no longer be used. Otherwise,
		 * sockets may hang open for quite a long time before the server terminates them.
		 */
		destroy(): void;
	}

    export var METHODS: string[];

    export var STATUS_CODES: {
        [errorCode: number]: string;
        [errorCode: string]: string;
    };
    export function createServer(requestListener?: (request: IncomingMessage, response: ServerResponse) =>void ): Server;
    export function createClient(port?: number, host?: string): any;
    export function request(options: RequestOptions, callback?: (res: IncomingMessage) => void): ClientRequest;
    export function get(options: any, callback?: (res: IncomingMessage) => void): ClientRequest;
    export var globalAgent: Agent;
}

declare module "cluster" {
    import * as child from "child_process";
    import * as events from "events";

    export interface ClusterSettings {
        exec?: string;
        args?: string[];
        silent?: boolean;
    }

    export class Worker extends events.EventEmitter {
        id: string;
        process: child.ChildProcess;
        suicide: boolean;
        send(message: any, sendHandle?: any): void;
        kill(signal?: string): void;
        destroy(signal?: string): void;
        disconnect(): void;
    }

    export var settings: ClusterSettings;
    export var isMaster: boolean;
    export var isWorker: boolean;
    export function setupMaster(settings?: ClusterSettings): void;
    export function fork(env?: any): Worker;
    export function disconnect(callback?: Function): void;
    export var worker: Worker;
    export var workers: Worker[];

    // Event emitter
    export function addListener(event: string, listener: Function): void;
    export function on(event: string, listener: Function): any;
    export function once(event: string, listener: Function): void;
    export function removeListener(event: string, listener: Function): void;
    export function removeAllListeners(event?: string): void;
    export function setMaxListeners(n: number): void;
    export function listeners(event: string): Function[];
    export function emit(event: string, ...args: any[]): boolean;
}

declare module "zlib" {
    import * as stream from "stream";
    export interface ZlibOptions { chunkSize?: number; windowBits?: number; level?: number; memLevel?: number; strategy?: number; dictionary?: any; }

    export interface Gzip extends stream.Transform { }
    export interface Gunzip extends stream.Transform { }
    export interface Deflate extends stream.Transform { }
    export interface Inflate extends stream.Transform { }
    export interface DeflateRaw extends stream.Transform { }
    export interface InflateRaw extends stream.Transform { }
    export interface Unzip extends stream.Transform { }

    export function createGzip(options?: ZlibOptions): Gzip;
    export function createGunzip(options?: ZlibOptions): Gunzip;
    export function createDeflate(options?: ZlibOptions): Deflate;
    export function createInflate(options?: ZlibOptions): Inflate;
    export function createDeflateRaw(options?: ZlibOptions): DeflateRaw;
    export function createInflateRaw(options?: ZlibOptions): InflateRaw;
    export function createUnzip(options?: ZlibOptions): Unzip;

    export function deflate(buf: Buffer, callback: (error: Error, result: any) =>void ): void;
    export function deflateSync(buf: Buffer, options?: ZlibOptions): any;
    export function deflateRaw(buf: Buffer, callback: (error: Error, result: any) =>void ): void;
    export function deflateRawSync(buf: Buffer, options?: ZlibOptions): any;
    export function gzip(buf: Buffer, callback: (error: Error, result: any) =>void ): void;
    export function gzipSync(buf: Buffer, options?: ZlibOptions): any;
    export function gunzip(buf: Buffer, callback: (error: Error, result: any) =>void ): void;
    export function gunzipSync(buf: Buffer, options?: ZlibOptions): any;
    export function inflate(buf: Buffer, callback: (error: Error, result: any) =>void ): void;
    export function inflateSync(buf: Buffer, options?: ZlibOptions): any;
    export function inflateRaw(buf: Buffer, callback: (error: Error, result: any) =>void ): void;
    export function inflateRawSync(buf: Buffer, options?: ZlibOptions): any;
    export function unzip(buf: Buffer, callback: (error: Error, result: any) =>void ): void;
    export function unzipSync(buf: Buffer, options?: ZlibOptions): any;

    // Constants
    export var Z_NO_FLUSH: number;
    export var Z_PARTIAL_FLUSH: number;
    export var Z_SYNC_FLUSH: number;
    export var Z_FULL_FLUSH: number;
    export var Z_FINISH: number;
    export var Z_BLOCK: number;
    export var Z_TREES: number;
    export var Z_OK: number;
    export var Z_STREAM_END: number;
    export var Z_NEED_DICT: number;
    export var Z_ERRNO: number;
    export var Z_STREAM_ERROR: number;
    export var Z_DATA_ERROR: number;
    export var Z_MEM_ERROR: number;
    export var Z_BUF_ERROR: number;
    export var Z_VERSION_ERROR: number;
    export var Z_NO_COMPRESSION: number;
    export var Z_BEST_SPEED: number;
    export var Z_BEST_COMPRESSION: number;
    export var Z_DEFAULT_COMPRESSION: number;
    export var Z_FILTERED: number;
    export var Z_HUFFMAN_ONLY: number;
    export var Z_RLE: number;
    export var Z_FIXED: number;
    export var Z_DEFAULT_STRATEGY: number;
    export var Z_BINARY: number;
    export var Z_TEXT: number;
    export var Z_ASCII: number;
    export var Z_UNKNOWN: number;
    export var Z_DEFLATED: number;
    export var Z_NULL: number;
}

declare module "os" {
    export interface CpuInfo {
        model: string;
        speed: number;
        times: {
            user: number;
            nice: number;
            sys: number;
            idle: number;
            irq: number;
        }
    }

    export interface NetworkInterfaceInfo {
        address: string;
        netmask: string;
        family: string;
        mac: string;
        internal: boolean;
    }

    export function tmpdir(): string;
    export function homedir(): string;
    export function endianness(): string;
    export function hostname(): string;
    export function type(): string;
    export function platform(): string;
    export function arch(): string;
    export function release(): string;
    export function uptime(): number;
    export function loadavg(): number[];
    export function totalmem(): number;
    export function freemem(): number;
    export function cpus(): CpuInfo[];
    export function networkInterfaces(): {[index: string]: NetworkInterfaceInfo[]};
    export var EOL: string;
}

declare module "https" {
    import * as tls from "tls";
    import * as events from "events";
    import * as http from "http";

    export interface ServerOptions {
        pfx?: any;
        key?: any;
        passphrase?: string;
        cert?: any;
        ca?: any;
        crl?: any;
        ciphers?: string;
        honorCipherOrder?: boolean;
        requestCert?: boolean;
        rejectUnauthorized?: boolean;
        NPNProtocols?: any;
        SNICallback?: (servername: string) => any;
    }

    export interface RequestOptions extends http.RequestOptions{
        pfx?: any;
        key?: any;
        passphrase?: string;
        cert?: any;
        ca?: any;
        ciphers?: string;
        rejectUnauthorized?: boolean;
        secureProtocol?: string;
    }

    export interface Agent {
        maxSockets: number;
        sockets: any;
        requests: any;
    }
    export var Agent: {
        new (options?: RequestOptions): Agent;
    };
    export interface Server extends tls.Server { }
    export function createServer(options: ServerOptions, requestListener?: Function): Server;
    export function request(options: RequestOptions, callback?: (res: http.IncomingMessage) =>void ): http.ClientRequest;
    export function get(options: RequestOptions, callback?: (res: http.IncomingMessage) =>void ): http.ClientRequest;
    export var globalAgent: Agent;
}

declare module "punycode" {
    export function decode(string: string): string;
    export function encode(string: string): string;
    export function toUnicode(domain: string): string;
    export function toASCII(domain: string): string;
    export var ucs2: ucs2;
    interface ucs2 {
        decode(string: string): number[];
        encode(codePoints: number[]): string;
    }
    export var version: any;
}

declare module "repl" {
    import * as stream from "stream";
    import * as events from "events";

    export interface ReplOptions {
        prompt?: string;
        input?: NodeJS.ReadableStream;
        output?: NodeJS.WritableStream;
        terminal?: boolean;
        eval?: Function;
        useColors?: boolean;
        useGlobal?: boolean;
        ignoreUndefined?: boolean;
        writer?: Function;
    }
    export function start(options: ReplOptions): events.EventEmitter;
}

declare module "readline" {
    import * as events from "events";
    import * as stream from "stream";

    export interface Key {
        sequence?: string;
        name?: string;
        ctrl?: boolean;
        meta?: boolean;
        shift?: boolean;
    }

    export interface ReadLine extends events.EventEmitter {
        setPrompt(prompt: string): void;
        prompt(preserveCursor?: boolean): void;
        question(query: string, callback: (answer: string) => void): void;
        pause(): ReadLine;
        resume(): ReadLine;
        close(): void;
        write(data: string|Buffer, key?: Key): void;
    }

    export interface Completer {
        (line: string): CompleterResult;
        (line: string, callback: (err: any, result: CompleterResult) => void): any;
    }

    export interface CompleterResult {
        completions: string[];
        line: string;
    }

    export interface ReadLineOptions {
        input: NodeJS.ReadableStream;
        output?: NodeJS.WritableStream;
        completer?: Completer;
        terminal?: boolean;
        historySize?: number;
    }

    export function createInterface(input: NodeJS.ReadableStream, output?: NodeJS.WritableStream, completer?: Completer, terminal?: boolean): ReadLine;
    export function createInterface(options: ReadLineOptions): ReadLine;

    export function cursorTo(stream: NodeJS.WritableStream, x: number, y: number): void;
    export function moveCursor(stream: NodeJS.WritableStream, dx: number|string, dy: number|string): void;
    export function clearLine(stream: NodeJS.WritableStream, dir: number): void;
    export function clearScreenDown(stream: NodeJS.WritableStream): void;
}

declare module "vm" {
    export interface Context { }
    export interface Script {
        runInThisContext(): void;
        runInNewContext(sandbox?: Context): void;
    }
    export function runInThisContext(code: string, filename?: string): void;
    export function runInNewContext(code: string, sandbox?: Context, filename?: string): void;
    export function runInContext(code: string, context: Context, filename?: string): void;
    export function createContext(initSandbox?: Context): Context;
    export function createScript(code: string, filename?: string): Script;
}

declare module "child_process" {
    import * as events from "events";
    import * as stream from "stream";

    export interface ChildProcess extends events.EventEmitter {
        stdin:  stream.Writable;
        stdout: stream.Readable;
        stderr: stream.Readable;
        pid: number;
        kill(signal?: string): void;
        send(message: any, sendHandle?: any): void;
        disconnect(): void;
        unref(): void;
    }

    export function spawn(command: string, args?: string[], options?: {
        cwd?: string;
        stdio?: any;
        custom?: any;
        env?: any;
        detached?: boolean;
    }): ChildProcess;
    export function exec(command: string, options: {
        cwd?: string;
        stdio?: any;
        customFds?: any;
        env?: any;
        encoding?: string;
        timeout?: number;
        maxBuffer?: number;
        killSignal?: string;
    }, callback?: (error: Error, stdout: Buffer, stderr: Buffer) =>void ): ChildProcess;
    export function exec(command: string, callback?: (error: Error, stdout: Buffer, stderr: Buffer) =>void ): ChildProcess;
    export function execFile(file: string,
        callback?: (error: Error, stdout: Buffer, stderr: Buffer) =>void ): ChildProcess;
    export function execFile(file: string, args?: string[],
        callback?: (error: Error, stdout: Buffer, stderr: Buffer) =>void ): ChildProcess;
    export function execFile(file: string, args?: string[], options?: {
        cwd?: string;
        stdio?: any;
        customFds?: any;
        env?: any;
        encoding?: string;
        timeout?: number;
        maxBuffer?: number;
        killSignal?: string;
    }, callback?: (error: Error, stdout: Buffer, stderr: Buffer) =>void ): ChildProcess;
    export function fork(modulePath: string, args?: string[], options?: {
        cwd?: string;
        env?: any;
        execPath?: string;
        execArgv?: string[];
        silent?: boolean;
        uid?: number;
        gid?: number;
    }): ChildProcess;
    export function spawnSync(command: string, args?: string[], options?: {
        cwd?: string;
        input?: string | Buffer;
        stdio?: any;
        env?: any;
        uid?: number;
        gid?: number;
        timeout?: number;
        maxBuffer?: number;
        killSignal?: string;
        encoding?: string;
    }): {
        pid: number;
        output: string[];
        stdout: string | Buffer;
        stderr: string | Buffer;
        status: number;
        signal: string;
        error: Error;
    };
    export function execSync(command: string, options?: {
        cwd?: string;
        input?: string|Buffer;
        stdio?: any;
        env?: any;
        uid?: number;
        gid?: number;
        timeout?: number;
        maxBuffer?: number;
        killSignal?: string;
        encoding?: string;
    }): string | Buffer;
    export function execFileSync(command: string, args?: string[], options?: {
        cwd?: string;
        input?: string|Buffer;
        stdio?: any;
        env?: any;
        uid?: number;
        gid?: number;
        timeout?: number;
        maxBuffer?: number;
        killSignal?: string;
        encoding?: string;
    }): string | Buffer;
}

declare module "url" {
    export interface Url {
        href?: string;
        protocol?: string;
        auth?: string;
        hostname?: string;
        port?: string;
        host?: string;
        pathname?: string;
        search?: string;
        query?: any; // string | Object
        slashes?: boolean;
        hash?: string;
        path?: string;
    }

    export function parse(urlStr: string, parseQueryString?: boolean , slashesDenoteHost?: boolean ): Url;
    export function format(url: Url): string;
    export function resolve(from: string, to: string): string;
}

declare module "dns" {
    export function lookup(domain: string, family: number, callback: (err: Error, address: string, family: number) =>void ): string;
    export function lookup(domain: string, callback: (err: Error, address: string, family: number) =>void ): string;
    export function resolve(domain: string, rrtype: string, callback: (err: Error, addresses: string[]) =>void ): string[];
    export function resolve(domain: string, callback: (err: Error, addresses: string[]) =>void ): string[];
    export function resolve4(domain: string, callback: (err: Error, addresses: string[]) =>void ): string[];
    export function resolve6(domain: string, callback: (err: Error, addresses: string[]) =>void ): string[];
    export function resolveMx(domain: string, callback: (err: Error, addresses: string[]) =>void ): string[];
    export function resolveTxt(domain: string, callback: (err: Error, addresses: string[]) =>void ): string[];
    export function resolveSrv(domain: string, callback: (err: Error, addresses: string[]) =>void ): string[];
    export function resolveNs(domain: string, callback: (err: Error, addresses: string[]) =>void ): string[];
    export function resolveCname(domain: string, callback: (err: Error, addresses: string[]) =>void ): string[];
    export function reverse(ip: string, callback: (err: Error, domains: string[]) =>void ): string[];
}

declare module "net" {
    import * as stream from "stream";

    export interface Socket extends stream.Duplex {
        // Extended base methods
        write(buffer: Buffer): boolean;
        write(buffer: Buffer, cb?: Function): boolean;
        write(str: string, cb?: Function): boolean;
        write(str: string, encoding?: string, cb?: Function): boolean;
        write(str: string, encoding?: string, fd?: string): boolean;

        connect(port: number, host?: string, connectionListener?: Function): void;
        connect(path: string, connectionListener?: Function): void;
        bufferSize: number;
        setEncoding(encoding?: string): void;
        write(data: any, encoding?: string, callback?: Function): void;
        destroy(): void;
        pause(): void;
        resume(): void;
        setTimeout(timeout: number, callback?: Function): void;
        setNoDelay(noDelay?: boolean): void;
        setKeepAlive(enable?: boolean, initialDelay?: number): void;
        address(): { port: number; family: string; address: string; };
        unref(): void;
        ref(): void;

        remoteAddress: string;
        remoteFamily: string;
        remotePort: number;
        localAddress: string;
        localPort: number;
        bytesRead: number;
        bytesWritten: number;

        // Extended base methods
        end(): void;
        end(buffer: Buffer, cb?: Function): void;
        end(str: string, cb?: Function): void;
        end(str: string, encoding?: string, cb?: Function): void;
        end(data?: any, encoding?: string): void;
    }

    export var Socket: {
        new (options?: { fd?: string; type?: string; allowHalfOpen?: boolean; }): Socket;
    };

    export interface Server extends Socket {
        listen(port: number, host?: string, backlog?: number, listeningListener?: Function): Server;
        listen(path: string, listeningListener?: Function): Server;
        listen(handle: any, listeningListener?: Function): Server;
        close(callback?: Function): Server;
        address(): { port: number; family: string; address: string; };
        maxConnections: number;
        connections: number;
    }
    export function createServer(connectionListener?: (socket: Socket) =>void ): Server;
    export function createServer(options?: { allowHalfOpen?: boolean; }, connectionListener?: (socket: Socket) =>void ): Server;
    export function connect(options: { port: number, host?: string, localAddress? : string, localPort? : string, family? : number, allowHalfOpen?: boolean; }, connectionListener?: Function): Socket;
    export function connect(port: number, host?: string, connectionListener?: Function): Socket;
    export function connect(path: string, connectionListener?: Function): Socket;
    export function createConnection(options: { port: number, host?: string, localAddress? : string, localPort? : string, family? : number, allowHalfOpen?: boolean; }, connectionListener?: Function): Socket;
    export function createConnection(port: number, host?: string, connectionListener?: Function): Socket;
    export function createConnection(path: string, connectionListener?: Function): Socket;
    export function isIP(input: string): number;
    export function isIPv4(input: string): boolean;
    export function isIPv6(input: string): boolean;
}

declare module "dgram" {
    import * as events from "events";

    interface RemoteInfo {
        address: string;
        port: number;
        size: number;
    }

    interface AddressInfo {
        address: string;
        family: string;
        port: number;
    }

    export function createSocket(type: string, callback?: (msg: Buffer, rinfo: RemoteInfo) => void): Socket;

    interface Socket extends events.EventEmitter {
        send(buf: Buffer, offset: number, length: number, port: number, address: string, callback?: (error: Error, bytes: number) => void): void;
        bind(port: number, address?: string, callback?: () => void): void;
        close(): void;
        address(): AddressInfo;
        setBroadcast(flag: boolean): void;
        setMulticastTTL(ttl: number): void;
        setMulticastLoopback(flag: boolean): void;
        addMembership(multicastAddress: string, multicastInterface?: string): void;
        dropMembership(multicastAddress: string, multicastInterface?: string): void;
    }
}

declare module "fs" {
    import * as stream from "stream";
    import * as events from "events";

    interface Stats {
        isFile(): boolean;
        isDirectory(): boolean;
        isBlockDevice(): boolean;
        isCharacterDevice(): boolean;
        isSymbolicLink(): boolean;
        isFIFO(): boolean;
        isSocket(): boolean;
        dev: number;
        ino: number;
        mode: number;
        nlink: number;
        uid: number;
        gid: number;
        rdev: number;
        size: number;
        blksize: number;
        blocks: number;
        atime: Date;
        mtime: Date;
        ctime: Date;
        birthtime: Date;
    }

    interface FSWatcher extends events.EventEmitter {
        close(): void;
    }

    export interface ReadStream extends stream.Readable {
        close(): void;
    }
    export interface WriteStream extends stream.Writable {
        close(): void;
        bytesWritten: number;
    }

    /**
     * Asynchronous rename.
     * @param oldPath
     * @param newPath
     * @param callback No arguments other than a possible exception are given to the completion callback.
     */
    export function rename(oldPath: string, newPath: string, callback?: (err?: NodeJS.ErrnoException) => void): void;
    /**
     * Synchronous rename
     * @param oldPath
     * @param newPath
     */
    export function renameSync(oldPath: string, newPath: string): void;
    export function truncate(path: string, callback?: (err?: NodeJS.ErrnoException) => void): void;
    export function truncate(path: string, len: number, callback?: (err?: NodeJS.ErrnoException) => void): void;
    export function truncateSync(path: string, len?: number): void;
    export function ftruncate(fd: number, callback?: (err?: NodeJS.ErrnoException) => void): void;
    export function ftruncate(fd: number, len: number, callback?: (err?: NodeJS.ErrnoException) => void): void;
    export function ftruncateSync(fd: number, len?: number): void;
    export function chown(path: string, uid: number, gid: number, callback?: (err?: NodeJS.ErrnoException) => void): void;
    export function chownSync(path: string, uid: number, gid: number): void;
    export function fchown(fd: number, uid: number, gid: number, callback?: (err?: NodeJS.ErrnoException) => void): void;
    export function fchownSync(fd: number, uid: number, gid: number): void;
    export function lchown(path: string, uid: number, gid: number, callback?: (err?: NodeJS.ErrnoException) => void): void;
    export function lchownSync(path: string, uid: number, gid: number): void;
    export function chmod(path: string, mode: number, callback?: (err?: NodeJS.ErrnoException) => void): void;
    export function chmod(path: string, mode: string, callback?: (err?: NodeJS.ErrnoException) => void): void;
    export function chmodSync(path: string, mode: number): void;
    export function chmodSync(path: string, mode: string): void;
    export function fchmod(fd: number, mode: number, callback?: (err?: NodeJS.ErrnoException) => void): void;
    export function fchmod(fd: number, mode: string, callback?: (err?: NodeJS.ErrnoException) => void): void;
    export function fchmodSync(fd: number, mode: number): void;
    export function fchmodSync(fd: number, mode: string): void;
    export function lchmod(path: string, mode: number, callback?: (err?: NodeJS.ErrnoException) => void): void;
    export function lchmod(path: string, mode: string, callback?: (err?: NodeJS.ErrnoException) => void): void;
    export function lchmodSync(path: string, mode: number): void;
    export function lchmodSync(path: string, mode: string): void;
    export function stat(path: string, callback?: (err: NodeJS.ErrnoException, stats: Stats) => any): void;
    export function lstat(path: string, callback?: (err: NodeJS.ErrnoException, stats: Stats) => any): void;
    export function fstat(fd: number, callback?: (err: NodeJS.ErrnoException, stats: Stats) => any): void;
    export function statSync(path: string): Stats;
    export function lstatSync(path: string): Stats;
    export function fstatSync(fd: number): Stats;
    export function link(srcpath: string, dstpath: string, callback?: (err?: NodeJS.ErrnoException) => void): void;
    export function linkSync(srcpath: string, dstpath: string): void;
    export function symlink(srcpath: string, dstpath: string, type?: string, callback?: (err?: NodeJS.ErrnoException) => void): void;
    export function symlinkSync(srcpath: string, dstpath: string, type?: string): void;
    export function readlink(path: string, callback?: (err: NodeJS.ErrnoException, linkString: string) => any): void;
    export function readlinkSync(path: string): string;
    export function realpath(path: string, callback?: (err: NodeJS.ErrnoException, resolvedPath: string) => any): void;
    export function realpath(path: string, cache: {[path: string]: string}, callback: (err: NodeJS.ErrnoException, resolvedPath: string) =>any): void;
    export function realpathSync(path: string, cache?: { [path: string]: string }): string;
    /*
     * Asynchronous unlink - deletes the file specified in {path}
     *
     * @param path
     * @param callback No arguments other than a possible exception are given to the completion callback.
     */
    export function unlink(path: string, callback?: (err?: NodeJS.ErrnoException) => void): void;
    /*
     * Synchronous unlink - deletes the file specified in {path}
     *
     * @param path
     */
    export function unlinkSync(path: string): void;
    /*
     * Asynchronous rmdir - removes the directory specified in {path}
     *
     * @param path
     * @param callback No arguments other than a possible exception are given to the completion callback.
     */
    export function rmdir(path: string, callback?: (err?: NodeJS.ErrnoException) => void): void;
    /*
     * Synchronous rmdir - removes the directory specified in {path}
     *
     * @param path
     */
    export function rmdirSync(path: string): void;
    /*
     * Asynchronous mkdir - creates the directory specified in {path}.  Parameter {mode} defaults to 0777.
     *
     * @param path
     * @param callback No arguments other than a possible exception are given to the completion callback.
     */
    export function mkdir(path: string, callback?: (err?: NodeJS.ErrnoException) => void): void;
    /*
     * Asynchronous mkdir - creates the directory specified in {path}.  Parameter {mode} defaults to 0777.
     *
     * @param path
     * @param mode
     * @param callback No arguments other than a possible exception are given to the completion callback.
     */
    export function mkdir(path: string, mode: number, callback?: (err?: NodeJS.ErrnoException) => void): void;
    /*
     * Asynchronous mkdir - creates the directory specified in {path}.  Parameter {mode} defaults to 0777.
     *
     * @param path
     * @param mode
     * @param callback No arguments other than a possible exception are given to the completion callback.
     */
    export function mkdir(path: string, mode: string, callback?: (err?: NodeJS.ErrnoException) => void): void;
    /*
     * Synchronous mkdir - creates the directory specified in {path}.  Parameter {mode} defaults to 0777.
     *
     * @param path
     * @param mode
     * @param callback No arguments other than a possible exception are given to the completion callback.
     */
    export function mkdirSync(path: string, mode?: number): void;
    /*
     * Synchronous mkdir - creates the directory specified in {path}.  Parameter {mode} defaults to 0777.
     *
     * @param path
     * @param mode
     * @param callback No arguments other than a possible exception are given to the completion callback.
     */
    export function mkdirSync(path: string, mode?: string): void;
    export function readdir(path: string, callback?: (err: NodeJS.ErrnoException, files: string[]) => void): void;
    export function readdirSync(path: string): string[];
    export function close(fd: number, callback?: (err?: NodeJS.ErrnoException) => void): void;
    export function closeSync(fd: number): void;
    export function open(path: string, flags: string, callback?: (err: NodeJS.ErrnoException, fd: number) => any): void;
    export function open(path: string, flags: string, mode: number, callback?: (err: NodeJS.ErrnoException, fd: number) => any): void;
    export function open(path: string, flags: string, mode: string, callback?: (err: NodeJS.ErrnoException, fd: number) => any): void;
    export function openSync(path: string, flags: string, mode?: number): number;
    export function openSync(path: string, flags: string, mode?: string): number;
    export function utimes(path: string, atime: number, mtime: number, callback?: (err?: NodeJS.ErrnoException) => void): void;
    export function utimes(path: string, atime: Date, mtime: Date, callback?: (err?: NodeJS.ErrnoException) => void): void;
    export function utimesSync(path: string, atime: number, mtime: number): void;
    export function utimesSync(path: string, atime: Date, mtime: Date): void;
    export function futimes(fd: number, atime: number, mtime: number, callback?: (err?: NodeJS.ErrnoException) => void): void;
    export function futimes(fd: number, atime: Date, mtime: Date, callback?: (err?: NodeJS.ErrnoException) => void): void;
    export function futimesSync(fd: number, atime: number, mtime: number): void;
    export function futimesSync(fd: number, atime: Date, mtime: Date): void;
    export function fsync(fd: number, callback?: (err?: NodeJS.ErrnoException) => void): void;
    export function fsyncSync(fd: number): void;
    export function write(fd: number, buffer: Buffer, offset: number, length: number, position: number, callback?: (err: NodeJS.ErrnoException, written: number, buffer: Buffer) => void): void;
    export function write(fd: number, buffer: Buffer, offset: number, length: number, callback?: (err: NodeJS.ErrnoException, written: number, buffer: Buffer) => void): void;
    export function write(fd: number, data: any, callback?: (err: NodeJS.ErrnoException, written: number, str: string) => void): void;
    export function write(fd: number, data: any, offset: number, callback?: (err: NodeJS.ErrnoException, written: number, str: string) => void): void;
    export function write(fd: number, data: any, offset: number, encoding: string, callback?: (err: NodeJS.ErrnoException, written: number, str: string) => void): void;
    export function writeSync(fd: number, buffer: Buffer, offset: number, length: number, position: number): number;
    export function read(fd: number, buffer: Buffer, offset: number, length: number, position: number, callback?: (err: NodeJS.ErrnoException, bytesRead: number, buffer: Buffer) => void): void;
    export function readSync(fd: number, buffer: Buffer, offset: number, length: number, position: number): number;
    /*
     * Asynchronous readFile - Asynchronously reads the entire contents of a file.
     *
     * @param fileName
     * @param encoding
     * @param callback - The callback is passed two arguments (err, data), where data is the contents of the file.
     */
    export function readFile(filename: string, encoding: string, callback: (err: NodeJS.ErrnoException, data: string) => void): void;
    /*
     * Asynchronous readFile - Asynchronously reads the entire contents of a file.
     *
     * @param fileName
     * @param options An object with optional {encoding} and {flag} properties.  If {encoding} is specified, readFile returns a string; otherwise it returns a Buffer.
     * @param callback - The callback is passed two arguments (err, data), where data is the contents of the file.
     */
    export function readFile(filename: string, options: { encoding: string; flag?: string; }, callback: (err: NodeJS.ErrnoException, data: string) => void): void;
    /*
     * Asynchronous readFile - Asynchronously reads the entire contents of a file.
     *
     * @param fileName
     * @param options An object with optional {encoding} and {flag} properties.  If {encoding} is specified, readFile returns a string; otherwise it returns a Buffer.
     * @param callback - The callback is passed two arguments (err, data), where data is the contents of the file.
     */
    export function readFile(filename: string, options: { flag?: string; }, callback: (err: NodeJS.ErrnoException, data: Buffer) => void): void;
    /*
     * Asynchronous readFile - Asynchronously reads the entire contents of a file.
     *
     * @param fileName
     * @param callback - The callback is passed two arguments (err, data), where data is the contents of the file.
     */
    export function readFile(filename: string, callback: (err: NodeJS.ErrnoException, data: Buffer) => void): void;
    /*
     * Synchronous readFile - Synchronously reads the entire contents of a file.
     *
     * @param fileName
     * @param encoding
     */
    export function readFileSync(filename: string, encoding: string): string;
    /*
     * Synchronous readFile - Synchronously reads the entire contents of a file.
     *
     * @param fileName
     * @param options An object with optional {encoding} and {flag} properties.  If {encoding} is specified, readFileSync returns a string; otherwise it returns a Buffer.
     */
    export function readFileSync(filename: string, options: { encoding: string; flag?: string; }): string;
    /*
     * Synchronous readFile - Synchronously reads the entire contents of a file.
     *
     * @param fileName
     * @param options An object with optional {encoding} and {flag} properties.  If {encoding} is specified, readFileSync returns a string; otherwise it returns a Buffer.
     */
    export function readFileSync(filename: string, options?: { flag?: string; }): Buffer;
    export function writeFile(filename: string, data: any, callback?: (err: NodeJS.ErrnoException) => void): void;
    export function writeFile(filename: string, data: any, options: { encoding?: string; mode?: number; flag?: string; }, callback?: (err: NodeJS.ErrnoException) => void): void;
    export function writeFile(filename: string, data: any, options: { encoding?: string; mode?: string; flag?: string; }, callback?: (err: NodeJS.ErrnoException) => void): void;
    export function writeFileSync(filename: string, data: any, options?: { encoding?: string; mode?: number; flag?: string; }): void;
    export function writeFileSync(filename: string, data: any, options?: { encoding?: string; mode?: string; flag?: string; }): void;
    export function appendFile(filename: string, data: any, options: { encoding?: string; mode?: number; flag?: string; }, callback?: (err: NodeJS.ErrnoException) => void): void;
    export function appendFile(filename: string, data: any, options: { encoding?: string; mode?: string; flag?: string; }, callback?: (err: NodeJS.ErrnoException) => void): void;
    export function appendFile(filename: string, data: any, callback?: (err: NodeJS.ErrnoException) => void): void;
    export function appendFileSync(filename: string, data: any, options?: { encoding?: string; mode?: number; flag?: string; }): void;
    export function appendFileSync(filename: string, data: any, options?: { encoding?: string; mode?: string; flag?: string; }): void;
    export function watchFile(filename: string, listener: (curr: Stats, prev: Stats) => void): void;
    export function watchFile(filename: string, options: { persistent?: boolean; interval?: number; }, listener: (curr: Stats, prev: Stats) => void): void;
    export function unwatchFile(filename: string, listener?: (curr: Stats, prev: Stats) => void): void;
    export function watch(filename: string, listener?: (event: string, filename: string) => any): FSWatcher;
    export function watch(filename: string, options: { persistent?: boolean; }, listener?: (event: string, filename: string) => any): FSWatcher;
    export function exists(path: string, callback?: (exists: boolean) => void): void;
    export function existsSync(path: string): boolean;
    /** Constant for fs.access(). File is visible to the calling process. */
    export var F_OK: number;
    /** Constant for fs.access(). File can be read by the calling process. */
    export var R_OK: number;
    /** Constant for fs.access(). File can be written by the calling process. */
    export var W_OK: number;
    /** Constant for fs.access(). File can be executed by the calling process. */
    export var X_OK: number;
    /** Tests a user's permissions for the file specified by path. */
    export function access(path: string, callback: (err: NodeJS.ErrnoException) => void): void;
    export function access(path: string, mode: number, callback: (err: NodeJS.ErrnoException) => void): void;
    /** Synchronous version of fs.access. This throws if any accessibility checks fail, and does nothing otherwise. */
    export function accessSync(path: string, mode ?: number): void;
    export function createReadStream(path: string, options?: {
        flags?: string;
        encoding?: string;
        fd?: number;
        mode?: number;
        autoClose?: boolean;
    }): ReadStream;
    export function createWriteStream(path: string, options?: {
        flags?: string;
        encoding?: string;
        fd?: number;
        mode?: number;
    }): WriteStream;
}

declare module "path" {

    /**
     * A parsed path object generated by path.parse() or consumed by path.format().
     */
    export interface ParsedPath {
        /**
         * The root of the path such as '/' or 'c:\'
         */
        root: string;
        /**
         * The full directory path such as '/home/user/dir' or 'c:\path\dir'
         */
        dir: string;
        /**
         * The file name including extension (if any) such as 'index.html'
         */
        base: string;
        /**
         * The file extension (if any) such as '.html'
         */
        ext: string;
        /**
         * The file name without extension (if any) such as 'index'
         */
        name: string;
    }

    /**
     * Normalize a string path, reducing '..' and '.' parts.
     * When multiple slashes are found, they're replaced by a single one; when the path contains a trailing slash, it is preserved. On Windows backslashes are used.
     *
     * @param p string path to normalize.
     */
    export function normalize(p: string): string;
    /**
     * Join all arguments together and normalize the resulting path.
     * Arguments must be strings. In v0.8, non-string arguments were silently ignored. In v0.10 and up, an exception is thrown.
     *
     * @param paths string paths to join.
     */
    export function join(...paths: any[]): string;
    /**
     * Join all arguments together and normalize the resulting path.
     * Arguments must be strings. In v0.8, non-string arguments were silently ignored. In v0.10 and up, an exception is thrown.
     *
     * @param paths string paths to join.
     */
    export function join(...paths: string[]): string;
    /**
     * The right-most parameter is considered {to}.  Other parameters are considered an array of {from}.
     *
     * Starting from leftmost {from} paramter, resolves {to} to an absolute path.
     *
     * If {to} isn't already absolute, {from} arguments are prepended in right to left order, until an absolute path is found. If after using all {from} paths still no absolute path is found, the current working directory is used as well. The resulting path is normalized, and trailing slashes are removed unless the path gets resolved to the root directory.
     *
     * @param pathSegments string paths to join.  Non-string arguments are ignored.
     */
    export function resolve(...pathSegments: any[]): string;
    /**
     * Determines whether {path} is an absolute path. An absolute path will always resolve to the same location, regardless of the working directory.
     *
     * @param path path to test.
     */
    export function isAbsolute(path: string): boolean;
    /**
     * Solve the relative path from {from} to {to}.
     * At times we have two absolute paths, and we need to derive the relative path from one to the other. This is actually the reverse transform of path.resolve.
     *
     * @param from
     * @param to
     */
    export function relative(from: string, to: string): string;
    /**
     * Return the directory name of a path. Similar to the Unix dirname command.
     *
     * @param p the path to evaluate.
     */
    export function dirname(p: string): string;
    /**
     * Return the last portion of a path. Similar to the Unix basename command.
     * Often used to extract the file name from a fully qualified path.
     *
     * @param p the path to evaluate.
     * @param ext optionally, an extension to remove from the result.
     */
    export function basename(p: string, ext?: string): string;
    /**
     * Return the extension of the path, from the last '.' to end of string in the last portion of the path.
     * If there is no '.' in the last portion of the path or the first character of it is '.', then it returns an empty string
     *
     * @param p the path to evaluate.
     */
    export function extname(p: string): string;
    /**
     * The platform-specific file separator. '\\' or '/'.
     */
    export var sep: string;
    /**
     * The platform-specific file delimiter. ';' or ':'.
     */
    export var delimiter: string;
    /**
     * Returns an object from a path string - the opposite of format().
     *
     * @param pathString path to evaluate.
     */
    export function parse(pathString: string): ParsedPath;
    /**
     * Returns a path string from an object - the opposite of parse().
     *
     * @param pathString path to evaluate.
     */
    export function format(pathObject: ParsedPath): string;

    export module posix {
      export function normalize(p: string): string;
      export function join(...paths: any[]): string;
      export function resolve(...pathSegments: any[]): string;
      export function isAbsolute(p: string): boolean;
      export function relative(from: string, to: string): string;
      export function dirname(p: string): string;
      export function basename(p: string, ext?: string): string;
      export function extname(p: string): string;
      export var sep: string;
      export var delimiter: string;
      export function parse(p: string): ParsedPath;
      export function format(pP: ParsedPath): string;
    }

    export module win32 {
      export function normalize(p: string): string;
      export function join(...paths: any[]): string;
      export function resolve(...pathSegments: any[]): string;
      export function isAbsolute(p: string): boolean;
      export function relative(from: string, to: string): string;
      export function dirname(p: string): string;
      export function basename(p: string, ext?: string): string;
      export function extname(p: string): string;
      export var sep: string;
      export var delimiter: string;
      export function parse(p: string): ParsedPath;
      export function format(pP: ParsedPath): string;
    }
}

declare module "string_decoder" {
    export interface NodeStringDecoder {
        write(buffer: Buffer): string;
        detectIncompleteChar(buffer: Buffer): number;
    }
    export var StringDecoder: {
        new (encoding: string): NodeStringDecoder;
    };
}

declare module "tls" {
    import * as crypto from "crypto";
    import * as net from "net";
    import * as stream from "stream";

    var CLIENT_RENEG_LIMIT: number;
    var CLIENT_RENEG_WINDOW: number;

    export interface TlsOptions {
        host?: string;
        port?: number;
        pfx?: any;   //string or buffer
        key?: any;   //string or buffer
        passphrase?: string;
        cert?: any;
        ca?: any;    //string or buffer
        crl?: any;   //string or string array
        ciphers?: string;
        honorCipherOrder?: any;
        requestCert?: boolean;
        rejectUnauthorized?: boolean;
        NPNProtocols?: any;  //array or Buffer;
        SNICallback?: (servername: string) => any;
    }

    export interface ConnectionOptions {
        host?: string;
        port?: number;
        socket?: net.Socket;
        pfx?: any;   //string | Buffer
        key?: any;   //string | Buffer
        passphrase?: string;
        cert?: any;  //string | Buffer
        ca?: any;    //Array of string | Buffer
        rejectUnauthorized?: boolean;
        NPNProtocols?: any;  //Array of string | Buffer
        servername?: string;
    }

    export interface Server extends net.Server {
        // Extended base methods
        listen(port: number, host?: string, backlog?: number, listeningListener?: Function): Server;
        listen(path: string, listeningListener?: Function): Server;
        listen(handle: any, listeningListener?: Function): Server;

        listen(port: number, host?: string, callback?: Function): Server;
        close(): Server;
        address(): { port: number; family: string; address: string; };
        addContext(hostName: string, credentials: {
            key: string;
            cert: string;
            ca: string;
        }): void;
        maxConnections: number;
        connections: number;
    }

    export interface ClearTextStream extends stream.Duplex {
        authorized: boolean;
        authorizationError: Error;
        getPeerCertificate(): any;
        getCipher: {
            name: string;
            version: string;
        };
        address: {
            port: number;
            family: string;
            address: string;
        };
        remoteAddress: string;
        remotePort: number;
    }

    export interface SecurePair {
        encrypted: any;
        cleartext: any;
    }

    export interface SecureContextOptions {
        pfx?: any;   //string | buffer
        key?: any;   //string | buffer
        passphrase?: string;
        cert?: any;  // string | buffer
        ca?: any;    // string | buffer
        crl?: any;   // string | string[]
        ciphers?: string;
        honorCipherOrder?: boolean;
    }

    export interface SecureContext {
        context: any;
    }

    export function createServer(options: TlsOptions, secureConnectionListener?: (cleartextStream: ClearTextStream) =>void ): Server;
    export function connect(options: TlsOptions, secureConnectionListener?: () =>void ): ClearTextStream;
    export function connect(port: number, host?: string, options?: ConnectionOptions, secureConnectListener?: () =>void ): ClearTextStream;
    export function connect(port: number, options?: ConnectionOptions, secureConnectListener?: () =>void ): ClearTextStream;
    export function createSecurePair(credentials?: crypto.Credentials, isServer?: boolean, requestCert?: boolean, rejectUnauthorized?: boolean): SecurePair;
    export function createSecureContext(details: SecureContextOptions): SecureContext;
}

declare module "crypto" {
    export interface CredentialDetails {
        pfx: string;
        key: string;
        passphrase: string;
        cert: string;
        ca: any;    //string | string array
        crl: any;   //string | string array
        ciphers: string;
    }
    export interface Credentials { context?: any; }
    export function createCredentials(details: CredentialDetails): Credentials;
    export function createHash(algorithm: string): Hash;
    export function createHmac(algorithm: string, key: string): Hmac;
    export function createHmac(algorithm: string, key: Buffer): Hmac;
    interface Hash {
        update(data: any, input_encoding?: string): Hash;
        digest(encoding: 'buffer'): Buffer;
        digest(encoding: string): any;
        digest(): Buffer;
    }
    interface Hmac {
        update(data: any, input_encoding?: string): Hmac;
        digest(encoding: 'buffer'): Buffer;
        digest(encoding: string): any;
        digest(): Buffer;
    }
    export function createCipher(algorithm: string, password: any): Cipher;
    export function createCipheriv(algorithm: string, key: any, iv: any): Cipher;
    interface Cipher {
        update(data: Buffer): Buffer;
        update(data: string, input_encoding?: string, output_encoding?: string): string;
        final(): Buffer;
        final(output_encoding: string): string;
        setAutoPadding(auto_padding: boolean): void;
    }
    export function createDecipher(algorithm: string, password: any): Decipher;
    export function createDecipheriv(algorithm: string, key: any, iv: any): Decipher;
    interface Decipher {
        update(data: Buffer): Buffer;
        update(data: string, input_encoding?: string, output_encoding?: string): string;
        final(): Buffer;
        final(output_encoding: string): string;
        setAutoPadding(auto_padding: boolean): void;
    }
    export function createSign(algorithm: string): Signer;
    interface Signer extends NodeJS.WritableStream {
        update(data: any): void;
        sign(private_key: string, output_format: string): string;
    }
    export function createVerify(algorith: string): Verify;
    interface Verify extends NodeJS.WritableStream {
        update(data: any): void;
        verify(object: string, signature: string, signature_format?: string): boolean;
    }
    export function createDiffieHellman(prime_length: number): DiffieHellman;
    export function createDiffieHellman(prime: number, encoding?: string): DiffieHellman;
    interface DiffieHellman {
        generateKeys(encoding?: string): string;
        computeSecret(other_public_key: string, input_encoding?: string, output_encoding?: string): string;
        getPrime(encoding?: string): string;
        getGenerator(encoding: string): string;
        getPublicKey(encoding?: string): string;
        getPrivateKey(encoding?: string): string;
        setPublicKey(public_key: string, encoding?: string): void;
        setPrivateKey(public_key: string, encoding?: string): void;
    }
    export function getDiffieHellman(group_name: string): DiffieHellman;
    export function pbkdf2(password: string|Buffer, salt: string|Buffer, iterations: number, keylen: number, callback: (err: Error, derivedKey: Buffer) => any): void;
    export function pbkdf2(password: string|Buffer, salt: string|Buffer, iterations: number, keylen: number, digest: string, callback: (err: Error, derivedKey: Buffer) => any): void;
    export function pbkdf2Sync(password: string|Buffer, salt: string|Buffer, iterations: number, keylen: number) : Buffer;
    export function pbkdf2Sync(password: string|Buffer, salt: string|Buffer, iterations: number, keylen: number, digest: string) : Buffer;
    export function randomBytes(size: number): Buffer;
    export function randomBytes(size: number, callback: (err: Error, buf: Buffer) =>void ): void;
    export function pseudoRandomBytes(size: number): Buffer;
    export function pseudoRandomBytes(size: number, callback: (err: Error, buf: Buffer) =>void ): void;
}

declare module "stream" {
    import * as events from "events";

    export class Stream extends events.EventEmitter {
        pipe<T extends NodeJS.WritableStream>(destination: T, options?: { end?: boolean; }): T;
    }

    export interface ReadableOptions {
        highWaterMark?: number;
        encoding?: string;
        objectMode?: boolean;
    }

    export class Readable extends events.EventEmitter implements NodeJS.ReadableStream {
        readable: boolean;
        constructor(opts?: ReadableOptions);
        _read(size: number): void;
        read(size?: number): any;
        setEncoding(encoding: string): void;
        pause(): void;
        resume(): void;
        pipe<T extends NodeJS.WritableStream>(destination: T, options?: { end?: boolean; }): T;
        unpipe<T extends NodeJS.WritableStream>(destination?: T): void;
        unshift(chunk: any): void;
        wrap(oldStream: NodeJS.ReadableStream): NodeJS.ReadableStream;
        push(chunk: any, encoding?: string): boolean;
    }

    export interface WritableOptions {
        highWaterMark?: number;
        decodeStrings?: boolean;
        objectMode?: boolean;
    }

    export class Writable extends events.EventEmitter implements NodeJS.WritableStream {
        writable: boolean;
        constructor(opts?: WritableOptions);
        _write(chunk: any, encoding: string, callback: Function): void;
        write(chunk: any, cb?: Function): boolean;
        write(chunk: any, encoding?: string, cb?: Function): boolean;
        end(): void;
        end(chunk: any, cb?: Function): void;
        end(chunk: any, encoding?: string, cb?: Function): void;
    }

    export interface DuplexOptions extends ReadableOptions, WritableOptions {
        allowHalfOpen?: boolean;
    }

    // Note: Duplex extends both Readable and Writable.
    export class Duplex extends Readable implements NodeJS.ReadWriteStream {
        writable: boolean;
        constructor(opts?: DuplexOptions);
        _write(chunk: any, encoding: string, callback: Function): void;
        write(chunk: any, cb?: Function): boolean;
        write(chunk: any, encoding?: string, cb?: Function): boolean;
        end(): void;
        end(chunk: any, cb?: Function): void;
        end(chunk: any, encoding?: string, cb?: Function): void;
    }

    export interface TransformOptions extends ReadableOptions, WritableOptions {}

    // Note: Transform lacks the _read and _write methods of Readable/Writable.
    export class Transform extends events.EventEmitter implements NodeJS.ReadWriteStream {
        readable: boolean;
        writable: boolean;
        constructor(opts?: TransformOptions);
        _transform(chunk: any, encoding: string, callback: Function): void;
        _flush(callback: Function): void;
        read(size?: number): any;
        setEncoding(encoding: string): void;
        pause(): void;
        resume(): void;
        pipe<T extends NodeJS.WritableStream>(destination: T, options?: { end?: boolean; }): T;
        unpipe<T extends NodeJS.WritableStream>(destination?: T): void;
        unshift(chunk: any): void;
        wrap(oldStream: NodeJS.ReadableStream): NodeJS.ReadableStream;
        push(chunk: any, encoding?: string): boolean;
        write(chunk: any, cb?: Function): boolean;
        write(chunk: any, encoding?: string, cb?: Function): boolean;
        end(): void;
        end(chunk: any, cb?: Function): void;
        end(chunk: any, encoding?: string, cb?: Function): void;
    }

    export class PassThrough extends Transform {}
}

declare module "util" {
    export interface InspectOptions {
        showHidden?: boolean;
        depth?: number;
        colors?: boolean;
        customInspect?: boolean;
    }

    export function format(format: any, ...param: any[]): string;
    export function debug(string: string): void;
    export function error(...param: any[]): void;
    export function puts(...param: any[]): void;
    export function print(...param: any[]): void;
    export function log(string: string): void;
    export function inspect(object: any, showHidden?: boolean, depth?: number, color?: boolean): string;
    export function inspect(object: any, options: InspectOptions): string;
    export function isArray(object: any): boolean;
    export function isRegExp(object: any): boolean;
    export function isDate(object: any): boolean;
    export function isError(object: any): boolean;
    export function inherits(constructor: any, superConstructor: any): void;
    export function debuglog(key:string): (msg:string,...param: any[])=>void;
}

declare module "assert" {
    function internal (value: any, message?: string): void;
    module internal {
        export class AssertionError implements Error {
            name: string;
            message: string;
            actual: any;
            expected: any;
            operator: string;
            generatedMessage: boolean;

            constructor(options?: {message?: string; actual?: any; expected?: any;
                                  operator?: string; stackStartFunction?: Function});
        }

        export function fail(actual?: any, expected?: any, message?: string, operator?: string): void;
        export function ok(value: any, message?: string): void;
        export function equal(actual: any, expected: any, message?: string): void;
        export function notEqual(actual: any, expected: any, message?: string): void;
        export function deepEqual(actual: any, expected: any, message?: string): void;
        export function notDeepEqual(acutal: any, expected: any, message?: string): void;
        export function strictEqual(actual: any, expected: any, message?: string): void;
        export function notStrictEqual(actual: any, expected: any, message?: string): void;
        export function deepStrictEqual(actual: any, expected: any, message?: string): void;
        export function notDeepStrictEqual(actual: any, expected: any, message?: string): void;
        export var throws: {
            (block: Function, message?: string): void;
            (block: Function, error: Function, message?: string): void;
            (block: Function, error: RegExp, message?: string): void;
            (block: Function, error: (err: any) => boolean, message?: string): void;
        };

        export var doesNotThrow: {
            (block: Function, message?: string): void;
            (block: Function, error: Function, message?: string): void;
            (block: Function, error: RegExp, message?: string): void;
            (block: Function, error: (err: any) => boolean, message?: string): void;
        };

        export function ifError(value: any): void;
    }

    export = internal;
}

declare module "tty" {
    import * as net from "net";

    export function isatty(fd: number): boolean;
    export interface ReadStream extends net.Socket {
        isRaw: boolean;
        setRawMode(mode: boolean): void;
    }
    export interface WriteStream extends net.Socket {
        columns: number;
        rows: number;
    }
}

declare module "domain" {
    import * as events from "events";

    export class Domain extends events.EventEmitter {
        run(fn: Function): void;
        add(emitter: events.EventEmitter): void;
        remove(emitter: events.EventEmitter): void;
        bind(cb: (err: Error, data: any) => any): any;
        intercept(cb: (data: any) => any): any;
        dispose(): void;

        addListener(event: string, listener: Function): Domain;
        on(event: string, listener: Function): Domain;
        once(event: string, listener: Function): Domain;
        removeListener(event: string, listener: Function): Domain;
        removeAllListeners(event?: string): Domain;
    }

    export function create(): Domain;
}

declare module "constants" {
    export var E2BIG: number;
    export var EACCES: number;
    export var EADDRINUSE: number;
    export var EADDRNOTAVAIL: number;
    export var EAFNOSUPPORT: number;
    export var EAGAIN: number;
    export var EALREADY: number;
    export var EBADF: number;
    export var EBADMSG: number;
    export var EBUSY: number;
    export var ECANCELED: number;
    export var ECHILD: number;
    export var ECONNABORTED: number;
    export var ECONNREFUSED: number;
    export var ECONNRESET: number;
    export var EDEADLK: number;
    export var EDESTADDRREQ: number;
    export var EDOM: number;
    export var EEXIST: number;
    export var EFAULT: number;
    export var EFBIG: number;
    export var EHOSTUNREACH: number;
    export var EIDRM: number;
    export var EILSEQ: number;
    export var EINPROGRESS: number;
    export var EINTR: number;
    export var EINVAL: number;
    export var EIO: number;
    export var EISCONN: number;
    export var EISDIR: number;
    export var ELOOP: number;
    export var EMFILE: number;
    export var EMLINK: number;
    export var EMSGSIZE: number;
    export var ENAMETOOLONG: number;
    export var ENETDOWN: number;
    export var ENETRESET: number;
    export var ENETUNREACH: number;
    export var ENFILE: number;
    export var ENOBUFS: number;
    export var ENODATA: number;
    export var ENODEV: number;
    export var ENOENT: number;
    export var ENOEXEC: number;
    export var ENOLCK: number;
    export var ENOLINK: number;
    export var ENOMEM: number;
    export var ENOMSG: number;
    export var ENOPROTOOPT: number;
    export var ENOSPC: number;
    export var ENOSR: number;
    export var ENOSTR: number;
    export var ENOSYS: number;
    export var ENOTCONN: number;
    export var ENOTDIR: number;
    export var ENOTEMPTY: number;
    export var ENOTSOCK: number;
    export var ENOTSUP: number;
    export var ENOTTY: number;
    export var ENXIO: number;
    export var EOPNOTSUPP: number;
    export var EOVERFLOW: number;
    export var EPERM: number;
    export var EPIPE: number;
    export var EPROTO: number;
    export var EPROTONOSUPPORT: number;
    export var EPROTOTYPE: number;
    export var ERANGE: number;
    export var EROFS: number;
    export var ESPIPE: number;
    export var ESRCH: number;
    export var ETIME: number;
    export var ETIMEDOUT: number;
    export var ETXTBSY: number;
    export var EWOULDBLOCK: number;
    export var EXDEV: number;
    export var WSAEINTR: number;
    export var WSAEBADF: number;
    export var WSAEACCES: number;
    export var WSAEFAULT: number;
    export var WSAEINVAL: number;
    export var WSAEMFILE: number;
    export var WSAEWOULDBLOCK: number;
    export var WSAEINPROGRESS: number;
    export var WSAEALREADY: number;
    export var WSAENOTSOCK: number;
    export var WSAEDESTADDRREQ: number;
    export var WSAEMSGSIZE: number;
    export var WSAEPROTOTYPE: number;
    export var WSAENOPROTOOPT: number;
    export var WSAEPROTONOSUPPORT: number;
    export var WSAESOCKTNOSUPPORT: number;
    export var WSAEOPNOTSUPP: number;
    export var WSAEPFNOSUPPORT: number;
    export var WSAEAFNOSUPPORT: number;
    export var WSAEADDRINUSE: number;
    export var WSAEADDRNOTAVAIL: number;
    export var WSAENETDOWN: number;
    export var WSAENETUNREACH: number;
    export var WSAENETRESET: number;
    export var WSAECONNABORTED: number;
    export var WSAECONNRESET: number;
    export var WSAENOBUFS: number;
    export var WSAEISCONN: number;
    export var WSAENOTCONN: number;
    export var WSAESHUTDOWN: number;
    export var WSAETOOMANYREFS: number;
    export var WSAETIMEDOUT: number;
    export var WSAECONNREFUSED: number;
    export var WSAELOOP: number;
    export var WSAENAMETOOLONG: number;
    export var WSAEHOSTDOWN: number;
    export var WSAEHOSTUNREACH: number;
    export var WSAENOTEMPTY: number;
    export var WSAEPROCLIM: number;
    export var WSAEUSERS: number;
    export var WSAEDQUOT: number;
    export var WSAESTALE: number;
    export var WSAEREMOTE: number;
    export var WSASYSNOTREADY: number;
    export var WSAVERNOTSUPPORTED: number;
    export var WSANOTINITIALISED: number;
    export var WSAEDISCON: number;
    export var WSAENOMORE: number;
    export var WSAECANCELLED: number;
    export var WSAEINVALIDPROCTABLE: number;
    export var WSAEINVALIDPROVIDER: number;
    export var WSAEPROVIDERFAILEDINIT: number;
    export var WSASYSCALLFAILURE: number;
    export var WSASERVICE_NOT_FOUND: number;
    export var WSATYPE_NOT_FOUND: number;
    export var WSA_E_NO_MORE: number;
    export var WSA_E_CANCELLED: number;
    export var WSAEREFUSED: number;
    export var SIGHUP: number;
    export var SIGINT: number;
    export var SIGILL: number;
    export var SIGABRT: number;
    export var SIGFPE: number;
    export var SIGKILL: number;
    export var SIGSEGV: number;
    export var SIGTERM: number;
    export var SIGBREAK: number;
    export var SIGWINCH: number;
    export var SSL_OP_ALL: number;
    export var SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION: number;
    export var SSL_OP_CIPHER_SERVER_PREFERENCE: number;
    export var SSL_OP_CISCO_ANYCONNECT: number;
    export var SSL_OP_COOKIE_EXCHANGE: number;
    export var SSL_OP_CRYPTOPRO_TLSEXT_BUG: number;
    export var SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS: number;
    export var SSL_OP_EPHEMERAL_RSA: number;
    export var SSL_OP_LEGACY_SERVER_CONNECT: number;
    export var SSL_OP_MICROSOFT_BIG_SSLV3_BUFFER: number;
    export var SSL_OP_MICROSOFT_SESS_ID_BUG: number;
    export var SSL_OP_MSIE_SSLV2_RSA_PADDING: number;
    export var SSL_OP_NETSCAPE_CA_DN_BUG: number;
    export var SSL_OP_NETSCAPE_CHALLENGE_BUG: number;
    export var SSL_OP_NETSCAPE_DEMO_CIPHER_CHANGE_BUG: number;
    export var SSL_OP_NETSCAPE_REUSE_CIPHER_CHANGE_BUG: number;
    export var SSL_OP_NO_COMPRESSION: number;
    export var SSL_OP_NO_QUERY_MTU: number;
    export var SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION: number;
    export var SSL_OP_NO_SSLv2: number;
    export var SSL_OP_NO_SSLv3: number;
    export var SSL_OP_NO_TICKET: number;
    export var SSL_OP_NO_TLSv1: number;
    export var SSL_OP_NO_TLSv1_1: number;
    export var SSL_OP_NO_TLSv1_2: number;
    export var SSL_OP_PKCS1_CHECK_1: number;
    export var SSL_OP_PKCS1_CHECK_2: number;
    export var SSL_OP_SINGLE_DH_USE: number;
    export var SSL_OP_SINGLE_ECDH_USE: number;
    export var SSL_OP_SSLEAY_080_CLIENT_DH_BUG: number;
    export var SSL_OP_SSLREF2_REUSE_CERT_TYPE_BUG: number;
    export var SSL_OP_TLS_BLOCK_PADDING_BUG: number;
    export var SSL_OP_TLS_D5_BUG: number;
    export var SSL_OP_TLS_ROLLBACK_BUG: number;
    export var ENGINE_METHOD_DSA: number;
    export var ENGINE_METHOD_DH: number;
    export var ENGINE_METHOD_RAND: number;
    export var ENGINE_METHOD_ECDH: number;
    export var ENGINE_METHOD_ECDSA: number;
    export var ENGINE_METHOD_CIPHERS: number;
    export var ENGINE_METHOD_DIGESTS: number;
    export var ENGINE_METHOD_STORE: number;
    export var ENGINE_METHOD_PKEY_METHS: number;
    export var ENGINE_METHOD_PKEY_ASN1_METHS: number;
    export var ENGINE_METHOD_ALL: number;
    export var ENGINE_METHOD_NONE: number;
    export var DH_CHECK_P_NOT_SAFE_PRIME: number;
    export var DH_CHECK_P_NOT_PRIME: number;
    export var DH_UNABLE_TO_CHECK_GENERATOR: number;
    export var DH_NOT_SUITABLE_GENERATOR: number;
    export var NPN_ENABLED: number;
    export var RSA_PKCS1_PADDING: number;
    export var RSA_SSLV23_PADDING: number;
    export var RSA_NO_PADDING: number;
    export var RSA_PKCS1_OAEP_PADDING: number;
    export var RSA_X931_PADDING: number;
    export var RSA_PKCS1_PSS_PADDING: number;
    export var POINT_CONVERSION_COMPRESSED: number;
    export var POINT_CONVERSION_UNCOMPRESSED: number;
    export var POINT_CONVERSION_HYBRID: number;
    export var O_RDONLY: number;
    export var O_WRONLY: number;
    export var O_RDWR: number;
    export var S_IFMT: number;
    export var S_IFREG: number;
    export var S_IFDIR: number;
    export var S_IFCHR: number;
    export var S_IFLNK: number;
    export var O_CREAT: number;
    export var O_EXCL: number;
    export var O_TRUNC: number;
    export var O_APPEND: number;
    export var F_OK: number;
    export var R_OK: number;
    export var W_OK: number;
    export var X_OK: number;
    export var UV_UDP_REUSEADDR: number;
}
/**
 * Declarations angular depends on for compilation to ES6.
 * This file is also used to propagate our transitive typings
 * to users.
 */


// TODO: ideally the node.d.ts reference should be scoped only for files that need and not to all
//       the code including client code
/// <reference path="../typings/node/node.d.ts" />

declare var assert: any;


interface BrowserNodeGlobal {
  Object: typeof Object;
  Array: typeof Array;
  Map: typeof Map;
  Set: typeof Set;
  Date: typeof Date;
  RegExp: typeof RegExp;
  JSON: typeof JSON;
  Math: typeof Math;
  assert(condition: any): void;
  Reflect: any;
  zone: typeof Object;
  getAngularTestability: Function;
  getAllAngularTestabilities: Function;
  frameworkStabilizers: Array<Function>;
  setTimeout: Function;
  clearTimeout: Function;
  setInterval: Function;
  clearInterval: Function;
}
// Type definitions for es6-shim v0.31.2
// Project: https://github.com/paulmillr/es6-shim
// Definitions by: Ron Buckton <http://github.com/rbuckton>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

declare type PropertyKey = string | number | symbol;

interface IteratorResult<T> {
    done: boolean;
    value?: T;
}

interface IterableShim<T> {
    /**
      * Shim for an ES6 iterable. Not intended for direct use by user code.
      */
    "_es6-shim iterator_"(): Iterator<T>;
}

interface Iterator<T> {
    next(value?: any): IteratorResult<T>;
    return?(value?: any): IteratorResult<T>;
    throw?(e?: any): IteratorResult<T>;
}

interface IterableIteratorShim<T> extends IterableShim<T>, Iterator<T> {
    /**
      * Shim for an ES6 iterable iterator. Not intended for direct use by user code.
      */
    "_es6-shim iterator_"(): IterableIteratorShim<T>;
}

interface StringConstructor {
    /**
      * Return the String value whose elements are, in order, the elements in the List elements.
      * If length is 0, the empty string is returned.
      */
    fromCodePoint(...codePoints: number[]): string;

    /**
      * String.raw is intended for use as a tag function of a Tagged Template String. When called
      * as such the first argument will be a well formed template call site object and the rest
      * parameter will contain the substitution values.
      * @param template A well-formed template string call site representation.
      * @param substitutions A set of substitution values.
      */
    raw(template: TemplateStringsArray, ...substitutions: any[]): string;
}

interface String {
    /**
      * Returns a nonnegative integer Number less than 1114112 (0x110000) that is the code point
      * value of the UTF-16 encoded code point starting at the string element at position pos in
      * the String resulting from converting this object to a String.
      * If there is no element at that position, the result is undefined.
      * If a valid UTF-16 surrogate pair does not begin at pos, the result is the code unit at pos.
      */
    codePointAt(pos: number): number;

    /**
      * Returns true if searchString appears as a substring of the result of converting this
      * object to a String, at one or more positions that are
      * greater than or equal to position; otherwise, returns false.
      * @param searchString search string
      * @param position If position is undefined, 0 is assumed, so as to search all of the String.
      */
    includes(searchString: string, position?: number): boolean;

    /**
      * Returns true if the sequence of elements of searchString converted to a String is the
      * same as the corresponding elements of this object (converted to a String) starting at
      * endPosition – length(this). Otherwise returns false.
      */
    endsWith(searchString: string, endPosition?: number): boolean;

    /**
      * Returns a String value that is made from count copies appended together. If count is 0,
      * T is the empty String is returned.
      * @param count number of copies to append
      */
    repeat(count: number): string;

    /**
      * Returns true if the sequence of elements of searchString converted to a String is the
      * same as the corresponding elements of this object (converted to a String) starting at
      * position. Otherwise returns false.
      */
    startsWith(searchString: string, position?: number): boolean;

    /**
      * Returns an <a> HTML anchor element and sets the name attribute to the text value
      * @param name
      */
    anchor(name: string): string;

    /** Returns a <big> HTML element */
    big(): string;

    /** Returns a <blink> HTML element */
    blink(): string;

    /** Returns a <b> HTML element */
    bold(): string;

    /** Returns a <tt> HTML element */
    fixed(): string

    /** Returns a <font> HTML element and sets the color attribute value */
    fontcolor(color: string): string

    /** Returns a <font> HTML element and sets the size attribute value */
    fontsize(size: number): string;

    /** Returns a <font> HTML element and sets the size attribute value */
    fontsize(size: string): string;

    /** Returns an <i> HTML element */
    italics(): string;

    /** Returns an <a> HTML element and sets the href attribute value */
    link(url: string): string;

    /** Returns a <small> HTML element */
    small(): string;

    /** Returns a <strike> HTML element */
    strike(): string;

    /** Returns a <sub> HTML element */
    sub(): string;

    /** Returns a <sup> HTML element */
    sup(): string;

    /**
      * Shim for an ES6 iterable. Not intended for direct use by user code.
      */
    "_es6-shim iterator_"(): IterableIteratorShim<string>;
}

interface ArrayConstructor {
    /**
      * Creates an array from an array-like object.
      * @param arrayLike An array-like object to convert to an array.
      * @param mapfn A mapping function to call on every element of the array.
      * @param thisArg Value of 'this' used to invoke the mapfn.
      */
    from<T, U>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): Array<U>;

    /**
      * Creates an array from an iterable object.
      * @param iterable An iterable object to convert to an array.
      * @param mapfn A mapping function to call on every element of the array.
      * @param thisArg Value of 'this' used to invoke the mapfn.
      */
    from<T, U>(iterable: IterableShim<T>, mapfn: (v: T, k: number) => U, thisArg?: any): Array<U>;

    /**
      * Creates an array from an array-like object.
      * @param arrayLike An array-like object to convert to an array.
      */
    from<T>(arrayLike: ArrayLike<T>): Array<T>;

    /**
      * Creates an array from an iterable object.
      * @param iterable An iterable object to convert to an array.
      */
    from<T>(iterable: IterableShim<T>): Array<T>;

    /**
      * Returns a new array from a set of elements.
      * @param items A set of elements to include in the new array object.
      */
    of<T>(...items: T[]): Array<T>;
}

interface Array<T> {
    /**
      * Returns the value of the first element in the array where predicate is true, and undefined
      * otherwise.
      * @param predicate find calls predicate once for each element of the array, in ascending
      * order, until it finds one where predicate returns true. If such an element is found, find
      * immediately returns that element value. Otherwise, find returns undefined.
      * @param thisArg If provided, it will be used as the this value for each invocation of
      * predicate. If it is not provided, undefined is used instead.
      */
    find(predicate: (value: T, index: number, obj: Array<T>) => boolean, thisArg?: any): T;

    /**
      * Returns the index of the first element in the array where predicate is true, and undefined
      * otherwise.
      * @param predicate find calls predicate once for each element of the array, in ascending
      * order, until it finds one where predicate returns true. If such an element is found, find
      * immediately returns that element value. Otherwise, find returns undefined.
      * @param thisArg If provided, it will be used as the this value for each invocation of
      * predicate. If it is not provided, undefined is used instead.
      */
    findIndex(predicate: (value: T) => boolean, thisArg?: any): number;

    /**
      * Returns the this object after filling the section identified by start and end with value
      * @param value value to fill array section with
      * @param start index to start filling the array at. If start is negative, it is treated as
      * length+start where length is the length of the array.
      * @param end index to stop filling the array at. If end is negative, it is treated as
      * length+end.
      */
    fill(value: T, start?: number, end?: number): T[];

    /**
      * Returns the this object after copying a section of the array identified by start and end
      * to the same array starting at position target
      * @param target If target is negative, it is treated as length+target where length is the
      * length of the array.
      * @param start If start is negative, it is treated as length+start. If end is negative, it
      * is treated as length+end.
      * @param end If not specified, length of the this object is used as its default value.
      */
    copyWithin(target: number, start: number, end?: number): T[];

    /**
      * Returns an array of key, value pairs for every entry in the array
      */
    entries(): IterableIteratorShim<[number, T]>;

    /**
      * Returns an list of keys in the array
      */
    keys(): IterableIteratorShim<number>;

    /**
      * Returns an list of values in the array
      */
    values(): IterableIteratorShim<T>;

    /**
      * Shim for an ES6 iterable. Not intended for direct use by user code.
      */
    "_es6-shim iterator_"(): IterableIteratorShim<T>;
}

interface NumberConstructor {
    /**
      * The value of Number.EPSILON is the difference between 1 and the smallest value greater than 1
      * that is representable as a Number value, which is approximately:
      * 2.2204460492503130808472633361816 x 10‍−‍16.
      */
    EPSILON: number;

    /**
      * Returns true if passed value is finite.
      * Unlike the global isFininte, Number.isFinite doesn't forcibly convert the parameter to a
      * number. Only finite values of the type number, result in true.
      * @param number A numeric value.
      */
    isFinite(number: number): boolean;

    /**
      * Returns true if the value passed is an integer, false otherwise.
      * @param number A numeric value.
      */
    isInteger(number: number): boolean;

    /**
      * Returns a Boolean value that indicates whether a value is the reserved value NaN (not a
      * number). Unlike the global isNaN(), Number.isNaN() doesn't forcefully convert the parameter
      * to a number. Only values of the type number, that are also NaN, result in true.
      * @param number A numeric value.
      */
    isNaN(number: number): boolean;

    /**
      * Returns true if the value passed is a safe integer.
      * @param number A numeric value.
      */
    isSafeInteger(number: number): boolean;

    /**
      * The value of the largest integer n such that n and n + 1 are both exactly representable as
      * a Number value.
      * The value of Number.MIN_SAFE_INTEGER is 9007199254740991 2^53 − 1.
      */
    MAX_SAFE_INTEGER: number;

    /**
      * The value of the smallest integer n such that n and n − 1 are both exactly representable as
      * a Number value.
      * The value of Number.MIN_SAFE_INTEGER is −9007199254740991 (−(2^53 − 1)).
      */
    MIN_SAFE_INTEGER: number;

    /**
      * Converts a string to a floating-point number.
      * @param string A string that contains a floating-point number.
      */
    parseFloat(string: string): number;

    /**
      * Converts A string to an integer.
      * @param s A string to convert into a number.
      * @param radix A value between 2 and 36 that specifies the base of the number in numString.
      * If this argument is not supplied, strings with a prefix of '0x' are considered hexadecimal.
      * All other strings are considered decimal.
      */
    parseInt(string: string, radix?: number): number;
}

interface ObjectConstructor {
    /**
      * Copy the values of all of the enumerable own properties from one or more source objects to a
      * target object. Returns the target object.
      * @param target The target object to copy to.
      * @param sources One or more source objects to copy properties from.
      */
    assign(target: any, ...sources: any[]): any;

    /**
      * Returns true if the values are the same value, false otherwise.
      * @param value1 The first value.
      * @param value2 The second value.
      */
    is(value1: any, value2: any): boolean;

    /**
      * Sets the prototype of a specified object o to  object proto or null. Returns the object o.
      * @param o The object to change its prototype.
      * @param proto The value of the new prototype or null.
      * @remarks Requires `__proto__` support.
      */
    setPrototypeOf(o: any, proto: any): any;
}

interface RegExp {
    /**
      * Returns a string indicating the flags of the regular expression in question. This field is read-only.
      * The characters in this string are sequenced and concatenated in the following order:
      *
      *    - "g" for global
      *    - "i" for ignoreCase
      *    - "m" for multiline
      *    - "u" for unicode
      *    - "y" for sticky
      *
      * If no flags are set, the value is the empty string.
      */
    flags: string;
}

interface Math {
    /**
      * Returns the number of leading zero bits in the 32-bit binary representation of a number.
      * @param x A numeric expression.
      */
    clz32(x: number): number;

    /**
      * Returns the result of 32-bit multiplication of two numbers.
      * @param x First number
      * @param y Second number
      */
    imul(x: number, y: number): number;

    /**
      * Returns the sign of the x, indicating whether x is positive, negative or zero.
      * @param x The numeric expression to test
      */
    sign(x: number): number;

    /**
      * Returns the base 10 logarithm of a number.
      * @param x A numeric expression.
      */
    log10(x: number): number;

    /**
      * Returns the base 2 logarithm of a number.
      * @param x A numeric expression.
      */
    log2(x: number): number;

    /**
      * Returns the natural logarithm of 1 + x.
      * @param x A numeric expression.
      */
    log1p(x: number): number;

    /**
      * Returns the result of (e^x - 1) of x (e raised to the power of x, where e is the base of
      * the natural logarithms).
      * @param x A numeric expression.
      */
    expm1(x: number): number;

    /**
      * Returns the hyperbolic cosine of a number.
      * @param x A numeric expression that contains an angle measured in radians.
      */
    cosh(x: number): number;

    /**
      * Returns the hyperbolic sine of a number.
      * @param x A numeric expression that contains an angle measured in radians.
      */
    sinh(x: number): number;

    /**
      * Returns the hyperbolic tangent of a number.
      * @param x A numeric expression that contains an angle measured in radians.
      */
    tanh(x: number): number;

    /**
      * Returns the inverse hyperbolic cosine of a number.
      * @param x A numeric expression that contains an angle measured in radians.
      */
    acosh(x: number): number;

    /**
      * Returns the inverse hyperbolic sine of a number.
      * @param x A numeric expression that contains an angle measured in radians.
      */
    asinh(x: number): number;

    /**
      * Returns the inverse hyperbolic tangent of a number.
      * @param x A numeric expression that contains an angle measured in radians.
      */
    atanh(x: number): number;

    /**
      * Returns the square root of the sum of squares of its arguments.
      * @param values Values to compute the square root for.
      *     If no arguments are passed, the result is +0.
      *     If there is only one argument, the result is the absolute value.
      *     If any argument is +Infinity or -Infinity, the result is +Infinity.
      *     If any argument is NaN, the result is NaN.
      *     If all arguments are either +0 or −0, the result is +0.
      */
    hypot(...values: number[]): number;

    /**
      * Returns the integral part of the a numeric expression, x, removing any fractional digits.
      * If x is already an integer, the result is x.
      * @param x A numeric expression.
      */
    trunc(x: number): number;

    /**
      * Returns the nearest single precision float representation of a number.
      * @param x A numeric expression.
      */
    fround(x: number): number;

    /**
      * Returns an implementation-dependent approximation to the cube root of number.
      * @param x A numeric expression.
      */
    cbrt(x: number): number;
}

interface PromiseLike<T> {
    /**
    * Attaches callbacks for the resolution and/or rejection of the Promise.
    * @param onfulfilled The callback to execute when the Promise is resolved.
    * @param onrejected The callback to execute when the Promise is rejected.
    * @returns A Promise for the completion of which ever callback is executed.
    */
    then<TResult>(onfulfilled?: (value: T) => TResult | PromiseLike<TResult>, onrejected?: (reason: any) => TResult | PromiseLike<TResult>): PromiseLike<TResult>;
    then<TResult>(onfulfilled?: (value: T) => TResult | PromiseLike<TResult>, onrejected?: (reason: any) => void): PromiseLike<TResult>;
}

/**
 * Represents the completion of an asynchronous operation
 */
interface Promise<T> {
    /**
    * Attaches callbacks for the resolution and/or rejection of the Promise.
    * @param onfulfilled The callback to execute when the Promise is resolved.
    * @param onrejected The callback to execute when the Promise is rejected.
    * @returns A Promise for the completion of which ever callback is executed.
    */
    then<TResult>(onfulfilled?: (value: T) => TResult | PromiseLike<TResult>, onrejected?: (reason: any) => TResult | PromiseLike<TResult>): Promise<TResult>;
    then<TResult>(onfulfilled?: (value: T) => TResult | PromiseLike<TResult>, onrejected?: (reason: any) => void): Promise<TResult>;

    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch(onrejected?: (reason: any) => T | PromiseLike<T>): Promise<T>;
    catch(onrejected?: (reason: any) => void): Promise<T>;
}

interface PromiseConstructor {
    /**
      * A reference to the prototype.
      */
    prototype: Promise<any>;

    /**
     * Creates a new Promise.
     * @param executor A callback used to initialize the promise. This callback is passed two arguments:
     * a resolve callback used resolve the promise with a value or the result of another promise,
     * and a reject callback used to reject the promise with a provided reason or error.
     */
    new <T>(executor: (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void): Promise<T>;

    /**
     * Creates a Promise that is resolved with an array of results when all of the provided Promises
     * resolve, or rejected when any Promise is rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    all<T>(values: IterableShim<T | PromiseLike<T>>): Promise<T[]>;

    /**
     * Creates a Promise that is resolved or rejected when any of the provided Promises are resolved
     * or rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    race<T>(values: IterableShim<T | PromiseLike<T>>): Promise<T>;

    /**
     * Creates a new rejected promise for the provided reason.
     * @param reason The reason the promise was rejected.
     * @returns A new rejected Promise.
     */
    reject(reason: any): Promise<void>;

    /**
     * Creates a new rejected promise for the provided reason.
     * @param reason The reason the promise was rejected.
     * @returns A new rejected Promise.
     */
    reject<T>(reason: any): Promise<T>;

    /**
      * Creates a new resolved promise for the provided value.
      * @param value A promise.
      * @returns A promise whose internal state matches the provided promise.
      */
    resolve<T>(value: T | PromiseLike<T>): Promise<T>;

    /**
     * Creates a new resolved promise .
     * @returns A resolved promise.
     */
    resolve(): Promise<void>;
}

declare var Promise: PromiseConstructor;

interface Map<K, V> {
    clear(): void;
    delete(key: K): boolean;
    forEach(callbackfn: (value: V, index: K, map: Map<K, V>) => void, thisArg?: any): void;
    get(key: K): V;
    has(key: K): boolean;
    set(key: K, value?: V): Map<K, V>;
    size: number;
    entries(): IterableIteratorShim<[K, V]>;
    keys(): IterableIteratorShim<K>;
    values(): IterableIteratorShim<V>;
}

interface MapConstructor {
    new <K, V>(): Map<K, V>;
    new <K, V>(iterable: IterableShim<[K, V]>): Map<K, V>;
    prototype: Map<any, any>;
}

declare var Map: MapConstructor;

interface Set<T> {
    add(value: T): Set<T>;
    clear(): void;
    delete(value: T): boolean;
    forEach(callbackfn: (value: T, index: T, set: Set<T>) => void, thisArg?: any): void;
    has(value: T): boolean;
    size: number;
    entries(): IterableIteratorShim<[T, T]>;
    keys(): IterableIteratorShim<T>;
    values(): IterableIteratorShim<T>;
}

interface SetConstructor {
    new <T>(): Set<T>;
    new <T>(iterable: IterableShim<T>): Set<T>;
    prototype: Set<any>;
}

declare var Set: SetConstructor;

interface WeakMap<K, V> {
    delete(key: K): boolean;
    get(key: K): V;
    has(key: K): boolean;
    set(key: K, value?: V): WeakMap<K, V>;
}

interface WeakMapConstructor {
    new <K, V>(): WeakMap<K, V>;
    new <K, V>(iterable: IterableShim<[K, V]>): WeakMap<K, V>;
    prototype: WeakMap<any, any>;
}

declare var WeakMap: WeakMapConstructor;

interface WeakSet<T> {
    add(value: T): WeakSet<T>;
    delete(value: T): boolean;
    has(value: T): boolean;
}

interface WeakSetConstructor {
    new <T>(): WeakSet<T>;
    new <T>(iterable: IterableShim<T>): WeakSet<T>;
    prototype: WeakSet<any>;
}

declare var WeakSet: WeakSetConstructor;

declare module Reflect {
    function apply(target: Function, thisArgument: any, argumentsList: ArrayLike<any>): any;
    function construct(target: Function, argumentsList: ArrayLike<any>): any;
    function defineProperty(target: any, propertyKey: PropertyKey, attributes: PropertyDescriptor): boolean;
    function deleteProperty(target: any, propertyKey: PropertyKey): boolean;
    function enumerate(target: any): IterableIteratorShim<any>;
    function get(target: any, propertyKey: PropertyKey, receiver?: any): any;
    function getOwnPropertyDescriptor(target: any, propertyKey: PropertyKey): PropertyDescriptor;
    function getPrototypeOf(target: any): any;
    function has(target: any, propertyKey: PropertyKey): boolean;
    function isExtensible(target: any): boolean;
    function ownKeys(target: any): Array<PropertyKey>;
    function preventExtensions(target: any): boolean;
    function set(target: any, propertyKey: PropertyKey, value: any, receiver?: any): boolean;
    function setPrototypeOf(target: any, proto: any): boolean;
}

declare module "es6-shim" {
    var String: StringConstructor;
    var Array: ArrayConstructor;
    var Number: NumberConstructor;
    var Math: Math;
    var Object: ObjectConstructor;
    var Map: MapConstructor;
    var Set: SetConstructor;
    var WeakMap: WeakMapConstructor;
    var WeakSet: WeakSetConstructor;
    var Promise: PromiseConstructor;
    module Reflect {
        function apply(target: Function, thisArgument: any, argumentsList: ArrayLike<any>): any;
        function construct(target: Function, argumentsList: ArrayLike<any>): any;
        function defineProperty(target: any, propertyKey: PropertyKey, attributes: PropertyDescriptor): boolean;
        function deleteProperty(target: any, propertyKey: PropertyKey): boolean;
        function enumerate(target: any): Iterator<any>;
        function get(target: any, propertyKey: PropertyKey, receiver?: any): any;
        function getOwnPropertyDescriptor(target: any, propertyKey: PropertyKey): PropertyDescriptor;
        function getPrototypeOf(target: any): any;
        function has(target: any, propertyKey: PropertyKey): boolean;
        function isExtensible(target: any): boolean;
        function ownKeys(target: any): Array<PropertyKey>;
        function preventExtensions(target: any): boolean;
        function set(target: any, propertyKey: PropertyKey, value: any, receiver?: any): boolean;
        function setPrototypeOf(target: any, proto: any): boolean;
    }
}
/**
 * Declarations angular depends on for compilation to ES6.
 * This file is also used to propagate our transitive typings
 * to users.
 */
/// <reference path="../typings/es6-shim/es6-shim.d.ts"/>
/// <reference path="./globals-es6.d.ts"/>
declare module 'ditsy' {
	/// <reference path="../../angular2/manual_typings/globals.d.ts" />
	export const IS_DART: boolean; var _global: BrowserNodeGlobal;
	export { _global as global };
	export var Type: FunctionConstructor;
	/**
	 * Runtime representation a type that a Component or other object is instances of.
	 *
	 * An example of a `Type` is `MyCustomComponent` class, which in JavaScript is be represented by
	 * the `MyCustomComponent` constructor function.
	 */
	export interface Type extends Function {
	}
	/**
	 * Runtime representation of a type that is constructable (non-abstract).
	 */
	export interface ConcreteType extends Type {
	    new (...args: any[]): any;
	}
	export function getTypeNameForDebugging(type: Type): string;
	export var Math: Math;
	export var Date: DateConstructor;
	export function lockMode(): void;
	/**
	 * Disable Angular's development mode, which turns off assertions and other
	 * checks within the framework.
	 *
	 * One important assertion this disables verifies that a change detection pass
	 * does not result in additional changes to any bindings (also known as
	 * unidirectional data flow).
	 */
	export function enableProdMode(): void;
	export function assertionsEnabled(): boolean;
	export function CONST_EXPR<T>(expr: T): T;
	export function CONST(): ClassDecorator & PropertyDecorator;
	export function isPresent(obj: any): boolean;
	export function isBlank(obj: any): boolean;
	export function isString(obj: any): boolean;
	export function isFunction(obj: any): boolean;
	export function isType(obj: any): boolean;
	export function isStringMap(obj: any): boolean;
	export function isPromise(obj: any): boolean;
	export function isArray(obj: any): boolean;
	export function isNumber(obj: any): boolean;
	export function isDate(obj: any): boolean;
	export function noop(): void;
	export function stringify(token: any): string;
	export function serializeEnum(val: any): number;
	export function deserializeEnum(val: any, values: Map<number, any>): any;
	export class StringWrapper {
	    static fromCharCode(code: number): string;
	    static charCodeAt(s: string, index: number): number;
	    static split(s: string, regExp: RegExp): string[];
	    static equals(s: string, s2: string): boolean;
	    static stripLeft(s: string, charVal: string): string;
	    static stripRight(s: string, charVal: string): string;
	    static replace(s: string, from: string, replace: string): string;
	    static replaceAll(s: string, from: RegExp, replace: string): string;
	    static slice<T>(s: string, from?: number, to?: number): string;
	    static replaceAllMapped(s: string, from: RegExp, cb: Function): string;
	    static contains(s: string, substr: string): boolean;
	    static compare(a: string, b: string): number;
	}
	export class StringJoiner {
	    parts: any[];
	    constructor(parts?: any[]);
	    add(part: string): void;
	    toString(): string;
	}
	export class NumberParseError extends Error {
	    message: string;
	    name: string;
	    constructor(message: string);
	    toString(): string;
	}
	export class NumberWrapper {
	    static toFixed(n: number, fractionDigits: number): string;
	    static equal(a: number, b: number): boolean;
	    static parseIntAutoRadix(text: string): number;
	    static parseInt(text: string, radix: number): number;
	    static parseFloat(text: string): number;
	    static NaN: number;
	    static isNaN(value: any): boolean;
	    static isInteger(value: any): boolean;
	}
	export var RegExp: RegExpConstructor;
	export class RegExpWrapper {
	    static create(regExpStr: string, flags?: string): RegExp;
	    static firstMatch(regExp: RegExp, input: string): RegExpExecArray;
	    static test(regExp: RegExp, input: string): boolean;
	    static matcher(regExp: RegExp, input: string): {
	        re: RegExp;
	        input: string;
	    };
	}
	export class RegExpMatcherWrapper {
	    static next(matcher: {
	        re: RegExp;
	        input: string;
	    }): RegExpExecArray;
	}
	export class FunctionWrapper {
	    static apply(fn: Function, posArgs: any): any;
	}
	export function looseIdentical(a: any, b: any): boolean;
	export function getMapKey<T>(value: T): T;
	export function normalizeBlank(obj: Object): any;
	export function normalizeBool(obj: boolean): boolean;
	export function isJsObject(o: any): boolean;
	export function print(obj: Error | Object): void;
	export class Json {
	    static parse(s: string): Object;
	    static stringify(data: Object): string;
	}
	export class DateWrapper {
	    static create(year: number, month?: number, day?: number, hour?: number, minutes?: number, seconds?: number, milliseconds?: number): Date;
	    static fromISOString(str: string): Date;
	    static fromMillis(ms: number): Date;
	    static toMillis(date: Date): number;
	    static now(): Date;
	    static toJson(date: Date): string;
	}
	export function setValueOnPath(global: any, path: string, value: any): void;
	export function getSymbolIterator(): string | symbol;
	export function evalExpression(sourceUrl: string, expr: string, declarations: string, vars: {
	    [key: string]: any;
	}): any;

}
declare module 'ditsy' {
	/**
	 * A parameter metadata that specifies a dependency.
	 *
	 * ### Example ([live demo](http://plnkr.co/edit/6uHYJK?p=preview))
	 *
	 * ```typescript
	 * class Engine {}
	 *
	 * @Injectable()
	 * class Car {
	 *   engine;
	 *   constructor(@Inject("MyEngine") engine:Engine) {
	 *     this.engine = engine;
	 *   }
	 * }
	 *
	 * var injector = Injector.resolveAndCreate([
	 *  provide("MyEngine", {useClass: Engine}),
	 *  Car
	 * ]);
	 *
	 * expect(injector.get(Car).engine instanceof Engine).toBe(true);
	 * ```
	 *
	 * When `@Inject()` is not present, {@link Injector} will use the type annotation of the parameter.
	 *
	 * ### Example
	 *
	 * ```typescript
	 * class Engine {}
	 *
	 * @Injectable()
	 * class Car {
	 *   constructor(public engine: Engine) {} //same as constructor(@Inject(Engine) engine:Engine)
	 * }
	 *
	 * var injector = Injector.resolveAndCreate([Engine, Car]);
	 * expect(injector.get(Car).engine instanceof Engine).toBe(true);
	 * ```
	 */
	export class InjectMetadata {
	    token: any;
	    constructor(token: any);
	    toString(): string;
	}
	/**
	 * A parameter metadata that marks a dependency as optional. {@link Injector} provides `null` if
	 * the dependency is not found.
	 *
	 * ### Example ([live demo](http://plnkr.co/edit/AsryOm?p=preview))
	 *
	 * ```typescript
	 * class Engine {}
	 *
	 * @Injectable()
	 * class Car {
	 *   engine;
	 *   constructor(@Optional() engine:Engine) {
	 *     this.engine = engine;
	 *   }
	 * }
	 *
	 * var injector = Injector.resolveAndCreate([Car]);
	 * expect(injector.get(Car).engine).toBeNull();
	 * ```
	 */
	export class OptionalMetadata {
	    toString(): string;
	}
	/**
	 * `DependencyMetadata` is used by the framework to extend DI.
	 * This is internal to Angular and should not be used directly.
	 */
	export class DependencyMetadata {
	    token: any;
	}
	/**
	 * A marker metadata that marks a class as available to {@link Injector} for creation.
	 *
	 * ### Example ([live demo](http://plnkr.co/edit/Wk4DMQ?p=preview))
	 *
	 * ```typescript
	 * @Injectable()
	 * class UsefulService {}
	 *
	 * @Injectable()
	 * class NeedsService {
	 *   constructor(public service:UsefulService) {}
	 * }
	 *
	 * var injector = Injector.resolveAndCreate([NeedsService, UsefulService]);
	 * expect(injector.get(NeedsService).service instanceof UsefulService).toBe(true);
	 * ```
	 * {@link Injector} will throw {@link NoAnnotationError} when trying to instantiate a class that
	 * does not have `@Injectable` marker, as shown in the example below.
	 *
	 * ```typescript
	 * class UsefulService {}
	 *
	 * class NeedsService {
	 *   constructor(public service:UsefulService) {}
	 * }
	 *
	 * var injector = Injector.resolveAndCreate([NeedsService, UsefulService]);
	 * expect(() => injector.get(NeedsService)).toThrowError();
	 * ```
	 */
	export class InjectableMetadata {
	    constructor();
	}
	/**
	 * Specifies that an {@link Injector} should retrieve a dependency only from itself.
	 *
	 * ### Example ([live demo](http://plnkr.co/edit/NeagAg?p=preview))
	 *
	 * ```typescript
	 * class Dependency {
	 * }
	 *
	 * @Injectable()
	 * class NeedsDependency {
	 *   dependency;
	 *   constructor(@Self() dependency:Dependency) {
	 *     this.dependency = dependency;
	 *   }
	 * }
	 *
	 * var inj = Injector.resolveAndCreate([Dependency, NeedsDependency]);
	 * var nd = inj.get(NeedsDependency);
	 *
	 * expect(nd.dependency instanceof Dependency).toBe(true);
	 *
	 * var inj = Injector.resolveAndCreate([Dependency]);
	 * var child = inj.resolveAndCreateChild([NeedsDependency]);
	 * expect(() => child.get(NeedsDependency)).toThrowError();
	 * ```
	 */
	export class SelfMetadata {
	    toString(): string;
	}
	/**
	 * Specifies that the dependency resolution should start from the parent injector.
	 *
	 * ### Example ([live demo](http://plnkr.co/edit/Wchdzb?p=preview))
	 *
	 * ```typescript
	 * class Dependency {
	 * }
	 *
	 * @Injectable()
	 * class NeedsDependency {
	 *   dependency;
	 *   constructor(@SkipSelf() dependency:Dependency) {
	 *     this.dependency = dependency;
	 *   }
	 * }
	 *
	 * var parent = Injector.resolveAndCreate([Dependency]);
	 * var child = parent.resolveAndCreateChild([NeedsDependency]);
	 * expect(child.get(NeedsDependency).dependency instanceof Depedency).toBe(true);
	 *
	 * var inj = Injector.resolveAndCreate([Dependency, NeedsDependency]);
	 * expect(() => inj.get(NeedsDependency)).toThrowError();
	 * ```
	 */
	export class SkipSelfMetadata {
	    toString(): string;
	}
	/**
	 * Specifies that an injector should retrieve a dependency from any injector until reaching the
	 * closest host.
	 *
	 * In Angular, a component element is automatically declared as a host for all the injectors in
	 * its view.
	 *
	 * ### Example ([live demo](http://plnkr.co/edit/GX79pV?p=preview))
	 *
	 * In the following example `App` contains `ParentCmp`, which contains `ChildDirective`.
	 * So `ParentCmp` is the host of `ChildDirective`.
	 *
	 * `ChildDirective` depends on two services: `HostService` and `OtherService`.
	 * `HostService` is defined at `ParentCmp`, and `OtherService` is defined at `App`.
	 *
	 *```typescript
	 * class OtherService {}
	 * class HostService {}
	 *
	 * @Directive({
	 *   selector: 'child-directive'
	 * })
	 * class ChildDirective {
	 *   constructor(@Optional() @Host() os:OtherService, @Optional() @Host() hs:HostService){
	 *     console.log("os is null", os);
	 *     console.log("hs is NOT null", hs);
	 *   }
	 * }
	 *
	 * @Component({
	 *   selector: 'parent-cmp',
	 *   providers: [HostService],
	 *   template: `
	 *     Dir: <child-directive></child-directive>
	 *   `,
	 *   directives: [ChildDirective]
	 * })
	 * class ParentCmp {
	 * }
	 *
	 * @Component({
	 *   selector: 'app',
	 *   providers: [OtherService],
	 *   template: `
	 *     Parent: <parent-cmp></parent-cmp>
	 *   `,
	 *   directives: [ParentCmp]
	 * })
	 * class App {
	 * }
	 *
	 * bootstrap(App);
	 *```
	 */
	export class HostMetadata {
	    toString(): string;
	}

}
declare module 'ditsys' {
	import { ConcreteType, Type } from 'angular2/src/facade/lang';
	/**
	 * Declares the interface to be used with {@link Class}.
	 */
	export interface ClassDefinition {
	    /**
	     * Optional argument for specifying the superclass.
	     */
	    extends?: Type;
	    /**
	     * Required constructor function for a class.
	     *
	     * The function may be optionally wrapped in an `Array`, in which case additional parameter
	     * annotations may be specified.
	     * The number of arguments and the number of parameter annotations must match.
	     *
	     * See {@link Class} for example of usage.
	     */
	    constructor: Function | any[];
	    /**
	     * Other methods on the class. Note that values should have type 'Function' but TS requires
	     * all properties to have a narrower type than the index signature.
	     */
	    [x: string]: Type | Function | any[];
	}
	/**
	 * An interface implemented by all Angular type decorators, which allows them to be used as ES7
	 * decorators as well as
	 * Angular DSL syntax.
	 *
	 * DSL syntax:
	 *
	 * ```
	 * var MyClass = ng
	 *   .Component({...})
	 *   .View({...})
	 *   .Class({...});
	 * ```
	 *
	 * ES7 syntax:
	 *
	 * ```
	 * @ng.Component({...})
	 * @ng.View({...})
	 * class MyClass {...}
	 * ```
	 */
	export interface TypeDecorator {
	    /**
	     * Invoke as ES7 decorator.
	     */
	    <T extends Type>(type: T): T;
	    (target: Object, propertyKey?: string | symbol, parameterIndex?: number): void;
	    /**
	     * Storage for the accumulated annotations so far used by the DSL syntax.
	     *
	     * Used by {@link Class} to annotate the generated class.
	     */
	    annotations: any[];
	    /**
	     * Generate a class from the definition and annotate it with {@link TypeDecorator#annotations}.
	     */
	    Class(obj: ClassDefinition): ConcreteType;
	}
	/**
	 * Provides a way for expressing ES6 classes with parameter annotations in ES5.
	 *
	 * ## Basic Example
	 *
	 * ```
	 * var Greeter = ng.Class({
	 *   constructor: function(name) {
	 *     this.name = name;
	 *   },
	 *
	 *   greet: function() {
	 *     alert('Hello ' + this.name + '!');
	 *   }
	 * });
	 * ```
	 *
	 * is equivalent to ES6:
	 *
	 * ```
	 * class Greeter {
	 *   constructor(name) {
	 *     this.name = name;
	 *   }
	 *
	 *   greet() {
	 *     alert('Hello ' + this.name + '!');
	 *   }
	 * }
	 * ```
	 *
	 * or equivalent to ES5:
	 *
	 * ```
	 * var Greeter = function (name) {
	 *   this.name = name;
	 * }
	 *
	 * Greeter.prototype.greet = function () {
	 *   alert('Hello ' + this.name + '!');
	 * }
	 * ```
	 *
	 * ### Example with parameter annotations
	 *
	 * ```
	 * var MyService = ng.Class({
	 *   constructor: [String, [new Query(), QueryList], function(name, queryList) {
	 *     ...
	 *   }]
	 * });
	 * ```
	 *
	 * is equivalent to ES6:
	 *
	 * ```
	 * class MyService {
	 *   constructor(name: string, @Query() queryList: QueryList) {
	 *     ...
	 *   }
	 * }
	 * ```
	 *
	 * ### Example with inheritance
	 *
	 * ```
	 * var Shape = ng.Class({
	 *   constructor: (color) {
	 *     this.color = color;
	 *   }
	 * });
	 *
	 * var Square = ng.Class({
	 *   extends: Shape,
	 *   constructor: function(color, size) {
	 *     Shape.call(this, color);
	 *     this.size = size;
	 *   }
	 * });
	 * ```
	 */
	export function Class(clsDef: ClassDefinition): ConcreteType;
	export function makeDecorator(annotationCls: any, chainFn?: (fn: Function) => void): (...args: any[]) => (cls: any) => any;
	export function makeParamDecorator(annotationCls: any): any;
	export function makePropDecorator(decoratorCls: any): any;

}
declare module 'ditsy' {
	import { InjectMetadata, OptionalMetadata, InjectableMetadata, SelfMetadata, HostMetadata, SkipSelfMetadata } from 'metadata';
	/**
	 * Factory for creating {@link InjectMetadata}.
	 */
	export interface InjectFactory {
	    (token: any): any;
	    new (token: any): InjectMetadata;
	}
	/**
	 * Factory for creating {@link OptionalMetadata}.
	 */
	export interface OptionalFactory {
	    (): any;
	    new (): OptionalMetadata;
	}
	/**
	 * Factory for creating {@link InjectableMetadata}.
	 */
	export interface InjectableFactory {
	    (): any;
	    new (): InjectableMetadata;
	}
	/**
	 * Factory for creating {@link SelfMetadata}.
	 */
	export interface SelfFactory {
	    (): any;
	    new (): SelfMetadata;
	}
	/**
	 * Factory for creating {@link HostMetadata}.
	 */
	export interface HostFactory {
	    (): any;
	    new (): HostMetadata;
	}
	/**
	 * Factory for creating {@link SkipSelfMetadata}.
	 */
	export interface SkipSelfFactory {
	    (): any;
	    new (): SkipSelfMetadata;
	}
	/**
	 * Factory for creating {@link InjectMetadata}.
	 */
	export var Inject: InjectFactory;
	/**
	 * Factory for creating {@link OptionalMetadata}.
	 */
	export var Optional: OptionalFactory;
	/**
	 * Factory for creating {@link InjectableMetadata}.
	 */
	export var Injectable: InjectableFactory;
	/**
	 * Factory for creating {@link SelfMetadata}.
	 */
	export var Self: SelfFactory;
	/**
	 * Factory for creating {@link HostMetadata}.
	 */
	export var Host: HostFactory;
	/**
	 * Factory for creating {@link SkipSelfMetadata}.
	 */
	export var SkipSelf: SkipSelfFactory;

}
declare module 'ditsy' {
	import { Type } from 'angular2/src/facade/lang';
	/**
	 * An interface that a function passed into {@link forwardRef} has to implement.
	 *
	 * ### Example
	 *
	 * {@example core/di/ts/forward_ref/forward_ref.ts region='forward_ref_fn'}
	 */
	export interface ForwardRefFn {
	    (): any;
	}
	/**
	 * Allows to refer to references which are not yet defined.
	 *
	 * For instance, `forwardRef` is used when the `token` which we need to refer to for the purposes of
	 * DI is declared,
	 * but not yet defined. It is also used when the `token` which we use when creating a query is not
	 * yet defined.
	 *
	 * ### Example
	 * {@example core/di/ts/forward_ref/forward_ref.ts region='forward_ref'}
	 */
	export function forwardRef(forwardRefFn: ForwardRefFn): Type;
	/**
	 * Lazily retrieves the reference value from a forwardRef.
	 *
	 * Acts as the identity function when given a non-forward-ref value.
	 *
	 * ### Example ([live demo](http://plnkr.co/edit/GU72mJrk1fiodChcmiDR?p=preview))
	 *
	 * ```typescript
	 * var ref = forwardRef(() => "refValue");
	 * expect(resolveForwardRef(ref)).toEqual("refValue");
	 * expect(resolveForwardRef("regularValue")).toEqual("regularValue");
	 * ```
	 *
	 * See: {@link forwardRef}
	 */
	export function resolveForwardRef(type: any): any;

}
declare module 'ditsy' {
	export var Map: MapConstructor;
	export var Set: SetConstructor;
	export class MapWrapper {
	    static clone<K, V>(m: Map<K, V>): Map<K, V>;
	    static createFromStringMap<T>(stringMap: {
	        [key: string]: T;
	    }): Map<string, T>;
	    static toStringMap<T>(m: Map<string, T>): {
	        [key: string]: T;
	    };
	    static createFromPairs(pairs: any[]): Map<any, any>;
	    static clearValues(m: Map<any, any>): void;
	    static iterable<T>(m: T): T;
	    static keys<K>(m: Map<K, any>): K[];
	    static values<V>(m: Map<any, V>): V[];
	}
	/**
	 * Wraps Javascript Objects
	 */
	export class StringMapWrapper {
	    static create(): {
	        [k: string]: any;
	    };
	    static contains(map: {
	        [key: string]: any;
	    }, key: string): boolean;
	    static get<V>(map: {
	        [key: string]: V;
	    }, key: string): V;
	    static set<V>(map: {
	        [key: string]: V;
	    }, key: string, value: V): void;
	    static keys(map: {
	        [key: string]: any;
	    }): string[];
	    static isEmpty(map: {
	        [key: string]: any;
	    }): boolean;
	    static delete(map: {
	        [key: string]: any;
	    }, key: string): void;
	    static forEach<K, V>(map: {
	        [key: string]: V;
	    }, callback: Function): void;
	    static merge<V>(m1: {
	        [key: string]: V;
	    }, m2: {
	        [key: string]: V;
	    }): {
	        [key: string]: V;
	    };
	    static equals<V>(m1: {
	        [key: string]: V;
	    }, m2: {
	        [key: string]: V;
	    }): boolean;
	}
	/**
	 * A boolean-valued function over a value, possibly including context information
	 * regarding that value's position in an array.
	 */
	export interface Predicate<T> {
	    (value: T, index?: number, array?: T[]): boolean;
	}
	export class ListWrapper {
	    static createFixedSize(size: number): any[];
	    static createGrowableSize(size: number): any[];
	    static clone<T>(array: T[]): T[];
	    static forEachWithIndex<T>(array: T[], fn: (t: T, n: number) => void): void;
	    static first<T>(array: T[]): T;
	    static last<T>(array: T[]): T;
	    static indexOf<T>(array: T[], value: T, startIndex?: number): number;
	    static contains<T>(list: T[], el: T): boolean;
	    static reversed<T>(array: T[]): T[];
	    static concat(a: any[], b: any[]): any[];
	    static insert<T>(list: T[], index: number, value: T): void;
	    static removeAt<T>(list: T[], index: number): T;
	    static removeAll<T>(list: T[], items: T[]): void;
	    static remove<T>(list: T[], el: T): boolean;
	    static clear(list: any[]): void;
	    static isEmpty(list: any[]): boolean;
	    static fill(list: any[], value: any, start?: number, end?: number): void;
	    static equals(a: any[], b: any[]): boolean;
	    static slice<T>(l: T[], from?: number, to?: number): T[];
	    static splice<T>(l: T[], from: number, length: number): T[];
	    static sort<T>(l: T[], compareFn?: (a: T, b: T) => number): void;
	    static toString<T>(l: T[]): string;
	    static toJSON<T>(l: T[]): string;
	    static maximum<T>(list: T[], predicate: (t: T) => number): T;
	}
	export function isListLikeIterable(obj: any): boolean;
	export function iterateListLike(obj: any, fn: Function): void;
	export class SetWrapper {
	    static createFromList<T>(lst: T[]): Set<T>;
	    static has<T>(s: Set<T>, key: T): boolean;
	    static delete<K>(m: Set<K>, k: K): void;
	}

}
declare module 'ditsyndler' {
	/**
	 * Provides a hook for centralized exception handling.
	 *
	 * The default implementation of `ExceptionHandler` prints error messages to the `Console`. To
	 * intercept error handling,
	 * write a custom exception handler that replaces this default as appropriate for your app.
	 *
	 * ### Example
	 *
	 * ```javascript
	 *
	 * class MyExceptionHandler implements ExceptionHandler {
	 *   call(error, stackTrace = null, reason = null) {
	 *     // do something with the exception
	 *   }
	 * }
	 *
	 * bootstrap(MyApp, [provide(ExceptionHandler, {useClass: MyExceptionHandler})])
	 *
	 * ```
	 */
	export class ExceptionHandler {
	    private _logger;
	    private _rethrowException;
	    constructor(_logger: any, _rethrowException?: boolean);
	    static exceptionToString(exception: any, stackTrace?: any, reason?: string): string;
	    call(exception: any, stackTrace?: any, reason?: string): void;
	    /** @internal */
	    _extractMessage(exception: any): string;
	    /** @internal */
	    _longStackTrace(stackTrace: any): any;
	    /** @internal */
	    _findContext(exception: any): any;
	    /** @internal */
	    _findOriginalException(exception: any): any;
	    /** @internal */
	    _findOriginalStack(exception: any): any;
	}

}
declare module 'ditsy' {
	export { ExceptionHandler } from 'exception_handler';
	export class BaseException extends Error {
	    message: string;
	    stack: any;
	    constructor(message?: string);
	    toString(): string;
	}
	/**
	 * Wraps an exception and provides additional context or information.
	 */
	export class WrappedException extends Error {
	    private _wrapperMessage;
	    private _originalException;
	    private _originalStack;
	    private _context;
	    private _wrapperStack;
	    constructor(_wrapperMessage: string, _originalException: any, _originalStack?: any, _context?: any);
	    wrapperMessage: string;
	    wrapperStack: any;
	    originalException: any;
	    originalStack: any;
	    context: any;
	    message: string;
	    toString(): string;
	}
	export function makeTypeError(message?: string): Error;
	export function unimplemented(): any;

}
declare module 'ditsyes' {
	export type SetterFn = (obj: any, value: any) => void;
	export type GetterFn = (obj: any) => any;
	export type MethodFn = (obj: any, args: any[]) => any;

}
declare module 'ditsytform_reflection_capabilities' {
	import { Type } from 'angular2/src/facade/lang';
	import { GetterFn, SetterFn, MethodFn } from 'types';
	export interface PlatformReflectionCapabilities {
	    isReflectionEnabled(): boolean;
	    factory(type: Type): Function;
	    interfaces(type: Type): any[];
	    parameters(type: any): any[][];
	    annotations(type: any): any[];
	    propMetadata(typeOrFunc: any): {
	        [key: string]: any[];
	    };
	    getter(name: string): GetterFn;
	    setter(name: string): SetterFn;
	    method(name: string): MethodFn;
	    importUri(type: Type): string;
	}

}
declare module 'ditsylector' {
	import { Type } from 'angular2/src/facade/lang';
	import { SetterFn, GetterFn, MethodFn } from 'types';
	import { PlatformReflectionCapabilities } from 'platform_reflection_capabilities';
	export { SetterFn, GetterFn, MethodFn } from 'types';
	export { PlatformReflectionCapabilities } from 'platform_reflection_capabilities';
	/**
	 * Reflective information about a symbol, including annotations, interfaces, and other metadata.
	 */
	export class ReflectionInfo {
	    annotations: any[];
	    parameters: any[][];
	    factory: Function;
	    interfaces: any[];
	    propMetadata: {
	        [key: string]: any[];
	    };
	    constructor(annotations?: any[], parameters?: any[][], factory?: Function, interfaces?: any[], propMetadata?: {
	        [key: string]: any[];
	    });
	}
	/**
	 * Provides access to reflection data about symbols. Used internally by Angular
	 * to power dependency injection and compilation.
	 */
	export class Reflector {
	    /** @internal */
	    _injectableInfo: Map<any, ReflectionInfo>;
	    /** @internal */
	    _getters: Map<string, (obj: any) => any>;
	    /** @internal */
	    _setters: Map<string, (obj: any, value: any) => void>;
	    /** @internal */
	    _methods: Map<string, (obj: any, args: any[]) => any>;
	    /** @internal */
	    _usedKeys: Set<any>;
	    reflectionCapabilities: PlatformReflectionCapabilities;
	    constructor(reflectionCapabilities: PlatformReflectionCapabilities);
	    isReflectionEnabled(): boolean;
	    /**
	     * Causes `this` reflector to track keys used to access
	     * {@link ReflectionInfo} objects.
	     */
	    trackUsage(): void;
	    /**
	     * Lists types for which reflection information was not requested since
	     * {@link #trackUsage} was called. This list could later be audited as
	     * potential dead code.
	     */
	    listUnusedKeys(): any[];
	    registerFunction(func: Function, funcInfo: ReflectionInfo): void;
	    registerType(type: Type, typeInfo: ReflectionInfo): void;
	    registerGetters(getters: {
	        [key: string]: GetterFn;
	    }): void;
	    registerSetters(setters: {
	        [key: string]: SetterFn;
	    }): void;
	    registerMethods(methods: {
	        [key: string]: MethodFn;
	    }): void;
	    factory(type: Type): Function;
	    parameters(typeOrFunc: any): any[];
	    annotations(typeOrFunc: any): any[];
	    propMetadata(typeOrFunc: any): {
	        [key: string]: any[];
	    };
	    interfaces(type: Type): any[];
	    getter(name: string): GetterFn;
	    setter(name: string): SetterFn;
	    method(name: string): MethodFn;
	    /** @internal */
	    _getReflectionInfo(typeOrFunc: any): ReflectionInfo;
	    /** @internal */
	    _containsReflectionInfo(typeOrFunc: any): boolean;
	    importUri(type: Type): string;
	}

}
declare module 'ditsylection_capabilities' {
	import { Type, ConcreteType } from 'angular2/src/facade/lang';
	import { GetterFn, SetterFn, MethodFn } from 'types';
	import { PlatformReflectionCapabilities } from 'platform_reflection_capabilities';
	export class ReflectionCapabilities implements PlatformReflectionCapabilities {
	    private _reflect;
	    constructor(reflect?: any);
	    isReflectionEnabled(): boolean;
	    factory(t: ConcreteType): Function;
	    /** @internal */
	    _zipTypesAndAnnotaions(paramTypes: any, paramAnnotations: any): any[][];
	    parameters(typeOrFunc: Type): any[][];
	    annotations(typeOrFunc: Type): any[];
	    propMetadata(typeOrFunc: any): {
	        [key: string]: any[];
	    };
	    interfaces(type: Type): any[];
	    getter(name: string): GetterFn;
	    setter(name: string): SetterFn;
	    method(name: string): MethodFn;
	    importUri(type: Type): string;
	}

}
declare module 'ditsylection' {
	import { Reflector } from 'reflector';
	export { Reflector, ReflectionInfo } from 'reflector';
	/**
	 * The {@link Reflector} used internally in Angular to access metadata
	 * about symbols.
	 */
	export var reflector: Reflector;

}
declare module 'ditsyl' {
	/**
	 * Type literals is a Dart-only feature. This is here only so we can x-compile
	 * to multiple languages.
	 */
	export class TypeLiteral {
	    type: any;
	}

}
declare module 'ditsy' {
	export { TypeLiteral } from 'type_literal';
	/**
	 * A unique object used for retrieving items from the {@link Injector}.
	 *
	 * Keys have:
	 * - a system-wide unique `id`.
	 * - a `token`.
	 *
	 * `Key` is used internally by {@link Injector} because its system-wide unique `id` allows the
	 * injector to store created objects in a more efficient way.
	 *
	 * `Key` should not be created directly. {@link Injector} creates keys automatically when resolving
	 * providers.
	 */
	export class Key {
	    token: Object;
	    id: number;
	    /**
	     * Private
	     */
	    constructor(token: Object, id: number);
	    /**
	     * Returns a stringified token.
	     */
	    displayName: string;
	    /**
	     * Retrieves a `Key` for a token.
	     */
	    static get(token: Object): Key;
	    /**
	     * @returns the number of keys registered in the system.
	     */
	    static numberOfKeys: number;
	}
	/**
	 * @internal
	 */
	export class KeyRegistry {
	    private _allKeys;
	    get(token: Object): Key;
	    numberOfKeys: number;
	}

}
declare module 'ditsy' {
	import { BaseException, WrappedException } from 'angular2/src/facade/exceptions';
	import { Key } from 'key';
	import { Injector } from 'injector';
	/**
	 * Base class for all errors arising from misconfigured providers.
	 */
	export class AbstractProviderError extends BaseException {
	    /** @internal */
	    message: string;
	    /** @internal */
	    keys: Key[];
	    /** @internal */
	    injectors: Injector[];
	    /** @internal */
	    constructResolvingMessage: Function;
	    constructor(injector: Injector, key: Key, constructResolvingMessage: Function);
	    addKey(injector: Injector, key: Key): void;
	    context: any;
	}
	/**
	 * Thrown when trying to retrieve a dependency by `Key` from {@link Injector}, but the
	 * {@link Injector} does not have a {@link Provider} for {@link Key}.
	 *
	 * ### Example ([live demo](http://plnkr.co/edit/vq8D3FRB9aGbnWJqtEPE?p=preview))
	 *
	 * ```typescript
	 * class A {
	 *   constructor(b:B) {}
	 * }
	 *
	 * expect(() => Injector.resolveAndCreate([A])).toThrowError();
	 * ```
	 */
	export class NoProviderError extends AbstractProviderError {
	    constructor(injector: Injector, key: Key);
	}
	/**
	 * Thrown when dependencies form a cycle.
	 *
	 * ### Example ([live demo](http://plnkr.co/edit/wYQdNos0Tzql3ei1EV9j?p=info))
	 *
	 * ```typescript
	 * var injector = Injector.resolveAndCreate([
	 *   provide("one", {useFactory: (two) => "two", deps: [[new Inject("two")]]}),
	 *   provide("two", {useFactory: (one) => "one", deps: [[new Inject("one")]]})
	 * ]);
	 *
	 * expect(() => injector.get("one")).toThrowError();
	 * ```
	 *
	 * Retrieving `A` or `B` throws a `CyclicDependencyError` as the graph above cannot be constructed.
	 */
	export class CyclicDependencyError extends AbstractProviderError {
	    constructor(injector: Injector, key: Key);
	}
	/**
	 * Thrown when a constructing type returns with an Error.
	 *
	 * The `InstantiationError` class contains the original error plus the dependency graph which caused
	 * this object to be instantiated.
	 *
	 * ### Example ([live demo](http://plnkr.co/edit/7aWYdcqTQsP0eNqEdUAf?p=preview))
	 *
	 * ```typescript
	 * class A {
	 *   constructor() {
	 *     throw new Error('message');
	 *   }
	 * }
	 *
	 * var injector = Injector.resolveAndCreate([A]);

	 * try {
	 *   injector.get(A);
	 * } catch (e) {
	 *   expect(e instanceof InstantiationError).toBe(true);
	 *   expect(e.originalException.message).toEqual("message");
	 *   expect(e.originalStack).toBeDefined();
	 * }
	 * ```
	 */
	export class InstantiationError extends WrappedException {
	    /** @internal */
	    keys: Key[];
	    /** @internal */
	    injectors: Injector[];
	    constructor(injector: Injector, originalException: any, originalStack: any, key: Key);
	    addKey(injector: Injector, key: Key): void;
	    wrapperMessage: string;
	    causeKey: Key;
	    context: any;
	}
	/**
	 * Thrown when an object other then {@link Provider} (or `Type`) is passed to {@link Injector}
	 * creation.
	 *
	 * ### Example ([live demo](http://plnkr.co/edit/YatCFbPAMCL0JSSQ4mvH?p=preview))
	 *
	 * ```typescript
	 * expect(() => Injector.resolveAndCreate(["not a type"])).toThrowError();
	 * ```
	 */
	export class InvalidProviderError extends BaseException {
	    constructor(provider: any);
	}
	/**
	 * Thrown when the class has no annotation information.
	 *
	 * Lack of annotation information prevents the {@link Injector} from determining which dependencies
	 * need to be injected into the constructor.
	 *
	 * ### Example ([live demo](http://plnkr.co/edit/rHnZtlNS7vJOPQ6pcVkm?p=preview))
	 *
	 * ```typescript
	 * class A {
	 *   constructor(b) {}
	 * }
	 *
	 * expect(() => Injector.resolveAndCreate([A])).toThrowError();
	 * ```
	 *
	 * This error is also thrown when the class not marked with {@link Injectable} has parameter types.
	 *
	 * ```typescript
	 * class B {}
	 *
	 * class A {
	 *   constructor(b:B) {} // no information about the parameter types of A is available at runtime.
	 * }
	 *
	 * expect(() => Injector.resolveAndCreate([A,B])).toThrowError();
	 * ```
	 */
	export class NoAnnotationError extends BaseException {
	    constructor(typeOrFunc: any, params: any[][]);
	    private static _genMessage(typeOrFunc, params);
	}
	/**
	 * Thrown when getting an object by index.
	 *
	 * ### Example ([live demo](http://plnkr.co/edit/bRs0SX2OTQiJzqvjgl8P?p=preview))
	 *
	 * ```typescript
	 * class A {}
	 *
	 * var injector = Injector.resolveAndCreate([A]);
	 *
	 * expect(() => injector.getAt(100)).toThrowError();
	 * ```
	 */
	export class OutOfBoundsError extends BaseException {
	    constructor(index: any);
	}
	/**
	 * Thrown when a multi provider and a regular provider are bound to the same token.
	 *
	 * ### Example
	 *
	 * ```typescript
	 * expect(() => Injector.resolveAndCreate([
	 *   new Provider("Strings", {useValue: "string1", multi: true}),
	 *   new Provider("Strings", {useValue: "string2", multi: false})
	 * ])).toThrowError();
	 * ```
	 */
	export class MixingMultiProvidersWithRegularProvidersError extends BaseException {
	    constructor(provider1: any, provider2: any);
	}

}
declare module 'ditsy' {
	import { Type } from 'angular2/src/facade/lang';
	import { Key } from 'key';
	/**
	 * `Dependency` is used by the framework to extend DI.
	 * This is internal to Angular and should not be used directly.
	 */
	export class Dependency {
	    key: Key;
	    optional: boolean;
	    lowerBoundVisibility: any;
	    upperBoundVisibility: any;
	    properties: any[];
	    constructor(key: Key, optional: boolean, lowerBoundVisibility: any, upperBoundVisibility: any, properties: any[]);
	    static fromKey(key: Key): Dependency;
	}
	/**
	 * Describes how the {@link Injector} should instantiate a given token.
	 *
	 * See {@link provide}.
	 *
	 * ### Example ([live demo](http://plnkr.co/edit/GNAyj6K6PfYg2NBzgwZ5?p%3Dpreview&p=preview))
	 *
	 * ```javascript
	 * var injector = Injector.resolveAndCreate([
	 *   new Provider("message", { useValue: 'Hello' })
	 * ]);
	 *
	 * expect(injector.get("message")).toEqual('Hello');
	 * ```
	 */
	export class Provider {
	    /**
	     * Token used when retrieving this provider. Usually, it is a type {@link Type}.
	     */
	    token: any;
	    /**
	     * Binds a DI token to an implementation class.
	     *
	     * ### Example ([live demo](http://plnkr.co/edit/RSTG86qgmoxCyj9SWPwY?p=preview))
	     *
	     * Because `useExisting` and `useClass` are often confused, the example contains
	     * both use cases for easy comparison.
	     *
	     * ```typescript
	     * class Vehicle {}
	     *
	     * class Car extends Vehicle {}
	     *
	     * var injectorClass = Injector.resolveAndCreate([
	     *   Car,
	     *   new Provider(Vehicle, { useClass: Car })
	     * ]);
	     * var injectorAlias = Injector.resolveAndCreate([
	     *   Car,
	     *   new Provider(Vehicle, { useExisting: Car })
	     * ]);
	     *
	     * expect(injectorClass.get(Vehicle)).not.toBe(injectorClass.get(Car));
	     * expect(injectorClass.get(Vehicle) instanceof Car).toBe(true);
	     *
	     * expect(injectorAlias.get(Vehicle)).toBe(injectorAlias.get(Car));
	     * expect(injectorAlias.get(Vehicle) instanceof Car).toBe(true);
	     * ```
	     */
	    useClass: Type;
	    /**
	     * Binds a DI token to a value.
	     *
	     * ### Example ([live demo](http://plnkr.co/edit/UFVsMVQIDe7l4waWziES?p=preview))
	     *
	     * ```javascript
	     * var injector = Injector.resolveAndCreate([
	     *   new Provider("message", { useValue: 'Hello' })
	     * ]);
	     *
	     * expect(injector.get("message")).toEqual('Hello');
	     * ```
	     */
	    useValue: any;
	    /**
	     * Binds a DI token to an existing token.
	     *
	     * {@link Injector} returns the same instance as if the provided token was used.
	     * This is in contrast to `useClass` where a separate instance of `useClass` is returned.
	     *
	     * ### Example ([live demo](http://plnkr.co/edit/QsatsOJJ6P8T2fMe9gr8?p=preview))
	     *
	     * Because `useExisting` and `useClass` are often confused the example contains
	     * both use cases for easy comparison.
	     *
	     * ```typescript
	     * class Vehicle {}
	     *
	     * class Car extends Vehicle {}
	     *
	     * var injectorAlias = Injector.resolveAndCreate([
	     *   Car,
	     *   new Provider(Vehicle, { useExisting: Car })
	     * ]);
	     * var injectorClass = Injector.resolveAndCreate([
	     *   Car,
	     *   new Provider(Vehicle, { useClass: Car })
	     * ]);
	     *
	     * expect(injectorAlias.get(Vehicle)).toBe(injectorAlias.get(Car));
	     * expect(injectorAlias.get(Vehicle) instanceof Car).toBe(true);
	     *
	     * expect(injectorClass.get(Vehicle)).not.toBe(injectorClass.get(Car));
	     * expect(injectorClass.get(Vehicle) instanceof Car).toBe(true);
	     * ```
	     */
	    useExisting: any;
	    /**
	     * Binds a DI token to a function which computes the value.
	     *
	     * ### Example ([live demo](http://plnkr.co/edit/Scoxy0pJNqKGAPZY1VVC?p=preview))
	     *
	     * ```typescript
	     * var injector = Injector.resolveAndCreate([
	     *   new Provider(Number, { useFactory: () => { return 1+2; }}),
	     *   new Provider(String, { useFactory: (value) => { return "Value: " + value; },
	     *                       deps: [Number] })
	     * ]);
	     *
	     * expect(injector.get(Number)).toEqual(3);
	     * expect(injector.get(String)).toEqual('Value: 3');
	     * ```
	     *
	     * Used in conjunction with dependencies.
	     */
	    useFactory: Function;
	    /**
	     * Specifies a set of dependencies
	     * (as `token`s) which should be injected into the factory function.
	     *
	     * ### Example ([live demo](http://plnkr.co/edit/Scoxy0pJNqKGAPZY1VVC?p=preview))
	     *
	     * ```typescript
	     * var injector = Injector.resolveAndCreate([
	     *   new Provider(Number, { useFactory: () => { return 1+2; }}),
	     *   new Provider(String, { useFactory: (value) => { return "Value: " + value; },
	     *                       deps: [Number] })
	     * ]);
	     *
	     * expect(injector.get(Number)).toEqual(3);
	     * expect(injector.get(String)).toEqual('Value: 3');
	     * ```
	     *
	     * Used in conjunction with `useFactory`.
	     */
	    dependencies: Object[];
	    /** @internal */
	    _multi: boolean;
	    constructor(token: any, {useClass, useValue, useExisting, useFactory, deps, multi}: {
	        useClass?: Type;
	        useValue?: any;
	        useExisting?: any;
	        useFactory?: Function;
	        deps?: Object[];
	        multi?: boolean;
	    });
	    /**
	     * Creates multiple providers matching the same token (a multi-provider).
	     *
	     * Multi-providers are used for creating pluggable service, where the system comes
	     * with some default providers, and the user can register additional providers.
	     * The combination of the default providers and the additional providers will be
	     * used to drive the behavior of the system.
	     *
	     * ### Example
	     *
	     * ```typescript
	     * var injector = Injector.resolveAndCreate([
	     *   new Provider("Strings", { useValue: "String1", multi: true}),
	     *   new Provider("Strings", { useValue: "String2", multi: true})
	     * ]);
	     *
	     * expect(injector.get("Strings")).toEqual(["String1", "String2"]);
	     * ```
	     *
	     * Multi-providers and regular providers cannot be mixed. The following
	     * will throw an exception:
	     *
	     * ```typescript
	     * var injector = Injector.resolveAndCreate([
	     *   new Provider("Strings", { useValue: "String1", multi: true }),
	     *   new Provider("Strings", { useValue: "String2"})
	     * ]);
	     * ```
	     */
	    multi: boolean;
	}
	/**
	 * See {@link Provider} instead.
	 *
	 * @deprecated
	 */
	export class Binding extends Provider {
	    constructor(token: any, {toClass, toValue, toAlias, toFactory, deps, multi}: {
	        toClass?: Type;
	        toValue?: any;
	        toAlias?: any;
	        toFactory: Function;
	        deps?: Object[];
	        multi?: boolean;
	    });
	    /**
	     * @deprecated
	     */
	    toClass: Type;
	    /**
	     * @deprecated
	     */
	    toAlias: any;
	    /**
	     * @deprecated
	     */
	    toFactory: Function;
	    /**
	     * @deprecated
	     */
	    toValue: any;
	}
	/**
	 * An internal resolved representation of a {@link Provider} used by the {@link Injector}.
	 *
	 * It is usually created automatically by `Injector.resolveAndCreate`.
	 *
	 * It can be created manually, as follows:
	 *
	 * ### Example ([live demo](http://plnkr.co/edit/RfEnhh8kUEI0G3qsnIeT?p%3Dpreview&p=preview))
	 *
	 * ```typescript
	 * var resolvedProviders = Injector.resolve([new Provider('message', {useValue: 'Hello'})]);
	 * var injector = Injector.fromResolvedProviders(resolvedProviders);
	 *
	 * expect(injector.get('message')).toEqual('Hello');
	 * ```
	 */
	export interface ResolvedProvider {
	    /**
	     * A key, usually a `Type`.
	     */
	    key: Key;
	    /**
	     * Factory function which can return an instance of an object represented by a key.
	     */
	    resolvedFactories: ResolvedFactory[];
	    /**
	     * Indicates if the provider is a multi-provider or a regular provider.
	     */
	    multiProvider: boolean;
	}
	/**
	 * See {@link ResolvedProvider} instead.
	 *
	 * @deprecated
	 */
	export interface ResolvedBinding extends ResolvedProvider {
	}
	export class ResolvedProvider_ implements ResolvedBinding {
	    key: Key;
	    resolvedFactories: ResolvedFactory[];
	    multiProvider: boolean;
	    constructor(key: Key, resolvedFactories: ResolvedFactory[], multiProvider: boolean);
	    resolvedFactory: ResolvedFactory;
	}
	/**
	 * An internal resolved representation of a factory function created by resolving {@link Provider}.
	 */
	export class ResolvedFactory {
	    /**
	     * Factory function which can return an instance of an object represented by a key.
	     */
	    factory: Function;
	    /**
	     * Arguments (dependencies) to the `factory` function.
	     */
	    dependencies: Dependency[];
	    constructor(
	        /**
	         * Factory function which can return an instance of an object represented by a key.
	         */
	        factory: Function, 
	        /**
	         * Arguments (dependencies) to the `factory` function.
	         */
	        dependencies: Dependency[]);
	}
	/**
	 * Creates a {@link Provider}.
	 *
	 * To construct a {@link Provider}, bind a `token` to either a class, a value, a factory function,
	 * or
	 * to an existing `token`.
	 * See {@link ProviderBuilder} for more details.
	 *
	 * The `token` is most commonly a class or {@link angular2/di/OpaqueToken}.
	 *
	 * @deprecated
	 */
	export function bind(token: any): ProviderBuilder;
	/**
	 * Creates a {@link Provider}.
	 *
	 * See {@link Provider} for more details.
	 *
	 * <!-- TODO: improve the docs -->
	 */
	export function provide(token: any, {useClass, useValue, useExisting, useFactory, deps, multi}: {
	    useClass?: Type;
	    useValue?: any;
	    useExisting?: any;
	    useFactory?: Function;
	    deps?: Object[];
	    multi?: boolean;
	}): Provider;
	/**
	 * Helper class for the {@link bind} function.
	 */
	export class ProviderBuilder {
	    token: any;
	    constructor(token: any);
	    /**
	     * Binds a DI token to a class.
	     *
	     * ### Example ([live demo](http://plnkr.co/edit/ZpBCSYqv6e2ud5KXLdxQ?p=preview))
	     *
	     * Because `toAlias` and `toClass` are often confused, the example contains
	     * both use cases for easy comparison.
	     *
	     * ```typescript
	     * class Vehicle {}
	     *
	     * class Car extends Vehicle {}
	     *
	     * var injectorClass = Injector.resolveAndCreate([
	     *   Car,
	     *   provide(Vehicle, {useClass: Car})
	     * ]);
	     * var injectorAlias = Injector.resolveAndCreate([
	     *   Car,
	     *   provide(Vehicle, {useExisting: Car})
	     * ]);
	     *
	     * expect(injectorClass.get(Vehicle)).not.toBe(injectorClass.get(Car));
	     * expect(injectorClass.get(Vehicle) instanceof Car).toBe(true);
	     *
	     * expect(injectorAlias.get(Vehicle)).toBe(injectorAlias.get(Car));
	     * expect(injectorAlias.get(Vehicle) instanceof Car).toBe(true);
	     * ```
	     */
	    toClass(type: Type): Provider;
	    /**
	     * Binds a DI token to a value.
	     *
	     * ### Example ([live demo](http://plnkr.co/edit/G024PFHmDL0cJFgfZK8O?p=preview))
	     *
	     * ```typescript
	     * var injector = Injector.resolveAndCreate([
	     *   provide('message', {useValue: 'Hello'})
	     * ]);
	     *
	     * expect(injector.get('message')).toEqual('Hello');
	     * ```
	     */
	    toValue(value: any): Provider;
	    /**
	     * Binds a DI token to an existing token.
	     *
	     * Angular will return the same instance as if the provided token was used. (This is
	     * in contrast to `useClass` where a separate instance of `useClass` will be returned.)
	     *
	     * ### Example ([live demo](http://plnkr.co/edit/uBaoF2pN5cfc5AfZapNw?p=preview))
	     *
	     * Because `toAlias` and `toClass` are often confused, the example contains
	     * both use cases for easy comparison.
	     *
	     * ```typescript
	     * class Vehicle {}
	     *
	     * class Car extends Vehicle {}
	     *
	     * var injectorAlias = Injector.resolveAndCreate([
	     *   Car,
	     *   provide(Vehicle, {useExisting: Car})
	     * ]);
	     * var injectorClass = Injector.resolveAndCreate([
	     *   Car,
	     *   provide(Vehicle, {useClass: Car})
	     * ]);
	     *
	     * expect(injectorAlias.get(Vehicle)).toBe(injectorAlias.get(Car));
	     * expect(injectorAlias.get(Vehicle) instanceof Car).toBe(true);
	     *
	     * expect(injectorClass.get(Vehicle)).not.toBe(injectorClass.get(Car));
	     * expect(injectorClass.get(Vehicle) instanceof Car).toBe(true);
	     * ```
	     */
	    toAlias(aliasToken: any): Provider;
	    /**
	     * Binds a DI token to a function which computes the value.
	     *
	     * ### Example ([live demo](http://plnkr.co/edit/OejNIfTT3zb1iBxaIYOb?p=preview))
	     *
	     * ```typescript
	     * var injector = Injector.resolveAndCreate([
	     *   provide(Number, {useFactory: () => { return 1+2; }}),
	     *   provide(String, {useFactory: (v) => { return "Value: " + v; }, deps: [Number]})
	     * ]);
	     *
	     * expect(injector.get(Number)).toEqual(3);
	     * expect(injector.get(String)).toEqual('Value: 3');
	     * ```
	     */
	    toFactory(factory: Function, dependencies?: any[]): Provider;
	}
	/**
	 * Resolve a single provider.
	 */
	export function resolveFactory(provider: Provider): ResolvedFactory;
	/**
	 * Converts the {@link Provider} into {@link ResolvedProvider}.
	 *
	 * {@link Injector} internally only uses {@link ResolvedProvider}, {@link Provider} contains
	 * convenience provider syntax.
	 */
	export function resolveProvider(provider: Provider): ResolvedProvider;
	/**
	 * Resolve a list of Providers.
	 */
	export function resolveProviders(providers: Array<Type | Provider | any[]>): ResolvedProvider[];
	/**
	 * Merges a list of ResolvedProviders into a list where
	 * each key is contained exactly once and multi providers
	 * have been merged.
	 */
	export function mergeResolvedProviders(providers: ResolvedProvider[], normalizedProvidersMap: Map<number, ResolvedProvider>): Map<number, ResolvedProvider>;

}
declare module 'ditsy' {
	import { ResolvedProvider, Provider, Dependency } from 'provider';
	import { Type } from 'angular2/src/facade/lang';
	import { Key } from 'key';
	export const UNDEFINED: Object;
	/**
	 * Visibility of a {@link Provider}.
	 */
	export enum Visibility {
	    /**
	     * A `Public` {@link Provider} is only visible to regular (as opposed to host) child injectors.
	     */
	    Public = 0,
	    /**
	     * A `Private` {@link Provider} is only visible to host (as opposed to regular) child injectors.
	     */
	    Private = 1,
	    /**
	     * A `PublicAndPrivate` {@link Provider} is visible to both host and regular child injectors.
	     */
	    PublicAndPrivate = 2,
	}
	export interface ProtoInjectorStrategy {
	    getProviderAtIndex(index: number): ResolvedProvider;
	    createInjectorStrategy(inj: Injector): InjectorStrategy;
	}
	export class ProtoInjectorInlineStrategy implements ProtoInjectorStrategy {
	    provider0: ResolvedProvider;
	    provider1: ResolvedProvider;
	    provider2: ResolvedProvider;
	    provider3: ResolvedProvider;
	    provider4: ResolvedProvider;
	    provider5: ResolvedProvider;
	    provider6: ResolvedProvider;
	    provider7: ResolvedProvider;
	    provider8: ResolvedProvider;
	    provider9: ResolvedProvider;
	    keyId0: number;
	    keyId1: number;
	    keyId2: number;
	    keyId3: number;
	    keyId4: number;
	    keyId5: number;
	    keyId6: number;
	    keyId7: number;
	    keyId8: number;
	    keyId9: number;
	    visibility0: Visibility;
	    visibility1: Visibility;
	    visibility2: Visibility;
	    visibility3: Visibility;
	    visibility4: Visibility;
	    visibility5: Visibility;
	    visibility6: Visibility;
	    visibility7: Visibility;
	    visibility8: Visibility;
	    visibility9: Visibility;
	    constructor(protoEI: ProtoInjector, bwv: ProviderWithVisibility[]);
	    getProviderAtIndex(index: number): any;
	    createInjectorStrategy(injector: Injector): InjectorStrategy;
	}
	export class ProtoInjectorDynamicStrategy implements ProtoInjectorStrategy {
	    providers: ResolvedProvider[];
	    keyIds: number[];
	    visibilities: Visibility[];
	    constructor(protoInj: ProtoInjector, bwv: ProviderWithVisibility[]);
	    getProviderAtIndex(index: number): any;
	    createInjectorStrategy(ei: Injector): InjectorStrategy;
	}
	export class ProtoInjector {
	    static fromResolvedProviders(providers: ResolvedProvider[]): ProtoInjector;
	    /** @internal */
	    _strategy: ProtoInjectorStrategy;
	    numberOfProviders: number;
	    constructor(bwv: ProviderWithVisibility[]);
	    getProviderAtIndex(index: number): any;
	}
	export interface InjectorStrategy {
	    getObjByKeyId(keyId: number, visibility: Visibility): any;
	    getObjAtIndex(index: number): any;
	    getMaxNumberOfObjects(): number;
	    resetConstructionCounter(): void;
	    instantiateProvider(provider: ResolvedProvider, visibility: Visibility): any;
	}
	export class InjectorInlineStrategy implements InjectorStrategy {
	    injector: Injector;
	    protoStrategy: ProtoInjectorInlineStrategy;
	    obj0: any;
	    obj1: any;
	    obj2: any;
	    obj3: any;
	    obj4: any;
	    obj5: any;
	    obj6: any;
	    obj7: any;
	    obj8: any;
	    obj9: any;
	    constructor(injector: Injector, protoStrategy: ProtoInjectorInlineStrategy);
	    resetConstructionCounter(): void;
	    instantiateProvider(provider: ResolvedProvider, visibility: Visibility): any;
	    getObjByKeyId(keyId: number, visibility: Visibility): any;
	    getObjAtIndex(index: number): any;
	    getMaxNumberOfObjects(): number;
	}
	export class InjectorDynamicStrategy implements InjectorStrategy {
	    protoStrategy: ProtoInjectorDynamicStrategy;
	    injector: Injector;
	    objs: any[];
	    constructor(protoStrategy: ProtoInjectorDynamicStrategy, injector: Injector);
	    resetConstructionCounter(): void;
	    instantiateProvider(provider: ResolvedProvider, visibility: Visibility): any;
	    getObjByKeyId(keyId: number, visibility: Visibility): any;
	    getObjAtIndex(index: number): any;
	    getMaxNumberOfObjects(): number;
	}
	export class ProviderWithVisibility {
	    provider: ResolvedProvider;
	    visibility: Visibility;
	    constructor(provider: ResolvedProvider, visibility: Visibility);
	    getKeyId(): number;
	}
	/**
	 * Used to provide dependencies that cannot be easily expressed as providers.
	 */
	export interface DependencyProvider {
	    getDependency(injector: Injector, provider: ResolvedProvider, dependency: Dependency): any;
	}
	/**
	 * A dependency injection container used for instantiating objects and resolving dependencies.
	 *
	 * An `Injector` is a replacement for a `new` operator, which can automatically resolve the
	 * constructor dependencies.
	 *
	 * In typical use, application code asks for the dependencies in the constructor and they are
	 * resolved by the `Injector`.
	 *
	 * ### Example ([live demo](http://plnkr.co/edit/jzjec0?p=preview))
	 *
	 * The following example creates an `Injector` configured to create `Engine` and `Car`.
	 *
	 * ```typescript
	 * @Injectable()
	 * class Engine {
	 * }
	 *
	 * @Injectable()
	 * class Car {
	 *   constructor(public engine:Engine) {}
	 * }
	 *
	 * var injector = Injector.resolveAndCreate([Car, Engine]);
	 * var car = injector.get(Car);
	 * expect(car instanceof Car).toBe(true);
	 * expect(car.engine instanceof Engine).toBe(true);
	 * ```
	 *
	 * Notice, we don't use the `new` operator because we explicitly want to have the `Injector`
	 * resolve all of the object's dependencies automatically.
	 */
	export class Injector {
	    private _isHostBoundary;
	    private _depProvider;
	    private _debugContext;
	    /**
	     * Turns an array of provider definitions into an array of resolved providers.
	     *
	     * A resolution is a process of flattening multiple nested arrays and converting individual
	     * providers into an array of {@link ResolvedProvider}s.
	     *
	     * ### Example ([live demo](http://plnkr.co/edit/AiXTHi?p=preview))
	     *
	     * ```typescript
	     * @Injectable()
	     * class Engine {
	     * }
	     *
	     * @Injectable()
	     * class Car {
	     *   constructor(public engine:Engine) {}
	     * }
	     *
	     * var providers = Injector.resolve([Car, [[Engine]]]);
	     *
	     * expect(providers.length).toEqual(2);
	     *
	     * expect(providers[0] instanceof ResolvedProvider).toBe(true);
	     * expect(providers[0].key.displayName).toBe("Car");
	     * expect(providers[0].dependencies.length).toEqual(1);
	     * expect(providers[0].factory).toBeDefined();
	     *
	     * expect(providers[1].key.displayName).toBe("Engine");
	     * });
	     * ```
	     *
	     * See {@link Injector#fromResolvedProviders} for more info.
	     */
	    static resolve(providers: Array<Type | Provider | any[]>): ResolvedProvider[];
	    /**
	     * Resolves an array of providers and creates an injector from those providers.
	     *
	     * The passed-in providers can be an array of `Type`, {@link Provider},
	     * or a recursive array of more providers.
	     *
	     * ### Example ([live demo](http://plnkr.co/edit/ePOccA?p=preview))
	     *
	     * ```typescript
	     * @Injectable()
	     * class Engine {
	     * }
	     *
	     * @Injectable()
	     * class Car {
	     *   constructor(public engine:Engine) {}
	     * }
	     *
	     * var injector = Injector.resolveAndCreate([Car, Engine]);
	     * expect(injector.get(Car) instanceof Car).toBe(true);
	     * ```
	     *
	     * This function is slower than the corresponding `fromResolvedProviders`
	     * because it needs to resolve the passed-in providers first.
	     * See {@link Injector#resolve} and {@link Injector#fromResolvedProviders}.
	     */
	    static resolveAndCreate(providers: Array<Type | Provider | any[]>): Injector;
	    /**
	     * Creates an injector from previously resolved providers.
	     *
	     * This API is the recommended way to construct injectors in performance-sensitive parts.
	     *
	     * ### Example ([live demo](http://plnkr.co/edit/KrSMci?p=preview))
	     *
	     * ```typescript
	     * @Injectable()
	     * class Engine {
	     * }
	     *
	     * @Injectable()
	     * class Car {
	     *   constructor(public engine:Engine) {}
	     * }
	     *
	     * var providers = Injector.resolve([Car, Engine]);
	     * var injector = Injector.fromResolvedProviders(providers);
	     * expect(injector.get(Car) instanceof Car).toBe(true);
	     * ```
	     */
	    static fromResolvedProviders(providers: ResolvedProvider[]): Injector;
	    /**
	     * @deprecated
	     */
	    static fromResolvedBindings(providers: ResolvedProvider[]): Injector;
	    /** @internal */
	    _strategy: InjectorStrategy;
	    /** @internal */
	    _constructionCounter: number;
	    /** @internal */
	    _proto: any;
	    /** @internal */
	    _parent: Injector;
	    /**
	     * Private
	     */
	    constructor(_proto: any, _parent?: Injector, _isHostBoundary?: boolean, _depProvider?: any, _debugContext?: Function);
	    /**
	     * Whether this injector is a boundary to a host.
	     * @internal
	     */
	    hostBoundary: boolean;
	    /**
	     * @internal
	     */
	    debugContext(): any;
	    /**
	     * Retrieves an instance from the injector based on the provided token.
	     * Throws {@link NoProviderError} if not found.
	     *
	     * ### Example ([live demo](http://plnkr.co/edit/HeXSHg?p=preview))
	     *
	     * ```typescript
	     * var injector = Injector.resolveAndCreate([
	     *   provide("validToken", {useValue: "Value"})
	     * ]);
	     * expect(injector.get("validToken")).toEqual("Value");
	     * expect(() => injector.get("invalidToken")).toThrowError();
	     * ```
	     *
	     * `Injector` returns itself when given `Injector` as a token.
	     *
	     * ```typescript
	     * var injector = Injector.resolveAndCreate([]);
	     * expect(injector.get(Injector)).toBe(injector);
	     * ```
	     */
	    get(token: any): any;
	    /**
	     * Retrieves an instance from the injector based on the provided token.
	     * Returns null if not found.
	     *
	     * ### Example ([live demo](http://plnkr.co/edit/tpEbEy?p=preview))
	     *
	     * ```typescript
	     * var injector = Injector.resolveAndCreate([
	     *   provide("validToken", {useValue: "Value"})
	     * ]);
	     * expect(injector.getOptional("validToken")).toEqual("Value");
	     * expect(injector.getOptional("invalidToken")).toBe(null);
	     * ```
	     *
	     * `Injector` returns itself when given `Injector` as a token.
	     *
	     * ```typescript
	     * var injector = Injector.resolveAndCreate([]);
	     * expect(injector.getOptional(Injector)).toBe(injector);
	     * ```
	     */
	    getOptional(token: any): any;
	    /**
	     * @internal
	     */
	    getAt(index: number): any;
	    /**
	     * Parent of this injector.
	     *
	     * <!-- TODO: Add a link to the section of the user guide talking about hierarchical injection.
	     * -->
	     *
	     * ### Example ([live demo](http://plnkr.co/edit/eosMGo?p=preview))
	     *
	     * ```typescript
	     * var parent = Injector.resolveAndCreate([]);
	     * var child = parent.resolveAndCreateChild([]);
	     * expect(child.parent).toBe(parent);
	     * ```
	     */
	    parent: Injector;
	    /**
	     * @internal
	     * Internal. Do not use.
	     * We return `any` not to export the InjectorStrategy type.
	     */
	    internalStrategy: any;
	    /**
	     * Resolves an array of providers and creates a child injector from those providers.
	     *
	     * <!-- TODO: Add a link to the section of the user guide talking about hierarchical injection.
	     * -->
	     *
	     * The passed-in providers can be an array of `Type`, {@link Provider},
	     * or a recursive array of more providers.
	     *
	     * ### Example ([live demo](http://plnkr.co/edit/opB3T4?p=preview))
	     *
	     * ```typescript
	     * class ParentProvider {}
	     * class ChildProvider {}
	     *
	     * var parent = Injector.resolveAndCreate([ParentProvider]);
	     * var child = parent.resolveAndCreateChild([ChildProvider]);
	     *
	     * expect(child.get(ParentProvider) instanceof ParentProvider).toBe(true);
	     * expect(child.get(ChildProvider) instanceof ChildProvider).toBe(true);
	     * expect(child.get(ParentProvider)).toBe(parent.get(ParentProvider));
	     * ```
	     *
	     * This function is slower than the corresponding `createChildFromResolved`
	     * because it needs to resolve the passed-in providers first.
	     * See {@link Injector#resolve} and {@link Injector#createChildFromResolved}.
	     */
	    resolveAndCreateChild(providers: Array<Type | Provider | any[]>): Injector;
	    /**
	     * Creates a child injector from previously resolved providers.
	     *
	     * <!-- TODO: Add a link to the section of the user guide talking about hierarchical injection.
	     * -->
	     *
	     * This API is the recommended way to construct injectors in performance-sensitive parts.
	     *
	     * ### Example ([live demo](http://plnkr.co/edit/VhyfjN?p=preview))
	     *
	     * ```typescript
	     * class ParentProvider {}
	     * class ChildProvider {}
	     *
	     * var parentProviders = Injector.resolve([ParentProvider]);
	     * var childProviders = Injector.resolve([ChildProvider]);
	     *
	     * var parent = Injector.fromResolvedProviders(parentProviders);
	     * var child = parent.createChildFromResolved(childProviders);
	     *
	     * expect(child.get(ParentProvider) instanceof ParentProvider).toBe(true);
	     * expect(child.get(ChildProvider) instanceof ChildProvider).toBe(true);
	     * expect(child.get(ParentProvider)).toBe(parent.get(ParentProvider));
	     * ```
	     */
	    createChildFromResolved(providers: ResolvedProvider[]): Injector;
	    /**
	     * Resolves a provider and instantiates an object in the context of the injector.
	     *
	     * The created object does not get cached by the injector.
	     *
	     * ### Example ([live demo](http://plnkr.co/edit/yvVXoB?p=preview))
	     *
	     * ```typescript
	     * @Injectable()
	     * class Engine {
	     * }
	     *
	     * @Injectable()
	     * class Car {
	     *   constructor(public engine:Engine) {}
	     * }
	     *
	     * var injector = Injector.resolveAndCreate([Engine]);
	     *
	     * var car = injector.resolveAndInstantiate(Car);
	     * expect(car.engine).toBe(injector.get(Engine));
	     * expect(car).not.toBe(injector.resolveAndInstantiate(Car));
	     * ```
	     */
	    resolveAndInstantiate(provider: Type | Provider): any;
	    /**
	     * Instantiates an object using a resolved provider in the context of the injector.
	     *
	     * The created object does not get cached by the injector.
	     *
	     * ### Example ([live demo](http://plnkr.co/edit/ptCImQ?p=preview))
	     *
	     * ```typescript
	     * @Injectable()
	     * class Engine {
	     * }
	     *
	     * @Injectable()
	     * class Car {
	     *   constructor(public engine:Engine) {}
	     * }
	     *
	     * var injector = Injector.resolveAndCreate([Engine]);
	     * var carProvider = Injector.resolve([Car])[0];
	     * var car = injector.instantiateResolved(carProvider);
	     * expect(car.engine).toBe(injector.get(Engine));
	     * expect(car).not.toBe(injector.instantiateResolved(carProvider));
	     * ```
	     */
	    instantiateResolved(provider: ResolvedProvider): any;
	    /** @internal */
	    _new(provider: ResolvedProvider, visibility: Visibility): any;
	    private _instantiateProvider(provider, visibility);
	    private _instantiate(provider, resolvedFactory, visibility);
	    private _getByDependency(provider, dep, providerVisibility);
	    private _getByKey(key, lowerBoundVisibility, upperBoundVisibility, optional, providerVisibility);
	    /** @internal */
	    _throwOrNull(key: Key, optional: boolean): any;
	    /** @internal */
	    _getByKeySelf(key: Key, optional: boolean, providerVisibility: Visibility): any;
	    /** @internal */
	    _getByKeyHost(key: Key, optional: boolean, providerVisibility: Visibility, lowerBoundVisibility: Object): any;
	    /** @internal */
	    _getPrivateDependency(key: Key, optional: boolean, inj: Injector): any;
	    /** @internal */
	    _getByKeyDefault(key: Key, optional: boolean, providerVisibility: Visibility, lowerBoundVisibility: Object): any;
	    displayName: string;
	    toString(): string;
	}

}
declare module 'ditsyn' {
	/**
	 * Creates a token that can be used in a DI Provider.
	 *
	 * ### Example ([live demo](http://plnkr.co/edit/Ys9ezXpj2Mnoy3Uc8KBp?p=preview))
	 *
	 * ```typescript
	 * var t = new OpaqueToken("value");
	 *
	 * var injector = Injector.resolveAndCreate([
	 *   provide(t, {useValue: "providedValue"})
	 * ]);
	 *
	 * expect(injector.get(t)).toEqual("bindingValue");
	 * ```
	 *
	 * Using an `OpaqueToken` is preferable to using strings as tokens because of possible collisions
	 * caused by multiple providers using the same string as two different tokens.
	 *
	 * Using an `OpaqueToken` is preferable to using an `Object` as tokens because it provides better
	 * error messages.
	 */
	export class OpaqueToken {
	    private _desc;
	    constructor(_desc: string);
	    toString(): string;
	}

}
declare module 'ditsy' {
	/**
	 * @module
	 * @description
	 * The `di` module provides dependency injection container services.
	 */
	export { InjectMetadata, OptionalMetadata, InjectableMetadata, SelfMetadata, HostMetadata, SkipSelfMetadata, DependencyMetadata } from 'di/metadata';
	export * from 'di/decorators';
	export { forwardRef, resolveForwardRef, ForwardRefFn } from 'di/forward_ref';
	export { Injector } from 'di/injector';
	export { Binding, ProviderBuilder, ResolvedBinding, ResolvedFactory, Dependency, bind, Provider, ResolvedProvider, provide } from 'di/provider';
	export { Key, TypeLiteral } from 'di/key';
	export { NoProviderError, AbstractProviderError, CyclicDependencyError, InstantiationError, InvalidProviderError, NoAnnotationError, OutOfBoundsError } from 'di/exceptions';
	export { OpaqueToken } from 'di/opaque_token';

}
/// <reference path="es6-shim/es6-shim.d.ts" />
/// <reference path="node/node.d.ts" />
declare module 'ditsy/target/src/core/di/metadata' {
	/**
	 * A parameter metadata that specifies a dependency.
	 *
	 * ### Example ([live demo](http://plnkr.co/edit/6uHYJK?p=preview))
	 *
	 * ```typescript
	 * class Engine {}
	 *
	 * @Injectable()
	 * class Car {
	 *   engine;
	 *   constructor(@Inject("MyEngine") engine:Engine) {
	 *     this.engine = engine;
	 *   }
	 * }
	 *
	 * var injector = Injector.resolveAndCreate([
	 *  provide("MyEngine", {useClass: Engine}),
	 *  Car
	 * ]);
	 *
	 * expect(injector.get(Car).engine instanceof Engine).toBe(true);
	 * ```
	 *
	 * When `@Inject()` is not present, {@link Injector} will use the type annotation of the parameter.
	 *
	 * ### Example
	 *
	 * ```typescript
	 * class Engine {}
	 *
	 * @Injectable()
	 * class Car {
	 *   constructor(public engine: Engine) {} //same as constructor(@Inject(Engine) engine:Engine)
	 * }
	 *
	 * var injector = Injector.resolveAndCreate([Engine, Car]);
	 * expect(injector.get(Car).engine instanceof Engine).toBe(true);
	 * ```
	 */
	export class InjectMetadata {
	    token: any;
	    constructor(token: any);
	    toString(): string;
	}
	/**
	 * A parameter metadata that marks a dependency as optional. {@link Injector} provides `null` if
	 * the dependency is not found.
	 *
	 * ### Example ([live demo](http://plnkr.co/edit/AsryOm?p=preview))
	 *
	 * ```typescript
	 * class Engine {}
	 *
	 * @Injectable()
	 * class Car {
	 *   engine;
	 *   constructor(@Optional() engine:Engine) {
	 *     this.engine = engine;
	 *   }
	 * }
	 *
	 * var injector = Injector.resolveAndCreate([Car]);
	 * expect(injector.get(Car).engine).toBeNull();
	 * ```
	 */
	export class OptionalMetadata {
	    toString(): string;
	}
	/**
	 * `DependencyMetadata` is used by the framework to extend DI.
	 * This is internal to Angular and should not be used directly.
	 */
	export class DependencyMetadata {
	    token: any;
	}
	/**
	 * A marker metadata that marks a class as available to {@link Injector} for creation.
	 *
	 * ### Example ([live demo](http://plnkr.co/edit/Wk4DMQ?p=preview))
	 *
	 * ```typescript
	 * @Injectable()
	 * class UsefulService {}
	 *
	 * @Injectable()
	 * class NeedsService {
	 *   constructor(public service:UsefulService) {}
	 * }
	 *
	 * var injector = Injector.resolveAndCreate([NeedsService, UsefulService]);
	 * expect(injector.get(NeedsService).service instanceof UsefulService).toBe(true);
	 * ```
	 * {@link Injector} will throw {@link NoAnnotationError} when trying to instantiate a class that
	 * does not have `@Injectable` marker, as shown in the example below.
	 *
	 * ```typescript
	 * class UsefulService {}
	 *
	 * class NeedsService {
	 *   constructor(public service:UsefulService) {}
	 * }
	 *
	 * var injector = Injector.resolveAndCreate([NeedsService, UsefulService]);
	 * expect(() => injector.get(NeedsService)).toThrowError();
	 * ```
	 */
	export class InjectableMetadata {
	    constructor();
	}
	/**
	 * Specifies that an {@link Injector} should retrieve a dependency only from itself.
	 *
	 * ### Example ([live demo](http://plnkr.co/edit/NeagAg?p=preview))
	 *
	 * ```typescript
	 * class Dependency {
	 * }
	 *
	 * @Injectable()
	 * class NeedsDependency {
	 *   dependency;
	 *   constructor(@Self() dependency:Dependency) {
	 *     this.dependency = dependency;
	 *   }
	 * }
	 *
	 * var inj = Injector.resolveAndCreate([Dependency, NeedsDependency]);
	 * var nd = inj.get(NeedsDependency);
	 *
	 * expect(nd.dependency instanceof Dependency).toBe(true);
	 *
	 * var inj = Injector.resolveAndCreate([Dependency]);
	 * var child = inj.resolveAndCreateChild([NeedsDependency]);
	 * expect(() => child.get(NeedsDependency)).toThrowError();
	 * ```
	 */
	export class SelfMetadata {
	    toString(): string;
	}
	/**
	 * Specifies that the dependency resolution should start from the parent injector.
	 *
	 * ### Example ([live demo](http://plnkr.co/edit/Wchdzb?p=preview))
	 *
	 * ```typescript
	 * class Dependency {
	 * }
	 *
	 * @Injectable()
	 * class NeedsDependency {
	 *   dependency;
	 *   constructor(@SkipSelf() dependency:Dependency) {
	 *     this.dependency = dependency;
	 *   }
	 * }
	 *
	 * var parent = Injector.resolveAndCreate([Dependency]);
	 * var child = parent.resolveAndCreateChild([NeedsDependency]);
	 * expect(child.get(NeedsDependency).dependency instanceof Depedency).toBe(true);
	 *
	 * var inj = Injector.resolveAndCreate([Dependency, NeedsDependency]);
	 * expect(() => inj.get(NeedsDependency)).toThrowError();
	 * ```
	 */
	export class SkipSelfMetadata {
	    toString(): string;
	}
	/**
	 * Specifies that an injector should retrieve a dependency from any injector until reaching the
	 * closest host.
	 *
	 * In Angular, a component element is automatically declared as a host for all the injectors in
	 * its view.
	 *
	 * ### Example ([live demo](http://plnkr.co/edit/GX79pV?p=preview))
	 *
	 * In the following example `App` contains `ParentCmp`, which contains `ChildDirective`.
	 * So `ParentCmp` is the host of `ChildDirective`.
	 *
	 * `ChildDirective` depends on two services: `HostService` and `OtherService`.
	 * `HostService` is defined at `ParentCmp`, and `OtherService` is defined at `App`.
	 *
	 *```typescript
	 * class OtherService {}
	 * class HostService {}
	 *
	 * @Directive({
	 *   selector: 'child-directive'
	 * })
	 * class ChildDirective {
	 *   constructor(@Optional() @Host() os:OtherService, @Optional() @Host() hs:HostService){
	 *     console.log("os is null", os);
	 *     console.log("hs is NOT null", hs);
	 *   }
	 * }
	 *
	 * @Component({
	 *   selector: 'parent-cmp',
	 *   providers: [HostService],
	 *   template: `
	 *     Dir: <child-directive></child-directive>
	 *   `,
	 *   directives: [ChildDirective]
	 * })
	 * class ParentCmp {
	 * }
	 *
	 * @Component({
	 *   selector: 'app',
	 *   providers: [OtherService],
	 *   template: `
	 *     Parent: <parent-cmp></parent-cmp>
	 *   `,
	 *   directives: [ParentCmp]
	 * })
	 * class App {
	 * }
	 *
	 * bootstrap(App);
	 *```
	 */
	export class HostMetadata {
	    toString(): string;
	}

}
declare module 'ditsy/target/src/core/di/decorators' {
	import { InjectMetadata, OptionalMetadata, InjectableMetadata, SelfMetadata, HostMetadata, SkipSelfMetadata } from 'ditsy/target/src/core/di/metadata';
	/**
	 * Factory for creating {@link InjectMetadata}.
	 */
	export interface InjectFactory {
	    (token: any): any;
	    new (token: any): InjectMetadata;
	}
	/**
	 * Factory for creating {@link OptionalMetadata}.
	 */
	export interface OptionalFactory {
	    (): any;
	    new (): OptionalMetadata;
	}
	/**
	 * Factory for creating {@link InjectableMetadata}.
	 */
	export interface InjectableFactory {
	    (): any;
	    new (): InjectableMetadata;
	}
	/**
	 * Factory for creating {@link SelfMetadata}.
	 */
	export interface SelfFactory {
	    (): any;
	    new (): SelfMetadata;
	}
	/**
	 * Factory for creating {@link HostMetadata}.
	 */
	export interface HostFactory {
	    (): any;
	    new (): HostMetadata;
	}
	/**
	 * Factory for creating {@link SkipSelfMetadata}.
	 */
	export interface SkipSelfFactory {
	    (): any;
	    new (): SkipSelfMetadata;
	}
	/**
	 * Factory for creating {@link InjectMetadata}.
	 */
	export var Inject: InjectFactory;
	/**
	 * Factory for creating {@link OptionalMetadata}.
	 */
	export var Optional: OptionalFactory;
	/**
	 * Factory for creating {@link InjectableMetadata}.
	 */
	export var Injectable: InjectableFactory;
	/**
	 * Factory for creating {@link SelfMetadata}.
	 */
	export var Self: SelfFactory;
	/**
	 * Factory for creating {@link HostMetadata}.
	 */
	export var Host: HostFactory;
	/**
	 * Factory for creating {@link SkipSelfMetadata}.
	 */
	export var SkipSelf: SkipSelfFactory;

}
declare module 'ditsy/target/src/facade/lang' {
	/// <reference path="../../../angular2/manual_typings/globals.d.ts" />
	export const IS_DART: boolean; var _global: BrowserNodeGlobal;
	export { _global as global };
	export var Type: FunctionConstructor;
	/**
	 * Runtime representation a type that a Component or other object is instances of.
	 *
	 * An example of a `Type` is `MyCustomComponent` class, which in JavaScript is be represented by
	 * the `MyCustomComponent` constructor function.
	 */
	export interface Type extends Function {
	}
	/**
	 * Runtime representation of a type that is constructable (non-abstract).
	 */
	export interface ConcreteType extends Type {
	    new (...args: any[]): any;
	}
	export function getTypeNameForDebugging(type: Type): string;
	export var Math: Math;
	export var Date: DateConstructor;
	export function lockMode(): void;
	/**
	 * Disable Angular's development mode, which turns off assertions and other
	 * checks within the framework.
	 *
	 * One important assertion this disables verifies that a change detection pass
	 * does not result in additional changes to any bindings (also known as
	 * unidirectional data flow).
	 */
	export function enableProdMode(): void;
	export function assertionsEnabled(): boolean;
	export function CONST_EXPR<T>(expr: T): T;
	export function CONST(): ClassDecorator & PropertyDecorator;
	export function isPresent(obj: any): boolean;
	export function isBlank(obj: any): boolean;
	export function isString(obj: any): boolean;
	export function isFunction(obj: any): boolean;
	export function isType(obj: any): boolean;
	export function isStringMap(obj: any): boolean;
	export function isPromise(obj: any): boolean;
	export function isArray(obj: any): boolean;
	export function isNumber(obj: any): boolean;
	export function isDate(obj: any): boolean;
	export function noop(): void;
	export function stringify(token: any): string;
	export function serializeEnum(val: any): number;
	export function deserializeEnum(val: any, values: Map<number, any>): any;
	export class StringWrapper {
	    static fromCharCode(code: number): string;
	    static charCodeAt(s: string, index: number): number;
	    static split(s: string, regExp: RegExp): string[];
	    static equals(s: string, s2: string): boolean;
	    static stripLeft(s: string, charVal: string): string;
	    static stripRight(s: string, charVal: string): string;
	    static replace(s: string, from: string, replace: string): string;
	    static replaceAll(s: string, from: RegExp, replace: string): string;
	    static slice<T>(s: string, from?: number, to?: number): string;
	    static replaceAllMapped(s: string, from: RegExp, cb: Function): string;
	    static contains(s: string, substr: string): boolean;
	    static compare(a: string, b: string): number;
	}
	export class StringJoiner {
	    parts: any[];
	    constructor(parts?: any[]);
	    add(part: string): void;
	    toString(): string;
	}
	export class NumberParseError extends Error {
	    message: string;
	    name: string;
	    constructor(message: string);
	    toString(): string;
	}
	export class NumberWrapper {
	    static toFixed(n: number, fractionDigits: number): string;
	    static equal(a: number, b: number): boolean;
	    static parseIntAutoRadix(text: string): number;
	    static parseInt(text: string, radix: number): number;
	    static parseFloat(text: string): number;
	    static NaN: number;
	    static isNaN(value: any): boolean;
	    static isInteger(value: any): boolean;
	}
	export var RegExp: RegExpConstructor;
	export class RegExpWrapper {
	    static create(regExpStr: string, flags?: string): RegExp;
	    static firstMatch(regExp: RegExp, input: string): RegExpExecArray;
	    static test(regExp: RegExp, input: string): boolean;
	    static matcher(regExp: RegExp, input: string): {
	        re: RegExp;
	        input: string;
	    };
	}
	export class RegExpMatcherWrapper {
	    static next(matcher: {
	        re: RegExp;
	        input: string;
	    }): RegExpExecArray;
	}
	export class FunctionWrapper {
	    static apply(fn: Function, posArgs: any): any;
	}
	export function looseIdentical(a: any, b: any): boolean;
	export function getMapKey<T>(value: T): T;
	export function normalizeBlank(obj: Object): any;
	export function normalizeBool(obj: boolean): boolean;
	export function isJsObject(o: any): boolean;
	export function print(obj: Error | Object): void;
	export class Json {
	    static parse(s: string): Object;
	    static stringify(data: Object): string;
	}
	export class DateWrapper {
	    static create(year: number, month?: number, day?: number, hour?: number, minutes?: number, seconds?: number, milliseconds?: number): Date;
	    static fromISOString(str: string): Date;
	    static fromMillis(ms: number): Date;
	    static toMillis(date: Date): number;
	    static now(): Date;
	    static toJson(date: Date): string;
	}
	export function setValueOnPath(global: any, path: string, value: any): void;
	export function getSymbolIterator(): string | symbol;
	export function evalExpression(sourceUrl: string, expr: string, declarations: string, vars: {
	    [key: string]: any;
	}): any;

}
declare module 'ditsy/target/src/core/di/forward_ref' {
	import { Type } from 'ditsy/target/src/facade/lang';
	/**
	 * An interface that a function passed into {@link forwardRef} has to implement.
	 *
	 * ### Example
	 *
	 * {@example core/di/ts/forward_ref/forward_ref.ts region='forward_ref_fn'}
	 */
	export interface ForwardRefFn {
	    (): any;
	}
	/**
	 * Allows to refer to references which are not yet defined.
	 *
	 * For instance, `forwardRef` is used when the `token` which we need to refer to for the purposes of
	 * DI is declared,
	 * but not yet defined. It is also used when the `token` which we use when creating a query is not
	 * yet defined.
	 *
	 * ### Example
	 * {@example core/di/ts/forward_ref/forward_ref.ts region='forward_ref'}
	 */
	export function forwardRef(forwardRefFn: ForwardRefFn): Type;
	/**
	 * Lazily retrieves the reference value from a forwardRef.
	 *
	 * Acts as the identity function when given a non-forward-ref value.
	 *
	 * ### Example ([live demo](http://plnkr.co/edit/GU72mJrk1fiodChcmiDR?p=preview))
	 *
	 * ```typescript
	 * var ref = forwardRef(() => "refValue");
	 * expect(resolveForwardRef(ref)).toEqual("refValue");
	 * expect(resolveForwardRef("regularValue")).toEqual("regularValue");
	 * ```
	 *
	 * See: {@link forwardRef}
	 */
	export function resolveForwardRef(type: any): any;

}
declare module 'ditsy/target/src/core/di/type_literal' {
	/**
	 * Type literals is a Dart-only feature. This is here only so we can x-compile
	 * to multiple languages.
	 */
	export class TypeLiteral {
	    type: any;
	}

}
declare module 'ditsy/target/src/core/di/key' {
	export { TypeLiteral } from 'ditsy/target/src/core/di/type_literal';
	/**
	 * A unique object used for retrieving items from the {@link Injector}.
	 *
	 * Keys have:
	 * - a system-wide unique `id`.
	 * - a `token`.
	 *
	 * `Key` is used internally by {@link Injector} because its system-wide unique `id` allows the
	 * injector to store created objects in a more efficient way.
	 *
	 * `Key` should not be created directly. {@link Injector} creates keys automatically when resolving
	 * providers.
	 */
	export class Key {
	    token: Object;
	    id: number;
	    /**
	     * Private
	     */
	    constructor(token: Object, id: number);
	    /**
	     * Returns a stringified token.
	     */
	    displayName: string;
	    /**
	     * Retrieves a `Key` for a token.
	     */
	    static get(token: Object): Key;
	    /**
	     * @returns the number of keys registered in the system.
	     */
	    static numberOfKeys: number;
	}
	/**
	 * @internal
	 */
	export class KeyRegistry {
	    private _allKeys;
	    get(token: Object): Key;
	    numberOfKeys: number;
	}

}
declare module 'ditsy/target/src/core/di/provider' {
	import { Type } from 'ditsy/target/src/facade/lang';
	import { Key } from 'ditsy/target/src/core/di/key';
	/**
	 * `Dependency` is used by the framework to extend DI.
	 * This is internal to Angular and should not be used directly.
	 */
	export class Dependency {
	    key: Key;
	    optional: boolean;
	    lowerBoundVisibility: any;
	    upperBoundVisibility: any;
	    properties: any[];
	    constructor(key: Key, optional: boolean, lowerBoundVisibility: any, upperBoundVisibility: any, properties: any[]);
	    static fromKey(key: Key): Dependency;
	}
	/**
	 * Describes how the {@link Injector} should instantiate a given token.
	 *
	 * See {@link provide}.
	 *
	 * ### Example ([live demo](http://plnkr.co/edit/GNAyj6K6PfYg2NBzgwZ5?p%3Dpreview&p=preview))
	 *
	 * ```javascript
	 * var injector = Injector.resolveAndCreate([
	 *   new Provider("message", { useValue: 'Hello' })
	 * ]);
	 *
	 * expect(injector.get("message")).toEqual('Hello');
	 * ```
	 */
	export class Provider {
	    /**
	     * Token used when retrieving this provider. Usually, it is a type {@link Type}.
	     */
	    token: any;
	    /**
	     * Binds a DI token to an implementation class.
	     *
	     * ### Example ([live demo](http://plnkr.co/edit/RSTG86qgmoxCyj9SWPwY?p=preview))
	     *
	     * Because `useExisting` and `useClass` are often confused, the example contains
	     * both use cases for easy comparison.
	     *
	     * ```typescript
	     * class Vehicle {}
	     *
	     * class Car extends Vehicle {}
	     *
	     * var injectorClass = Injector.resolveAndCreate([
	     *   Car,
	     *   new Provider(Vehicle, { useClass: Car })
	     * ]);
	     * var injectorAlias = Injector.resolveAndCreate([
	     *   Car,
	     *   new Provider(Vehicle, { useExisting: Car })
	     * ]);
	     *
	     * expect(injectorClass.get(Vehicle)).not.toBe(injectorClass.get(Car));
	     * expect(injectorClass.get(Vehicle) instanceof Car).toBe(true);
	     *
	     * expect(injectorAlias.get(Vehicle)).toBe(injectorAlias.get(Car));
	     * expect(injectorAlias.get(Vehicle) instanceof Car).toBe(true);
	     * ```
	     */
	    useClass: Type;
	    /**
	     * Binds a DI token to a value.
	     *
	     * ### Example ([live demo](http://plnkr.co/edit/UFVsMVQIDe7l4waWziES?p=preview))
	     *
	     * ```javascript
	     * var injector = Injector.resolveAndCreate([
	     *   new Provider("message", { useValue: 'Hello' })
	     * ]);
	     *
	     * expect(injector.get("message")).toEqual('Hello');
	     * ```
	     */
	    useValue: any;
	    /**
	     * Binds a DI token to an existing token.
	     *
	     * {@link Injector} returns the same instance as if the provided token was used.
	     * This is in contrast to `useClass` where a separate instance of `useClass` is returned.
	     *
	     * ### Example ([live demo](http://plnkr.co/edit/QsatsOJJ6P8T2fMe9gr8?p=preview))
	     *
	     * Because `useExisting` and `useClass` are often confused the example contains
	     * both use cases for easy comparison.
	     *
	     * ```typescript
	     * class Vehicle {}
	     *
	     * class Car extends Vehicle {}
	     *
	     * var injectorAlias = Injector.resolveAndCreate([
	     *   Car,
	     *   new Provider(Vehicle, { useExisting: Car })
	     * ]);
	     * var injectorClass = Injector.resolveAndCreate([
	     *   Car,
	     *   new Provider(Vehicle, { useClass: Car })
	     * ]);
	     *
	     * expect(injectorAlias.get(Vehicle)).toBe(injectorAlias.get(Car));
	     * expect(injectorAlias.get(Vehicle) instanceof Car).toBe(true);
	     *
	     * expect(injectorClass.get(Vehicle)).not.toBe(injectorClass.get(Car));
	     * expect(injectorClass.get(Vehicle) instanceof Car).toBe(true);
	     * ```
	     */
	    useExisting: any;
	    /**
	     * Binds a DI token to a function which computes the value.
	     *
	     * ### Example ([live demo](http://plnkr.co/edit/Scoxy0pJNqKGAPZY1VVC?p=preview))
	     *
	     * ```typescript
	     * var injector = Injector.resolveAndCreate([
	     *   new Provider(Number, { useFactory: () => { return 1+2; }}),
	     *   new Provider(String, { useFactory: (value) => { return "Value: " + value; },
	     *                       deps: [Number] })
	     * ]);
	     *
	     * expect(injector.get(Number)).toEqual(3);
	     * expect(injector.get(String)).toEqual('Value: 3');
	     * ```
	     *
	     * Used in conjunction with dependencies.
	     */
	    useFactory: Function;
	    /**
	     * Specifies a set of dependencies
	     * (as `token`s) which should be injected into the factory function.
	     *
	     * ### Example ([live demo](http://plnkr.co/edit/Scoxy0pJNqKGAPZY1VVC?p=preview))
	     *
	     * ```typescript
	     * var injector = Injector.resolveAndCreate([
	     *   new Provider(Number, { useFactory: () => { return 1+2; }}),
	     *   new Provider(String, { useFactory: (value) => { return "Value: " + value; },
	     *                       deps: [Number] })
	     * ]);
	     *
	     * expect(injector.get(Number)).toEqual(3);
	     * expect(injector.get(String)).toEqual('Value: 3');
	     * ```
	     *
	     * Used in conjunction with `useFactory`.
	     */
	    dependencies: Object[];
	    /** @internal */
	    _multi: boolean;
	    constructor(token: any, {useClass, useValue, useExisting, useFactory, deps, multi}: {
	        useClass?: Type;
	        useValue?: any;
	        useExisting?: any;
	        useFactory?: Function;
	        deps?: Object[];
	        multi?: boolean;
	    });
	    /**
	     * Creates multiple providers matching the same token (a multi-provider).
	     *
	     * Multi-providers are used for creating pluggable service, where the system comes
	     * with some default providers, and the user can register additional providers.
	     * The combination of the default providers and the additional providers will be
	     * used to drive the behavior of the system.
	     *
	     * ### Example
	     *
	     * ```typescript
	     * var injector = Injector.resolveAndCreate([
	     *   new Provider("Strings", { useValue: "String1", multi: true}),
	     *   new Provider("Strings", { useValue: "String2", multi: true})
	     * ]);
	     *
	     * expect(injector.get("Strings")).toEqual(["String1", "String2"]);
	     * ```
	     *
	     * Multi-providers and regular providers cannot be mixed. The following
	     * will throw an exception:
	     *
	     * ```typescript
	     * var injector = Injector.resolveAndCreate([
	     *   new Provider("Strings", { useValue: "String1", multi: true }),
	     *   new Provider("Strings", { useValue: "String2"})
	     * ]);
	     * ```
	     */
	    multi: boolean;
	}
	/**
	 * See {@link Provider} instead.
	 *
	 * @deprecated
	 */
	export class Binding extends Provider {
	    constructor(token: any, {toClass, toValue, toAlias, toFactory, deps, multi}: {
	        toClass?: Type;
	        toValue?: any;
	        toAlias?: any;
	        toFactory: Function;
	        deps?: Object[];
	        multi?: boolean;
	    });
	    /**
	     * @deprecated
	     */
	    toClass: Type;
	    /**
	     * @deprecated
	     */
	    toAlias: any;
	    /**
	     * @deprecated
	     */
	    toFactory: Function;
	    /**
	     * @deprecated
	     */
	    toValue: any;
	}
	/**
	 * An internal resolved representation of a {@link Provider} used by the {@link Injector}.
	 *
	 * It is usually created automatically by `Injector.resolveAndCreate`.
	 *
	 * It can be created manually, as follows:
	 *
	 * ### Example ([live demo](http://plnkr.co/edit/RfEnhh8kUEI0G3qsnIeT?p%3Dpreview&p=preview))
	 *
	 * ```typescript
	 * var resolvedProviders = Injector.resolve([new Provider('message', {useValue: 'Hello'})]);
	 * var injector = Injector.fromResolvedProviders(resolvedProviders);
	 *
	 * expect(injector.get('message')).toEqual('Hello');
	 * ```
	 */
	export interface ResolvedProvider {
	    /**
	     * A key, usually a `Type`.
	     */
	    key: Key;
	    /**
	     * Factory function which can return an instance of an object represented by a key.
	     */
	    resolvedFactories: ResolvedFactory[];
	    /**
	     * Indicates if the provider is a multi-provider or a regular provider.
	     */
	    multiProvider: boolean;
	}
	/**
	 * See {@link ResolvedProvider} instead.
	 *
	 * @deprecated
	 */
	export interface ResolvedBinding extends ResolvedProvider {
	}
	export class ResolvedProvider_ implements ResolvedBinding {
	    key: Key;
	    resolvedFactories: ResolvedFactory[];
	    multiProvider: boolean;
	    constructor(key: Key, resolvedFactories: ResolvedFactory[], multiProvider: boolean);
	    resolvedFactory: ResolvedFactory;
	}
	/**
	 * An internal resolved representation of a factory function created by resolving {@link Provider}.
	 */
	export class ResolvedFactory {
	    /**
	     * Factory function which can return an instance of an object represented by a key.
	     */
	    factory: Function;
	    /**
	     * Arguments (dependencies) to the `factory` function.
	     */
	    dependencies: Dependency[];
	    constructor(
	        /**
	         * Factory function which can return an instance of an object represented by a key.
	         */
	        factory: Function, 
	        /**
	         * Arguments (dependencies) to the `factory` function.
	         */
	        dependencies: Dependency[]);
	}
	/**
	 * Creates a {@link Provider}.
	 *
	 * To construct a {@link Provider}, bind a `token` to either a class, a value, a factory function,
	 * or
	 * to an existing `token`.
	 * See {@link ProviderBuilder} for more details.
	 *
	 * The `token` is most commonly a class or {@link angular2/di/OpaqueToken}.
	 *
	 * @deprecated
	 */
	export function bind(token: any): ProviderBuilder;
	/**
	 * Creates a {@link Provider}.
	 *
	 * See {@link Provider} for more details.
	 *
	 * <!-- TODO: improve the docs -->
	 */
	export function provide(token: any, {useClass, useValue, useExisting, useFactory, deps, multi}: {
	    useClass?: Type;
	    useValue?: any;
	    useExisting?: any;
	    useFactory?: Function;
	    deps?: Object[];
	    multi?: boolean;
	}): Provider;
	/**
	 * Helper class for the {@link bind} function.
	 */
	export class ProviderBuilder {
	    token: any;
	    constructor(token: any);
	    /**
	     * Binds a DI token to a class.
	     *
	     * ### Example ([live demo](http://plnkr.co/edit/ZpBCSYqv6e2ud5KXLdxQ?p=preview))
	     *
	     * Because `toAlias` and `toClass` are often confused, the example contains
	     * both use cases for easy comparison.
	     *
	     * ```typescript
	     * class Vehicle {}
	     *
	     * class Car extends Vehicle {}
	     *
	     * var injectorClass = Injector.resolveAndCreate([
	     *   Car,
	     *   provide(Vehicle, {useClass: Car})
	     * ]);
	     * var injectorAlias = Injector.resolveAndCreate([
	     *   Car,
	     *   provide(Vehicle, {useExisting: Car})
	     * ]);
	     *
	     * expect(injectorClass.get(Vehicle)).not.toBe(injectorClass.get(Car));
	     * expect(injectorClass.get(Vehicle) instanceof Car).toBe(true);
	     *
	     * expect(injectorAlias.get(Vehicle)).toBe(injectorAlias.get(Car));
	     * expect(injectorAlias.get(Vehicle) instanceof Car).toBe(true);
	     * ```
	     */
	    toClass(type: Type): Provider;
	    /**
	     * Binds a DI token to a value.
	     *
	     * ### Example ([live demo](http://plnkr.co/edit/G024PFHmDL0cJFgfZK8O?p=preview))
	     *
	     * ```typescript
	     * var injector = Injector.resolveAndCreate([
	     *   provide('message', {useValue: 'Hello'})
	     * ]);
	     *
	     * expect(injector.get('message')).toEqual('Hello');
	     * ```
	     */
	    toValue(value: any): Provider;
	    /**
	     * Binds a DI token to an existing token.
	     *
	     * Angular will return the same instance as if the provided token was used. (This is
	     * in contrast to `useClass` where a separate instance of `useClass` will be returned.)
	     *
	     * ### Example ([live demo](http://plnkr.co/edit/uBaoF2pN5cfc5AfZapNw?p=preview))
	     *
	     * Because `toAlias` and `toClass` are often confused, the example contains
	     * both use cases for easy comparison.
	     *
	     * ```typescript
	     * class Vehicle {}
	     *
	     * class Car extends Vehicle {}
	     *
	     * var injectorAlias = Injector.resolveAndCreate([
	     *   Car,
	     *   provide(Vehicle, {useExisting: Car})
	     * ]);
	     * var injectorClass = Injector.resolveAndCreate([
	     *   Car,
	     *   provide(Vehicle, {useClass: Car})
	     * ]);
	     *
	     * expect(injectorAlias.get(Vehicle)).toBe(injectorAlias.get(Car));
	     * expect(injectorAlias.get(Vehicle) instanceof Car).toBe(true);
	     *
	     * expect(injectorClass.get(Vehicle)).not.toBe(injectorClass.get(Car));
	     * expect(injectorClass.get(Vehicle) instanceof Car).toBe(true);
	     * ```
	     */
	    toAlias(aliasToken: any): Provider;
	    /**
	     * Binds a DI token to a function which computes the value.
	     *
	     * ### Example ([live demo](http://plnkr.co/edit/OejNIfTT3zb1iBxaIYOb?p=preview))
	     *
	     * ```typescript
	     * var injector = Injector.resolveAndCreate([
	     *   provide(Number, {useFactory: () => { return 1+2; }}),
	     *   provide(String, {useFactory: (v) => { return "Value: " + v; }, deps: [Number]})
	     * ]);
	     *
	     * expect(injector.get(Number)).toEqual(3);
	     * expect(injector.get(String)).toEqual('Value: 3');
	     * ```
	     */
	    toFactory(factory: Function, dependencies?: any[]): Provider;
	}
	/**
	 * Resolve a single provider.
	 */
	export function resolveFactory(provider: Provider): ResolvedFactory;
	/**
	 * Converts the {@link Provider} into {@link ResolvedProvider}.
	 *
	 * {@link Injector} internally only uses {@link ResolvedProvider}, {@link Provider} contains
	 * convenience provider syntax.
	 */
	export function resolveProvider(provider: Provider): ResolvedProvider;
	/**
	 * Resolve a list of Providers.
	 */
	export function resolveProviders(providers: Array<Type | Provider | any[]>): ResolvedProvider[];
	/**
	 * Merges a list of ResolvedProviders into a list where
	 * each key is contained exactly once and multi providers
	 * have been merged.
	 */
	export function mergeResolvedProviders(providers: ResolvedProvider[], normalizedProvidersMap: Map<number, ResolvedProvider>): Map<number, ResolvedProvider>;

}
declare module 'ditsy/target/src/core/di/injector' {
	import { ResolvedProvider, Provider, Dependency } from 'ditsy/target/src/core/di/provider';
	import { Type } from 'ditsy/target/src/facade/lang';
	import { Key } from 'ditsy/target/src/core/di/key';
	export const UNDEFINED: Object;
	/**
	 * Visibility of a {@link Provider}.
	 */
	export enum Visibility {
	    /**
	     * A `Public` {@link Provider} is only visible to regular (as opposed to host) child injectors.
	     */
	    Public = 0,
	    /**
	     * A `Private` {@link Provider} is only visible to host (as opposed to regular) child injectors.
	     */
	    Private = 1,
	    /**
	     * A `PublicAndPrivate` {@link Provider} is visible to both host and regular child injectors.
	     */
	    PublicAndPrivate = 2,
	}
	export interface ProtoInjectorStrategy {
	    getProviderAtIndex(index: number): ResolvedProvider;
	    createInjectorStrategy(inj: Injector): InjectorStrategy;
	}
	export class ProtoInjectorInlineStrategy implements ProtoInjectorStrategy {
	    provider0: ResolvedProvider;
	    provider1: ResolvedProvider;
	    provider2: ResolvedProvider;
	    provider3: ResolvedProvider;
	    provider4: ResolvedProvider;
	    provider5: ResolvedProvider;
	    provider6: ResolvedProvider;
	    provider7: ResolvedProvider;
	    provider8: ResolvedProvider;
	    provider9: ResolvedProvider;
	    keyId0: number;
	    keyId1: number;
	    keyId2: number;
	    keyId3: number;
	    keyId4: number;
	    keyId5: number;
	    keyId6: number;
	    keyId7: number;
	    keyId8: number;
	    keyId9: number;
	    visibility0: Visibility;
	    visibility1: Visibility;
	    visibility2: Visibility;
	    visibility3: Visibility;
	    visibility4: Visibility;
	    visibility5: Visibility;
	    visibility6: Visibility;
	    visibility7: Visibility;
	    visibility8: Visibility;
	    visibility9: Visibility;
	    constructor(protoEI: ProtoInjector, bwv: ProviderWithVisibility[]);
	    getProviderAtIndex(index: number): any;
	    createInjectorStrategy(injector: Injector): InjectorStrategy;
	}
	export class ProtoInjectorDynamicStrategy implements ProtoInjectorStrategy {
	    providers: ResolvedProvider[];
	    keyIds: number[];
	    visibilities: Visibility[];
	    constructor(protoInj: ProtoInjector, bwv: ProviderWithVisibility[]);
	    getProviderAtIndex(index: number): any;
	    createInjectorStrategy(ei: Injector): InjectorStrategy;
	}
	export class ProtoInjector {
	    static fromResolvedProviders(providers: ResolvedProvider[]): ProtoInjector;
	    /** @internal */
	    _strategy: ProtoInjectorStrategy;
	    numberOfProviders: number;
	    constructor(bwv: ProviderWithVisibility[]);
	    getProviderAtIndex(index: number): any;
	}
	export interface InjectorStrategy {
	    getObjByKeyId(keyId: number, visibility: Visibility): any;
	    getObjAtIndex(index: number): any;
	    getMaxNumberOfObjects(): number;
	    resetConstructionCounter(): void;
	    instantiateProvider(provider: ResolvedProvider, visibility: Visibility): any;
	}
	export class InjectorInlineStrategy implements InjectorStrategy {
	    injector: Injector;
	    protoStrategy: ProtoInjectorInlineStrategy;
	    obj0: any;
	    obj1: any;
	    obj2: any;
	    obj3: any;
	    obj4: any;
	    obj5: any;
	    obj6: any;
	    obj7: any;
	    obj8: any;
	    obj9: any;
	    constructor(injector: Injector, protoStrategy: ProtoInjectorInlineStrategy);
	    resetConstructionCounter(): void;
	    instantiateProvider(provider: ResolvedProvider, visibility: Visibility): any;
	    getObjByKeyId(keyId: number, visibility: Visibility): any;
	    getObjAtIndex(index: number): any;
	    getMaxNumberOfObjects(): number;
	}
	export class InjectorDynamicStrategy implements InjectorStrategy {
	    protoStrategy: ProtoInjectorDynamicStrategy;
	    injector: Injector;
	    objs: any[];
	    constructor(protoStrategy: ProtoInjectorDynamicStrategy, injector: Injector);
	    resetConstructionCounter(): void;
	    instantiateProvider(provider: ResolvedProvider, visibility: Visibility): any;
	    getObjByKeyId(keyId: number, visibility: Visibility): any;
	    getObjAtIndex(index: number): any;
	    getMaxNumberOfObjects(): number;
	}
	export class ProviderWithVisibility {
	    provider: ResolvedProvider;
	    visibility: Visibility;
	    constructor(provider: ResolvedProvider, visibility: Visibility);
	    getKeyId(): number;
	}
	/**
	 * Used to provide dependencies that cannot be easily expressed as providers.
	 */
	export interface DependencyProvider {
	    getDependency(injector: Injector, provider: ResolvedProvider, dependency: Dependency): any;
	}
	/**
	 * A dependency injection container used for instantiating objects and resolving dependencies.
	 *
	 * An `Injector` is a replacement for a `new` operator, which can automatically resolve the
	 * constructor dependencies.
	 *
	 * In typical use, application code asks for the dependencies in the constructor and they are
	 * resolved by the `Injector`.
	 *
	 * ### Example ([live demo](http://plnkr.co/edit/jzjec0?p=preview))
	 *
	 * The following example creates an `Injector` configured to create `Engine` and `Car`.
	 *
	 * ```typescript
	 * @Injectable()
	 * class Engine {
	 * }
	 *
	 * @Injectable()
	 * class Car {
	 *   constructor(public engine:Engine) {}
	 * }
	 *
	 * var injector = Injector.resolveAndCreate([Car, Engine]);
	 * var car = injector.get(Car);
	 * expect(car instanceof Car).toBe(true);
	 * expect(car.engine instanceof Engine).toBe(true);
	 * ```
	 *
	 * Notice, we don't use the `new` operator because we explicitly want to have the `Injector`
	 * resolve all of the object's dependencies automatically.
	 */
	export class Injector {
	    private _isHostBoundary;
	    private _depProvider;
	    private _debugContext;
	    /**
	     * Turns an array of provider definitions into an array of resolved providers.
	     *
	     * A resolution is a process of flattening multiple nested arrays and converting individual
	     * providers into an array of {@link ResolvedProvider}s.
	     *
	     * ### Example ([live demo](http://plnkr.co/edit/AiXTHi?p=preview))
	     *
	     * ```typescript
	     * @Injectable()
	     * class Engine {
	     * }
	     *
	     * @Injectable()
	     * class Car {
	     *   constructor(public engine:Engine) {}
	     * }
	     *
	     * var providers = Injector.resolve([Car, [[Engine]]]);
	     *
	     * expect(providers.length).toEqual(2);
	     *
	     * expect(providers[0] instanceof ResolvedProvider).toBe(true);
	     * expect(providers[0].key.displayName).toBe("Car");
	     * expect(providers[0].dependencies.length).toEqual(1);
	     * expect(providers[0].factory).toBeDefined();
	     *
	     * expect(providers[1].key.displayName).toBe("Engine");
	     * });
	     * ```
	     *
	     * See {@link Injector#fromResolvedProviders} for more info.
	     */
	    static resolve(providers: Array<Type | Provider | any[]>): ResolvedProvider[];
	    /**
	     * Resolves an array of providers and creates an injector from those providers.
	     *
	     * The passed-in providers can be an array of `Type`, {@link Provider},
	     * or a recursive array of more providers.
	     *
	     * ### Example ([live demo](http://plnkr.co/edit/ePOccA?p=preview))
	     *
	     * ```typescript
	     * @Injectable()
	     * class Engine {
	     * }
	     *
	     * @Injectable()
	     * class Car {
	     *   constructor(public engine:Engine) {}
	     * }
	     *
	     * var injector = Injector.resolveAndCreate([Car, Engine]);
	     * expect(injector.get(Car) instanceof Car).toBe(true);
	     * ```
	     *
	     * This function is slower than the corresponding `fromResolvedProviders`
	     * because it needs to resolve the passed-in providers first.
	     * See {@link Injector#resolve} and {@link Injector#fromResolvedProviders}.
	     */
	    static resolveAndCreate(providers: Array<Type | Provider | any[]>): Injector;
	    /**
	     * Creates an injector from previously resolved providers.
	     *
	     * This API is the recommended way to construct injectors in performance-sensitive parts.
	     *
	     * ### Example ([live demo](http://plnkr.co/edit/KrSMci?p=preview))
	     *
	     * ```typescript
	     * @Injectable()
	     * class Engine {
	     * }
	     *
	     * @Injectable()
	     * class Car {
	     *   constructor(public engine:Engine) {}
	     * }
	     *
	     * var providers = Injector.resolve([Car, Engine]);
	     * var injector = Injector.fromResolvedProviders(providers);
	     * expect(injector.get(Car) instanceof Car).toBe(true);
	     * ```
	     */
	    static fromResolvedProviders(providers: ResolvedProvider[]): Injector;
	    /**
	     * @deprecated
	     */
	    static fromResolvedBindings(providers: ResolvedProvider[]): Injector;
	    /** @internal */
	    _strategy: InjectorStrategy;
	    /** @internal */
	    _constructionCounter: number;
	    /** @internal */
	    _proto: any;
	    /** @internal */
	    _parent: Injector;
	    /**
	     * Private
	     */
	    constructor(_proto: any, _parent?: Injector, _isHostBoundary?: boolean, _depProvider?: any, _debugContext?: Function);
	    /**
	     * Whether this injector is a boundary to a host.
	     * @internal
	     */
	    hostBoundary: boolean;
	    /**
	     * @internal
	     */
	    debugContext(): any;
	    /**
	     * Retrieves an instance from the injector based on the provided token.
	     * Throws {@link NoProviderError} if not found.
	     *
	     * ### Example ([live demo](http://plnkr.co/edit/HeXSHg?p=preview))
	     *
	     * ```typescript
	     * var injector = Injector.resolveAndCreate([
	     *   provide("validToken", {useValue: "Value"})
	     * ]);
	     * expect(injector.get("validToken")).toEqual("Value");
	     * expect(() => injector.get("invalidToken")).toThrowError();
	     * ```
	     *
	     * `Injector` returns itself when given `Injector` as a token.
	     *
	     * ```typescript
	     * var injector = Injector.resolveAndCreate([]);
	     * expect(injector.get(Injector)).toBe(injector);
	     * ```
	     */
	    get(token: any): any;
	    /**
	     * Retrieves an instance from the injector based on the provided token.
	     * Returns null if not found.
	     *
	     * ### Example ([live demo](http://plnkr.co/edit/tpEbEy?p=preview))
	     *
	     * ```typescript
	     * var injector = Injector.resolveAndCreate([
	     *   provide("validToken", {useValue: "Value"})
	     * ]);
	     * expect(injector.getOptional("validToken")).toEqual("Value");
	     * expect(injector.getOptional("invalidToken")).toBe(null);
	     * ```
	     *
	     * `Injector` returns itself when given `Injector` as a token.
	     *
	     * ```typescript
	     * var injector = Injector.resolveAndCreate([]);
	     * expect(injector.getOptional(Injector)).toBe(injector);
	     * ```
	     */
	    getOptional(token: any): any;
	    /**
	     * @internal
	     */
	    getAt(index: number): any;
	    /**
	     * Parent of this injector.
	     *
	     * <!-- TODO: Add a link to the section of the user guide talking about hierarchical injection.
	     * -->
	     *
	     * ### Example ([live demo](http://plnkr.co/edit/eosMGo?p=preview))
	     *
	     * ```typescript
	     * var parent = Injector.resolveAndCreate([]);
	     * var child = parent.resolveAndCreateChild([]);
	     * expect(child.parent).toBe(parent);
	     * ```
	     */
	    parent: Injector;
	    /**
	     * @internal
	     * Internal. Do not use.
	     * We return `any` not to export the InjectorStrategy type.
	     */
	    internalStrategy: any;
	    /**
	     * Resolves an array of providers and creates a child injector from those providers.
	     *
	     * <!-- TODO: Add a link to the section of the user guide talking about hierarchical injection.
	     * -->
	     *
	     * The passed-in providers can be an array of `Type`, {@link Provider},
	     * or a recursive array of more providers.
	     *
	     * ### Example ([live demo](http://plnkr.co/edit/opB3T4?p=preview))
	     *
	     * ```typescript
	     * class ParentProvider {}
	     * class ChildProvider {}
	     *
	     * var parent = Injector.resolveAndCreate([ParentProvider]);
	     * var child = parent.resolveAndCreateChild([ChildProvider]);
	     *
	     * expect(child.get(ParentProvider) instanceof ParentProvider).toBe(true);
	     * expect(child.get(ChildProvider) instanceof ChildProvider).toBe(true);
	     * expect(child.get(ParentProvider)).toBe(parent.get(ParentProvider));
	     * ```
	     *
	     * This function is slower than the corresponding `createChildFromResolved`
	     * because it needs to resolve the passed-in providers first.
	     * See {@link Injector#resolve} and {@link Injector#createChildFromResolved}.
	     */
	    resolveAndCreateChild(providers: Array<Type | Provider | any[]>): Injector;
	    /**
	     * Creates a child injector from previously resolved providers.
	     *
	     * <!-- TODO: Add a link to the section of the user guide talking about hierarchical injection.
	     * -->
	     *
	     * This API is the recommended way to construct injectors in performance-sensitive parts.
	     *
	     * ### Example ([live demo](http://plnkr.co/edit/VhyfjN?p=preview))
	     *
	     * ```typescript
	     * class ParentProvider {}
	     * class ChildProvider {}
	     *
	     * var parentProviders = Injector.resolve([ParentProvider]);
	     * var childProviders = Injector.resolve([ChildProvider]);
	     *
	     * var parent = Injector.fromResolvedProviders(parentProviders);
	     * var child = parent.createChildFromResolved(childProviders);
	     *
	     * expect(child.get(ParentProvider) instanceof ParentProvider).toBe(true);
	     * expect(child.get(ChildProvider) instanceof ChildProvider).toBe(true);
	     * expect(child.get(ParentProvider)).toBe(parent.get(ParentProvider));
	     * ```
	     */
	    createChildFromResolved(providers: ResolvedProvider[]): Injector;
	    /**
	     * Resolves a provider and instantiates an object in the context of the injector.
	     *
	     * The created object does not get cached by the injector.
	     *
	     * ### Example ([live demo](http://plnkr.co/edit/yvVXoB?p=preview))
	     *
	     * ```typescript
	     * @Injectable()
	     * class Engine {
	     * }
	     *
	     * @Injectable()
	     * class Car {
	     *   constructor(public engine:Engine) {}
	     * }
	     *
	     * var injector = Injector.resolveAndCreate([Engine]);
	     *
	     * var car = injector.resolveAndInstantiate(Car);
	     * expect(car.engine).toBe(injector.get(Engine));
	     * expect(car).not.toBe(injector.resolveAndInstantiate(Car));
	     * ```
	     */
	    resolveAndInstantiate(provider: Type | Provider): any;
	    /**
	     * Instantiates an object using a resolved provider in the context of the injector.
	     *
	     * The created object does not get cached by the injector.
	     *
	     * ### Example ([live demo](http://plnkr.co/edit/ptCImQ?p=preview))
	     *
	     * ```typescript
	     * @Injectable()
	     * class Engine {
	     * }
	     *
	     * @Injectable()
	     * class Car {
	     *   constructor(public engine:Engine) {}
	     * }
	     *
	     * var injector = Injector.resolveAndCreate([Engine]);
	     * var carProvider = Injector.resolve([Car])[0];
	     * var car = injector.instantiateResolved(carProvider);
	     * expect(car.engine).toBe(injector.get(Engine));
	     * expect(car).not.toBe(injector.instantiateResolved(carProvider));
	     * ```
	     */
	    instantiateResolved(provider: ResolvedProvider): any;
	    /** @internal */
	    _new(provider: ResolvedProvider, visibility: Visibility): any;
	    private _instantiateProvider(provider, visibility);
	    private _instantiate(provider, resolvedFactory, visibility);
	    private _getByDependency(provider, dep, providerVisibility);
	    private _getByKey(key, lowerBoundVisibility, upperBoundVisibility, optional, providerVisibility);
	    /** @internal */
	    _throwOrNull(key: Key, optional: boolean): any;
	    /** @internal */
	    _getByKeySelf(key: Key, optional: boolean, providerVisibility: Visibility): any;
	    /** @internal */
	    _getByKeyHost(key: Key, optional: boolean, providerVisibility: Visibility, lowerBoundVisibility: Object): any;
	    /** @internal */
	    _getPrivateDependency(key: Key, optional: boolean, inj: Injector): any;
	    /** @internal */
	    _getByKeyDefault(key: Key, optional: boolean, providerVisibility: Visibility, lowerBoundVisibility: Object): any;
	    displayName: string;
	    toString(): string;
	}

}
declare module 'ditsy/target/src/facade/exception_handler' {
	/**
	 * Provides a hook for centralized exception handling.
	 *
	 * The default implementation of `ExceptionHandler` prints error messages to the `Console`. To
	 * intercept error handling,
	 * write a custom exception handler that replaces this default as appropriate for your app.
	 *
	 * ### Example
	 *
	 * ```javascript
	 *
	 * class MyExceptionHandler implements ExceptionHandler {
	 *   call(error, stackTrace = null, reason = null) {
	 *     // do something with the exception
	 *   }
	 * }
	 *
	 * bootstrap(MyApp, [provide(ExceptionHandler, {useClass: MyExceptionHandler})])
	 *
	 * ```
	 */
	export class ExceptionHandler {
	    private _logger;
	    private _rethrowException;
	    constructor(_logger: any, _rethrowException?: boolean);
	    static exceptionToString(exception: any, stackTrace?: any, reason?: string): string;
	    call(exception: any, stackTrace?: any, reason?: string): void;
	    /** @internal */
	    _extractMessage(exception: any): string;
	    /** @internal */
	    _longStackTrace(stackTrace: any): any;
	    /** @internal */
	    _findContext(exception: any): any;
	    /** @internal */
	    _findOriginalException(exception: any): any;
	    /** @internal */
	    _findOriginalStack(exception: any): any;
	}

}
declare module 'ditsy/target/src/facade/exceptions' {
	export { ExceptionHandler } from 'ditsy/target/src/facade/exception_handler';
	export class BaseException extends Error {
	    message: string;
	    stack: any;
	    constructor(message?: string);
	    toString(): string;
	}
	/**
	 * Wraps an exception and provides additional context or information.
	 */
	export class WrappedException extends Error {
	    private _wrapperMessage;
	    private _originalException;
	    private _originalStack;
	    private _context;
	    private _wrapperStack;
	    constructor(_wrapperMessage: string, _originalException: any, _originalStack?: any, _context?: any);
	    wrapperMessage: string;
	    wrapperStack: any;
	    originalException: any;
	    originalStack: any;
	    context: any;
	    message: string;
	    toString(): string;
	}
	export function makeTypeError(message?: string): Error;
	export function unimplemented(): any;

}
declare module 'ditsy/target/src/core/di/exceptions' {
	import { BaseException, WrappedException } from 'ditsy/target/src/facade/exceptions';
	import { Key } from 'ditsy/target/src/core/di/key';
	import { Injector } from 'ditsy/target/src/core/di/injector';
	/**
	 * Base class for all errors arising from misconfigured providers.
	 */
	export class AbstractProviderError extends BaseException {
	    /** @internal */
	    message: string;
	    /** @internal */
	    keys: Key[];
	    /** @internal */
	    injectors: Injector[];
	    /** @internal */
	    constructResolvingMessage: Function;
	    constructor(injector: Injector, key: Key, constructResolvingMessage: Function);
	    addKey(injector: Injector, key: Key): void;
	    context: any;
	}
	/**
	 * Thrown when trying to retrieve a dependency by `Key` from {@link Injector}, but the
	 * {@link Injector} does not have a {@link Provider} for {@link Key}.
	 *
	 * ### Example ([live demo](http://plnkr.co/edit/vq8D3FRB9aGbnWJqtEPE?p=preview))
	 *
	 * ```typescript
	 * class A {
	 *   constructor(b:B) {}
	 * }
	 *
	 * expect(() => Injector.resolveAndCreate([A])).toThrowError();
	 * ```
	 */
	export class NoProviderError extends AbstractProviderError {
	    constructor(injector: Injector, key: Key);
	}
	/**
	 * Thrown when dependencies form a cycle.
	 *
	 * ### Example ([live demo](http://plnkr.co/edit/wYQdNos0Tzql3ei1EV9j?p=info))
	 *
	 * ```typescript
	 * var injector = Injector.resolveAndCreate([
	 *   provide("one", {useFactory: (two) => "two", deps: [[new Inject("two")]]}),
	 *   provide("two", {useFactory: (one) => "one", deps: [[new Inject("one")]]})
	 * ]);
	 *
	 * expect(() => injector.get("one")).toThrowError();
	 * ```
	 *
	 * Retrieving `A` or `B` throws a `CyclicDependencyError` as the graph above cannot be constructed.
	 */
	export class CyclicDependencyError extends AbstractProviderError {
	    constructor(injector: Injector, key: Key);
	}
	/**
	 * Thrown when a constructing type returns with an Error.
	 *
	 * The `InstantiationError` class contains the original error plus the dependency graph which caused
	 * this object to be instantiated.
	 *
	 * ### Example ([live demo](http://plnkr.co/edit/7aWYdcqTQsP0eNqEdUAf?p=preview))
	 *
	 * ```typescript
	 * class A {
	 *   constructor() {
	 *     throw new Error('message');
	 *   }
	 * }
	 *
	 * var injector = Injector.resolveAndCreate([A]);

	 * try {
	 *   injector.get(A);
	 * } catch (e) {
	 *   expect(e instanceof InstantiationError).toBe(true);
	 *   expect(e.originalException.message).toEqual("message");
	 *   expect(e.originalStack).toBeDefined();
	 * }
	 * ```
	 */
	export class InstantiationError extends WrappedException {
	    /** @internal */
	    keys: Key[];
	    /** @internal */
	    injectors: Injector[];
	    constructor(injector: Injector, originalException: any, originalStack: any, key: Key);
	    addKey(injector: Injector, key: Key): void;
	    wrapperMessage: string;
	    causeKey: Key;
	    context: any;
	}
	/**
	 * Thrown when an object other then {@link Provider} (or `Type`) is passed to {@link Injector}
	 * creation.
	 *
	 * ### Example ([live demo](http://plnkr.co/edit/YatCFbPAMCL0JSSQ4mvH?p=preview))
	 *
	 * ```typescript
	 * expect(() => Injector.resolveAndCreate(["not a type"])).toThrowError();
	 * ```
	 */
	export class InvalidProviderError extends BaseException {
	    constructor(provider: any);
	}
	/**
	 * Thrown when the class has no annotation information.
	 *
	 * Lack of annotation information prevents the {@link Injector} from determining which dependencies
	 * need to be injected into the constructor.
	 *
	 * ### Example ([live demo](http://plnkr.co/edit/rHnZtlNS7vJOPQ6pcVkm?p=preview))
	 *
	 * ```typescript
	 * class A {
	 *   constructor(b) {}
	 * }
	 *
	 * expect(() => Injector.resolveAndCreate([A])).toThrowError();
	 * ```
	 *
	 * This error is also thrown when the class not marked with {@link Injectable} has parameter types.
	 *
	 * ```typescript
	 * class B {}
	 *
	 * class A {
	 *   constructor(b:B) {} // no information about the parameter types of A is available at runtime.
	 * }
	 *
	 * expect(() => Injector.resolveAndCreate([A,B])).toThrowError();
	 * ```
	 */
	export class NoAnnotationError extends BaseException {
	    constructor(typeOrFunc: any, params: any[][]);
	    private static _genMessage(typeOrFunc, params);
	}
	/**
	 * Thrown when getting an object by index.
	 *
	 * ### Example ([live demo](http://plnkr.co/edit/bRs0SX2OTQiJzqvjgl8P?p=preview))
	 *
	 * ```typescript
	 * class A {}
	 *
	 * var injector = Injector.resolveAndCreate([A]);
	 *
	 * expect(() => injector.getAt(100)).toThrowError();
	 * ```
	 */
	export class OutOfBoundsError extends BaseException {
	    constructor(index: any);
	}
	/**
	 * Thrown when a multi provider and a regular provider are bound to the same token.
	 *
	 * ### Example
	 *
	 * ```typescript
	 * expect(() => Injector.resolveAndCreate([
	 *   new Provider("Strings", {useValue: "string1", multi: true}),
	 *   new Provider("Strings", {useValue: "string2", multi: false})
	 * ])).toThrowError();
	 * ```
	 */
	export class MixingMultiProvidersWithRegularProvidersError extends BaseException {
	    constructor(provider1: any, provider2: any);
	}

}
declare module 'ditsy/target/src/core/di/opaque_token' {
	/**
	 * Creates a token that can be used in a DI Provider.
	 *
	 * ### Example ([live demo](http://plnkr.co/edit/Ys9ezXpj2Mnoy3Uc8KBp?p=preview))
	 *
	 * ```typescript
	 * var t = new OpaqueToken("value");
	 *
	 * var injector = Injector.resolveAndCreate([
	 *   provide(t, {useValue: "providedValue"})
	 * ]);
	 *
	 * expect(injector.get(t)).toEqual("bindingValue");
	 * ```
	 *
	 * Using an `OpaqueToken` is preferable to using strings as tokens because of possible collisions
	 * caused by multiple providers using the same string as two different tokens.
	 *
	 * Using an `OpaqueToken` is preferable to using an `Object` as tokens because it provides better
	 * error messages.
	 */
	export class OpaqueToken {
	    private _desc;
	    constructor(_desc: string);
	    toString(): string;
	}

}
declare module 'ditsy/target/src/core/di' {
	/**
	 * @module
	 * @description
	 * The `di` module provides dependency injection container services.
	 */
	export { InjectMetadata, OptionalMetadata, InjectableMetadata, SelfMetadata, HostMetadata, SkipSelfMetadata, DependencyMetadata } from 'ditsy/target/src/core/di/metadata';
	export * from 'ditsy/target/src/core/di/decorators';
	export { forwardRef, resolveForwardRef, ForwardRefFn } from 'ditsy/target/src/core/di/forward_ref';
	export { Injector } from 'ditsy/target/src/core/di/injector';
	export { Binding, ProviderBuilder, ResolvedBinding, ResolvedFactory, Dependency, bind, Provider, ResolvedProvider, provide } from 'ditsy/target/src/core/di/provider';
	export { Key, TypeLiteral } from 'ditsy/target/src/core/di/key';
	export { NoProviderError, AbstractProviderError, CyclicDependencyError, InstantiationError, InvalidProviderError, NoAnnotationError, OutOfBoundsError } from 'ditsy/target/src/core/di/exceptions';
	export { OpaqueToken } from 'ditsy/target/src/core/di/opaque_token';

}
declare module 'ditsy/target/src/core/reflection/types' {
	export type SetterFn = (obj: any, value: any) => void;
	export type GetterFn = (obj: any) => any;
	export type MethodFn = (obj: any, args: any[]) => any;

}
declare module 'ditsy/target/src/core/reflection/platform_reflection_capabilities' {
	import { Type } from 'ditsy/target/src/facade/lang';
	import { GetterFn, SetterFn, MethodFn } from 'ditsy/target/src/core/reflection/types';
	export interface PlatformReflectionCapabilities {
	    isReflectionEnabled(): boolean;
	    factory(type: Type): Function;
	    interfaces(type: Type): any[];
	    parameters(type: any): any[][];
	    annotations(type: any): any[];
	    propMetadata(typeOrFunc: any): {
	        [key: string]: any[];
	    };
	    getter(name: string): GetterFn;
	    setter(name: string): SetterFn;
	    method(name: string): MethodFn;
	    importUri(type: Type): string;
	}

}
declare module 'ditsy/target/src/core/reflection/reflector' {
	import { Type } from 'ditsy/target/src/facade/lang';
	import { SetterFn, GetterFn, MethodFn } from 'ditsy/target/src/core/reflection/types';
	import { PlatformReflectionCapabilities } from 'ditsy/target/src/core/reflection/platform_reflection_capabilities';
	export { SetterFn, GetterFn, MethodFn } from 'ditsy/target/src/core/reflection/types';
	export { PlatformReflectionCapabilities } from 'ditsy/target/src/core/reflection/platform_reflection_capabilities';
	/**
	 * Reflective information about a symbol, including annotations, interfaces, and other metadata.
	 */
	export class ReflectionInfo {
	    annotations: any[];
	    parameters: any[][];
	    factory: Function;
	    interfaces: any[];
	    propMetadata: {
	        [key: string]: any[];
	    };
	    constructor(annotations?: any[], parameters?: any[][], factory?: Function, interfaces?: any[], propMetadata?: {
	        [key: string]: any[];
	    });
	}
	/**
	 * Provides access to reflection data about symbols. Used internally by Angular
	 * to power dependency injection and compilation.
	 */
	export class Reflector {
	    /** @internal */
	    _injectableInfo: Map<any, ReflectionInfo>;
	    /** @internal */
	    _getters: Map<string, (obj: any) => any>;
	    /** @internal */
	    _setters: Map<string, (obj: any, value: any) => void>;
	    /** @internal */
	    _methods: Map<string, (obj: any, args: any[]) => any>;
	    /** @internal */
	    _usedKeys: Set<any>;
	    reflectionCapabilities: PlatformReflectionCapabilities;
	    constructor(reflectionCapabilities: PlatformReflectionCapabilities);
	    isReflectionEnabled(): boolean;
	    /**
	     * Causes `this` reflector to track keys used to access
	     * {@link ReflectionInfo} objects.
	     */
	    trackUsage(): void;
	    /**
	     * Lists types for which reflection information was not requested since
	     * {@link #trackUsage} was called. This list could later be audited as
	     * potential dead code.
	     */
	    listUnusedKeys(): any[];
	    registerFunction(func: Function, funcInfo: ReflectionInfo): void;
	    registerType(type: Type, typeInfo: ReflectionInfo): void;
	    registerGetters(getters: {
	        [key: string]: GetterFn;
	    }): void;
	    registerSetters(setters: {
	        [key: string]: SetterFn;
	    }): void;
	    registerMethods(methods: {
	        [key: string]: MethodFn;
	    }): void;
	    factory(type: Type): Function;
	    parameters(typeOrFunc: any): any[];
	    annotations(typeOrFunc: any): any[];
	    propMetadata(typeOrFunc: any): {
	        [key: string]: any[];
	    };
	    interfaces(type: Type): any[];
	    getter(name: string): GetterFn;
	    setter(name: string): SetterFn;
	    method(name: string): MethodFn;
	    /** @internal */
	    _getReflectionInfo(typeOrFunc: any): ReflectionInfo;
	    /** @internal */
	    _containsReflectionInfo(typeOrFunc: any): boolean;
	    importUri(type: Type): string;
	}

}
declare module 'ditsy/target/src/core/reflection/reflection' {
	import { Reflector } from 'ditsy/target/src/core/reflection/reflector';
	export { Reflector, ReflectionInfo } from 'ditsy/target/src/core/reflection/reflector';
	/**
	 * The {@link Reflector} used internally in Angular to access metadata
	 * about symbols.
	 */
	export var reflector: Reflector;

}
declare module 'ditsy/target/src/core/reflection/reflection_capabilities' {
	import { Type, ConcreteType } from 'ditsy/target/src/facade/lang';
	import { GetterFn, SetterFn, MethodFn } from 'ditsy/target/src/core/reflection/types';
	import { PlatformReflectionCapabilities } from 'ditsy/target/src/core/reflection/platform_reflection_capabilities';
	export class ReflectionCapabilities implements PlatformReflectionCapabilities {
	    private _reflect;
	    constructor(reflect?: any);
	    isReflectionEnabled(): boolean;
	    factory(t: ConcreteType): Function;
	    /** @internal */
	    _zipTypesAndAnnotaions(paramTypes: any, paramAnnotations: any): any[][];
	    parameters(typeOrFunc: Type): any[][];
	    annotations(typeOrFunc: Type): any[];
	    propMetadata(typeOrFunc: any): {
	        [key: string]: any[];
	    };
	    interfaces(type: Type): any[];
	    getter(name: string): GetterFn;
	    setter(name: string): SetterFn;
	    method(name: string): MethodFn;
	    importUri(type: Type): string;
	}

}
declare module 'ditsy/target/src/core/util/decorators' {
	import { ConcreteType, Type } from 'ditsy/target/src/facade/lang';
	/**
	 * Declares the interface to be used with {@link Class}.
	 */
	export interface ClassDefinition {
	    /**
	     * Optional argument for specifying the superclass.
	     */
	    extends?: Type;
	    /**
	     * Required constructor function for a class.
	     *
	     * The function may be optionally wrapped in an `Array`, in which case additional parameter
	     * annotations may be specified.
	     * The number of arguments and the number of parameter annotations must match.
	     *
	     * See {@link Class} for example of usage.
	     */
	    constructor: Function | any[];
	    /**
	     * Other methods on the class. Note that values should have type 'Function' but TS requires
	     * all properties to have a narrower type than the index signature.
	     */
	    [x: string]: Type | Function | any[];
	}
	/**
	 * An interface implemented by all Angular type decorators, which allows them to be used as ES7
	 * decorators as well as
	 * Angular DSL syntax.
	 *
	 * DSL syntax:
	 *
	 * ```
	 * var MyClass = ng
	 *   .Component({...})
	 *   .View({...})
	 *   .Class({...});
	 * ```
	 *
	 * ES7 syntax:
	 *
	 * ```
	 * @ng.Component({...})
	 * @ng.View({...})
	 * class MyClass {...}
	 * ```
	 */
	export interface TypeDecorator {
	    /**
	     * Invoke as ES7 decorator.
	     */
	    <T extends Type>(type: T): T;
	    (target: Object, propertyKey?: string | symbol, parameterIndex?: number): void;
	    /**
	     * Storage for the accumulated annotations so far used by the DSL syntax.
	     *
	     * Used by {@link Class} to annotate the generated class.
	     */
	    annotations: any[];
	    /**
	     * Generate a class from the definition and annotate it with {@link TypeDecorator#annotations}.
	     */
	    Class(obj: ClassDefinition): ConcreteType;
	}
	/**
	 * Provides a way for expressing ES6 classes with parameter annotations in ES5.
	 *
	 * ## Basic Example
	 *
	 * ```
	 * var Greeter = ng.Class({
	 *   constructor: function(name) {
	 *     this.name = name;
	 *   },
	 *
	 *   greet: function() {
	 *     alert('Hello ' + this.name + '!');
	 *   }
	 * });
	 * ```
	 *
	 * is equivalent to ES6:
	 *
	 * ```
	 * class Greeter {
	 *   constructor(name) {
	 *     this.name = name;
	 *   }
	 *
	 *   greet() {
	 *     alert('Hello ' + this.name + '!');
	 *   }
	 * }
	 * ```
	 *
	 * or equivalent to ES5:
	 *
	 * ```
	 * var Greeter = function (name) {
	 *   this.name = name;
	 * }
	 *
	 * Greeter.prototype.greet = function () {
	 *   alert('Hello ' + this.name + '!');
	 * }
	 * ```
	 *
	 * ### Example with parameter annotations
	 *
	 * ```
	 * var MyService = ng.Class({
	 *   constructor: [String, [new Query(), QueryList], function(name, queryList) {
	 *     ...
	 *   }]
	 * });
	 * ```
	 *
	 * is equivalent to ES6:
	 *
	 * ```
	 * class MyService {
	 *   constructor(name: string, @Query() queryList: QueryList) {
	 *     ...
	 *   }
	 * }
	 * ```
	 *
	 * ### Example with inheritance
	 *
	 * ```
	 * var Shape = ng.Class({
	 *   constructor: (color) {
	 *     this.color = color;
	 *   }
	 * });
	 *
	 * var Square = ng.Class({
	 *   extends: Shape,
	 *   constructor: function(color, size) {
	 *     Shape.call(this, color);
	 *     this.size = size;
	 *   }
	 * });
	 * ```
	 */
	export function Class(clsDef: ClassDefinition): ConcreteType;
	export function makeDecorator(annotationCls: any, chainFn?: (fn: Function) => void): (...args: any[]) => (cls: any) => any;
	export function makeParamDecorator(annotationCls: any): any;
	export function makePropDecorator(decoratorCls: any): any;

}
declare module 'ditsy/target/src/facade/collection' {
	export var Map: MapConstructor;
	export var Set: SetConstructor;
	export class MapWrapper {
	    static clone<K, V>(m: Map<K, V>): Map<K, V>;
	    static createFromStringMap<T>(stringMap: {
	        [key: string]: T;
	    }): Map<string, T>;
	    static toStringMap<T>(m: Map<string, T>): {
	        [key: string]: T;
	    };
	    static createFromPairs(pairs: any[]): Map<any, any>;
	    static clearValues(m: Map<any, any>): void;
	    static iterable<T>(m: T): T;
	    static keys<K>(m: Map<K, any>): K[];
	    static values<V>(m: Map<any, V>): V[];
	}
	/**
	 * Wraps Javascript Objects
	 */
	export class StringMapWrapper {
	    static create(): {
	        [k: string]: any;
	    };
	    static contains(map: {
	        [key: string]: any;
	    }, key: string): boolean;
	    static get<V>(map: {
	        [key: string]: V;
	    }, key: string): V;
	    static set<V>(map: {
	        [key: string]: V;
	    }, key: string, value: V): void;
	    static keys(map: {
	        [key: string]: any;
	    }): string[];
	    static isEmpty(map: {
	        [key: string]: any;
	    }): boolean;
	    static delete(map: {
	        [key: string]: any;
	    }, key: string): void;
	    static forEach<K, V>(map: {
	        [key: string]: V;
	    }, callback: Function): void;
	    static merge<V>(m1: {
	        [key: string]: V;
	    }, m2: {
	        [key: string]: V;
	    }): {
	        [key: string]: V;
	    };
	    static equals<V>(m1: {
	        [key: string]: V;
	    }, m2: {
	        [key: string]: V;
	    }): boolean;
	}
	/**
	 * A boolean-valued function over a value, possibly including context information
	 * regarding that value's position in an array.
	 */
	export interface Predicate<T> {
	    (value: T, index?: number, array?: T[]): boolean;
	}
	export class ListWrapper {
	    static createFixedSize(size: number): any[];
	    static createGrowableSize(size: number): any[];
	    static clone<T>(array: T[]): T[];
	    static forEachWithIndex<T>(array: T[], fn: (t: T, n: number) => void): void;
	    static first<T>(array: T[]): T;
	    static last<T>(array: T[]): T;
	    static indexOf<T>(array: T[], value: T, startIndex?: number): number;
	    static contains<T>(list: T[], el: T): boolean;
	    static reversed<T>(array: T[]): T[];
	    static concat(a: any[], b: any[]): any[];
	    static insert<T>(list: T[], index: number, value: T): void;
	    static removeAt<T>(list: T[], index: number): T;
	    static removeAll<T>(list: T[], items: T[]): void;
	    static remove<T>(list: T[], el: T): boolean;
	    static clear(list: any[]): void;
	    static isEmpty(list: any[]): boolean;
	    static fill(list: any[], value: any, start?: number, end?: number): void;
	    static equals(a: any[], b: any[]): boolean;
	    static slice<T>(l: T[], from?: number, to?: number): T[];
	    static splice<T>(l: T[], from: number, length: number): T[];
	    static sort<T>(l: T[], compareFn?: (a: T, b: T) => number): void;
	    static toString<T>(l: T[]): string;
	    static toJSON<T>(l: T[]): string;
	    static maximum<T>(list: T[], predicate: (t: T) => number): T;
	}
	export function isListLikeIterable(obj: any): boolean;
	export function iterateListLike(obj: any, fn: Function): void;
	export class SetWrapper {
	    static createFromList<T>(lst: T[]): Set<T>;
	    static has<T>(s: Set<T>, key: T): boolean;
	    static delete<K>(m: Set<K>, k: K): void;
	}

}
