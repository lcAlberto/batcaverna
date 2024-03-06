interface TranslationItem {
    original: string
    translate: string
    icon: string|null
}

const translations: TranslationItem[] = [
    {
        original: 'root',
        translate: 'Raiz',
        icon: null
    },
    {
      original: 'home',
      translate: 'Home',
        icon: 'fa fa-home'
    },
    {
        original: 'hero',
        translate: 'Herói',
        icon: 'fa fa-mask'
    },
    {
        original: 'new',
        translate: 'Novo',
        icon: 'fa fa-plus'
    },
    {
        original: 'edit',
        translate: 'Editar',
        icon: 'fa fa-pencil'
    },
];
export function translate(field: string): TranslationItem|string {
    const translation = translations.find(item => item.original === field);
    return translation ? translation : field;
}
