import React, { useState, useEffect } from 'react';
import './Navbar.css';

export default function Navbar({ page, setPage }) {
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { id: 'editor', label: 'Playground' }, 
    { id: 'docs', label: 'Documentation' },
    { id: 'about', label: 'About Us' }, // Finalized link
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Logic: Navbar is hidden on Home (Editor) page until scrolled; always visible on others.
  const isHome = page === 'editor';
  
  let navClass = 'navbar';
  if (isHome) {
    navClass += isScrolled ? ' navbar-home-visible' : ' navbar-home-hidden';
  } else {
    navClass += ' navbar-standard';
  }

  const scrollToPlayground = () => {
    setTimeout(() => {
      const grid = document.querySelector('.editor-grid');
      
      if (grid) {
        const y = grid.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: 'smooth' });
      } else {
        // Fallback to wrapper ID if grid is missing for some reason
        const playground = document.getElementById('playground');
        if (playground) {
          const y = playground.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    }, 100);
  };

  const handleNavClick = (id) => {
    setPage(id);
    if (id === 'editor') {
      scrollToPlayground();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBrandClick = () => {
    setPage('editor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className={navClass}>
      <div className="brand" onClick={handleBrandClick}>
        <img 
          src="/favicon.png" 
          alt="PindScript Logo" 
          style={{ height: '40px', width: 'auto' }} 
        />
        <span>PindScript</span>
      </div>

      <div className="nav-links">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className={`nav-item ${page === item.id ? 'active' : ''}`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
}