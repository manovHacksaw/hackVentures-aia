"use client";
import { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun, Github, Twitter } from 'lucide-react';
import { useHackVentures } from '@/context/HackVenturesContext';

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { account, connectWallet, disconnectWallet } = useHackVentures();
  
  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  return (
    <div className={`relative min-h-screen overflow-hidden transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-white'}`}>
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-64 h-64 bg-blue-300/30 rounded-full blur-3xl animate-pulse transform rotate-3"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-green-300/30 rounded-full blur-3xl animate-pulse delay-1000 transform -rotate-6"></div>
        <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-yellow-400/30 rounded-full blur-2xl dark:bg-yellow-500/30 animate-pulse delay-500"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-300/20 rounded-full blur-2xl dark:bg-purple-500/20 animate-pulse delay-700"></div>
      </div>

      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-20 transition-all duration-300 ${isScrolled ? 'backdrop-blur-md' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <h1 className="text-2xl font-bold text-blue-500 dark:text-blue-400 hover:scale-105 transition-transform cursor-pointer flex items-center gap-2">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-500">
                Hack Ventures
              </span>
            </h1>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300 transform hover:scale-105"
                aria-label="Toggle dark mode"
              >
                {darkMode ? 
                  <Sun className="w-5 h-5 text-yellow-500 animate-spin-slow" /> : 
                  <Moon className="w-5 h-5 text-gray-600 animate-spin-slow" />
                }
              </button>
              
              <div className="flex text-black items-center space-x-4 dark:text-white">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
                   className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300">
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                   className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>

              {/* Wallet Button */}
              <button 
                onClick={account ? disconnectWallet : connectWallet} 
                className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 transition duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : 'Connect Wallet'}
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? 
                  <X className="w-6 h-6 animate-spin-once" /> : 
                  <Menu className="w-6 h-6 hover:rotate-180 transition-transform duration-300" />
                }
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden backdrop-blur-md`}>
          <div className="px-4 pt-2 pb-4 space-y-3 bg-white/90 dark:bg-gray-900/90">
            <button
              onClick={toggleDarkMode}
              className="w-full p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300 flex items-center space-x-2"
            >
              {darkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5" />}
              <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
            
            <div className="flex justify-center space-x-4 py-2">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
                 className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                 className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300">
                <Twitter className="w-5 h-5" />
              </a>
            </div>

            <button 
              onClick={account ? disconnectWallet : connectWallet} 
              className="w-full px-4 py-3 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 transition duration-300 shadow-lg"
            >
              {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : 'Connect Wallet'}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-16 md:py-24 text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          <div className="space-y-4">
            <span className="inline-block px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 rounded-full animate-bounce">
              What are you waiting for?
            </span>
            
            <h2 className="text-4xl text-black md:text-5xl lg:text-6xl font-extrabold dark:text-white leading-tight ">
              Leveling Up{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-500 animate-pulse">
                opportunities
              </span>{' '}
              for developers in {' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-emerald-500 animate-pulse delay-300">
               the field of Gaming 
              </span>
            </h2>
          </div>
          
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Join us and unlock potential in the decentralized world. Be part of a community that empowers builders to thrive.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <a href="/hackathons"  className="group w-full sm:w-auto px-8 py-3 font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-500 rounded-full shadow-lg hover:shadow-xl transition duration-300 hover:scale-105 relative overflow-hidden">
              <span className="relative z-10">Participate in a Hackathon</span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </a>
            
            <a href="/organize" className="group w-full sm:w-auto px-8 py-3 font-semibold text-white bg-blue-500 rounded-full shadow-lg hover:shadow-xl transition duration-300 hover:scale-105 relative overflow-hidden">
              <span className="relative z-10">Organize a Hackathon</span>
              <div className="absolute inset-0 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
