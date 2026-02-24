Feature: Authentication - Meu Posto System

  Background:
    Given que acesso a página de login do Meu Posto em modo anônimo

  @smoke
  Scenario: Validar carregamento inicial do sistema
    Then eu devo visualizar o título "Canal de Negócios" para confirmar o carregamento

  @regression
  Scenario: Realizar login com sucesso
    When submeto minhas credenciais de Administrador do Posto
    Then o sistema deve realizar o login com sucesso