
interface TranslationItem {
    [key: string]: string;
}

const translations: TranslationItem[] = [
    {'home': 'Home'},
    {'hero': 'Herói'},
    {'new': 'Novo'},
    {'edit': 'Editar'},
];
export function translate(field: string): string {
    const translation = translations.find(item => item.hasOwnProperty(field));

    return translation ? translation[field] : field;
}