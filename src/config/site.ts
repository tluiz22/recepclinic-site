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
    // Nome jurídico exatamente como no cartão CNPJ e na verificação da Meta (S-4, 09/out/2026).
    // Com legalName null, o site não mostra nada sobre a empresa.
    legalName: '69.503.530 THIAGO LUIZ DE SOUSA' as string | null,
    cnpj: '69.503.530/0001-59' as string | null,
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
