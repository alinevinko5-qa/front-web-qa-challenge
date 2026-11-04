# Desafio de controle de qualidade da Web Front

## Descrição da solução

Projeto de automação end-to-end (E2E) para validar fluxos funcionais da aplicação web PlayLab. A suíte contém 10 testes independentes: nove cenários desktop executados em Chromium e Firefox e um cenário de busca mobile em Chromium emulado, totalizando 19 execuções nos projetos configurados.

## Aplicação utilizada

[PlayLab — Playwright Practice Arena](https://playwrightlab.github.io/), ambiente público de prática com formulários, tabelas, dropdowns assíncronos e outros componentes de interface.

## Escopo implementado

- Login com sucesso e cadastro válido (FRM-01), incluindo cadastro por teclado (A11Y-03).
- Tabela de usuários: navegação até a tabela, validação de cabeçalhos, busca positiva e negativa, filtro por função e paginação (USR-01 a USR-06).
- Pesquisa de usuário em viewport mobile Pixel 7, alinhada ao cenário USR-03 (RSP-02).
- Compatibilidade desktop em Chromium e Firefox; a cobertura mobile é executada em Chromium emulado.
- Relatório HTML e screenshots; a pipeline publica os resultados e o log de execução.

O racional de priorização está em [docs/estrategia-de-testes.md](docs/estrategia-de-testes.md), os riscos estão em [docs/matriz-de-riscos.md](docs/matriz-de-riscos.md) e os cenários estão listados em [docs/matriz-de-cenarios.md](docs/matriz-de-cenarios.md).
O relatório completo está disponível em [Markdown](docs/relatorio-completo-do-projeto.md).

## Stack utilizada

- Node.js e npm
- Playwright Test
- TypeScript
- GitHub Actions

## Pré-requisitos

- Node.js 20 ou superior (workflow CI usa Node 22).
- npm, incluído na instalação do Node.js.
- Acesso à internet para acessar o PlayLab e baixar os navegadores Playwright.

## Instalação

Na raiz do repositório, instale dependências e navegadores:

```bash
npm ci
npx playwright install chromium firefox
```

No PowerShell do Windows, use os executáveis `.cmd` para evitar o bloqueio de `npm.ps1`/`npx.ps1` pela política de execução:

```powershell
npm.cmd ci
npx.cmd playwright install chromium firefox
```

Opcionalmente, copie `.env.example` para `.env` e ajuste `BASE_URL` para apontar a suíte a outro ambiente compatível. O arquivo `.env` local é ignorado pelo Git.

## Instruções de execução

Execute todos os projetos configurados ou valide os tipos:

```bash
npm test
npm run typecheck
```

No PowerShell do Windows, execute os mesmos scripts usando `npm.cmd`:

```powershell
npm.cmd test
npm.cmd run typecheck
```

Para executar contra outro ambiente compatível sem arquivo `.env`, defina `BASE_URL` antes do comando. No PowerShell:

```powershell
$env:BASE_URL = "https://seu-ambiente.example"
npm.cmd test
```

Os demais comandos (`npm run test:chromium`, `npm run test:firefox`, `npm run test:mobile`, `npm run test:ui` e `npm run report`) também podem ser chamados como `npm.cmd run ...` no PowerShell. Em terminais macOS/Linux, use `npm` e `npx` sem o sufixo `.cmd`.

Não são necessários usuários, senhas ou segredos para os cenários implementados.

## Execução por navegador

Os projetos desktop podem ser executados separadamente:

```bash
npm run test:chromium
npm run test:firefox
```

## Execução mobile

A pesquisa de usuários roda em Chromium com emulação do perfil Pixel 7 (viewport 412 × 839), escolhida por representar uma tela estreita de smartphone:

```bash
npm run test:mobile
```

## Geração e abertura do relatório

O reporter HTML gera `playwright-report/` a cada execução. Para abrir o relatório mais recente:

```bash
npm run report
```

Screenshots são salvas ao final de cada teste e o cenário mobile também captura etapas relevantes em `test-results/`. A configuração atual não grava traces nem vídeos (`trace: 'off'`, `video: 'off'`). Localmente, os resultados ficam em `playwright-report/` e `test-results/`; essas pastas são ignoradas pelo Git. No GitHub Actions, o relatório HTML, resultados e o log da execução (`playwright-test.log`) são publicados como artefato por 14 dias, mesmo quando os testes falham. O log também aparece na saída da execução do workflow.

Os artefatos da pipeline podem ser baixados na página da execução correspondente em **Actions > execução do workflow > Artifacts**. Eles são temporários e não são versionados no repositório.

Na execução manual (**Actions > Playwright tests > Run workflow**), é possível selecionar `all`, `chromium`, `firefox` ou `mobile-chromium` e, opcionalmente, filtrar um teste pelo ID ou trecho do título (por exemplo, `USR-03`, `FRM-01` ou `A11Y-03`). Em pushes e pull requests, a suíte roda em todos os projetos configurados.

## Arquitetura do projeto

```text
.
├── .github/workflows/playwright.yml
├── .env.example
├── docs/
│   ├── estrategia-de-testes.md
│   ├── matriz-de-riscos.md
│   ├── matriz-de-cenarios.md
│   └── relatorio-completo-do-projeto.md
├── src/
│   ├── fixtures/
│   │   ├── capturar-etapa.ts
│   │   └── test.ts
│   └── pages/
│       └── users.page.ts
├── Spec/
│   ├── Acessibilidade/
│   ├── Formularios/
│   ├── Login/
│   ├── Responsividade/
│   └── User Management/
├── .gitignore
├── package.json
├── playwright.config.ts
└── tsconfig.json
```

`src/fixtures/` fornece a fixture tipada `usersPage` e o helper de captura de etapas; `src/pages/users.page.ts` encapsula as interações reutilizadas com a tabela. Os testes ficam organizados por jornada/categoria em `Spec/`. A configuração compartilhada de navegadores, URL, concorrência e relatório fica em `playwright.config.ts`.

## Estratégia de seletores

Para os controles da aplicação, os testes priorizam atributos `data-testid` fornecidos pelo PlayLab, sem depender de classes de estilo. Também utilizam seletores semânticos e roles quando apropriado. Não são usados XPath absolutos como estratégia principal.

## Estratégia de sincronização

As interações aguardam condições observáveis com as asserções auto-retry do Playwright, por exemplo, quantidade esperada de linhas e mensagens visíveis. Não há `waitForTimeout` como mecanismo de sincronização.

## Estratégia de dados de teste

Cada teste abre uma página e prepara seu próprio estado, sem depender de ordem de execução. Os cenários de formulário usam dados fictícios definidos nos próprios testes. A tabela usa registros apresentados pelo ambiente público; os testes filtram e validam resultados sem alterar seus dados.

O helper `src/fixtures/capturar-etapa.ts` registra screenshots numeradas dos passos relevantes dos cenários. As imagens, os relatórios e demais evidências de execução ficam em `test-results/` ou `playwright-report/` e não são versionados.

## Decisões técnicas

- Chromium é o navegador principal e Firefox acrescenta cobertura de compatibilidade desktop; os cenários desktop rodam em ambos.
- A resolução desktop de 1280 × 720 representa uma janela de trabalho comum; o perfil Pixel 7, em 412 × 839, cobre a disponibilidade da busca em uma tela estreita de smartphone. A execução mobile é separada e usa Chromium emulado para limitar a matriz de execução.
- A execução limita-se a dois workers para reduzir a carga sobre o site público.
- O workflow reutiliza o cache npm configurado em `actions/setup-node` e mantém até dois workers para equilibrar duração da pipeline e carga sobre a aplicação externa.
- Em CI, há uma nova tentativa em caso de falha; localmente, não há retry por padrão.
- Screenshots são salvas em todos os testes; traces e vídeos estão desativados na configuração atual.
- O cenário A11Y-03 exercita o preenchimento do formulário por teclado e confirma o cadastro. Não avalia navegação por leitor de tela, contraste ou conformidade WCAG completa.

## Limitações conhecidas

O PlayLab é uma aplicação pública externa, sem ambiente isolado ou garantia de disponibilidade. Alterações na página, rede ou serviços de terceiros podem causar falhas sem mudança no projeto. A suíte não controla dados do ambiente e cobre apenas parte dos componentes disponíveis. A emulação mobile não substitui aparelhos reais, e a validação de acessibilidade não verifica completamente leitor de tela, teclado, contraste ou conformidade WCAG.

## Uso de Inteligência Artificial

O Copilot foi usado como apoio para estruturar os testes, documentação e workflow. A ferramenta não substitui a análise, revisão ou responsabilidade pelas decisões desta entrega.

## Próximos passos

1. Acompanhar execuções da pipeline e revisar flakiness e mudanças no site.
2. Avaliar axe-core e triagem dos resultados de acessibilidade.
3. Ampliar cenários de teclado e complementar com avaliação manual usando tecnologia assistiva.
4. Considerar upload e outros componentes depois de avaliar risco e estabilidade.
5. Avaliar mais viewports ou aparelhos físicos para a cobertura mobile.

Não há `test-assets/` nesta versão porque nenhum cenário realiza upload de arquivos.
