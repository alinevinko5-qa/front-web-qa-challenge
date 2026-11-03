# Matriz de riscos

| ID | Área | Risco | Impacto | Probabilidade | Prioridade | Cenários relacionados | Mitigação / cobertura |
|---|---|---|---|---|---|---|---|
| RSK-01 | Usuários | A tabela não carrega ou apresenta estrutura incorreta, ou a busca não localiza corretamente usuários | Alto | Média | P0 | USR-01/02/03/04 | Validar visibilidade, cabeçalhos, linhas e pesquisa por usuário existente ou inexistente |
| RSK-02 | Usuários | Ordenação ou paginação apresenta resultados incorretos | Médio | Média | P1 | USR-05/06 (não automatizados) | Registrado para cobertura futura; não está coberto pela suíte inicial |
| RSK-09 | Usuários | A situação apresentada para um usuário está incorreta | Alto | Média | P0 | USR-07 | Conferir se o valor apresentado pertence aos estados esperados |
| RSK-10 | Usuários | A ação disponível na tabela não atualiza corretamente o registro | Médio | Média | P1 | USR-08 (não automatizado) | Registrado para cobertura futura; não está coberto pela suíte inicial |
| RSK-03 | Cadastro | Dados válidos não são aceitos ou e-mail inválido é aceito sem feedback apropriado | Alto | Média | P0 | FRM-01, FRM-03/06 | Cobrir submissão válida, rejeição de e-mail inválido e mensagem de validação |
| RSK-04 | Componentes dinâmicos | Dropdown permanece desabilitado ou opções não podem ser selecionadas após carregamento | Médio | Média | P1 | DYN-01/02 | Aguardar habilitação e opções observáveis e selecionar opção carregada |
| RSK-05 | Acessibilidade | Campos essenciais não têm label associado ou nome acessível | Médio | Média | P1 | FRM-07/A11Y-02 | Verificar campos por label e botão por role/nome acessível |
| RSK-06 | Responsividade | A jornada de busca fica indisponível em viewport mobile | Médio | Média | P1 | RSP-02 | Executar pesquisa em Chromium emulado como Pixel 7 |
| RSK-07 | Ambiente externo | Instabilidade de rede, terceiros ou mudanças do PlayLab causam falhas não relacionadas ao código | Médio | Média | P1 | Todos | Limitar workers, usar sincronização baseada em estado e guardar evidências de falha; a disponibilidade externa não é controlável pela suíte |
| RSK-08 | Acessibilidade | Barreiras de teclado, contraste, hierarquia de títulos, modal ou leitor de tela não são identificadas pela validação básica de labels | Médio | Média | P1 | A11Y-01/03/04/05/06/07 (não automatizados) | Registrar como limitação e planejar cenários específicos, ferramenta automatizada com triagem e validação manual complementar |
| RSK-11 | Responsividade | Sobreposição, scroll horizontal indevido ou ações inacessíveis em tela reduzida | Médio | Média | P1 | RSP-03/04/05 (não automatizados) | A suíte verifica a busca no Pixel 7; inspeção de layout e acesso às demais ações ficam como cobertura futura |

## Critérios

O impacto representa a consequência funcional para o usuário: **alto** para bloqueio de jornada central ou aceitação de dados inválidos; **médio** para degradação importante, mas com alternativa ou escopo limitado; e **baixo** para funcionalidades complementares. A probabilidade é qualitativa, considerando frequência de uso, complexidade e frequência de mudança do componente.

As prioridades combinam impacto, probabilidade, relevância para a jornada e custo/estabilidade da automação, sem cálculo numérico:

- **P0:** fluxos centrais ou validações cuja falha impede o uso esperado, como carregar e pesquisar na tabela ou concluir e validar o cadastro.
- **P1:** funcionalidades importantes e riscos transversais, como estados do dropdown, acessibilidade básica e disponibilidade da busca em mobile.
- **P2:** funcionalidades complementares que podem ser adiadas sem comprometer a cobertura inicial, como upload e cenários dinâmicos adicionais.

A prioridade orienta a ordem da cobertura; não substitui análise contextual nem representa uma medição estatística.

## Riscos fora da suíte inicial

Ficaram fora da cobertura inicial: ordenação, paginação e ação da tabela (USR-05/06/08); submissão vazia, limite de caracteres, reset e operação por teclado (FRM-02/04/05/08); componentes dinâmicos adicionais (DYN-03/04/05/06/07/08); verificações ampliadas de acessibilidade (A11Y-01/03/04/05/06/07); verificações adicionais de layout e ações mobile (RSP-03/04/05); upload e fluxos complementares. A decisão prioriza cenários centrais e verificáveis no ambiente público; os itens podem ser reavaliados conforme risco, estabilidade e objetivos do projeto. Testes de carga, stress e segurança estão fora do escopo do case.
