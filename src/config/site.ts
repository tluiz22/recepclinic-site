// Dados da empresa e de contato usados em todo o site.
// Única fonte: altere aqui e todas as páginas acompanham.

export const site = {
  name: 'RecepClinic',
  tagline: 'A recepção inteligente da sua clínica',
  url: 'https://www.recepclinic.com.br',

  contact: {
    email: 'contato@recepclinic.com.br',
    // Número com DDI e DDD, só dígitos (ex.: '5511999999999'). Informado pelo cliente na S2.
    whatsapp: '5561998645490' as string | null,
  },

  // Google Analytics 4 (decisão do cliente, 04/out/2026). Só carrega depois que o visitante
  // aceita no aviso de cookies. null desliga o analytics e o aviso.
  analytics: {
    gaId: 'G-KE3HKJ7NK9' as string | null,
  },

  company: {
    // Preenchidos quando o CNPJ sair (S6). Enquanto legalName for null, o site não mostra nada
    // sobre a empresa (decisão do cliente, 04/out/2026).
    legalName: null as string | null,
    cnpj: null as string | null,
  },
};

// Razão social e CNPJ prontos para o texto (ex.: "Empresa Ltda., CNPJ 00.000.000/0001-00"),
// ou null enquanto a empresa não estiver preenchida.
export const companyIdentity = site.company.legalName
  ? [site.company.legalName, site.company.cnpj && `CNPJ ${site.company.cnpj}`]
      .filter(Boolean)
      .join(', ')
  : null;

const whatsappGreeting = 'Olá! Quero conhecer o RecepClinic.';

export const whatsappUrl = site.contact.whatsapp
  ? `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(whatsappGreeting)}`
  : null;
