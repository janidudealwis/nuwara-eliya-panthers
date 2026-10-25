import { defineConfig } from 'vite';

// Safari only supports backdrop-filter behind the -webkit- prefix before 18,
// so keep the prefix when minifying instead of letting it be stripped.
export default defineConfig({
  css: { transformer: 'lightningcss', lightningcss: { targets: { safari: (15 << 16), ios_saf: (15 << 16), chrome: (100 << 16), firefox: (100 << 16) } } },
  build: { cssMinify: 'lightningcss', cssTarget: ['safari15', 'chrome100', 'firefox100'] },
});
