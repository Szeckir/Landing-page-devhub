import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaBriefcase, FaServer, FaRocket, FaBookOpen, FaChartLine, FaPodcast, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import devhub1 from './assets/devhub.jpg'
import devhub2 from './assets/foto2.jpg'
import devhub3 from './assets/primeirafoto.jpg'
import devhub4 from './assets/foto.jpg'
import programacao from './assets/programacao.png'

const App = () => {
  const [activeSection, setActiveSection] = useState('video');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Tenho direito a reembolso?',
      answer: 'Sim, você tem direito a solicitar reembolso 7 dias depois da compra, conforme nossa política de garantia.'
    },
    {
      question: 'Para quem é o DevHub?',
      answer: 'Além de desenvolvedores, o DevHub é para todos que querem evoluir, com dicas únicas de investimentos, empreendedorismo, produtividade e muito mais.'
    },
    {
      question: 'O que inclui o DevHub?',
      answer: 'O DevHub inclui ferramentas de programação, plataformas de emprego, APIs gratuitas, dicas de investimentos, podcasts recomendados, anotações exclusivas e recursos para produtividade.'
    },
    {
      question: 'Como acessar o conteúdo?',
      answer: 'Após a compra, você recebe acesso imediato via link enviado por e-mail, com todas as seções organizadas e atualizadas.'
    },
    {
      question: 'É atualizado regularmente?',
      answer: 'Sim, o DevHub é constantemente atualizado com novos conteúdos, links e recursos para manter você sempre à frente.'
    },
    {
      question: 'Preciso de experiência prévia?',
      answer: 'Não, o DevHub é para todos os níveis, desde iniciantes até profissionais experientes, com conteúdos adaptados para cada etapa.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  useEffect(() => {
    const sections = ['video', 'hero', 'main', 'features', 'thomaz', 'why', 'faq', 'cta'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

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
    <div className="min-h-screen bg-[#1B1C1D]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-[#1B1C1D] shadow-lg z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-[#4ADE80] font-bold text-xl">Algoritmo&Cafe</div>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <a 
                  href="#video" 
                  className={`text-white hover:text-[#4ADE80] transition-colors ${activeSection === 'video' ? 'text-[#4ADE80]' : ''}`}
                >
                  Início
                </a>
              </li>
              <li>
                <a 
                  href="#features" 
                  className={`text-white hover:text-[#4ADE80] transition-colors ${activeSection === 'features' ? 'text-[#4ADE80]' : ''}`}
                >
                  Recursos
                </a>
              </li>
              <li>
                <a 
                  href="#thomaz" 
                  className={`text-white hover:text-[#4ADE80] transition-colors ${activeSection === 'thomaz' ? 'text-[#4ADE80]' : ''}`}
                >
                  Anotações
                </a>
              </li>
              <li>
                <a 
                  href="#why" 
                  className={`text-white hover:text-[#4ADE80] transition-colors ${activeSection === 'why' ? 'text-[#4ADE80]' : ''}`}
                >
                  Sobre
                </a>
              </li>
              <li>
                <a 
                  href="#faq" 
                  className={`text-white hover:text-[#4ADE80] transition-colors ${activeSection === 'faq' ? 'text-[#4ADE80]' : ''}`}
                >
                  FAQ
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <motion.section 
        id="hero"
        className="bg-[#1B1C1D] text-white py-20 mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            className="text-3xl md:text-5xl font-bold mb-4 text-white"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <FaRocket className="inline mr-2 text-[#4ADE80]" /> DevHub - Central Completa de Recursos
          </motion.h1>
          <motion.p 
            className='text-white mb-8 text-lg'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.3 }}
          >
            A solução definitiva para quem quer ter todos os recursos e ferramentas de tecnologia organizados em um só lugar
          </motion.p>
          {/* Placeholder for first product image */}
          <motion.div 
            className="w-full h-96 bg-gray-800 rounded-lg overflow-hidden shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.4 }}
          >
            <img src={devhub3} alt="DevHub Preview" className="w-full h-full object-cover rounded-lg" />
          </motion.div>
        </div>
      </motion.section>
      <motion.section 
        id="video"
        className="pt-1 py-16 bg-[#1B1C1D] text-white"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.div 
            className="w-full max-w-4xl mx-auto mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden">
              {/* Placeholder for YouTube video embed */}
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/watch?v=uknRtnWqpR8&ab_channel=Algoritmo%26Caf%C3%A9" 
                title="Apresentação DevHub" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </div>
          </motion.div>
                  <motion.div 
          className='justify-center items-center text-center '
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          viewport={{ once: true }}
        >
            <a 
              href="https://pay.hotmart.com/J96549882U?checkoutMode=2" 
              className="btn hotmart-fb bg-[#4ADE80] text-black pr-12 pl-12 pt-4 pb-4 rounded-xl hover:bg-green-600 items-center font-bold shadow-lg transform hover:scale-105 transition-all"
              >Quero Acessar Agora
            </a>
          </motion.div>

        </div>
      </motion.section>

      {/* Main Description */}
      <motion.section 
        id="main"
        className="py-6 bg-[#1B1C1D]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.p 
            className="text-lg text-white mb-8 max-w-3xl mx-auto text-center"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            viewport={{ once: true }}
          >
            O <strong className="text-[#4ADE80]">DevHub</strong> é a solução definitiva para quem quer ter todos os recursos e ferramentas de tecnologia organizados em um só lugar. Criamos uma plataforma que reúne dezenas de links cuidadosamente selecionados, com fácil acesso e categorizados para atender às suas necessidades, seja você programador, designer ou entusiasta de tecnologia.
          </motion.p>
          
          {/* Placeholder for second product image */}
          <motion.div 
            className="w-full h-100 bg-gray-800 mb-12 rounded-lg overflow-hidden shadow-xl"
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            viewport={{ once: true }}
          >
            <img src={devhub4} alt="DevHub Features" className="w-full h-full object-cover rounded-lg" />
          </motion.div>
        </div>
        <motion.div 
          className='justify-center items-center text-center pt-5'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          viewport={{ once: true }}
        >
            <a 
              href="https://pay.hotmart.com/J96549882U?checkoutMode=2" 
              className="btn hotmart-fb bg-[#4ADE80] text-black pr-12 pl-12 pt-4 pb-4 rounded-xl hover:bg-green-600 items-center font-bold shadow-lg transform hover:scale-105 transition-all"
              >Acesse Agora Mesmo
            </a>
          </motion.div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        id="features"
        className="py-16 bg-[#1B1C1D] text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold mb-12 text-center text-[#4ADE80]"
            initial={{ y: -30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
          >
            O Que Você Encontra no DevHub
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <motion.div 
              className="p-6 bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.05, duration: 0.3 }}
              viewport={{ once: true }}
            >
              <FaCode className="text-3xl text-[#4ADE80] mb-4" />
              <h3 className="text-xl font-bold mb-4">Ferramentas de Programação</h3>
              <p>Desde editores de código até frameworks e bibliotecas, tudo ao seu alcance.</p>
            </motion.div>
            <motion.div 
              className="p-6 bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              viewport={{ once: true }}
            >
              <FaBriefcase className="text-3xl text-[#4ADE80] mb-4" />
              <h3 className="text-xl font-bold mb-4">Plataformas de Emprego</h3>
              <p>Encontre vagas de tecnologia e acelere sua carreira com links para as melhores plataformas de emprego.</p>
            </motion.div>
            <motion.div 
              className="p-6 bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.3 }}
              viewport={{ once: true }}
            >
              <FaServer className="text-3xl text-[#4ADE80] mb-4" />
              <h3 className="text-xl font-bold mb-4">APIs Gratuitas</h3>
              <p>Acesse APIs úteis e gratuitas para expandir suas habilidades e explorar novos projetos.</p>
            </motion.div>
            <motion.div 
              className="p-6 bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              viewport={{ once: true }}
            >
              <FaChartLine className="text-3xl text-[#4ADE80] mb-4" />
              <h3 className="text-xl font-bold mb-4">Investimentos na Bolsa de Valores</h3>
              <p>Dicas e conteúdo completo sobre investimentos, com carteiras recomendadas, canais especializados e guias para começar no mercado financeiro.</p>
            </motion.div>
            <motion.div 
              className="p-6 bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.3 }}
              viewport={{ once: true }}
            >
              <FaRocket className="text-3xl text-[#4ADE80] mb-4" />
              <h3 className="text-xl font-bold mb-4">Recursos para Produtividade</h3>
              <p>Além da tecnologia, você encontra guias e ferramentas para melhorar sua produtividade e gerenciar investimentos.</p>
            </motion.div>
            <motion.div 
              className="p-6 bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              viewport={{ once: true }}
            >
              <FaPodcast className="text-3xl text-[#4ADE80] mb-4" />
              <h3 className="text-xl font-bold mb-4">Podcasts Recomendados</h3>
              <p>Diversas dicas de podcasts desde programação e tecnologia até CEOs e empreendedorismo, para inspirar e educar diariamente.</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Thomaz's Notes Section */}
      <motion.section 
        id="thomaz"
        className="py-8 bg-[#1B1C1D]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold mb-8 text-center text-white"
            initial={{ y: -30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
          >
            <FaBookOpen className="inline mr-2 text-[#4ADE80]" /> Acesso Exclusivo às Anotações do Thomaz
          </motion.h2>
          <motion.p 
            className="text-lg text-white mb-12 max-w-3xl mx-auto text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            viewport={{ once: true }}
          >
            Agora, ao adquirir o DevHub, você terá acesso completo a todas as anotações detalhadas do Thomaz sobre todas as linguagens de programação que ele aprendeu ao longo de sua jornada. De Python a JavaScript, passando por frameworks e muito mais – tudo organizado e pronto para acelerar seu aprendizado.
          </motion.p>
          <motion.div 
            className="w-full max-w-2xl mx-auto mb-12"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            viewport={{ once: true }}
          >
            <img src={programacao} alt="Anotações de Programação" className="w-full h-auto rounded-lg shadow-xl" />
          </motion.div>
                    <motion.div 
            className='justify-center items-center text-center pt-2'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.3 }}
            viewport={{ once: true }}
          >
            <a 
              href="https://pay.hotmart.com/J96549882U?checkoutMode=2" 
              className="btn hotmart-fb bg-[#4ADE80] text-black pr-12 pl-12 pt-4 pb-4 rounded-xl hover:bg-green-600 items-center font-bold shadow-lg transform hover:scale-105 transition-all"
              >Acessar Agora
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* Why Choose Section */}
      <motion.section 
        id="why"
        className="py-16 bg-[#1B1C1D]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold mb-8 text-center text-white"
            initial={{ y: -30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
          >
            Por Que Escolher o DevHub?
          </motion.h2>
          <div className="max-w-3xl mx-auto">
            <motion.p 
              className="text-lg text-white mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              viewport={{ once: true }}
            >
              A jornada no mundo da tecnologia pode ser cheia de distrações e recursos dispersos. Nosso objetivo com o <strong className="text-[#4ADE80]">DevHub</strong> é simplificar sua experiência, reunindo tudo o que você precisa em um único lugar, constantemente atualizado e fácil de navegar. Não importa o seu nível de experiência ou especialidade, o <strong className="text-[#4ADE80]">DevHub</strong> é o ponto de partida ideal para encarar qualquer desafio.
            </motion.p>
            
            {/* Placeholder for third product image */}
            <motion.div 
              className="w-full h-96 bg-gray-800 mb-12 rounded-lg overflow-hidden shadow-xl"
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              viewport={{ once: true }}
            >
              <img src={devhub1} alt="DevHub Platform" className="w-full h-full object-cover rounded-lg" />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section 
        id="faq"
        className="py-16 bg-[#1B1C1D]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold mb-12 text-center text-[#4ADE80]"
            initial={{ y: -30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
          >
            Perguntas Frequentes
          </motion.h2>
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div 
                key={faq.question}
                className="mb-4 bg-gray-800 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                viewport={{ once: true }}
              >
                <button
                  className="w-full text-left p-6 text-white font-semibold flex justify-between items-center hover:bg-gray-700 rounded-lg transition-colors"
                  onClick={() => toggleFAQ(index)}
                >
                  {faq.question}
                  {openFAQ === index ? <FaChevronUp className="text-[#4ADE80]" /> : <FaChevronDown className="text-[#4ADE80]" />}
                </button>
                {openFAQ === index && (
                  <motion.div 
                    className="px-6 pb-6 text-gray-300"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        id="cta"
        className="py-16 bg-[#1B1C1D] text-white text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-2xl font-bold mb-8 text-white"
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
          >
            Simplifique sua jornada. Tenha tudo o que precisa em um só lugar.
          </motion.h2>
          <motion.div 
            className='justify-center items-center text-center pt-2'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.3 }}
            viewport={{ once: true }}
          >
            <a 
              href="https://pay.hotmart.com/J96549882U?checkoutMode=2" 
              className="btn hotmart-fb bg-[#4ADE80] text-black pr-12 pl-12 pt-4 pb-4 rounded-xl hover:bg-green-600 items-center font-bold shadow-lg transform hover:scale-105 transition-all"
              >Ver Oferta
            </a>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default App;
