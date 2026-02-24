import { Before, After, Status, setDefaultTimeout } from '@cucumber/cucumber';
import { Builder, WebDriver } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';

// Exportando as instâncias para uso nos steps
export let driver: WebDriver;
export let loginPage: LoginPage;
export let homePage: HomePage;

setDefaultTimeout(60000);

Before(async function (scenario) {
    console.log(`\n>>> Iniciando cenário: ${scenario.pickle.name}`);
    
    const options = new Options();
    options.addArguments('--incognito', '--start-maximized', '--log-level=3');

    driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
    
    loginPage = new LoginPage(driver);
    homePage = new HomePage(driver);
});

After(async function (scenario) {
    // Lógica para capturar screenshot em caso de falha
    if (scenario.result?.status === Status.FAILED) {
        const screenshot = await driver.takeScreenshot();
        // O comando 'this.attach' anexa a imagem ao arquivo JSON que o gerador de HTML lê
        this.attach(screenshot, 'image/png');
        console.log(`   [X] Screenshot capturado para o cenário: ${scenario.pickle.name}`);
    } else {
        console.log(`   [V] Cenário finalizado com sucesso.`);
    }

    if (driver) {
        await driver.quit();
    }
});