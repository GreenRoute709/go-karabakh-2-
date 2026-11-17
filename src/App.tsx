
import { useEffect, useState } from "react";
import {
  Compass,
  Map,
  CalendarDays,
  Heart,
  UserRound,
  Sun,
  Moon,
  Mountain,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  MapPin
} from "lucide-react";

type Tab =
  | "home"
  | "explore"
  | "map"
  | "planner"
  | "services"
  | "profile";

type Theme = "light" | "dark";

// Storage bloklandıqda tətbiq yenə işləsin.
function safeRead(key: string, fallback: string): string {
  try {
    return localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
}

function safeWrite(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Yaddaş əlçatan deyilsə, tətbiq işləməyə davam edir.
  }
}

const navigation = [
  { id: "home", label: "Ana səhifə", icon: Compass },
  { id: "explore", label: "Kəşf et", icon: Mountain },
  { id: "map", label: "Xəritə", icon: Map },
  { id: "planner", label: "Planla", icon: CalendarDays },
  { id: "services", label: "Xidmətlər", icon: Heart },
  { id: "profile", label: "Profil", icon: UserRound }
] as const;

const sections = [
  {
    title: "Məkanları kəşf et",
    description: "Qarabağın tarixi və təbiətini tanı.",
    icon: Mountain,
    tab: "explore" as Tab
  },
  {
    title: "Səyahət planlaşdır",
    description: "Sənə uyğun günlük marşrut yarat.",
    icon: Sparkles,
    tab: "planner" as Tab
  },
  {
    title: "Yerli xidmətlər",
    description: "Demo yerləşmə və nəqliyyat seçimləri.",
    icon: Heart,
    tab: "services" as Tab
  }
];

function App() {
  const [activeTab, setActiveTab] = useState<Tab>("home");

  const [theme, setTheme] = useState<Theme>(() => {
    const saved = safeRead("gk-theme", "light");
    return saved === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    safeWrite("gk-theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme(current =>
      current === "light" ? "dark" : "light"
    );
  }

  

  function renderContent() {
    if (activeTab === "home") {
      return (
        <>
          <section className="hero">
            <div className="hero-pattern" />

            <div className="hero-content">
              <span className="eyebrow">
                <Mountain size={14} />
                AZƏRBAYCANIN MƏDƏNİ İRSİ
              </span>

              <h1>
                Qarabağı
                <br />
                <span>yenidən kəşf et.</span>
              </h1>

              <p>
                Tarix, təbiət və mədəniyyətlə dolu
                unudulmaz səyahətə başla.
              </p>

              <button
                className="primary-button"
                onClick={() => setActiveTab("explore")}
              >
                Kəşfə başla
                <ArrowRight size={17} />
              </button>
            </div>

            <div className="hero-decoration">
              <Mountain size={104} strokeWidth={0.8} />
            </div>
          </section>

          <div className="demo-notice">
            <ShieldCheck size={17} />
            <span>
              DEMO VERSİYA · Məlumatlar nümunə xarakterlidir.
            </span>
          </div>

          <section className="welcome-section">
            <div>
              <span className="section-kicker">SƏYAHƏTİNİ BAŞLA</span>
              <h2>Haradan başlamaq istəyirsən?</h2>
            </div>

            <div className="section-list">
              {sections.map(section => {
                const Icon = section.icon;

                return (
                  <button
                    className="feature-card"
                    key={section.title}
                    onClick={() => setActiveTab(section.tab)}
                  >
                    <div className="feature-icon">
                      <Icon size={23} />
                    </div>

                    <div className="feature-copy">
                      <strong>{section.title}</strong>
                      <span>{section.description}</span>
                    </div>

                    <ArrowRight
                      className="feature-arrow"
                      size={18}
                    />
                  </button>
                );
              })}
            </div>
          </section>

          <section className="safety-card">
            <div className="safety-icon">
              <ShieldCheck size={22} />
            </div>

            <div>
              <strong>Səyahət təhlükəsizliyi</strong>
              <p>
                Qarabağa səfər etməzdən əvvəl təhlükəsizlik
                və giriş qaydaları ilə tanış ol.
              </p>
            </div>

            <button
              className="text-button"
              onClick={() => setActiveTab("profile")}
            >
              <ArrowRight size={18} />
            </button>
          </section>
        </>
      );
    }

    const pageContent: Record<
      Exclude<Tab, "home">,
      { title: string; description: string; icon: typeof Map }
    > = {
      explore: {
        title: "Qarabağı kəşf et",
        description: "15 turizm məkanı və onların məlumatları növbəti mərhələdə əlavə ediləcək.",
        icon: Mountain
      },
      map: {
        title: "Qarabağ xəritəsi",
        description: "İnternet bağlantısı tələb edən interaktiv xəritə hazırlanır.",
        icon: Map
      },
      planner: {
        title: "Səyahət planlayıcısı",
        description: "Altı sualla sənə uyğun günlük səyahət planı yarat.",
        icon: Sparkles
      },
      services: {
        title: "Yerli xidmətlər",
        description: "Demo otellər, qonaq evləri, restoranlar və nəqliyyat seçimləri.",
        icon: Heart
      },
      profile: {
        title: "Mənim profilim",
        description: "Rezervasiyalar, cashback, təhlükəsizlik məlumatları və parametrlər.",
        icon: UserRound
      }
    };

    const page = pageContent[activeTab];
    const PageIcon = page.icon;

    return (
      <section className="placeholder-page">
        <div className="placeholder-icon">
          <PageIcon size={38} />
        </div>

        <span className="section-kicker">
          GO KARABAKH
        </span>

        <h1>{page.title}</h1>
        <p>{page.description}</p>

        <span className="coming-soon">
          <Sparkles size={14} />
          HAZIRLANIR
        </span>

        <button
          className="secondary-button"
          onClick={() => setActiveTab("home")}
        >
          Ana səhifəyə qayıt
        </button>
      </section>
    );
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <button
          className="brand"
          onClick={() => setActiveTab("home")}
          aria-label="Go Karabakh home"
        >
          <div className="brand-mark">
            <Mountain size={23} />
          </div>

          <div className="brand-name">
            <strong>GO KARABAKH</strong>
            <span>DISCOVER AZERBAIJAN</span>
          </div>
        </button>

        <div className="topbar-actions">
          <span className="language-label">AZ</span>

          <button
            className="theme-button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon size={19} />
            ) : (
              <Sun size={19} />
            )}
          </button>
        </div>
      </header>

      <main className="main-content">
        {renderContent()}
      </main>

      <nav className="bottom-nav" aria-label="Main navigation">
        {navigation.map(item => {
          const Icon = item.icon;
          const selected = activeTab === item.id;

          return (
            <button
              key={item.id}
              className={`nav-item ${selected ? "active" : ""}`}
              onClick={() => setActiveTab(item.id)}
              aria-current={selected ? "page" : undefined}
            >
              <Icon size={21} strokeWidth={selected ? 2.4 : 1.8} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <footer className="app-footer">
        <MapPin size={13} />
        <span>Go Karabakh · Independent demo project</span>
      </footer>
    </div>
  );
}

export default App;
