import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- ICONS (SVG OPTIMIZED) ---
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

// --- DATA ---
const MENU_DATA = {
    pizza: [
        { id: 'p1', name: "Pizza Turki Mix Wagyu", image: "/menu-img/pizza-mix.png", desc: "Signature dish. Perpaduan adonan Turki autentik dengan topping Wagyu premium.", badge: "MASTERPIECE" },
        { id: 'p2', name: "New Pizza Wagyu Mozza", image: "/menu-img/pizza-wagyu-mozza.png", desc: "Sensasi leleh keju mozzarella bertemu potongan Wagyu cubes.", badge: "BARU" },
        { id: 'p3', name: "Pizza Meat Lover", image: "/menu-img/pizza-meat-lover.png", desc: "Limpahan daging cincang berbumbu untuk pecinta protein.", badge: null },
        { id: 'p4', name: "Pizza Turki Mozza", image: "/menu-img/pizza-mozzarella.png", desc: "Full keju mozzarella premium yang mulur.", badge: null },
        { id: 'p5', name: "Pizza Pepperoni", image: "/menu-img/pizza-pepperoni.png", desc: "Favorit klasik dengan pepperoni sapi pilihan.", badge: null },
        { id: 'p6', name: "Pizza Ayam Rempah", image: "/menu-img/pizza-ayam.png", desc: "Ayam suwir dengan bumbu rempah rahasia.", badge: null },
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
        <span className="text-gold-gradient font-bold cursor-default">{text}<span className="animate-pulse">|</span></span>
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
                    <img src="/brand/logo.png" alt="Khabila Logo" className="h-6 md:h-12 w-auto relative z-10 object-contain" />
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
                            className="text-xs font-bold tracking-[0.2em] uppercase transition-colors relative group text-[#5d3512] hover:text-[#2d1a0d] cursor-default"
                        >
                            {item.label}
                            <span className="absolute -bottom-2 left-1/2 h-[1px] bg-gold-gradient transition-all duration-300 w-0 group-hover:w-full group-hover:left-0"></span>
                        </button>
                    ))}
                </div>

                <button 
                    className="md:hidden flex items-center justify-center text-[#8a5116] p-1 cursor-default"
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
                    >
                        <div className="absolute top-0 left-0 w-full px-6 py-4 flex justify-between items-center">
                            <img src="/brand/logo.png" alt="Khabila Logo" className="h-6 w-auto object-contain" />
                            <button className="text-[#8a5116] p-1" onClick={() => setIsMobileMenuOpen(false)}>
                                <Icon name="X" size={28} />
                            </button>
                        </div>
                        
                        <div className="flex flex-col gap-5 w-full items-center px-6 mt-8">
                            {['menu', 'whyus', 'roi', 'packages', 'contact'].map((id) => (
                                <button
                                    key={id}
                                    onClick={() => scrollTo(id)}
                                    className="bg-white/95 text-[#8a5116] w-[80%] max-w-[280px] py-4 rounded-full font-bold text-[11px] tracking-[0.2em] uppercase shadow-lg border border-[#f6a93d]/20"
                                >
                                    {id.replace(/([A-Z])/g, ' $1').trim()}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

const Hero: React.FC = () => (
    <section id="home" className="relative h-[100svh] min-h-[600px] w-full overflow-hidden flex items-center justify-center cursor-default">
        <div className="video-wrapper">
            <video autoPlay loop muted playsInline className="opacity-30 grayscale-[10%] object-cover w-full h-full hidden md:block">
                <source src="/brand/videokhabilapc.mp4" type="video/mp4" />
            </video>
            <video autoPlay loop muted playsInline className="opacity-30 grayscale-[10%] object-cover w-full h-full block md:hidden">
                <source src="/brand/videokhabilamobile.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-[#f8f2e8] via-[#f8f2e8]/80 to-transparent"></div>
        </div>

        <div className="relative z-10 text-center max-w-6xl px-6 mt-12 md:mt-10 w-full">
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#d17b22]/30 rounded-full bg-white/80 backdrop-blur-md mb-6 shadow-xl">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-gradient animate-pulse"></span>
                    <span className="text-gold-gradient text-[9px] md:text-xs uppercase tracking-[0.3em] font-bold">The #1 Premium Wagyu Franchise 2026</span>
                </div>
                
                <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-bold text-[#2d1a0d] leading-[1.1] mb-6 drop-shadow-sm">
                    Rasakan Kemewahan,<br />
                    Miliki Asetnya.
                </h1>
                
                <div className="h-8 md:h-16 mb-8 text-sm md:text-2xl lg:text-3xl text-[#6b4724] font-light">
                    Bisnis dengan <TypewriterEffect />
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md mx-auto sm:max-w-none">
                    <button onClick={() => document.getElementById('roi')?.scrollIntoView({behavior:'smooth'})} className="btn-luxury w-full sm:w-auto px-12 py-4 rounded-sm text-[10px] md:text-xs tracking-[0.2em] shadow-xl">
                        PELAJARI BISNIS
                    </button>
                    <button onClick={() => document.getElementById('packages')?.scrollIntoView({behavior:'smooth'})} className="btn-outline-luxury w-full sm:w-auto px-12 py-4 rounded-sm text-[10px] md:text-xs tracking-[0.2em] flex items-center justify-center gap-3 group bg-white/50 backdrop-blur-sm">
                        PILIH SKALA BISNIS
                        <Icon name="ArrowRight" size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </motion.div>
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
        <section id="menu" className="py-10 md:py-24 bg-[#f8f2e8] relative cursor-default">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 pb-4 border-b border-[#5d3512]/10 gap-4">
                    <div>
                        <span className="text-gold-gradient tracking-[0.2em] text-[9px] md:text-xs font-bold uppercase">Koleksi Menu</span>
                        <h2 className="font-serif text-3xl md:text-5xl text-[#2d1a0d] mt-2">Premium Selection</h2>
                    </div>
                    <div className="grid grid-cols-2 md:flex gap-3 w-full md:w-auto mt-2 md:mt-0">
                        {tabs.map(tab => (
                            <button 
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center justify-center h-10 md:h-12 text-[9px] md:text-xs font-bold tracking-[0.1em] uppercase px-2 md:px-8 transition-all border rounded-sm md:flex-shrink-0 whitespace-nowrap ${activeTab === tab.id ? 'border-[#d17b22] bg-gold-gradient text-white shadow-md' : 'border-[#5d3512]/20 text-[#6b4724] bg-white hover:text-[#2d1a0d]'}`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="relative group">
                    <button onClick={() => scroll('left')} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-12 h-12 rounded-full bg-white/90 shadow-lg hidden md:flex items-center justify-center border border-[#d17b22]/20 hover:bg-[#d17b22] hover:text-white transition-all"><Icon name="ArrowLeft" size={18} /></button>
                    <button onClick={() => scroll('right')} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-12 h-12 rounded-full bg-white/90 shadow-lg hidden md:flex items-center justify-center border border-[#d17b22]/20 hover:bg-[#d17b22] hover:text-white transition-all"><Icon name="ArrowRight" size={18} /></button>

                    <div ref={scrollContainer} className="grid grid-cols-2 gap-3 sm:gap-4 md:flex md:overflow-x-auto md:gap-8 pb-4 md:pb-12 md:snap-x md:snap-mandatory hide-scrollbar">
                        <AnimatePresence mode="wait">
                            {MENU_DATA[activeTab].map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="w-full md:min-w-[320px] md:max-w-[320px] md:snap-start group flex flex-col glass-card overflow-hidden"
                                >
                                    <div className="relative h-32 md:h-64 bg-white overflow-hidden border-b-2 border-[#d17b22]/20 group-hover:border-[#f6a93d] transition-colors" onClick={() => setSelectedImage(item.image)}>
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                        {item.badge && (
                                            <div className="absolute top-2 left-2 bg-white/95 px-2 py-0.5 rounded-sm border border-[#d17b22]/30">
                                                <span className="text-gold-gradient text-[7px] md:text-[10px] font-bold uppercase tracking-widest">{item.badge}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-3 md:p-8 flex flex-col flex-grow">
                                        <h4 className="font-serif font-bold text-[11px] md:text-xl text-[#2d1a0d] mb-1 line-clamp-2">{item.name}</h4>
                                        <p className="text-[#6b4724] text-[9px] md:text-sm leading-relaxed line-clamp-2 md:line-clamp-3">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {selectedImage && (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-xl"
                    >
                        <motion.img 
                            initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}
                            src={selectedImage} className="max-w-[90%] max-h-[80vh] rounded-md shadow-2xl"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

const WhyUs: React.FC = () => (
    <section id="whyus" className="py-10 md:py-24 bg-[#fdfaf5] relative cursor-default">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <div className="text-center mb-12 md:mb-24">
                <span className="text-gold-gradient tracking-[0.4em] text-[9px] md:text-xs font-bold uppercase">Blue Ocean Strategy</span>
                <h2 className="font-serif text-3xl md:text-6xl text-[#2d1a0d] mt-2">Why Us?</h2>
            </div>
            <div className="grid grid-cols-2 gap-4 md:gap-8">
                {WHY_US_DATA.map((item, idx) => (
                    <div key={idx} className="p-6 md:p-10 glass-card rounded-sm group">
                        <div className="w-12 h-12 md:w-20 md:h-20 bg-gradient-to-br from-white to-[#f2eadd] rounded-full flex items-center justify-center text-[#d17b22] border border-[#d17b22]/20 mb-6 group-hover:shadow-lg transition-all">
                            <Icon name={item.icon} size={32} />
                        </div>
                        <h3 className="font-serif text-lg md:text-3xl text-[#2d1a0d] mb-2 group-hover:text-[#8a5116] transition-colors">{item.title}</h3>
                        <p className="text-[#6b4724] text-xs md:text-base leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const ROISection: React.FC = () => {
    const [sales, setSales] = useState(5000000);
    const profit = sales * 30 * 0.4;
    const bep = 100000000 / profit;
    const formatIDR = (n: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n);

    return (
        <section id="roi" className="py-10 md:py-24 bg-[#f2eadd] relative overflow-hidden cursor-default">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
                    <div>
                        <span className="text-gold-gradient tracking-[0.2em] text-[9px] md:text-xs font-bold uppercase">Financial Logic</span>
                        <h2 className="font-serif text-3xl md:text-6xl text-[#2d1a0d] mt-2 mb-8">Data Bicara.<br/>Profit Nyata.</h2>
                        <div className="glass-card p-8 bg-white/50">
                            <div className="flex gap-8 items-center">
                                <div className="text-center">
                                    <span className="block text-3xl md:text-5xl font-serif text-[#2d1a0d]">40%</span>
                                    <span className="text-[8px] md:text-[10px] uppercase tracking-widest text-gold-gradient">Net Margin</span>
                                </div>
                                <div className="w-[1px] h-16 bg-[#5d3512]/10"></div>
                                <div className="text-center">
                                    <span className="block text-3xl md:text-5xl font-serif text-[#2d1a0d]">6-8</span>
                                    <span className="text-[8px] md:text-[10px] uppercase tracking-widest text-gold-gradient">Bulan BEP</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="glass-card bg-white p-8 md:p-12 shadow-2xl relative border-t-4 border-t-[#d17b22]">
                        <h3 className="text-[#2d1a0d] font-serif text-2xl mb-8">Simulator Profit</h3>
                        <div className="mb-12">
                            <div className="flex justify-between items-end mb-4">
                                <span className="text-xs uppercase tracking-widest text-[#825c35]">Omzet Harian</span>
                                <span className="text-gold-gradient font-bold text-2xl">{formatIDR(sales)}</span>
                            </div>
                            <input type="range" min="2000000" max="10000000" step="500000" value={sales} onChange={(e) => setSales(Number(e.target.value))} className="w-full h-2 bg-[#e3d5c1] rounded-lg appearance-none accent-[#d17b22]" />
                        </div>
                        <div className="pt-8 border-t border-[#5d3512]/10 text-center">
                            <span className="block text-xs uppercase tracking-widest text-[#825c35] mb-4">Potensi Profit Bersih / Bulan</span>
                            <div className="text-4xl md:text-6xl font-serif text-[#2d1a0d] mb-8">{formatIDR(profit)}</div>
                            <div className="inline-block px-6 py-2 border border-[#8a5116]/30 bg-[#fdfaf5] rounded-full text-[#8a5116] text-xs font-bold uppercase">Estimasi BEP: {bep.toFixed(1)} Bulan</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const PackagesSection: React.FC = () => (
    <section id="packages" className="py-10 md:py-24 bg-[#f8f2e8] relative cursor-default">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <div className="text-center mb-16">
                <span className="text-gold-gradient tracking-[0.4em] text-[9px] md:text-xs font-bold uppercase">Investasi Cerdas</span>
                <h2 className="font-serif text-3xl md:text-5xl text-[#2d1a0d] mt-2">Pilih Skala Bisnis Anda</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                {FRANCHISE_PACKAGES.map((pkg, idx) => (
                    <div key={idx} className={`relative p-8 md:p-10 glass-card transition-all flex flex-col h-full ${pkg.highlight ? 'border-[#f6a93d] shadow-2xl md:-translate-y-6 bg-white z-10' : ''}`}>
                        {pkg.highlight && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gold-gradient text-white text-[10px] font-bold px-6 py-2 uppercase tracking-widest rounded-sm">Paling Laris</div>}
                        <div className="mb-10 text-center">
                            <h3 className="font-serif text-2xl text-[#2d1a0d] mb-2">{pkg.name}</h3>
                            <div className="text-4xl font-bold text-gold-gradient font-serif">IDR {pkg.price}</div>
                        </div>
                        <ul className="space-y-4 flex-grow mb-10">
                            {pkg.features.map((feat, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-[#6b4724]">
                                    <Icon name="Check" size={16} className="text-[#d17b22] mt-0.5" />
                                    <span>{feat}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const Footer: React.FC = () => (
    <footer className="bg-[#f8f2e8] border-t border-[#5d3512]/10 py-12 md:py-24 cursor-default">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
                <div className="flex flex-col items-center md:items-start">
                    <img src="/brand/logo bulet.png" alt="Khabila" className="h-20 mb-6" />
                    <p className="text-[#6b4724] text-xs text-center md:text-left leading-relaxed">The Ultimate Franchise Experience. Menggabungkan cita rasa Pizza Turki & Wagyu Jepang.</p>
                </div>
                <div className="text-center md:text-left">
                    <h4 className="text-[#2d1a0d] font-serif text-xl mb-6">Navigasi</h4>
                    <ul className="space-y-4 text-[10px] uppercase tracking-widest text-[#825c35]">
                        <li><a href="#menu" className="hover:text-[#8a5116]">Menu</a></li>
                        <li><a href="#roi" className="hover:text-[#8a5116]">Simulasi ROI</a></li>
                        <li><a href="#packages" className="hover:text-[#8a5116]">Paket Investasi</a></li>
                    </ul>
                </div>
                <div className="text-center md:text-left">
                    <h4 className="text-[#2d1a0d] font-serif text-xl mb-6">Kontak</h4>
                    <ul className="space-y-4 text-sm text-[#825c35]">
                        <li className="flex items-center justify-center md:justify-start gap-3"><Icon name="MapPin" size={16} className="text-[#d17b22]" /> Jakarta, Indonesia</li>
                        <li className="flex items-center justify-center md:justify-start gap-3"><Icon name="Phone" size={16} className="text-[#d17b22]" /> +62 811-826-090</li>
                    </ul>
                </div>
            </div>
            <div className="text-center pt-10 border-t border-[#5d3512]/10">
                <p className="text-[#825c35] text-[10px] uppercase tracking-widest">© 2026 Khabila Kitchen. All Rights Reserved.</p>
            </div>
        </div>
    </footer>
);

const App: React.FC = () => {
    return (
        <div className="antialiased selection:bg-[#f6a93d] selection:text-white font-sans">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;600&display=swap');
                .font-serif { font-family: 'Playfair Display', serif; }
                .font-sans { font-family: 'Inter', sans-serif; }
                html { scroll-behavior: smooth; }
                body { background-color: #f8f2e8; }
                .bg-gold-gradient { background: linear-gradient(135deg, #f6a93d 0%, #8a5116 100%); }
                .text-gold-gradient {
                    background: linear-gradient(to right, #8a5116, #f6a93d, #8a5116);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-size: 200% auto;
                    animation: shimmer 4s linear infinite;
                }
                .glass-nav { background: rgba(248, 242, 232, 0.9); backdrop-filter: blur(20px); border-bottom: 1px solid rgba(93, 53, 18, 0.1); }
                .glass-card { background: white; border: 1px solid rgba(93, 53, 18, 0.1); box-shadow: 0 10px 40px -10px rgba(0,0,0,0.05); }
                .btn-luxury { background: linear-gradient(90deg, #f6a93d, #c87a27); color: white; transition: 0.3s; }
                .btn-luxury:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(246, 169, 61, 0.3); }
                .btn-outline-luxury { border: 1px solid #c87a27; color: #8a5116; }
                .video-wrapper { position: absolute; inset: 0; z-index: 0; }
                .hide-scrollbar::-webkit-scrollbar { display: none; }
                @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
            `}</style>
            <Navbar />
            <Hero />
            <MenuSection />
            <WhyUs />
            <ROISection />
            <PackagesSection />
            <Footer />
        </div>
    );
};

export default App;