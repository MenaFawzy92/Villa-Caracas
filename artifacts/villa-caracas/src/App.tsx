import { useEffect, useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ArrowDownRight, ArrowUpRight, Clock3, Facebook, Instagram, MapPin, Menu as MenuIcon, Phone, Star, X } from 'lucide-react';
import { Link, Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import interiorImage from '../attached_assets/generated_images/villa-interior.jpg';
import brideImage from '../attached_assets/generated_images/beiruts-bride.jpg';
import kunafaImage from '../attached_assets/generated_images/kunafa-villa-caracas.jpg';
import grillImage from '../attached_assets/generated_images/caracas-mix-grill.jpg';

const queryClient = new QueryClient();
const whatsappUrl = 'https://wa.me/201017118882?text=Hello%20Villa%20Caracas%2C%20I%27d%20like%20to%20make%20a%20booking%20inquiry.';

const signatureDishes = [
  { name: "Beirut's Bride", note: 'A table-side celebration of mezze, colour, and crunch.', image: brideImage, number: '01' },
  { name: 'Caracas Mix Grill', note: 'Charcoal-kissed cuts, garlic cream, and warm bread.', image: grillImage, number: '02' },
  { name: 'Kunafa Villa Caracas', note: 'Golden pastry, soft cheese, pistachio, a little theatre.', image: kunafaImage, number: '03' },
];

const menuSections = [
  {
    title: 'To begin',
    arabic: 'The first pour',
    items: [
      ['Hummus from Beirut', 'Silken chickpeas, tahini, lemon, Beirut olive oil'],
      ['Fattouch', 'Crisp greens, sumac, pomegranate molasses, toasted bread'],
      ['Lentil Soup', 'Slow-cooked lentils, cumin, lemon, crisp onions'],
      ['Mixed Pastries', 'A warm selection of savoury Lebanese pastries'],
    ],
  },
  {
    title: 'From the kitchen',
    arabic: 'Made to share',
    items: [
      ['Kebbeh Bel Labneh', 'Crisp kebbeh, cool labneh, mint, Aleppo pepper'],
      ['Chicken Fattah', 'Tender chicken, toasted pita, yoghurt, pine nuts'],
      ['Beirut’s Bride', 'Our signature spread for the whole table'],
      ['Caracas Mix Grill', 'Lamb kofta, shish tawook, skewers, house sauces'],
    ],
  },
  {
    title: 'A sweet ending',
    arabic: 'Leave room',
    items: [
      ['Kunafa Villa Caracas', 'Golden pastry, fresh cheese, pistachio, blossom syrup'],
    ],
  },
];

function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" className={`villa-logo ${dark ? 'villa-logo-dark' : ''}`} data-testid="link-logo">
      <span className="villa-logo-mark">VC</span>
      <span><b>Villa</b><em>Caracas</em></span>
    </Link>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  const isMenu = location === '/menu';

  const close = () => setOpen(false);
  return (
    <header className={`site-header ${isMenu ? 'site-header-light' : ''}`}>
      <div className="header-inner">
        <Logo dark={isMenu} />
        <nav className="desktop-nav" aria-label="Main navigation">
          <Link href="/#story" data-testid="link-story">Our story</Link>
          <Link href="/menu" data-testid="link-menu">The menu</Link>
          <Link href="/#atmosphere" data-testid="link-atmosphere">The atmosphere</Link>
          <Link href="/#visit" data-testid="link-visit">Find us</Link>
        </nav>
        <div className="header-actions">
          <a href={whatsappUrl} target="_blank" rel="noreferrer" className="header-book" data-testid="link-header-book">Book a table <ArrowUpRight size={15} /></a>
          <button type="button" className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Close navigation' : 'Open navigation'} data-testid="button-mobile-navigation">
            {open ? <X size={23} /> : <MenuIcon size={23} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="mobile-nav" data-testid="mobile-navigation">
          <Link href="/#story" onClick={close} data-testid="mobile-link-story">Our story</Link>
          <Link href="/menu" onClick={close} data-testid="mobile-link-menu">The menu</Link>
          <Link href="/#atmosphere" onClick={close} data-testid="mobile-link-atmosphere">The atmosphere</Link>
          <Link href="/#visit" onClick={close} data-testid="mobile-link-visit">Find us</Link>
          <a href={whatsappUrl} target="_blank" rel="noreferrer" onClick={close} data-testid="mobile-link-book">Book a table <ArrowUpRight size={15} /></a>
        </div>
      )}
    </header>
  );
}

function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`reveal ${className}`}>{children}</div>;
}

function Marquee() {
  return (
    <div className="marquee-strip" aria-label="Villa Caracas highlights">
      <div className="marquee-track">
        <span>Beirut energy</span><i>/</i><span>Cairo hospitality</span><i>/</i><span>Made to linger</span><i>/</i><span>Sur Mer, Maadi</span><i>/</i>
        <span>Beirut energy</span><i>/</i><span>Cairo hospitality</span><i>/</i><span>Made to linger</span><i>/</i><span>Sur Mer, Maadi</span><i>/</i>
      </div>
    </div>
  );
}

function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('is-visible');
    }), { threshold: 0.14 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function Home() {
  useReveal();

  return (
    <div className="site-shell">
      <Header />
      <main>
        <section className="hero-section" aria-label="Villa Caracas introduction">
          <div className="hero-image" style={{ backgroundImage: `url(${interiorImage})` }} />
          <div className="hero-wash" />
          <div className="hero-content">
            <p className="eyebrow eyebrow-light">Maadi, Cairo <span>/</span> Since the good times</p>
            <h1>A table<br /><i>worth</i> sharing.</h1>
            <p className="hero-description">Lebanese food, poured generously. An evening by the Mediterranean, right here on St. 9.</p>
            <div className="hero-ctas">
              <Link href="/menu" className="button button-yellow" data-testid="link-hero-menu">Explore the menu <ArrowDownRight size={17} /></Link>
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="button button-ghost" data-testid="link-hero-book">Book a table <ArrowUpRight size={17} /></a>
            </div>
          </div>
          <div className="hero-footer">
            <span className="mono-label">X746+8MR, St. 9, Maadi</span>
            <span className="scroll-cue"><span className="scroll-line" /> Scroll to wander</span>
            <span className="mono-label">08:00 — 00:00 <span className="desktop-only">/</span> Daily</span>
          </div>
        </section>
        <Marquee />

        <section className="story-section section-padding" id="story">
          <div className="story-grid">
            <Reveal className="story-heading">
              <p className="eyebrow">01 / The house</p>
              <h2>Made for<br /><i>your people.</i></h2>
              <span className="giant-index">01</span>
            </Reveal>
            <Reveal className="story-copy">
              <p className="lead-copy">The iconic taste of Villa Caracas, reimagined Sur Mer.</p>
              <p>There is a certain hour when Cairo turns honey-coloured and every good plan starts with “just one more.” Villa Caracas is made for that hour — a spirited Lebanese table where family dinners stretch, friends arrive unannounced, and the night has nowhere else to be.</p>
              <p>Come for the mezze. Stay for the stories.</p>
              <Link href="/menu" className="text-link" data-testid="link-story-menu">Meet the menu <ArrowUpRight size={16} /></Link>
            </Reveal>
          </div>
        </section>

        <section className="dishes-section section-padding">
          <Reveal className="section-intro">
            <div><p className="eyebrow">02 / From the table</p><h2>Signatures<br /><i>in the making.</i></h2></div>
            <p className="section-note">The dishes people come back for.<br />Best enjoyed with a crowded table.</p>
          </Reveal>
          <div className="dishes-grid">
            {signatureDishes.map((dish) => (
              <Reveal className={`dish-card dish-${dish.number}`} key={dish.name}>
                <Link href="/menu" className="dish-image-link" data-testid={`link-dish-${dish.number}`}>
                  <div className="dish-image" style={{ backgroundImage: `url(${dish.image})` }} />
                  <span className="dish-arrow"><ArrowUpRight size={19} /></span>
                </Link>
                <div className="dish-meta"><span className="mono-label">{dish.number}</span><h3>{dish.name}</h3><p>{dish.note}</p></div>
              </Reveal>
            ))}
          </div>
          <Reveal className="center-link"><Link href="/menu" className="button button-dark" data-testid="link-full-menu">View the full menu <ArrowUpRight size={16} /></Link></Reveal>
        </section>

        <section className="atmosphere-section" id="atmosphere">
          <div className="atmosphere-photo" style={{ backgroundImage: `url(${interiorImage})` }} />
          <div className="atmosphere-overlay" />
          <Reveal className="atmosphere-content">
            <p className="eyebrow eyebrow-light">03 / After sunset</p>
            <h2>Follow the journey.<br /><i>Feel the atmosphere.</i></h2>
            <p>Warm light. Tall pours. The sound of a table finding its rhythm.</p>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="text-link text-link-light" data-testid="link-atmosphere-book">Make an evening of it <ArrowUpRight size={16} /></a>
          </Reveal>
          <div className="atmosphere-stamp">V<br /><span>C</span></div>
        </section>

        <section className="perks-section section-padding">
          <Reveal className="perks-header"><p className="eyebrow">04 / Your kind of night</p><h2>Come as you are.<br /><i>Stay as long as you like.</i></h2></Reveal>
          <div className="perks-list">
            <Reveal className="perk-row"><span className="perk-number">01</span><div><h3>Outdoor seating</h3><p>Open-air tables for Cairo’s softer evenings.</p></div><ArrowUpRight size={21} /></Reveal>
            <Reveal className="perk-row"><span className="perk-number">02</span><div><h3>Great cocktails</h3><p>Bright, botanical, and built for the second round.</p></div><ArrowUpRight size={21} /></Reveal>
            <Reveal className="perk-row"><span className="perk-number">03</span><div><h3>Vegetarian-friendly</h3><p>A generous table for every kind of appetite.</p></div><ArrowUpRight size={21} /></Reveal>
          </div>
        </section>

        <section className="review-section">
          <Reveal className="review-inner">
            <div className="review-mark">“</div>
            <p className="eyebrow eyebrow-yellow">05 / The word on St. 9</p>
            <blockquote>“A place that makes an ordinary Tuesday feel like a reason to gather.”</blockquote>
            <div className="review-source"><span className="stars">{[1, 2, 3, 4, 5].map((star) => <Star key={star} size={14} fill="currentColor" />)}</span><span>4.3 / 5 on Google</span><span className="review-divider" /><span>3,200+ reviews</span></div>
          </Reveal>
        </section>

        <section className="visit-section section-padding" id="visit">
          <Reveal className="visit-heading"><p className="eyebrow">06 / Come find us</p><h2>See you<br /><i>at the villa.</i></h2></Reveal>
          <div className="visit-grid">
            <Reveal className="visit-card"><MapPin size={19} /><p className="eyebrow">The address</p><a href="https://www.google.com/maps/search/?api=1&query=X746%2B8MR%2C%20St.%209%2C%20Maadi%2C%20Cairo%2C%20Egypt" target="_blank" rel="noreferrer" data-testid="link-map">X746+8MR, St. 9<br />Maadi, Cairo, Egypt 4212011 <ArrowUpRight size={14} /></a></Reveal>
            <Reveal className="visit-card"><Clock3 size={19} /><p className="eyebrow">Every day</p><p data-testid="text-hours">8:00 AM — 12:00 AM</p><span>Breakfast through late supper.</span></Reveal>
            <Reveal className="visit-card"><Phone size={19} /><p className="eyebrow">Reservations</p><a href="tel:+201017118882" data-testid="link-phone">010 17118882</a><a href={whatsappUrl} target="_blank" rel="noreferrer" data-testid="link-whatsapp">WhatsApp booking inquiries <ArrowUpRight size={14} /></a></Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function MenuPage() {
  const [active, setActive] = useState('All');
  const filters = ['All', 'To begin', 'From the kitchen', 'A sweet ending'];
  useReveal();
  return (
    <div className="site-shell menu-page">
      <Header />
      <main>
        <section className="menu-hero">
          <div className="menu-hero-copy"><p className="eyebrow">Villa Caracas / The menu</p><h1>Pass the<br /><i>plates.</i></h1><p>Lebanese favourites, generous pours, and a few Caracas signatures. Order for the table.</p></div>
          <div className="menu-hero-art" style={{ backgroundImage: `url(${brideImage})` }}><span>Made to share</span></div>
        </section>
        <section className="menu-list-section section-padding">
          <div className="menu-toolbar"><p className="eyebrow">The current table</p><div className="filter-row">{filters.map((filter) => <button type="button" key={filter} onClick={() => setActive(filter)} className={`filter-button ${active === filter ? 'filter-active' : ''}`} data-testid={`button-filter-${filter.toLowerCase().replaceAll(' ', '-')}`}>{filter}</button>)}</div></div>
          <div className="menu-columns">
            {menuSections.filter((section) => active === 'All' || active === section.title).map((section, sectionIndex) => (
              <Reveal className="menu-category" key={section.title}>
                <div className="category-heading"><span className="mono-label">0{sectionIndex + 1}</span><div><h2>{section.title}</h2><p>{section.arabic}</p></div></div>
                <div className="menu-items">{section.items.map(([name, description], itemIndex) => <div className="menu-item" key={name} data-testid={`menu-item-${sectionIndex}-${itemIndex}`}><div><h3>{name}</h3><p>{description}</p></div><span className="item-rule" /></div>)}</div>
              </Reveal>
            ))}
          </div>
        </section>
        <section className="menu-cta">
          <div><p className="eyebrow eyebrow-light">Save room for the evening</p><h2>Bring your<br /><i>favourite people.</i></h2></div>
          <a href={whatsappUrl} target="_blank" rel="noreferrer" className="button button-yellow" data-testid="link-menu-book">Book a table <ArrowUpRight size={17} /></a>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top"><Logo /><p>Lebanese soul.<br />Cairo nights.</p><a href={whatsappUrl} target="_blank" rel="noreferrer" className="footer-book" data-testid="link-footer-book">Make a reservation <ArrowUpRight size={16} /></a></div>
      <div className="footer-bottom"><span>© Villa Caracas, Maadi</span><span>X746+8MR, St. 9, Maadi, Cairo</span><div className="social-links"><a href="https://www.instagram.com/caracasegypt/" target="_blank" rel="noreferrer" aria-label="Instagram @caracasegypt" data-testid="link-instagram"><Instagram size={17} /><span>@caracasegypt</span></a><a href="https://www.facebook.com/CaracasCairo" target="_blank" rel="noreferrer" aria-label="Facebook Caracas Cairo" data-testid="link-facebook"><Facebook size={17} /><span>Caracas Cairo</span></a></div></div>
    </footer>
  );
}

function Router() {
  return <RoutedErrorBoundary><Switch><Route path="/" component={Home} /><Route path="/menu" component={MenuPage} /><Route component={NotFound} /></Switch></RoutedErrorBoundary>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;
