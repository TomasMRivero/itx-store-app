import '@testing-library/jest-dom';
import 'whatwg-fetch';
import { TextEncoder, TextDecoder } from 'util';
import { TransformStream, ReadableStream, WritableStream } from 'stream/web';

process.env.VITE_ITX_BASE_URL = process.env.VITE_ITX_BASE_URL ?? 'http://localhost:3000';
process.env.VITE_CACHE_EXPIRES_AFTER_SECONDS = process.env.VITE_CACHE_EXPIRES_AFTER_SECONDS ?? '3600';

class MockBroadcastChannel {
	constructor() { }
	postMessage() { }
	addEventListener() { }
	removeEventListener() { }
	close() { }
}

global.BroadcastChannel = MockBroadcastChannel;
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
global.TransformStream = TransformStream;
global.ReadableStream = ReadableStream;
global.WritableStream = WritableStream;


const storage = {};
globalThis.localStorage = {
	getItem: key => storage[key] ?? null,
	setItem: (key, value) => { storage[key] = value; },
	removeItem: key => { delete storage[key]; },
	clear: () => Object.keys(storage).forEach(k => delete storage[k])
};