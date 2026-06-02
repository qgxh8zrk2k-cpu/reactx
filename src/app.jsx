import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, 
  MapPin, 
  Calendar, 
  Clock, 
  Info, 
  Gift, 
  ChevronDown, 
  Menu, 
  X,
  Plane,
  Home,
  Waves,
  Palmtree,
  Sun,
  Users,
  User,
  Car,
  Phone,
  Anchor,
  CheckCircle,
  Shirt,
  ThermometerSun,
  Train,
  CloudSun,
  Sparkles,
  Wind,
  CloudRain,
  Navigation,
  Send,
  HelpCircle,
  ExternalLink,
  MessageCircle,
  PhoneCall,
  Droplets,
  Zap,
  ClipboardList,
  Copy,
  BookOpen,
  Sparkle,
  Shield,
  ShieldAlert,
  Compass,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Volume2,
  VolumeX,
  Camera // Added Camera icon for photos section
} from 'lucide-react';

const COLORS = {
  burgundy: '#800020',
  amber: '#f39c12',
  burntOrange: '#d35400',
  paper: '#fdfaf5'
};

const NAV_LINKS = [
  { name: 'Home', id: 'home' },
  { name: 'Story', id: 'story' },
  { name: 'Itinerary', id: 'itinerary' },
  { name: 'Dressing', id: 'dressing' },
  { name: 'Transport', id: 'transport' },
  { name: 'Stay', id: 'stay' },
  { name: 'Weather', id: 'weather' },
  { name: 'A-Z Guide', id: 'az-guide' },
  { name: 'Bridal Party', id: 'party' },
  { name: 'Registry', id: 'registry' },
  { name: 'Share Photos', id: 'photos' }, // Replaced Guestbook with Photos
  { name: 'Q&A', id: 'qa' },
  { name: 'RSVP', id: 'rsvp' },
];

const WEDDING_COLORS = [
  { name: 'Burgundy', hex: COLORS.burgundy, desc: 'Warm elegance' },
  { name: 'Burnt Orange', hex: COLORS.burntOrange, desc: 'Coastal sunset' },
  { name: 'Amber', hex: COLORS.amber, desc: 'Golden sand' },
  { name: 'Rose Gold', hex: '#f7879a', desc: 'Soft ocean bloom' },
  { name: 'Olive Green', hex: '#b9cc81', desc: 'Tropical palms' },
];

const BRIDAL_PARTY = {
  bridesmaids: [
    { name: 'Kate Nyabuti', role: 'Maid of Honor', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&h=500&fit=crop' },
    { name: 'Malika Masha', role: 'Bridesmaid', img: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=400&h=500&fit=crop' },
    { name: 'Zalika Masha', role: 'Bridesmaid', img: 'https://images.unsplash.com/photo-1548142813-c348350df52b?q=80&w=400&h=500&fit=crop' },
    { name: 'Natasha Kinoti', role: 'Bridesmaid', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&h=500&fit=crop' },
    { name: 'Mumbi Masisi', role: 'Bridesmaid', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&h=500&fit=crop' },
    { name: 'Malena Mali', role: 'Bridesmaid', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&h=500&fit=crop' },
    { name: 'Julie Bore', role: 'Bridesmaid', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&h=500&fit=crop' },
    { name: 'Moreen Kinoti', role: 'Bridesmaid', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400&h=500&fit=crop' },
  ],
  groomsmen: [
    { name: 'Antony Wambari', role: 'Best Man', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=500&fit=crop' },
    { name: 'Kevin Nyoike', role: 'Groomsman', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&h=500&fit=crop' },
    { name: 'Edwin Gaitho', role: 'Groomsman', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&h=500&fit=crop' },
    { name: 'Mwangi Gaitho', role: 'Groomsman', img: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=400&h=500&fit=crop' },
    { name: 'Jeremy Kimachia', role: 'Groomsman', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&h=500&fit=crop' },
    { name: 'Shaka Kimathi', role: 'Groomsman', img: 'https://images.unsplash.com/photo-1521119956141-83b119d7fbd9?q=80&w=400&h=500&fit=crop' },
    { name: 'Jessie Kwame', role: 'Groomsman', img: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=400&h=500&fit=crop' },
    { name: 'John Gilbert', role: 'Groomsman', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&h=500&fit=crop' },
  ]
};

const ACCOMMODATIONS = [
  { name: 'Kasa Malindi', type: 'Luxury Boutique (Malindi)', desc: 'Indulge in absolute coastal seclusion.', img: 'https://theholidaydealers.com/wp-content/uploads/2022/06/Leopard-Point-Malindi-1.png' },
  { name: 'Ocean Beach Resort & Spa', type: 'Luxury Beachfront (Malindi)', desc: 'Uncompromised space, direct beach walks.', img: 'https://www.oceanbeachkenya.com/wp-content/uploads/2025/06/Pool-Ocean-Video.jpg' },
  { name: 'Palmento Villa Mambrui', type: 'Villa (Mambrui)', desc: 'State-of-the-art designer coastal apartments.', img: 'https://scontent.fmba5-2.fna.fbcdn.net/v/t39.30808-6/481079052_1178867930604766_4392868812639984915_n.jpg?stp=dst-jpg_p960x960_tt6&_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_ohc=3wHzAhjvoeQQ7kNvwFhCNXh&_nc_oc=Adpbmc88Ay0gK1sH73dVttrNqHnnwtQ6K3_5mKJ5Yh-z5PoXQiuOJIjBguPQmj8w8dg&_nc_zt=23&_nc_ht=scontent.fmba5-2.fna&_nc_gid=0N264OgPzjoYoz9e8WK23Q&_nc_ss=7b289&oh=00_Af9AcUrKOxZVOF81NKzHV-b-YkgwxYZu-UCqjBJGOih7GA&oe=6A250E2E' },
  { name: 'Q Boutique', type: 'Beach Resort (Malindi)', desc: 'Charming traditional Swahili style.', img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/30/d0/ef/4f/caption.jpg?w=1400&h=-1&s=1' },
  { name: 'Diamond Dream of Africa', type: 'Luxury Beachfront (Malindi)', desc: 'Exquisite Indo-Arabic designs and pools.', img: 'https://d1vp8nomjxwyf1.cloudfront.net/wp-content/uploads/sites/114/2024/11/12161235/Diamonds-Malindi_Junior-Suites2.jpg' },
  { name: 'Mwembe Resort', type: 'Boutique Stay (Malindi)', desc: 'Cosy apartments ideal for smaller groups.', img: 'https://scontent.fmba5-2.fna.fbcdn.net/v/t39.30808-6/509920800_3547855442012880_7092972292207282340_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=86c6b0&_nc_ohc=VLHTlGPBS_oQ7kNvwGeYyWB&_nc_oc=Adrj0SsECfB845VGbUmmNAtC58U9CuB6us3fiEsK4Qx6-XjdF_frAzUmp7cy3FG8TFE&_nc_zt=23&_nc_ht=scontent.fmba5-2.fna&_nc_gid=DQ8tK90HWBObDR2v5MuKjg&_nc_ss=7b289&oh=00_Af8A8lBAxHria98Dz2Gtn8IPr4jlUVFhrkDT-30YIOfW5w&oe=6A24EE41' },
  { name: 'Marine Holiday House', type: 'Boutique Villa (Malindi)', desc: 'Perfect privacy nestled in greenery.', img: 'https://x.cdrst.com/foto/hotel-sf/14500541/granderesp/foto-hotel-144ffa97.jpg' },
  { name: 'Saffron Garden Malindi', type: 'Artistic Resort (Malindi)', desc: 'Filled with incredible art & beachfront spots.', img: 'https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/498110479.jpg?k=893e36e66ff0b27f4615496f63b474d0e0f330de4f53c14cc9e1850afb0b8e60&o=' },
  { name: 'Kijani Apartments', type: 'Wellness Resort (Malindi)', desc: 'Luxurious villas centered on therapy & spa.', img: 'https://coastproperties.co.ke/wp-content/uploads/2022/06/DJI_0596-1024x576-1.jpg' },
  { name: 'Kola Beach Resort', type: 'Classic Malindi', desc: 'Informal atmosphere, loved by locals.', img: 'https://static.wixstatic.com/media/aae19a_5787fc670b5a489a856b548f314eb51a~mv2.jpg/v1/fill/w_640,h_324,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/aae19a_5787fc670b5a489a856b548f314eb51a~mv2.jpg' },
];

const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWeddingDay, setIsWeddingDay] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  
  // Custom Interaction states
  const [copiedPaybill, setCopiedPaybill] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeGuideTab, setActiveGuideTab] = useState('safety');
  
  const audioRef = useRef(null);

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date('June 20, 2026 14:55:00').getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      
      if (distance <= 0) {
        setIsWeddingDay(true);
        clearInterval(timer);
        return;
      }
      
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=-3.2191&longitude=40.1169&current_weather=true&hourly=relativehumidity_2m');
        const data = await response.json();
        setWeatherData({
          temp: Math.round(data.current_weather.temperature),
          wind: Math.round(data.current_weather.windspeed),
          humidity: data.hourly.relativehumidity_2m[0] || 74
        });
      } catch (err) {
        setWeatherData({ temp: 28, wind: 14, humidity: 76 }); // Fallback
      }
    };
    fetchWeather();
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('wedding_wishes');
    if (stored) {
      setGuestbookWishes(JSON.parse(stored));
    }
  }, []);

  const handleAddWish = (e) => {
    e.preventDefault();
    if (!newGuestName.trim() || !newGuestWish.trim()) return;

    const newWish = {
      name: newGuestName,
      wish: newGuestWish,
      relationship: newGuestRelation,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    const updated = [newWish, ...guestbookWishes];
    setGuestbookWishes(updated);
    localStorage.setItem('wedding_wishes', JSON.stringify(updated));
    setNewGuestName('');
    setNewGuestWish('');
  };

  const selectSection = (id) => {
    setActiveSection(id);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyToClipboard = (text, type) => {
    // Fallback for iframe sandboxing
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    if (type === 'paybill') {
      setCopiedPaybill(true);
      setTimeout(() => setCopiedPaybill(false), 2000);
    } else {
      setCopiedAccount(true);
      setTimeout(() => setCopiedAccount(false), 2000);
    }
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (musicPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("Audio play deferred for user interaction"));
    }
    setMusicPlaying(!musicPlaying);
  };

  const currentIndex = NAV_LINKS.findIndex(link => link.id === activeSection);
  const progressPercentage = ((currentIndex) / (NAV_LINKS.length - 1)) * 100;

  const handlePrev = () => {
    if (currentIndex > 0) {
      selectSection(NAV_LINKS[currentIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (currentIndex < NAV_LINKS.length - 1) {
      selectSection(NAV_LINKS[currentIndex + 1].id);
    }
  };

  const SectionHeader = ({ title, subtitle, icon: Icon }) => (
    <div className="pt-4 pb-8 text-center animate-fade-in">
      <div className="max-w-4xl mx-auto px-4">
        {Icon && <Icon className="mx-auto mb-4 text-[#d35400] animate-pulse" size={40} />}
        <h2 className="text-3xl md:text-5xl font-serif text-[#800020] mb-3 uppercase tracking-tighter">{title}</h2>
        <div className="w-16 h-[1.5px] bg-[#f39c12] mx-auto mb-4"></div>
        {subtitle && <p className="text-gray-500 italic text-md font-light max-w-xl mx-auto font-sans leading-relaxed">{subtitle}</p>}
      </div>
    </div>
  );

  const CountdownDisplay = ({ dark = false }) => {
    if (isWeddingDay) {
      return (
        <div className="animate-bounce">
          <h2 className={`text-3xl md:text-5xl font-serif ${dark ? 'text-[#f39c12]' : 'text-white'} uppercase tracking-widest`}>
            Let's Celebrate!
          </h2>
          <p className="mt-3 text-xs tracking-[0.4em] opacity-80 uppercase font-sans">Today is the day we say I Do.</p>
        </div>
      );
    }
    return (
      <div className="grid grid-cols-4 gap-2 md:gap-4 max-w-md mx-auto">
        {Object.entries(timeLeft).map(([label, value]) => (
          <div key={label} className={`flex flex-col ${dark ? 'bg-[#800020]/10 border-[#800020]/20' : 'bg-black/40 border-white/20'} backdrop-blur-md rounded-xl py-3 px-1 border transition-all hover:scale-105`}>
            <span className="text-2xl md:text-3xl font-serif text-[#f39c12] font-semibold">{value}</span>
            <span className={`text-[8px] uppercase tracking-[0.2em] ${dark ? 'text-gray-500' : 'text-gray-200'} mt-1 font-sans`}>{label}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#fdfaf5] selection:bg-[#800020] selection:text-white flex flex-col justify-between overflow-x-hidden font-sans">
      
      {/* Background Audio Source */}
      <audio 
        ref={audioRef} 
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" 
        loop 
        preload="auto"
      />

      {/* Ambient Music Controller */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          onClick={toggleMusic} 
          className="flex items-center gap-2 bg-[#800020] text-white p-4 rounded-full shadow-2xl hover:bg-[#d35400] hover:scale-110 active:scale-95 transition-all group"
          title="Toggle Coastal Ambient Music"
        >
          {musicPlaying ? (
            <>
              <Volume2 className="animate-bounce" size={18} />
              <span className="text-[10px] uppercase font-bold tracking-widest max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap pl-1">Mute</span>
            </>
          ) : (
            <>
              <VolumeX size={18} />
              <span className="text-[10px] uppercase font-bold tracking-widest max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap pl-1">Music</span>
            </>
          )}
        </button>
      </div>

      {/* Navigation Header */}
      <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-md shadow-sm py-3 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="text-xl font-serif tracking-tighter cursor-pointer transition-colors text-[#800020]" onClick={() => selectSection('home')}>
            <span className="font-bold">N</span><span className="opacity-40 text-sm mx-1">|</span><span className="font-bold text-[#d35400]">T</span>
          </div>
          
          {/* Horizontal Desktop Nav */}
          <div className="hidden lg:flex space-x-4 items-center">
            {NAV_LINKS.map((link) => (
              <button 
                key={link.id} 
                onClick={() => selectSection(link.id)} 
                className={`text-[9px] uppercase tracking-[0.2em] transition-all duration-300 font-bold px-2 py-1 rounded ${activeSection === link.id ? 'bg-[#800020] text-white' : 'text-gray-500 hover:text-[#d35400]'} hover:scale-105`}
              >
                {link.name}
              </button>
            ))}
          </div>

          <button className="lg:hidden p-2 rounded-full bg-gray-100 hover:bg-gray-200" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="text-[#800020]" size={20} /> : <Menu className="text-[#800020]" size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav Drawer */}
      {isMenuOpen && (
        <div className="fixed inset-0 w-full h-screen bg-[#fdfaf5]/98 backdrop-blur-md flex flex-col items-center justify-center space-y-4 z-[60] animate-in fade-in zoom-in duration-300">
          <button className="absolute top-6 right-6 text-[#800020] p-2 hover:rotate-90 transition-transform" onClick={() => setIsMenuOpen(false)}>
            <X size={28} />
          </button>
          <div className="text-2xl font-serif text-[#800020] mb-4">N & A Wedding</div>
          <div className="grid grid-cols-2 gap-3 px-6 max-w-md w-full">
            {NAV_LINKS.map((link) => (
              <button 
                key={link.id} 
                onClick={() => selectSection(link.id)} 
                className={`py-3 px-2 rounded-xl text-center font-sans text-xs uppercase tracking-wider font-bold transition-all border ${activeSection === link.id ? 'bg-[#800020] text-white border-[#800020]' : 'bg-white text-gray-700 border-gray-100 hover:bg-gray-50'}`}
              >
                {link.name}
              </button>
            ))}
          </div>
          <div className="pt-6">
            <p className="text-[10px] uppercase tracking-widest text-[#d35400]">June 19-20, 2026 • Malindi</p>
          </div>
        </div>
      )}

      {/* PROGRESS TRACKER BAR (When not on Home Screen) */}
      {activeSection !== 'home' && (
        <div className="fixed top-[53px] left-0 w-full h-[3px] bg-gray-100 z-40">
          <div 
            className="h-full bg-gradient-to-r from-[#d35400] to-[#800020] transition-all duration-500 ease-out" 
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      )}

      {/* MAIN LAYOUT DECK: Rendering exactly one section at a time */}
      <main className="flex-1 w-full pt-20 flex flex-col justify-center max-w-6xl mx-auto px-4 md:px-6">

        {/* 1. HOME SCREEN SECTION */}
        {activeSection === 'home' && (
          <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden my-4 py-8 rounded-[3rem] shadow-xl border border-gray-100 bg-white">
            <div className="absolute inset-0 z-0">
              <img 
                src="https://lh3.googleusercontent.com/d/1uf6T9N8tFIbb7Lj71-RCqPdJ5LwluRpM" 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://drive.google.com/uc?export=view&id=1uf6T9N8tFIbb7Lj71-RCqPdJ5LwluRpM";
                }}
                className="w-full h-full object-cover brightness-[0.6]" 
                alt="Nikita & Tony Coastal Sunset" 
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80"></div>
            </div>
            
            <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto py-12">
              <div className="mb-4 flex justify-center items-center gap-4 animate-fade-in">
                <div className="h-px w-10 bg-white/40"></div>
                <p className="text-[10px] tracking-[0.5em] font-light uppercase text-amber-300 font-sans">Our Love Story</p>
                <div className="h-px w-10 bg-white/40"></div>
              </div>
              <h1 className="text-5xl md:text-8xl font-serif mb-6 leading-none tracking-tight">
                Nikita <span className="cursive font-script text-3xl md:text-7xl text-[#f39c12] block md:inline font-normal">&amp;</span> Tony
              </h1>
              <p className="text-sm md:text-md tracking-[0.4em] font-light mb-8 text-gray-200 uppercase font-sans">
                JUNE 19 - 20, 2026 • MALINDI, KENYA
              </p>
              
              <div className="p-4 bg-black/30 backdrop-blur-sm rounded-2xl max-w-sm mx-auto mb-10 border border-white/10 shadow-lg">
                <CountdownDisplay />
              </div>

              <button 
                onClick={() => selectSection('story')}
                className="bg-[#f39c12] hover:bg-[#d35400] text-white font-sans text-xs uppercase tracking-widest font-bold py-4 px-8 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 animate-pulse"
              >
                Enter Wedding Portal →
              </button>
            </div>
          </section>
        )}

        {/* 2. OUR STORY SECTION */}
        {activeSection === 'story' && (
          <section className="bg-white rounded-[2.5rem] border border-gray-100 p-8 md:p-12 shadow-md my-4 animate-fade-in">
            <SectionHeader title="Our Story" subtitle="From Nairobi city lights to Malindi's sandy shores." icon={Sparkles} />
            <div className="grid md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
              <div className="relative group">
                <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-r from-[#800020] to-[#f39c12] opacity-25 blur transition duration-1000"></div>
                <img 
                  src="https://d3fphkxyf5o5bm.cloudfront.net/image-resize/format=webp,w=720/QwRY54Li1HMwD7oNfpDETN3YHN2cCHq9Lf3HKNkUgh" 
                  className="relative rounded-[2rem] shadow-md aspect-[4/5] object-cover w-full max-h-[400px]" 
                  alt="Couple" 
                />
              </div>
              <div className="space-y-4 text-gray-600 leading-relaxed text-sm font-light font-sans">
                <p className="font-serif italic text-lg text-[#800020] mb-2">"Deep waters cannot quench love..."</p>
                <p>Nikita and Antony’s journey first began amidst the bustling energy of Nairobi. What started as a shared passion for healthcare and a mutual love for the serene Kenyan coast soon blossomed into something far more profound.</p>
                <p>Malindi became their sanctuary—a place where the noise of the world faded into the beautiful rhythm of the waves. It was here, under a canopy of warm coastal stars and the whisper of the Indian Ocean, that Antony asked Nikita to build their tomorrow together.</p>
                <div className="pt-4 flex gap-3 items-center">
                  <Heart className="text-[#800020] animate-pulse" fill="#800020" size={20} />
                  <span className="font-serif italic text-xl text-[#800020]">Nikita &amp; Tony</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 3. ITINERARY SECTION */}
        {activeSection === 'itinerary' && (
          <section className="bg-white rounded-[2.5rem] border border-gray-100 p-8 md:p-12 shadow-md my-4 animate-fade-in">
            <SectionHeader title="The Celebration" subtitle="The details for our beautiful wedding weekend." icon={Calendar} />
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Friday */}
              <div className="bg-[#fdfaf5] p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between hover:scale-[1.01] transition-transform">
                <div>
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="text-4xl font-serif text-[#d35400]">19</span>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400 font-sans">Friday, June 2026</p>
                      <h3 className="text-xl font-serif text-[#800020]">The Malozi Ceremony</h3>
                    </div>
                  </div>
                  <div className="space-y-4 text-xs text-gray-600 font-sans">
                    <p className="italic text-[#d35400] font-serif font-bold">Traditional Welcoming, Blessings &amp; Logistical Feats</p>
                    <a href="https://maps.app.goo.gl/TmyNVgJW4e1yT3sB6" target="_blank" rel="noreferrer" className="group block bg-white p-3 rounded-xl border border-gray-100 hover:border-amber-500 transition-colors">
                      <div className="flex gap-3 items-start">
                        <MapPin className="text-[#f39c12] shrink-0 mt-0.5" size={16} /> 
                        <div>
                          <p className="font-bold text-gray-800">Bore Village - Makumba, Marafa</p>
                          <p className="text-[9px] uppercase text-[#f39c12] font-bold mt-1 tracking-wider flex items-center gap-1">Tap to view location <ExternalLink size={8} /></p>
                        </div>
                      </div>
                    </a>
                    <div className="flex gap-3 items-start bg-white p-3 rounded-xl border border-gray-100">
                      <Clock className="text-[#f39c12] shrink-0 mt-0.5" size={16} /> 
                      <div><strong>01:00 PM Sharp</strong> Ceremony Begins Punctually</div>
                    </div>
                    <p className="text-[11px] text-gray-500 italic pl-2 border-l-2 border-amber-500">Shuttle buses depart from Malindi and Mambrui early in the morning to transport all guests directly to Bore Village.</p>
                  </div>
                </div>
              </div>

              {/* Saturday */}
              <div className="bg-[#800020]/95 p-6 rounded-3xl text-white shadow-lg flex flex-col justify-between hover:scale-[1.01] transition-transform">
                <div>
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="text-4xl font-serif text-[#f39c12]">20</span>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider font-bold opacity-60 font-sans">Saturday, June 2026</p>
                      <h3 className="text-xl font-serif">Wedding Ceremony</h3>
                    </div>
                  </div>
                  <div className="space-y-4 text-xs font-sans">
                    <a href="https://maps.app.goo.gl/VaUfRa8cEp87KLsi9?g_st=ic" target="_blank" rel="noreferrer" className="group block text-white bg-white/10 p-3 rounded-xl border border-white/10 hover:bg-white/20 transition-all">
                      <div className="flex items-start gap-3">
                        <Anchor className="text-[#f39c12] shrink-0 mt-0.5 animate-spin" style={{ animationDuration: '8s' }} size={16} /> 
                        <div>
                          <p className="font-bold">Ceremony Vows: Kola Beach</p>
                          <p className="text-[9px] uppercase text-[#f39c12] font-bold mt-1 tracking-wider flex items-center gap-1">Tap to view location <ExternalLink size={8} /></p>
                          <p className="opacity-80 mt-1"><strong>02:55 PM Sharp</strong> Wedding Starts</p>
                        </div>
                      </div>
                    </a>
                    <a href="https://www.google.com/maps/search/?api=1&query=Safferon+Garden+Malindi" target="_blank" rel="noreferrer" className="group block text-white bg-white/10 p-3 rounded-xl border border-white/10 hover:bg-white/20 transition-all">
                      <div className="flex items-start gap-3">
                        <Sun className="text-[#f39c12] shrink-0 mt-0.5" size={16} /> 
                        <div>
                          <p className="font-bold">Beach Reception: Saffron Garden</p>
                          <p className="text-[9px] uppercase text-[#f39c12] font-bold mt-1 tracking-wider flex items-center gap-1">Tap to view location <ExternalLink size={8} /></p>
                          <p className="opacity-80 mt-1">Dinner, local music entertainment &amp; coastal party to follow</p>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 4. DRESSING SECTION */}
        {activeSection === 'dressing' && (
          <section className="bg-white rounded-[2.5rem] border border-gray-100 p-8 md:p-12 shadow-md my-4 animate-fade-in">
            <SectionHeader title="Dressing Guide" subtitle="Help us paint the coast in our signature sunset colors." icon={Shirt} />
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto font-sans">
              <div className="bg-[#800020] text-white p-6 rounded-3xl shadow-sm flex flex-col justify-center">
                <h4 className="text-xl font-serif text-[#f39c12] mb-4 flex items-center gap-2"><Waves className="text-[#f39c12]" size={20}/> Footwear Guide</h4>
                <p className="text-xs opacity-90 mb-4 italic leading-relaxed">Celebrations move between beautiful sandy viewpoints and garden landscapes. We highly recommend appropriate shoes:</p>
                <div className="grid grid-cols-2 gap-4 text-[11px] leading-relaxed">
                  <div>
                    <p className="font-bold text-[#f39c12] mb-1 uppercase tracking-wider">Great Options:</p>
                    <ul className="space-y-1 opacity-90">
                      <li>• Flat sandals or stylish flats</li>
                      <li>• Wedges or block heels</li>
                      <li>• Loafers or boat shoes</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-bold text-red-300 mb-1 uppercase tracking-wider">Best to Avoid:</p>
                    <ul className="space-y-1 opacity-90">
                      <li>• Fine stilettos or spike heels</li>
                      <li>• Materials sensitive to wet ground</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-[#fdfaf5] p-6 rounded-3xl border border-[#800020]/10 text-center">
                <h4 className="text-xl font-serif text-[#800020] mb-4">Our Sunset Palette</h4>
                <div className="flex flex-wrap justify-center gap-4 mb-6">
                  {WEDDING_COLORS.map(c => (
                    <div key={c.name} className="flex flex-col items-center">
                      <div 
                        className="w-10 h-10 rounded-full border-2 border-white shadow-sm mb-1" 
                        style={{backgroundColor: c.hex}}
                      ></div>
                      <span className="text-[9px] uppercase font-bold text-gray-600">{c.name}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 text-xs text-gray-600 text-left max-w-xs mx-auto leading-relaxed">
                  <p className="flex gap-2"><CheckCircle size={14} className="text-[#d35400] shrink-0 mt-0.5" /> Breathable materials: linen, cotton, chiffon, or silk.</p>
                  <p className="flex gap-2"><CheckCircle size={14} className="text-[#d35400] shrink-0 mt-0.5" /> Consider a light cover-up or shawl for the breezy coast evenings.</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 5. TRANSPORT SECTION */}
        {activeSection === 'transport' && (
          <section className="bg-white rounded-[2.5rem] border border-gray-100 p-8 md:p-12 shadow-md my-4 animate-fade-in">
            <SectionHeader title="Transport &amp; Travel" subtitle="Coordinated shuttle schedules to help you arrive punctually." icon={Car} />
            <div className="max-w-5xl mx-auto space-y-6 font-sans text-xs">
              
              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-2xl flex items-start gap-3">
                <AlertTriangle className="text-amber-600 shrink-0" size={20} />
                <div>
                  <h4 className="font-bold text-amber-950 font-serif text-sm">Important Reminders</h4>
                  <p className="text-amber-900 mt-0.5">
                    1. Friday shuttle departures are strict. Driving guests are requested to consult early routes.<br/>
                    2. <strong>National ID Required:</strong> Please ensure you carry your National ID at all times, as you may be required to present it at police checks along the routes.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-[#fdfaf5] p-5 rounded-2xl border border-gray-100">
                  <h4 className="font-serif text-lg text-[#800020] mb-2 flex items-center gap-2"><Clock className="text-[#d35400]" size={16} /> Friday: Mambrui - Marafa</h4>
                  <div className="border-t border-gray-200/50 pt-2 space-y-1">
                    <div className="flex justify-between"><span>Pick-up Location:</span><span className="font-bold text-gray-800">Nyumba Nane</span></div>
                    <div className="flex justify-between"><span>1st Shuttle Bus</span><span className="font-bold text-[#800020]">09:00 AM</span></div>
                    <div className="flex justify-between"><span>2nd Shuttle Bus</span><span className="font-bold text-[#800020]">11:00 AM</span></div>
                  </div>
                </div>

                <div className="bg-[#fdfaf5] p-5 rounded-2xl border border-gray-100">
                  <h4 className="font-serif text-lg text-[#800020] mb-2 flex items-center gap-2"><Clock className="text-[#d35400]" size={16} /> Friday: Malindi - Marafa</h4>
                  <div className="border-t border-gray-200/50 pt-2 space-y-1">
                    <div className="flex justify-between"><span>Pick-up Location:</span><span className="font-bold text-gray-800">Naivas Supermarket</span></div>
                    <div className="flex justify-between"><span>1st Shuttle Bus</span><span className="font-bold text-[#800020]">09:00 AM</span></div>
                    <div className="flex justify-between"><span>2nd Shuttle Bus</span><span className="font-bold text-[#800020]">11:00 AM</span></div>
                  </div>
                </div>

                <div className="bg-[#fdfaf5] p-5 rounded-2xl border border-gray-100 md:col-span-2">
                  <h4 className="font-serif text-lg text-[#800020] mb-2 flex items-center gap-2"><Calendar className="text-[#d35400]" size={16} /> Saturday: Wedding Ceremony Day Shuttles (June 20)</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Shuttle transport from Malindi to Mambrui Beach will be provided for guest convenience. Guests are encouraged to be punctual at designated pick-up points to ensure timely arrival at the venue. Schedule details will be shared in the WhatsApp group.
                  </p>
                </div>
              </div>

              <div className="bg-[#800020] text-white p-6 rounded-3xl text-center">
                <p className="text-[#f39c12] font-bold text-sm mb-1">Need help or active route support?</p>
                <p className="opacity-90 mb-4 text-[11px]">Contact our logistics team for coordination support.</p>
                <div className="flex justify-center gap-3">
                  <a href="tel:+254722200437" className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full border border-white/20 font-bold tracking-wider uppercase text-[9px] flex items-center gap-1"><PhoneCall size={10} /> Call Faith</a>
                  <a href="https://wa.me/254721433896" target="_blank" rel="noreferrer" className="bg-[#f39c12] hover:bg-[#d35400] px-4 py-2 rounded-full font-bold tracking-wider uppercase text-[9px] flex items-center gap-1"><Send size={10} /> WhatsApp Link</a>
                </div>
              </div>

            </div>
          </section>
        )}

        {/* 6. GUEST STAYS SECTION */}
        {activeSection === 'stay' && (
          <section className="bg-white rounded-[2.5rem] border border-gray-100 p-8 md:p-12 shadow-md my-4 animate-fade-in">
            <SectionHeader title="Guest Stays" subtitle="Rate cards have been established for Malindi Town &amp; Mambrui Town." icon={Home} />
            
            <div className="w-full relative overflow-hidden mb-8">
              <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory no-scrollbar scroll-smooth">
                {ACCOMMODATIONS.map((hotel, i) => (
                  <div 
                    key={i} 
                    className="flex-none w-[220px] md:w-[260px] snap-center group cursor-pointer"
                    onClick={() => setSelectedHotel(hotel)}
                  >
                    <div className="relative aspect-square rounded-2xl overflow-hidden border border-gray-100 shadow-sm transition-all hover:scale-105">
                      <img src={hotel.img} alt={hotel.name} className="w-full h-full object-cover filter saturate-[0.85]" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h4 className="text-md font-serif line-clamp-1 group-hover:text-[#f39c12] transition-colors">{hotel.name}</h4>
                        <p className="text-[8px] uppercase tracking-wider text-amber-300 font-bold">{hotel.type}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-center text-[10px] text-gray-400 italic">Swipe or scroll horizontally to explore all stays. Tap any hotel card for info.</p>
            </div>

            {/* Selected Hotel Modal */}
            {selectedHotel && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={() => setSelectedHotel(null)}>
                <div className="bg-[#fdfaf5] rounded-3xl overflow-hidden max-w-sm w-full shadow-2xl relative" onClick={e => e.stopPropagation()}>
                  <button onClick={() => setSelectedHotel(null)} className="absolute top-4 right-4 z-10 bg-white/80 p-1.5 rounded-full text-black hover:rotate-90 transition-transform">
                    <X size={16} />
                  </button>
                  <img src={selectedHotel.img} alt={selectedHotel.name} className="w-full h-48 object-cover" />
                  <div className="p-6 text-center font-sans">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#d35400]">{selectedHotel.type}</span>
                    <h3 className="text-xl font-serif text-[#800020] my-2">{selectedHotel.name}</h3>
                    <p className="text-xs text-gray-600 mb-4 font-light leading-relaxed">{selectedHotel.desc}</p>
                    <a href={`https://www.google.com/search?q=${encodeURIComponent(selectedHotel.name + ' Malindi')}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-[#800020] text-white px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#d35400] transition-colors mx-auto">Explore Web <ExternalLink size={10}/></a>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-[#fdfaf5] p-6 rounded-3xl border border-[#800020]/10 text-center font-sans text-xs">
              <p className="text-[#800020] font-bold text-sm mb-1">Accommodation Booking Assistance</p>
              <p className="text-gray-500 mb-4">Contact Faith for customized packages and established rates.</p>
              <div className="flex justify-center gap-3">
                <a href="tel:+254722200437" className="bg-white border border-gray-200 hover:bg-gray-50 px-4 py-2 rounded-full font-bold uppercase tracking-wider text-[9px] flex items-center gap-1 text-[#800020]"><PhoneCall size={10} /> Call Faith</a>
                <a href="https://wa.me/254722200437" target="_blank" rel="noreferrer" className="bg-[#800020] hover:bg-[#a00028] text-white px-4 py-2 rounded-full font-bold uppercase tracking-wider text-[9px] flex items-center gap-1"><Send size={10} /> WhatsApp Support</a>
              </div>
            </div>
          </section>
        )}

        {/* 7. WEATHER SECTION */}
        {activeSection === 'weather' && (
          <section className="bg-white rounded-[2.5rem] border border-gray-100 p-8 md:p-12 shadow-md my-4 animate-fade-in relative overflow-hidden">
            <Palmtree className="absolute -bottom-10 -right-10 text-gray-50 scale-[3] rotate-12 pointer-events-none" />
            <SectionHeader title="Malindi Forecast" subtitle="Live meteorological report from the coastal bay." icon={CloudSun} />
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto font-sans text-center relative z-10">
              <div className="bg-[#fdfaf5] p-4 rounded-2xl border border-gray-100">
                <ThermometerSun className="mx-auto mb-2 text-[#d35400]" size={28} />
                <p className="text-3xl font-serif text-gray-800">28°C</p>
                <p className="text-[9px] uppercase tracking-wider text-gray-400 font-bold">Daytime Temp</p>
              </div>

              <div className="bg-[#fdfaf5] p-4 rounded-2xl border border-gray-100">
                <Wind className="mx-auto mb-2 text-[#f39c12]" size={28} />
                <p className="text-3xl font-serif text-gray-800">{weatherData?.wind || 14} <span className="text-sm">km/h</span></p>
                <p className="text-[9px] uppercase tracking-wider text-gray-400 font-bold">Sea Breeze</p>
              </div>

              <div className="bg-[#fdfaf5] p-4 rounded-2xl border border-gray-100">
                <Droplets className="mx-auto mb-2 text-blue-400" size={28} />
                <p className="text-3xl font-serif text-gray-800">24°C</p>
                <p className="text-[9px] uppercase tracking-wider text-gray-400 font-bold">Nighttime Temp</p>
              </div>

              <div className="bg-[#fdfaf5] p-4 rounded-2xl border border-gray-100">
                <Sun className="mx-auto mb-2 text-amber-300" size={28} />
                <p className="text-3xl font-serif text-gray-800">Refresh</p>
                <p className="text-[9px] uppercase tracking-wider text-gray-400 font-bold">Low Humidity</p>
              </div>
            </div>

            <div className="mt-6 bg-[#fdfaf5] p-6 rounded-2xl border border-gray-100 text-xs text-gray-600 max-w-4xl mx-auto leading-relaxed">
              <p className="font-serif text-md text-[#800020] mb-2 font-bold uppercase">Coastal June Climate Info</p>
              <p>June brings refreshing Indian Ocean breezes and a cooler, pleasant coastal atmosphere compared to April and May. Perfect for warm swimming, but pack a light shawl for evening sea breezes at Saffron Garden.</p>
            </div>
          </section>
        )}

        {/* 8. TRAVEL A-Z GUIDE */}
        {activeSection === 'az-guide' && (
          <section className="bg-white rounded-[2.5rem] border border-gray-100 p-8 md:p-12 shadow-md my-4 animate-fade-in">
            <SectionHeader title="A to Z Travel Guide" subtitle="Crucial info regarding transportation, local bars, drinking water, and safety." icon={Compass} />
            
            <div className="max-w-5xl mx-auto font-sans">
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {[
                  { id: 'safety', label: 'Security', icon: Shield },
                  { id: 'entertainment', label: 'Nightlife', icon: Sparkles },
                  { id: 'water', label: 'Water Alert', icon: Droplets },
                  { id: 'emergency', label: 'Support & Police', icon: ShieldAlert },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveGuideTab(tab.id)}
                    className={`flex items-center gap-1 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${activeGuideTab === tab.id ? 'bg-[#800020] text-white' : 'bg-gray-100 text-gray-600'}`}
                  >
                    <tab.icon size={12} /> {tab.label}
                  </button>
                ))}
              </div>

              <div className="bg-[#fdfaf5] p-6 rounded-2xl border border-gray-100 text-xs text-gray-600 leading-relaxed">
                
                {activeGuideTab === 'safety' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-serif text-[#800020] flex items-center gap-2"><Shield size={18} className="text-[#d35400]"/> Safety Precautions</h3>
                    <p>While Malindi is generally peaceful, traveler vigilance is recommended to avoid opportunistic crimes.</p>
                    <div className="grid sm:grid-cols-2 gap-4 text-[11px]">
                      <div className="bg-white p-4 rounded-xl border border-gray-200/50">
                        <p className="font-bold text-[#800020] mb-1">✓ Do:</p>
                        <p>• Leave valuables in locked hotel safes.</p>
                        <p>• Lock vehicle doors at all times.</p>
                        <p>• Stick to recognized taxi networks.</p>
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-gray-200/50">
                        <p className="font-bold text-red-700 mb-1">✗ Do Not:</p>
                        <p>• Walk alone on beach shores or unlit streets at night.</p>
                        <p>• Carry large amounts of cash during outings.</p>
                        <p>• Accept transport offers from unsolicited strangers.</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeGuideTab === 'entertainment' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-serif text-[#800020] flex items-center gap-2"><Sparkles size={18} className="text-[#d35400]"/> Nightlife &amp; Leisure</h3>
                    <p>Discover Malindi's popular, taxi-accessible coastal relaxation hubs:</p>
                    <div className="grid sm:grid-cols-3 gap-3 text-[11px]">
                      <div className="bg-white p-3 rounded-xl border border-gray-100">
                        <p className="font-bold text-gray-800">Rosada Beach Club</p>
                        <p className="text-gray-500 mt-1">Sought-after seaside lounge and DJ dance nights.</p>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-gray-100">
                        <p className="font-bold text-gray-800">Pata Pata Beach Club</p>
                        <p className="text-gray-500 mt-1">Energetic beach venue with weekly live entertainment.</p>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-gray-100">
                        <p className="font-bold text-gray-800">Casino Malindi</p>
                        <p className="text-gray-500 mt-1">Premium card tables, cocktail bar and late dining menu.</p>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-gray-200/50">
                      <p className="font-bold mb-2">Registered On-Call Taxi Lines:</p>
                      <div className="grid sm:grid-cols-2 gap-2 text-[11px]">
                        <div className="bg-white p-3 rounded-xl border border-gray-100 flex justify-between items-center">
                          <span>Sylvester Taxi Services</span>
                          <a href="tel:+254728012359" className="text-[#800020] font-bold font-mono">0728 012 359</a>
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-gray-100 flex justify-between items-center">
                          <span>Evans Taxi Services</span>
                          <a href="tel:+254717037436" className="text-[#800020] font-bold font-mono">0717 037 436</a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeGuideTab === 'water' && (
                  <div className="text-center py-4 space-y-2">
                    <div className="bg-red-50 text-red-700 p-3 rounded-full inline-flex"><AlertTriangle size={24} /></div>
                    <h3 className="text-lg font-serif text-red-950">Drinking Water Warning</h3>
                    <p className="max-w-md mx-auto text-[11px]">
                      Tap water in Malindi is strictly not advised for drinking. Please purchase sealed mineral bottled water from local stores (such as Naivas) or request safe drinking water directly from your hotel front desks.
                    </p>
                  </div>
                )}

                {activeGuideTab === 'emergency' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-serif text-[#800020] flex items-center gap-2"><ShieldAlert size={18} className="text-[#d35400]"/> Emergency Contacts</h3>
                    <div className="grid sm:grid-cols-3 gap-2 text-center text-[10px] text-gray-500">
                      <div className="bg-white p-3 rounded-xl border border-gray-100"><p className="font-bold text-gray-800">Malindi Police Station</p>Town Center</div>
                      <div className="bg-white p-3 rounded-xl border border-gray-100"><p className="font-bold text-gray-800">Mambrui Police Station</p>Mambrui Town</div>
                      <div className="bg-white p-3 rounded-xl border border-gray-100"><p className="font-bold text-gray-800">Marafa Police Station</p>Marafa Town</div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </section>
        )}

        {/* 9. OUR LOVED ONES (PARTY) SECTION */}
        {activeSection === 'party' && (
          <section className="bg-white rounded-[2.5rem] border border-gray-100 p-8 md:p-12 shadow-md my-4 animate-fade-in">
            <SectionHeader title="Our Loved Ones" subtitle="Standing with us as we embark on this glorious union." icon={Users} />
            <div className="max-w-5xl mx-auto space-y-12">
              
              <div>
                <h3 className="text-center text-sm uppercase tracking-widest mb-6 font-bold text-[#800020] font-sans">Bridesmaids</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {BRIDAL_PARTY.bridesmaids.map((p, i) => (
                    <div key={i} className="text-center group">
                      <div className="aspect-[4/5] rounded-3xl overflow-hidden mb-2 border-2 border-gray-100 shadow-sm transition-all hover:scale-105">
                        <img src={p.img} className="w-full h-full object-cover" alt={p.name} />
                      </div>
                      <h4 className="font-bold text-[#800020] text-xs font-serif">{p.name}</h4>
                      <p className="text-[9px] uppercase font-bold text-[#d35400] mt-0.5 tracking-wider font-sans">{p.role}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-100 pt-8">
                <h3 className="text-center text-sm uppercase tracking-widest mb-6 font-bold text-[#800020] font-sans">Groomsmen</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {BRIDAL_PARTY.groomsmen.map((p, i) => (
                    <div key={i} className="text-center group">
                      <div className="aspect-[4/5] rounded-3xl overflow-hidden mb-2 border-2 border-gray-100 shadow-sm transition-all hover:scale-105">
                        <img src={p.img} className="w-full h-full object-cover" alt={p.name} />
                      </div>
                      <h4 className="font-bold text-[#800020] text-xs font-serif">{p.name}</h4>
                      <p className="text-[9px] uppercase font-bold text-[#d35400] mt-0.5 tracking-wider font-sans">{p.role}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </section>
        )}

        {/* 10. THE REGISTRY SECTION */}
        {activeSection === 'registry' && (
          <section className="bg-white rounded-[2.5rem] border border-gray-100 p-8 md:p-12 shadow-md my-4 animate-fade-in">
            <div className="max-w-3xl mx-auto text-center font-sans text-xs">
              <Gift className="text-[#800020] mx-auto mb-4" size={48} />
              <h2 className="text-3xl md:text-5xl font-serif mb-6 text-[#800020] uppercase tracking-tighter">The Registry</h2>
              <p className="text-gray-600 italic mb-8 leading-relaxed max-w-lg mx-auto">
                "Your presence at our tropical celebrations is the greatest gift of all. However, if you wish to honor us with a gift, we have opted for a digital cash registry to help us lay the foundation for our beautiful home."
              </p>

              <div className="grid sm:grid-cols-2 gap-4 max-w-md mx-auto mb-6">
                 
                 {/* Paybill Card */}
                 <div className="bg-[#fdfaf5] p-5 rounded-2xl border border-gray-100 shadow-sm text-center">
                    <p className="text-[9px] uppercase tracking-wider text-gray-400 font-bold mb-1">Paybill Number</p>
                    <p className="text-2xl font-bold text-[#800020] tracking-widest mb-3">522522</p>
                    <button 
                      onClick={() => copyToClipboard('522522', 'paybill')}
                      className="inline-flex items-center gap-2 bg-white hover:bg-[#800020] hover:text-white text-[#800020] text-[10px] font-bold uppercase tracking-wider py-1.5 px-3 rounded-lg border border-[#800020]/15 transition-all"
                    >
                      {copiedPaybill ? <>Copied! <CheckCircle size={10} className="text-green-500" /></> : <>Copy Paybill <Copy size={10} /></>}
                    </button>
                 </div>

                 {/* Account Card */}
                 <div className="bg-[#fdfaf5] p-5 rounded-2xl border border-gray-100 shadow-sm text-center">
                    <p className="text-[9px] uppercase tracking-wider text-gray-400 font-bold mb-1">Account Number</p>
                    <p className="text-xl font-bold text-[#800020] tracking-wider mb-3">1216358168</p>
                    <button 
                      onClick={() => copyToClipboard('1216358168', 'account')}
                      className="inline-flex items-center gap-2 bg-white hover:bg-[#800020] hover:text-white text-[#800020] text-[10px] font-bold uppercase tracking-wider py-1.5 px-3 rounded-lg border border-[#800020]/15 transition-all"
                    >
                      {copiedAccount ? <>Copied! <CheckCircle size={10} className="text-green-500" /></> : <>Copy Account <Copy size={10} /></>}
                    </button>
                 </div>

              </div>
              <p className="text-[10px] text-gray-400 italic">Safaricom M-PESA &amp; Bank Transfers supported</p>
            </div>
          </section>
        )}

        {/* 11. SHARE PHOTOS SECTION */}
        {activeSection === 'photos' && (
          <section className="bg-white rounded-[2.5rem] border border-gray-100 p-8 md:p-12 shadow-md my-4 animate-fade-in">
            <SectionHeader title="Capture Our Moments" subtitle="Share the magic of our day! Upload your beautiful snapshots and videos directly to our digital album." icon={Camera} />
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto font-sans text-xs items-center">
              
              {/* Left Column: QR Code Visualizer */}
              <div className="bg-[#fdfaf5] p-6 rounded-3xl border border-[#800020]/10 flex flex-col items-center justify-center text-center shadow-sm">
                <p className="text-[#800020] uppercase font-bold text-[10px] tracking-widest mb-4">Scan with your Phone</p>
                <div className="bg-white p-4 rounded-2xl shadow-md border border-gray-100 max-w-[220px]">
                  {}
                  <a 
                    href="https://drive.google.com/file/d/1FV-v5mLDo5yHlbcYwNxmrl3c8Y09psjp/view?usp=drive_link" 
                    target="_blank" 
                    rel="noreferrer"
                    className="block hover:scale-[1.02] transition-transform"
                    title="Click to view QR on Google Drive"
                  >
                    <img 
                      src="qrcode (2).png" 
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://lh3.googleusercontent.com/d/1FV-v5mLDo5yHlbcYwNxmrl3c8Y09psjp";
                      }}
                      alt="Wedding QR Code" 
                      className="w-full h-auto rounded-lg"
                    />
                  </a>
                </div>
                <p className="text-[10px] text-gray-400 italic mt-4">Point your camera to instantly upload from your phone (or tap the code)</p>
              </div>

              {/* Right Column: Direct Link & Instructions */}
              <div className="space-y-5">
                <h3 className="text-xl font-serif text-[#800020] mb-2 font-bold">Help Us Remember Every Angle</h3>
                <p className="text-gray-600 leading-relaxed text-sm font-light">
                  We want to see the wedding through your eyes! Whether it's a candid laugh during sunset at Kola Beach, a dance move from the Saffron Garden reception, or memories from the road to Marafa, please drop them in.
                </p>
                <div className="bg-amber-50 border-l-4 border-[#f39c12] p-4 rounded-r-2xl text-xs text-amber-900 leading-relaxed">
                  <strong>No App Install Required!</strong> Clicking the link below or scanning the QR code opens a quick web portal which lets you select files directly from your mobile camera roll.
                </div>
                <div className="pt-2">
                  <a 
                    href="https://driveuploader.com/upload/uVqLc3JCl3/" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="inline-flex items-center gap-2 bg-[#800020] hover:bg-[#d35400] text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs shadow-md transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    Upload Photos Now <ExternalLink size={14} />
                  </a>
                </div>
              </div>

            </div>
          </section>
        )}

        {/* 12. COASTAL Q&A SECTION */}
        {activeSection === 'qa' && (
          <section className="bg-white rounded-[2.5rem] border border-gray-100 p-8 md:p-12 shadow-md my-4 animate-fade-in">
            <SectionHeader title="Coastal Q&A" subtitle="Answers to help you plan your exquisite Malindi escape." icon={HelpCircle} />
            <div className="max-w-2xl mx-auto space-y-3 font-sans text-xs">
              {[
                { q: "What is the dress code?", a: "Coastal Sunset Cocktail. Flowy breathable materials (such as linen, soft cotton, or silk chiffon) in our theme colors are highly encouraged." },
                { q: "Can I bring a plus one?", a: "Due to very strict constraints on coastal venue capacities, we can only accommodate guests who are formally indicated on the guest list spreadsheet." },
                { q: "Is the wedding family or child-friendly?", a: "We cherish your little ones! However, we have chosen to keep our wedding ceremony and beachfront reception as an intimate, adults-only event." },
                { q: "How can I secure transportation from Malindi airport?", a: "Local transport and coordinate taxi services can be structured via Elijah, John, or Faith (our transport team coordinators) or directly through your selected hotel front desk." }
              ].map((item, i) => (
                <div key={i} className="bg-[#fdfaf5]/50 rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                  <button 
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    className="w-full p-4 text-left flex justify-between items-center text-sm font-serif text-[#800020] hover:text-[#d35400]"
                  >
                    <span>Q: {item.q}</span>
                    <ChevronDown className={`transform transition-transform ${activeFaq === i ? 'rotate-180 text-[#d35400]' : 'text-gray-400'}`} size={16} />
                  </button>
                  {activeFaq === i && (
                    <div className="px-4 pb-4 text-gray-600 border-t border-gray-50 pt-2 leading-relaxed text-xs">
                      <p className="border-l-2 border-[#f39c12] pl-3">A: {item.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 13. RSVP SECTION */}
        {activeSection === 'rsvp' && (
          <section className="bg-white rounded-[2.5rem] border border-gray-100 p-8 md:p-12 shadow-md my-4 animate-fade-in">
            <div className="max-w-2xl mx-auto text-center font-sans text-xs">
              <CheckCircle className="text-[#f39c12] mx-auto mb-4" size={48} />
              <h2 className="text-3xl md:text-5xl font-serif mb-2 text-[#800020] uppercase tracking-tighter">Confirm Presence</h2>
              <p className="text-gray-500 italic mb-8 max-w-md mx-auto">
                Please kindly confirm your attendance by May 1st, 2026. We are organizing the digital guest lists centrally.
              </p>
              
              <div className="bg-[#fdfaf5] p-6 rounded-3xl border border-gray-100 shadow-inner max-w-md mx-auto">
                <ClipboardList className="text-[#f39c12] mx-auto mb-3" size={32} />
                <h3 className="text-lg font-serif text-[#800020] mb-2">Official RSVP Form</h3>
                <p className="text-gray-600 mb-6 leading-relaxed text-[11px]">
                  Tap the golden button below to fill out your formal RSVP. Please specify dietary needs and hotel bookings directly in the spreadsheet form.
                </p>
                <div className="flex flex-col gap-3">
                  <a 
                    href="https://docs.google.com/forms/d/e/1FAIpQLSe2IwX97JatdjcYNZiI-27PGJfglsmaLDqskEeUU4MxDQ7prw/viewform?usp=header" 
                    target="_blank" 
                    rel="noreferrer"
                    className="bg-[#f39c12] text-white px-6 py-3.5 rounded-full font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 hover:bg-[#d35400] transition-all shadow-md mx-auto w-fit"
                  >
                    Open Official RSVP Form <ExternalLink size={14} />
                  </a>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-gray-600 mb-3 text-[10px] italic">
                      For ease of communication and movement, kindly join the whatsapp group for timely updates and Q and A.
                    </p>
                    <a 
                      href="https://chat.whatsapp.com/KMq30IayEJx5o8TdOSzQ3G?s=sh&p=a&ilr=0" 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-[#800020] border border-[#800020] px-6 py-3.5 rounded-full font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 hover:bg-green-600 hover:text-white hover:border-green-600 transition-all duration-300 shadow-md mx-auto w-fit"
                    >
                      Join WhatsApp Group <MessageCircle size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

      </main>

      {/* FOOTER & DECK NAVIGATION CONTROLS */}
      <footer className="w-full bg-white border-t border-gray-100 py-6 mt-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Deck Stepper Buttons */}
          <div className="flex gap-3 w-full md:w-auto justify-between md:justify-start">
            <button 
              onClick={handlePrev} 
              disabled={currentIndex <= 0}
              className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${currentIndex <= 0 ? 'bg-gray-100 text-gray-300 cursor-not-allowed' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
            >
              <ArrowLeft size={12} /> Back
            </button>
            <span className="text-[10px] uppercase font-bold text-gray-400 self-center tracking-wider font-sans">
              Step {currentIndex + 1} of {NAV_LINKS.length}
            </span>
            <button 
              onClick={handleNext} 
              disabled={currentIndex >= NAV_LINKS.length - 1}
              className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${currentIndex >= NAV_LINKS.length - 1 ? 'bg-gray-100 text-gray-300 cursor-not-allowed' : 'bg-[#800020] text-white hover:bg-[#d35400]'}`}
            >
              Next Step <ArrowRight size={12} />
            </button>
          </div>

          <div className="text-center md:text-right">
            <p className="text-[9px] uppercase tracking-[0.3em] text-[#d35400] font-bold">#NikitaAndTonyShoreline</p>
            <p className="text-[8px] uppercase tracking-wider text-gray-400 mt-1">&copy; 2026 NIKITA MASHA &amp; ANTONY KIMANI</p>
          </div>
        </div>
      </footer>

      {/* Custom Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap');
        
        .font-serif {
          font-family: 'Playfair Display', serif;
        }
        .font-script {
          font-family: 'Great Vibes', cursive;
        }
        .font-sans {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        body {
          font-family: 'Plus Jakarta Sans', sans-serif;
          background-color: #fdfaf5;
        }
        .no-scrollbar::-webkit-scrollbar { 
          display: none; 
        }
        .no-scrollbar { 
          -ms-overflow-style: none; 
          scrollbar-width: none; 
        }
        .custom-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: #fdfaf5;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background-color: #800020;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default App;