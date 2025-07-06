import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { PdfWrapper } from '../components/PdfWrapper';
import { Home } from '../pages/home';
import { ObjectPage } from '../pages/ObjectPage';
import { ReactPdfJs } from '../pages/ReactPdfJs';
import { PDFSearch } from '../pages/ReactPdfViewer';

export function MainRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route
          exact
          path="/object"
          element={
            <PdfWrapper>
              <ObjectPage />
            </PdfWrapper>
          }
        />
        <Route
          exact
          path="/react-pdf-js"
          element={
            <PdfWrapper>
              <ReactPdfJs />
            </PdfWrapper>
          }
        />
        <Route
          exact
          path="/reactjs-pdf-reader"
          element={
            <PdfWrapper>
              <PDFSearch />
            </PdfWrapper>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
