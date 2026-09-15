/* eslint-disable @typescript-eslint/no-require-imports */
// Next.js ожидает Web API до импорта next/server, а jsdom предоставляет их не всегда.
const { TextDecoder, TextEncoder } = require('node:util');
const { ReadableStream } = require('node:stream/web');
const { MessagePort } = require('node:worker_threads');

globalThis.TextDecoder = TextDecoder;
globalThis.TextEncoder = TextEncoder;
globalThis.ReadableStream = ReadableStream;
globalThis.MessagePort = MessagePort;

const { Headers, Request, Response } = require('undici');

globalThis.Headers = Headers;
globalThis.Request = Request;
globalThis.Response = Response;