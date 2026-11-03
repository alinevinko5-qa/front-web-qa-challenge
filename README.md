# Front Web QA Challenge

Suíte de automação E2E para o [PlayLab — Playwright Practice Arena](https://playwrightlab.github.io/), criada como entrega do case de Engenharia de Qualidade Front Web.

## Escopo

São sete cenários automatizados: dois da tabela de usuários, dois do formulário (sucesso e validação negativa), um dropdown assíncrono, uma validação de nomes acessíveis e uma jornada mobile. As decisões de risco estão em [docs/estrategia-de-testes.md](docs/estrategia-de-testes.md) e a cobertura detalhada em [docs/matriz-de-cenarios.md](docs/matriz-de-cenarios.md).

## Stack e pré-requisitos

- Node.js 20 ou superior (CI usa Node 22)
- npm
- Playwright Test, TypeScript e navegadores Playwright

## Instalação

```bash
npm ci
npx playwright install chromium firefox
```

## Execução

```bash
npm test                    # Chromium, Firefox e o teste mobile
npm run test:chromium       # Apenas Chromium desktop
npm run test:firefox        # Apenas Firefox desktop
npm run test:mobile         # Jornada mobile no Chromium (Pixel 7)
npm run typecheck           # Verificação estática TypeScript
npm run test:ui             # Interface interativa do Playwright
```

Para apontar a suíte para um ambiente compatível diferente, defina `BASE_URL` antes de executar os testes. Não são necessários usuários, senhas ou segredos.

## Relatório e evidências

O relatório HTML é gerado em `playwright-report/` e pode ser aberto com `npm run report`. Em falhas, Playwright conserva screenshots, trace e vídeo em `test-results/`. Esses diretórios são ignorados pelo Git; a pipeline publica ambos como artefato por 14 dias, inclusive quando os testes falham.

## Arquitetura

```text
tests/
├── accessibility/   # nomes acessíveis do formulário
├── dynamic/         # dropdown assíncrono
├── forms/           # sucesso e validação negativa
├── responsive/      # jornada mobile
└── users/           # tabela, filtro, ordenação e paginação
docs/                # estratégia e matriz de cenários
.github/workflows/   # execução no GitHub Actions
```

## Decisões técnicas

- Os testes usam os `data-testid` disponibilizados pelo PlayLab para controles e dados da tabela; a checagem de acessibilidade usa `getByLabel` e `getByRole`.
- Esperas são baseadas em estados observáveis e asserções Playwright, não em atrasos fixos.
- Cada teste abre uma página nova e usa apenas dados fictícios; não há estado compartilhado.
- Chromium e Firefox cobrem desktop; o cenário mobile usa o perfil Pixel 7 em um projeto separado para evitar duplicar a suíte inteira.
- O limite de dois workers reduz a pressão sobre a aplicação pública.
- A validação de acessibilidade cobre associação de labels e nomes acessíveis básicos, mas não equivale a uma auditoria WCAG.

## Pipeline

O workflow `.github/workflows/playwright.yml` executa em push, pull request e manualmente. Ele instala Node e navegadores, roda a suíte e publica relatório/evidências como artefato.

## Limitações e próximos passos

O alvo é um site externo; indisponibilidade ou alterações não relacionadas ao código podem falhar a suíte. O case não automatiza upload, APIs externas, fluxos de compra, auditoria axe-core, leitor de tela ou validação visual. Como próximos passos, recomenda-se avaliar axe-core, ampliar teclado/mobile e revisar estabilidade após observar execuções contínuas.

## Uso de Inteligência Artificial

O Copilot foi utilizado como apoio para estruturar os testes, documentação e pipeline. Os seletores, cenários e asserções foram revisados contra a aplicação-alvo, e a suíte/typecheck foram executados localmente. A ferramenta não substitui a análise, revisão ou responsabilidade pelas decisões desta entrega.
