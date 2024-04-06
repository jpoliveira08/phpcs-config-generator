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

$('#standards-select').on('change', function (e) {
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

const parser = new DOMParser();

$('#sniffs-group-select').on('change', async function (e) {
    let selectedStandard = $standardsSelect.val();
    let selectedSniffGroup = this.value;

    let sniffsByStandardAndGroupURL = `${defaultApiUrl}/${standardsPath}/${selectedStandard}/Docs/${selectedSniffGroup}?ref=${defaultBranch}`;
    
    try {
        let sniffsByStandardAndGroupRequest = await fetch(sniffsByStandardAndGroupURL);
        let sniffsByStandardAndGroup = await sniffsByStandardAndGroupRequest.json();

        let formattedDataToDatatable = await Promise.all(sniffsByStandardAndGroup.map(async sniff => {
            let sniffDocsPath = sniff.path.replace('src/', '');

            let sniffDocsFile = await fetch(sniffDocsPath);
            let sniffDocsFileContent = await sniffDocsFile.text();
            let sniffDocsFileParsed = parser.parseFromString(sniffDocsFileContent, 'text/xml');

            return {
                title: sniffDocsFileParsed.querySelector('documentation').getAttribute('title'),
                description: sniffDocsFileParsed.querySelector('standard').textContent
                //example: sniffDocsFileParsed.querySelector('code_comparison')
            }
        }));

        let SniffDataTable = new DataTable('#sniffs-table', {
            data: formattedDataToDatatable,
            columnDefs: [
                {
                    "defaultContent": "-",
                    "targets": "_all"
                },
                {
                    data: 'title',
                    targets: 0
                },
                {
                    data: 'description',
                    targets: 1
                },
                {
                    data: null,
                    render: (data, type, row) => {
                        return '<button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#sniff_example"><i class="fa-regular fa-eye"></i></button>'
                    },
                    targets: 2,
                    className: "text-center"
                }
            ]
        })

    } catch (error) {
        console.log('Error', error)
    }

});