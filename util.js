function find_num_categories(values) {
    if (!values.includes("")) {
        if (!values.includes(null)) {
            return (values.length);
        }
        return (values.indexOf(null) + 1);
    }
    return (values.indexOf("") + 1)
}

function row_indexer(row, part) {
    if (row.includes(part)) {
        return row.indexOf(part) + 1;
    }
    return 0;
}

function sheet_indexer(part, sheet) {
    for (let i = 0; i < sheet.length; i++) {
        if (sheet[i].includes(part)) {
            return [i + 1, sheet[i].indexOf(part) + 1];
        }
    }
    return [0, 0];
}

function checkWidth(values, format, cell) {
    if (values[0].length <= cell[1]) {
        for (let j = 0; j <= cell[1] - values[0].length; j++) {
            for (let i = 0; i < values.length; i++) {
                values[i].push(null);
                format[i].push(null);
            }
        }
    }
    return [values, format];
}

function checkHeight(values, format, cell) {
    if (values.length <= cell[0]) {
        for (let j = 0; j <= cell[0] - values.length; j++) {
            let valueRow = [];
            for (let i = 0; i < values[0].length; i++) {
                valueRow.push(null)
            }
            values.push(valueRow);
            format.push(valueRow);
        }
    }
    return [values, format];
}