# Front Web QA Challenge

## Descrição da solução

Projeto de automação end-to-end (E2E) para demonstrar análise de riscos e testes funcionais de uma aplicação web. A suíte contém sete cenários independentes, com relatório HTML e evidências para diagnóstico de falhas.

## Aplicação utilizada

[PlayLab — Playwright Practice Arena](https://playwrightlab.github.io/), ambiente público de prática com formulários, tabelas, dropdowns assíncronos e outros componentes de interface.

## Escopo implementado

- Tabela de usuários: carregamento, cabeçalhos, busca, ordenação e paginação.
- Formulário de cadastro: submissão válida e rejeição de e-mail inválido.
- Dropdown com carregamento assíncrono.
- Nomes acessíveis dos campos obrigatórios e do botão de cadastro.
- Busca na tabela em viewport mobile Pixel 7.
- Execução desktop em Chromium e Firefox.

O racional de priorização está em [docs/estrategia-de-testes.md](docs/estrategia-de-testes.md), e os cenários estão listados em [docs/matriz-de-cenarios.md](docs/matriz-de-cenarios.md).

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

## Instruções de execução

Execute todos os projetos configurados ou valide os tipos:

```bash
npm test
npm run typecheck
```

Para executar contra outro ambiente compatível, defina `BASE_URL` antes do comando. No PowerShell:

```powershell
$env:BASE_URL = "https://seu-ambiente.example"
npm.cmd test
```

Não são necessários usuários, senhas ou segredos para os cenários implementados.

## Execução por navegador

Os projetos desktop podem ser executados separadamente:

```bash
npm run test:chromium
npm run test:firefox
```

## Execução mobile

A jornada mobile roda em Chromium com emulação do perfil Pixel 7 (viewport 412 × 839):

```bash
npm run test:mobile
```

## Geração e abertura do relatório

O reporter HTML gera `playwright-report/` a cada execução. Para abrir o relatório mais recente:

```bash
npm run report
```

Em caso de falha, screenshots, traces e vídeos são retidos em `test-results/`. Esses diretórios estão no `.gitignore`. No GitHub Actions, relatório e evidências são publicados como artefato por 14 dias, inclusive em execução com falhas.

## Arquitetura do projeto

```text
.
├── .github/workflows/playwright.yml
├── docs/
│   ├── estrategia-de-testes.md
│   └── matriz-de-cenarios.md
├── tests/
│   ├── accessibility/
│   ├── dynamic/
│   ├── forms/
│   ├── responsive/
│   └── users/
├── package.json
├── playwright.config.ts
└── tsconfig.json
```

Os testes estão organizados por jornada/categoria; configuração compartilhada de navegadores, URL, concorrência, relatório e evidências fica em `playwright.config.ts`.

## Estratégia de seletores

Para os controles da aplicação, os testes priorizam atributos `data-testid` fornecidos pelo PlayLab, que identificam o propósito do elemento sem depender de sua posição visual ou de classes de estilo. Nas verificações de acessibilidade são usados seletores semânticos, como `getByLabel` e `getByRole`, para confirmar nomes acessíveis. Não são usados XPath absoluto nem seletores posicionais como estratégia principal.

## Estratégia de sincronização

As interações aguardam condições observáveis com as asserções auto-retry do Playwright, por exemplo, dropdown habilitado, quantidade esperada de linhas e mensagem visível. Não há `waitForTimeout` como mecanismo de sincronização.

## Estratégia de dados de teste

Cada teste abre uma página e prepara seu próprio estado, sem depender de ordem de execução ou compartilhar estado entre cenários. O formulário recebe dados fictícios e não persistentes. A tabela usa registros apresentados pelo ambiente público; os testes filtram e validam resultados observáveis em vez de alterar seus dados.

## Decisões técnicas

- Chromium e Firefox cobrem todos os cenários desktop; o único cenário mobile roda em projeto Chromium separado para não repetir a cobertura mobile em todos os projetos.
- A resolução desktop é 1280 × 720; o perfil Pixel 7 usa viewport 412 × 839.
- A execução limita-se a dois workers para reduzir a carga sobre o site público.
- Em CI, há uma nova tentativa em caso de falha; localmente, não há retry por padrão.
- Screenshot, trace e vídeo são preservados em falhas para ajudar na investigação.
- A checagem de acessibilidade cobre nomes acessíveis básicos; ela não é apresentada como uma auditoria WCAG completa.

## Limitações conhecidas

O PlayLab é uma aplicação pública externa, sem ambiente isolado ou garantia de disponibilidade. Alterações na página, rede ou serviços de terceiros podem causar falhas sem mudança no projeto. A suíte não controla dados do ambiente e cobre apenas parte dos componentes disponíveis. A emulação mobile não substitui aparelhos reais, e a validação de acessibilidade não verifica completamente leitor de tela, teclado, contraste ou conformidade WCAG.

## Uso de Inteligência Artificial

O Copilot foi usado como apoio para estruturar os testes, documentação e workflow. Os cenários, seletores e asserções foram revisados contra a aplicação-alvo; a suíte e a verificação TypeScript foram executadas localmente. A ferramenta não substitui a análise, revisão ou responsabilidade pelas decisões desta entrega.

## Próximos passos

1. Acompanhar execuções da pipeline e revisar flakiness e mudanças no site.
2. Avaliar axe-core e triagem dos resultados de acessibilidade.
3. Ampliar cenários de teclado e complementar com avaliação manual usando tecnologia assistiva.
4. Considerar upload e outros componentes depois de avaliar risco e estabilidade.
5. Avaliar mais viewports ou aparelhos físicos para a cobertura mobile.
