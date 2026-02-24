const reporter = require('cucumber-html-reporter');

const options = {
    theme: 'bootstrap',
    jsonFile: './reports/cucumber_report.json', // Adicionamos o ./ para garantir o caminho relativo
    output: './reports/cucumber_report.html',
    reportSuiteAsScenarios: true,
    scenarioTimestamp: true,
    launchReport: true,
    metadata: {
        "App": "Meu Posto - Vibra",
        "Ambiente": "Homologação",
        "Browser": "Chrome",
        "Execução": "Local"
    }
};

reporter.generate(options);