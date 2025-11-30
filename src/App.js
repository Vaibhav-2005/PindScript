import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Editor from './pages/Editor';
import Docs from './pages/Docs';
import About from './pages/About'; // Finalized import
import './App.css';

export default function App() {
  const [page, setPage] = useState('editor');

  // --- STATE LIFTED HERE TO PERSIST ACROSS NAVIGATION ---
  const [code, setCode] = useState(
    `// PindScript vich tuhada swagat hai 🚜
// Apna code ethe likho

vikha("Sat Sri Akal");`
  );

  const [output, setOutput] = useState('// Output will appear here...');

  // --- SET BROWSER TAB ICON & TITLE ---
  useEffect(() => {
    // 1. Set Title
    document.title = "PindScript - Coding in Punjabi";

    // 2. Set Favicon dynamically
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = '/favicon.png';
  }, []);

  return (
    <div className="app-container">
      <Navbar page={page} setPage={setPage} />

      <main
        className={page === 'editor' ? '' : 'main-content'}
        style={page === 'editor' ? { flex: 1, width: '100%', animation: 'fadeIn 0.8s ease-out' } : {}}
      >
        {page === 'editor' && (
          <Editor
            code={code}
            setCode={setCode}
            output={output}
            setOutput={setOutput}
          />
        )}
        {page === 'docs' && <Docs />}
        {page === 'about' && <About />} {/* Finalized rendering path */}
      </main>

      <Footer />
    </div>
  );
}