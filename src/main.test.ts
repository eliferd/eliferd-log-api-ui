import moment from 'moment';

function capitalize(value: string | null) {
    if (!value) return '';
    return value.charAt(0).toUpperCase() + value.slice(1);
}

function parseDate(value: number | Date | null) {
    if (!value) return '';
    return moment(value).format('DD/MM/YYYY - HH[h]mm[:]ss');
}

describe('Tests des fonctions de base - main.ts', () => {
    test('Capitalizations', () => {
        expect(capitalize('bleu')).toBe('Bleu');
        expect(capitalize('salut mon pote')).toBe('Salut mon pote');
        expect(capitalize('TEST TOUT EN MAJ')).toBe('TEST TOUT EN MAJ');
    });
    
    test('Parsing de date', () => {
        expect(parseDate(null)).toBe('');
        expect(parseDate(new Date('1995-12-17T03:24:00'))).toBe('17/12/1995 - 03h24:00');
        expect(parseDate(819167040000)).toBe('17/12/1995 - 03h24:00');
    });
})
