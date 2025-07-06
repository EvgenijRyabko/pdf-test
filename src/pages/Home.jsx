import { Card } from '../components/Card';

export function Home() {
  const pages = [
    { title: 'Object', path: '/object' },
    { title: 'react-pdf-js', path: '/react-pdf-js' },
    { title: 'reactjs-pdf-reader', path: '/reactjs-pdf-reader' },
    { title: 'Object', path: '/object' },
    { title: 'Object', path: '/object' },
  ];

  return (
    <section className="grid grid-cols-2 w-full h-full justify-items-center">
      {pages.length &&
        pages.map((page, id) => <Card key={id} title={page.title} path={page.path} />)}
    </section>
  );
}
