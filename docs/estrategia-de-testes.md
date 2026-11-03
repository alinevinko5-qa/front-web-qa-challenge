# Estratégia de testes

## Objetivo

Validar fluxos essenciais da aplicação pública [PlayLab — Playwright Practice Arena](https://playwrightlab.github.io/) com testes end-to-end em Playwright e TypeScript. A estratégia prioriza a tabela de usuários, validações de formulário e interações representativas, considerando riscos funcionais, técnicos, de experiência e de acessibilidade.

## Escopo

O escopo inicial contém seis testes automatizados independentes, cobrindo:

- **Usuários:** USR-01/02/03/04/07 — carregar e validar a tabela, pesquisar usuário existente e inexistente e conferir a situação apresentada.
- **Formulário:** FRM-01 e FRM-03/06 — enviar dados válidos; rejeitar e-mail inválido e validar a mensagem de erro.
- **Componente assíncrono:** DYN-01/02 — aguardar opções do dropdown e selecionar uma opção carregada.
- **Acessibilidade:** FRM-07/A11Y-02 — verificar associação entre labels e campos obrigatórios e o nome acessível do botão.
- **Responsividade e compatibilidade:** RSP-01/02 — validar a busca em desktop (1280 × 720, Chromium e Firefox) e mobile (Pixel 7 emulado, 412 × 839, Chromium).
- **Relatório e evidências:** relatório HTML, screenshots e evidências de falha; a pipeline anexa também o log.

São seis testes lógicos executados em 11 combinações de teste/projeto: cinco testes desktop em Chromium e Firefox e a busca mobile em Chromium emulado como Pixel 7. A pipeline publica relatório HTML e evidências da execução.

## Entregáveis obrigatórios (requisito 9.1)

| Entregável | Cobertura nesta solução |
|---|---|
| Entre 5 e 8 testes automatizados | Seis testes lógicos independentes, distribuídos em cinco arquivos de especificação. |
| Jornada principal da tabela de usuários | Um teste cobre carregamento, cabeçalhos, busca positiva e negativa e situação do usuário (USR-01/02/03/04/07). |
| Cenário de formulário | Cadastro com dados válidos (FRM-01); também há cenário negativo para e-mail inválido e validação da mensagem (FRM-03/06). |
| Cenário dinâmico ou assíncrono | Carregamento e seleção de opção do dropdown (DYN-01/02). |
| Validação de acessibilidade | Associação de labels aos campos obrigatórios e nome acessível do botão (FRM-07/A11Y-02). |
| Execução mobile | Busca da tabela em Chromium emulado como Pixel 7, viewport 412 × 839 (RSP-02). |
| Mais de um navegador | Chromium e Firefox para os cenários desktop; projeto mobile separado em Chromium emulado. |
| Relatório e evidências | Reporter HTML, screenshot ao final de cada teste, trace/vídeo em falhas e log da suíte; artefatos da pipeline ficam disponíveis por 14 dias. |

## Principais jornadas identificadas

1. **Gerenciamento de usuários:** acessar a aplicação, localizar e validar a tabela, pesquisar um usuário, ordenar e paginar os registros, executar a edição e conferir a atualização.
2. **Cadastro:** preencher o formulário com dados fictícios, submeter dados válidos, verificar a rejeição e a mensagem para e-mail inválido e validar a associação de labels dos campos obrigatórios.
3. **Seleção dinâmica:** solicitar opções do dropdown, aguardar seu carregamento e selecionar uma opção (DYN-01/02). Mudança de colunas, recarga, dados variáveis, múltiplos cliques, estado de carregamento e opção indisponível (DYN-03/04/05/06/07/08) ficam fora da cobertura inicial.
4. **Uso acessível e mobile:** identificar campos por nomes acessíveis e validar a busca da tabela em desktop e em uma viewport mobile.

A jornada de usuários é representada por cenários selecionados em um teste independente, sem implementar todos os passos da referência. Foram priorizados o carregamento e a estrutura da tabela, a busca positiva e negativa e a situação apresentada, por cobrirem a disponibilidade e a localização correta dos registros sem depender de alteração de dados. Ordenação, paginação e ação na tabela (USR-05/06/08) ficam para uma próxima etapa; são relevantes, mas não são necessárias para demonstrar a cobertura inicial e aumentariam o encadeamento de estado no ambiente público. As jornadas de formulário, dropdown, acessibilidade e mobile continuam em testes independentes.

## Riscos identificados

- **Funcionais:** tabela ausente ou incorreta; busca, ordenação e paginação inconsistentes; edição sem atualização; formulário que aceita e-mail inválido ou não conclui cadastro válido; opções assíncronas que não ficam selecionáveis.
- **Técnicos:** PlayLab é uma dependência externa; indisponibilidade, rede, serviços de terceiros ou alterações no DOM podem causar falhas sem regressão no projeto. Seletores e sincronização precisam tolerar estados assíncronos.
- **Experiência do usuário:** busca e tabela podem ficar indisponíveis ou difíceis de usar em telas estreitas. A suíte verifica a disponibilidade básica da busca em mobile, não toda a experiência responsiva.
- **Acessibilidade:** campos sem nomes acessíveis dificultam sua identificação por tecnologias assistivas. A validação atual não detecta completamente barreiras de teclado, contraste, leitor de tela ou conformidade WCAG.

O cenário **FRM-07/A11Y-02** foi selecionado para atender à validação de acessibilidade do case: verifica labels dos campos obrigatórios e o nome acessível do botão. A11Y-01 (nomes dos demais controles), A11Y-03/04 (teclado e ordem de foco), A11Y-05 (hierarquia de títulos), A11Y-06 (análise automatizada) e A11Y-07 (armadilha de foco em modal) não foram selecionados nesta etapa. A verificação atual é básica e não equivale a uma auditoria WCAG; uma análise automatizada também exigiria triagem dos achados e validação manual complementar.

## Estratégia e matriz de priorização

| Jornada | Cenário | Risco protegido | Impacto | Prioridade | Automatizar? | Justificativa |
|---|---|---|---|---|---|---|
| Usuários | USR-01/02/03/04/07: carregar tabela, validar cabeçalhos, pesquisar usuário existente e inexistente e conferir a situação | Tabela, busca ou situação incorretas | Alto | P0 | Sim | Protege os dados centrais da tabela e os resultados da pesquisa com um fluxo objetivo e sem alterar registros. |
| Usuários | USR-05/06/08: ordenar, paginar e executar uma ação na tabela | Ordenação, paginação ou ação incorretas | Médio | P1 | Não | Cenários relevantes, mas adiados para manter a cobertura inicial focada e evitar acoplamento entre interações e estado do ambiente público. |
| Cadastro | FRM-01: enviar dados válidos | Cadastro válido não é concluído | Alto | P0 | Sim | Valida o caminho de sucesso usando dados fictícios controlados. |
| Cadastro | FRM-03/06: informar e-mail inválido e validar a mensagem de erro | Entrada inválida é aceita ou não recebe feedback | Alto | P0 | Sim | Verifica a mensagem de validação e a ausência de confirmação de sucesso no mesmo cenário negativo. |
| Dropdown | DYN-01/02: aguardar o carregamento e selecionar opção disponível | Opções não carregam ou não podem ser selecionadas | Médio | P1 | Sim | Aguarda o dropdown habilitar e apresentar opções antes da seleção, sem espera fixa. |
| Cadastro | FRM-07/A11Y-02: validar associação entre labels e campos e nomes acessíveis | Campos essenciais não podem ser identificados por nome acessível | Médio | P1 | Sim | Verifica campos por label e botão por role/nome acessível. |
| Usuários em mobile | RSP-02: pesquisar usuário no viewport Pixel 7 | Busca da jornada principal não fica disponível em viewport estreita | Médio | P1 | Sim | Cobre uma resolução mobile representativa com resultado verificável. |
| Usuários em desktop | RSP-01: validar tabela e pesquisar usuário em 1280 × 720 | Jornada principal indisponível na resolução desktop definida | Médio | P1 | Sim | A jornada desktop da tabela já é executada em Chromium e Firefox nessa resolução. |
| Usuários em mobile | RSP-03/04/05: sobreposição, scroll horizontal e acesso às principais ações | Conteúdo ou ações podem ficar inacessíveis em tela reduzida | Médio | P1 | Não | A cobertura inicial verifica a busca; inspeções de layout e todas as ações mobile ficam para uma etapa posterior. |
| Cadastro | FRM-02/04/05/08: formulário vazio, limites, reset e teclado | Validações complementares ou operação por teclado podem falhar | Médio | P1 | Não | O recorte cobre sucesso, e-mail inválido com mensagem e labels; os demais cenários ficam adiados para uma cobertura funcional específica. |
| Componentes dinâmicos | DYN-03/04/05/06/07/08: validar mudança de colunas, recarga, dados variáveis, múltiplos cliques, estado de carregamento ou opção indisponível | Estados dinâmicos ou condições de exceção podem apresentar comportamento incorreto | Médio | P2 | Não | A cobertura inicial prioriza carregar e selecionar uma opção do dropdown; os demais cenários são complementares e ficam para uma etapa posterior. |
| Upload | UPL-01/02: aceitar arquivo permitido e rejeitar extensão não permitida | Regras de extensão ou apresentação do arquivo podem falhar | Baixo | P2 | Não | Upload é opcional no case e não participa das jornadas prioritárias escolhidas. |
| Aplicação externa | Disponibilidade do PlayLab e serviços de terceiros | Falhas externas podem interromper a execução sem regressão no projeto | Médio | P1 | Parcial | A suíte limita concorrência e retém evidências, mas a disponibilidade do site não é controlável pelo projeto. |
| Acessibilidade | A11Y-01/03/04/05/06/07: demais controles, teclado e foco, títulos, análise automatizada e modal | Barreiras além das labels dos campos podem passar despercebidas | Médio | P1 | Não | O recorte já verifica labels e nome acessível do botão; os demais cenários exigem validações específicas, e a análise automatizada precisaria de triagem e complemento manual. |

O impacto descreve a consequência para o usuário. As prioridades são qualitativas: **P0** protege fluxos centrais; **P1** cobre interações importantes e riscos transversais; **P2** representa funcionalidades complementares cujo custo não se justifica na primeira versão. A decisão considera também frequência de uso, possibilidade de regressão, estabilidade e custo de manutenção.

## Fora de escopo e decisões

Não foram selecionados para a automação inicial:

- USR-05/06/08 — ordenação, paginação e ação na tabela;
- FRM-02/04/05/08 — submissão vazia, limite de caracteres, reset e operação por teclado;
- DYN-03/04/05/06/07/08 — variações de tabela e demais estados dinâmicos;
- RSP-03/04/05 — sobreposição, scroll horizontal e acesso a todas as ações em mobile;
- A11Y-01/03/04/05/06/07 — validações ampliadas de acessibilidade;
- upload, drag-and-drop, iframes, fluxos de compra e testes de API, carga, stress ou segurança.

Esses cenários poderão ser reavaliados conforme risco, estabilidade e custo de manutenção. A matriz de priorização abaixo registra o risco, impacto, prioridade e motivo para automatizar ou adiar cada grupo.

## Estratégia de automação

- Cada teste prepara seu próprio estado e não depende da ordem de execução.
- Fixtures em `src/fixtures/` fornecem page objects reutilizáveis de `src/pages/`; dados fictícios ficam em `src/data/`.
- São usados `data-testid` fornecidos pela aplicação e, para acessibilidade, seletores por label e role.
- A sincronização aguarda estados observáveis, como habilitação do dropdown, contagem de linhas e visibilidade de mensagens; não há esperas fixas.
- O formulário utiliza dados fictícios. Não são necessários usuários, senhas ou segredos.
- A execução é limitada a dois workers para reduzir a carga sobre o site público.
- Uma screenshot é retida ao final de cada teste; em falhas, trace e vídeo também são guardados. O relatório HTML é gerado a cada execução. O workflow registra a saída da suíte em `playwright-test.log` e publica log, relatório e evidências como artefato por 14 dias, inclusive quando há falha.

## Qualidade da automação (requisitos 7.2)

| Requisito | Como é atendido |
|---|---|
| Testes independentes e sem dependência de ordem | Cada teste usa seu próprio contexto `page`; o formulário abre a aplicação em `beforeEach`, e nenhum cenário depende de alterações feitas por outro teste. |
| Nomes claros e asserções relevantes | Os títulos descrevem o comportamento, incluem os IDs do case e estão em português. As asserções verificam visibilidade, cabeçalhos, linhas, dados, mensagens de validação, seleção e estado acessível. |
| Seletores sustentáveis e baixo acoplamento | São priorizados `data-testid` estáveis fornecidos pelo PlayLab e seletores semânticos para acessibilidade. A leitura de células resolve a coluna pelo cabeçalho, em vez de assumir uma coluna fixa. |
| Sincronização por estado ou evento | As expectativas auto-retry do Playwright aguardam condições observáveis; não se usa `waitForTimeout`. |
| Separação de responsabilidades e reutilização | Fixtures criam page objects; page objects encapsulam interações; os testes expressam o fluxo; e os dados de cadastro ficam separados em `src/data/`. A abstração permanece restrita a operações compartilhadas. |
| Configuração centralizada | `playwright.config.ts` define URL, projetos, resoluções, workers, retries, relatório e evidências. |
| Dados de teste controlados | O cadastro usa dados fictícios determinísticos e o domínio reservado `.test`. Os registros da tabela vêm do PlayLab público, portanto não são controlados pela suíte; por isso, a cobertura evita modificá-los. |
| Tratamento de falhas | As asserções do Playwright falham explicitamente quando o comportamento esperado não ocorre. Os page objects também lançam erro explícito se uma coluna ou opção necessária não for encontrada; não há captura genérica nem falha silenciosa. Screenshots, traces e vídeos apoiam o diagnóstico. |
| Execução local e em pipeline | Scripts npm permitem execução local por suíte, navegador ou dispositivo. O GitHub Actions instala dependências e navegadores, executa a suíte e publica relatório e evidências. A execução manual permite selecionar projeto e filtrar os testes por ID ou texto do título. |

Não há XPath absoluto nem esperas fixas. A escolha da primeira opção é restrita ao cenário do dropdown: após filtrar opções com valor não vazio, o teste seleciona uma opção efetivamente carregada, sem depender de um valor externo fixo. A seleção de linhas após a busca ocorre somente depois de validar que há exatamente um resultado.

## Navegadores e resoluções

| Projeto Playwright | Navegador | Resolução / perfil | Cobertura |
|---|---|---|---|
| `chromium` | Chromium desktop | 1280 × 720 | Cenários desktop, incluindo a tabela de usuários |
| `firefox` | Firefox desktop | 1280 × 720 | Cenários desktop, incluindo a tabela de usuários |
| `mobile-chromium` | Chromium emulado | Pixel 7, viewport 412 × 839 | Busca na tabela de usuários |

Chromium é a cobertura principal e Firefox fornece compatibilidade com um segundo navegador suportado pelo Playwright. Os cenários desktop rodam nos dois navegadores; a cobertura mobile fica restrita ao Chromium emulado para evitar duplicar a matriz e manter a execução focada. A resolução desktop de 1280 × 720 representa uma janela de trabalho comum; o Pixel 7, em 412 × 839, representa uma tela estreita de smartphone para verificar a disponibilidade da busca. A emulação não substitui testes em dispositivos físicos. A suíte ainda não verifica sistematicamente sobreposição, scroll horizontal ou todas as ações em mobile.

## Pipeline (requisito 7.4)

O workflow `.github/workflows/playwright.yml` é acionado em `push`, `pull_request` e manualmente por `workflow_dispatch`. Ele faz checkout, configura Node.js 22, instala dependências com `npm ci`, instala Chromium e Firefox, executa os testes e publica relatório e evidências.

- **Execução manual:** na aba Actions, `Run workflow` permite escolher `all`, `chromium`, `firefox` ou `mobile-chromium`; o campo opcional aceita um ID ou trecho do título (por exemplo, `USR-01` ou `FRM-03`) para selecionar grupo/cenário. Pushes e pull requests executam todos os projetos.
- **Cache:** `actions/setup-node` utiliza o cache npm com base no lockfile.
- **Paralelismo:** Playwright usa até dois workers para reduzir o tempo sem sobrecarregar o PlayLab externo.
- **Falhas e evidências:** o log da suíte é salvo em `playwright-test.log`; o passo de upload usa `if: always()` e preserva relatório HTML, screenshots e evidências disponíveis, inclusive após falhas. Trace e vídeo são retidos em caso de falha.
- **Retenção:** os artefatos ficam disponíveis para download na página da execução por 14 dias. Relatórios, screenshots, traces, vídeos e logs não são versionados no repositório.

## Critérios de entrada e saída

**Entrada**

- Dependências Node/npm instaladas.
- Navegadores Playwright correspondentes aos projetos instalados.
- Aplicação PlayLab acessível.

**Saída**

- Os seis testes passam nos projetos para os quais estão configurados (11 execuções no total).
- Há uma screenshot por teste em `test-results/`; em falhas, trace e vídeo também ficam disponíveis no relatório HTML e na pasta de resultados.
- O workflow publica relatório, screenshots, traces, vídeos e `playwright-test.log` como artefato para download por 14 dias; esses arquivos não são versionados no repositório.
- A verificação TypeScript (`npm run typecheck`) conclui sem erros.

## Limitações conhecidas

PlayLab é um site público externo, sem ambiente isolado ou garantia de disponibilidade. Alterações na aplicação, rede ou serviços de terceiros podem causar falhas sem mudança nesta suíte. Os testes não controlam os dados do site nem substituem validação manual. A checagem de labels e nomes acessíveis é básica: não comprova conformidade WCAG completa, comportamento com leitor de tela, contraste ou qualidade da navegação por teclado.

## Frequência recomendada

Executar a suíte em pull requests e pushes pela pipeline. Durante investigação, executar apenas o projeto ou cenário relevante; após mudanças na aplicação-alvo ou nos seletores, executar a cobertura multi-browser e mobile completa. Como o alvo é externo, interpretar falhas considerando também sua disponibilidade.

## Próximos passos

1. Acompanhar execuções da pipeline e revisar flakiness ou alterações de seletores.
2. Adicionar axe-core e triagem explícita dos achados de acessibilidade.
3. Ampliar navegação por teclado e complementar com validação manual usando tecnologia assistiva.
4. Considerar cenários de upload e demais componentes após avaliar risco e estabilidade.
5. Avaliar execução mobile em outros tamanhos e em dispositivos reais, se disponíveis.
