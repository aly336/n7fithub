'use client';

// Editorial sports campaign: Barlow Condensed + Manrope, black/gold, generous asymmetric composition.
// Native dialog and details, CSS motion; all business data lives in units.ts.
import { useEffect, useRef, useState } from 'react';
import { instagram, maps, units, whatsapp } from './units';

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">{diagonal ? <path d="M6 18 18 6M6 6h12v12" /> : <path d="M4 12h16m-6-6 6 6-6 6" />}</svg>;
}
function Pin() { return <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>; }
function Chat() { return <svg aria-hidden="true" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M21 11.5a9 9 0 0 1-13.5 8L3 21l1.5-4.5A9 9 0 1 1 21 11.5Z"/><path d="M8 8c0 4 4 8 8 8l1-3-3-1-1 1-2-2 1-1-1-3Z"/></svg>; }
function Logo() { return <span className="logo" aria-label="N7 Fit"><span>N7</span> FIT<span className="logo-dot">.</span></span>; }
const questions = [
  ['Como consultar os planos?', 'Escolha sua unidade e envie uma mensagem pelo WhatsApp. A equipe informa os planos, valores e condições atuais. Para Nova Contagem, consulte o contato no Instagram oficial.'],
  ['Como escolher uma unidade?', 'Considere o bairro e o trajeto que funciona para sua rotina. Converse com a unidade para confirmar o endereço e combinar uma visita antes de decidir.'],
  ['Como confirmar os horários?', 'Consulte diretamente a unidade. Os horários podem variar entre unidades, finais de semana e feriados.'],
  ['Quais modalidades estão disponíveis?', 'Pergunte à unidade sobre musculação, funcional e outras atividades. A disponibilidade de cada modalidade precisa ser confirmada no local escolhido.'],
  ['A N7 Fit aceita Wellhub ou TotalPass?', 'Consulte a unidade e a lista de parceiros no aplicativo do seu benefício. A participação, o plano necessário e as condições podem variar por unidade.'],
];

export default function Home() {
  const dialog = useRef<HTMLDialogElement>(null);
  const menu = useRef<HTMLDialogElement>(null);
  const hero = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const [image, setImage] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (!reduce.matches) entry.target.animate([{ opacity: 0, transform: entry.target.classList.contains('photo-reveal') ? 'translateX(-14px)' : 'translateY(14px)' }, { opacity: 1, transform: 'none' }], { duration: 650, easing: 'cubic-bezier(.23,1,.32,1)' });
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.12 });
    document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
    let pending = false;
    const scroll = () => {
      if (pending || reduce.matches || !window.matchMedia('(min-width: 1024px) and (pointer: fine)').matches) return;
      pending = true;
      requestAnimationFrame(() => { if(hero.current) hero.current.style.transform = `translateY(${Math.min(window.scrollY * .065, 42)}px)`; pending = false; });
    };
    const reset = () => { if (reduce.matches && hero.current) hero.current.style.transform = ''; };
    window.addEventListener('scroll', scroll, { passive: true }); reduce.addEventListener('change', reset);
    return () => { observer.disconnect(); window.removeEventListener('scroll', scroll); reduce.removeEventListener('change', reset); };
  }, []);

  function open(ref: React.RefObject<HTMLDialogElement | null>) {
    if (ref.current?.open) return;
    previousFocus.current = document.activeElement as HTMLElement;
    ref.current?.classList.remove('closing'); ref.current?.showModal(); document.body.style.overflow = 'hidden';
  }
  function close(ref: React.RefObject<HTMLDialogElement | null>) {
    const el = ref.current; if (!el || !el.open || el.classList.contains('closing')) return;
    el.classList.add('closing');
    const done = () => { el.close(); el.classList.remove('closing'); document.body.style.overflow = ''; previousFocus.current?.focus({ preventScroll: true }); };
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) done(); else window.setTimeout(done, 180);
  }
  function choose() { open(dialog); }
  const nav = [['Academia', '#academia'], ['Unidades', '#unidades'], ['Avaliações', '#avaliacoes'], ['Dúvidas', '#duvidas']];

  return <>
    <a className="skip" href="#conteudo">Pular para o conteúdo</a>
    <header className="header"><div className="header-inner">
      <a href="#inicio" className="brand"><Logo /></a>
      <nav aria-label="Navegação principal" className="desktop-nav">{nav.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
      <a className="button small header-cta" href="#unidades">Escolher minha unidade <Arrow diagonal /></a>
      <button className="menu-toggle" aria-label="Abrir menu" onClick={() => open(menu)}><span/><span/></button>
    </div></header>

    <main id="conteudo">
      <section id="inicio" className="hero">
        <div className="hero-visual" ref={hero}><img className="hero-photo" src="/images/hero.webp" width="1536" height="1024" fetchPriority="high" alt="Imagem conceitual: pessoa adulta treinando com halter sob luz amarela"/></div>
        <div className="hero-shade"/>
        <div className="hero-content wrap">
          <p className="hero-location enter"><Pin/> N7 Fit Academia · Contagem, MG</p>
          <h1 className="enter">SUA FORÇA<br/>COMEÇA<br/>AQUI<span>.</span></h1>
          <p className="hero-copy enter">Encontre sua unidade N7 Fit em Contagem e dê o próximo passo na sua rotina de treino.</p>
          <div className="hero-actions enter"><a className="button" href="#unidades">Escolher minha unidade <Arrow diagonal/></a><a className="text-link" href="#academia">Conhecer a N7 Fit <Arrow/></a></div>
        </div>
        <div className="hero-bottom wrap"><a href="#academia" className="scroll-link">Continue em movimento <span>↓</span></a><span className="photo-note">Imagem conceitual gerada por IA</span></div>
      </section>

      <div className="brand-strip" aria-hidden="true"><span>FORÇA</span><i/><span>MOVIMENTO</span><i/><span>CONSTÂNCIA</span><i/><span>N7 FIT</span><i/><span>COMUNIDADE</span></div>

      <section id="academia" className="academy wrap section-space">
        <div className="academy-gallery photo-reveal" data-reveal>
          <div className="photo-frame">
            <img className={image === 0 ? 'gallery-image visible' : 'gallery-image'} src="/images/detail.webp" width="1024" height="1536" loading="lazy" alt="Imagem conceitual: halter e anilha com textura de metal e borracha"/>
            <img className={image === 1 ? 'gallery-image visible' : 'gallery-image'} src="/images/hero.webp" width="1536" height="1024" loading="lazy" alt="Imagem conceitual de treino com halter"/>
            <div className="gallery-controls"><span>Imagens conceituais · IA</span><div><button aria-label="Ver imagem de equipamento" aria-pressed={image === 0} onClick={() => setImage(0)}>01</button><button aria-label="Ver imagem de treino" aria-pressed={image === 1} onClick={() => setImage(1)}>02</button></div></div>
          </div>
          <span className="photo-caption">Cada treino é um novo começo.</span>
        </div>
        <div className="academy-copy" data-reveal><p className="section-label">Conheça a N7 Fit</p><h2>SEU RITMO.<br/>SUA ROTINA.<br/>SUA N7.</h2><p>Começar a treinar ou retomar depois de um tempo: o próximo passo pode ser uma conversa.</p><p>A N7 Fit está em quatro bairros de Contagem. Encontre a unidade que combina com seu caminho, conheça o espaço e consulte as possibilidades para sua rotina.</p><div className="academy-facts"><div><strong>4</strong><span>unidades em Contagem</span></div><p>Do primeiro treino<br/>à sua próxima meta.</p></div><a href="#unidades" className="text-link">Encontre seu ponto de partida <Arrow diagonal/></a></div>
      </section>

      <section id="unidades" className="units-section section-space"><div className="wrap units-layout">
        <div className="units-intro" data-reveal><p className="section-label">Perto de você</p><h2>QUATRO<br/>CAMINHOS.<br/>UMA N7 FIT.</h2><p>Escolha seu bairro. Converse com a equipe. Faça o treino caber na sua vida.</p><span className="units-city"><Pin/> Contagem, Minas Gerais</span></div>
        <div className="units-list">{units.map((unit, index) => <details className="unit-row" key={unit.name} open={index === 0}>
          <summary><span className="unit-name">{unit.name}</span><span className="unit-plus" aria-hidden="true">+</span></summary>
          <div className="unit-body"><p>{unit.phone ? <>Consulte planos, horários e modalidades.<br/><span className="unit-phone">{unit.phone}</span></> : <>Consulte o contato da unidade no Instagram oficial.</>}</p>
          {unit.address && <p className="address">{unit.address}</p>}
          <div className="unit-actions"><a className="button dark" href={whatsapp(unit)} target="_blank" rel="noopener noreferrer">{unit.phone ? 'Conversar no WhatsApp' : 'Consultar no Instagram'} <Arrow diagonal/></a>{unit.address && <a className="location-link" href={maps(unit.address)} target="_blank" rel="noopener noreferrer">Ver localização <Pin/></a>}</div></div>
        </details>)}<p className="units-help">Confirme com a equipe os detalhes da unidade antes da sua visita.</p></div>
      </div></section>

      <section id="avaliacoes" className="reviews wrap section-space"><div data-reveal><p className="section-label">Sua escolha, com mais informação</p><h2>CONHEÇA ANTES<br/>DE COMEÇAR.</h2></div><div className="reviews-copy"><p>Confira a experiência de quem treina e veja as avaliações da unidade que você quer conhecer.</p><a className="text-link" href={maps('N7 Fit Rua VL-29 1261 Nova Contagem Contagem MG')} target="_blank" rel="noopener noreferrer">Buscar Nova Contagem no Google Maps <Arrow diagonal/></a><span>Avaliações vinculadas à ficha de cada unidade.</span></div></section>

      <section id="duvidas" className="faq section-space"><div className="wrap faq-layout"><div><p className="section-label">Vamos conversar</p><h2>ANTES DO<br/>PRIMEIRO<br/>TREINO.</h2><p>Algumas respostas para<br/>facilitar seu próximo passo.</p><button className="text-link" onClick={choose}>Falar com uma unidade <Arrow/></button></div><div className="faq-list">{questions.map(([q, answer]) => <details key={q}><summary>{q}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></div></section>

      <section className="final-cta wrap section-space" data-reveal><div className="final-title"><h2>SEU PRÓXIMO TREINO<br/>COMEÇA COM UMA ESCOLHA.</h2><p>A sua N7 Fit está em Contagem. Encontre a sua unidade.</p></div><button className="button" onClick={choose}>Encontrar minha unidade <Arrow diagonal/></button></section>
    </main>

    <footer><div className="wrap footer-top"><div className="footer-brand"><a href="#inicio" className="brand"><Logo/></a><p>Sua força começa aqui.</p><a href={instagram} target="_blank" rel="noopener noreferrer" className="text-link">@n7fit_oficial <Arrow diagonal/></a></div><div className="footer-nav"><h3>Explore</h3>{nav.map(([label, href]) => <a href={href} key={href}>{label}</a>)}</div><div className="footer-contacts"><h3>Nossas unidades</h3>{units.map(u => <a href={whatsapp(u)} key={u.name} target="_blank" rel="noopener noreferrer"><span>{u.name}</span><span>{u.phone || 'Consultar no Instagram'}<Arrow diagonal/></span></a>)}</div></div><div className="wrap footer-bottom"><span>© {new Date().getFullYear()} N7 Fit Academia</span><span>Contagem, MG · Sua rotina em movimento.</span></div></footer>
    <button className="floating" onClick={choose} aria-label="Escolher unidade para entrar em contato"><Chat/><span>Vamos treinar?</span></button>

    <dialog ref={dialog} className="unit-dialog" aria-labelledby="dialog-title" onCancel={e => { e.preventDefault(); close(dialog); }} onClick={e => { if (e.target === e.currentTarget) close(dialog); }}><div className="dialog-shell"><button className="close-button" aria-label="Fechar seleção de unidades" onClick={() => close(dialog)}>×</button><p className="section-label">Seu próximo passo</p><h2 id="dialog-title">QUAL É A<br/>SUA UNIDADE?</h2><p>Escolha onde você quer treinar.</p><div className="dialog-units">{units.map(u => <div key={u.name}><a href={whatsapp(u)} target="_blank" rel="noopener noreferrer"><span><strong>{u.name}</strong><small>{u.phone || 'Contato pelo Instagram oficial'}</small></span><Arrow diagonal/></a>{u.address && <a className="dialog-map" href={maps(u.address)} target="_blank" rel="noopener noreferrer">Ver localização de Nova Contagem <Pin/></a>}</div>)}</div><p className="dialog-note">Cada unidade informa seus planos, horários e modalidades.</p></div></dialog>
    <dialog ref={menu} className="mobile-menu" aria-label="Menu de navegação" onCancel={e => { e.preventDefault(); close(menu); }} onClick={e => { if (e.target === e.currentTarget) close(menu); }}><div className="menu-shell"><Logo/><button className="close-button" aria-label="Fechar menu" onClick={() => close(menu)}>×</button><nav aria-label="Navegação móvel">{nav.map(([label, href]) => <a href={href} key={href} onClick={() => close(menu)}>{label}<Arrow diagonal/></a>)}</nav><a href="#unidades" className="button" onClick={() => close(menu)}>Escolher minha unidade <Arrow diagonal/></a></div></dialog>
  </>;
}
