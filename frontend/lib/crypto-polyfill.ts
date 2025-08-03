// lib/crypto-polyfill.ts
declare global {
  interface Window {
    crypto: Crypto & {
      randomUUID?: () => string;
    };
  }
}

if (typeof window !== 'undefined') {
  if (!window.crypto) {
    window.crypto = {} as Crypto;
  }

  if (!window.crypto.randomUUID) {
    window.crypto.randomUUID = function (): string {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    };
  }
}

export { };
