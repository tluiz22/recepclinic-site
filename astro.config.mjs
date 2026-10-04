// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.recepclinic.com.br',
  // Gera privacidade.html em vez de privacidade/index.html: o Cloudflare Pages serve em
  // /privacidade, sem barra no fim e sem redirecionamento (URL estável para a Meta).
  trailingSlash: 'never',
  build: { format: 'file' },
});
