# ⛽ Automação Meu Posto - Vibra Energia

Este projeto contém a suite de testes automatizados para o portal **Meu Posto**, utilizando BDD (Behavior Driven Development) para validar as regras de negócio da Dashboard e a navegação entre os módulos do sistema.

## 🚀 Tecnologias e Ferramentas

* **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
* **Framework de BDD:** [Cucumber.js](https://cucumber.io/)
* **Automação Web:** [Selenium WebDriver](https://www.selenium.dev/)
* **Asserções:** [Chai](https://www.chaijs.com/)
* **Relatórios:** Cucumber HTML Reporter

## 📂 Estrutura do Projeto

* `src/features/`: Arquivos `.feature` escritos em Gherkin contendo os cenários de teste.
* `src/step-definitions/`: Implementação técnica dos passos (Glue Code).
* `src/pages/`: Page Objects com a lógica de interação e mapeamento de elementos.
* `reports/`: Local onde os relatórios de execução e screenshots de erro são armazenados.

## 🛠️ Pré-requisitos

1.  **Node.js** (Versão 14 ou superior)
2.  **Google Chrome** instalado (o Selenium gerencia o driver automaticamente)
3.  Configuração do arquivo `.env` na raiz com as credenciais de acesso.

## 🔧 Configuração e Instalação

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/alexia-sofist/automacao-meu-posto.git](https://github.com/alexia-sofist/automacao-meu-posto.git)
    ```
2.  **Instale as dependências:**
    ```bash
    npm install
    ```

## 🧪 Execução dos Testes

Para rodar todos os cenários da Home e gerar o relatório:
```bash
npm test