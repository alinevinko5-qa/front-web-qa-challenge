# Matriz de riscos

| ID | Área | Risco | Impacto | Probabilidade | Prioridade | Cenários relacionados | Mitigação / cobertura |
|---|---|---|---|---|---|---|---|
| RSK-01 | Usuários | A tabela não abre ou apresenta cabeçalhos incorretos | Alto | Média | P0 | USR-01/02 | Navegar até a seção e verificar checkbox e cabeçalhos |
| RSK-02 | Usuários | A busca não encontra registros ou retorna resultados indevidos | Alto | Média | P0 | USR-03/04, RSP-02 | Validar busca positiva e negativa em desktop e positiva em mobile |
| RSK-03 | Usuários | O filtro por função não apresenta registros correspondentes | Médio | Média | P1 | USR-05 | Filtrar por `Viewer` e validar a função apresentada |
| RSK-04 | Usuários | A paginação não atualiza a página selecionada | Médio | Média | P1 | USR-06 | Validar a alternância entre páginas e retorno à primeira |
| RSK-05 | Cadastro | Um cadastro válido não é concluído | Alto | Média | P0 | FRM-01, A11Y-03 | Validar confirmação após preenchimento direto e por teclado |
| RSK-06 | Acessibilidade | O formulário não pode ser preenchido pelo teclado | Médio | Média | P1 | A11Y-03 | Preencher os campos e enviar com Enter; não cobre toda a conformidade WCAG |
| RSK-07 | Ambiente externo | Instabilidade de rede, terceiros ou mudanças do PlayLab causam falhas sem regressão no projeto | Médio | Média | P1 | Todos | Usar sincronização por estado e limitar a execução a dois workers; a disponibilidade do site não é controlável |
| RSK-08 | Responsividade | A jornada de busca fica indisponível em viewport mobile | Médio | Média | P1 | RSP-02/USR-03 | Executar pesquisa em Chromium emulado como Pixel 7 |
| RSK-09 | Cobertura funcional | Ordenação, status, edição e validações negativas de cadastro não são exercitados | Médio | Média | P2 | USR-07/08, FRM-02/03/04/05/06/08 | Registrados para cobertura futura |
| RSK-10 | Componentes dinâmicos | O dropdown não carrega ou não permite selecionar opções | Médio | Média | P2 | DYN-01/02 | Cenário ainda não está na suíte atual |
| RSK-11 | Responsividade | Sobreposição, scroll horizontal ou ações inacessíveis em telas estreitas | Médio | Média | P2 | RSP-03/04/05 | A suíte cobre a busca; inspeção visual e demais ações ficam para etapa futura |
| RSK-12 | Acessibilidade | Barreiras além do fluxo de teclado não são identificadas | Médio | Média | P2 | A11Y-01/02/04/05/06/07 | Labels, foco, leitores de tela, contraste e análise automatizada precisam de cobertura adicional |

## Critérios

O impacto representa a consequência funcional para o usuário: **alto** para bloqueio de jornada central; **médio** para degradação importante, mas com alternativa ou escopo limitado; e **baixo** para funcionalidades complementares. A probabilidade é qualitativa, considerando frequência de uso, complexidade e frequência de mudança do componente.

As prioridades combinam impacto, probabilidade, relevância para a jornada e custo/estabilidade da automação, sem cálculo numérico:

- **P0:** fluxos centrais, como acesso à tabela, busca e cadastro válido.
- **P1:** funcionalidades importantes e riscos transversais, como filtro, paginação, teclado e disponibilidade da busca em mobile.
- **P2:** funcionalidades ainda não cobertas ou complementares que podem ser adicionadas em etapa posterior.

A prioridade orienta a ordem da cobertura; não substitui análise contextual nem representa uma medição estatística.

## Riscos fora da suíte atual

Ordenação, status e ações da tabela; validações negativas e limites do formulário; dropdown assíncrono; verificações adicionais de acessibilidade e layout mobile; upload; e testes de carga, stress e segurança ainda não fazem parte da suíte.
