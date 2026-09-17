import { type ReactNode, useEffect, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { ArrowDownRight, ArrowUpRight, CalendarDays, Check, ChevronDown, Clock3, MapPin, Menu, MessageCircle, MoveRight, Phone, Play, Plus, Send, Sparkles, X } from 'lucide-react';
import { SiInstagram, SiWhatsapp } from 'react-icons/si';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import heroImage from './assets/dance-hero.jpg';
import detailImage from './assets/dance-detail.jpg';
import logoImage from '@assets/IMG-20260917-WA0015_1789654133136.jpg';

const queryClient = new QueryClient();

/** Add the studio's official phone number here when it is available. */
const STUDIO_CONTACT = {
  phone: '',
  instagram: 'https://www.instagram.com/saikumardance_studio?stkn=b3V3ZXJxZXR4aHBp',
};

const WHATSAPP_PHONE = '916302083760';
const WHATSAPP_MESSAGE = 'Hi Heart Beaters - Dance Studio, I would love to know more about classes and booking a session.';
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
const STUDIO_LOCATION = 'Venkatagiri, Andhra Pradesh, India';

type RevealProps = { children: ReactNode; className?: string; delay?: 1 | 2 | 3 };

function Reveal({ children, className = '', delay }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        node.classList.add('is-visible');
        observer.unobserve(node);
      }
    }, { threshold: 0.1 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${delay ? `reveal-delay-${delay}` : ''} ${className}`}>{children}</div>;
}

function BrandMark({ light = false }: { light?: boolean }) {
  return (
    <a href="#top" className="group inline-flex items-center gap-3" data-testid="link-brand">
      <span className={`relative grid size-10 place-items-center overflow-hidden rounded-full border ${light ? 'border-[#f6dcc0]/35 bg-[#f6dcc0]/10' : 'border-[#35192b]/20 bg-[#35192b]'}`}>
        <img src={logoImage} alt="Heart Beaters Dance Studio logo" className="size-full object-cover transition-transform duration-500 group-hover:scale-110" />
      </span>
      <span className={`font-display text-[14px] font-bold uppercase tracking-[0.1em] ${light ? 'text-[#f6dcc0]' : 'text-[#35192b]'}`}>
        Heart Beaters <span className={light ? 'text-[#f3c969]' : 'text-[#e15b37]'}>Dance Studio</span>
      </span>
    </a>
  );
}

function Header({ onBook, onCall }: { onBook: () => void; onCall: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = [['Studio', '#studio'], ['Classes', '#classes'], ['The rhythm', '#rhythm'], ['Visit', '#visit']];
  return (
    <header className="absolute left-0 right-0 top-0 z-40">
      <div className="mx-auto flex max-w-[1320px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
        <BrandMark light />
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
          {navItems.map(([label, href]) => (
            <a key={href} href={href} className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#f6dcc0]/65 transition-colors hover:text-[#f3c969]" data-testid={`link-nav-${label.toLowerCase().replace(' ', '-')}`}>
              {label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <a href={STUDIO_CONTACT.instagram} target="_blank" rel="noreferrer" className="grid size-10 place-items-center rounded-full border border-[#f6dcc0]/25 text-[#f6dcc0] transition-all hover:border-[#f3c969] hover:text-[#f3c969]" aria-label="Open Instagram" data-testid="link-instagram-header"><SiInstagram size={15} /></a>
          <button onClick={onBook} className="group inline-flex items-center gap-3 rounded-full bg-[#f3c969] px-5 py-3 text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#35192b] transition-transform hover:-translate-y-0.5" data-testid="button-whatsapp-header">
            WhatsApp <SiWhatsapp size={14} />
          </button>
          <button onClick={onCall} className="group inline-flex items-center gap-3 rounded-full border border-[#f6dcc0]/30 px-5 py-3 text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#f6dcc0] transition-transform hover:-translate-y-0.5 hover:border-[#f3c969] hover:text-[#f3c969]" data-testid="button-call-header">
            Call <Phone size={14} />
          </button>
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} className="grid size-11 place-items-center rounded-full border border-[#f6dcc0]/25 text-[#f6dcc0] md:hidden" aria-label={menuOpen ? 'Close menu' : 'Open menu'} data-testid="button-menu">
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {menuOpen && (
        <div className="mx-4 rounded-2xl border border-[#f6dcc0]/15 bg-[#35192b]/95 p-5 shadow-2xl backdrop-blur-xl md:hidden">
          <nav className="flex flex-col gap-1">
            {navItems.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)} className="flex items-center justify-between border-b border-[#f6dcc0]/10 py-4 text-sm font-bold uppercase tracking-[0.15em] text-[#f6dcc0]" data-testid={`link-mobile-${label.toLowerCase().replace(' ', '-')}`}>
                {label}<ArrowDownRight size={15} className="text-[#e15b37]" />
              </a>
            ))}
          </nav>
          <div className="mt-5 grid gap-2">
            <button onClick={() => { setMenuOpen(false); onBook(); }} className="flex w-full items-center justify-between rounded-xl bg-[#f3c969] px-4 py-4 text-xs font-extrabold uppercase tracking-[0.13em] text-[#35192b]" data-testid="button-whatsapp-mobile">
              Book via WhatsApp <SiWhatsapp size={16} />
            </button>
            <button onClick={() => { setMenuOpen(false); onCall(); }} className="flex w-full items-center justify-between rounded-xl border border-[#f6dcc0]/25 px-4 py-4 text-xs font-extrabold uppercase tracking-[0.13em] text-[#f6dcc0]" data-testid="button-call-mobile">
              Talk to the studio <Phone size={16} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero({ onBook, onCall }: { onBook: () => void; onCall: () => void }) {
  return (
    <section id="top" className="hero-grid hero-glow hero-frame image-wash relative flex min-h-[760px] items-end overflow-hidden bg-[#35192b] text-[#f6dcc0] sm:min-h-[820px] lg:min-h-[900px]">
      <img src={heroImage} alt="Dancer moving through warm studio light" className="absolute inset-0 h-full w-full object-cover opacity-70" />
      <div className="absolute inset-0 bg-[#35192b]/35" />
      <div className="relative z-10 mx-auto w-full max-w-[1320px] px-5 pb-16 pt-36 sm:px-8 sm:pb-20 lg:px-12 lg:pb-28">
        <div className="max-w-[830px]">
          <Reveal>
            <div className="mb-7 flex items-center gap-3">
              <span className="size-2 rounded-full bg-[#f3c969]" />
              <p className="font-mono-custom text-[10px] uppercase tracking-[0.22em] text-[#f6dcc0]/70">A movement practice in Venkatagiri</p>
            </div>
          </Reveal>
          <Reveal delay={1}>
              <h1 className="font-display text-[clamp(4.3rem,12vw,10.5rem)] font-semibold leading-[0.82] tracking-[-0.085em] text-[#f6dcc0] drop-shadow-[0_12px_32px_rgba(37,18,30,.22)]">
              Find your<br /><span className="text-[#f3c969]">full volume.</span>
            </h1>
          </Reveal>
          <Reveal delay={2}>
            <div className="mt-9 flex flex-col items-start gap-7 sm:flex-row sm:items-center">
              <p className="max-w-[335px] text-[15px] leading-7 text-[#f6dcc0]/72">A room for rhythm, rigor, and the kind of confidence that follows you out the door.</p>
              <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="group flex shrink-0 items-center gap-3 rounded-full bg-[#e15b37] px-6 py-4 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#fff1df] shadow-[0_12px_30px_rgba(225,91,55,.28)] transition-transform hover:-translate-y-1" data-testid="link-whatsapp-hero">
                Book via WhatsApp <SiWhatsapp size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </Reveal>
          <Reveal delay={3} className="mt-8 max-w-[780px]">
            <div className="grid gap-3 rounded-[1.5rem] border border-[#f6dcc0]/25 bg-[#35192b]/55 p-3 backdrop-blur-md sm:grid-cols-2 sm:p-4">
              <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="group flex min-h-[112px] items-end justify-between rounded-[1.1rem] bg-[#f3c969] p-5 text-[#35192b] transition-transform hover:-translate-y-1" data-testid="link-whatsapp-hero-box">
                <span><span className="block font-mono-custom text-[9px] uppercase tracking-[0.18em] text-[#35192b]/60">Fastest way to book</span><span className="mt-3 block font-display text-2xl font-semibold tracking-[-0.05em]">Message on WhatsApp</span></span>
                <SiWhatsapp size={24} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
              <button onClick={onCall} className="group flex min-h-[112px] items-end justify-between rounded-[1.1rem] border border-[#f6dcc0]/25 p-5 text-left text-[#f6dcc0] transition-colors hover:border-[#f3c969] hover:text-[#f3c969]" data-testid="button-call-hero-box">
                <span><span className="block font-mono-custom text-[9px] uppercase tracking-[0.18em] text-[#f6dcc0]/55">Prefer to speak?</span><span className="mt-3 block font-display text-2xl font-semibold tracking-[-0.05em]">Call the studio</span></span>
                <Phone size={24} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
            </div>
          </Reveal>
        </div>
        <Reveal delay={3} className="mt-20 flex items-end justify-between border-t border-[#f6dcc0]/20 pt-5 sm:mt-28">
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-full border border-[#f6dcc0]/30"><ChevronDown size={15} /></span>
            <span className="font-mono-custom text-[9px] uppercase tracking-[0.2em] text-[#f6dcc0]/55">Scroll into the room</span>
          </div>
          <p className="hidden font-mono-custom text-[9px] uppercase tracking-[0.2em] text-[#f6dcc0]/55 sm:block">Venkatagiri · Andhra Pradesh</p>
        </Reveal>
      </div>
      <div className="absolute bottom-16 right-5 hidden rotate-90 items-center gap-3 text-[#f6dcc0]/45 lg:flex">
        <span className="font-mono-custom text-[9px] uppercase tracking-[0.25em]">The practice begins here</span><span className="h-px w-14 bg-[#f6dcc0]/30" />
      </div>
    </section>
  );
}

function Marquee() {
  const words = ['Rhythm', 'Presence', 'Discipline', 'Joy', 'Expression', 'Rhythm', 'Presence', 'Discipline', 'Joy', 'Expression'];
  return (
    <div className="overflow-hidden border-y border-[#f6dcc0]/20 bg-[#e15b37] py-4 text-[#35192b]">
      <div className="marquee-track flex w-max items-center">
        {words.map((word, index) => <span key={`${word}-${index}`} className="flex items-center gap-7 px-7 font-display text-[15px] font-semibold uppercase tracking-[0.12em] sm:text-[18px]">{word}<span aria-hidden="true" className="size-1.5 rounded-full bg-[#f3c969]" /></span>)}
      </div>
    </div>
  );
}

function StudioSection() {
  return (
    <section id="studio" className="relative overflow-hidden bg-[#f4eadc] py-24 text-[#35192b] sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
            <div>
              <p className="mb-5 font-mono-custom text-[10px] uppercase tracking-[0.22em] text-[#e15b37]">01 / The room</p>
              <h2 className="max-w-[760px] font-display text-[clamp(2.8rem,6vw,6.2rem)] font-semibold leading-[0.9] tracking-[-0.07em]">Not just steps.<br /><span className="text-[#e15b37]">A shift in how you stand.</span></h2>
            </div>
            <p className="max-w-[300px] text-sm leading-7 text-[#35192b]/60 lg:pb-2">Heart Beaters is where curious first-timers and hungry performers share the same floor. No audition to belong. No ceiling on how far you can go.</p>
          </div>
        </Reveal>
        <div className="mt-16 grid gap-5 lg:mt-24 lg:grid-cols-[1.2fr_.8fr]">
          <Reveal delay={1} className="group relative min-h-[450px] overflow-hidden rounded-[2rem] bg-[#35192b] sm:min-h-[580px]">
            <img src={detailImage} alt="Movement and fabric in a dance studio" className="absolute inset-0 h-full w-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#35192b] via-transparent to-transparent" />
            <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between text-[#f6dcc0] sm:bottom-9 sm:left-9 sm:right-9">
              <div><p className="font-display text-2xl font-semibold">Come as you are.</p><p className="mt-1 text-xs text-[#f6dcc0]/60">Leave with more of yourself.</p></div>
              <span className="grid size-12 place-items-center rounded-full border border-[#f6dcc0]/40 transition-colors group-hover:bg-[#f3c969] group-hover:text-[#35192b]"><Play size={15} fill="currentColor" /></span>
            </div>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            <Reveal delay={2} className="rounded-[2rem] bg-[#f3c969] p-8 sm:p-10">
              <span className="font-mono-custom text-[10px] uppercase tracking-[0.2em] text-[#35192b]/60">Our north star</span>
              <p className="mt-10 max-w-[360px] font-display text-[clamp(1.8rem,3vw,2.8rem)] font-semibold leading-[1.02] tracking-[-0.05em]">Technique gives you control. Feeling gives it a pulse.</p>
            </Reveal>
            <Reveal delay={3} className="flex flex-col justify-between rounded-[2rem] bg-[#e15b37] p-8 text-[#fff1df] sm:p-10">
              <div className="flex items-center justify-between"><span className="font-mono-custom text-[10px] uppercase tracking-[0.2em] text-[#fff1df]/65">The method</span><Sparkles size={18} /></div>
              <p className="mt-12 max-w-[330px] text-[15px] leading-7 text-[#fff1df]/80">Train the details. Trust the instinct. Find the version of the music that only you can hear.</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

const classes = [
  { number: '01', name: 'Urban foundations', tag: 'Groove · Hip-hop · Freestyle', copy: 'Build your vocabulary from the floor up. Musicality first, confidence always.', level: 'Open level' },
  { number: '02', name: 'Contemporary flow', tag: 'Release · Lines · Story', copy: 'Use weight, breath, and space to make every phrase feel like yours.', level: 'Beginner to intermediate' },
  { number: '03', name: 'Bollywood energy', tag: 'Performance · Expression · Joy', copy: 'Big music deserves big movement. Learn the detail, then turn up the volume.', level: 'All levels' },
  { number: '04', name: 'Kids in motion', tag: 'Play · Rhythm · Self-belief', copy: 'A welcoming first studio experience where young dancers learn by doing.', level: 'Ages 5–12' },
];

function ClassesSection({ onBook }: { onBook: () => void }) {
  const [openClass, setOpenClass] = useState<string | null>(null);
  return (
    <section id="classes" className="bg-[#35192b] py-24 text-[#f6dcc0] sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <div className="flex flex-col justify-between gap-8 border-b border-[#f6dcc0]/20 pb-10 sm:flex-row sm:items-end">
            <div><p className="mb-5 font-mono-custom text-[10px] uppercase tracking-[0.22em] text-[#f3c969]">02 / Find your floor</p><h2 className="font-display text-[clamp(3rem,7vw,7rem)] font-semibold leading-[0.84] tracking-[-0.08em]">Choose your<br /><span className="text-[#e15b37]">energy.</span></h2></div>
            <p className="max-w-[270px] text-sm leading-7 text-[#f6dcc0]/55">Different doors into the same feeling: present, capable, alive.</p>
          </div>
        </Reveal>
        <div className="mt-4">
          {classes.map((item, index) => {
            const isOpen = openClass === item.name;
            return (
              <Reveal key={item.number} delay={(index % 3 + 1) as 1 | 2 | 3}>
                <div className="border-b border-[#f6dcc0]/15">
                  <button onClick={() => setOpenClass(isOpen ? null : item.name)} className="group flex w-full items-center gap-4 py-6 text-left sm:py-8" aria-expanded={isOpen} data-testid={`button-class-${item.number}`}>
                    <span className="w-8 font-mono-custom text-[10px] text-[#f3c969]">{item.number}</span>
                    <span className="flex-1 font-display text-[clamp(1.45rem,3.2vw,3.2rem)] font-medium tracking-[-0.05em] transition-colors group-hover:text-[#f3c969]">{item.name}</span>
                    <span className="mr-2 hidden text-right font-mono-custom text-[9px] uppercase tracking-[0.12em] text-[#f6dcc0]/45 sm:block">{item.level}</span>
                    <span className={`grid size-10 place-items-center rounded-full border border-[#f6dcc0]/25 transition-all ${isOpen ? 'rotate-45 bg-[#f3c969] text-[#35192b]' : 'group-hover:border-[#f3c969]'}`}><Plus size={17} /></span>
                  </button>
                  <div className={`grid transition-[grid-template-rows,opacity] duration-300 ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}><div className="overflow-hidden"><div className="grid gap-5 pb-7 pl-12 sm:grid-cols-[1fr_1fr_170px] sm:items-center sm:pl-12"><p className="text-sm leading-7 text-[#f6dcc0]/65">{item.copy}</p><p className="font-mono-custom text-[9px] uppercase tracking-[0.16em] text-[#e15b37]">{item.tag}</p><button onClick={onBook} className="flex items-center gap-2 text-left text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#f3c969]" data-testid={`button-class-book-${item.number}`}>Book via WhatsApp <SiWhatsapp size={14} /></button></div></div></div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function RhythmSection() {
  const principles = [
    ['01', 'Consistency', 'Small practice, repeated often, becomes a body that knows what to do.'],
    ['02', 'Curiosity', 'There is no single right way to hear a beat. We make space for yours.'],
    ['03', 'Community', 'The best kind of progress happens when someone else is cheering from the corner.'],
  ];
  return (
    <section id="rhythm" className="overflow-hidden bg-[#f3c969] py-24 text-[#35192b] sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
        <Reveal><div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]"><div><p className="mb-5 font-mono-custom text-[10px] uppercase tracking-[0.22em] text-[#e15b37]">03 / The rhythm</p><div className="float-slow inline-flex size-24 items-center justify-center rounded-full bg-[#e15b37] text-[#fff1df] sm:size-32"><span className="font-display text-4xl font-bold tracking-[-0.1em] sm:text-5xl">1—2</span></div></div><div><h2 className="font-display text-[clamp(3rem,7vw,7rem)] font-semibold leading-[0.84] tracking-[-0.08em]">Progress is<br /><span className="text-[#e15b37]">a practice.</span></h2><p className="mt-8 max-w-[460px] text-[15px] leading-7 text-[#35192b]/65">You do not need to arrive ready. You only need to arrive willing. We take it from there, one count at a time.</p></div></div></Reveal>
        <div className="mt-20 grid gap-0 border-t border-[#35192b]/20 sm:grid-cols-3">
          {principles.map(([num, title, copy], index) => <Reveal key={num} delay={(index + 1) as 1 | 2 | 3} className="border-b border-[#35192b]/20 py-8 sm:border-b-0 sm:border-r sm:px-7 sm:first:pl-0 sm:last:border-r-0"><span className="font-mono-custom text-[10px] text-[#e15b37]">{num}</span><h3 className="mt-12 font-display text-2xl font-semibold tracking-[-0.04em]">{title}</h3><p className="mt-4 max-w-[260px] text-sm leading-6 text-[#35192b]/60">{copy}</p></Reveal>)}
        </div>
      </div>
    </section>
  );
}

function ScheduleSection({ onBook }: { onBook: () => void }) {
  return (
    <section className="bg-[#f4eadc] py-20 text-[#35192b] sm:py-28">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
        <Reveal><div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:items-end"><div><p className="mb-5 font-mono-custom text-[10px] uppercase tracking-[0.22em] text-[#e15b37]">04 / Make a date</p><h2 className="max-w-[450px] font-display text-[clamp(2.8rem,5vw,5.2rem)] font-semibold leading-[0.88] tracking-[-0.07em]">Your week,<br /><span className="text-[#e15b37]">with a beat.</span></h2></div><div className="grid gap-3 sm:grid-cols-3"><div className="rounded-2xl bg-[#35192b] p-5 text-[#f6dcc0]"><CalendarDays size={18} className="text-[#f3c969]" /><p className="mt-9 font-mono-custom text-[10px] uppercase tracking-[0.13em] text-[#f6dcc0]/55">Weekday evenings</p><p className="mt-2 font-display text-xl">6:30 — 8:30</p></div><div className="rounded-2xl border border-[#35192b]/15 p-5"><Clock3 size={18} className="text-[#e15b37]" /><p className="mt-9 font-mono-custom text-[10px] uppercase tracking-[0.13em] text-[#35192b]/50">Saturday sessions</p><p className="mt-2 font-display text-xl">10:00 — 13:00</p></div><button onClick={onBook} className="group flex flex-col justify-between rounded-2xl bg-[#e15b37] p-5 text-left text-[#fff1df] transition-transform hover:-translate-y-1" data-testid="button-schedule-book"><SiWhatsapp size={18} /><span className="flex items-end justify-between font-display text-xl">Book via WhatsApp <ArrowUpRight size={18} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></span></button></div></div></Reveal>
      </div>
    </section>
  );
}

function QuoteSection() {
  return (
    <section className="bg-[#35192b] px-5 py-24 text-[#f6dcc0] sm:px-8 sm:py-36 lg:px-12">
      <Reveal><div className="mx-auto max-w-[1100px] text-center"><span className="font-display text-5xl text-[#e15b37]">“</span><blockquote className="font-display text-[clamp(2rem,5vw,5.3rem)] font-medium leading-[0.96] tracking-[-0.065em]">I walked in thinking I had two left feet. I walked out thinking, <span className="text-[#f3c969]">maybe they were just waiting for music.</span></blockquote><div className="mt-10 flex items-center justify-center gap-3"><span className="size-2 rounded-full bg-[#e15b37]" /><p className="font-mono-custom text-[10px] uppercase tracking-[0.2em] text-[#f6dcc0]/55">A note from the community</p></div></div></Reveal>
    </section>
  );
}

function VisitSection({ onBook, onCall }: { onBook: () => void; onCall: () => void }) {
  return (
    <section id="visit" className="bg-[#f4eadc] py-24 text-[#35192b] sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
        <Reveal><div className="grid gap-14 lg:grid-cols-[1fr_.8fr]"><div><p className="mb-5 font-mono-custom text-[10px] uppercase tracking-[0.22em] text-[#e15b37]">05 / Come through</p><h2 className="max-w-[700px] font-display text-[clamp(3.2rem,7vw,7.3rem)] font-semibold leading-[0.84] tracking-[-0.08em]">The first step<br /><span className="text-[#e15b37]">is yours.</span></h2><div className="mt-10 flex flex-wrap gap-3"><a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="group flex items-center gap-3 rounded-full bg-[#35192b] px-6 py-4 text-[11px] font-extrabold uppercase tracking-[0.15em] text-[#f6dcc0] transition-transform hover:-translate-y-1" data-testid="link-whatsapp-visit">Book via WhatsApp <SiWhatsapp size={15} className="text-[#f3c969]" /></a><button onClick={onCall} className="flex items-center gap-3 rounded-full border border-[#35192b]/25 px-6 py-4 text-[11px] font-extrabold uppercase tracking-[0.15em] transition-colors hover:border-[#e15b37] hover:text-[#e15b37]" data-testid="button-call-visit"><Phone size={15} /> Call the studio</button></div></div><div className="lg:pt-12"><div className="border-t border-[#35192b]/20 pt-6"><div className="flex items-start gap-4"><MapPin size={20} className="mt-1 text-[#e15b37]" /><div><p className="font-display text-xl font-semibold">{STUDIO_LOCATION}</p><p className="mt-2 max-w-[230px] text-sm leading-6 text-[#35192b]/55">Studio details and directions are shared when you connect with our team.</p></div></div></div><div className="mt-10 border-t border-[#35192b]/20 pt-6"><div className="flex items-start gap-4"><MessageCircle size={20} className="mt-1 text-[#e15b37]" /><div><p className="font-display text-xl font-semibold">Questions welcome.</p><p className="mt-2 max-w-[230px] text-sm leading-6 text-[#35192b]/55">Send a message with your age, experience, and what you want to explore.</p></div></div></div></div></div></Reveal>
      </div>
    </section>
  );
}

function Footer({ onBook, onCall }: { onBook: () => void; onCall: () => void }) {
  return (
    <footer className="bg-[#e15b37] text-[#35192b]">
      <div className="mx-auto max-w-[1320px] px-5 pb-8 pt-16 sm:px-8 sm:pt-24 lg:px-12">
        <Reveal><div className="flex flex-col justify-between gap-10 border-b border-[#35192b]/25 pb-14 md:flex-row md:items-end"><div><p className="font-mono-custom text-[10px] uppercase tracking-[0.22em] text-[#35192b]/60">Ready when you are</p><h2 className="mt-5 max-w-[650px] font-display text-[clamp(3rem,7vw,7.8rem)] font-semibold leading-[0.82] tracking-[-0.09em]">Turn the<br />music <span className="text-[#f3c969]">up.</span></h2></div><div className="flex flex-col items-start gap-3"><a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="group flex items-center gap-4 rounded-full bg-[#35192b] px-6 py-4 text-[11px] font-extrabold uppercase tracking-[0.15em] text-[#f6dcc0]" data-testid="link-whatsapp-footer">Book via WhatsApp <SiWhatsapp size={16} className="text-[#f3c969] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></a><button onClick={onCall} className="px-2 py-2 text-left text-[10px] font-bold uppercase tracking-[0.14em] text-[#35192b]/65 hover:text-[#35192b]" data-testid="button-call-footer">Prefer to talk? Call the studio</button></div></div></Reveal>
        <div className="flex flex-col justify-between gap-8 pt-8 sm:flex-row sm:items-center"><BrandMark /><div className="flex items-center gap-3"><a href={STUDIO_CONTACT.instagram} target="_blank" rel="noreferrer" className="grid size-10 place-items-center rounded-full border border-[#35192b]/25 transition-colors hover:bg-[#35192b] hover:text-[#f6dcc0]" aria-label="Open Instagram" data-testid="link-instagram-footer"><SiInstagram size={15} /></a><a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="grid size-10 place-items-center rounded-full border border-[#35192b]/25 transition-colors hover:bg-[#35192b] hover:text-[#f6dcc0]" aria-label="Message on WhatsApp" data-testid="link-whatsapp-footer"><SiWhatsapp size={16} /></a></div><p className="font-mono-custom text-[9px] uppercase tracking-[0.16em] text-[#35192b]/55">© {new Date().getFullYear()} Heart Beaters - Dance Studio</p></div>
      </div>
    </footer>
  );
}

function BookingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState('');
  const [interest, setInterest] = useState('Urban foundations');
  useEffect(() => { if (!open) { setSent(false); setName(''); } }, [open]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-[#35192b]/75 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="booking-title">
      <div className="relative max-h-[90vh] w-full max-w-[540px] overflow-auto rounded-[2rem] bg-[#f4eadc] p-7 text-[#35192b] shadow-2xl sm:p-10">
        <button onClick={onClose} className="absolute right-5 top-5 grid size-10 place-items-center rounded-full border border-[#35192b]/15 hover:bg-[#35192b] hover:text-[#f6dcc0]" aria-label="Close booking form" data-testid="button-close-booking"><X size={17} /></button>
        {!sent ? <><p className="font-mono-custom text-[10px] uppercase tracking-[0.2em] text-[#e15b37]">One brave click</p><h2 id="booking-title" className="mt-4 max-w-[370px] font-display text-4xl font-semibold leading-[0.9] tracking-[-0.06em] sm:text-5xl">Let’s find your<br /><span className="text-[#e15b37]">first class.</span></h2><p className="mt-5 max-w-[380px] text-sm leading-6 text-[#35192b]/60">Tell us a little about you. Our team will reply with the next available trial slot.</p><form onSubmit={(event) => { event.preventDefault(); setSent(true); }} className="mt-8 space-y-5"><label className="block"><span className="mb-2 block font-mono-custom text-[9px] uppercase tracking-[0.16em] text-[#35192b]/60">Your name</span><input required value={name} onChange={(event) => setName(event.target.value)} placeholder="What should we call you?" className="w-full rounded-xl border border-[#35192b]/18 bg-transparent px-4 py-3.5 text-sm placeholder:text-[#35192b]/35" data-testid="input-booking-name" /></label><label className="block"><span className="mb-2 block font-mono-custom text-[9px] uppercase tracking-[0.16em] text-[#35192b]/60">I’m curious about</span><select value={interest} onChange={(event) => setInterest(event.target.value)} className="w-full appearance-none rounded-xl border border-[#35192b]/18 bg-transparent px-4 py-3.5 text-sm" data-testid="select-booking-interest">{classes.map((item) => <option key={item.name}>{item.name}</option>)}</select></label><label className="block"><span className="mb-2 block font-mono-custom text-[9px] uppercase tracking-[0.16em] text-[#35192b]/60">Message (optional)</span><textarea rows={3} placeholder="Tell us your experience or ask us anything." className="w-full resize-none rounded-xl border border-[#35192b]/18 bg-transparent px-4 py-3.5 text-sm placeholder:text-[#35192b]/35" data-testid="textarea-booking-message" /></label><button type="submit" className="flex w-full items-center justify-between rounded-xl bg-[#e15b37] px-5 py-4 text-[11px] font-extrabold uppercase tracking-[0.15em] text-[#fff1df]" data-testid="button-submit-booking">Send my enquiry <Send size={16} /></button></form><p className="mt-5 text-center text-[11px] text-[#35192b]/45">Prefer WhatsApp? <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="font-bold text-[#e15b37] underline underline-offset-4" data-testid="link-booking-whatsapp">Message us there</a></p></> : <div className="py-12 text-center"><span className="mx-auto grid size-16 place-items-center rounded-full bg-[#f3c969] text-[#35192b]"><Check size={26} /></span><h2 className="mt-7 font-display text-4xl font-semibold leading-none tracking-[-0.06em]">You’re on<br /><span className="text-[#e15b37]">the count.</span></h2><p className="mx-auto mt-5 max-w-[330px] text-sm leading-6 text-[#35192b]/60">Thanks{name ? `, ${name}` : ''}. Your enquiry is ready. We’ll be in touch with the next step.</p><a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="mx-auto mt-8 inline-flex items-center gap-3 rounded-full bg-[#35192b] px-5 py-3 text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#f6dcc0]" data-testid="link-confirmation-whatsapp"><SiWhatsapp size={15} /> Continue on WhatsApp</a></div>}
      </div>
    </div>
  );
}

function CallModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return <div className="fixed inset-0 z-[60] grid place-items-center bg-[#35192b]/75 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="call-title"><div className="relative w-full max-w-[430px] rounded-[2rem] bg-[#f4eadc] p-8 text-center text-[#35192b] shadow-2xl sm:p-10"><button onClick={onClose} className="absolute right-5 top-5 grid size-10 place-items-center rounded-full border border-[#35192b]/15" aria-label="Close call information" data-testid="button-close-call"><X size={17} /></button><span className="mx-auto grid size-16 place-items-center rounded-full bg-[#f3c969]"><Phone size={23} /></span><h2 id="call-title" className="mt-6 font-display text-3xl font-semibold tracking-[-0.05em]">The studio number<br /><span className="text-[#e15b37]">is coming soon.</span></h2><p className="mx-auto mt-4 max-w-[290px] text-sm leading-6 text-[#35192b]/60">We haven’t added the official phone number yet. Start a conversation on WhatsApp and the studio team will help you from there.</p><a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="mx-auto mt-7 inline-flex items-center gap-3 rounded-full bg-[#35192b] px-5 py-4 text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#f6dcc0]" data-testid="link-call-whatsapp"><SiWhatsapp size={16} /> Message the studio</a></div></div>;
}

function Home() {
  const [callOpen, setCallOpen] = useState(false);
  const openBooking = () => {
    window.open(WHATSAPP_LINK, '_blank', 'noopener,noreferrer');
  };
  const openCall = () => {
    if (STUDIO_CONTACT.phone) window.location.href = `tel:${STUDIO_CONTACT.phone}`;
    else setCallOpen(true);
  };
  return (
    <div className="noise min-h-[100dvh] overflow-x-hidden bg-[#f4eadc]">
      <Header onBook={openBooking} onCall={openCall} />
      <main>
        <Hero onBook={openBooking} onCall={openCall} />
        <Marquee />
        <StudioSection />
        <ClassesSection onBook={openBooking} />
        <RhythmSection />
        <ScheduleSection onBook={openBooking} />
        <QuoteSection />
        <VisitSection onBook={openBooking} onCall={openCall} />
      </main>
      <Footer onBook={openBooking} onCall={openCall} />
      <CallModal open={callOpen} onClose={() => setCallOpen(false)} />
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;