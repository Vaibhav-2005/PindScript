import React, { useState } from 'react';
import './Docs.css';

export default function Docs() {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = (text, uniqueId) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(uniqueId);
    setTimeout(() => setCopiedIndex(null), 2000); 
  };

  const docCategories = [
    {
      title: "Basics: Variables & Output",
      items: [
        { id: 'b1', keyword: 'mannle', eng: 'var / let', desc: 'Declares a new variable. Scoped to blocks.', code: 'mannle naam = "Jatt";' },
        { id: 'b2', keyword: 'vikha', eng: 'print', desc: 'Prints text or numbers to the output panel.', code: 'vikha("Sat Sri Akal");' },
        { id: 'b3', keyword: 'tippani', eng: '//', desc: 'Single-line comment. Ignored by compiler.', code: '// Eh ik comment hai' },
      ]
    },
    {
      title: "Logic & Flow Control",
      items: [
        { id: 'l1', keyword: 'je', eng: 'if', desc: 'Starts a conditional logic block.', code: 'je (x > 5) {\n  vikha("Vadda hai");\n}' },
        { id: 'l2', keyword: 'hor_je', eng: 'else if', desc: 'Checks a secondary condition if first fails.', code: 'hor_je (x == 5) {\n  vikha("Barabar hai");\n}' },
        { id: 'l3', keyword: 'fer', eng: 'else', desc: 'Fallback block if all conditions fail.', code: 'fer {\n  vikha("Chhota hai");\n}' },
        { id: 'l4', keyword: 'chaddo', eng: 'break', desc: 'Immediately stops/exits a loop.', code: 'je (i == 3) chaddo;' },
        { id: 'l5', keyword: 'langh_jaa', eng: 'continue', desc: 'Skips the rest of the current loop iteration.', code: 'je (i == 2) langh_jaa;' },
      ]
    },
    {
      title: "Loops",
      items: [
        { id: 'lp1', keyword: 'jado', eng: 'while', desc: 'Runs a block while a condition is true.', code: 'jado (x > 0) {\n  x = x - 1;\n}' },
        { id: 'lp2', keyword: 'jadd_vi', eng: 'for', desc: 'Standard counting loop (init; cond; update).', code: 'jadd_vi (mannle i=0; i<5; i++) {\n  vikha(i);\n}' },
        { id: 'lp3', keyword: 'eh_kro', eng: 'do-while', desc: 'Runs code at least once before checking logic.', code: 'eh_kro {\n  vikha("Chalega hi");\n} jado(false);' },
      ]
    },
    {
      title: "Functions",
      items: [
        { id: 'f1', keyword: 'kamm', eng: 'function', desc: 'Defines a reusable function block.', code: 'kamm jodo(a, b) {\n  bhajo a + b;\n}' },
        { id: 'f2', keyword: 'bhajo', eng: 'return', desc: 'Returns a value from a function.', code: 'bhajo result;' },
      ]
    },
    {
      title: "Array Library",
      items: [
        { id: 'a1', keyword: 'thuss(arr, val)', desc: 'Push: Adds an item to the end of an array.', code: 'thuss(list, 50);' },
        { id: 'a2', keyword: 'kaddh(arr)', desc: 'Pop: Removes the last item from an array.', code: 'kaddh(list);' },
        { id: 'a3', keyword: 'agge_ho(arr)', desc: 'Shift: Removes the first item from an array.', code: 'agge_ho(list);' },
        { id: 'a4', keyword: 'palt(arr)', desc: 'Reverse: Reverses the order of elements.', code: 'palt(list);' },
        { id: 'a5', keyword: 'lambai(arr)', desc: 'Length: Returns the number of items.', code: 'lambai(list);' },
      ]
    },
    {
      title: "String Library",
      items: [
        { id: 's1', keyword: 'vadda_kro(str)', desc: 'Upper: Converts text to CAPITAL LETTERS.', code: 'vadda_kro("hello");' },
        { id: 's2', keyword: 'chhota_kro(str)', desc: 'Lower: Converts text to small letters.', code: 'chhota_kro("HELLO");' },
        { id: 's3', keyword: 'katt(str, s, e)', desc: 'Substring: Extracts part of a string.', code: 'katt(text, 0, 5);' },
        { id: 's4', keyword: 'labho(str, val)', desc: 'Find: Finds index of a word inside string.', code: 'labho(text, "a");' },
        { id: 's5', keyword: 'lambai(str)', desc: 'Length: Returns the number of characters.', code: 'lambai("Sat Sri Akal");' },
      ]
    },
    {
      title: "System & IDE Features",
      items: [
        { id: 'x1', keyword: 'Roast Errors', desc: 'Funny Punjabi insults instead of generic errors.', code: 'Error: "Oye! Dimaag na kharaab kar!"' },
        { id: 'x2', keyword: 'Scope Safety', desc: 'Variables inside {} do not leak outside.', code: '{ mannle x = 1; } // x is dead here' },
        { id: 'x3', keyword: 'Ctrl + /', desc: 'IDE Shortcut to toggle comments.', code: '// Select line and press Ctrl + /' },
      ]
    }
  ];

  return (
    <div className="docs-page">
      <div className="docs-hero">
        <h1>Documentation</h1>
        <p>Master the art of PindScript. Syntax, Logic, and Desi Power.</p>
      </div>

      <div className="docs-content">
        {docCategories.map((category, index) => (
          <div key={index} className="docs-section">
            <h2 className="section-title">{category.title}</h2>
            <div className="card-grid">
              {category.items.map((item) => (
                <div className="doc-card" key={item.id}>
                  <div className="card-header">
                    <span className="keyword">{item.keyword}</span>
                    {item.eng && <span className="meaning">{item.eng}</span>}
                  </div>
                  <p className="description">{item.desc}</p>
                  
                  <div className="snippet-header">
                    <button 
                      className={`copy-btn ${copiedIndex === item.id ? 'copied' : ''}`}
                      onClick={() => handleCopy(item.code, item.id)}
                      title="Copy to clipboard"
                    >
                      {copiedIndex === item.id ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                      )}
                    </button>
                  </div>

                  <div className="code-snippet">
                    <pre>{item.code}</pre>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}