import React, { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() => {
    // 스크롤 시 네비게이션 배경 변경
    const handleScroll = () => {
      const navbar = document.getElementById('navbar');
      if (window.scrollY > 100) {
        navbar.classList.add('glassmorphism');
      } else {
        navbar.classList.remove('glassmorphism');
      }
    };

    window.addEventListener('scroll', handleScroll);

    // 부드러운 스크롤
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({behavior: 'smooth'});
  };

  return (
    <div className="bg-gray-50">
      {/* Navigation */}
      <nav id="navbar" className="fixed top-0 w-full z-50 transition-all duration-500">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">🍯</span>
              </div>
              <span className="text-2xl font-bold text-gradient">꿀맛빌리지</span>
            </div>
            <div className="hidden md:flex items-center space-x-10">
              <a href="#about" className="text-white/90 hover:text-white font-medium transition-all duration-300">소개</a>
              <a href="#rules" className="text-white/90 hover:text-white font-medium transition-all duration-300">규칙</a>
              <a href="#types" className="text-white/90 hover:text-white font-medium transition-all duration-300">타입</a>
              <a href="#members" className="text-white/90 hover:text-white font-medium transition-all duration-300">멤버</a>
              <a href="#activities" className="text-white/90 hover:text-white font-medium transition-all duration-300">활동</a>
              <a href="#join" className="text-white/90 hover:text-white font-medium transition-all duration-300">참여</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center hero-bg overflow-hidden">
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="glassmorphism rounded-3xl p-4 mb-8 inline-block">
            <span className="text-white/90 font-medium">맛집 탐방 커뮤니티 플랫폼</span>
          </div>
          
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-black text-white mb-6 leading-none">
            꿀맛빌리지
          </h1>
          
          <p className="text-2xl md:text-3xl text-white/90 font-light mb-4">
            맛있는 만남, 즐거운 시간
          </p>
          
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed mb-12">
            서울/수도권 최고의 맛집들을 함께 탐방하며<br/>
            특별한 인연을 만들어가는 프리미엄 푸드 커뮤니티
          </p>
          
          <button 
            onClick={() => scrollToSection('about')} 
            className="btn-gradient text-white px-10 py-5 rounded-full text-lg font-semibold hover:scale-105 transition-all duration-300 inline-flex items-center space-x-3"
          >
            <span>자세히 알아보기</span>
            <span className="text-xl">⬇️</span>
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="text-center mb-20">
            <div className="glassmorphism rounded-full px-6 py-3 mb-6 inline-block border border-amber-200">
              <span className="text-amber-600 font-medium">About Us</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
              꿀맛빌리지란?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              음식을 통해 사람들을 연결하는 혁신적인 소셜 플랫폼
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="card-hover bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-white text-2xl">📍</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">프리미엄 맛집 큐레이션</h3>
              <p className="text-gray-600 leading-relaxed">서울/수도권의 엄선된 맛집들을 데이터 기반으로 추천하고 함께 탐방합니다</p>
            </div>

            <div className="card-hover bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-white text-2xl">👥</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">스마트 매칭 시스템</h3>
              <p className="text-gray-600 leading-relaxed">다양한 직업군의 사람들과의 의미있는 만남을 AI가 도와드립니다</p>
            </div>

            <div className="card-hover bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-white text-2xl">📈</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">체계적인 커뮤니티</h3>
              <p className="text-gray-600 leading-relaxed">주 1회 정기 모임과 멘토링 시스템으로 지속가능한 관계를 만들어갑니다</p>
            </div>
          </div>
        </div>
      </section>

      {/* 나머지 섹션들은 다음 파일에서 계속... */}
      <div className="text-center py-20 bg-gray-100">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">🚧 개발 진행 중 🚧</h2>
        <p className="text-gray-600">나머지 섹션들을 React 컴포넌트로 변환 중입니다...</p>
      </div>
    </div>
  );
}

export default App; 