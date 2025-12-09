import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaCode, 
  FaBriefcase, 
  FaServer, 
  FaRocket, 
  FaBookOpen, 
  FaChartLine, 
  FaPodcast, 
  FaChevronDown, 
  FaChevronUp,
  FaCheck,
  FaBars,
  FaTimes,
  FaBrain,
  FaDatabase,
  FaTools,
  FaGraduationCap
} from 'react-icons/fa';
import CountdownTimer from '../components/CountdownTimer';
import PriceDisplay from '../components/PriceDisplay';
import UrgencyBadge from '../components/UrgencyBadge';
import FeatureCard from '../components/FeatureCard';
import GuaranteeSection from '../components/GuaranteeSection';
import devhub1 from '../assets/devhub.jpg';
import devhub2 from '../assets/foto2.jpg';
import devhub3 from '../assets/primeirafoto.jpg';
import devhub4 from '../assets/foto.jpg';
import programacao from '../assets/programacao.png';

const LandingPage = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const faqs = [
    {
      question: 'Tenho direito a reembolso?',
      answer: 'Sim! Você tem 7 dias após a compra para solicitar reembolso integral. Sem letra miúda, sem enrolação. Se não for para você, devolvemos 100% do seu dinheiro.'
    },
    {
      question: 'Para quem é o DevHub?',
      answer: 'O DevHub é para desenvolvedores, programadores, estudantes de tecnologia e qualquer pessoa que quer ter acesso organizado a milhares de recursos, ferramentas, sites de emprego, dicas de IA e muito mais. É para quem quer economizar tempo e ter tudo em um só lugar.'
    },
    {
      question: 'O que inclui o DevHub?',
      answer: 'O DevHub inclui: milhares de sites de empregos organizados, ferramentas de IA (geradores de código, imagens, logos, etc.), APIs gratuitas, anotações completas de programação do Thomaz, recursos de investimento, podcasts recomendados, ferramentas de produtividade e muito mais. Tudo organizado e atualizado constantemente.'
    },
    {
      question: 'Como acessar o conteúdo?',
      answer: 'Após a compra, você recebe acesso imediato via link enviado por e-mail. O DevHub é uma página Notion organizada com todas as seções categorizadas e fáceis de navegar.'
    },
    {
      question: 'É atualizado regularmente?',
      answer: 'Sim! O DevHub é constantemente atualizado com novos recursos, links, ferramentas e dicas. Além disso, estamos expandindo para uma comunidade completa com chat, troca de informações e ainda mais conteúdo. Quem compra agora terá acesso a todas as atualizações futuras.'
    },
    {
      question: 'Preciso de experiência prévia?',
      answer: 'Não! O DevHub é para todos os níveis, desde iniciantes até profissionais experientes. As anotações de programação são organizadas por linguagem e nível, e todos os recursos são explicados de forma clara.'
    },
    {
      question: 'O que é a expansão para comunidade?',
      answer: 'Estamos transformando o DevHub em uma comunidade completa com chat, fórum de discussões, troca de informações entre membros e muito mais conteúdo exclusivo. Quem compra agora terá acesso vitalício a todas essas atualizações sem custo adicional.'
    },
    {
      question: 'Posso parcelar?',
      answer: 'Não, o DevHub é vendido por R$ 19,90 em pagamento único. É um investimento único que te dá acesso permanente a todo o conteúdo e futuras atualizações.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  useEffect(() => {
    const sections = ['hero', 'what-is', 'benefits', 'why-matters', 'target', 'guarantee', 'faq', 'cta'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const importHotmart = () => {
      if (!document.querySelector('script[src="https://static.hotmart.com/checkout/widget.min.js"]')) {
        const script = document.createElement('script');
        script.src = 'https://static.hotmart.com/checkout/widget.min.js';
        document.head.appendChild(script);
      }
      
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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1B1C1D]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-[#1B1C1D]/95 backdrop-blur-sm shadow-lg z-50 border-b border-gray-800">
        <div className="container-custom py-4 flex justify-between items-center">
          <Link to="/" className="text-[#4ADE80] font-bold text-xl md:text-2xl">
            Algoritmo&Cafe
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex">
            <ul className="flex space-x-6">
              <li>
                <a 
                  href="#benefits" 
                  onClick={(e) => { e.preventDefault(); scrollToSection('benefits'); }}
                  className={`text-white hover:text-[#4ADE80] transition-colors ${activeSection === 'benefits' ? 'text-[#4ADE80]' : ''}`}
                >
                  Recursos
                </a>
              </li>
              <li>
                <a 
                  href="#why-matters" 
                  onClick={(e) => { e.preventDefault(); scrollToSection('why-matters'); }}
                  className={`text-white hover:text-[#4ADE80] transition-colors ${activeSection === 'why-matters' ? 'text-[#4ADE80]' : ''}`}
                >
                  Por Que?
                </a>
              </li>
              <li>
                <a 
                  href="#faq" 
                  onClick={(e) => { e.preventDefault(); scrollToSection('faq'); }}
                  className={`text-white hover:text-[#4ADE80] transition-colors ${activeSection === 'faq' ? 'text-[#4ADE80]' : ''}`}
                >
                  FAQ
                </a>
              </li>
              {/* <li>
                <Link 
                  to="/membros"
                  className="text-white hover:text-[#4ADE80] transition-colors"
                >
                  Área de Membros
                </Link>
              </li> */}
              <li>
                <a 
                  href="https://pay.hotmart.com/J96549882U?checkoutMode=2" 
                  className="btn-primary text-sm"
                >
                  Comprar Agora
                </a>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gray-900 border-t border-gray-800"
          >
            <ul className="flex flex-col space-y-4 p-4">
              <li>
                <a 
                  href="#benefits" 
                  onClick={(e) => { e.preventDefault(); scrollToSection('benefits'); }}
                  className="block text-white hover:text-[#4ADE80] transition-colors"
                >
                  Recursos
                </a>
              </li>
              <li>
                <a 
                  href="#why-matters" 
                  onClick={(e) => { e.preventDefault(); scrollToSection('why-matters'); }}
                  className="block text-white hover:text-[#4ADE80] transition-colors"
                >
                  Por Que?
                </a>
              </li>
              <li>
                <a 
                  href="#faq" 
                  onClick={(e) => { e.preventDefault(); scrollToSection('faq'); }}
                  className="block text-white hover:text-[#4ADE80] transition-colors"
                >
                  FAQ
                </a>
              </li>
              <li>
                <Link 
                  to="/membros"
                  className="block text-white hover:text-[#4ADE80] transition-colors"
                >
                  Área de Membros
                </Link>
              </li>
              <li>
                <a 
                  href="https://pay.hotmart.com/J96549882U?checkoutMode=2" 
                  className="btn-primary text-center block"
                >
                  Comprar Agora
                </a>
              </li>
            </ul>
          </motion.nav>
        )}
      </header>

      {/* Hero Section */}
      <section 
        id="hero"
        className="pt-24 md:pt-32 pb-12 md:pb-20 bg-gradient-to-b from-[#1B1C1D] to-gray-900"
      >
        <div className="container-custom">
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <UrgencyBadge text="Oferta Exclusiva • Tempo Limitado" />
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <span className="text-white">DevHub</span>
              <br />
              <span className="text-gradient">Central Completa de Recursos</span>
              <br />
              <span className="text-white text-3xl md:text-5xl lg:text-6xl">para Desenvolvedores</span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Milhares de sites de empregos, ferramentas de IA, APIs gratuitas, anotações completas de programação e muito mais.
              <br />
              <span className="text-[#4ADE80] font-semibold">Tudo organizado em um só lugar.</span>
            </motion.p>

            {/* Timer */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <CountdownTimer />
            </motion.div>

            {/* Price */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <PriceDisplay price="R$ 19,90" />
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <a 
                href="https://pay.hotmart.com/J96549882U?checkoutMode=2" 
                className="btn-primary-lg inline-block"
              >
                QUERO ACESSAR AGORA
              </a>
            </motion.div>

            <motion.p
              className="text-sm text-gray-400 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              ✓ Acesso imediato • ✓ Atualizações constantes • ✓ Garantia de 7 dias
            </motion.p>
          </div>

          {/* Product Image */}
          <motion.div
            className="mt-12 max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <div className="rounded-xl overflow-hidden shadow-2xl border border-gray-700">
              <img src={devhub3} alt="DevHub Preview" className="w-full h-auto" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Urgency Section */}
      <section className="py-8 bg-gradient-to-r from-red-900/20 to-orange-900/20 border-y border-red-800/30">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
            <CountdownTimer />
            <div className="text-center md:text-left">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                Oferta por Tempo Limitado
              </h3>
              <p className="text-gray-300">
                Não perca esta oportunidade de ter acesso a milhares de recursos organizados
              </p>
            </div>
            <a 
              href="https://pay.hotmart.com/J96549882U?checkoutMode=2" 
              className="btn-primary"
            >
              Garantir Agora
            </a>
          </div>
        </div>
      </section>

      {/* What is DevHub Section */}
      <section 
        id="what-is"
        className="section-padding bg-[#1B1C1D]"
      >
        <div className="container-custom">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="text-white">O que é o </span>
              <span className="text-gradient">DevHub?</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
              O <strong className="text-[#4ADE80]">DevHub</strong> é a solução definitiva para quem quer ter 
              <strong className="text-white"> todos os recursos e ferramentas de tecnologia organizados em um só lugar</strong>.
            </p>
            <p className="text-lg md:text-xl text-gray-300 mb-12 leading-relaxed">
              Criamos uma plataforma que reúne <strong className="text-[#4ADE80]">milhares de links cuidadosamente selecionados</strong>, 
              com fácil acesso e categorizados para atender às suas necessidades. Seja você programador, designer, 
              estudante ou entusiasta de tecnologia, o DevHub é o ponto de partida ideal para qualquer desafio.
            </p>

            <motion.div
              className="mb-12"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="rounded-xl overflow-hidden shadow-2xl border border-gray-700">
                <img src={devhub4} alt="DevHub Features" className="w-full h-auto" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <a 
                href="https://pay.hotmart.com/J96549882U?checkoutMode=2" 
                className="btn-primary-lg inline-block"
              >
                Quero Acessar Agora
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section 
        id="benefits"
        className="section-padding bg-gradient-to-b from-gray-900 to-[#1B1C1D]"
      >
        <div className="container-custom">
          <motion.h2
            className="text-3xl md:text-5xl font-bold mb-4 text-center"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-white">O que você vai </span>
            <span className="text-gradient">encontrar?</span>
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Milhares de recursos organizados por categoria, prontos para acelerar sua jornada
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <FeatureCard
              icon={FaBriefcase}
              title="Milhares de Sites de Empregos"
              description="Telegram de vagas, aplicadores automáticos, oportunidades remotas, vagas no exterior, startups e muito mais. Tudo organizado para você encontrar o emprego dos sonhos."
              delay={0.1}
            />
            <FeatureCard
              icon={FaBrain}
              title="Ferramentas de IA"
              description="Geradores de código, imagens, logos, modelos 3D, clone de voz, texto para áudio e muito mais. As melhores ferramentas de IA organizadas e atualizadas."
              delay={0.15}
            />
            <FeatureCard
              icon={FaBookOpen}
              title="Anotações Completas de Programação"
              description="Acesso exclusivo a todas as anotações do Thomaz sobre Python, JavaScript, frameworks e muito mais. Organizadas por linguagem e nível."
              delay={0.2}
            />
            <FeatureCard
              icon={FaServer}
              title="APIs Gratuitas"
              description="Countries API, JSON Placeholder, Pokemon API, Weather API, Cats API, Universe API e centenas de outras APIs gratuitas para seus projetos."
              delay={0.25}
            />
            <FeatureCard
              icon={FaChartLine}
              title="Recursos de Investimento"
              description="Cotações de ações, notícias de investimento, comparadores, carteiras recomendadas e tudo que você precisa para investir com inteligência."
              delay={0.3}
            />
            <FeatureCard
              icon={FaTools}
              title="Ferramentas de Produtividade"
              description="Guardadores de senha, VPNs, bloqueadores de anúncios, downloaders de vídeo, quadros colaborativos e muito mais."
              delay={0.35}
            />
            <FeatureCard
              icon={FaCode}
              title="Ferramentas de Programação"
              description="Editores de código, frameworks, bibliotecas, ícones SVG, sites de ícones e tudo que um desenvolvedor precisa no dia a dia."
              delay={0.4}
            />
            <FeatureCard
              icon={FaPodcast}
              title="Podcasts Recomendados"
              description="Diversas dicas de podcasts sobre programação, tecnologia, CEOs, empreendedorismo e muito mais para inspirar e educar."
              delay={0.45}
            />
            <FeatureCard
              icon={FaGraduationCap}
              title="Recursos Educacionais"
              description="Canais do YouTube, newsletters de tecnologia, artigos recomendados e fontes de aprendizado contínuo."
              delay={0.5}
            />
          </div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <a 
              href="https://pay.hotmart.com/J96549882U?checkoutMode=2" 
              className="btn-primary-lg inline-block"
            >
              Quero Ter Acesso a Tudo Isso
            </a>
          </motion.div>
        </div>
      </section>

      {/* Notes Section */}
      <section className="section-padding bg-[#1B1C1D]">
        <div className="container-custom">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center">
              <FaBookOpen className="inline mr-3 text-[#4ADE80]" />
              <span className="text-white">Acesso Exclusivo às </span>
              <span className="text-gradient">Anotações do Thomaz</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-12 text-center leading-relaxed">
              Ao adquirir o DevHub, você terá acesso completo a todas as anotações detalhadas do Thomaz sobre 
              todas as linguagens de programação que ele aprendeu ao longo de sua jornada. De Python a JavaScript, 
              passando por frameworks e muito mais – tudo organizado e pronto para acelerar seu aprendizado.
            </p>
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="rounded-xl overflow-hidden shadow-2xl border border-gray-700">
                <img src={programacao} alt="Anotações de Programação" className="w-full h-auto" />
              </div>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <a 
                href="https://pay.hotmart.com/J96549882U?checkoutMode=2" 
                className="btn-primary-lg inline-block"
              >
                Quero as Anotações Agora
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why Matters Section */}
      <section 
        id="why-matters"
        className="section-padding bg-gradient-to-b from-gray-900 to-[#1B1C1D]"
      >
        <div className="container-custom">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-8">
              <span className="text-white">Por que isso </span>
              <span className="text-gradient">importa?</span>
            </h2>
            <div className="text-left space-y-6 mb-12">
              <motion.div
                className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <h3 className="text-xl md:text-2xl font-bold text-[#4ADE80] mb-3">
                  Economia de Tempo
                </h3>
                <p className="text-gray-300 text-lg">
                  Pare de perder horas procurando recursos na internet. Tudo está organizado e categorizado 
                  em um só lugar, pronto para uso imediato.
                </p>
              </motion.div>

              <motion.div
                className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-xl md:text-2xl font-bold text-[#4ADE80] mb-3">
                  Organização Completa
                </h3>
                <p className="text-gray-300 text-lg">
                  Milhares de links, ferramentas e recursos organizados por categoria. Não importa o que você 
                  precisa, você encontra rapidamente.
                </p>
              </motion.div>

              <motion.div
                className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-xl md:text-2xl font-bold text-[#4ADE80] mb-3">
                  Expansão para Comunidade
                </h3>
                <p className="text-gray-300 text-lg">
                  Estamos transformando o DevHub em uma comunidade completa com chat, fórum de discussões, 
                  troca de informações e muito mais conteúdo exclusivo. Quem compra agora terá acesso a 
                  todas essas atualizações sem custo adicional.
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <a 
                href="https://pay.hotmart.com/J96549882U?checkoutMode=2" 
                className="btn-primary-lg inline-block"
              >
                Quero Fazer Parte Agora
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section 
        id="target"
        className="section-padding bg-[#1B1C1D]"
      >
        <div className="container-custom">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-8 text-center">
              <span className="text-white">É para você </span>
              <span className="text-gradient">se...</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {[
                'Quer economizar tempo procurando recursos na internet',
                'Precisa de organização para seus links e ferramentas',
                'Está começando na programação e quer aprender',
                'Já é experiente e quer ter tudo organizado',
                'Está procurando emprego na área de tecnologia',
                'Quer acesso a ferramentas de IA atualizadas',
                'Precisa de APIs gratuitas para seus projetos',
                'Quer fazer parte de uma comunidade em expansão'
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-3 bg-gray-800/50 rounded-lg p-4 border border-gray-700"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <FaCheck className="text-[#4ADE80] text-xl flex-shrink-0 mt-1" />
                  <span className="text-gray-300 text-lg">{item}</span>
                </motion.div>
              ))}
            </div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              <a 
                href="https://pay.hotmart.com/J96549882U?checkoutMode=2" 
                className="btn-primary-lg inline-block"
              >
                Sim, É Para Mim!
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Guarantee Section */}
      <GuaranteeSection />

      {/* FAQ Section */}
      <section 
        id="faq"
        className="section-padding bg-gradient-to-b from-gray-900 to-[#1B1C1D]"
      >
        <div className="container-custom">
          <motion.h2
            className="text-3xl md:text-5xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-white">Perguntas </span>
            <span className="text-gradient">Frequentes</span>
          </motion.h2>
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="mb-4 bg-gray-800/50 rounded-lg border border-gray-700 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <button
                  className="w-full text-left p-6 text-white font-semibold flex justify-between items-center hover:bg-gray-700/50 transition-colors"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="text-lg md:text-xl pr-4">{faq.question}</span>
                  {openFAQ === index ? (
                    <FaChevronUp className="text-[#4ADE80] flex-shrink-0" />
                  ) : (
                    <FaChevronDown className="text-[#4ADE80] flex-shrink-0" />
                  )}
                </button>
                {openFAQ === index && (
                  <motion.div
                    className="px-6 pb-6 text-gray-300 text-base md:text-lg leading-relaxed"
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
      </section>

      {/* Final CTA Section */}
      <section 
        id="cta"
        className="section-padding bg-gradient-to-br from-[#1B1C1D] via-gray-900 to-[#1B1C1D]"
      >
        <div className="container-custom">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="text-white">Simplifique sua jornada.</span>
              <br />
              <span className="text-gradient">Tenha tudo em um só lugar.</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              Milhares de recursos organizados, atualizações constantes e acesso a uma comunidade em expansão.
            </p>

            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <PriceDisplay price="R$ 19,90" />
            </motion.div>

            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <a 
                href="https://pay.hotmart.com/J96549882U?checkoutMode=2" 
                className="btn-primary-lg inline-block"
              >
                QUERO ACESSAR AGORA
              </a>
            </motion.div>

            <motion.div
              className="mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <CountdownTimer />
            </motion.div>

            <motion.p
              className="text-sm text-gray-400"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              ✓ Acesso imediato • ✓ Atualizações constantes • ✓ Garantia de 7 dias • ✓ Sem mensalidade
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-8">
        <div className="container-custom">
          <div className="text-center">
            <div className="text-[#4ADE80] font-bold text-xl mb-4">Algoritmo&Cafe</div>
            <p className="text-gray-400 text-sm mb-4">
              © 2025 Algoritmo&Cafe - Todos os direitos reservados.
            </p>
            <div className="flex justify-center gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-[#4ADE80] transition-colors">Política de Privacidade</a>
              <a href="#" className="hover:text-[#4ADE80] transition-colors">Termos de Uso</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

