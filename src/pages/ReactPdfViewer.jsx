import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
import { useState } from 'react';

import { CanvasPdf } from '../components/CanvasPdf';
import tempFile from '../data/short.pdf';
import pdfWorker from '../utils/pdf.worker?worker';

pdfjsLib.GlobalWorkerOptions.workerPort = new pdfWorker();

export function PDFSearch() {
  const [matches, setMatches] = useState([]);

  const [term, setTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!term) return;
    setMatches([]);
    setLoading(true);

    const matchedPages = [];

    try {
      const loadedPdf = await pdfjsLib.getDocument(tempFile).promise;

      for (let i = 1; i <= loadedPdf.numPages; i++) {
        const page = await loadedPdf.getPage(i);
        const textContent = await page.getTextContent();
        const text = textContent.items.map((item) => item.str).join(' ');

        if (text.toLowerCase().includes(term.toLowerCase())) {
          matchedPages.push(page);
        }
      }

      setMatches(matchedPages);
      setLoading(false);
    } catch (e) {
      console.error('Ошибка загрузки PDF:', e);
    }
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

      {loading && <p>Загрузка...</p>}

      <div className="py-4">
        {matches.map((page, id) => (
          <CanvasPdf key={id} page={page} />
        ))}
      </div>
    </div>
  );
}
