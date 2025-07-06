import testDoc from '../data/short.pdf';

export function ObjectPage() {
  return (
    <object width="100%" height="100%" data={testDoc} type="application/pdf">
      {' '}
    </object>
  );
}
