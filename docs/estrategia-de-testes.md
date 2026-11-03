# Estratégia de testes

## Objetivo

Validar fluxos essenciais da aplicação pública [PlayLab — Playwright Practice Arena](https://playwrightlab.github.io/) com testes end-to-end em Playwright e TypeScript, priorizando a jornada de usuários, validações de formulário e interações representativas.

## Escopo

A suíte cobre sete cenários:

- tabela de usuários: carregamento, cabeçalhos, busca, ordenação e paginação;
- formulário: submissão válida e rejeição de e-mail inválido;
- dropdown com opções carregadas assincronamente;
- nomes acessíveis dos campos obrigatórios e do botão de cadastro;
- busca na tabela em viewport mobile.

Os cenários desktop são executados em Chromium e Firefox. A jornada mobile é executada em Chromium emulado como Pixel 7. A pipeline publica relatório HTML e evidências da execução.

## Fora de escopo

Não fazem parte desta primeira entrega:

- upload e validação de arquivos;
- drag-and-drop, iframes, modais e fluxos de compra;
- testes de API, carga, stress ou segurança;
- auditoria WCAG automatizada com axe-core;
- testes completos com leitor de tela, teclado e contraste.

Esses cenários podem ser adicionados em etapas futuras conforme risco, estabilidade e custo de manutenção.

## Riscos identificados

| Risco | Impacto | Prioridade | Cobertura atual |
|---|---|---|---|
| Usuários não carregam ou pesquisa retorna resultados incorretos | Alto | P0 | Carregamento, estrutura e busca da tabela |
| Ordenação ou paginação apresenta registros incorretos | Alto | P0 | Ordenação por nome e navegação de página |
| Formulário rejeita dados válidos ou aceita e-mail inválido | Alto | P0 | Submissão válida e cenário negativo |
| Dropdown não fica disponível após carregamento | Médio | P1 | Habilitação, opções carregadas e seleção |
| Campos não têm nomes acessíveis | Médio | P1 | Associação entre labels, campos e botão |
| Jornada crítica fica inacessível em viewport mobile | Médio | P1 | Busca de usuário em emulação Pixel 7 |
| Mudanças no site ou indisponibilidade externa causam falha | Médio | P1 | Reduzido com asserções observáveis e evidências; não controlável pela suíte |

## Estratégia de cobertura

A cobertura combina verificações funcionais positivas e negativas. A tabela de usuários recebe a maior cobertura por ser a jornada principal do case. O formulário valida tanto o caminho de sucesso quanto uma entrada inválida. O dropdown representa sincronização assíncrona, enquanto as verificações de nomes acessíveis e viewport mobile cobrem requisitos transversais.

Não se busca automatizar todos os componentes da aplicação. Foram priorizados cenários de alto valor com resultados observáveis e dados previsíveis; componentes com dependências externas, conteúdo variável ou custo maior ficaram fora do recorte inicial.

## Critérios de priorização

- **P0:** protege a jornada principal e comportamentos que podem impedir ou comprometer operações centrais.
- **P1:** cobre interações importantes, sincronização, acessibilidade básica e experiência em dispositivos móveis.
- **P2:** cobre funcionalidades complementares cujo risco ou frequência não justifica o custo nesta primeira versão.

Impacto funcional, frequência de uso, possibilidade de regressão e estabilidade da automação orientam a escolha. A prioridade não é uma estimativa numérica de risco.

## Estratégia de automação

- Cada teste prepara seu próprio estado e não depende da ordem de execução.
- São usados `data-testid` fornecidos pela aplicação e, para acessibilidade, seletores por label e role.
- A sincronização aguarda estados observáveis, como habilitação do dropdown, contagem de linhas e visibilidade de mensagens; não há esperas fixas.
- Os dados enviados ao formulário são fictícios. Não são necessários usuários, senhas ou segredos.
- A execução é limitada a dois workers para reduzir a carga sobre o site público.
- Em falhas, são retidos screenshot, trace e vídeo; o relatório HTML é gerado a cada execução.

## Navegadores e resoluções

| Projeto Playwright | Navegador | Resolução / perfil | Cobertura |
|---|---|---|---|
| `chromium` | Chromium desktop | 1280 × 720 | Todos os cenários desktop |
| `firefox` | Firefox desktop | 1280 × 720 | Todos os cenários desktop |
| `mobile-chromium` | Chromium emulado | Pixel 7, viewport 412 × 839 | Busca na tabela de usuários |

Os testes desktop não incluem o arquivo da jornada mobile, evitando executar a mesma cobertura mobile nos três projetos. A emulação Pixel 7 verifica uma viewport estreita representativa, mas não substitui testes em dispositivos físicos.

## Critérios de entrada e saída

**Entrada**

- Dependências Node/npm instaladas.
- Navegadores Playwright correspondentes aos projetos instalados.
- Aplicação PlayLab acessível.

**Saída**

- Os sete cenários passam nos projetos para os quais estão configurados (13 execuções no total).
- Em falhas, há evidências diagnósticas disponíveis no relatório HTML e em `test-results/`.
- A verificação TypeScript (`npm run typecheck`) conclui sem erros.

## Limitações conhecidas

PlayLab é um site público externo, sem ambiente isolado ou garantia de disponibilidade. Alterações na aplicação, rede ou serviços de terceiros podem causar falhas sem mudança nesta suíte. Os testes não controlam os dados do site nem substituem validação manual. A checagem de labels e nomes acessíveis é básica: não comprova conformidade WCAG completa, comportamento com leitor de tela, contraste ou qualidade da navegação por teclado.

## Próximos passos

1. Acompanhar os resultados da pipeline e revisar flakiness ou alterações de seletores.
2. Adicionar axe-core e triagem explícita dos achados de acessibilidade.
3. Ampliar testes de teclado e complementar com validação manual usando tecnologia assistiva.
4. Considerar cenários de upload e demais componentes após avaliar risco e estabilidade.
5. Avaliar execução mobile em outros tamanhos e em dispositivos reais, se disponíveis.
