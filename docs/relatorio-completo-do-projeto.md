# Relatório técnico completo — Front Web QA Challenge

**Data do relatório:** 4 de novembro de 2026
**Projeto:** automação E2E da aplicação pública PlayLab  
**Tecnologia principal:** Playwright Test com TypeScript

## 1. Resumo executivo

O projeto automatiza fluxos selecionados de uma aplicação web pública. A suíte atual contém **12 testes independentes**: 11 cenários desktop executados em Chromium e Firefox e um cenário mobile executado em Chromium emulado como Pixel 7, totalizando 23 execuções.

A configuração centralizada gera relatório HTML e screenshot ao final de cada teste; o spec mobile também salva capturas em etapas relevantes. Trace e vídeo estão desativados na configuração atual. O workflow do GitHub Actions executa a suíte em push, pull request ou solicitação manual e publica os resultados como artefato temporário.

## 2. Aplicação-alvo e objetivo

A aplicação utilizada é o [PlayLab — Playwright Practice Arena](https://playwrightlab.github.io/), ambiente público de prática com tabelas, formulários, dropdowns e outros componentes.

O objetivo é validar comportamentos observáveis da interface e demonstrar uma estrutura de automação sustentável. Como o ambiente é externo e não controlado pelo projeto, os testes evitam alterar registros da tabela e podem ser afetados por indisponibilidade, rede ou mudanças no site.

## 3. Escopo implementado

| IDs | Grupo | O que o teste verifica |
|---|---|---|
| Login | Login de demonstração | Validação da mensagem de boas-vindas após envio. |
| FRM-01 | Formulário — cadastro válido | Preenchimento com dados fictícios válidos e confirmação. |
| A11Y-03 | Cadastro por teclado | Preenchimento usando teclado e envio com Enter; não equivale a auditoria WCAG. |
| USR-01/02 | Tabela de usuários | Navegação até a tabela e validação de checkbox e cabeçalhos. |
| USR-03/04 | Pesquisa | Busca de Alice e validação de zero resultados para Bruno. |
| USR-05 | Filtro de tabela | Filtro por função `Viewer`. |
| USR-06 | Paginação | Navegação entre páginas e retorno à primeira. |
| RSP-02/USR-03 | Responsividade — mobile | Busca de Alice em viewport Pixel 7 emulado, de 412 × 839, usando Chromium. |
| DYN-02 | Componente dinâmico | Configuração de atraso e validação da exibição do conteúdo carregado. O spec não seleciona uma opção carregada dinamicamente. |
| UP-01 | Upload | Envio de `fixtures/teste.txt` e validação da mensagem de sucesso. |
| Transversal | Relatório e evidências | Reporter HTML e screenshots; publicação do log e artefatos da pipeline por 14 dias. Trace e vídeo estão desativados. |

O total é de 12 testes: 11 testes desktop executados em dois navegadores (22 execuções) e um teste mobile, totalizando **23 combinações de teste/projeto**.

### Cenários não implementados nesta etapa

Ficam fora da cobertura atual: ordenação, status e ação na tabela (USR-07/08); validação negativa, limites e reset do formulário (FRM-02/03/04/05/06/08); DYN-01 e seleção de opção realmente carregada de forma dinâmica; sobreposição, scroll horizontal e acesso a todas as ações mobile (RSP-03/04/05); verificações ampliadas de acessibilidade (A11Y-01/02/04/05/06/07); rejeição de arquivos inválidos, drag-and-drop, iframes, API, carga e stress.

As justificativas e prioridades estão detalhadas na [matriz de cenários](./matriz-de-cenarios.md), na [matriz de riscos](./matriz-de-riscos.md) e na [estratégia de testes](./estrategia-de-testes.md).

## 4. Estrutura do repositório

```text
.
├── .env.example
├── .github/
│   └── workflows/
│       └── playwright.yml
├── docs/
│   ├── estrategia-de-testes.md
│   ├── matriz-de-cenarios.md
│   ├── matriz-de-riscos.md
│   └── relatorio-completo-do-projeto.md
├── fixtures/
│   └── teste.txt
├── src/
│   ├── fixtures/
│   │   ├── capturar-etapa.ts
│   │   └── test.ts
│   └── pages/
│       └── users.page.ts
├── Spec/
│   ├── Acessibilidade/
│   ├── Componentes dinâmicos e ou assíncronos/
│   ├── Formularios/
│   ├── Login/
│   ├── Responsividade/
│   ├── Upload de Arquivo/
│   └── User Management/
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.ts
└── tsconfig.json
```

### Responsabilidade de cada arquivo

| Arquivo | Responsabilidade |
|---|---|
| `.env.example` | Exemplo de configuração de `BASE_URL`; pode ser copiado para `.env` para apontar a suíte para outro ambiente compatível. |
| `.gitignore` | Impede versionar dependências, relatórios, resultados de teste, logs locais, autenticação Playwright e arquivos `.env` locais. Mantém `.env.example` permitido. |
| `.github/workflows/playwright.yml` | Define gatilhos, ambiente Node.js, instalação de dependências e navegadores, execução e upload de relatório/evidências no GitHub Actions. |
| `docs/estrategia-de-testes.md` | Registra objetivo, escopo, jornadas, riscos, priorização, estratégia de automação, navegadores, pipeline, limitações e próximos passos. |
| `docs/matriz-de-cenarios.md` | Relaciona IDs, jornada, descrição, tipo, risco protegido, prioridade, decisão de automatizar, justificativa e status. |
| `docs/matriz-de-riscos.md` | Descreve riscos, impacto, probabilidade, prioridade, cenários relacionados, mitigação e critérios da priorização. |
| `docs/relatorio-completo-do-projeto.md` | Este relatório explicativo, com a visão consolidada do projeto e de seus arquivos. |
| `src/fixtures/capturar-etapa.ts` | Cria screenshots numeradas das principais etapas de cada teste e amplia o limite de tempo para acomodar a captura. |
| `src/fixtures/test.ts` | Estende o Playwright com a fixture tipada `usersPage`. Também exporta `expect`. |
| `src/pages/users.page.ts` | Encapsula acesso à tabela, busca e leitura de célula associada ao cabeçalho. Normaliza indicadores de ordenação no texto dos cabeçalhos. |
| `Spec/Acessibilidade/A11Y-03 - Validar a navegação por teclado.spec.ts` | Preenche e envia o formulário usando teclado e valida a confirmação. |
| `Spec/Formularios/FRM-01 - Submeter o formulário com dados válidos.spec.ts` | Implementa cadastro válido. |
| `Spec/Login/Validar login com sucesso.spec.ts` | Implementa login de demonstração e valida a mensagem de boas-vindas. |
| `Spec/Responsividade/Pesquisa usuário válido em dispositivo móvel.spec.ts` | Executa a busca na resolução mobile Pixel 7 emulada (RSP-02/USR-03). |
| `Spec/Componentes dinâmicos e ou assíncronos/DYN-02 - Selecionar uma opção carregada dinamicamente.spec.ts` | Configura o atraso da operação e valida o conteúdo após o carregamento; atualmente não seleciona uma opção carregada dinamicamente. |
| `Spec/Upload de Arquivo/UP-01 - Validar upload de arquivo com sucesso.spec.ts` | Envia `fixtures/teste.txt` com `setInputFiles` e valida a mensagem de sucesso do upload. |
| `fixtures/teste.txt` | Arquivo usado como entrada pelo cenário de upload UP-01. |
| `Spec/User Management/` | Contém os cenários independentes USR-01 a USR-06 para navegação, estrutura, busca, filtro e paginação. |
| `package.json` | Declara scripts, dependências e metadados do projeto. |
| `package-lock.json` | Fixa a árvore resolvida das dependências para instalação reproduzível com `npm ci`. |
| `playwright.config.ts` | Centraliza URL-base, projetos de navegador, resolução, workers, retries, reporter e coleta de screenshots. Trace e vídeo estão desativados. |
| `tsconfig.json` | Configura compilação/verificação TypeScript estrita sem emitir arquivos e inclui configuração, código de suporte e specs. |

## 5. Como o código se organiza

O fluxo geral de execução é:

1. O Playwright lê `playwright.config.ts` e descobre os projetos e testes.
2. Cada teste recebe uma `page` isolada; os specs que precisam de suporte compartilhado usam as fixtures em `src/fixtures/test.ts`.
3. O spec mobile usa a fixture `usersPage`, que fornece o page object de tabela em `src/pages/users.page.ts`.
4. As asserções Playwright verificam estados visíveis, valores e mensagens observáveis.
5. O reporter HTML e as opções de evidência guardam os resultados em `playwright-report/` e `test-results/`.

Essa divisão deixa os arquivos de teste focados na intenção do cenário; a fixture e o page object de tabela são usados pelo spec mobile que precisa dessas interações. Os dados de demonstração são declarados nos próprios specs.

## 6. Configuração e execução local

### Pré-requisitos

- Node.js 20 ou superior; a pipeline usa Node.js 22.
- npm e acesso à internet.
- Navegadores Playwright correspondentes aos projetos executados.

### Instalação

Na raiz do repositório:

```bash
npm.cmd ci
npx.cmd playwright install chromium firefox
```

### Comandos

```bash
npm.cmd test                 # suíte completa em todos os projetos
npm.cmd run test:chromium    # cenários desktop em Chromium
npm.cmd run test:firefox     # cenários desktop em Firefox
npm.cmd run test:mobile      # cenário mobile em Chromium emulado
npm.cmd run test:ui          # interface interativa do Playwright
npm.cmd run typecheck        # verificação TypeScript sem emissão de arquivos
npm.cmd run report           # abre o relatório HTML existente
```

No PowerShell do Windows, use os sufixos `.cmd` para evitar o bloqueio de execução do `npm.ps1` ou `npx.ps1`. Em outros terminais, os comandos podem ser escritos como `npm` e `npx`.

Para configurar outro ambiente compatível, ajuste `BASE_URL` no arquivo `.env` (criado localmente a partir de `.env.example`) ou defina a variável antes da execução. O arquivo `.env` não deve ser versionado.

## 7. Navegadores, resoluções e compatibilidade

| Projeto Playwright | Navegador | Resolução/perfil | Seleção de testes |
|---|---|---|---|
| `chromium` | Chromium desktop | 1280 × 720 | Todos os cenários desktop; exclui a especificação mobile. |
| `firefox` | Firefox desktop | 1280 × 720 | Todos os cenários desktop; exclui a especificação mobile. |
| `mobile-chromium` | Chromium com emulação Pixel 7 | 412 × 839 | Spec `Spec/Responsividade/`. |

Chromium cobre o navegador principal; Firefox fornece um segundo mecanismo de navegador. A cobertura mobile fica separada em Chromium emulado para limitar o número de combinações. A emulação não substitui aparelho físico.

## 8. Qualidade e decisões de automação

- Testes independentes e sem compartilhamento intencional de estado entre cenários.
- Títulos em português, com IDs do case e comportamento esperado.
- Asserções ligadas ao resultado funcional, não apenas à execução de cliques.
- Seletores prioritariamente por `data-testid`; seletores semânticos (`getByLabel`, `getByRole`) na validação de acessibilidade.
- Seletores da tabela identificam colunas e linhas por `data-testid` e roles acessíveis.
- Sincronização por expectativas auto-retry, como visibilidade, habilitação e quantidade de linhas; sem `waitForTimeout`.
- Dados de cadastro fictícios; a tabela pertence ao ambiente público e não é alterada pelos testes implementados.
- Asserções falham explicitamente quando o comportamento esperado não ocorre.
- Dois workers para equilibrar duração e carga no site externo.

## 9. Relatórios, screenshots e logs

- Reporter HTML: `playwright-report/`.
- Screenshots: `screenshot: 'on'` guarda uma captura ao fim de cada teste; `src/fixtures/capturar-etapa.ts` também grava imagens numeradas das principais etapas em `test-results/`.
- Trace e vídeo: desativados (`trace: 'off'`, `video: 'off'`).
- Log da pipeline: `playwright-test.log`, mostrado na saída do workflow e incluído no artefato.
- Retenção de artefatos GitHub Actions: 14 dias.
- `test-results/`, `playwright-report/` e o log são ignorados pelo Git para evitar versionar dados temporários ou pesados.

Na interface do GitHub, os artefatos podem ser baixados em **Actions > execução do workflow > Artifacts**.

## 10. Pipeline GitHub Actions

O workflow `.github/workflows/playwright.yml` roda em `push`, `pull_request` e `workflow_dispatch`.

### Passos automatizados

1. Checkout do repositório.
2. Configuração do Node.js 22 com cache npm baseado no lockfile.
3. Instalação reproduzível com `npm ci`.
4. Instalação de Chromium e Firefox, incluindo dependências do sistema operacional.
5. Execução da suíte, mantendo o código de falha do Playwright com `set -o pipefail`, enquanto `tee` salva e exibe o log.
6. Upload do relatório, screenshots e log. O upload usa `if: always()` para ocorrer também quando uma etapa anterior falha.

Em execução manual, os inputs permitem selecionar `all`, `chromium`, `firefox` ou `mobile-chromium` e filtrar os testes por ID ou texto do título. Em push e pull request, todos os projetos configurados são executados.

## 11. Validação

O comando `npx playwright test --list` descobre 12 specs e 23 combinações teste/projeto. `npm run typecheck` verifica a configuração, os arquivos de suporte e os specs em `Spec/`. A listagem confirma descoberta dos testes; não substitui a execução completa da suíte.

## 12. Limitações conhecidas

- A aplicação é pública e pode ficar indisponível ou mudar sem aviso.
- Dados da tabela não são controlados localmente pelo projeto.
- O teste mobile é uma emulação e cobre a busca, não todos os aspectos visuais e ações.
- O cenário A11Y-03 cobre um fluxo de cadastro por teclado; não é uma auditoria WCAG completa.
- A validação não substitui testes manuais de teclado, leitor de tela, contraste ou dispositivos reais.
- Cenários adiados podem ser adicionados conforme risco, estabilidade e prioridade.

## 13. Próximos passos recomendados

1. Executar a suíte completa e revisar relatório HTML e screenshots; investigar falhas externas separadamente de regressões.
2. Ampliar a cobertura com ordenação, validações negativas de formulário, espera e seleção de opções do dropdown assíncrono e rejeição de arquivos inválidos.
3. Considerar verificações de layout e ações adicionais em mobile.
4. Complementar o teste de teclado com análise de acessibilidade automatizada e revisão manual.

## 14. Links internos

- [README do projeto](../README.md)
- [Estratégia de testes](./estrategia-de-testes.md)
- [Matriz de cenários](./matriz-de-cenarios.md)
- [Matriz de riscos](./matriz-de-riscos.md)
- [Workflow do GitHub Actions](../.github/workflows/playwright.yml)
