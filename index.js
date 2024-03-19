const defaultApiUrl = 'https://api.github.com/repos/PHPCSStandards/PHP_CodeSniffer/contents';
const defaultBranch = 'master';
const standardsPath = 'src/Standards';

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

const getAllStandards = async () => {
    try {
        const response = await fetch(`${defaultApiUrl}/${standardsPath}?ref=${defaultBranch}`);
        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Error: ', error);
    }
}

const getAllSniffsTypesByStandard = async () => {
    try {
        standards = await getAllStandards();
        let allSniffsTypesByStandard = {};

        return await Promise.all(standards.map(async standard => {
            const allSniffsTypesByStandardRequest = await fetch(`${defaultApiUrl}/${standardsPath}/${standard.name}/Sniffs?ref=${defaultBranch}`);
            const allSniffsTypesByStandardResponse = await allSniffsTypesByStandardRequest.json();

            return await Promise.all(allSniffsTypesByStandardResponse.map(async sniffType => {
                return {
                    standard: standard.name,
                    sniffType: sniffType.name
                }
            }))
        }));

    } catch (error) {
        console.error('Error: ', error);
    }
}
// Generic.Arrays
// Generic.Classes
// https://api.github.com/repos/PHPCSStandards/PHP_CodeSniffer/contents/src/Standards/{Padrão}/Sniffs?ref=master

// Pegamos todos os standards, que ira retornar (Generic, MySource)
// Vamos criar um objeto de acordo com o standard e preencher com todas as suas settings
// Vamos criar um objeto de acordo com o standard => settings e listar todas as rules.

//fetch(`${defaultApiUrl}${standardsPath}?ref=${defaultBranch}`)
//    .then(response => {
//        return response.json();
//    })
//    .then(standards => {
//        $("#standards-select").select2({
//            data: formatData(standards, 'name', 'name')
//        });
//    })
//    .catch(error => {
//        console.error('Error: ', error);
//    });

// Vamos carregar todos os dados e depois separar