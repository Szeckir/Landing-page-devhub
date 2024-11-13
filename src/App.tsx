import React from 'react';
import devhub1 from './assets/devhub.jpg'
import devhub2 from './assets/foto2.jpg'
import devhub3 from './assets/primeirafoto.jpg'
import devhub4 from './assets/foto.jpg'

const App = () => {
  React.useEffect(() => {
    const importHotmart = () => {
      // Verifique se o script já foi carregado
      if (!document.querySelector('script[src="https://static.hotmart.com/checkout/widget.min.js"]')) {
        const script = document.createElement('script');
        script.src = 'https://static.hotmart.com/checkout/widget.min.js';
        document.head.appendChild(script);
      }
      
      // Verifique se o CSS já foi carregado
      if (!document.querySelector('link[href="https://static.hotmart.com/css/hotmart-fb.min.css"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = 'https://static.hotmart.com/css/hotmart-fb.min.css';
        document.head.appendChild(link);
      }
    };
    
    importHotmart();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-black text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-3xl font-bold mb-8">
          DevHub - Central Completa de Recursos
          </h1>
          <p className='text-gray-300 mb-8'>A solução definitiva para quem quer ter todos os recursos e ferramentas de tecnologia organizados em um só lugar</p>
          {/* Placeholder for first product image */}
          <div className="w-full h-96 bg-gray-800 mb-8 rounded-lg">
            <img src={devhub3} alt="DevHub Preview" className="w-full h-full object-cover rounded-lg" />
          </div>
        </div>
          <div className='justify-center items-center text-center pt-5'>
            <a 
              href="https://pay.hotmart.com/J96549882U?checkoutMode=2" 
              className="btn hotmart-fb bg-green-500 pr-12 pl-12 pt-4 pb-4 rounded-xl hover:bg-green-600 items-center"
              >Quero Ver os Sites
            </a>
          </div>
      </section>

      {/* Main Description */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <p className="text-lg text-gray-700 mb-12 max-w-3xl mx-auto text-center">
            O <strong>DevHub</strong> é a solução definitiva para quem quer ter todos os recursos e ferramentas de tecnologia organizados em um só lugar. Criamos uma plataforma que reúne dezenas de links cuidadosamente selecionados, com fácil acesso e categorizados para atender às suas necessidades, seja você programador, designer ou entusiasta de tecnologia.
          </p>
          
          {/* Placeholder for second product image */}
          <div className="w-full h-100 bg-gray-100 mb-12 rounded-lg">
            <img src={devhub4} alt="DevHub Features" className="w-full h-full object-cover rounded-lg" />
          </div>
        </div>
        <div className='justify-center items-center text-center pt-5'>
            <a 
              href="https://pay.hotmart.com/J96549882U?checkoutMode=2" 
              className="btn hotmart-fb bg-green-500 pr-12 pl-12 pt-4 pb-4 rounded-xl hover:bg-green-600 items-center text-white"
              >Quero Acessar Agora
            </a>
          </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">O Que Você Encontra no DevHub</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="p-6 bg-gray-900 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Ferramentas de Programação</h3>
              <p>Desde editores de código até frameworks e bibliotecas, tudo ao seu alcance.</p>
            </div>
            <div className="p-6 bg-gray-900 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Plataformas de Emprego</h3>
              <p>Encontre vagas de tecnologia e acelere sua carreira com links para as melhores plataformas de emprego.</p>
            </div>
            <div className="p-6 bg-gray-900 rounded-lg">
              <h3 className="text-xl font-bold mb-4">APIs Gratuitas</h3>
              <p>Acesse APIs úteis e gratuitas para expandir suas habilidades e explorar novos projetos.</p>
            </div>
            <div className="p-6 bg-gray-900 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Geradores de CSS</h3>
              <p>Ferramentas de design, como geradores de CSS e outros recursos visuais, que facilitam o desenvolvimento e design de interfaces.</p>
            </div>
            <div className="p-6 bg-gray-900 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Recursos para Produtividade</h3>
              <p>Além da tecnologia, você encontra guias e ferramentas para melhorar sua produtividade e gerenciar investimentos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Por Que Escolher o DevHub?</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-700 mb-12">
              A jornada no mundo da tecnologia pode ser cheia de distrações e recursos dispersos. Nosso objetivo com o <strong>DevHub</strong> é simplificar sua experiência, reunindo tudo o que você precisa em um único lugar, constantemente atualizado e fácil de navegar. Não importa o seu nível de experiência ou especialidade, o <strong>DevHub</strong> é o ponto de partida ideal para encarar qualquer desafio.
            </p>
            
            {/* Placeholder for third product image */}
            <div className="w-full h-96 bg-gray-100 mb-12 rounded-lg">
              <img src={devhub1} alt="DevHub Platform" className="w-full h-full object-cover rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-gray-200">Simplifique sua jornada. Tenha tudo o que precisa em um só lugar.</h2>
          <div className='justify-center items-center text-center pt-2'>
            <a 
              href="https://pay.hotmart.com/J96549882U?checkoutMode=2" 
              className="btn hotmart-fb bg-green-500 pr-12 pl-12 pt-4 pb-4 rounded-xl hover:bg-green-600 items-center"
              >Adquirir Agora
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
