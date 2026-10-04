# Plano do site do RecepClinic (`www.recepclinic.com.br`)

> **Versão viva do plano do site.** Copiado em 03/out/2026 de
> `~/Documents/Desenvolvimento/recepclinic/docs/site-plano.md` (que fica só como registro do
> planejamento). Daqui em diante, as atualizações acontecem **neste arquivo**.
>
> Frente paralela ao produto (ver "Frentes paralelas" no `docs/plano.md` do repositório do produto).
> Planejado com o cliente em 03/out/2026, uma dúvida de cada vez.
>
> **Regras da sessão de execução** (as mesmas do produto): uma etapa por vez; ao fim de cada etapa,
> o que foi feito e os comandos para o cliente validar; **parar até a confirmação explícita**;
> nenhuma decisão de negócio tomada sozinha. Dúvidas novas: uma de cada vez, com opção recomendada.
>
> **Onde a sessão do site trabalha:** na pasta `~/Documents/Desenvolvimento/recepclinic-site`
> (repositório `tluiz22/recepclinic-site`). Do repositório do produto
> (`~/Documents/Desenvolvimento/recepclinic`) ela **só lê** os documentos de referência citados em
> "Base de conteúdo" e **nunca faz commit nele**: as duas sessões podem rodar ao mesmo tempo sem
> conflito.
>
> **Por que o site vem agora:** a verificação da empresa e o cadastro como **Tech Provider** na
> Meta (pendência registrada no plano do produto, a tratar **depois** do site) exigem um site no
> domínio da empresa, com nome, contato e política de privacidade.

## Situação atual (atualizada em 04/out/2026)

**O site está no ar em https://www.recepclinic.com.br.** Etapas S0 a S5 concluídas e validadas.

**Próxima etapa: S6**, que **depende do CNPJ** (em abertura pelo cliente). Ao retomar:

1. Perguntar ao cliente se o CNPJ já saiu. Se não, não há etapa a executar; só as pendências abaixo.
2. Com o CNPJ: preencher `legalName` e `cnpj` em `src/config/site.ts` (o texto aparece sozinho no
   rodapé, na abertura da política e dos termos e no "Controlador"), conferir `npm run check` e
   `npm run build`, publicar (push na `main`) e seguir o checklist da S6.

**Como o site funciona hoje**

| Item | Onde / como |
|---|---|
| Código | Astro 7 estático; `npm run dev`, `npm run check`, `npm run build`; CI no GitHub (`check` + `build`) |
| Dados da empresa e contato | `src/config/site.ts` (WhatsApp `5561998645490`, `contato@recepclinic.com.br`; razão social e CNPJ vazios) |
| Hospedagem | Cloudflare **Worker com arquivos estáticos** `recepclinic-site` (Workers Builds); **publica sozinho a cada push na `main`**; configuração em `wrangler.jsonc`; cabeçalhos em `public/_headers` |
| Domínio | DNS na Cloudflare; `www.recepclinic.com.br` é o endereço oficial; `recepclinic.com.br` → `www` (Redirect Rule, 301); Always Use HTTPS ligado; `recepclinic-site.tluiz22.workers.dev` continua ativo |
| E-mail | Email Routing: `contato@recepclinic.com.br` → `tluiz22projetos@gmail.com` (só recebe) |
| Páginas legais | `/privacidade` (versão de 04/10/2026, com o Google Analytics) e `/termos` (03/10/2026), ambas "versão em revisão jurídica" |
| Analytics | Google Analytics 4 `G-KE3HKJ7NK9` (`site.analytics.gaId` em `src/config/site.ts`), carregado **só depois do "Aceitar"** no aviso de cookies (`src/components/CookieConsent.astro`); "Preferências de cookies" no rodapé; domínios do Google liberados no CSP de `public/_headers` (S-8) |

**Pendências fora das etapas** (nenhuma bloqueia a S6)

- **Revisão das páginas legais por advogado antes do 1º piloto** (S-7). Ao receber a versão
  revisada: atualizar o texto, a data (`updated`) e tirar o selo (`inReview={false}`) em
  `src/pages/privacidade.astro` e `src/pages/termos.astro`. Pontos deixados para o advogado: prazos
  de retenção, limite de responsabilidade, foro e a aplicação do Decreto 7.962/2013, e agora também
  o aviso de cookies e o trecho do Google Analytics (S-8).
- **Retenção do Google Analytics em 2 meses** (o que a política diz): conferir no GA em
  Administrador → Configurações de dados → Retenção de dados.
- **A política descreve o produto no modelo alvo** (dados separados por clínica, D1; acesso do
  suporte registrado, D6): isso precisa estar pronto no produto antes do 1º piloto.
- Opcionais, a critério do cliente: desligar o endereço `workers.dev` (Worker → Settings → Domains &
  Routes); publicar um registro DMARC; enviar e-mails **como** `contato@` (exige serviço de envio).

## Decisões

| # | Assunto | Decisão |
|---|---|---|
| S-1 | Onde fica | **Projeto separado** do produto (D7 ajustada): `www.recepclinic.com.br` = site; `app.recepclinic.com.br` = produto (este repositório) |
| S-2 | Hospedagem | **Cloudflare Pages** (grátis, permite uso comercial, repositório privado), com o **DNS do domínio na Cloudflare**. Na criação (04/out/2026), a Cloudflare fez um **Worker com arquivos estáticos** (mesmo plano grátis); ver S5 |
| S-3 | Páginas | **Início** (apresentação adaptada da proposta de valor) + **Política de privacidade** + **Termos de uso**; contato no Início e no rodapé |
| S-4 | Empresa | **CNPJ em abertura** (SLU, ME, Simples Nacional; roteiro passado ao cliente). ~~O site vai ao ar com espaço reservado~~ **Ajuste (04/out/2026):** até o CNPJ sair, o site **não mostra nada sobre a empresa** (só "© RecepClinic"; política e termos falam em "RecepClinic"). Ao preencher razão social e CNPJ em `src/config/site.ts`, entra "RecepClinic é uma marca de <razão social>, CNPJ <número>" no rodapé, na abertura da política e dos termos e no "Controlador" |
| S-5 | Contato | **WhatsApp pessoal do cliente** + `contato@recepclinic.com.br` **redirecionado para o e-mail pessoal** (Email Routing da Cloudflare). **Sem formulário.** |
| S-6 | Visual | O da **proposta de valor** (verde-petróleo, Bricolage Grotesque nos títulos, Source Sans no texto, claro e escuro); **logo provisório só com o nome** "RecepClinic" e ícone simples |
| S-7 | Páginas legais | **Redigidas pelo Claude** a partir do que o sistema faz, publicadas como "versão em revisão"; **revisão de advogado antes do 1º piloto** |
| S-8 | Analytics | **Google Analytics 4** (decisão do cliente, 04/out/2026, revendo o padrão "sem analytics"; a alternativa sem cookies, Cloudflare Web Analytics, foi apresentada). Só com **consentimento** (aviso "Aceitar/Recusar", GA carregado só após o aceite, troca pelo rodapé); sinais de publicidade desligados; política atualizada (seções 3, 9, 10 e 11); retenção de 2 meses. Publicado e validado pelo cliente em 04/out/2026 (visita no Tempo real) |

## Padrões assumidos (revisáveis)

- **Repositório**: `tluiz22/recepclinic-site`, privado, pasta `~/Documents/Desenvolvimento/recepclinic-site`.
  Criado vazio pelo cliente no GitHub (o `gh` não está instalado).
- **Tecnologia**: Astro em modo estático, CSS próprio com os tokens da proposta de valor, sem
  JavaScript além do tema claro/escuro. CI no GitHub (`check` + `build`).
- **Este plano foi copiado** (03/out/2026, antes da S1) para `docs/plano.md` do repositório do
  site, que é a versão viva. O `site-plano.md` do produto fica como registro do planejamento.
- **Texto do Início**: o posicionamento **genérico** do produto (D4a), "RecepClinic — a recepção
  inteligente da sua clínica", com a **pediatria como origem** ("nasceu num consultório
  pediátrico"), não como público único. **Sem citar a Dra. Ana Karina** (exige autorização) e **sem
  preço**, como na proposta de valor.
- **Apex → www**: `recepclinic.com.br` redireciona para `www.recepclinic.com.br`.
- **SEO básico**: título e descrição por página, sitemap, `robots.txt`, imagem de compartilhamento
  com o nome, ícone.
- ~~**Sem analytics, cookies ou rastreamento** na 1ª versão~~ **Revisto em 04/out/2026:** Google
  Analytics com consentimento (S-8).

## Base de conteúdo

- **Início**: a página de proposta de valor de 30/set (artifact
  `https://claude.ai/artifact/WJmwRatWcPznYi9xsF1XLU`, ler pela ferramenta Artifact): exemplo do
  lembrete com botões, o problema, o que faz para paciente/recepção/profissional, convive com o que a
  clínica usa, implantação em 4 passos, convite para demonstração. Ajustes: marca RecepClinic,
  vocabulário genérico (clínica, paciente, recepção, profissional), seção de pediatria virando
  "nasceu num consultório pediátrico" e um contato direto (WhatsApp e e-mail).
- **Páginas legais**: o diagnóstico e a arquitetura do repositório do produto
  (`~/Documents/Desenvolvimento/recepclinic/docs/diagnostico.md` e `.../docs/arquitetura.md`,
  somente leitura) descrevem os dados tratados, os provedores e onde os dados ficam.

## Etapas

### S0 — Preparação (cliente, pode começar já)

> **Status:** concluída. Repositório criado em 03/out/2026; domínio ativo na Cloudflare em
> 04/out/2026 (servidores `crystal` e `rodney.ns.cloudflare.com`).

- Criar o repositório **vazio e privado** `tluiz22/recepclinic-site` no GitHub e cloná-lo:
  `git clone https://github.com/tluiz22/recepclinic-site.git ~/Documents/Desenvolvimento/recepclinic-site`.
  É aí que a sessão do site é aberta. **Só isto é necessário para começar.**
- Criar a conta na **Cloudflare** (plano Free; pode ser depois, até a S5), adicionar o domínio `recepclinic.com.br` e **trocar
  os servidores DNS no registro.br** pelos que a Cloudflare indicar. A troca pode levar até 24–48h
  para valer, por isso convém fazer cedo.
- **Validar:** painel da Cloudflare mostra o domínio como "Active".

### S1 — Projeto e estrutura

> **Status:** concluída e validada pelo cliente em 03/out/2026. Astro 7 estático; fontes
> servidas pelo próprio site (pacotes Fontsource, sem Google Fonts, para não expor o IP do
> visitante a terceiros); dados da empresa e contato em `src/config/site.ts`; páginas `/`,
> `/privacidade` e `/termos` provisórias; CI em `.github/workflows/ci.yml`.

- Projeto Astro estático na pasta e no repositório acima; layout com cabeçalho (logo provisório) e
  rodapé (contato, links legais, **"RecepClinic é uma marca de [razão social] · CNPJ [em
  abertura]"** vindo de um único arquivo de configuração).
- Tokens de cor e fontes da proposta de valor, tema claro e escuro, celular primeiro.
- ~~Copiar este plano para `docs/plano.md` do site~~ (feito antes da S1, em 03/out/2026).
- CI (`check` + `build`).
- **Validar:** `npm run dev` abre o esqueleto; `npm run build` sem erro.

### S2 — Página Início

> **Status:** concluída e validada pelo cliente em 03/out/2026. Texto adaptado da proposta de valor, exemplo de
> lembrete, seção "nasceu num consultório pediátrico", contato no fim com âncora `#contato`;
> WhatsApp (61) 99864-5490 no botão de contato e no rodapé.

- Adaptação da proposta de valor conforme "Base de conteúdo".
- Contato: botão de WhatsApp (número pessoal, informado pelo cliente nesta etapa) e
  `contato@recepclinic.com.br`.
- **Validar:** leitura do texto pelo cliente no navegador (computador e celular).

### S3 — Política de privacidade (versão em revisão)

> **Status:** concluída e validada pelo cliente em 03/out/2026. Texto em `/privacidade` (16 seções),
> layout comum das páginas legais em `src/layouts/Legal.astro` (selo de revisão, data da versão,
> índice). Descreve o produto **no modelo alvo** (dados separados por clínica, D1; acesso do
> suporte registrado, D6), que precisa estar pronto antes do 1º piloto. Retenção sem prazos em
> número (devolução ou exclusão conforme contrato): prazos ficam para a revisão do advogado.

- Papéis: RecepClinic controlador (visitantes do site, usuários do painel) e **operador** dos dados
  de pacientes e contatos, cuja **controladora é a clínica**.
- Dados tratados, finalidades e bases legais; WhatsApp/Meta; suboperadores (Meta, Supabase,
  Vercel, Cloudflare) e onde ficam os dados; retenção; segurança; direitos do titular e como
  exercê-los; encarregado (canal `contato@`); dados de saúde e de crianças; atualizações da política.
- Selo "versão em revisão jurídica" com data.
- **Validar:** leitura do cliente; URL estável para a Meta (`/privacidade`).

### S4 — Termos de uso (versão em revisão)

> **Status:** concluída e validada pelo cliente em 04/out/2026. Texto em `/termos` (16 seções), no
> mesmo layout da política. Preço, prazos, SLA, horário de suporte e limite de valor da
> responsabilidade **remetidos à proposta comercial e ao contrato** (sem números nos termos). Foro:
> comarca da sede da empresa, salvo outro no contrato.

- Objeto do serviço, responsabilidades da clínica (dados dos pacientes, uso do WhatsApp conforme
  as regras da Meta) e do RecepClinic, disponibilidade, suporte, limitações, encerramento, foro.
  Sem preço (proposta comercial à parte).
- **Validar:** leitura do cliente; URL `/termos`.

### S5 — Publicação

> **Status:** concluída e validada pelo cliente em 04/out/2026 (site aberto no celular pelo domínio;
> e-mail de teste para `contato@` recebido).
>
> - **Decisão:** publicar já, **aberto às buscas**, mesmo antes do CNPJ e da revisão jurídica.
>   Contatos de clínicas nesse período: conversa, demonstração e lista de interessados; contrato e
>   nota só depois do CNPJ.
> - **Código:** sitemap, `robots.txt`, página 404 (fora das buscas), imagem de compartilhamento
>   (`og.png`) e ícone para celular, metatags de compartilhamento e link canônico, cabeçalhos de
>   segurança e cache (`public/_headers`), páginas geradas como `.html` (URLs `/privacidade` e
>   `/termos` sem barra no fim).
> - **Hospedagem:** a Cloudflare criou o projeto como **Worker com arquivos estáticos** (não Pages),
>   no mesmo plano grátis; `wrangler.jsonc` serve `dist`, mantém as URLs sem barra e responde com
>   `404.html`.
> - **Domínio:** Worker com os domínios `recepclinic.com.br` e `www.recepclinic.com.br`; Redirect
>   Rule `sem www para www` (301, preserva caminho e parâmetros); Always Use HTTPS; certificado até
>   jan/2027.
> - **E-mail:** Email Routing `contato@` → `tluiz22projetos@gmail.com`; MX
>   `route1/2/3.mx.cloudflare.net`, SPF `include:_spf.mx.cloudflare.net ~all` e DKIM publicados (o MX
>   nulo e o `v=spf1 -all` herdados do registro.br foram apagados). Só recebe.

- Cloudflare Pages ligado ao repositório (deploy a cada push na `main`); domínio
  `www.recepclinic.com.br` com HTTPS; `recepclinic.com.br` redirecionando para `www`.
- **Email Routing**: `contato@recepclinic.com.br` → e-mail pessoal do cliente (informado nesta
  etapa).
- **Validar:** abrir o site pelo domínio no celular; mandar um e-mail para `contato@` e ver chegar.

### S6 — Conferência para a Meta e CNPJ

> **Levantado em 04/out/2026** (a confirmar nas páginas atuais da Meta nesta etapa): a verificação é
> da pessoa jurídica; o nome legal no Gerenciador de Negócios deve bater **exatamente** com o
> documento (cartão CNPJ/contrato social), e o **nome legal precisa aparecer no site** (rodapé ou
> contato), mostrando a relação com a marca ("RecepClinic é uma marca de <razão social>"). O
> cliente considerou usar uma empresa que já tem na Meta e **decidiu manter o CNPJ próprio do
> RecepClinic** (S-4), para não ter de refazer a verificação e transferir o app depois.

- Checklist do que a verificação costuma pedir, **conferido nas páginas atuais da Meta**: nome
  da empresa igual ao do CNPJ, contato, e-mail no domínio, política de privacidade publicada.
- Quando o CNPJ sair: preencher razão social e CNPJ no arquivo de configuração e publicar.
- Daí em diante, a pendência **Tech Provider** do plano do produto pode começar.
- **Validar:** checklist completo; rodapé com os dados do CNPJ.

## Informações que o cliente fornece durante a execução

| Informação | Etapa | Situação |
|---|---|---|
| Repositório criado, conta Cloudflare, DNS trocado | S0 | recebido |
| Número de WhatsApp pessoal para o botão | S2 | recebido: (61) 99864-5490 |
| E-mail pessoal de destino do `contato@` | S5 | recebido: `tluiz22projetos@gmail.com` |
| Razão social e CNPJ | S6 (quando sair) | **pendente** (CNPJ em abertura) |
| Advogado para revisar as páginas legais | antes do 1º piloto | **pendente** |
