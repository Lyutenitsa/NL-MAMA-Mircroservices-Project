import ReactDataGrid from "@inovua/reactdatagrid-community";

const useDataGridTranslations = () => {

    const i18n = Object.assign({}, ReactDataGrid.defaultProps.i18n, {
        pageText: "Pagina",
        ofText: " van ",
        perPageText: "Per pagina",
        showingText: "Toon ",
        clearAll: "Alles wissen",
        clear: "Wissen",
        showFilteringRow: "Toon filter rij",
        hideFilteringRow: "Verberg filter rij",
        dragHeaderToGroup: "Sleep kop naar groep",
        enable: "Inschakelen",
        disable: "Uitschakelen",
        sortAsc: "Sorteer oplopend",
        sortDesc: "Sorteer aflopend",
        unsort: "Niet sorteren",
        group: "Groeperen",
        ungroup: "Niet groeperen",
        lockStart: "Begin vastzetten",
        lockEnd: "Einde vastzetten",
        unlock: "Opheffen",
        columns: "Kolommen",
        contains: "Bevat",
        startsWith: "Begint met",
        endsWith: "Eindigt op",
        notContains: "Bevat niet",
        neq: "Niet gelijk aan",
        eq: "Gelijk aan",
        notEmpty: "Niet leeg",
        empty: "Leeg",
        lt: "Kleiner dan",
        lte: "Kleiner dan of gelijk aan",
        gt: "Groter dan",
        gte: "Groter dan of gelijk aan",
        noRecords: "Geen data gevonden...",
    });

    return i18n;
}

export default useDataGridTranslations;

