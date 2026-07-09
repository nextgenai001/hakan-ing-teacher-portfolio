import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Phone,
  Mail,
  MapPin,
  Award,
  BookOpen,
  CheckCircle2,
  MessageCircle,
  Menu,
  X,
  Star,
  ChevronRight,
  User,
  Sparkles,
  BookMarked,
  Quote,
  ShieldCheck,
  Languages,
  PenSquare,
  Edit2,
  Calendar,
  Check,
  ThumbsUp,
  Image as ImageIcon,
  ArrowUpRight
} from "lucide-react";
import { portfolioData, Testimonial } from "./data";

export default function App() {
  const [lang, setLang] = useState<"tr" | "en">("tr");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const profilePic = "/profile-picture.png";

  // Testimonials State with localStorage persistence for new reviews
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    const saved = localStorage.getItem("hakan_testimonials");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return portfolioData.testimonials;
      }
    }
    return portfolioData.testimonials;
  });

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    name: "",
    roleTr: "",
    roleEn: "",
    rating: 5,
    textTr: "",
    textEn: ""
  });

  // Contact Form State
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    goal: "IELTS",
    message: ""
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  // Active Section Tracker on Scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "skills", "timeline", "reviews", "contact"];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.textTr) return;

    const reviewToAdd: Testimonial = {
      id: `custom-${Date.now()}`,
      name: newReview.name,
      role: {
        tr: newReview.roleTr || "İngilizce Öğrencisi",
        en: newReview.roleEn || "English Student"
      },
      rating: newReview.rating,
      text: {
        tr: newReview.textTr,
        en: newReview.textEn || newReview.textTr
      }
    };

    const updated = [reviewToAdd, ...testimonials];
    setTestimonials(updated);
    localStorage.setItem("hakan_testimonials", JSON.stringify(updated));

    // Reset Form & Close
    setNewReview({
      name: "",
      roleTr: "",
      roleEn: "",
      rating: 5,
      textTr: "",
      textEn: ""
    });
    setIsReviewModalOpen(false);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsFormSubmitted(true);
    setTimeout(() => {
      setIsFormSubmitted(false);
      setContactForm({
        name: "",
        email: "",
        phone: "",
        goal: "IELTS",
        message: ""
      });
    }, 5000);
  };

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-primary-bg text-oxford-navy selection:bg-antique-bronze selection:text-white relative">
      
      {/* BACKGROUND DECORATIVE ELEMENTS */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-[#FAF9F6] via-[#f7f5ed] to-[#FAF9F6] opacity-70 pointer-events-none -z-10" />
      <div className="absolute top-[1200px] right-0 w-96 h-96 rounded-full bg-antique-bronze/5 blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-[800px] left-0 w-96 h-96 rounded-full bg-oxford-navy/5 blur-3xl pointer-events-none -z-10" />

      {/* HEADER / NAVIGATION */}
      <header className="sticky top-0 z-40 bg-primary-bg/90 backdrop-blur-md border-b border-muted-slate/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo Brand */}
          <div className="flex flex-col cursor-pointer" onClick={() => scrollToSection("hero")}>
            <span className="font-serif text-xl md:text-2xl font-bold tracking-tight text-oxford-navy uppercase">
              {portfolioData.name}
            </span>
            <span className="font-mono text-[10px] tracking-widest text-antique-bronze font-medium uppercase">
              {portfolioData.title[lang]}
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { id: "about", tr: "Hakkımda", en: "About" },
              { id: "skills", tr: "Yetenekler", en: "Skills" },
              { id: "timeline", tr: "Deneyim & Eğitim", en: "Journey" },
              { id: "reviews", tr: "Öğrenci Yorumları", en: "Reviews" },
              { id: "contact", tr: "İletişim", en: "Contact" }
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`text-sm font-medium tracking-wide transition-all duration-300 relative py-1 hover:text-antique-bronze ${
                  activeSection === link.id ? "text-antique-bronze" : "text-oxford-navy/85"
                }`}
              >
                {lang === "tr" ? link.tr : link.en}
                {activeSection === link.id && (
                  <motion.div
                    layoutId="activeNavLine"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-antique-bronze"
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Action Tools (Language, CTA, Menu) */}
          <div className="flex items-center space-x-4">
            
            {/* Language Switcher */}
            <div className="flex items-center bg-oxford-navy/5 p-1 rounded-full border border-muted-slate/10">
              <button
                onClick={() => setLang("tr")}
                className={`px-3 py-1 text-xs font-mono font-bold uppercase rounded-full transition-all duration-300 ${
                  lang === "tr"
                    ? "bg-antique-bronze text-white shadow-sm"
                    : "text-oxford-navy/70 hover:text-oxford-navy"
                }`}
              >
                TR
              </button>
              <button
                onClick={() => setLang("en")}
                className={`px-3 py-1 text-xs font-mono font-bold uppercase rounded-full transition-all duration-300 ${
                  lang === "en"
                    ? "bg-antique-bronze text-white shadow-sm"
                    : "text-oxford-navy/70 hover:text-oxford-navy"
                }`}
              >
                EN
              </button>
            </div>

            {/* Quick Consultation CTA */}
            <button
              onClick={() => scrollToSection("contact")}
              className="hidden lg:flex items-center space-x-2 bg-oxford-navy hover:bg-antique-bronze text-white px-5 py-2.5 rounded-lg text-xs font-medium tracking-wider uppercase transition-all duration-300 shadow-md shadow-oxford-navy/10 hover:-translate-y-0.5 cursor-pointer"
            >
              <span>{lang === "tr" ? "Randevu Al" : "Book Trial"}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-oxford-navy hover:bg-oxford-navy/5 transition-colors"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-20 bg-primary-bg border-b border-muted-slate/10 shadow-xl z-30 md:hidden"
          >
            <div className="px-6 py-6 flex flex-col space-y-4">
              {[
                { id: "about", tr: "Hakkımda", en: "About" },
                { id: "skills", tr: "Yetenekler", en: "Skills" },
                { id: "timeline", tr: "Deneyim & Eğitim", en: "Journey" },
                { id: "reviews", tr: "Öğrenci Yorumları", en: "Reviews" },
                { id: "contact", tr: "İletişim", en: "Contact" }
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`text-left py-2 font-serif text-lg border-b border-oxford-navy/5 text-oxford-navy hover:text-antique-bronze transition-colors ${
                    activeSection === link.id ? "text-antique-bronze font-semibold" : ""
                  }`}
                >
                  {lang === "tr" ? link.tr : link.en}
                </button>
              ))}

              <button
                onClick={() => scrollToSection("contact")}
                className="w-full text-center bg-antique-bronze hover:bg-oxford-navy text-white py-3 rounded-lg text-sm font-medium tracking-widest uppercase transition-all duration-300"
              >
                {lang === "tr" ? "Randevu Al" : "Book Trial Now"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section id="hero" className="relative pt-10 pb-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Hero Bio Content (7 cols on desktop) */}
          <div className="lg:col-span-7 flex flex-col space-y-6 md:space-y-8 order-2 lg:order-1">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center space-x-2 bg-antique-bronze/10 border border-antique-bronze/25 px-4 py-1.5 rounded-full w-fit">
              <Sparkles className="w-3.5 h-3.5 text-antique-bronze animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-wider text-antique-bronze font-bold">
                {lang === "tr" ? "Akademik ve Sınav İngilizcesi Uzmanı" : "Academic & Exam English Specialist"}
              </span>
            </div>

            {/* Hero Main Heading */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-oxford-navy leading-[1.1]">
              {lang === "tr" ? (
                <>
                  Küresel Geleceğinizi <br />
                  <span className="text-antique-bronze italic font-normal">İngilizce</span> ile Şekillendirin.
                </>
              ) : (
                <>
                  Shape Your Global <br />
                  Future with <span className="text-antique-bronze italic font-normal">English</span>.
                </>
              )}
            </h1>

            {/* Description Subtitle */}
            <p className="text-muted-slate text-base md:text-lg leading-relaxed max-w-xl">
              {lang === "tr" ? (
                "British Cambridge, IELTS, TOEFL ve YÖKDİL hazırlığında derinlemesine uzmanlık. 5 yılı aşkın süredir dil akademilerinde interaktif ve modern materyallerle öğrencilerimi başarıya ulaştırıyorum."
              ) : (
                "In-depth expertise in British Cambridge, IELTS, TOEFL, and YÖKDİL examination blueprints. Empowering language learners for over 5 years via interactive media and custom coaching structures."
              )}
            </p>

            {/* Quick Contacts Tiles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg pt-2">
              
              <a
                href={portfolioData.contact.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-3.5 bg-white p-3.5 rounded-xl border border-muted-slate/10 hover:border-antique-bronze hover:shadow-lg hover:shadow-antique-bronze/5 transition-all duration-300 group"
              >
                <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[9px] uppercase text-muted-slate tracking-wider">WhatsApp</span>
                  <span className="text-xs font-semibold text-oxford-navy group-hover:text-antique-bronze transition-colors">
                    {portfolioData.contact.phone}
                  </span>
                </div>
              </a>

              <div className="flex items-center space-x-3.5 bg-white p-3.5 rounded-xl border border-muted-slate/10 hover:border-antique-bronze hover:shadow-lg hover:shadow-antique-bronze/5 transition-all duration-300 group">
                <div className="p-2 bg-amber-50 rounded-lg text-antique-bronze group-hover:bg-antique-bronze group-hover:text-white transition-colors duration-300">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[9px] uppercase text-muted-slate tracking-wider">
                    {lang === "tr" ? "Konum" : "Location"}
                  </span>
                  <span className="text-xs font-semibold text-oxford-navy">
                    {portfolioData.contact.address[lang]}
                  </span>
                </div>
              </div>

            </div>

            {/* Hero CTA Button Group */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-4 max-w-md">
              <button
                onClick={() => scrollToSection("contact")}
                className="bg-oxford-navy hover:bg-antique-bronze text-white text-xs font-semibold uppercase tracking-widest px-8 py-4 rounded-xl transition-all duration-300 shadow-xl shadow-oxford-navy/10 text-center cursor-pointer"
              >
                {lang === "tr" ? "Demo Ders Başvurusu" : "Book a Demo Class"}
              </button>
              <button
                onClick={() => scrollToSection("reviews")}
                className="border border-oxford-navy/20 hover:border-antique-bronze text-oxford-navy hover:text-antique-bronze text-xs font-semibold uppercase tracking-widest px-8 py-4 rounded-xl transition-all duration-300 bg-transparent text-center cursor-pointer"
              >
                {lang === "tr" ? "Yorumları İncele" : "Read Student Reviews"}
              </button>
            </div>

          </div>

          {/* Hero Profile Photo Frame (5 cols on desktop) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center order-1 lg:order-2">
            <div className="relative group">
              
              {/* Backing Accent Rectangles */}
              <div className="absolute inset-0 border border-antique-bronze rounded-2xl transform translate-x-4 translate-y-4 -z-10 transition-transform group-hover:translate-x-5 group-hover:translate-y-5 duration-300" />
              <div className="absolute inset-0 border border-oxford-navy/10 rounded-2xl transform -translate-x-2 -translate-y-2 -z-10" />

              {/* Main Image Container */}
              <div className="w-[280px] h-[340px] sm:w-[320px] sm:h-[380px] rounded-2xl overflow-hidden bg-[#e6dfd3] border-4 border-white shadow-xl relative">
                <img
                  src={profilePic}
                  alt={portfolioData.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-[center_30%] grayscale-[15%] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback if image fails to load
                    e.currentTarget.src = profilePic;
                  }}
                />
              </div>



            </div>
          </div>

        </div>
      </section>

      {/* STATS COUNT GRID BAR */}
      <section className="bg-oxford-navy text-primary-bg py-10 border-y border-antique-bronze/25 shadow-inner">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-primary-bg/10">
            {portfolioData.stats.map((stat, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center text-center p-2 md:p-4 first:pt-0 last:pb-0 md:first:pt-4 md:last:pb-4"
              >
                <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-antique-bronze tracking-tight">
                  {stat.value}
                </span>
                <span className="font-mono text-[10px] md:text-xs text-primary-bg/70 uppercase tracking-widest mt-2 font-medium">
                  {stat.label[lang]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT ME & ACADEMIC BIO SECTION */}
      <section id="about" className="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Editorial Header (4 cols) */}
            <div className="lg:col-span-4 flex flex-col space-y-4">
              <div className="flex items-center space-x-2 font-mono text-xs tracking-widest text-antique-bronze uppercase font-bold">
                <span>1</span>
                <span className="text-antique-bronze font-bold font-sans">-</span>
                <span>{lang === "tr" ? "PROFESYONEL ÖZET" : "ABOUT THE TEACHER"}</span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-oxford-navy leading-tight">
                {lang === "tr" ? "Akademik Vizyon & Eğitim Felsefesi" : "Academic Vision & Teaching Philosophy"}
              </h2>
              <div className="w-16 h-1 bg-antique-bronze mt-2" />
              
              {/* Accompanying info card */}
              <div className="bg-white p-6 rounded-xl border border-muted-slate/10 mt-6 hidden lg:block">
                <Quote className="w-8 h-8 text-antique-bronze/20 mb-3" />
                <p className="text-xs text-muted-slate leading-relaxed font-serif italic">
                  {lang === "tr" ? (
                    "\"Eğitim sadece bilgi aktarımı değil, öğrencinin potansiyeline giden kapıyı aralamaktır. Doğru sınav stratejileri ile her hedef dilde başarı mümkündür.\""
                  ) : (
                    "\"Education is not merely the transfer of knowledge, but unlocking the student's inner potential. With strategic practice, any language objective is fully attainable.\""
                  )}
                </p>
                <div className="h-px bg-muted-slate/10 my-4" />
                <span className="text-xs font-mono font-bold text-oxford-navy uppercase">- Hakan Behzadi</span>
              </div>
            </div>

            {/* Content Text (8 cols) */}
            <div className="lg:col-span-8 flex flex-col space-y-6 md:space-y-8">
              
              <div className="relative">
                {/* Big Drop-cap styled text */}
                <p className="text-oxford-navy text-lg md:text-xl leading-relaxed font-serif text-justify first-letter:text-5xl first-letter:font-bold first-letter:text-antique-bronze first-letter:float-left first-letter:mr-3 first-letter:mt-1">
                  {portfolioData.summary[lang]}
                </p>
              </div>

              {/* Curated highlights of exam preparation modules */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                
                <div className="p-6 rounded-xl bg-white border border-muted-slate/5 hover:border-antique-bronze/30 shadow-md shadow-oxford-navy/[0.02] transition-all">
                  <div className="flex items-center space-x-3 mb-3">
                    <BookMarked className="w-5 h-5 text-antique-bronze" />
                    <h3 className="font-serif text-lg font-bold text-oxford-navy">
                      {lang === "tr" ? "Uluslararası Sınavlar" : "International Prep"}
                    </h3>
                  </div>
                  <p className="text-xs text-muted-slate leading-relaxed">
                    {lang === "tr" ? (
                      "IELTS (Academic/General) ve TOEFL iBT için özel konuşma/yazma şablonları, dinleme analizleri ve nokta atışı okuma taktikleri ile hedef skora ulaşma garantili planlar."
                    ) : (
                      "Targeted templates for IELTS (Academic/General) and TOEFL iBT speaking and writing, systematic listening drills, and precise reading speed Hacks."
                    )}
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-white border border-muted-slate/5 hover:border-antique-bronze/30 shadow-md shadow-oxford-navy/[0.02] transition-all">
                  <div className="flex items-center space-x-3 mb-3">
                    <ShieldCheck className="w-5 h-5 text-antique-bronze" />
                    <h3 className="font-serif text-lg font-bold text-oxford-navy">
                      {lang === "tr" ? "Ulusal Sınavlar" : "National Standards"}
                    </h3>
                  </div>
                  <p className="text-xs text-muted-slate leading-relaxed">
                    {lang === "tr" ? (
                      "YÖKDİL ve YDT hazırlığında ileri seviye gramer sadeleştirmeleri, akademik bağlamda kelime çalışmaları ve ÖSYM soru kalıplarının derinlemesine çözümlenmesi."
                    ) : (
                      "Comprehensive YÖKDİL and YDT prep blueprints featuring advanced sentence structuring, academic keyword logs, and strict ÖSYM style analysis."
                    )}
                  </p>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* CORE SKILLS SECTION (Bento Style Grid) */}
      <section id="skills" className="py-20 bg-white border-y border-muted-slate/10">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Header */}
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
            <div className="flex items-center justify-center space-x-2 font-mono text-xs tracking-widest text-antique-bronze uppercase font-bold">
              <span>2</span>
              <span className="text-antique-bronze font-bold font-sans">-</span>
              <span>{lang === "tr" ? "UZMANLIK ALANLARI" : "CURRICULUM SKILLS"}</span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-oxford-navy mt-2">
              {lang === "tr" ? "Pedagojik ve Metodolojik Yetenekler" : "Pedagogical & Methodological Skills"}
            </h2>
            <p className="text-sm text-muted-slate mt-4 max-w-md">
              {lang === "tr" ? (
                "Öğrencinin ders içi aktif katılımını artıran, teknolojiyle entegre modern öğretim metodolojileri."
              ) : (
                "Modern, technology-integrated education approaches that maximize active classroom engagement."
              )}
            </p>
          </div>

          {/* Grid Layout (3 columns) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {portfolioData.skills.map((skill, idx) => (
              <div
                key={idx}
                className="bg-[#FAF9F6] border border-muted-slate/10 rounded-2xl p-8 hover:shadow-xl hover:shadow-antique-bronze/5 hover:border-antique-bronze/30 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  {/* Icon Indicator */}
                  <div className="w-12 h-12 rounded-xl bg-oxford-navy text-antique-bronze flex items-center justify-center mb-6 group-hover:bg-antique-bronze group-hover:text-white transition-all duration-300">
                    {idx === 0 ? (
                      <User className="w-6 h-6" />
                    ) : idx === 1 ? (
                      <Award className="w-6 h-6" />
                    ) : (
                      <BookOpen className="w-6 h-6" />
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-xl font-bold text-oxford-navy mb-4 group-hover:text-antique-bronze transition-colors">
                    {skill.title[lang]}
                  </h3>

                  {/* List bullets */}
                  <ul className="space-y-3">
                    {skill.bullets[lang].map((bullet, bulletIdx) => (
                      <li key={bulletIdx} className="flex items-start space-x-3 text-sm text-muted-slate leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-antique-bronze shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Subtle bottom decorative accent */}
                <div className="h-1 bg-antique-bronze/20 group-hover:bg-antique-bronze w-1/3 transition-all duration-300 mt-8 rounded-full" />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* PROFESSIONAL JOURNEY (Experience & Education Timeline) */}
      <section id="timeline" className="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Header */}
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
            <div className="flex items-center justify-center space-x-2 font-mono text-xs tracking-widest text-antique-bronze uppercase font-bold">
              <span>3</span>
              <span className="text-antique-bronze font-bold font-sans">-</span>
              <span>{lang === "tr" ? "AKADEMİK VE MESLEKİ GEÇMİŞ" : "JOURNEY TIMELINE"}</span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-oxford-navy mt-2">
              {lang === "tr" ? "Eğitim ve İş Deneyimi Kronolojisi" : "Educational & Work Experience Chronology"}
            </h2>
            <div className="w-24 h-1 bg-antique-bronze mt-4 mx-auto" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            
            {/* LEFT SIDE: WORK EXPERIENCE */}
            <div className="flex flex-col space-y-8">
              <div className="flex items-center space-x-3 pb-2 border-b border-muted-slate/10">
                <BookOpen className="w-5 h-5 text-antique-bronze" />
                <h3 className="font-serif text-xl font-extrabold text-oxford-navy uppercase tracking-tight">
                  {lang === "tr" ? "İŞ DENEYİMİ" : "WORK EXPERIENCE"}
                </h3>
              </div>

              <div className="relative pl-6 border-l border-antique-bronze/20 space-y-10">
                {portfolioData.experiences.map((exp) => (
                  <div key={exp.id} className="relative group">
                    
                    {/* Timeline bullet dot */}
                    <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#FAF9F6] border-2 border-antique-bronze group-hover:bg-oxford-navy transition-all duration-300" />
                    
                    {/* Date/Period Badge */}
                    <span className="font-mono text-[10px] tracking-widest text-antique-bronze font-bold bg-antique-bronze/10 px-3 py-1 rounded-full uppercase">
                      {exp.period}
                    </span>

                    {/* Company and Role */}
                    <h4 className="font-serif text-lg font-bold text-oxford-navy mt-3 group-hover:text-antique-bronze transition-colors">
                      {exp.company}
                    </h4>
                    <p className="font-mono text-xs text-muted-slate font-medium uppercase mt-0.5">
                      {exp.role[lang]}
                    </p>

                    {/* Bullets details */}
                    <ul className="mt-4 space-y-2">
                      {exp.details[lang].map((detail, dIdx) => (
                        <li key={dIdx} className="flex items-start space-x-2 text-xs md:text-sm text-muted-slate leading-relaxed">
                          <span className="text-antique-bronze font-bold shrink-0 mt-0.5">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>

                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT SIDE: EDUCATION & HONORS */}
            <div className="flex flex-col space-y-12">
              
              {/* Education block */}
              <div className="flex flex-col space-y-8">
                <div className="flex items-center space-x-3 pb-2 border-b border-muted-slate/10">
                  <User className="w-5 h-5 text-antique-bronze" />
                  <h3 className="font-serif text-xl font-extrabold text-oxford-navy uppercase tracking-tight">
                    {lang === "tr" ? "EĞİTİM" : "EDUCATION"}
                  </h3>
                </div>

                <div className="relative pl-6 border-l border-antique-bronze/20 space-y-10">
                  {portfolioData.education.map((edu) => (
                    <div key={edu.id} className="relative group">
                      
                      {/* Timeline bullet dot */}
                      <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#FAF9F6] border-2 border-antique-bronze group-hover:bg-oxford-navy transition-all duration-300" />
                      
                      {/* Date Badge */}
                      <span className="font-mono text-[10px] tracking-widest text-antique-bronze font-bold bg-antique-bronze/10 px-3 py-1 rounded-full uppercase">
                        {edu.period}
                      </span>

                      {/* Degree and Institution */}
                      <h4 className="font-serif text-lg font-bold text-oxford-navy mt-3 group-hover:text-antique-bronze transition-colors">
                        {edu.degree[lang]}
                      </h4>
                      <p className="font-mono text-xs text-muted-slate font-medium uppercase mt-0.5">
                        {edu.institution}
                      </p>

                    </div>
                  ))}
                </div>
              </div>

              {/* Awards/Honors Block */}
              <div className="flex flex-col space-y-8">
                <div className="flex items-center space-x-3 pb-2 border-b border-muted-slate/10">
                  <Award className="w-5 h-5 text-antique-bronze" />
                  <h3 className="font-serif text-xl font-extrabold text-oxford-navy uppercase tracking-tight">
                    {lang === "tr" ? "ÖDÜLLER & AKADEMİK YAYINLAR" : "AWARDS & PUBLICATIONS"}
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {portfolioData.awards.map((award) => (
                    <div
                      key={award.id}
                      className="bg-white p-5 rounded-xl border border-muted-slate/10 hover:border-antique-bronze/30 transition-all duration-300 flex items-start space-x-4 group"
                    >
                      <div className="p-2 bg-amber-50 rounded-lg text-antique-bronze group-hover:bg-antique-bronze group-hover:text-white transition-colors duration-300">
                        <Award className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col">
                        <h4 className="font-serif text-base font-bold text-oxford-navy group-hover:text-antique-bronze transition-colors">
                          {award.title[lang]}
                        </h4>
                        <p className="text-xs text-muted-slate mt-1 leading-relaxed">
                          {award.description[lang]}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* REVIEWS & TESTIMONIALS SECTION */}
      <section id="reviews" className="py-20 bg-white border-t border-b border-muted-slate/10 relative">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div className="flex flex-col space-y-2 mb-6 md:mb-0 max-w-xl">
              <div className="flex items-center space-x-2 font-mono text-xs tracking-widest text-antique-bronze uppercase font-bold">
                <span>4</span>
                <span className="text-antique-bronze font-bold font-sans">-</span>
                <span>{lang === "tr" ? "ÖĞRENCİ GERİ BİLDİRİMLERİ" : "STUDENT FEEDBACK"}</span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-oxford-navy">
                {lang === "tr" ? "Başarı Hikayeleri ve Yorumlar" : "Success Stories & Testimonials"}
              </h2>
              <p className="text-sm text-muted-slate">
                {lang === "tr" ? (
                  "Hakan Hoca ile sınavlardan hedef skor alan ve akıcı konuşmaya başlayan mutlu öğrencilerin yorumları."
                ) : (
                  "Feedback from students who achieved their dream scores and unlocked fluent English under Hakan's guidance."
                )}
              </p>
            </div>

            {/* Write a Review Button */}
            <button
              onClick={() => setIsReviewModalOpen(true)}
              className="flex items-center space-x-2 bg-oxford-navy hover:bg-antique-bronze text-white text-xs font-semibold tracking-wider uppercase px-5 py-3 rounded-lg transition-all shadow cursor-pointer w-fit shrink-0"
            >
              <PenSquare className="w-4 h-4" />
              <span>{lang === "tr" ? "Yorum Yaz" : "Leave a Review"}</span>
            </button>
          </div>

          {/* Testimonial grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((test) => (
              <div
                key={test.id}
                className="bg-[#FAF9F6] p-8 rounded-2xl border border-muted-slate/10 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative"
              >
                
                {/* Vintage quotation icon */}
                <span className="absolute top-4 right-6 font-serif text-6xl text-antique-bronze/10 pointer-events-none select-none">
                  “
                </span>

                <div>
                  {/* Rating Stars */}
                  <div className="flex items-center space-x-1 mb-4 text-amber-500">
                    {Array.from({ length: test.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500" />
                    ))}
                  </div>

                  {/* Body Text */}
                  <p className="text-sm md:text-base lg:text-[17px] text-oxford-navy/90 leading-relaxed font-serif italic mb-6">
                    "{test.text[lang]}"
                  </p>
                </div>

                {/* Student Info */}
                <div className="flex items-center space-x-3 pt-4 border-t border-oxford-navy/5">
                  <div className="w-10 h-10 rounded-full bg-antique-bronze/10 text-antique-bronze font-serif font-bold text-sm flex items-center justify-center border border-antique-bronze/20 uppercase">
                    {test.name.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-oxford-navy uppercase">{test.name}</span>
                    <span className="font-mono text-[9px] tracking-wide text-muted-slate font-semibold uppercase mt-0.5">
                      {test.role[lang]}
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CONTACT & BOOKING CONSULTATION SECTION */}
      <section id="contact" className="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Details Column (5 cols) */}
            <div className="lg:col-span-5 flex flex-col space-y-8">
              <div>
                <div className="flex items-center space-x-2 font-mono text-xs tracking-widest text-antique-bronze uppercase font-bold">
                  <span>5</span>
                  <span className="text-antique-bronze font-bold font-sans">-</span>
                  <span>{lang === "tr" ? "İLETİŞİM VE KAYIT" : "CONTACT & INQUIRY"}</span>
                </div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-oxford-navy mt-2">
                  {lang === "tr" ? "Bir Demo Dersi Planlayın" : "Schedule a Trial Session"}
                </h2>
                <p className="text-sm text-muted-slate mt-4 leading-relaxed">
                  {lang === "tr" ? (
                    "Hedeflerinizi belirlemek, seviye tespiti yapmak ve size özel ders müfredatını hazırlamak için ücretsiz ön görüşme formu doldurun veya doğrudan ulaşın."
                  ) : (
                    "Complete the discovery form to analyze your current English bands, clarify milestones, and blueprint your bespoke prep curriculum."
                  )}
                </p>
              </div>

              {/* Action channels list */}
              <div className="flex flex-col space-y-4">
                
                {/* Phone */}
                <div className="flex items-center space-x-4 bg-white p-4 rounded-xl border border-muted-slate/10 hover:border-antique-bronze transition-all duration-300">
                  <div className="p-3 bg-oxford-navy text-antique-bronze rounded-lg">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-muted-slate">
                      {lang === "tr" ? "Telefon" : "Phone & Direct Line"}
                    </span>
                    <a href={`tel:${portfolioData.contact.phoneFormatted}`} className="text-sm font-bold text-oxford-navy hover:text-antique-bronze transition-colors">
                      {portfolioData.contact.phone}
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <a
                  href={portfolioData.contact.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-4 bg-white p-4 rounded-xl border border-muted-slate/10 hover:border-antique-bronze hover:shadow-md transition-all duration-300 group"
                >
                  <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-muted-slate">WhatsApp Chat</span>
                    <span className="text-sm font-bold text-oxford-navy group-hover:text-antique-bronze transition-colors">
                      {lang === "tr" ? "Hemen Mesaj Gönder" : "Send Instant Message"}
                    </span>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-center space-x-4 bg-white p-4 rounded-xl border border-muted-slate/10">
                  <div className="p-3 bg-amber-50 text-antique-bronze rounded-lg">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-muted-slate">
                      {lang === "tr" ? "Ofis & Konum" : "Office Location"}
                    </span>
                    <span className="text-sm font-bold text-oxford-navy">
                      {portfolioData.contact.address[lang]}
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Form Column (7 cols) */}
            <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-2xl border border-muted-slate/10 shadow-xl shadow-oxford-navy/[0.02]">
              
              <h3 className="font-serif text-xl font-bold text-oxford-navy mb-6 pb-2 border-b border-muted-slate/10">
                {lang === "tr" ? "Öğrenci Bilgi Formu" : "Student Consultation Worksheet"}
              </h3>

              {isFormSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-6 rounded-xl flex flex-col items-center text-center space-y-3"
                >
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 animate-bounce" />
                  <h4 className="font-serif text-lg font-bold">
                    {lang === "tr" ? "Tebrikler, Mesajınız Alındı!" : "Consultation Reserved!"}
                  </h4>
                  <p className="text-xs text-emerald-800 leading-relaxed max-w-md">
                    {lang === "tr" ? (
                      "Talebiniz Hakan Behzadi'ye başarıyla iletildi. Seviye tespitiniz ve demo ders planlaması için 24 saat içinde sizinle iletişime geçilecektir."
                    ) : (
                      "Your learning targets have been delivered to Hakan Behzadi. We will contact you within 24 hours to schedule your free diagnostic interview."
                    )}
                  </p>
                  <div className="h-px bg-emerald-200 w-full my-2" />
                  
                  {/* WhatsApp Deep Link Button */}
                  <a
                    href={`${portfolioData.contact.whatsappUrl}?text=${encodeURIComponent(
                      lang === "tr"
                        ? `Merhaba Hakan Bey, adım ${contactForm.name}. Portfolyonuz üzerinden ${contactForm.goal} dersi için randevu formu doldurdum. Sizinle tanışmak ve demo ders planlamak isterim.`
                        : `Hello Mr. Hakan, my name is ${contactForm.name}. I filled out the portfolio form for the ${contactForm.goal} class. I'd love to connect for a demo trial.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-mono tracking-wider uppercase px-4 py-2.5 rounded-lg transition-colors shadow"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{lang === "tr" ? "WhatsApp ile Hızlandır" : "Accelerate via WhatsApp"}</span>
                  </a>
                </motion.div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-5">
                  
                  {/* Name field */}
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="name" className="font-mono text-[10px] uppercase font-bold tracking-wider text-muted-slate">
                      {lang === "tr" ? "Adınız Soyadınız" : "Full Name"} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      placeholder="e.g., Elif Yılmaz"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full px-4 py-3 text-sm bg-[#FAF9F6] border border-muted-slate/20 rounded-xl focus:border-antique-bronze focus:ring-1 focus:ring-antique-bronze outline-none text-oxford-navy transition-all"
                    />
                  </div>

                  {/* Contact Info (Row) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    
                    <div className="flex flex-col space-y-1.5">
                      <label htmlFor="email" className="font-mono text-[10px] uppercase font-bold tracking-wider text-muted-slate">
                        {lang === "tr" ? "E-Posta Adresiniz" : "Email Address"} *
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        placeholder="e.g., student@domain.com"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="w-full px-4 py-3 text-sm bg-[#FAF9F6] border border-muted-slate/20 rounded-xl focus:border-antique-bronze focus:ring-1 focus:ring-antique-bronze outline-none text-oxford-navy transition-all"
                      />
                    </div>

                    <div className="flex flex-col space-y-1.5">
                      <label htmlFor="phone" className="font-mono text-[10px] uppercase font-bold tracking-wider text-muted-slate">
                        {lang === "tr" ? "Telefon Numaranız" : "Phone Number"} *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        required
                        placeholder="e.g., 0552 482 64 48"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        className="w-full px-4 py-3 text-sm bg-[#FAF9F6] border border-muted-slate/20 rounded-xl focus:border-antique-bronze focus:ring-1 focus:ring-antique-bronze outline-none text-oxford-navy transition-all"
                      />
                    </div>

                  </div>

                  {/* Goal Dropdown */}
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="goal" className="font-mono text-[10px] uppercase font-bold tracking-wider text-muted-slate">
                      {lang === "tr" ? "Ders Almak İstediğiniz Alan" : "Primary Learning Milestone"}
                    </label>
                    <select
                      id="goal"
                      value={contactForm.goal}
                      onChange={(e) => setContactForm({ ...contactForm, goal: e.target.value })}
                      className="w-full px-4 py-3 text-sm bg-[#FAF9F6] border border-muted-slate/20 rounded-xl focus:border-antique-bronze focus:ring-1 focus:ring-antique-bronze outline-none text-oxford-navy transition-all"
                    >
                      <option value="IELTS">IELTS Prep (Academic / General)</option>
                      <option value="TOEFL">TOEFL iBT Prep</option>
                      <option value="YÖKDİL">YÖKDİL & YDT Exam Prep</option>
                      <option value="Conversational">General & Speaking Club</option>
                      <option value="Cambridge">British Cambridge General Exams</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="message" className="font-mono text-[10px] uppercase font-bold tracking-wider text-muted-slate">
                      {lang === "tr" ? "Öğrenim Hedefleriniz ve Notlar" : "Goals Statement & Notes"}
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      placeholder={
                        lang === "tr"
                          ? "Şu anki İngilizce seviyeniz nedir? Daha önce sınava girdiniz mi?"
                          : "What is your estimated current CEFR level? Have you taken an exam before?"
                      }
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full px-4 py-3 text-sm bg-[#FAF9F6] border border-muted-slate/20 rounded-xl focus:border-antique-bronze focus:ring-1 focus:ring-antique-bronze outline-none text-oxford-navy transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-antique-bronze hover:bg-oxford-navy text-white text-xs font-semibold tracking-widest uppercase py-4 rounded-xl transition-all duration-300 shadow-lg shadow-antique-bronze/10 text-center cursor-pointer"
                  >
                    {lang === "tr" ? "Demo Ders Başvurusunu Gönder" : "Send Trial Class Inquiry"}
                  </button>

                </form>
              )}

            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-oxford-navy text-primary-bg py-12 border-t border-antique-bronze/35">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center pb-8 border-b border-primary-bg/10">
            
            {/* Column 1: Left */}
            <div className="flex flex-col text-center md:text-left">
              <span className="font-serif text-lg font-bold tracking-wider text-white">
                {portfolioData.name}
              </span>
              <span className="font-mono text-xs text-antique-bronze tracking-widest uppercase mt-1">
                {portfolioData.title[lang]}
              </span>
            </div>

            {/* Column 2: Center (Quick Navigation helper) */}
            <div className="flex justify-center space-x-6 text-xs text-primary-bg/70">
              <button onClick={() => scrollToSection("about")} className="hover:text-antique-bronze transition-colors">
                {lang === "tr" ? "Hakkımda" : "About"}
              </button>
              <button onClick={() => scrollToSection("skills")} className="hover:text-antique-bronze transition-colors">
                {lang === "tr" ? "Yetenekler" : "Skills"}
              </button>
              <button onClick={() => scrollToSection("reviews")} className="hover:text-antique-bronze transition-colors">
                {lang === "tr" ? "Yorumlar" : "Reviews"}
              </button>
              <button onClick={() => scrollToSection("contact")} className="hover:text-antique-bronze transition-colors">
                {lang === "tr" ? "İletişim" : "Contact"}
              </button>
            </div>

            {/* Column 3: Right (Direct Actions) */}
            <div className="flex justify-center md:justify-end space-x-3">
              <a
                href={portfolioData.contact.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-primary-bg/5 hover:bg-emerald-600 hover:text-white flex items-center justify-center text-emerald-500 border border-primary-bg/10 transition-all duration-300"
                title="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href={`tel:${portfolioData.contact.phoneFormatted}`}
                className="w-10 h-10 rounded-full bg-primary-bg/5 hover:bg-antique-bronze hover:text-white flex items-center justify-center text-antique-bronze border border-primary-bg/10 transition-all duration-300"
                title="Call Phone"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[10px] md:text-xs text-primary-bg/50">
            <span>
              &copy; 2026 {portfolioData.name}. {lang === "tr" ? "Tüm Hakları Saklıdır." : "All Rights Reserved."}
            </span>
            <span className="mt-2 sm:mt-0 font-mono tracking-wider">
              {lang === "tr" ? (
                "Kavaklı, Beylikdüzü - İstanbul, Türkiye"
              ) : (
                "Beylikduzu, Istanbul - Turkey"
              )}
            </span>
          </div>

        </div>
      </footer>

      {/* FLOATING WHATSAPP BUTTON (Mobile & Desktop) */}
      <a
        href={portfolioData.contact.whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-full shadow-2xl shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex items-center justify-center"
        title="WhatsApp Direct Contact"
      >
        <MessageCircle className="w-6 h-6 fill-white text-emerald-500 group-hover:rotate-12 transition-transform duration-300" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-[120px] transition-all duration-300 text-[10px] font-mono tracking-widest uppercase font-bold text-white whitespace-nowrap pl-0 group-hover:pl-2">
          WhatsApp
        </span>
      </a>



      {/* MODAL 2: WRITE A REVIEW */}
      <AnimatePresence>
        {isReviewModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
            
            {/* Backdrop layer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsReviewModalOpen(false)}
              className="absolute inset-0 bg-oxford-navy/80 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-primary-bg w-full max-w-lg p-6 sm:p-8 rounded-2xl border border-antique-bronze/35 shadow-2xl relative z-10 max-h-[90vh] overflow-y-auto"
            >
              
              {/* Close Button */}
              <button
                onClick={() => setIsReviewModalOpen(false)}
                className="absolute top-4 right-4 text-oxford-navy/55 hover:text-oxford-navy"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-3 mb-2">
                <PenSquare className="w-5 h-5 text-antique-bronze" />
                <h3 className="font-serif text-lg font-bold text-oxford-navy">
                  {lang === "tr" ? "Öğrenci Yorumu Yazın" : "Write a Student Review"}
                </h3>
              </div>

              <p className="text-xs text-muted-slate mb-6">
                {lang === "tr" ? (
                  "Hakan Behzadi ile aldığınız eğitim deneyimini paylaşın. Yorumunuz portfolyo sayfasında görüntülenecektir."
                ) : (
                  "Share your educational experience with Hakan Behzadi. Your comment will appear on the portfolio website."
                )}
              </p>

              <form onSubmit={handleReviewSubmit} className="space-y-4">
                
                {/* Name */}
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="studentName" className="font-mono text-[10px] uppercase font-bold text-muted-slate">
                    {lang === "tr" ? "Adınız Soyadınız" : "Your Name"} *
                  </label>
                  <input
                    type="text"
                    id="studentName"
                    required
                    placeholder="e.g., Sude Karahan"
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs bg-white border border-muted-slate/20 rounded-xl focus:border-antique-bronze focus:ring-1 focus:ring-antique-bronze outline-none text-oxford-navy transition-all"
                  />
                </div>

                {/* Score Rating */}
                <div className="flex flex-col space-y-1.5">
                  <span className="font-mono text-[10px] uppercase font-bold text-muted-slate">
                    {lang === "tr" ? "Puanınız (Yıldız)" : "Rating"}
                  </span>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                        className="text-amber-500 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            newReview.rating >= star ? "fill-amber-500" : "text-muted-slate/30"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Role / Context in TR & EN */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="roleTr" className="font-mono text-[10px] uppercase font-bold text-muted-slate">
                      {lang === "tr" ? "Sınıf / Sınavınız (Türkçe)" : "Course Context (TR)"} *
                    </label>
                    <input
                      type="text"
                      id="roleTr"
                      required
                      placeholder="e.g., IELTS (Skor: 7.0)"
                      value={newReview.roleTr}
                      onChange={(e) => setNewReview({ ...newReview, roleTr: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs bg-white border border-muted-slate/20 rounded-xl focus:border-antique-bronze focus:ring-1 focus:ring-antique-bronze outline-none text-oxford-navy transition-all"
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="roleEn" className="font-mono text-[10px] uppercase font-bold text-muted-slate">
                      {lang === "tr" ? "Sınıf / Sınavınız (İngilizce)" : "Course Context (EN)"}
                    </label>
                    <input
                      type="text"
                      id="roleEn"
                      placeholder="e.g., IELTS (Band: 7.0)"
                      value={newReview.roleEn}
                      onChange={(e) => setNewReview({ ...newReview, roleEn: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs bg-white border border-muted-slate/20 rounded-xl focus:border-antique-bronze focus:ring-1 focus:ring-antique-bronze outline-none text-oxford-navy transition-all"
                    />
                  </div>
                </div>

                {/* Text Content TR */}
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="textTr" className="font-mono text-[10px] uppercase font-bold text-muted-slate">
                    {lang === "tr" ? "Yorumunuz (Türkçe)" : "Your Comment (TR)"} *
                  </label>
                  <textarea
                    id="textTr"
                    required
                    rows={3}
                    placeholder="Eğitim sürecine dair görüşleriniz..."
                    value={newReview.textTr}
                    onChange={(e) => setNewReview({ ...newReview, textTr: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs bg-white border border-muted-slate/20 rounded-xl focus:border-antique-bronze focus:ring-1 focus:ring-antique-bronze outline-none text-oxford-navy transition-all resize-none font-serif"
                  />
                </div>

                {/* Text Content EN */}
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="textEn" className="font-mono text-[10px] uppercase font-bold text-muted-slate">
                    {lang === "tr" ? "Yorumunuz (İngilizce - İsteğe Bağlı)" : "Your Comment (EN - Optional)"}
                  </label>
                  <textarea
                    id="textEn"
                    rows={3}
                    placeholder="Your review in English (We will use TR version if empty)"
                    value={newReview.textEn}
                    onChange={(e) => setNewReview({ ...newReview, textEn: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs bg-white border border-muted-slate/20 rounded-xl focus:border-antique-bronze focus:ring-1 focus:ring-antique-bronze outline-none text-oxford-navy transition-all resize-none font-serif"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-antique-bronze hover:bg-oxford-navy text-white text-xs font-mono tracking-widest uppercase py-3.5 rounded-xl transition-all duration-300 shadow text-center cursor-pointer mt-2"
                >
                  {lang === "tr" ? "Yorumu Yayınla" : "Publish Review"}
                </button>

              </form>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
