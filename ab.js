

function filterData(update, data) {
    const slugs = new Set(data.map(item => item.slug));
    return  update.filter(item => slugs.has(item));
}

const data1 = [
    "abn",
    "dfdf",
    "fdfd",
];

const data2 = [
    {name: "Ab", slug: "jdfjd"},
    {name: "Abn", slug: "abn"},
];

const result = filterData(data1, data2);

console.log(result)