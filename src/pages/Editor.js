import React, { useRef, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import './Editor.css';

// Backend Base URL
const API_BASE = "https://pindscript-backend.onrender.com";

export default function Editor({ code, setCode, output, setOutput }) {
  const tractorImage = "/tractor.png";
  const [serverStatus, setServerStatus] = useState('checking');
  const [isAnimating, setIsAnimating] = useState(false);
  const [bhangraMode, setBhangraMode] = useState(false);
  const [bhangraBursts, setBhangraBursts] = useState([]);
  const hypeLines = useMemo(() => ([
    'Balle balle! Code ne jadoo kar ditta ✨',
    'Chaa gaye guru, logic ne dhol vajaa ditta 🥁',
    'Oye hoye! Bug bhaag gya, bas dance karo 💃',
    'Shava shava! Output te Punjab di mehak 🌾',
    'Pind da progger, vibe hi alag hai 🚜',
    'Bass, hun taan Silicon Valley vi hilju 😊',
    'Kudi pat gayi: clean code + bhangra mode 😎',
  ]), []);
  const [hypeLine, setHypeLine] = useState('Tap Bhangra Mode to drop some dhol beats.');

  const textareaRef = useRef(null);

  // Cheat Sheet Items
  const cheatSheet = [
    { pind: 'mannle', eng: 'var / let', desc: 'Declare a new variable.', example: 'mannle naam = "Jatt";' },
    { pind: 'vikha', eng: 'print', desc: 'Output text to the console.', example: 'vikha("Sat Sri Akal");' },
    { pind: 'je', eng: 'if', desc: 'Starts a conditional block.', example: 'je (x > 10) { ... }' },
    { pind: 'hor_je', eng: 'else if', desc: 'Checks a secondary condition.', example: 'hor_je (x == 5) { ... }' },
    { pind: 'fer', eng: 'else', desc: 'The fallback condition.', example: 'fer { ... }' },
    { pind: 'tippani', eng: '//', desc: 'Ignore text (Comments).', example: '// Eh line run nahi hoyegi' }
  ];

  // Scroll to top on load
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  const lineNumbers = code.split('\n').map((_, i) => i + 1).join('\n');

  const smokeParticles = useMemo(() => {
    return [...Array(8)].map((_, i) => ({
      id: i,
      left: Math.random() * 20 - 10,
      bottom: Math.random() * 20 - 10,
      delay: i * 0.4,
      scale: 0.8 + Math.random() * 0.5
    }));
  }, []);

  // SERVER STATUS CHECK — production-ready
  useEffect(() => {
    const checkServer = async () => {
      try {
        await axios.get(`${API_BASE}/`);
        setServerStatus('online');
      } catch (err) {
        if (err.message === 'Network Error' || err.code === 'ERR_NETWORK') {
          setServerStatus('offline');
        } else {
          setServerStatus('online');
        }
      }
    };

    checkServer();
    const interval = setInterval(checkServer, 5000);
    return () => clearInterval(interval);
  }, []);

  const startTransition = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    setTimeout(() => {
      const grid = document.querySelector('.editor-grid');
      if (grid) {
        const y = grid.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: 'auto' });
      }
    }, 2200);

    setTimeout(() => setIsAnimating(false), 5000);
  };

  const handleKeyDown = (e) => {
    const ta = e.target;
    const { value, selectionStart, selectionEnd } = ta;

    // Ctrl + / for comments
    if ((e.ctrlKey || e.metaKey) && e.key === '/') {
      e.preventDefault();
      const lineStart = value.lastIndexOf('\n', selectionStart - 1) + 1;
      let lineEnd = value.indexOf('\n', selectionEnd);
      if (lineEnd === -1) lineEnd = value.length;

      const currentLine = value.substring(lineStart, lineEnd);
      let newLine = '';
      let cursorOffset = 0;

      if (currentLine.trim().startsWith('//')) {
        newLine = currentLine.replace(/\/\/\s?/, '');
        cursorOffset = newLine.length - currentLine.length;
      } else {
        newLine = '// ' + currentLine;
        cursorOffset = 3;
      }

      const newVal = value.substring(0, lineStart) + newLine + value.substring(lineEnd);
      setCode(newVal);

      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.value = newVal;
          textareaRef.current.selectionStart = selectionStart + cursorOffset;
          textareaRef.current.selectionEnd = selectionEnd + cursorOffset;
        }
      }, 0);

      return;
    }

    // Tab indentation
    if (e.key === 'Tab') {
      e.preventDefault();
      const newVal = value.substring(0, selectionStart) + '    ' + value.substring(selectionEnd);
      setCode(newVal);

      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.value = newVal;
          textareaRef.current.selectionStart = selectionStart + 4;
          textareaRef.current.selectionEnd = selectionStart + 4;
        }
      }, 0);

      return;
    }

    // Auto bracket pairing
    const pairs = { '(': ')', '{': '}', '[': ']', '"': '"', "'": "'" };
    if (pairs[e.key]) {
      e.preventDefault();
      const newVal = value.substring(0, selectionStart) + e.key + pairs[e.key] + value.substring(selectionEnd);
      setCode(newVal);

      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.value = newVal;
          textareaRef.current.selectionStart = selectionStart + 1;
          textareaRef.current.selectionEnd = selectionStart + 1;
        }
      }, 0);

      return;
    }
  };

  const pickHypeLine = () => hypeLines[Math.floor(Math.random() * hypeLines.length)];

  useEffect(() => {
    if (!bhangraMode) {
      setBhangraBursts([]);
      return;
    }

    const interval = setInterval(() => {
      setBhangraBursts((prev) => {
        const next = [
          ...prev.slice(-10),
          {
            id: Date.now() + Math.random(),
            left: 5 + Math.random() * 90,
            delay: Math.random() * 0.4,
            text: pickHypeLine(),
            emoji: prev.length % 2 === 0 ? '💃' : '🕺',
          }
        ];
        return next;
      });
    }, 900);

    return () => clearInterval(interval);
  }, [bhangraMode]);

  const toggleBhangraMode = () => {
    const next = !bhangraMode;
    setBhangraMode(next);
    setHypeLine(next ? pickHypeLine() : 'Bhangra paused. Hit RUN to wake the dhol.');
  };

  // RUN BUTTON — points to Render backend
  const runCode = async () => {
    if (serverStatus === 'offline') {
      return setOutput("🛑 Server Offline! Check if backend is running.");
    }

    setOutput("⏳ Processing...");

    try {
      if (bhangraMode) {
        setHypeLine(pickHypeLine());
      }

      const res = await axios.post(`${API_BASE}/execute`, { code }, { timeout: 10000 });

      if (res.data.error) {
        const errorMsg = "🛑 Error: " + res.data.error;
        setOutput(bhangraMode ? `💥 ${pickHypeLine()}\n\n${errorMsg}` : errorMsg);
      } else {
        const baseOutput = res.data.output || "⚠️ No output.";
        setOutput(bhangraMode ? `💥 ${pickHypeLine()}\n\n${baseOutput}` : baseOutput);
      }
    } catch (err) {
      const netError = "🛑 Error: " + err.message;
      setOutput(bhangraMode ? `💥 ${pickHypeLine()}\n\n${netError}` : netError);
    }
  };

  // UI
  return (
    <div className="editor-page">

      {isAnimating && (
        <div className="tractor-overlay">
          <div className="white-fill-overlay"></div>
          <div className="transition-brand">PindScript</div>

          <div className="tractor-wrapper tractor-drive">
            <div className="tractor-body">
              {tractorImage ? <img src={tractorImage} alt="Tractor" style={{ height: '25vh' }} /> : '🚜'}
            </div>

            <div className="smoke-trail">
              {smokeParticles.map((p) => (
                <div
                  key={p.id}
                  className="puff"
                  style={{
                    left: `${p.left}px`,
                    bottom: `${p.bottom}px`,
                    animationDelay: `${p.delay}s`,
                    transform: `scale(${p.scale})`
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      )}

      {bhangraMode && (
        <div className="bhangra-overlay">
          {bhangraBursts.map((burst) => (
            <div
              key={burst.id}
              className="bhangra-burst"
              style={{ left: `${burst.left}%`, animationDelay: `${burst.delay}s` }}
            >
              <div className="burst-emoji">{burst.emoji}</div>
              <div className="burst-text">{burst.text}</div>
            </div>
          ))}
        </div>
      )}

      <div className="home-container">
        <div className="shape-blob blob-1"></div>
        <div className="shape-blob blob-2"></div>

        <div className="hero-content">
          <div className="hero-tagline">Kiven aa Singh!!</div>

          <h1 className="hero-title">
            Coding. Now in <br />
            <span style={{ color: 'var(--primary)' }}>Punjabi.</span>
          </h1>

          <p className="hero-sub">
            The world's first programming language rooted in the soil of Punjab.
            Write logic in your mother tongue.
          </p>

          <div className="hype-chip">{hypeLine}</div>

          <button className="btn-cta" onClick={startTransition}>
            <span>Start Coding</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <polyline points="19 12 12 19 5 12"></polyline>
            </svg>
          </button>
        </div>
      </div>

      <div id="playground" className="main-content" style={{ paddingTop: '2rem' }}>
        <div className="editor-grid">

          {/* CODE PANEL */}
          <div className="code-panel">
            <div className="panel-toolbar">
              <div className="panel-title">SOURCE CODE</div>
              <div className="toolbar-actions">
                <button className={`btn-bhangra ${bhangraMode ? 'active' : ''}`} onClick={toggleBhangraMode}>
                  {bhangraMode ? 'Bhangra ON' : 'Bhangra Mode'}
                </button>
              <button className="btn-run" onClick={runCode}>RUN</button>
              </div>
            </div>

            <div className="editor-body">
              <div className="line-numbers">{lineNumbers}</div>

              <textarea
                ref={textareaRef}
                className="editor-textarea"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={handleKeyDown}
                spellCheck="false"
                placeholder="// Write PindScript here..."
              />
            </div>
          </div>

          {/* TERMINAL PANEL */}
          <div className="code-panel">
            <div className="panel-toolbar">
              <div className="panel-title">TERMINAL</div>
              <div style={{
                fontSize: '0.85rem',
                fontWeight: 700,
                color: serverStatus === 'online' ? '#16A34A' : '#DC2626'
              }}>
                {serverStatus === 'online' ? '● ONLINE' : '● OFFLINE'}
              </div>
            </div>

            <textarea readOnly className="output-textarea" value={output} />
          </div>
        </div>

        {/* CHEAT SHEET */}
        <div className="cheatsheet-container">
          <h2 className="cheatsheet-title">Quick Reference</h2>

          <div className="cheatsheet-grid">
            {cheatSheet.map((item, index) => (
              <div key={index} className="cheat-card">
                <div className="cheat-header">
                  <span className="cheat-keyword">{item.pind}</span>
                  <span className="cheat-eng">{item.eng}</span>
                </div>
                <p className="cheat-desc">{item.desc}</p>
                <div className="cheat-code-box">
                  <code>{item.example}</code>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
