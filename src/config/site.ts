// Dados da empresa e de contato usados em todo o site.
// Única fonte: altere aqui e todas as páginas acompanham.

export const site = {
  name: 'RecepClinic',
  tagline: 'A recepção inteligente da sua clínica',
  url: 'https://www.recepclinic.com.br',

  contact: {
    email: 'contato@recepclinic.com.br',
    // Número com DDI e DDD, só dígitos (ex.: '5511999999999'). Informado pelo cliente na S2.
    whatsapp: null as string | null,
  },

  company: {
    // Preenchidos quando o CNPJ sair (S6). Enquanto null, o rodapé mostra o espaço reservado.
    legalName: null as string | null,
    cnpj: null as string | null,
  },
};

export const legalNameLabel = site.company.legalName ?? '[razão social]';
export const cnpjLabel = site.company.cnpj ?? 'em abertura';

export const whatsappUrl = site.contact.whatsapp
  ? `https://wa.me/${site.contact.whatsapp}`
  : null;
