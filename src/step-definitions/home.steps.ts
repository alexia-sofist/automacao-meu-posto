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