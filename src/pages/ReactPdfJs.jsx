import { usePdf } from '@mikecousins/react-pdf';
import React, { useRef, useState } from 'react';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';

import testDoc from '../data/short.pdf';

export function ReactPdfJs() {
  const [page, setPage] = useState(1);
  const canvasRef = useRef(null);

  const { pdfDocument } = usePdf({
    file: testDoc,
    page,
    canvasRef,
  });

  return (
    <section className="w-full h-full">
      {!pdfDocument && <span>Loading...</span>}
      <canvas ref={canvasRef} className="w-full" />
      {Boolean(pdfDocument && pdfDocument.numPages) && (
        <nav className="w-full grid grid-cols-2 justify-items-center">
          <FaArrowCircleLeft
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="w-[30px] h-[30px] hover:scale-110 transition"
          />
          <FaArrowCircleRight
            disabled={page === pdfDocument.numPages}
            onClick={() => setPage(page + 1)}
            className="w-[30px] h-[30px] hover:scale-110 transition"
          />
        </nav>
      )}
    </section>
  );
}
