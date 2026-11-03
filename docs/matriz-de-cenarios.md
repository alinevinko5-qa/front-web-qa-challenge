# Matriz de cenários

Os IDs podem ser agrupados quando um mesmo teste cobre cenários relacionados. Nesse caso, cada linha registra a jornada, o risco, a prioridade, a decisão de automatização, a justificativa e o status do grupo; a suíte contém seis testes lógicos independentes.

| ID | Jornada | Descrição | Tipo de teste | Risco protegido | Prioridade | Automatizar? | Justificativa | Status |
|---|---|---|---|---|---|---|---|---|
| USR-01/02/03/04/07 | Usuários | Validar carregamento, cabeçalhos, pesquisa de usuário existente e inexistente e situação apresentada | E2E desktop | Tabela, pesquisa ou situação incorretas | P0 | Sim | Seleciona cobertura funcional central sem reproduzir toda a jornada de referência | Implementado |
| USR-05/06/08 | Usuários | Ordenar, navegar entre páginas e executar uma ação na tabela | E2E desktop | Ordenação, paginação ou ação incorretas | P1 | Não | Cenários adiados para manter o recorte inicial objetivo e evitar encadear interações ou alterar dados do ambiente público | Fora do escopo inicial |
| FRM-01 | Cadastro | Enviar dados válidos e validar confirmação | E2E desktop | Cadastro válido não concluído | P0 | Sim | Confirma o caminho de sucesso | Implementado |
| FRM-03/06 | Cadastro | Rejeitar endereço de e-mail inválido e validar a mensagem de erro | Negativo desktop | Aceitação de dado inválido ou ausência de feedback | P0 | Sim | Um único cenário cobre a rejeição e a mensagem de validação | Implementado |
| FRM-07/A11Y-02 | Cadastro | Validar associação de labels e nomes acessíveis dos campos obrigatórios | Acessibilidade | Campos sem identificação acessível | P1 | Sim | Cenário selecionado para atender à validação de acessibilidade do case; verifica campos obrigatórios por label e o botão por nome acessível | Implementado |
| FRM-02/04/05/08 | Cadastro | Validar submissão vazia, limite de caracteres, reset e operação por teclado | E2E desktop | Regras complementares ou operação por teclado incorretas | P1 | Não | Adiados para manter o recorte inicial focado em sucesso, validação negativa e identificação acessível dos campos | Fora do escopo inicial |
| DYN-01/02 | Dropdown | Aguardar o carregamento assíncrono e selecionar uma opção disponível | E2E assíncrono | Controle permanece indisponível ou não selecionável | P1 | Sim | Aguarda o dropdown habilitar e apresentar opções antes da seleção, sem espera fixa | Implementado |
| DYN-03/04/05/06/07/08 | Componentes dinâmicos | Validar mudança de colunas, recarga, dados variáveis, múltiplos cliques, estado de carregamento e opção indisponível | E2E dinâmico | Alterações dinâmicas ou estados de exceção incorretos | P2 | Não | Cenários complementares não selecionados para a cobertura inicial; exigem componentes ou condições específicas além do dropdown assíncrono priorizado | Fora do escopo inicial |
| RSP-01 | Usuários | Validar tabela e pesquisar usuário em resolução desktop | E2E desktop | Jornada crítica indisponível em desktop | P1 | Sim | O teste da tabela é executado em 1280 × 720 no Chromium e no Firefox | Implementado |
| RSP-02 | Usuários | Pesquisar usuário em viewport Pixel 7 | E2E mobile | Busca da jornada crítica indisponível em mobile | P1 | Sim | A viewport 412 × 839 representa uma tela de smartphone comum e valida a busca em espaço reduzido | Implementado |
| RSP-03/04/05 | Usuários | Verificar sobreposição, scroll horizontal e acesso às principais ações em tela reduzida | E2E mobile | Conteúdo ou ações inacessíveis em viewport estreita | P1 | Não | A cobertura mobile inicial valida o acesso e o resultado da busca; as verificações visuais e de todas as ações ficam para uma etapa posterior | Fora do escopo inicial |
| UPL-01/02 | Upload | Arquivo permitido e extensão não suportada | E2E upload | Upload inválido ou quebrado | P2 | Não | Baixa prioridade no recorte inicial | Fora do escopo |
| A11Y-01/03/04/05/06/07 | Interface | Validar nomes de todos os controles, navegação e ordem de foco, hierarquia de títulos, análise automatizada e acessibilidade de modal | Acessibilidade | Barreiras de acessibilidade além das labels dos campos | P1 | Não | A11Y-02 foi priorizado como verificação acessível mínima; os demais cenários exigem validações específicas e, no caso de análise automatizada, triagem e complemento manual | Fora do escopo inicial |

## Frequência

Os seis testes implementados são executados em pull requests e pushes. Testes seletivos por navegador podem ser usados localmente durante diagnóstico.
