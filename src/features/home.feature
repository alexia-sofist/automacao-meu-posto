Feature: Home Dashboard - Layout e Navegação

  Background:
    Given que acesso a página de login do Meu Posto em modo anônimo
    And submeto minhas credenciais de Administrador do Posto
    Then o sistema deve realizar o login com sucesso

  @home_smoke
  Scenario: Validar carregamento inicial e boas-vindas
    Then sou redirecionado para a tela "Meu Posto" para confirmar o acesso
    And eu devo visualizar a descrição "Acompanhe a performance do seu time com relação ao programa Petrobras Premmia."

  @home_layout
  Scenario: Validar a integridade visual de todos os componentes da Dashboard
    Then sou redirecionado para a tela "Meu Posto" para confirmar o acesso
    And o sistema deve exibir corretamente os seguintes cards:
      | componente   | titulo                 | descricao                                                         |
      | CAMPANHAS    | Campanhas              | Crie campanhas por meio de cupons de desconto                     |
      | PAINEL_POSTO | Painel do Posto        | Acompanhe os principais resultados do seu posto!                  |
      | EQUIPE       | Equipe                 | Visualize e gerencie acesso a operações não financeiras           |
      | POSTO_360    | Posto 360              | Os melhores dados da pista para o seu posto                       |
      | PERFORMANCE  | Performance da Equipe  | Acompanhe a atuação dos seus funcionários                         |
      | RELATORIOS   | Relatórios Financeiros | Visualize relatórios de Débitos e de Resgates Premmia             |
      | CASHBACK     | Cashback da Taxa do App| Visualize o seu cashback da taxa de pagamentos feito no App.      |
      | PAGAMENTOS   | Pagamentos a Receber   | Visualize cada transação e sua respectiva data de crédito.        |

  @home_navegacao
  Scenario Outline: Validar redirecionamento de todos os cards da Home
    Given sou redirecionado para a tela "Meu Posto" para confirmar o acesso
    When eu clico no botão Acessar do card "<id_componente>"
    Then sou redirecionado para a página com o título "<titulo_pagina>"

    Examples:
      | id_componente | titulo_pagina          |
      | CAMPANHAS     | Campanhas              |
      | PAINEL_POSTO  | Painel do Posto        |
      | EQUIPE        | Equipe                 |
      | POSTO_360     | Posto 360              |
      | PERFORMANCE   | Performance de Equipe  |
      | RELATORIOS    | Relatórios             |
      | CASHBACK      | Cashback da Taxa do App|
      | PAGAMENTOS    | Pagamentos a receber   |