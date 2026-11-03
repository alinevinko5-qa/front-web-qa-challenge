# Matriz de cenários

| ID | Jornada | Descrição | Tipo de teste | Risco protegido | Prioridade | Automatizar? | Justificativa | Status |
|---|---|---|---|---|---|---|---|---|
| USR-01 | Usuários | Carregar tabela, validar cabeçalhos e pesquisar Alice Johnson | E2E desktop | Dados não exibidos ou filtro incorreto | P0 | Sim | Fluxo central e determinístico | Implementado |
| USR-02 | Usuários | Ordenar nomes e navegar para a segunda página | E2E desktop | Ordenação/paginação inconsistentes | P0 | Sim | Valida operações centrais da tabela | Implementado |
| FRM-01 | Cadastro | Enviar dados válidos e validar confirmação | E2E desktop | Cadastro válido não concluído | P0 | Sim | Confirma o caminho de sucesso | Implementado |
| FRM-03 | Cadastro | Rejeitar endereço de e-mail inválido | Negativo desktop | Aceitação de dado inválido | P0 | Sim | Protege validação de entrada | Implementado |
| DYN-01/02 | Dropdown | Aguardar opções assíncronas e selecionar uma | E2E assíncrono | Controle permanece indisponível ou não selecionável | P1 | Sim | Usa estado do componente, sem espera fixa | Implementado |
| A11Y-02 | Cadastro | Verificar labels acessíveis dos campos obrigatórios | Acessibilidade | Campos sem nome acessível | P1 | Sim | Fácil de manter e relevante para uso assistivo | Implementado |
| RSP-02 | Usuários | Pesquisar usuário em viewport Pixel 7 | E2E mobile | Jornada crítica inutilizável em mobile | P1 | Sim | Emula um dispositivo móvel comum | Implementado |
| UPL-01/02 | Upload | Arquivo permitido e extensão não suportada | E2E upload | Upload inválido ou quebrado | P2 | Não | Baixa prioridade no recorte inicial | Fora do escopo |
| DYN-03 | Tabela dinâmica | Verificar colunas que mudam de ordem e valores aleatórios | E2E dinâmico | Regressão na tabela variável | P2 | Não | Dados variáveis elevam custo; não é fluxo principal | Fora do escopo |
| A11Y-06 | Página | Auditoria WCAG automatizada e validação manual assistiva | Acessibilidade | Barreiras além de nomes dos controles | P1 | Não | Requer triagem e complemento manual; planejado como evolução | Próximo passo |

## Frequência

Os sete cenários implementados são executados em pull requests e pushes. Testes seletivos por navegador podem ser usados localmente durante diagnóstico.
