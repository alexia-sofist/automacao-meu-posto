import { When, Then, DataTable } from '@cucumber/cucumber';
import { expect } from 'chai';
import { homePage } from './hooks';
import { ENV } from '../config/env';

Then('sou redirecionado para a tela {string} para confirmar o acesso', async function (titulo) {
    const sucesso = await homePage.validarAcessoHome(titulo);
    expect(sucesso, `Título "${titulo}" não encontrado.`).to.be.true;
});

Then('eu devo visualizar a descrição {string}', async function (descricao) {
    const sucesso = await homePage.validarDescricaoHome(descricao);
    expect(sucesso, `Descrição da Home divergente ou não encontrada.`).to.be.true;
});

Then('o sistema deve exibir corretamente os seguintes cards:', async function (tabela: DataTable) {
    const linhas = tabela.hashes();
    for (const linha of linhas) {
        const componenteKey = linha.componente as keyof typeof ENV.COMPONENTS;
        const idTecnico = ENV.COMPONENTS[componenteKey];
        
        const resultado = await homePage.validarCardPorId(idTecnico, linha.titulo, linha.descricao);
        expect(resultado, `Erro visual no card: ${linha.titulo}`).to.be.true;
    }
});

When('eu clico no botão Acessar do card {string}', async function (componente) {
    const componenteKey = componente as keyof typeof ENV.COMPONENTS;
    const idTecnico = ENV.COMPONENTS[componenteKey];
    await homePage.clicarAcessarDoCard(idTecnico);
});

Then('sou redirecionado para a página com o título {string}', async function (tituloEsperado) {
    const passou = await homePage.validarAcessoHome(tituloEsperado);
    expect(passou, `Redirecionamento para "${tituloEsperado}" falhou.`).to.be.true;
});

Then('eu devo visualizar o subtítulo de ajuda {string}', async function (texto) {
    const visivel = await homePage.validarSubtituloAjuda(texto);
    expect(visivel, `O subtítulo "${texto}" não foi encontrado ou não está visível.`).to.be.true;
});

Then('eu devo visualizar no card de atendimento o título {string}', async function (titulo) {
    const sucesso = await homePage.validarTituloCardAtendimento(titulo);
    expect(sucesso, `O título do card "${titulo}" não foi encontrado.`).to.be.true;
});

Then('eu valido todas as informações do card de atendimento ao revendedor', async function () {
    const dadosEsperados = {
        titulo: "Central de Atendimento ao Revendedor",
        textoEmail: "E-mail exclusivo para atendimento App Premmia:",
        email: "atpetrobraspremmia@vibraenergia.com.br",
        textoTelefone: "ou pelo telefone:",
        tel1: "4002 2040",
        tel2: "0800 282 204"
    };

    const resultado = await homePage.validarCardAtendimentoCompleto(dadosEsperados);
    expect(resultado, "As informações do card de atendimento não conferem com o esperado.").to.be.true;
});

Then('eu devo visualizar o nome do posto {string} no cabeçalho', async function (nomePosto) {
    const valido = await homePage.validarNomePosto(nomePosto);
    expect(valido, `O posto "${nomePosto}" não foi encontrado no cabeçalho.`).to.be.true;
});

When('eu clico no botão de seleção de posto no cabeçalho', async function () {
    // Chama o método que criamos na HomePage para clicar no menu do posto
    await homePage.clicarBotaoSelecaoPosto();
});

Then('eu devo visualizar as opções {string} e {string} no menu do posto', async function (op1, op2) {
    const visivel = await homePage.validarOpcoesMenuPosto(op1, op2);
    expect(visivel, `As opções "${op1}" e "${op2}" não apareceram no menu.`).to.be.true;
});