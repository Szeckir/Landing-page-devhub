import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaSignOutAlt, FaUser, FaCog, FaUsers, FaRoute, FaBookOpen, FaLink } from 'react-icons/fa';

const Dashboard = () => {
  // Cole o link do YouTube aqui:
  const YOUTUBE_VIDEO_URL = '';

  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await signOut();
  };

  const getInitials = () => {
    const displayName = user?.user_metadata?.full_name || 
                       user?.user_metadata?.name || 
                       user?.email?.split('@')[0] || 
                       'U';
    return displayName.charAt(0).toUpperCase();
  };

  // Converter URL do YouTube para embed
  const getYoutubeEmbedUrl = (url: string) => {
    if (!url) return '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = (match && match[2].length === 11) ? match[2] : null;
    return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
  };

  return (
    <div className="min-h-screen bg-[#1B1C1D]">
      {/* Header */}
      <header className="bg-[#1B1C1D]/95 backdrop-blur-sm shadow-lg border-b border-gray-800 sticky top-0 z-50">
        <div className="container-custom py-4 flex justify-between items-center">
          <Link to="/" className="text-[#4ADE80] font-bold text-xl md:text-2xl">
            Algoritmo&Cafe
          </Link>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-full px-3 py-2 transition-colors border border-gray-700"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4ADE80] to-green-600 flex items-center justify-center text-black font-bold text-sm">
                {getInitials()}
              </div>
              <FaCog className="text-gray-400 text-sm" />
            </button>
            
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-xl shadow-xl border border-gray-700 overflow-hidden">
                <button
                  onClick={() => {
                    navigate('/membros/perfil');
                    setDropdownOpen(false);
                  }}
                  className="w-full px-4 py-3 text-left text-white hover:bg-gray-700 transition-colors flex items-center gap-3"
                >
                  <FaUser className="text-[#4ADE80]" />
                  <span>Perfil</span>
                </button>
                <button
                  onClick={() => {
                    handleSignOut();
                    setDropdownOpen(false);
                  }}
                  className="w-full px-4 py-3 text-left text-white hover:bg-gray-700 transition-colors flex items-center gap-3 border-t border-gray-700"
                >
                  <FaSignOutAlt className="text-red-400" />
                  <span>Sair</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container-custom py-12">
        <div className="max-w-6xl mx-auto">
          {/* Video de Boas-Vindas */}
          <div className="mb-12">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              {YOUTUBE_VIDEO_URL ? (
                <div className="aspect-video w-full rounded-lg overflow-hidden">
                  <iframe
                    src={getYoutubeEmbedUrl(YOUTUBE_VIDEO_URL)}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <div className="aspect-video w-full rounded-lg bg-gray-900/50 border-2 border-dashed border-gray-700 flex items-center justify-center">
                  <div className="text-center p-8">
                    <p className="text-gray-400">
                      Configure o link do YouTube na constante <code className="text-[#4ADE80] bg-gray-900 px-2 py-1 rounded">YOUTUBE_VIDEO_URL</code> no código.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Ferramentas Principais */}
          <div className="mb-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              <span className="text-white">Ferramentas </span>
              <span className="text-gradient">Principais</span>
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              {/* Card 1: Central de Recursos */}
              <a
                href="https://lily-sawfish-f3c.notion.site/DevHub-Central-Completa-de-Recursos-138a03efc53d80cb8554c2d7c202668c?pvs=74"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-[#4ADE80] transition-all hover:transform hover:scale-105 cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#4ADE80] to-green-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <FaBookOpen className="text-black text-xl" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Central de Recursos</h3>
                    </div>
                  </div>
                  <FaLink className="text-[#4ADE80] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-gray-300">
                  Acesso completo a milhares de recursos organizados, ferramentas de IA, APIs gratuitas, anotações de programação e muito mais.
                </p>
              </a>

              {/* Card 2: Comunidade */}
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700 border-dashed opacity-60 relative">
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-gray-700 text-gray-400 rounded-full text-xs font-semibold">
                    Em Breve
                  </span>
                </div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gray-700 flex items-center justify-center">
                      <FaUsers className="text-gray-500 text-xl" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-400">Comunidade</h3>
                    </div>
                  </div>
                </div>
                <p className="text-gray-400">
                  Conecte-se com outros desenvolvedores, compartilhe conhecimento, participe de discussões e colabore em projetos. Uma comunidade ativa e engajada para acelerar seu crescimento profissional.
                </p>
              </div>

              {/* Card 3: Seu Roadmap */}
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700 border-dashed opacity-60 relative">
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-gray-700 text-gray-400 rounded-full text-xs font-semibold">
                    Em Breve
                  </span>
                </div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gray-700 flex items-center justify-center">
                      <FaRoute className="text-gray-500 text-xl" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-400">Seu Roadmap</h3>
                    </div>
                  </div>
                </div>
                <p className="text-gray-400">
                  Acompanhe seu progresso de aprendizado com roadmaps personalizados, defina metas, complete desafios e visualize sua jornada de desenvolvimento de forma clara e organizada.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

