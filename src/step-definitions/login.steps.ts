import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import { loginPage, driver } from './hooks'; // Importação essencial para evitar o erro TS2304

Given('que acesso a página de login do Meu Posto em modo anônimo', async function () {
    // Utiliza a URL configurada no seu ambiente
    await loginPage.acessarHome();
});

When('submeto minhas credenciais de Administrador do Posto', async function () {
    // Realiza o preenchimento e o clique no botão de entrar
    await loginPage.realizarLoginComSucesso();
});

Then('o sistema deve realizar o login com sucesso', async function () {
    /**
     * Espera inteligente para o redirecionamento.
     * O teste prossegue assim que a URL contiver '/meuposto', sem travar o tempo total.
     *
     */
    const logado = await driver.wait(async () => {
        const urlAtual = await driver.getCurrentUrl();
        return urlAtual.includes('/meuposto');
    }, 15000, 'O redirecionamento para a Home após o login demorou demais.');

    expect(logado).to.be.true;
});

/**
 * Validação de título para o cenário @home_smoke.
 *
 */
Then('eu devo visualizar o título {string} para confirmar o carregamento', async function (tituloEsperado) {
    const textoAtual = await loginPage.obterTextoTitulo();
    // Compara o texto obtido (limpo de espaços) com o esperado na feature
    expect(textoAtual.trim()).to.be.equal(tituloEsperado.trim());
});