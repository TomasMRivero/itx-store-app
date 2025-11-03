import '@testing-library/jest-dom';
import 'whatwg-fetch';

globalThis.importMeta = {
  env: {
    VITE_ITX_BASE_URL: 'http://localhost:3000',
    VITE_CACHE_EXPIRES_AFTER_SECONDS: '3600'
  }
};

const storage = {};
globalThis.localStorage = {
  getItem: key => storage[key] ?? null,
  setItem: (key, value) => { storage[key] = value; },
  removeItem: key => { delete storage[key]; },
  clear: () => Object.keys(storage).forEach(k => delete storage[k])
};