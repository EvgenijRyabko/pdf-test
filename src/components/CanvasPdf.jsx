import React, { useEffect, useRef } from 'react';

export function CanvasPdf({ page }) {
  const canvasRef = useRef(null);
  const renderTaskRef = useRef(null);

  useEffect(() => {
    if (!page) return;

    const render = async () => {
      if (!page) return;
      const viewport = page.getViewport({ scale: 1.5 });

      // canvas
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      try {
        if (renderTaskRef.current) {
          await renderTaskRef.current.cancel();
        }

        renderTaskRef.current = page.render({ canvasContext: ctx, viewport });
        await renderTaskRef.current.promise;
      } catch (err) {
        if (err?.name !== 'RenderingCancelledException') {
          console.error('Ошибка при рендеринге PDF:', err);
        }
      }
    };

    render();
  }, [page]);

  return (
    <div className="relative mb-10 border shadow-lg inline-block">
      <canvas ref={canvasRef} className="w-full" />
    </div>
  );
}
