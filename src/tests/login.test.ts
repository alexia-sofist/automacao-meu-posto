import { Builder, WebDriver } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome'; // Importe as opções do Chrome
import { expect } from 'chai';
import { LoginPage } from '../pages/LoginPage';

describe('Suíte de Login - Meu Posto (Homologação)', function() {
    let driver: WebDriver;
    let loginPage: LoginPage;

    this.timeout(30000);

    before(async () => {
        // Configura o Chrome para abrir em modo anônimo
        const options = new Options();
        options.addArguments('--incognito'); 
        // Opcional: --start-maximized para abrir em tela cheia

        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options) // Aplica as opções
            .build();

        loginPage = new LoginPage(driver);
    });

    after(async () => {
        await driver.quit();
    });

    it('Deve acessar o ambiente de homologação em modo anônimo', async () => {
        const urlHomolog = 'https://cnhomolog.vibraenergia.com.br/premmia/meuposto';
        await loginPage.acessar(urlHomolog);
        
        // Validação simples para confirmar o carregamento
        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).to.include('vibraenergia');
    });
});