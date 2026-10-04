# Site do RecepClinic (`www.recepclinic.com.br`)

O plano vivo deste projeto é [`docs/plano.md`](docs/plano.md): decisões, padrões assumidos, base de
conteúdo e etapas (S0–S6). Leia-o no início de cada sessão, **começando pela seção "Situação
atual"** (onde paramos, próxima etapa, como o site funciona e pendências), e mantenha-o atualizado
aqui (status das etapas, decisões novas, "Situação atual").

O site está no ar em https://www.recepclinic.com.br e **publica sozinho a cada push na `main`**
(Cloudflare Workers Builds). Antes de qualquer push: `npm run check` e `npm run build` sem erro.

## Regras de trabalho

- Responder ao cliente em português.
- **Uma etapa por vez.** Ao fim de cada etapa: o que foi feito e os comandos para o cliente validar.
  **Parar até a confirmação explícita** antes de seguir para a próxima.
- **Nenhuma decisão de negócio tomada sozinha.** Dúvidas novas: uma de cada vez, com a opção
  recomendada.
- O repositório do produto (`~/Documents/Desenvolvimento/recepclinic`) é **somente leitura** a
  partir daqui: consultar os documentos de referência citados no plano, **nunca fazer commit nele**.
