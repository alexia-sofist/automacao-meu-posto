# Automação de Testes - Portal Meu Posto (Vibra)

Este projeto automatiza os fluxos críticos e a validação de layout do portal **Meu Posto**, utilizando **Selenium WebDriver**, **Cucumber** e **TypeScript**.

## 🛠️ Tecnologias Utilizadas
* **Linguagem:** TypeScript
* **Framework BDD:** Cucumber.js
* **Driver:** Selenium WebDriver
* **Asserções:** Chai

## 🏗️ Estrutura do Projeto
O projeto segue o padrão **Page Object Model (POM)**:
* `src/features`: Especificações de negócio escritas em Gherkin.
* `src/pages`: Mapeamento de elementos e interações com as páginas.
* `src/step-definitions`: Implementação técnica dos passos e Hooks de execução.

## 🚀 Como Rodar os Testes
1. Instale as dependências: `npm install`
2. Execute todos os testes: `npm run cucumber`
3. Execute apenas testes de layout: `npx cucumber-js --tags "@layout"`