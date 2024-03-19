const defaultApiUrl = 'https://api.github.com/repos/PHPCSStandards/PHP_CodeSniffer/contents';
const defaultBranch = 'master';
const standardsPath = 'src/Standards';
const $standardsSelect = $("#standards-select");
const $sniffsTypesSelect = $("#sniffs-types-select");
let allSniffsTypesByStandard = {};

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

        allSniffsTypesByStandard = await Promise.all(standards.map(async standard => {
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

const fillStandardsSelect = async () => {
    try {
        const standards = await getAllStandards();

        $standardsSelect.select2({
            data: formatDataToSelect(standards, 'name', 'name')
        });
        $standardsSelect.trigger('change');
    } catch (error) {
        console.error('Error: ', error);
    }
};

getAllSniffsTypesByStandard();
fillStandardsSelect();

$standardsSelect.on('change', async function () {
    if (!allSniffsTypesByStandard) {
        return;
    }
    $sniffsTypesSelect.select2().empty();

    let selectedStandard = $standardsSelect.val();

    let sniffsTypesByStandard = allSniffsTypesByStandard.filter(standard => {
        return standard[0].standard === selectedStandard;
    });

    $sniffsTypesSelect.select2({
        data: formatDataToSelect(sniffsTypesByStandard[0], 'sniffType', 'sniffType')
    });
});