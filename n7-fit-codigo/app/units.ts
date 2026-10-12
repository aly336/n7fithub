export const instagram = 'https://www.instagram.com/n7fit_oficial/';
export const units = [
  { name: 'Retiro', phone: '(31) 97257-7598', number: '5531972577598', address: null },
  { name: 'Três Barras', phone: '(31) 99104-8761', number: '5531991048761', address: null },
  { name: 'Nova Contagem', phone: null, number: null, address: 'Rua VL-29, 1261, Nova Contagem, Contagem–MG, CEP 32050-175' },
  { name: 'Fonte Grande', phone: '(31) 97500-0532', number: '5531975000532', address: null },
] as const;
export function whatsapp(unit: typeof units[number]) {
  return unit.number ? `https://wa.me/${unit.number}?text=${encodeURIComponent(`Olá! Vim pelo site da N7 Fit e gostaria de saber mais sobre os planos da unidade ${unit.name}.`)}` : instagram;
}
export function maps(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}
