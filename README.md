Utilizar a API do github para obter os arquivos

# Para listar os padrões existentes
https://api.github.com/repos/PHPCSStandards/PHP_CodeSniffer/contents/src/Standards?ref=master

# Para listar todos os tipos de configuração que existem em um padrão
https://api.github.com/repos/PHPCSStandards/PHP_CodeSniffer/contents/src/Standards/{Padrão}/Docs?ref=master

# Para listar todas as configurações de um tipo de configuração de um padrão
https://api.github.com/repos/PHPCSStandards/PHP_CodeSniffer/contents/src/Standards/{Padrão}/Docs/{TipoConfiguração}?ref=master

# Para obter dados de um padrão xml
https://raw.githubusercontent.com/PHPCSStandards/PHP_CodeSniffer/master/src/Standards/{Padrão}/Docs/{TipoConfiguração}/DisallowLongArraySyntaxStandard.xml

