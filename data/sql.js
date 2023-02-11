module.exports = [
    {
        regex: '(%27)|(\')|(--)|(%23)|(#)',
        flag: 'ig',
        level: 1
    },
    {
        regex: '((%3D)|(=))[^\n]*((%27)|(\')|(--)|(%3B)|(;))',
        flag: 'ig',
        level: 1
    },
    {
        regex: 'w*((%27)|(\'))((%6F)|o|(%4F))((%72)|r|(%52))',
        flag: 'ig',
        level: 1
    },
    {
        regex: '((%27)|(\'))union',
        flag: 'ig',
        level: 4
    },
    {
        regex: '((%27)|(\'))select',
        flag: 'ig',
        level: 4
    },
    {
        regex: '((%27)|(\'))insert',
        flag: 'ig',
        level: 3
    },
    {
        regex: '((%27)|(\'))update',
        flag: 'ig',
        level: 3
    },
    {
        regex: '((%27)|(\'))delete',
        flag: 'ig',
        level: 3
    },
    {
        regex: '((%27)|(\'))drop',
        flag: 'ig',
        level: 2
    },
    {
        regex: '((%27)|(\'))truncate',
        flag: 'ig',
        level: 2
    },
    {
        regex: '((%27)|(\'))table',
        flag: 'ig',
        level: 2
    },
    {
        regex: '((%27)|(\'))from',
        flag: 'ig',
        level: 5
    },
    {
        regex: '((%27)|(\'))where',
        flag: 'ig',
        level: 5
    },
    {
        regex: '((%27)|(\'))group',
        flag: 'ig',
        level: 4
    },
    {
        regex: '((%27)|(\'))by',
        flag: 'ig',
        level: 4
    },
    {
        regex: '((%27)|(\'))order',
        flag: 'ig',
        level: 4
    },
    {
        regex: '((%27)|(\'))limit',
        flag: 'ig',
        level: 4
    },
    {
        regex: '((%27)|(\'))having',
        flag: 'ig',
        level: 4
    },
    {
        regex: '((%27)|(\'))like',
        flag: 'ig',
        level: 4
    },
    {
        regex: '((%27)|(\'))into',
        flag: 'ig',
        level: 3
    },
    {
        regex: '((%27)|(\'))load',
        flag: 'ig',
        level: 5
    },
    {
        regex: '((%27)|(\'))outfile',
        flag: 'ig',
        level: 5
    },
    {
        regex: '((%27)|(\'))or',
        flag: 'ig',
        level: 4
    },
    {
        regex: '((%27)|(\'))and',
        flag: 'ig',
        level: 4
    },
    {
        regex: '((%27)|(\'))xor',
        flag: 'ig',
        level: 4
    },
    {
        regex: '((%27)|(\'))not',
        flag: 'ig',
        level: 4
    },
    {
        regex: '((%27)|(\'))exists',
        flag: 'ig',
        level: 4
    },
    {
        regex: "'",
        flag: 'ig',
        level: 5
    },
    {
        regex: "''",
        flag: 'ig',
        level: 5
    },
    {
        regex: '"',
        flag: 'ig',
        level: 5
    },
    {
        regex: '""',
        flag: 'ig',
        level: 5
    },
    {
        regex: '/',
        flag: 'ig',
        level: 5
    },
    {
        regex: '//',
        flag: 'ig',
        level: 5
    },
    {
        regex: ';',
        flag: 'ig',
        level: 1
    },
    {
        regex: '-- or # ',
        flag: 'ig',
        level: 1
    },
    {
        regex: "' OR '1",
        flag: 'ig',
        level: 1
    },
    {
        regex: "' OR 1 -- -",
        flag: 'ig',
        level: 5
    },
    {
        regex: '" OR "" = "',
        flag: 'ig',
        level: 5
    },
    {
        regex: '" OR 1 = 1',
        flag: 'ig',
        level: 5
    },
    {
        regex: "' OR '' = '",
        flag: 'ig',
        level: 5
    },
    {
        regex: 'select',
        flag: 'ig',
        level: 5
    },
    {
        regex: "'='",
        flag: 'ig',
        level: 5
    },
    {
        regex: "'LIKE'",
        flag: 'ig',
        level: 5
    },
    {
        regex: "'=0--+",
        flag: 'ig',
        level: 5
    },
    {
        regex: " OR 1=1",
        flag: 'ig',
        level: 5
    },
    {
        regex: "' OR 'x'='x",
        flag: 'ig',
        level: 5
    },
    {
        regex: "' AND id IS NULL;",
        flag: 'ig',
        level: 5
    },
    {
        regex: "'''''''''''''UNION SELECT '2",
        flag: 'ig',
        level: 5
    },
    {
        regex: '%00',
        flag: 'ig',
        level: 5
    },
    {
        regex: '/*…*/',
        flag: 'ig',
        level: 5
    },
    {
        regex: '||',
        flag: 'ig',
        level: 5
    },
    {
        regex: '%',
        flag: 'ig',
        level: 5
    },
    {
        regex: '@variable',
        flag: 'ig',
        level: 5
    },
    {
        regex: '@@variable',
        flag: 'ig',
        level: 5
    },
    {
        regex: '# Numeric',
        flag: 'ig',
        level: 5
    },
    {
        regex: 'AND 1',
        flag: 'ig',
        level: 5
    },
    {
        regex: 'AND 0',
        flag: 'ig',
        level: 5
    },
    {
        regex: 'AND true',
        flag: 'ig',
        level: 5
    },
    {
        regex: 'AND false',
        flag: 'ig',
        level: 5
    },
    {
        regex: '1-false',
        flag: 'ig',
        level: 5
    },
    {
        regex: '1-true',
        flag: 'ig',
        level: 5
    },
    {
        regex: 'ORDER BY',
        flag: 'ig',
        level: 4
    },
    {
        regex: 'GROUP BY',
        flag: 'ig',
        level: 4
    },
    {
        regex: '1=1',
        flag: 'ig',
        level: 5
    },
    {
        regex: 'UNION',
        flag: 'ig',
        level: 4
    },
    {
        regex: 'SELECT',
        flag: 'ig',
        level: 4
    },
    {
        regex: 'sum',
        flag: 'ig',
        level: 4
    },
    {
        regex: 'tablename',
        flag: 'ig',
        level: 4
    },
    {
        regex: 'columnname',
        flag: 'ig',
        level: 4
    },
    {
        regex: 'drop',
        flag: 'ig',
        level: 2
    },
    {
        regex: 'create table',
        flag: 'ig',
        level: 2
    },
    {
        regex: '-1 UNION SELECT 1 INTO @,@',
        flag: 'ig',
        level: 5
    },
    {
        regex: '-1 UNION SELECT 1 INTO @,@,@',
        flag: 'ig',
        level: 5
    },
    {
        regex: 'VERSION()',
        flag: 'ig',
        level: 5
    },
    {
        regex: 'sysobjects',
        flag: 'ig',
        level: 5
    },
    {
        regex: '>',
        flag: 'ig',
        level: 5
    },
    {
        regex: 'sleep',
        flag: 'ig',
        level: 5
    },
    {
        regex: 'select%20',
        flag: 'ig',
        level: 5
    },
    {
        regex: 'WAITFOR',
        flag: 'ig',
        level: 5
    },
    {
        regex: '#',
        flag: 'ig',
        level: 5
    },
    {
        regex: '/*',
        flag: 'ig',
        level: 5
    },
    {
        regex: '-- -',
        flag: 'ig',
        level: 5
    },
    {
        regex: ';%00',
        flag: 'ig',
        level: 5
    },
    {
        regex: '=',
        flag: 'ig',
        level: 5
    },
    {
        regex: 'HAVING',
        flag: 'ig',
        level: 4
    },
    {
        regex: 'LIKE',
        flag: 'ig',
        level: 4
    },
    {
        regex: '1=0#',
        flag: 'ig',
        level: 5
    },
    {
        regex: '1=1--',
        flag: 'ig',
        level: 5
    },
    {
        regex: '1=0--',
        flag: 'ig',
        level: 5
    },
    {
        regex: 'pKlZ',
        flag: 'ig',
        level: 5
    },
    {
        regex: 'INJECTX',
        flag: 'ig',
        level: 5
    },
    {
        regex: '--',
        flag: 'ig',
        level: 5
    },
    {
        regex: 'RLIKE',
        flag: 'ig',
        level: 5
    },
    {
        regex: 'CASE',
        flag: 'ig',
        level: 5
    },
    {
        regex: 'Txws',
        flag: 'ig',
        level: 5
    },
    {
        regex: '0x28',
        flag: 'ig',
        level: 5
    },
    {
        regex: 'xcjl',
        flag: 'ig',
        level: 5
    },
    {
        regex: "%'",
        flag: 'ig',
        level: 5
    },
    {
        regex: '@@version',
        flag: 'ig',
        level: 5
    },
    {
        regex: 'substring',
        flag: 'ig',
        level: 5
    },
    {
        regex: 'delay',
        flag: 'ig',
        level: 5
    },
    {
        regex: 'benchmark',
        flag: 'ig',
        level: 5
    },
    {
        regex: 'MD5',
        flag: 'ig',
        level: 5
    },
    {
        regex: 'pg_sleep',
        flag: 'ig',
        level: 5
    },
    {
        regex: 'pg_sleep',
        flag: 'ig',
        level: 5
    },
    {
        regex: 'bAKL',
        flag: 'ig',
        level: 5
    },
    {
        regex: 'YjoC',
        flag: 'ig',
        level: 5
    },
    {
        regex: 'nQIP',
        flag: 'ig',
        level: 5
    },
    {
        regex: '&&SLEEP',
        flag: 'ig',
        level: 5
    },
    {
        regex: 'ecMj',
        flag: 'ig',
        level: 5
    },
    {
        regex: 'RANDOMBLOB',
        flag: 'ig',
        level: 5
    },
    {
        regex: 'HEX',
        flag: 'ig',
        level: 5
    },
    {
        regex: 'UPPER',
        flag: 'ig',
        level: 5
    },
    {
        regex: '"*/',
        flag: 'ig',
        level: 5
    },
    {
        regex: 'UNION ALL',
        flag: 'ig',
        level: 5
    },
    {
        regex: 'UNION SELECT',
        flag: 'ig',
        level: 5
    },
    {
        regex: 'USER()',
        flag: 'ig',
        level: 5
    },
    {
        regex: 'CONVERT',
        flag: 'ig',
        level: 5
    },
    {
        regex: 'CHAR',
        flag: 'ig',
        level: 5
    },
    {
        regex: 'SELECTCHAR',
        flag: 'ig',
        level: 5
    },
    {
        regex: 'SELECT NULL',
        flag: 'ig',
        level: 5
    },
    {
        regex: 'ELT',
        flag: 'ig',
        level: 5
    },
    {
        regex: 'FLOOR',
        flag: 'ig',
        level: 5
    },
    {
        regex: 'INJ',
        flag: 'ig',
        level: 5
    },
    {
        regex: '"*"',
        flag: 'ig',
        level: 5
    },
    {
        regex: '"-"',
        flag: 'ig',
        level: 5
    },
    {
        regex: '"&"',
        flag: 'ig',
        level: 5
    },
    {
        regex: '"^"',
        flag: 'ig',
        level: 5
    },
    {
        regex: '"*"',
        flag: 'ig',
        level: 5
    },
    {
        regex: 'insert',
        flag: 'ig',
        level: 3
    },

]