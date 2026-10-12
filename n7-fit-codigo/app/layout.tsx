import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://n7-fit-contagem.earthyllama4.chatgpt.site'),
  title: 'N7 Fit Academia em Contagem | Sua força começa aqui',
  description: 'Encontre sua unidade N7 Fit em Contagem: Retiro, Três Barras, Nova Contagem e Fonte Grande. Consulte planos e horários diretamente com a unidade.',
  openGraph: { title: 'N7 Fit | Sua força começa aqui', description: 'Quatro unidades em Contagem. Encontre a sua e dê o próximo passo na sua rotina de treino.', locale: 'pt_BR', type: 'website', images: [{ url: '/images/hero.webp', width: 1536, height: 1024, alt: 'Imagem conceitual de treino N7 Fit' }] },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><head><link rel="icon" href="/favicon.svg" type="image/svg+xml" /></head><body>{children}</body></html>;
}
