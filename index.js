const urlStandards = 'https://api.github.com/repos/PHPCSStandards/PHP_CodeSniffer/contents/src/Standards?ref=master';

$('#standards-select').select2({
    ajax: {
        url: urlStandards,
        dataType: 'json',
        processResults: data => {
            const StandardsOptionsFormatted = data.map(standard => {
                return {
                    id: standard.name,
                    text: standard.name
                }
            });

            return {
                results: StandardsOptionsFormatted
            };
        }
    }
});


$(document).ready(function() {
    let selectStandardValue = '';

    $('#standards-select').change(function() {
        let selectStandardValue = $(this).val();

        if (selectStandardValue) {
            let urlSettings = `https://api.github.com/repos/PHPCSStandards/PHP_CodeSniffer/contents/src/Standards/${selectStandardValue}/Docs?ref=master`;
            $('#settings-select').select2({
                ajax: {
                    url: urlSettings,
                    dataType: 'json',
                    processResults: data => {
                        let SettingsOptionsFormatted = data.map(setting => {
                            return {
                                id: setting.name,
                                text: setting.name
                            }
                        });

                        return {
                            results: SettingsOptionsFormatted
                        };
                    }
                }
            });
        }
    });

    $('#settings-select').change(function() {
        let selectedSettingValue = $(this).val();
        console.log(selectedSettingValue);

        if (selectedSettingValue) {
            let urlRules = `https://api.github.com/repos/PHPCSStandards/PHP_CodeSniffer/contents/src/Standards/${selectStandardValue}/Docs/${selectedSettingValue}?ref=master`;
            $('#myTable').DataTable({
                type: 'GET',
                ajax: urlRules,
                dataType: 'json',
                dataSrc: data => {
                    console.log(data);
                }
            } );
        }
    });
});

