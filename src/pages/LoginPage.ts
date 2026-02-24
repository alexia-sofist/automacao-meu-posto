import { By, WebDriver, until } from 'selenium-webdriver';
import { ENV } from '../config/env'; // Importação da sua massa de dados centralizada

/**
 * Classe que representa a página de Login e a estrutura inicial do Meu Posto.
 * Segue o padrão Page Object Model (POM).
 */
export class LoginPage {
    private driver: WebDriver;
    
    // --- Seletores da Tela de Login (Externos) ---
    private tituloCanal = By.className('titulo'); 
    private campoUsuario = By.id('username');     
    private campoSenha   = By.id('password');     
    private botaoAcessar = By.id('loginBt');       

    constructor(driver: WebDriver) {
        this.driver = driver;
    }

    /**
     * Navega até a URL usando a configuração centralizada
     */
    async acessarHome(): Promise<void> {
        await this.driver.get(ENV.BASE_URL);
    }

    /**
     * Realiza o fluxo de preenchimento usando as constantes do ENV
     * Isso permite que você chame o método sem precisar passar parâmetros nos steps
     */
    async realizarLoginComSucesso(): Promise<void> {
        await this.driver.wait(until.elementLocated(this.campoUsuario), 20000);
        
        const userField = await this.driver.findElement(this.campoUsuario);
        const passField = await this.driver.findElement(this.campoSenha);
        const btnLogin  = await this.driver.findElement(this.botaoAcessar);

        // Aqui usamos os dados do arquivo de configuração
        await userField.clear();
        await userField.sendKeys(ENV.USER_ADMIN);
        
        await passField.clear();
        await passField.sendKeys(ENV.PASS_ADMIN);
        
        await btnLogin.click();
    }

    /**
     * Validação robusta de sucesso no login.
     */
    async validarAcessoHome(tituloEsperado: string): Promise<boolean> {
        try {
            // Aguarda a URL mudar para o padrão do ambiente configurado
            await this.driver.wait(until.urlContains('premmia/meuposto'), ENV.TIMEOUT);
            
            const seletorXPath = By.xpath(`//h2[contains(text(), '${tituloEsperado}')]`);
            const elemento = await this.driver.wait(until.elementLocated(seletorXPath), 15000);
            
            return await elemento.isDisplayed();
        } catch (error) {
            const urlAtual = await this.driver.getCurrentUrl();
            console.error(`Falha no redirecionamento. URL: ${urlAtual}`);
            return false;
        }
    }

    // Adicione este método dentro da classe LoginPage
    async obterTextoTitulo(): Promise<string> {
        const elemento = await this.driver.wait(until.elementLocated(this.tituloCanal), 15000);
        return await elemento.getText();
    }
}