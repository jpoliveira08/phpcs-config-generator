const defaultApiUrl = 'https://api.github.com/repos/PHPCSStandards/PHP_CodeSniffer/contents';
const defaultBranch = 'master';
const standardsPath = 'src/Standards';
const $standardsSelect = $("#standards-select");
const $sniffsTypesSelect = $("#sniffs-types-select");

let formatDataToSelect = (data, value, text) => {
    if (!data) {
        return [];
    };

    let dataFormatted = data.map(item => {
        return {
            id: item[value],
            text: item[text]
        };
    });

    return dataFormatted;
}

$('#standards-select').select2({
    ajax: {
        url: `${defaultApiUrl}/${standardsPath}?ref=${defaultBranch}`,
        dataType: 'json',
        processResults: data => {
            return {
                results: formatDataToSelect(data, 'name', 'name')
            }
        }
    }
});


let urlSniffsTypesByStandard;

$('#standards-select').on("change", function (e) {
    urlSniffsTypesByStandard = `${defaultApiUrl}/${standardsPath}/${this.value}/Sniffs?ref=${defaultBranch}`;
});

$('#sniffs-group-select').select2({
    ajax: {
        url: () => urlSniffsTypesByStandard,
        dataType: 'json',
        processResults: response => {
            return {
                results: formatDataToSelect(response, 'name', 'name')
            }
        }
    }
});

// Pegar as a combinação Standard + Sniff Group fazer a requisição para obter todos os arquivos da pasta
// Pegar todos os arquivos da pasta e ler localmente com fetch /Standards/{Stantard}/Sniffs/{SniffGroup}/Doc.xml