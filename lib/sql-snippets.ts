export const SQL_SNIPPETS = [
    {
        label: 'SELECT',
        kind: 'Snippet',
        insertText: 'SELECT ${1:*} FROM ${2:table_name};',
        insertTextRules: 4, // Snippet
        detail: 'Basic SELECT statement'
    },
    {
        label: 'SELECT WHERE',
        kind: 'Snippet',
        insertText: 'SELECT ${1:*} FROM ${2:table_name} WHERE ${3:condition};',
        insertTextRules: 4,
        detail: 'SELECT with WHERE clause'
    },
    {
        label: 'INNER JOIN',
        kind: 'Snippet',
        insertText: 'INNER JOIN ${1:table_name} ON ${2:condition}',
        insertTextRules: 4,
        detail: 'Inner join clause'
    },
    {
        label: 'LEFT JOIN',
        kind: 'Snippet',
        insertText: 'LEFT JOIN ${1:table_name} ON ${2:condition}',
        insertTextRules: 4,
        detail: 'Left outer join clause'
    },
    {
        label: 'GROUP BY',
        kind: 'Snippet',
        insertText: 'GROUP BY ${1:column_name}',
        insertTextRules: 4,
        detail: 'Group by clause'
    },
    {
        label: 'ORDER BY',
        kind: 'Snippet',
        insertText: 'ORDER BY ${1:column_name} ${2:ASC|DESC}',
        insertTextRules: 4,
        detail: 'Order by clause'
    },
    {
        label: 'COUNT',
        kind: 'Snippet',
        insertText: 'COUNT(${1:*})',
        insertTextRules: 4,
        detail: 'Count function'
    },
    {
        label: 'SUM',
        kind: 'Snippet',
        insertText: 'SUM(${1:column_name})',
        insertTextRules: 4,
        detail: 'Sum function'
    },
    {
        label: 'AVG',
        kind: 'Snippet',
        insertText: 'AVG(${1:column_name})',
        insertTextRules: 4,
        detail: 'Average function'
    },
    {
        label: 'CASE',
        kind: 'Snippet',
        insertText: 'CASE\n\tWHEN ${1:condition} THEN ${2:result}\n\tELSE ${3:else_result}\nEND',
        insertTextRules: 4,
        detail: 'Case expression'
    },
    {
        label: 'LIMIT',
        kind: 'Snippet',
        insertText: 'LIMIT ${1:10}',
        insertTextRules: 4,
        detail: 'Limit clause'
    }
];
