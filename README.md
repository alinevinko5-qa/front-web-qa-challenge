# Front Web QA Challenge

## Descrição da solução

Projeto de automação end-to-end (E2E) para demonstrar análise de riscos e testes funcionais de uma aplicação web. A suíte contém seis testes independentes; um deles cobre cenários selecionados da tabela de usuários, sem reproduzir toda a jornada de referência. Relatório HTML e evidências apoiam o diagnóstico de falhas.

## Aplicação utilizada

[PlayLab — Playwright Practice Arena](https://playwrightlab.github.io/), ambiente público de prática com formulários, tabelas, dropdowns assíncronos e outros componentes de interface.

## Escopo implementado

- Seis testes automatizados independentes, dentro do intervalo exigido de 5 a 8.
- Tabela de usuários: carregamento, cabeçalhos, busca de usuário existente e inexistente e validação da situação apresentada.
- Formulário de cadastro: submissão válida (FRM-01), rejeição de e-mail inválido e mensagem de validação (FRM-03/06).
- Dropdown com carregamento e seleção assíncronos (DYN-01/02).
- Validação de acessibilidade FRM-07/A11Y-02: associação dos campos obrigatórios com labels e nome acessível do botão de cadastro.
- Pesquisa na tabela em viewport mobile Pixel 7 (RSP-02), além da cobertura desktop (RSP-01).
- Compatibilidade desktop em Chromium e Firefox; a cobertura mobile é executada em Chromium emulado.
- Relatório HTML, screenshots e evidências de falha; a pipeline publica também o log de execução.

O racional de priorização está em [docs/estrategia-de-testes.md](docs/estrategia-de-testes.md), os riscos estão em [docs/matriz-de-riscos.md](docs/matriz-de-riscos.md) e os cenários estão listados em [docs/matriz-de-cenarios.md](docs/matriz-de-cenarios.md).

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

Opcionalmente, copie `.env.example` para `.env` e ajuste `BASE_URL` para apontar a suíte a outro ambiente compatível. O arquivo `.env` local é ignorado pelo Git.

## Instruções de execução

Execute todos os projetos configurados ou valide os tipos:

```bash
npm test
npm run typecheck
```

Para executar contra outro ambiente compatível sem arquivo `.env`, defina `BASE_URL` antes do comando. No PowerShell:

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

A pesquisa de usuários roda em Chromium com emulação do perfil Pixel 7 (viewport 412 × 839), escolhida por representar uma tela estreita de smartphone:

```bash
npm run test:mobile
```

## Geração e abertura do relatório

O reporter HTML gera `playwright-report/` a cada execução. Para abrir o relatório mais recente:

```bash
npm run report
```

Screenshots são salvas ao final de cada teste e nas etapas significativas da jornada (por exemplo, antes e depois do envio do formulário), em `test-results/`, inclusive quando o teste passa. Em caso de falha, trace e vídeo também são retidos para diagnóstico. Localmente, os resultados ficam em `playwright-report/` e `test-results/`; essas pastas são ignoradas pelo Git. No GitHub Actions, o relatório HTML, screenshots, traces, vídeos e o log da execução (`playwright-test.log`) são publicados como artefato por 14 dias, mesmo quando os testes falham. O log também aparece na saída da execução do workflow.

Os artefatos da pipeline podem ser baixados na página da execução correspondente em **Actions > execução do workflow > Artifacts**. Eles são temporários e não são versionados no repositório, evitando adicionar screenshots, vídeos ou traces volumosos ao controle de versão.

Na execução manual (**Actions > Playwright tests > Run workflow**), é possível selecionar `all`, `chromium`, `firefox` ou `mobile-chromium` e, opcionalmente, filtrar um teste pelo ID ou trecho do título (por exemplo, `USR-01`, `FRM-03` ou `A11Y-02`). Em pushes e pull requests, a suíte roda em todos os projetos configurados.

## Arquitetura do projeto

```text
.
├── .github/workflows/playwright.yml
├── .env.example
├── docs/
│   ├── estrategia-de-testes.md
│   ├── matriz-de-riscos.md
│   └── matriz-de-cenarios.md
├── src/
│   ├── data/
│   ├── fixtures/       # fixtures e captura de evidências por etapa
│   └── pages/
├── tests/
│   ├── acessibilidade/
│   ├── dinamicos/
│   ├── formularios/
│   ├── responsividade/
│   └── usuarios/
├── package.json
├── playwright.config.ts
└── tsconfig.json
```

`src/fixtures/` fornece page objects tipados por teste e o helper de captura das etapas; `src/pages/` encapsula interações reutilizadas com tabela, cadastro e dropdown; e `src/data/` guarda dados fictícios do formulário. Os testes continuam organizados por jornada/categoria. Configuração compartilhada de navegadores, URL, concorrência, relatório e evidências fica em `playwright.config.ts`.

## Estratégia de seletores

Para os controles da aplicação, os testes priorizam atributos `data-testid` fornecidos pelo PlayLab, que identificam o propósito do elemento sem depender de sua posição visual ou de classes de estilo. Para ler nomes da tabela, a coluna é localizada pelo cabeçalho acessível `Name`; a seleção do primeiro item dinâmico filtra opções pelo valor não vazio. Nas verificações de acessibilidade são usados seletores semânticos, como `getByLabel` e `getByRole`, para confirmar nomes acessíveis. Não são usados XPath absoluto nem seletores posicionais fixos como estratégia principal.

## Estratégia de sincronização

As interações aguardam condições observáveis com as asserções auto-retry do Playwright, por exemplo, dropdown habilitado, quantidade esperada de linhas e mensagem visível. Não há `waitForTimeout` como mecanismo de sincronização.

## Estratégia de dados de teste

Cada teste abre uma página e prepara seu próprio estado, sem depender de ordem de execução ou compartilhar estado entre cenários. O formulário recebe dados fictícios e não persistentes. A tabela usa registros apresentados pelo ambiente público; os testes filtram e validam resultados observáveis em vez de alterar seus dados.

Os dados do formulário ficam em `src/data/registration.ts`; as interações são encapsuladas nos page objects de `src/pages/`.

## Decisões técnicas

- Chromium é o navegador principal e Firefox acrescenta cobertura de compatibilidade desktop; os cenários desktop rodam em ambos.
- A resolução desktop de 1280 × 720 representa uma janela de trabalho comum; o perfil Pixel 7, em 412 × 839, cobre a disponibilidade da busca em uma tela estreita de smartphone. A execução mobile é separada e usa Chromium emulado para limitar a matriz de execução.
- A execução limita-se a dois workers para reduzir a carga sobre o site público.
- O workflow reutiliza o cache npm configurado em `actions/setup-node` e mantém até dois workers para equilibrar duração da pipeline e carga sobre a aplicação externa.
- Em CI, há uma nova tentativa em caso de falha; localmente, não há retry por padrão.
- Screenshots são salvas em todos os testes; traces e vídeos são preservados em falhas para ajudar na investigação.
- A checagem FRM-07/A11Y-02 cobre associação de labels e nomes acessíveis básicos. Não valida navegação ou ordem de foco, hierarquia de títulos, armadilha de teclado em modal, leitor de tela, contraste ou conformidade WCAG completa. A11Y-06 (análise automatizada) não foi selecionado; se adotado futuramente, seus achados precisarão de triagem e complemento manual.

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

Não há `test-assets/` nesta versão porque nenhum cenário realiza upload de arquivos.
