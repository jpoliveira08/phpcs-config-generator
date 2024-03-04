const defaultApiUrl = 'https://api.github.com/repos/PHPCSStandards/PHP_CodeSniffer/contents/';
const defaultBranch = 'master';
const standardsPath = 'src/Standards';

let formatData = (data, value, text) => {
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

fetch(`${defaultApiUrl}${standardsPath}?ref=${defaultBranch}`)
    .then(response => {
        return response.json();
    })
    .then(standards => {
        $("#standards-select").select2({
            data: formatData(standards, 'name', 'name')
        });
    })
    .catch(error => {
        console.error('Error: ', error);
    });

