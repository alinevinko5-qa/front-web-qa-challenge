# Estratégia de testes

## Objetivo

Validar fluxos funcionais da aplicação pública [PlayLab — Playwright Practice Arena](https://playwrightlab.github.io/) com testes end-to-end em Playwright e TypeScript. A suíte cobre login, cadastro, gerenciamento de usuários, teclado, componentes dinâmicos, upload e uma busca em viewport mobile.

## Escopo

O escopo atual contém 12 testes independentes:

- **Login:** autenticação de demonstração e mensagem de boas-vindas.
- **Formulário:** cadastro válido por preenchimento de campos (FRM-01) e por navegação com teclado (A11Y-03).
- **Usuários:** navegação até a tabela (USR-01), validação de estrutura/cabeçalhos (USR-02), busca positiva (USR-03), busca sem resultados (USR-04), filtro por função (USR-05) e paginação (USR-06).
- **Responsividade:** busca de Alice em Chromium emulado como Pixel 7 (RSP-02/USR-03).
- **Componentes dinâmicos:** aguardar a mensagem de conteúdo após configurar um atraso (DYN-02). O teste não seleciona uma opção carregada dinamicamente, embora o nome do arquivo sugira esse comportamento.
- **Upload:** enviar `fixtures/teste.txt` e validar o sucesso do upload (UP-01).
- **Compatibilidade:** 11 testes desktop em Chromium e Firefox e o teste mobile em Chromium emulado; 23 execuções no total.
- **Relatórios:** reporter HTML e screenshots; o workflow também publica o log da execução.

## Entregáveis obrigatórios (requisito 9.1)

| Entregável | Cobertura nesta solução |
|---|---|
| Testes automatizados | Doze testes independentes em doze arquivos de especificação. |
| Jornada da tabela de usuários | Testes separados cobrem navegação, cabeçalhos, busca positiva e negativa, filtro por função e paginação (USR-01 a USR-06). |
| Cenário de formulário | Cadastro válido (FRM-01) e cadastro preenchido por teclado (A11Y-03). |
| Login | Login de demonstração com validação da mensagem de boas-vindas. |
| Acessibilidade/teclado | Preenchimento do formulário via teclado e envio com Enter (A11Y-03); não é auditoria WCAG. |
| Execução mobile | Busca por Alice em Chromium emulado como Pixel 7, viewport 412 × 839 (RSP-02/USR-03). |
| Componentes dinâmicos | Aguardar a exibição de conteúdo após configurar um atraso (DYN-02); seleção de uma opção carregada dinamicamente ainda não coberta. |
| Upload | Envio de arquivo de texto de teste e validação da mensagem de sucesso (UP-01). |
| Mais de um navegador | Chromium e Firefox para os cenários desktop; projeto mobile separado em Chromium emulado. |
| Relatório e evidências | Reporter HTML, screenshot ao final de cada teste e log da suíte; traces e vídeos estão desativados. Artefatos da pipeline ficam disponíveis por 14 dias. |

## Principais jornadas identificadas

1. **Gerenciamento de usuários:** navegar até a tabela, conferir cabeçalhos, pesquisar resultados existentes e inexistentes, filtrar por função e navegar entre páginas. Ordenação e edição não são cobertas.
2. **Cadastro e login:** preencher e enviar o formulário com dados de demonstração; há também um fluxo de cadastro usando teclado e Enter. A suíte não cobre validação de e-mail inválido.
3. **Uso mobile:** repetir a busca de Alice em viewport Pixel 7 e confirmar a linha e o e-mail esperados.
4. **Componentes dinâmicos e upload:** aguardar a exibição de conteúdo após um atraso e enviar o arquivo `fixtures/teste.txt`, validando o sucesso.

A suíte distribui os cenários da tabela em testes independentes. USR-05 filtra por função e USR-06 valida a navegação de páginas; ordenação e edição ainda não estão cobertas. Os fluxos de login, cadastro e responsividade também são testes separados.

## Riscos identificados

- **Funcionais:** tabela ausente ou incorreta; busca, filtro ou paginação inconsistentes; login ou cadastro válido que não concluem.
- **Técnicos:** PlayLab é uma dependência externa; indisponibilidade, rede, serviços de terceiros ou alterações no DOM podem causar falhas sem regressão no projeto. Seletores e sincronização precisam tolerar estados assíncronos.
- **Experiência do usuário:** busca e tabela podem ficar indisponíveis ou difíceis de usar em telas estreitas. A suíte verifica a disponibilidade básica da busca em mobile, não toda a experiência responsiva.
- **Acessibilidade:** campos sem nomes acessíveis dificultam sua identificação por tecnologias assistivas. A validação atual não detecta completamente barreiras de teclado, contraste, leitor de tela ou conformidade WCAG.

O cenário **A11Y-03** preenche e envia o formulário usando teclado, incluindo Enter no botão de cadastro. A suíte não verifica ordem de foco em toda a página, leitores de tela, contraste ou conformidade WCAG completa.

## Estratégia e matriz de priorização

| Jornada | Cenário | Risco protegido | Impacto | Prioridade | Automatizar? | Justificativa |
|---|---|---|---|---|---|---|
| Login | Login de demonstração com confirmação de boas-vindas | Login não conclui ou não apresenta confirmação | Alto | P0 | Sim | Valida o fluxo de sucesso da aplicação. |
| Cadastro | FRM-01: enviar dados válidos | Cadastro válido não é concluído | Alto | P0 | Sim | Valida o caminho de sucesso. |
| Cadastro/teclado | A11Y-03: preencher o cadastro com teclado e enviar com Enter | Cadastro fica inacessível a quem navega com teclado | Médio | P1 | Sim | Verifica um fluxo de teclado, sem constituir auditoria WCAG. |
| Usuários | USR-01/02: navegar até a tabela e conferir seus cabeçalhos | Tabela ou estrutura principal indisponível | Alto | P0 | Sim | Confirma acesso e estrutura básica da tabela. |
| Usuários | USR-03/04: pesquisar usuário existente e inexistente | Resultados da pesquisa incorretos | Alto | P0 | Sim | Verifica resultados positivos e ausência de resultados. |
| Usuários | USR-05: filtrar pela função Viewer | Filtro por função incorreto | Médio | P1 | Sim | Confirma que o filtro apresenta a função selecionada. |
| Usuários | USR-06: navegar entre páginas | Paginação não atualiza a página ativa | Médio | P1 | Sim | Valida alternância entre páginas e retorno à primeira. |
| Usuários em mobile | RSP-02/USR-03: pesquisar Alice no Pixel 7 emulado | Busca indisponível em viewport estreita | Médio | P1 | Sim | Confirma busca, linha e e-mail em viewport mobile. |
| Componentes dinâmicos | DYN-02: aguardar a exibição de conteúdo após configurar um atraso | Conteúdo não aparece após o carregamento | Médio | P2 | Sim | Aguarda a mensagem observável do componente; não seleciona opção dinâmica. |
| Upload | UP-01: enviar `fixtures/teste.txt` | Upload de arquivo válido não conclui | Médio | P2 | Sim | Valida o envio do arquivo e a mensagem de sucesso. |
| Aplicação externa | Disponibilidade do PlayLab e serviços de terceiros | Falhas externas interrompem a execução sem regressão no projeto | Médio | P1 | Parcial | A disponibilidade do site não é controlável pela suíte. |
| Cenários futuros | Ordenação, edição, DYN-01, seleção de opção dinâmica, validação negativa de formulário, upload inválido, demais aspectos mobile e acessibilidade | Regressões em funcionalidades ainda não cobertas | Médio | P2 | Não | Podem ser priorizados em uma etapa posterior. |

O impacto descreve a consequência para o usuário. As prioridades são qualitativas: **P0** protege fluxos centrais; **P1** cobre interações importantes e riscos transversais; **P2** representa funcionalidades complementares cujo custo não se justifica na primeira versão. A decisão considera também frequência de uso, possibilidade de regressão, estabilidade e custo de manutenção.

## Fora de escopo e decisões

Ainda não estão cobertos pela suíte:

- USR-07/08 — validação do status e ação na tabela; a ordenação também não está coberta;
- FRM-02/03/04/05/06/08 — submissão vazia, e-mail inválido, limites e reset;
- DYN-01 — aguardar o carregamento de um dropdown assíncrono e DYN-02 — selecionar uma opção realmente carregada dinamicamente; o spec DYN-02 atual aguarda conteúdo após um atraso, sem selecionar uma opção dinâmica;
- RSP-03/04/05 — sobreposição, scroll horizontal e acesso a todas as ações em mobile;
- A11Y-01/02/04/05/06/07 — validações ampliadas de acessibilidade, como labels e análise automatizada;
- rejeição de arquivos inválidos, drag-and-drop, iframes, fluxos de compra e testes de API, carga, stress ou segurança.

Esses cenários poderão ser reavaliados conforme risco, estabilidade e custo de manutenção.

## Estratégia de automação

- Cada teste prepara seu próprio estado e não depende da ordem de execução.
- A fixture `usersPage` em `src/fixtures/test.ts` fornece o page object `UsersPage`, definido em `src/pages/users.page.ts`; os dados de demonstração ficam nos próprios specs.
- São usados `data-testid` fornecidos pela aplicação e, para acessibilidade, seletores por label e role.
- A sincronização aguarda estados observáveis, como contagem de linhas e visibilidade de mensagens; não há esperas fixas.
- ESLint com regras recomendadas para TypeScript verifica os arquivos `.ts` com `npm run lint`.
- O formulário utiliza dados fictícios. Não são necessários usuários, senhas ou segredos.
- O cenário UP-01 envia `fixtures/teste.txt`; outras classes e extensões de arquivo ainda não são verificadas.
- A execução é limitada a dois workers para reduzir a carga sobre o site público.
- Uma screenshot é salva ao final de cada teste; o spec mobile também registra capturas de etapas. Trace e vídeo estão desativados. O relatório HTML é gerado a cada execução. O workflow registra a saída da suíte em `playwright-test.log` e publica os resultados como artefato por 14 dias.

## Qualidade da automação (requisitos 7.2)

| Requisito | Como é atendido |
|---|---|
| Testes independentes e sem dependência de ordem | Cada teste usa seu próprio contexto `page`; o formulário abre a aplicação em `beforeEach`, e nenhum cenário depende de alterações feitas por outro teste. |
| Nomes claros e asserções relevantes | Os títulos descrevem o comportamento, incluem os IDs do case e estão em português. As asserções verificam visibilidade, cabeçalhos, linhas, dados, mensagens de validação, seleção e estado acessível. |
| Seletores sustentáveis e baixo acoplamento | São priorizados `data-testid` estáveis fornecidos pelo PlayLab e seletores semânticos para acessibilidade. A leitura de células resolve a coluna pelo cabeçalho, em vez de assumir uma coluna fixa. |
| Sincronização por estado ou evento | As expectativas auto-retry do Playwright aguardam condições observáveis; não se usa `waitForTimeout`. |
| Separação de responsabilidades e reutilização | A fixture `usersPage` disponibiliza o page object da tabela; os specs descrevem os fluxos de teste. |
| Configuração centralizada | `playwright.config.ts` define URL, projetos, resoluções, workers, retries, relatório e evidências. |
| Dados de teste controlados | O cadastro usa dados fictícios; os registros da tabela vêm do PlayLab público e não são alterados pela suíte. |
| Tratamento de falhas | As asserções do Playwright falham explicitamente quando o comportamento esperado não ocorre. Screenshots apoiam o diagnóstico. |
| Execução local e em pipeline | Scripts npm permitem execução local por suíte, navegador ou dispositivo. O GitHub Actions instala dependências e navegadores, executa a suíte e publica relatório e evidências. A execução manual permite selecionar projeto e filtrar os testes por ID ou texto do título. |

Não há XPath absoluto nem esperas fixas. A busca mobile confirma que há exatamente um resultado antes de validar os dados da linha.

## Navegadores e resoluções

| Projeto Playwright | Navegador | Resolução / perfil | Cobertura |
|---|---|---|---|
| `chromium` | Chromium desktop | 1280 × 720 | Cenários desktop, incluindo a tabela de usuários |
| `firefox` | Firefox desktop | 1280 × 720 | Cenários desktop, incluindo a tabela de usuários |
| `mobile-chromium` | Chromium emulado | Pixel 7, viewport 412 × 839 | Busca na tabela de usuários |

Chromium é a cobertura principal e Firefox fornece compatibilidade com um segundo navegador suportado pelo Playwright. Os cenários desktop rodam nos dois navegadores; a cobertura mobile fica restrita ao Chromium emulado para evitar duplicar a matriz e manter a execução focada. A resolução desktop de 1280 × 720 representa uma janela de trabalho comum; o Pixel 7, em 412 × 839, representa uma tela estreita de smartphone para verificar a disponibilidade da busca. A emulação não substitui testes em dispositivos físicos. A suíte ainda não verifica sistematicamente sobreposição, scroll horizontal ou todas as ações em mobile.

## Pipeline (requisito 7.4)

O workflow `.github/workflows/playwright.yml` é acionado em `push`, `pull_request` e manualmente por `workflow_dispatch`. Ele faz checkout, configura Node.js 22, instala dependências com `npm ci`, instala Chromium e Firefox, executa os testes e publica relatório e evidências.

- **Execução manual:** na aba Actions, `Run workflow` permite escolher `all`, `chromium`, `firefox` ou `mobile-chromium`; o campo opcional aceita um ID ou trecho do título (por exemplo, `USR-03` ou `FRM-01`) para selecionar grupo/cenário. Pushes e pull requests executam todos os projetos.
- **Cache:** `actions/setup-node` utiliza o cache npm com base no lockfile.
- **Paralelismo:** Playwright usa até dois workers para reduzir o tempo sem sobrecarregar o PlayLab externo.
- **Falhas e evidências:** o log da suíte é salvo em `playwright-test.log`; o passo de upload usa `if: always()` e preserva relatório HTML, screenshots e resultados disponíveis, inclusive após falhas. Trace e vídeo estão desativados na configuração atual.
- **Retenção:** os artefatos ficam disponíveis para download na página da execução por 14 dias. Relatórios, screenshots e logs não são versionados no repositório.

## Critérios de entrada e saída

**Entrada**

- Dependências Node/npm instaladas.
- Navegadores Playwright correspondentes aos projetos instalados.
- Aplicação PlayLab acessível.

**Saída**

- A suíte contém 12 testes e 23 combinações teste/projeto (11 testes desktop em Chromium e Firefox; um teste mobile em Chromium).
- Há uma screenshot por teste em `test-results/`; o spec mobile também salva capturas de etapas.
- O workflow publica relatório, screenshots, resultados e `playwright-test.log` como artefato para download por 14 dias; esses arquivos não são versionados no repositório.
- A verificação TypeScript (`npm run typecheck`) conclui sem erros.

## Limitações conhecidas

PlayLab é um site público externo, sem ambiente isolado ou garantia de disponibilidade. Alterações na aplicação, rede ou serviços de terceiros podem causar falhas sem mudança nesta suíte. Os testes não controlam os dados do site nem substituem validação manual. O teste de teclado cobre o fluxo de cadastro, mas não comprova conformidade WCAG, comportamento com leitor de tela ou contraste.

## Frequência recomendada

Executar a suíte em pull requests e pushes pela pipeline. Durante investigação, executar apenas o projeto ou cenário relevante; após mudanças na aplicação-alvo ou nos seletores, executar a cobertura multi-browser e mobile completa. Como o alvo é externo, interpretar falhas considerando também sua disponibilidade.

## Próximos passos

1. Acompanhar execuções da pipeline e revisar flakiness ou alterações de seletores.
2. Adicionar axe-core e triagem explícita dos achados de acessibilidade.
3. Ampliar navegação por teclado e complementar com validação manual usando tecnologia assistiva.
4. Ampliar DYN-02 para selecionar uma opção carregada dinamicamente, adicionar DYN-01 e validar a rejeição de arquivos não suportados no fluxo de upload.
5. Avaliar execução mobile em outros tamanhos e em dispositivos reais, se disponíveis.
