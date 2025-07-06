import React, { useEffect, useRef } from 'react';

export function CanvasPdf({ page }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const render = async () => {
      if (!page) return;
      const viewport = page.getViewport({ scale: 1.5 });

      // canvas
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      await page.render({ canvasContext: ctx, viewport }).promise;
    };

    render();
  }, [page]);

  return (
    <div className="relative mb-10 border shadow-lg inline-block">
      <canvas ref={canvasRef} className="w-full" />
    </div>
  );
}
