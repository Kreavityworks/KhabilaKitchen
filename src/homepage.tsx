import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- ICONS ---
interface IconProps {
    name: string;
    size?: number;
    className?: string;
}

const Icon: React.FC<IconProps> = ({ name, size = 24, className }) => {
    const icons: Record<string, React.ReactNode> = {
        Star: <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />,
        TrendingUp: <path d="M23 6l-9.5 9.5-5-5L1 18" />,
        ShieldCheck: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
        ChefHat: <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />,
        ArrowRight: <path d="M5 12h14M12 5l7 7-7 7" />,
        ArrowLeft: <path d="M19 12H5M12 19l-7-7 7-7" />,
        MapPin: <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />,
        Phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />,
        Mail: <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />,
        Check: <path d="M20 6L9 17l-5-5" />,
        Search: <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />,
        Calculator: <path d="M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />,
        ZoomIn: <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m-3-3h6" />,
        Menu: <path d="M4 6h16M4 12h16M4 18h16" />,
        X: <path d="M18 6L6 18M6 6l12 12" />
    };
    
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            {icons[name] || icons.Star}
        </svg>
    );
};

// --- DATA (CLEAN NAMES - WAJIB RENAME FILE SESUAI INI) ---
const MENU_DATA = {
    pizza: [
        { id: 'p1', name: "Pizza Turki Mozza", image: "/menu-img/pizza-mozzarella.png", desc: "Full keju mozzarella premium yang mulur.", badge: null },
        { id: 'p2', name: "Pizza Ayam Rempah", image: "/menu-img/pizza-ayam.png", desc: "Ayam suwir dengan bumbu rempah rahasia.", badge: null },
        { id: 'p3', name: "Pizza Meat Lover", image: "/menu-img/pizza-meat-lover.png", desc: "Limpahan daging cincang berbumbu untuk pecinta protein.", badge: null },
        { id: 'p7', name: "Pizza Pepperoni", image: "/menu-img/pizza-pepperoni.png", desc: "Favorit klasik dengan pepperoni sapi pilihan.", badge: null },
        { id: 'p4', name: "Pizza Turki Mix Wagyu", image: "/menu-img/pizza-mix.png", desc: "Signature dish. Perpaduan adonan Turki autentik dengan topping Wagyu premium.", badge: "MASTERPIECE" },
    ],
    rice_noodle: [
        { id: 'm1', name: "Nasi Goreng Rempah", image: "/menu-img/nasi-goreng-rempah.png", desc: "Terlaris harian. Aroma rempah kuat autentik.", badge: "BEST SELLER" },
        { id: 'm2', name: "Nasi Goreng Curry", image: "/menu-img/nasi-goreng-curry.png", desc: "Rasa kari yang rich dan gurih, berbeda dari yang lain.", badge: null },
        { id: 'm3', name: "Nasi Goreng Cabe Hijau", image: "/menu-img/nasi-goreng-cabai-hijau.png", desc: "Pedas segar cabe hijau asli, bikin nagih.", badge: null },
        { id: 'm4', name: "Nasi Goreng Telur", image: "/menu-img/nasi-goreng-telur.png", desc: "Klasik, sederhana, namun rasa bintang lima.", badge: null },
        { id: 'm5', name: "Mie Goreng Rempah", image: "/menu-img/mie-goreng-rempah.png", desc: "Mie kenyal dengan bumbu rempah khas Khabila.", badge: null },
        { id: 'm6', name: "Mie Kuah Telur", image: "/menu-img/mie-kuah-telur.png", desc: "Comfort food. Kuah kaldu hangat yang menenangkan.", badge: null },
        { id: 'm7', name: "Mie Goreng Curry", image: "/menu-img/mie-goreng-curry.png", desc: "Rasa kari fusion yang kuat.", badge: null },
        { id: 'm8', name: "Mie Goreng Cabe Hijau", image: "/menu-img/mie-goreng-cabai-hijau.png", desc: "Sajian pedas untuk pecinta tantangan.", badge: null },
        { id: 'm10', name: "Kwetiau Goreng Rempah", image: "/menu-img/kwetiau-goreng-rempah.png", desc: "Tekstur lebar menyerap bumbu rempah maksimal.", badge: null },
        { id: 'm13', name: "Bihun Goreng Rempah", image: "/menu-img/bihun-goreng-rempah.png", desc: "Menu ringan namun kaya rasa.", badge: null },
    ],
    fast_bites: [
        { id: 'f1', name: "Kebab Wagyu", image: "/menu-img/kebab-wagyu.png", desc: "Tortilla renyah membungkus daging Wagyu cubes tebal.", badge: "PREMIUM" },
        { id: 'f2', name: "Kebab Daging Jumbo", image: "/menu-img/kebab-daging-jumbo.png", desc: "Ukuran lebih besar, daging sapi melimpah.", badge: "PUAS" },
        { id: 'f3', name: "Kebab Daging Sapi", image: "/menu-img/kebab-daging.png", desc: "Kebab sapi klasik favorit semua orang.", badge: null },
        { id: 'f4', name: "Kebab Ayam", image: "/menu-img/kebab-ayam.png", desc: "Isian ayam panggang yang juicy dan sehat.", badge: null },
        { id: 'f5', name: "Burger Daging", image: "/menu-img/burger-daging.png", desc: "Patty sapi tebal dengan roti lembut.", badge: null },
    ],
    wagyu: [
        { id: 'w1', name: "Topping Wagyu", image: "/menu-img/topping-wagyu.png", desc: "Extra mewah. Tambahkan potongan Wagyu asli ke menu apapun.", badge: "ADD ON" }
    ]
};

const WHY_US_DATA = [
    { icon: "TrendingUp", title: "Margin Produk Tinggi", desc: "Menu Wagyu & Pizza Turki memiliki nilai jual tinggi, memberikan margin profit lebih besar dibanding F&B biasa." },
    { icon: "ShieldCheck", title: "Sistem Autopilot", desc: "SOP matang dan manajemen pusat yang kuat memungkinkan Anda menjalankan bisnis tanpa harus standby 24 jam." },
    { icon: "ChefHat", title: "Bahan Baku Premium", desc: "Supply chain terjamin. Kami menggunakan Real Wagyu dan bumbu rempah rahasia yang sulit ditiru kompetitor." },
    { icon: "Star", title: "Rekam Jejak Terbukti", desc: "Konsep yang sudah teruji disukai pasar. Bukan sekadar viral sesaat, tapi bisnis jangka panjang." }
];

const FRANCHISE_PACKAGES = [
    { 
        name: "Paket Silver", 
        price: "65 Juta", 
        desc: "Investasi level awal. Cocok untuk lokasi ruko kecil atau food court.", 
        features: ["Lisensi 3 Tahun", "Full Peralatan Dapur", "Training 2 Karyawan", "Marketing Kit Dasar", "Bebas Royalti (6 Bulan Pertama)"] 
    },
    { 
        name: "Paket Gold", 
        price: "100 Juta", 
        highlight: true, 
        desc: "NILAI TERBAIK. Paket terlengkap untuk booth premium / mini resto.", 
        features: ["Lisensi 5 Tahun", "Desain Booth/Interior Premium", "Peralatan Lengkap + Sistem Kasir", "Bahan Baku Awal (500 Porsi)", "Prioritas Support Pusat", "Manajer Akun Khusus"] 
    },
    { 
        name: "Paket Platinum", 
        price: "150 Juta", 
        desc: "Untuk skala resto penuh. Dominasi pasar di kota Anda.", 
        features: ["Lisensi Seumur Hidup", "Bantuan Setup Resto Penuh", "Training VVIP (Mentoring Owner)", "Dukungan Event Grand Opening", "Kredit Iklan Digital Rp 5 Juta"] 
    }
];

// --- COMPONENTS ---

const TypewriterEffect: React.FC = () => {
    const words = ["Margin Profit Tinggi", "Sistem Autopilot", "Real Wagyu Premium", "Low Risk Investment"];
    const [index, setIndex] = useState(0);
    const [text, setText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [speed, setSpeed] = useState(150);

    useEffect(() => {
        const currentWord = words[index % words.length] || "";
        const type = () => {
            setText(prev => isDeleting ? currentWord.substring(0, prev.length - 1) : currentWord.substring(0, prev.length + 1));
            setSpeed(isDeleting ? 50 : 150);

            if (!isDeleting && text === currentWord) {
                setTimeout(() => setIsDeleting(true), 2000);
            } else if (isDeleting && text === "") {
                setIsDeleting(false);
                setIndex(prev => prev + 1);
            }
        };
        const timer = setTimeout(type, speed);
        return () => clearTimeout(timer);
    }, [text, isDeleting, index]);

    return (
        <span className="text-[#fce2a6] font-bold cursor-default">{text}<span className="animate-pulse">|</span></span>
    );
};

const Navbar: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handler);
        return () => window.removeEventListener('scroll', handler);
    }, []);

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if(el) el.scrollIntoView({ behavior: 'smooth' });
        setIsMobileMenuOpen(false);
    };

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-500 cursor-default ${scrolled || isMobileMenuOpen ? 'glass-nav py-3 md:py-4' : 'bg-transparent py-4 md:py-6'}`}>
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex justify-between items-center relative z-50">
                <div onClick={() => scrollTo('home')} className="relative flex items-center cursor-default">
                    <img 
                        src="/brand/logo.png" 
                        alt="Khabila Logo" 
                        className={`h-6 md:h-12 w-auto relative z-10 object-contain transition-all duration-500 ${!scrolled && !isMobileMenuOpen ? 'brightness-0 invert drop-shadow-lg' : ''}`} 
                        onError={(e) => e.currentTarget.style.display = 'none'} 
                    />
                </div>
                
                <div className="hidden md:flex gap-8 items-center cursor-default">
                    {[
                        {id: 'menu', label: 'Menu'},
                        {id: 'whyus', label: 'Why Us'},
                        {id: 'roi', label: 'Simulasi ROI'},
                        {id: 'packages', label: 'Paket Kemitraan'},
                        {id: 'contact', label: 'Hubungi Kami'}
                    ].map((item) => (
                        <button 
                            key={item.id}
                            onClick={() => scrollTo(item.id)}
                            className={`text-xs font-bold tracking-[0.2em] uppercase transition-colors relative group cursor-default ${!scrolled && !isMobileMenuOpen ? 'text-white drop-shadow-md hover:text-[#fce2a6]' : 'text-[#5d3512] hover:text-[#2d1a0d]'}`}
                        >
                            {item.label}
                            <span className="absolute -bottom-2 left-1/2 h-[1px] bg-gold-gradient transition-all duration-300 w-0 group-hover:w-full group-hover:left-0"></span>
                        </button>
                    ))}
                </div>

                <button 
                    className={`md:hidden flex items-center justify-center p-1 cursor-default transition-colors duration-500 ${!scrolled && !isMobileMenuOpen ? 'text-white drop-shadow-md' : 'text-[#8a5116]'}`}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={28} />
                </button>
            </div>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 w-full h-[100svh] bg-[#f8f2e8]/95 backdrop-blur-xl flex flex-col items-center justify-center z-[100]"
                        style={{ WebkitBackdropFilter: 'blur(20px)' }}
                    >
                        <div className="absolute top-0 left-0 w-full py-3">
                            <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex justify-between items-center">
                                <div className="relative flex items-center cursor-default">
                                    <img src="/brand/logo.png" alt="Khabila Logo" className="h-6 md:h-12 w-auto object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />
                                </div>
                                <button 
                                    className="flex items-center justify-center text-[#8a5116] p-1 cursor-default"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <Icon name="X" size={28} />
                                </button>
                            </div>
                        </div>
                        
                        <div className="flex flex-col gap-5 w-full items-center px-6 mt-8">
                            {[
                                {id: 'menu', label: 'Menu'},
                                {id: 'whyus', label: 'Why Us'},
                                {id: 'roi', label: 'Simulasi ROI'},
                                {id: 'packages', label: 'Paket Kemitraan'},
                                {id: 'contact', label: 'Hubungi Kami'}
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => scrollTo(item.id)}
                                    className="bg-white/95 text-[#8a5116] w-[80%] max-w-[280px] py-4 rounded-full font-bold text-[11px] tracking-[0.2em] uppercase shadow-lg border border-[#f6a93d]/20 transition-transform active:scale-95 cursor-default"
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

// --- SECTIONS ---

const Hero: React.FC = () => (
    <section id="home" className="relative h-[100svh] min-h-[600px] w-full overflow-hidden flex items-center justify-center cursor-default">
        <div className="video-wrapper">
            <video autoPlay loop muted playsInline className="object-cover w-full h-full hidden md:block">
                <source src="/brand/videokhabilapc.mp4" type="video/mp4" />
                <img src="/menu-img/cover.png" alt="Hero Fallback" className="w-full h-full object-cover" />
            </video>
            
            <video autoPlay loop muted playsInline className="object-cover w-full h-full block md:hidden">
                <source src="/brand/videokhabilamobile.mp4" type="video/mp4" />
                <img src="/menu-img/cover.png" alt="Hero Fallback" className="w-full h-full object-cover" />
            </video>
            
            <div className="absolute top-0 w-full h-[25vh] bg-gradient-to-b from-black/60 via-black/20 to-transparent pointer-events-none z-0"></div>
            <div className="absolute bottom-0 w-full h-[35vh] bg-gradient-to-t from-[#f8f2e8] via-[#f8f2e8]/70 to-transparent pointer-events-none"></div>
        </div>

        <div className="relative z-10 text-center max-w-[1400px] mx-auto px-4 md:px-6 w-full h-[100svh] flex flex-col justify-between pt-16 sm:pt-20 md:pt-[13vh] pb-[6vh] md:pb-[8vh]">
            
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="flex flex-col items-center w-full">
                <div className="inline-flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-5 md:py-2 border border-[#d17b22]/30 rounded-full bg-white/90 backdrop-blur-md mb-3 md:mb-5 shadow-xl">
                    <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gold-gradient animate-pulse"></span>
                    <span className="text-gold-gradient text-[8px] md:text-[10px] uppercase tracking-[0.1em] font-bold">#1 Premium Wagyu Pizza Franchise 2026</span>
                </div>
                
                <h1 className="font-serif text-[28px] sm:text-[36px] md:text-5xl lg:text-[4rem] xl:text-[4.5rem] font-bold text-white leading-[1.2] md:leading-[1.1] md:whitespace-nowrap"
                    style={{ textShadow: '0px 8px 20px rgba(93, 53, 18, 0.9), 0px 2px 6px rgba(93, 53, 18, 0.8)' }}>
                    Rasakan Kemewahan,<br className="block md:hidden" /> Miliki Asetnya.
                </h1>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }} className="flex flex-col items-center w-full mt-auto">
                <div className="mb-5 md:mb-8 text-[15px] sm:text-lg md:text-lg lg:text-xl text-white font-light"
                     style={{ textShadow: '0px 3px 10px rgba(93, 53, 18, 1)' }}>
                    Bisnis dengan <TypewriterEffect />
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 md:gap-5 justify-center items-center w-full max-w-[250px] sm:max-w-none mx-auto">
                    <button onClick={() => document.getElementById('roi')?.scrollIntoView({behavior:'smooth'})} className="btn-luxury w-full sm:w-auto px-6 py-3.5 md:px-12 md:py-4 rounded-sm text-[10px] md:text-xs tracking-[0.2em] shadow-xl cursor-default">
                        PELAJARI BISNIS
                    </button>
                    <button onClick={() => document.getElementById('packages')?.scrollIntoView({behavior:'smooth'})} className="btn-outline-luxury w-full sm:w-auto px-6 py-3.5 md:px-12 md:py-4 rounded-sm text-[10px] md:text-xs tracking-[0.2em] flex items-center justify-center gap-3 group bg-white/50 backdrop-blur-sm cursor-default">
                        PILIH SKALA BISNIS
                        <Icon name="ArrowRight" size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </motion.div>

        </div>
    </section>
);

const WhyUs: React.FC = () => (
    <section id="whyus" className="py-10 md:py-24 bg-[#fdfaf5] relative cursor-default overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-8 md:mb-24"
            >
                {/* Teks kecil dapet animasi shimmer gold, Teks Besar solid dark */}
                <span className="text-gold-gradient tracking-[0.4em] text-[9px] md:text-xs font-bold uppercase inline-block pb-1">Strategi Dominasi Pasar</span>
                <h2 className="font-serif text-3xl md:text-6xl lg:text-7xl text-[#2d1a0d] mt-2 md:mt-4">Why Us?</h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-2 gap-3 sm:gap-4 md:gap-8">
                {WHY_US_DATA.map((item, idx) => (
                    <motion.div 
                        key={idx}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: idx * 0.15 }}
                        // Transisi mulus bolak balik saat hover (masuk maupun keluar)
                        className="p-4 md:p-10 glass-card rounded-sm flex flex-col items-center text-center md:items-start md:text-left transform transition-transform duration-300 ease-out hover:scale-[1.03] group cursor-default"
                    >
                        <div className="relative w-10 h-10 md:w-20 md:h-20 rounded-full flex-shrink-0 flex items-center justify-center shadow-sm group-hover:shadow-[0_4px_25px_rgba(246,169,61,0.4)] transition-shadow duration-500 mb-3 md:mb-8">
                            {/* Border Animasi (Garis luarnya doang yang muter/shimmering) */}
                            <div className="absolute inset-0 rounded-full bg-gold-gradient" style={{ animation: 'shimmer 4s linear infinite', backgroundSize: '200% auto' }}></div>
                            {/* Inner circle mask (Bikin garis jadi kelihatan rapi dan gak berisik dalemnya) */}
                            <div className="absolute inset-[1.5px] md:inset-[2px] rounded-full bg-gradient-to-br from-[#ffffff] to-[#f2eadd]"></div>
                            
                            {/* Icon di atas semuanya */}
                            <Icon name={item.icon} size={20} className="w-5 h-5 md:w-10 md:h-10 text-[#d17b22] relative z-10" />
                        </div>
                        <h3 className="font-serif text-[12px] sm:text-base md:text-3xl text-[#2d1a0d] mb-1.5 md:mb-4 group-hover:text-[#8a5116] transition-colors leading-tight">{item.title}</h3>
                        <p className="text-[#6b4724] text-[9px] sm:text-xs md:text-base leading-relaxed">{item.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

const MenuSection: React.FC = () => {
    const [activeTab, setActiveTab] = useState<keyof typeof MENU_DATA>('pizza');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const scrollContainer = useRef<HTMLDivElement>(null);

    const tabs: {id: keyof typeof MENU_DATA, label: string}[] = [
        { id: 'pizza', label: 'Artisan Pizza' },
        { id: 'rice_noodle', label: 'Nasi & Mie' },
        { id: 'fast_bites', label: 'Kebab & Burger' },
        { id: 'wagyu', label: 'Wagyu' }
    ];

    useEffect(() => {
        window.history.replaceState({ tab: 'pizza' }, '', '#pizza');
        const handlePopState = (event: PopStateEvent) => {
            if (event.state && event.state.tab) {
                setActiveTab(event.state.tab);
            } else {
                setActiveTab('pizza');
            }
        };
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    const handleTabChange = (tabId: keyof typeof MENU_DATA) => {
        setActiveTab(tabId);
        if (activeTab !== tabId) {
            window.history.pushState({ tab: tabId }, '', `#${tabId}`);
        }
    };

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainer.current) {
            const scrollAmount = 300;
            scrollContainer.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section id="menu" className="py-10 md:py-24 bg-[#f8f2e8] relative cursor-default overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 md:mb-16 pb-4 md:pb-6 border-b border-[#5d3512]/10 gap-4 md:gap-6"
                >
                    <div>
                        <span className="text-gold-gradient tracking-[0.2em] text-[9px] md:text-xs font-bold uppercase">Koleksi Menu</span>
                        <h2 className="font-serif text-3xl md:text-5xl text-[#2d1a0d] mt-2">Premium Selection</h2>
                    </div>
                    
                    <div className="grid grid-cols-2 md:flex gap-3 md:gap-4 w-full md:w-auto mt-2 md:mt-0">
                        {tabs.map(tab => (
                            <button 
                                key={tab.id}
                                onClick={() => handleTabChange(tab.id)}
                                className={`flex items-center justify-center h-10 md:h-12 text-[9px] md:text-xs font-bold tracking-[0.1em] md:tracking-[0.2em] uppercase px-2 md:px-8 transition-all border rounded-sm md:flex-shrink-0 whitespace-nowrap cursor-default ${activeTab === tab.id ? 'border-[#d17b22] bg-gold-gradient text-white shadow-md' : 'border-[#5d3512]/20 text-[#6b4724] bg-white hover:text-[#2d1a0d] hover:border-[#d17b22]/50'}`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative group"
                >
                    <button 
                        onClick={() => scroll('left')}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 backdrop-blur shadow-lg flex items-center justify-center border border-[#d17b22]/20 hover:bg-[#d17b22] hover:text-white transition-all cursor-default hidden md:flex"
                    >
                        <Icon name="ArrowLeft" size={18} />
                    </button>

                    <button 
                        onClick={() => scroll('right')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 backdrop-blur shadow-lg flex items-center justify-center border border-[#d17b22]/20 hover:bg-[#d17b22] hover:text-white transition-all cursor-default hidden md:flex"
                    >
                        <Icon name="ArrowRight" size={18} />
                    </button>

                    <div 
                        ref={scrollContainer}
                        className="grid grid-cols-2 gap-3 sm:gap-4 md:flex md:overflow-x-auto md:gap-8 pb-0 md:pb-12 md:snap-x md:snap-mandatory hide-scrollbar items-stretch"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        <AnimatePresence mode="wait">
                            {MENU_DATA[activeTab].map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, y: 15, scale: 0.98 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -15, scale: 0.98 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    className="w-full md:min-w-[320px] md:max-w-[320px] md:snap-start group flex flex-col glass-card transition-colors duration-500 hover:border-[#d17b22]/50 overflow-hidden self-stretch"
                                >
                                    <div 
                                        className="relative h-32 sm:h-40 md:h-64 bg-white overflow-hidden border-b-2 md:border-b-4 border-[#d17b22]/20 group-hover:border-[#f6a93d] transition-colors flex-shrink-0 cursor-default"
                                        onClick={() => setSelectedImage(item.image)}
                                    >
                                        <img 
                                            src={item.image} 
                                            alt={item.name} 
                                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" 
                                            onError={(e) => e.currentTarget.style.display = 'none'}
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                            <Icon name="ZoomIn" className="text-white drop-shadow-md w-8 h-8 md:hidden hidden" />
                                        </div>
                                    </div>
                                    <div className="p-3 md:p-8 flex flex-col justify-start flex-grow">
                                        <h4 className="font-serif font-bold md:font-normal text-[11px] md:text-xl text-[#2d1a0d] mb-1 md:mb-2 group-hover:text-[#8a5116] transition-colors leading-tight line-clamp-2">{item.name}</h4>
                                        <p className="text-[#6b4724] text-[9px] md:text-sm leading-relaxed line-clamp-2 md:line-clamp-3">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>

            <AnimatePresence>
                {selectedImage && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 p-4 md:p-6 cursor-default"
                        style={{ backdropFilter: 'blur(15px)', WebkitBackdropFilter: 'blur(15px)', transform: 'translateZ(0)' }}
                    >
                        <motion.img 
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            src={selectedImage}
                            alt="Preview"
                            className="max-w-full max-h-[80vh] object-contain rounded-md shadow-2xl cursor-pointer"
                            onClick={() => setSelectedImage(null)} 
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

const ROISection: React.FC = () => {
    const [sales, setSales] = useState(5000000);
    const profit = sales * 30 * 0.4;
    const bep = 100000000 / profit;
    const formatIDR = (n: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n);

    return (
        <section id="roi" className="py-10 md:py-24 bg-[#f2eadd] relative overflow-hidden cursor-default">
            <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-[#f6a93d]/5 rounded-full blur-[200px] pointer-events-none"></div>
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-stretch">
                    
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-5 flex flex-col h-full"
                    >
                        <div>
                            <span className="text-gold-gradient tracking-[0.2em] text-[9px] md:text-xs font-bold uppercase">Financial Logic</span>
                            <h2 className="font-serif text-3xl md:text-6xl text-[#2d1a0d] mt-2 mb-3 md:mb-6">Data Bicara.<br/>Profit Nyata.</h2>
                            <p className="text-[#6b4724] leading-relaxed text-xs md:text-lg font-light mb-6 md:mb-10 max-w-[420px]">
                                Simulasi ini menggunakan data riil margin industri F&B (40%) yang dioptimalkan dengan strategi High-Ticket Product kami.
                            </p>
                        </div>
                        
                        <div className="glass-card p-5 md:p-8 bg-white/90 border border-[#d17b22]/20 rounded-sm shadow-[0_8px_30px_rgba(93,53,18,0.08)] relative overflow-hidden group w-full mt-6 lg:mt-auto">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gold-gradient"></div>
                            <div className="flex gap-6 md:gap-10 items-center justify-center md:justify-start">
                                <div className="text-center md:text-left">
                                    <span className="block text-3xl md:text-5xl font-serif text-[#2d1a0d] mb-1 md:mb-2">40%</span>
                                    <span className="text-[8px] md:text-[10px] uppercase tracking-widest text-gold-gradient font-bold">Net Margin</span>
                                </div>
                                <div className="w-[1px] h-12 md:h-16 bg-gradient-to-b from-transparent via-[#d17b22]/30 to-transparent"></div>
                                <div className="text-center md:text-left">
                                    <span className="block text-3xl md:text-5xl font-serif text-[#2d1a0d] mb-1 md:mb-2">6-8</span>
                                    <span className="text-[8px] md:text-[10px] uppercase tracking-widest text-gold-gradient font-bold">Bulan BEP</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:col-span-7 glass-card bg-white border border-[#d17b22]/30 p-5 md:p-12 shadow-xl rounded-sm relative flex flex-col h-full mt-4 lg:mt-0"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gold-gradient"></div>
                        <h3 className="text-[#2d1a0d] font-serif text-xl md:text-3xl mb-4 md:mb-8">
                            Simulator Profit
                        </h3>
                        <div className="mb-6 md:mb-12 flex-grow">
                            <div className="flex justify-between items-end mb-2 md:mb-3">
                                <span className="text-[9px] md:text-xs uppercase tracking-widest text-[#825c35]">Omzet Harian</span>
                                <span className="text-gold-gradient font-bold text-lg md:text-2xl">{formatIDR(sales)}</span>
                            </div>
                            <input type="range" min="2000000" max="10000000" step="500000" value={sales} onChange={(e) => setSales(Number(e.target.value))} className="w-full h-1.5 md:h-2 bg-[#e3d5c1] rounded-lg appearance-none cursor-default accent-[#d17b22] mb-2" />
                            <div className="flex justify-between text-[8px] md:text-[10px] text-[#825c35] uppercase tracking-widest"><span>2 Juta</span><span>10 Juta</span></div>
                        </div>
                        <div className="pt-4 md:pt-8 border-t border-[#5d3512]/10 text-center">
                            <span className="block text-[9px] md:text-xs uppercase tracking-widest text-[#825c35] mb-2 md:mb-4">Potensi Profit Bersih / Bulan</span>
                            <div className="text-3xl sm:text-4xl md:text-6xl font-serif text-[#2d1a0d] mb-4 md:mb-8">{formatIDR(profit)}</div>
                            <div className="inline-block px-4 py-1.5 md:px-5 md:py-2 border border-[#8a5116]/30 bg-[#fdfaf5] rounded-full text-[#8a5116] text-[9px] md:text-xs font-bold uppercase tracking-widest">Estimasi BEP: {bep.toFixed(1)} Bulan</div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

const PackagesSection: React.FC = () => (
    <section id="packages" className="py-10 md:py-24 bg-[#f8f2e8] relative cursor-default overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-8 md:mb-20"
            >
                <span className="text-gold-gradient tracking-[0.4em] text-[9px] md:text-xs font-bold uppercase">Investasi Cerdas</span>
                <h2 className="font-serif text-3xl md:text-5xl text-[#2d1a0d] mt-2 md:mt-3">Pilih Skala Bisnis Anda</h2>
            </motion.div>
            
            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 items-stretch"
            >
                {FRANCHISE_PACKAGES.map((pkg, idx) => (
                    <motion.div 
                        key={idx}
                        whileHover={{ y: -5 }}
                        className={`relative p-5 md:p-10 glass-card transition-all duration-300 flex flex-col h-full rounded-sm ${pkg.highlight ? 'border-[#f6a93d] shadow-[0_0_40px_rgba(246,169,61,0.15)] z-10 transform md:-translate-y-6 bg-white mt-2 md:mt-0' : 'hover:border-[#d17b22]/30'}`}
                    >
                        {pkg.highlight && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gold-gradient text-white text-[8px] md:text-[10px] font-bold px-3 md:px-6 py-1 md:py-2 uppercase tracking-widest shadow-lg rounded-sm whitespace-nowrap">Paling Laris</div>}
                        <div className="mb-4 md:mb-10 text-center">
                            <h3 className="font-serif text-xl md:text-3xl text-[#2d1a0d] mb-1.5 md:mb-2">{pkg.name}</h3>
                            <div className="text-2xl md:text-4xl font-bold text-gold-gradient mb-2 md:mb-6 font-serif"><span className="text-[10px] md:text-sm text-[#825c35] font-sans font-normal mr-1">IDR</span>{pkg.price}</div>
                            <p className="text-[#6b4724] text-[10px] md:text-xs leading-relaxed border-b border-[#5d3512]/10 pb-3 md:pb-8">{pkg.desc}</p>
                        </div>
                        
                        <ul className="space-y-2 md:space-y-6 flex-grow">
                            {pkg.features.map((feat, i) => (
                                <li key={i} className="flex items-start gap-2 md:gap-4 text-[10px] md:text-sm text-[#6b4724]"><span className="text-[#d17b22] mt-0.5"><Icon name="Check" size={12} className="md:w-4 md:h-4" /></span><span className="leading-tight">{feat}</span></li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    </section>
);

const ContactSection: React.FC = () => (
    <section id="contact" className="py-10 md:py-32 bg-[#fdfaf5] relative flex items-center text-center cursor-default overflow-hidden">
        <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto px-6 md:px-12 w-full"
        >
            <span className="text-gold-gradient tracking-[0.2em] text-[9px] md:text-xs font-bold uppercase mb-2 md:mb-4 block">Kesempatan Terbatas</span>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-7xl text-[#2d1a0d] mb-3 md:mb-8">Siap Menjadi <br/><span className="text-gold-gradient">Raja Kuliner?</span></h2>
            <p className="text-[#6b4724] mb-6 md:mb-12 leading-relaxed text-xs md:text-lg max-w-2xl mx-auto">Kami membatasi jumlah mitra per kota untuk menjaga eksklusivitas. Amankan lokasi strategis Anda sekarang.</p>
            <a href="https://wa.me/62811826090" target="_blank" rel="noreferrer" className="inline-block btn-luxury px-8 md:px-12 py-3 md:py-5 font-bold uppercase tracking-[0.2em] text-[9px] md:text-sm rounded-sm shadow-[0_0_30px_rgba(246,169,61,0.2)] hover:scale-105 transition-transform cursor-default">
                Daftar Mitra
            </a>
        </motion.div>
    </section>
);

const Footer: React.FC = () => (
    <footer className="bg-[#f8f2e8] border-t border-[#5d3512]/10 pt-10 md:pt-24 pb-6 md:pb-12 relative cursor-default overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-16 mb-10 md:mb-20"
            >
                <div className="md:col-span-5 lg:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
                    <img src="/brand/logo bulet.png" alt="Khabila" className="h-16 md:h-28 w-auto mb-4 md:mb-6 object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />
                    <p className="text-[#6b4724] text-[10px] md:text-xs leading-relaxed mb-4 md:mb-6 max-w-xs md:max-w-none">The Ultimate Franchise Experience. Menggabungkan cita rasa Pizza Turki & Wagyu Jepang.</p>
                </div>
                <div className="md:col-span-3 lg:col-span-4 lg:pl-12 text-center md:text-left">
                    <h4 className="text-[#2d1a0d] font-serif text-base md:text-xl mb-3 md:mb-8">Eksplorasi</h4>
                    <ul className="space-y-2 md:space-y-4 text-[9px] md:text-xs tracking-widest uppercase text-[#825c35]">
                        <li><a href="#menu" className="hover:text-[#8a5116] transition-colors cursor-default">Menu</a></li>
                        <li><a href="#whyus" className="hover:text-[#8a5116] transition-colors cursor-default">Why Us</a></li>
                        <li><a href="#roi" className="hover:text-[#8a5116] transition-colors cursor-default">Simulasi ROI</a></li>
                        <li><a href="#packages" className="hover:text-[#8a5116] transition-colors cursor-default">Paket Investasi</a></li>
                    </ul>
                </div>
                <div className="md:col-span-4 lg:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
                    <h4 className="text-[#2d1a0d] font-serif text-base md:text-xl mb-3 md:mb-8">Kontak</h4>
                    <ul className="space-y-2 md:space-y-4 text-[10px] md:text-sm text-[#825c35]">
                        <li className="flex items-start justify-center md:justify-start gap-2 md:gap-3"><Icon name="MapPin" size={14} className="text-[#d17b22] mt-0.5 flex-shrink-0 md:w-[18px] md:h-[18px]" /><span>Jakarta Selatan, Indonesia</span></li>
                        <li className="flex items-center justify-center md:justify-start gap-2 md:gap-3"><Icon name="Phone" size={14} className="text-[#d17b22] flex-shrink-0 md:w-[18px] md:h-[18px]" /><span>+62 811-826-090</span></li>
                        <li className="flex items-center justify-center md:justify-start gap-2 md:gap-3"><Icon name="Mail" size={14} className="text-[#d17b22] flex-shrink-0 md:w-[18px] md:h-[18px]" /><span>franchise@khabila.com</span></li>
                    </ul>
                </div>
            </motion.div>
            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="border-t border-[#5d3512]/10 pt-5 md:pt-10 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-6"
            >
                <p className="text-[#825c35] text-[8px] md:text-[10px] uppercase tracking-widest text-center md:text-left">© 2026 Khabila Kitchen. All Rights Reserved.</p>
                <div className="flex gap-4 md:gap-8 text-[8px] md:text-[10px] uppercase tracking-widest text-[#825c35]"><a href="#" className="hover:text-[#d17b22] cursor-default">Kebijakan Privasi</a><a href="#" className="hover:text-[#d17b22] cursor-default">Syarat & Ketentuan</a></div>
            </motion.div>
        </div>
    </footer>
);

const App: React.FC = () => {
    return (
        <div className="antialiased selection:bg-[#f6a93d] selection:text-white cursor-default">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');

                .font-serif { font-family: 'Playfair Display', serif !important; }
                .font-sans { font-family: 'Inter', sans-serif !important; }

                html { scroll-behavior: smooth; cursor: default; }
                body { 
                    background-color: #f8f2e8;
                    color: #2d1a0d; 
                    overflow-x: hidden; 
                    cursor: default;
                }
                
                button, a, input, select, .cursor-pointer {
                    cursor: default !important;
                }
                
                .bg-gold-gradient {
                    background: linear-gradient(135deg, #f6a93d 0%, #e69628 25%, #c87a27 50%, #e69628 75%, #8a5116 100%);
                    background-size: 200% auto;
                    transition: 0.5s;
                }
                .bg-gold-gradient:hover {
                    background-position: right center;
                }

                .text-gold-gradient {
                    background: linear-gradient(to right, #8a5116, #f6a93d, #5d3512, #f6a93d, #8a5116);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-size: 200% auto;
                    animation: shimmer 6s linear infinite;
                }
                
                .glass-nav { 
                    background: rgba(248, 242, 232, 0.85); 
                    backdrop-filter: blur(20px); 
                    -webkit-backdrop-filter: blur(20px);
                    border-bottom: 1px solid rgba(93, 53, 18, 0.1); 
                }

                .glass-overlay {
                    background: rgba(248, 242, 232, 0.65);
                    backdrop-filter: blur(25px);
                    -webkit-backdrop-filter: blur(25px);
                    transform: translateZ(0); /* Hardware acceleration fix for iOS Safari */
                }
                
                .glass-card { 
                    background: linear-gradient(145deg, rgba(255, 255, 255, 0.9) 0%, rgba(253, 250, 245, 0.8) 100%);
                    backdrop-filter: blur(10px); 
                    border: 1px solid rgba(93, 53, 18, 0.1); 
                    box-shadow: 0 10px 40px -10px rgba(93, 53, 18, 0.05);
                }
                
                .btn-luxury {
                    background: linear-gradient(90deg, #f6a93d 0%, #fce2a6 40%, #c87a27 100%);
                    color: #1a0f07 !important;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.15em;
                    position: relative;
                    z-index: 1;
                    transition: all 0.4s ease;
                    box-shadow: 0 4px 15px rgba(246, 169, 61, 0.3);
                }
                .btn-luxury:hover {
                    box-shadow: 0 0 25px rgba(246, 169, 61, 0.5);
                    transform: scale(1.02);
                }

                .btn-outline-luxury {
                    background: transparent;
                    border: 1px solid #c87a27;
                    color: #8a5116;
                    position: relative;
                    overflow: hidden;
                    transition: all 0.3s ease;
                }
                .btn-outline-luxury:hover {
                    background: rgba(246, 169, 61, 0.1);
                    border-color: #f6a93d;
                    box-shadow: 0 0 15px rgba(246, 169, 61, 0.2);
                }

                .video-wrapper {
                    position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; z-index: 0;
                }
                .video-wrapper video {
                    min-width: 100%; min-height: 100%; width: auto; height: auto; position: absolute;
                    top: 50%; left: 50%; transform: translate(-50%, -50%); object-fit: cover;
                }

                .hide-scrollbar::-webkit-scrollbar {
                  display: none;
                }
                .hide-scrollbar {
                  -ms-overflow-style: none;
                  scrollbar-width: none;
                }
                
                ::-webkit-scrollbar { width: 6px; }
                ::-webkit-scrollbar-track { background: #f8f2e8; }
                ::-webkit-scrollbar-thumb { background: linear-gradient(to bottom, #f6a93d, #8a5116); border-radius: 10px; }

                @keyframes shimmer {
                    0% { background-position: 200% 0; }
                    100% { background-position: -200% 0; }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
            `}</style>

            <Navbar />
            <Hero />
            <MenuSection />
            <WhyUs />
            <ROISection />
            <PackagesSection />
            <ContactSection />
            <Footer />
        </div>
    );
};

export default App;