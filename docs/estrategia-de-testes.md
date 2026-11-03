# Estratégia de testes

## Objetivo e escopo

Validar fluxos essenciais da aplicação pública [PlayLab](https://playwrightlab.github.io/) com testes end-to-end Playwright + TypeScript. O recorte cobre tabela de usuários, validação de formulário, conteúdo assíncrono, nomes acessíveis e uma jornada mobile.

## Riscos e priorização

| Risco | Impacto | Prioridade | Cobertura escolhida |
|---|---|---|---|
| Usuários não carregam, pesquisa retorna dados errados ou paginação/ordenação falham | Alto | P0 | Estrutura da tabela, filtro, ordenação e paginação |
| Formulário aceita endereço inválido ou rejeita envio válido | Alto | P0 | E-mail inválido e registro válido |
| Dropdown não fica utilizável após carregamento | Médio | P1 | Habilitação, opções carregadas e seleção |
| Campos não têm nomes acessíveis | Médio | P1 | Associação label/campo e nome acessível do botão |
| Jornada crítica fica indisponível em viewport mobile | Médio | P1 | Busca de usuário em emulação Pixel 7 |

Riscos técnicos adicionais incluem mudanças de markup do site, dependência de rede e conteúdo de terceiros. O ambiente-alvo é público e os testes não criam nem alteram dados persistidos; a submissão do formulário e as interações são restritas aos componentes de prática da própria aplicação.

## Critérios de priorização

P0 protege dados e funcionalidades centrais, com impacto direto na operação. P1 cobre interações importantes, acessibilidade e experiência em dispositivos móveis. A seleção favorece fluxos repetidos e resultados verificáveis, limitando cenários dependentes de conteúdo aleatório ou de serviços externos.

## Estratégia de automação e dados

- Cada teste navega e prepara seu próprio estado; não há dependência da ordem de execução.
- `data-testid` é utilizado nos controles da aplicação que o disponibilizam; os campos do formulário também são validados por seus labels acessíveis.
- A sincronização usa condições observáveis (`toBeEnabled`, contagem de linhas e estado visível), sem pausas fixas.
- O formulário usa dados fictícios exclusivos do teste. Nenhuma credencial real é necessária.
- A configuração limita a concorrência a dois workers para reduzir carga sobre o site público.
- Chromium e Firefox executam os testes desktop; o cenário de busca da tabela roda separadamente em Chromium com perfil Pixel 7.

## Cenários fora do recorte

Upload, drag-and-drop, iframes, modais, fluxos de compra, API e análise WCAG automatizada ficam fora do escopo inicial. Alguns dependem de arquivos, serviços externos ou interações de maior custo de manutenção. A checagem de labels implementada cobre nomes acessíveis básicos, mas não substitui auditoria automatizada (axe-core), testes com leitor de tela nem avaliação manual completa de teclado/contraste.

## Critérios de entrada e saída

**Entrada:** dependências instaladas, navegadores Playwright disponíveis e PlayLab acessível.  
**Saída:** os sete cenários passam nos projetos configurados; falhas são diagnosticáveis pelo HTML report, screenshot, trace e vídeo gerados em caso de falha.

## Frequência recomendada

Executar em pull requests e pushes pela pipeline. Reexecutar seletivamente por navegador durante investigação local e revisar os seletores quando a aplicação-alvo mudar.

## Limitações e próximos passos

PlayLab é um site externo sem ambiente de teste isolado ou contrato de disponibilidade. Mudanças e indisponibilidade podem afetar a suíte sem alteração no repositório. Próximos passos: acompanhar flakiness, incluir axe-core com triagem dos achados, ampliar navegação por teclado e validar manualmente os principais fluxos com tecnologia assistiva.
