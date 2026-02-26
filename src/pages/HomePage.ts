import { By, WebDriver, until } from 'selenium-webdriver';

export class HomePage {
    private driver: WebDriver;

    constructor(driver: WebDriver) {
        this.driver = driver;
    }

    /**
     * Valida o título principal (H2) exigindo correspondência EXATA.
     */
    async validarAcessoHome(tituloEsperado: string): Promise<boolean> {
        try {
            return await this.driver.wait(async () => {
                const titulos = await this.driver.findElements(By.css('h2'));
                for (const titulo of titulos) {
                    const texto = (await titulo.getText()).trim();
                    // Comparação exata caractere por caractere
                    if (texto === tituloEsperado.trim()) return true;
                }
                return false;
            }, 15000);
        } catch (error) {
            return false;
        }
    }

    /**
     * Valida a descrição da Home exigindo igualdade total após limpeza de espaços.
     */
    async validarDescricaoHome(descricaoEsperada: string): Promise<boolean> {
        try {
            await this.driver.wait(until.urlContains('/meuposto'), 10000);
            await this.driver.sleep(2000);

            // Localizamos o elemento, mas a validação final é feita pelo texto exato
            const xpathP = By.xpath("//p[contains(text(), 'Acompanhe a performance')]");
            const elemento = await this.driver.wait(until.elementLocated(xpathP), 15000);

            const textoReal = (await elemento.getText()).replace(/\s+/g, ' ').trim();
            const textoEsperadoLimpo = descricaoEsperada.replace(/\s+/g, ' ').trim();

            return textoReal === textoEsperadoLimpo;
        } catch (error) {
            return false;
        }
    }

    /**
     * Valida os cards usando comparação estrita para Título e Descrição.
     */
    async validarCardPorId(idComponente: string, tituloEsperado: string, descricaoEsperada: string): Promise<boolean> {
        const seletorCard = By.css(`[data-tour-step-id="${idComponente}"]`);
        try {
            const card = await this.driver.wait(until.elementLocated(seletorCard), 10000);
            await this.driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", card);
        
            const tituloReal = (await card.findElement(By.css('h3')).getText()).trim();
            const descricaoReal = (await card.findElement(By.css('p')).getText()).trim();

            // Validação exata em ambos os campos
            return tituloReal === tituloEsperado.trim() && descricaoReal === descricaoEsperada.trim();
        } catch (error) {
            return false;
        }
    }

    /**
     * Valida o subtítulo de ajuda exigindo o texto idêntico (incluindo pontuação).
     */
    async validarSubtituloAjuda(textoEsperado: string): Promise<boolean> {
        try {
            // XPath alterado para buscar o texto EXATO
            const xpathExato = `//h2[text()="${textoEsperado.trim()}"]`;
            const elemento = await this.driver.wait(until.elementLocated(By.xpath(xpathExato)), 10000);

            await this.driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", elemento);
            await this.driver.sleep(1000);

            const textoReal = (await elemento.getText()).trim();
            return textoReal === textoEsperado.trim();
        } catch (error) {
            console.error(`[FALHA] Subtítulo exato não encontrado: "${textoEsperado}"`);
            return false;
        }
    }

    /**
     * Valida o título do card de atendimento exigindo correspondência idêntica.
     */
    async validarTituloCardAtendimento(tituloEsperado: string): Promise<boolean> {
        try {
            // XPath alterado para busca de igualdade absoluta
            const xpathExato = `//h3[text()="${tituloEsperado.trim()}"]`;
            const elemento = await this.driver.wait(until.elementLocated(By.xpath(xpathExato)), 10000);

            await this.driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", elemento);
            
            const textoReal = (await elemento.getText()).trim();
            return textoReal === tituloEsperado.trim();
        } catch (error) {
            return false;
        }
    }

    async clicarAcessarDoCard(idComponente: string): Promise<void> {
        const urlOriginal = await this.driver.getCurrentUrl();
        const seletorBotao = By.css(`[data-tour-step-id="${idComponente}"] a`);
        const actions = this.driver.actions({ bridge: true });

        try {
            const botao = await this.driver.wait(until.elementLocated(seletorBotao), 10000);
            await this.driver.executeScript("arguments[0].scrollIntoView({block: 'center', behavior: 'smooth'});", botao);
            await this.driver.sleep(800); 

            await actions.move({ origin: botao }).click().perform();

            await this.driver.wait(async () => {
                return (await this.driver.getCurrentUrl()) !== urlOriginal;
            }, 15000);
            
            await this.driver.sleep(1000); 
        } catch (error) {
            const fallback = await this.driver.findElement(seletorBotao);
            await this.driver.executeScript("arguments[0].click();", fallback);
        }
    }

    async validarCardAtendimentoCompleto(dados: any): Promise<boolean> {
        try {
            // 1. Título do Card
            const titulo = await this.driver.wait(until.elementLocated(
                By.xpath(`//h3[normalize-space()="${dados.titulo}"]`)), 7000);
            await this.driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", titulo);

            // 2. Texto do E-mail
            await this.driver.findElement(By.xpath(`//*[normalize-space()="${dados.textoEmail}"]`));

            // 3. Link do E-mail
            await this.driver.findElement(By.xpath(`//a[normalize-space()="${dados.email}"]`));

            // 4. Texto do Telefone ("ou pelo telefone:")
            await this.driver.findElement(By.xpath(`//*[normalize-space()="${dados.textoTelefone}"]`));

            // 5. Números de Telefone
            await this.driver.findElement(By.xpath(`//a[normalize-space()="${dados.tel1}"]`));
            await this.driver.findElement(By.xpath(`//a[normalize-space()="${dados.tel2}"]`));

            // 6. O separador "/" (Busca genérica por nó de texto)
            await this.driver.findElement(By.xpath(`//*[text()="/"]`));

            return true;
        } catch (error) {
            console.error(`[FALHA NO CARD] Detalhe: ${error}`);
            return false;
        }
    }

    /**
     * Valida o nome do posto no cabeçalho de forma genérica.
     *
     */
    async validarNomePosto(nomeEsperado: string): Promise<boolean> {
        try {
            // Seletor baseado nas classes identificadas no console
            const seletor = By.xpath(`//p[contains(@class, 'truncate') and contains(text(), "${nomeEsperado.trim()}")]`);
            const elemento = await this.driver.wait(until.elementLocated(seletor), 20000);
            
            const textoReal = (await elemento.getText()).trim();
            
            // Validação exata para garantir que o código do posto (ex: 19105) também esteja correto
            return textoReal === nomeEsperado.trim();
        } catch (error) {
            console.error(`[ERRO] Nome do posto esperado "${nomeEsperado}" não encontrado.`);
            return false;
        }
    }

    /**
     * Realiza o clique no botão de seleção de posto para abrir o menu.
     *
     */
    async clicarBotaoSelecaoPosto(): Promise<void> {
        try {
            // Seletor do botão que abre o menu (Voltar/Sair)
            const seletorBotao = By.css('button[aria-haspopup="menu"]');
            const botao = await this.driver.wait(until.elementLocated(seletorBotao), 10000);

            // Simula o hover e o clique
            const actions = this.driver.actions({ bridge: true });
            await actions.move({ origin: botao }).perform();
            await this.driver.sleep(500);
            await botao.click();
            
            await this.driver.sleep(1000);
        } catch (error) {
            // Fallback via JS caso o clique normal falhe
            const fallback = await this.driver.findElement(By.css('button[aria-haspopup="menu"]'));
            await this.driver.executeScript("arguments[0].click();", fallback);
        }
    }

/**
     * Valida se as opções do menu de postos apareceram corretamente.
     *
     */
    async validarOpcoesMenuPosto(opcao1: string, opcao2: string): Promise<boolean> {
        try {
            // Usamos normalize-space para ignorar espaços em branco extras no menu
            const xpathOpcao1 = `//div[@role="menuitem"][normalize-space()="${opcao1.trim()}"]`;
            const xpathOpcao2 = `//div[@role="menuitem"][normalize-space()="${opcao2.trim()}"]`;

            // Aguarda os elementos aparecerem após a animação do menu
            const el1 = await this.driver.wait(until.elementLocated(By.xpath(xpathOpcao1)), 10000);
            const el2 = await this.driver.wait(until.elementLocated(By.xpath(xpathOpcao2)), 10000);

            // Garante visibilidade física antes de confirmar
            return await el1.isDisplayed() && await el2.isDisplayed();
        } catch (error) {
            console.error(`[ERRO MENU] Não encontrei as opções: ${opcao1} ou ${opcao2}`);
            return false;
        }
    }

    /**
     * Clica na opção "Voltar" do menu e valida se a Home foi carregada.
     */
    /**
     * Clica na opção "Voltar" do menu e garante que a Home está visível.
     *
     */
}