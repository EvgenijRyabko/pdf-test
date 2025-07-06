import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
import { useState } from 'react';

import tempFile from '../data/short.pdf';
import pdfWorker from '../utils/pdf.worker?worker';

pdfjsLib.GlobalWorkerOptions.workerPort = new pdfWorker();

export function PDFSearch() {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pdf, setPdf] = useState(null);
  const [selectedPage, setSelectedPage] = useState(null);

  const handleSearch = async () => {
    if (!term) return;
    setLoading(true);
    setResults([]);
    setSelectedPage(null);

    try {
      const loadedPdf = await pdfjsLib.getDocument(tempFile).promise;
      setPdf(loadedPdf);
      const matches = [];

      for (let i = 1; i <= loadedPdf.numPages; i++) {
        const page = await loadedPdf.getPage(i);
        const textContent = await page.getTextContent();
        const text = textContent.items.map((item) => item.str).join(' ');

        if (text.includes(term)) {
          matches.push({ page: i, snippet: text.slice(0, 100) });
        }
      }

      setResults(matches);
    } catch (e) {
      console.error('Ошибка загрузки PDF:', e);
    }

    setLoading(false);
  };

  const renderPage = async (pageNumber) => {
    if (!pdf) return;

    const page = await pdf.getPage(pageNumber);
    const viewport = page.getViewport({ scale: 1.5 });
    const canvas = document.getElementById('pdf-canvas');
    const context = canvas.getContext('2d');

    canvas.height = viewport.height;
    canvas.width = viewport.width;

    await page.render({ canvasContext: context, viewport }).promise;
  };

  const handleClickPage = (pageNumber) => {
    setSelectedPage(pageNumber);
    renderPage(pageNumber);
  };

  return (
    <div className="p-4">
      <input
        type="text"
        className="border p-2 mb-2 w-full"
        placeholder="Введите число или текст"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
      <button onClick={handleSearch} className="bg-blue-600 text-white p-2 rounded">
        Поиск
      </button>

      {loading && <p className="mt-4">Загрузка...</p>}

      <ul className="mt-4 space-y-2">
        {results.map((r, i) => (
          <li
            key={i}
            className="p-2 border rounded hover:bg-gray-100 cursor-pointer"
            onClick={() => handleClickPage(r.page)}
          >
            <strong>Страница {r.page}</strong>
            <p>{r.snippet}...</p>
          </li>
        ))}
      </ul>

      {selectedPage && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Страница {selectedPage}</h2>
          <canvas id="pdf-canvas" className="border shadow-md" />
        </div>
      )}
    </div>
  );
}
