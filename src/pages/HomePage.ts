import { By, WebDriver, until } from 'selenium-webdriver';

export class HomePage {
    private driver: WebDriver;

    constructor(driver: WebDriver) {
        this.driver = driver;
    }

    /**
     * Valida o título principal (H2) de qualquer página de forma flexível.
     */
    async validarAcessoHome(tituloEsperado: string): Promise<boolean> {
        const buscaLimpa = tituloEsperado.toLowerCase().trim();
        try {
            return await this.driver.wait(async () => {
                const titulos = await this.driver.findElements(By.css('h2'));
                for (const titulo of titulos) {
                    const texto = await titulo.getText();
                    if (texto.toLowerCase().trim().includes(buscaLimpa)) return true;
                }
                return false;
            }, 15000);
        } catch (error) {
            return false;
        }
    }

    /**
     * Valida a descrição da Home (subtítulo) usando XPath e normalização de texto.
     * Esta versão é imune a quebras de linha e espaços fantasmas.
     */
    async validarDescricaoHome(descricaoEsperada: string): Promise<boolean> {
        try {
            // Aguarda a URL estabilizar na Home antes de buscar o texto
            await this.driver.wait(until.urlContains('/meuposto'), 10000);
            
            // Pausa técnica para garantir que o portal renderizou o conteúdo dinâmico
            await this.driver.sleep(2000);

            // Busca o parágrafo que contém a parte principal do texto
            const xpathDescricao = By.xpath("//p[contains(text(), 'Acompanhe a performance')]");
            const elemento = await this.driver.wait(until.elementLocated(xpathDescricao), 15000);
            await this.driver.wait(until.elementIsVisible(elemento), 5000);

            // Limpa o texto real e o esperado para uma comparação justa
            const textoReal = (await elemento.getText()).replace(/\s+/g, ' ').trim();
            const textoEsperadoLimpo = descricaoEsperada.replace(/\s+/g, ' ').trim();

            console.log(`      [DEBUG] Texto capturado: "${textoReal}"`);

            return textoReal === textoEsperadoLimpo;
        } catch (error) {
            const url = await this.driver.getCurrentUrl();
            console.error(`      [FALHA] Descrição não encontrada ou URL incorreta: ${url}`);
            return false;
        }
    }

    /**
     * Valida a integridade visual dos cards (Título H3 e Descrição P).
     * Usa comparação exata (===) para garantir que nada falte.
     */
    async validarCardPorId(idComponente: string, tituloEsperado: string, descricaoEsperada: string): Promise<boolean> {
        const seletorCard = By.css(`[data-tour-step-id="${idComponente}"]`);
        try {
            const card = await this.driver.wait(until.elementLocated(seletorCard), 10000);
            await this.driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", card);
        
            const tituloReal = (await card.findElement(By.css('h3')).getText()).trim();
            const descricaoReal = (await card.findElement(By.css('p')).getText()).trim();

            const valido = tituloReal === tituloEsperado.trim() && descricaoReal === descricaoEsperada.trim();

            if (!valido) {
                console.error(`      [ERRO DE CONTEÚDO] Card: ${idComponente} | Recebido: "${tituloReal}"`);
            }
            return valido;
        } catch (error) {
            return false;
        }
    }

    /**
     * Realiza a navegação simulando o movimento do mouse (hover) antes do clique.
     * Possui fallback para clique via JavaScript caso o mouse seja bloqueado.
     */
    async clicarAcessarDoCard(idComponente: string): Promise<void> {
        const urlOriginal = await this.driver.getCurrentUrl();
        const seletorBotao = By.css(`[data-tour-step-id="${idComponente}"] a`);
        const actions = this.driver.actions({ bridge: true });

        try {
            const botao = await this.driver.wait(until.elementLocated(seletorBotao), 10000);
            
            // Scroll suave para melhor visualização
            await this.driver.executeScript("arguments[0].scrollIntoView({block: 'center', behavior: 'smooth'});", botao);
            await this.driver.sleep(800); 

            // Simulação de interação física
            await actions.move({ origin: botao }).click().perform();

            // Aguarda a URL mudar para confirmar o redirecionamento
            await this.driver.wait(async () => {
                return (await this.driver.getCurrentUrl()) !== urlOriginal;
            }, 15000);
            
            await this.driver.sleep(1000); 
        } catch (error) {
            // Clique forçado via JS em caso de falha na simulação
            const fallback = await this.driver.findElement(seletorBotao);
            await this.driver.executeScript("arguments[0].click();", fallback);
        }
    }
}