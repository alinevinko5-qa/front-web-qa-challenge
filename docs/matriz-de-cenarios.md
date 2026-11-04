# Matriz de cenários

A suíte atual contém 12 testes independentes: 11 cenários desktop executados em Chromium e Firefox e um cenário mobile em Chromium emulado, totalizando 23 execuções.

| ID | Jornada | Descrição | Tipo de teste | Risco protegido | Automatizar? | Status |
|---|---|---|---|---|---|---|
| Login | Login | Entrar com credenciais de demonstração e validar a mensagem de boas-vindas | E2E desktop | Login não conclui ou não apresenta confirmação | Sim | Implementado |
| FRM-01 | Cadastro | Enviar dados válidos e validar a confirmação | E2E desktop | Cadastro válido não concluído | Sim | Implementado |
| A11Y-03 | Cadastro/acessibilidade | Preencher o formulário usando teclado e enviar com Enter | E2E desktop | Jornada não utilizável por teclado | Sim | Implementado |
| USR-01 | Usuários | Navegar até a seção Tables | E2E desktop | Acesso à tabela indisponível | Sim | Implementado |
| USR-02 | Usuários | Validar checkbox de seleção geral e cabeçalhos da tabela | E2E desktop | Estrutura da tabela incorreta | Sim | Implementado |
| USR-03 | Usuários | Pesquisar Alice e validar Alice Johnson | E2E desktop | Busca não localiza usuário existente | Sim | Implementado |
| USR-04 | Usuários | Pesquisar Bruno e validar zero resultados | E2E desktop | Busca retorna resultados indevidos | Sim | Implementado |
| USR-05 | Usuários | Filtrar a tabela pela função Viewer | E2E desktop | Filtro por função incorreto | Sim | Implementado |
| USR-06 | Usuários | Navegar entre as páginas 1, 2 e 3 | E2E desktop | Paginação não atualiza a página ativa | Sim | Implementado |
| RSP-02/USR-03 | Usuários mobile | Repetir a busca por Alice em Pixel 7 emulado e validar a linha | E2E mobile | Busca indisponível em viewport estreita | Sim | Implementado |
| DYN-02 | Componentes dinâmicos | Configurar o atraso e aguardar a exibição de conteúdo | E2E assíncrono | Conteúdo não aparece após o carregamento | Sim | Implementado; o spec não valida seleção de opção dinâmica |
| UP-01 | Upload | Enviar `fixtures/teste.txt` e validar a mensagem de sucesso | E2E upload | Upload de arquivo válido não conclui | Sim | Implementado |
| USR-07/08 | Usuários | Validar status e executar ação na tabela | E2E desktop | Status ou ação incorretos | Sim | Fora do escopo atual |
| FRM-02/03/04/05/06/08 | Cadastro | Validar submissão vazia, e-mail inválido, limites e reset | E2E desktop | Validações complementares ausentes | Sim | Fora do escopo atual |
| DYN-01 | Componentes dinâmicos | Aguardar o carregamento de um dropdown assíncrono | E2E assíncrono | Dropdown não carrega | Sim | Fora do escopo atual |
| A11Y-01/02/04/05/06/07 | Acessibilidade | Verificar labels, foco, títulos, análise automatizada e modal | Acessibilidade | Barreiras além do fluxo de teclado não detectadas | Sim | Fora do escopo atual |
| RSP-03/04/05 | Usuários mobile | Verificar sobreposição, scroll horizontal e acesso a ações | E2E mobile | Conteúdo ou ações inacessíveis em telas estreitas | Sim | Fora do escopo atual |
| UP-02 | Upload | Rejeitar arquivo com extensão não suportada | E2E upload | Upload inválido é aceito | Sim | Fora do escopo atual |

O teste USR-05, apesar do nome do arquivo mencionar ordenação, atualmente seleciona o filtro `Viewer`. A ordenação não está coberta. O teste A11Y-03 exercita um fluxo de cadastro por teclado, mas não é uma auditoria completa de acessibilidade. O spec DYN-02 configura um atraso e espera conteúdo; apesar do nome do arquivo, não seleciona uma opção carregada dinamicamente.

## Frequência

Os projetos executam em pushes e pull requests pela pipeline. Localmente, os cenários podem ser selecionados por projeto, arquivo ou título; a interface Playwright (`npm run test:ui`) lista os projetos configurados.
