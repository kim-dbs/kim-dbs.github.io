import React, { useEffect } from 'react';
import './App.css';
import activities from './data/activitiesData';

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

      {/* Rules Section */}
      <section id="rules" className="py-32 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="glassmorphism rounded-full px-6 py-3 mb-6 inline-block border border-blue-200">
              <span className="text-blue-600 font-medium">Community Rules</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
              스마트한 커뮤니티 운영
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="card-hover bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <div className="flex items-start space-x-6">
                <div className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl">👥</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">멤버 인증 시스템</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">닉네임(2글자) / 성별 / 나이(년생) / 회사지역 / 거주지역</p>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-600 italic">예시: 대파 남 88 양재 송파</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-hover bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <div className="flex items-start space-x-6">
                <div className="w-14 h-14 bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl">📅</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">참석 관리 시스템</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">주 1회 벙 참석이 기본 원칙</p>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-600 italic">Type A: 4주 4번 참석 / Type B: 4주 3번 + 대화 1000개</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-hover bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <div className="flex items-start space-x-6">
                <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl">⏰</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">스마트 지각 관리</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">지각 시 자동 계산되는 지각비와 페널티 시스템</p>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-600 italic">지각비: 1분당 0.04원 + 벌주 (당일 12시 전 사전 알림 필수)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-hover bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <div className="flex items-start space-x-6">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl">🛡️</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">멘토링 프로그램</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">신규 멤버의 빠른 적응을 위한 1:1 멘토링</p>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-600 italic">경험이 풍부한 기존 멤버가 신규 멤버를 서포트</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Types Section */}
      <section id="types" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="glassmorphism rounded-full px-6 py-3 mb-6 inline-block border border-green-200">
              <span className="text-green-600 font-medium">Preference Types</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
              음주 타입 분류 시스템
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              개인의 음주 선호도를 미리 파악하여 모두가 편안한 모임을 만들어갑니다
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto">
            <div className="card-hover bg-gradient-to-br from-red-50 to-pink-50 rounded-3xl p-8 border-2 border-red-200 max-w-sm">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-3xl">🍷</span>
                </div>
                <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-full text-lg font-bold mb-6 inline-block">
                  A (알콜)
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">음주 가능한 벙</h3>
                <p className="text-gray-600 leading-relaxed">알코올을 포함한 다양한 음료와 함께하는 모임</p>
              </div>
            </div>

            <div className="card-hover bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 border-2 border-blue-200 max-w-sm">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-3xl">☕</span>
                </div>
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-full text-lg font-bold mb-6 inline-block">
                  NH (논알콜)
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">음주하지 않는 벙</h3>
                <p className="text-gray-600 leading-relaxed">무알코올 음료만으로 즐기는 건강한 모임</p>
              </div>
            </div>

            <div className="card-hover bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 border-2 border-green-200 max-w-sm">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-3xl">❤️</span>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-full text-lg font-bold mb-6 inline-block">
                  J (노상관)
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">상관없이 즐기는 벙</h3>
                <p className="text-gray-600 leading-relaxed">음주 여부와 관계없이 함께 즐기는 자유로운 모임</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Members Section */}
      <section id="members" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="glassmorphism rounded-full px-6 py-3 mb-6 inline-block border border-amber-200">
              <span className="text-amber-600 font-medium">Our Members</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
              멤버 소개
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              꿀맛빌리지를 이끌어가는 특별한 멤버들을 만나보세요
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="card-hover bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl p-8 border-2 border-purple-200">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl font-bold">피</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">피캉</h3>
                <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 inline-block">
                  고려대 출신
                </div>
                <p className="text-gray-600 leading-relaxed mb-4">
                  숨겨진 맛집을 찾아내는 데 탁월한 능력을 가진 미식가. 특히 이모카세와 퓨전 요리에 대한 깊은 이해를 바탕으로 멤버들에게 새로운 맛의 경험을 선사합니다.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs font-medium">흑돼지</span>
                  <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs font-medium">억균</span>
                  <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs font-medium">이모카세전문</span>
                </div>
              </div>
            </div>

            <div className="card-hover bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl p-8 border-2 border-emerald-200">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl font-bold">항</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">항</h3>
                <div className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 inline-block">
                  항마카세
                </div>
                <p className="text-gray-600 leading-relaxed mb-4">
                  꿀맛빌리지의 정신적 지주이자 벙 기획의 달인. 오마카세, 한식부터 스테이크까지 다양한 장르를 넘나들며, 멤버들의 취향을 완벽하게 파악하여 최적의 벙을 기획합니다.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-xs font-medium">오마카세</span>
                  <span className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-xs font-medium">빤쮸토끼</span>
                  <span className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-xs font-medium">언니</span>
                </div>
              </div>
            </div>

            <div className="card-hover bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-8 border-2 border-orange-200">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-xl font-bold">두두</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">두두광</h3>
                <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 inline-block">
                  폭력배
                </div>
                <p className="text-gray-600 leading-relaxed mb-4">
                  벙 분위기를 한 순간에 끌어올리는 타고난 엔터테이너. 어떤 상황에서도 밝은 에너지로 멤버들을 평등하게 조지며, 처음 참여하는 멤버들도 금세 편안하게 만드는 특별한 능력을 가지고 있습니다.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-medium">짐승</span>
                  <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-medium">오랑캐</span>
                  <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-medium">두두광</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <p className="text-gray-600 text-lg mb-6">
              더 많은 멤버들이 함께하고 있습니다!
            </p>
            <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl p-8 max-w-2xl mx-auto">
              <p className="text-gray-700 font-medium mb-2">💡 멤버 등록 문의</p>
              <p className="text-gray-600 text-sm">
                꿀맛빌리지 멤버로 등록하고 소개되고 싶다면 언제든 연락해주세요!<br/>
                <span className="font-semibold text-amber-600">돼지최고~~~♡</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section id="activities" className="py-32 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="glassmorphism rounded-full px-6 py-3 mb-6 inline-block border border-indigo-200">
              <span className="text-indigo-600 font-medium">Recent Activities</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
              최근 벙 활동
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light mb-4">
              실제로 진행된 맛집 탐방 모임들을 확인해보세요
            </p>
            <p className="text-lg text-indigo-600 font-semibold">
              벙 칠 때, A: 알콜 / NH: 논알콜 / J: 노상관 좃대로 - <span className="text-pink-500">돼지최고~~~♡</span>
            </p>
          </div>

          {/* 벙 목록 */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {activities.map((activity, index) => (
              <div key={index} className={`activity-card card-hover ${activity.bgColor} rounded-3xl p-6 border-2 ${activity.borderColor}`}>
                <div className="flex justify-between items-start mb-4">
                  <div className={`bg-gradient-to-r ${activity.typeBgGradient} text-white px-4 py-2 rounded-full text-sm font-bold flex items-center`}>
                    <span className="mr-2">{activity.typeEmoji}</span>
                    {activity.type}
                  </div>
                  <div className="text-gray-600 text-sm font-medium">
                    {activity.date}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {activity.title}
                </h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600 text-sm">
                    <span className="mr-2">⏰</span>
                    {activity.time}
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <span className="mr-2">📍</span>
                    {activity.location}
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <span className="mr-2">👥</span>
                    {activity.attendeesCount}명 참석
                  </div>
                </div>
                
                <div className="bg-white/80 rounded-xl p-3 mb-4">
                  <div className="text-gray-700 text-sm">
                    <strong className="text-indigo-600">참석자:</strong> {activity.attendees}
                  </div>
                </div>
                
                {activity.note && (
                  <div className={`${activity.noteBgColor} ${activity.noteBorderColor ? `border ${activity.noteBorderColor}` : ''} rounded-xl p-3 mb-4`}>
                    <div className={`${activity.noteTextColor} text-xs font-medium`}>📝 {activity.note}</div>
                  </div>
                )}
                
                {activity.menu && (
                  <div className={`${activity.menuBgColor} ${activity.menuBorderColor ? `border ${activity.menuBorderColor}` : ''} rounded-xl p-3 mb-4`}>
                    <div className={`${activity.menuTextColor} text-sm`}><strong>🍽️ 메뉴:</strong> {activity.menu}</div>
                  </div>
                )}
                
                <a href={activity.reviewLink} target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 inline-flex items-center w-full justify-center shadow-lg">
                  <span className="mr-2">🔗</span>
                  벙 장소 링크 보기
                </a>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="text-gray-600 text-lg">
              더 많은 벙 활동들이 꾸준히 진행되고 있습니다! 🍯<br/>
              <span className="font-bold text-pink-500">돼지최고~~~♡</span>
            </p>
          </div>
        </div>
      </section>

      {/* Join Section */}
      <section id="join" className="py-32 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="glassmorphism rounded-full px-6 py-3 mb-6 inline-block">
              <span className="text-amber-400 font-medium">Join Us</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
              참여 방법
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light">
              투명하고 체계적인 시스템으로 관리되는 프리미엄 커뮤니티
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card-hover glassmorphism rounded-3xl p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">👥</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-3">멤버 정보</h3>
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">기존 멤버들의 정보와 모임 문화를 확인해보세요</p>
              <a href="https://docs.google.com/spreadsheets/d/1EB4BtSc1Mvv6vDTDnhZCY_C52gLx6guso2l7NBEaIbM/edit#gid=0" target="_blank" rel="noopener noreferrer" className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 inline-flex items-center">
                <span className="mr-2">🔗</span>
                확인하기
              </a>
            </div>

            <div className="card-hover glassmorphism rounded-3xl p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">📅</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-3">벙 신청 현황</h3>
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">다가오는 벙들과 참석 현황을 실시간으로 확인하세요</p>
              <a href="https://docs.google.com/spreadsheets/d/19-sCZnRbSVMADIZZa-TGK6NzLmiMjJzVLZSaVvMiI90/edit?gid=0#gid=0" target="_blank" rel="noopener noreferrer" className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 inline-flex items-center">
                <span className="mr-2">🔗</span>
                확인하기
              </a>
            </div>

            <div className="card-hover glassmorphism rounded-3xl p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">⭐</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-3">정산 시스템</h3>
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">투명한 자동 정산 시스템으로 공정한 비용 분담</p>
              <a href="https://docs.google.com/spreadsheets/d/1XSjcb8QbwByujOEN4Ska5wc-Mu7zNr34f54D2LHeWlU/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 inline-flex items-center">
                <span className="mr-2">🔗</span>
                확인하기
              </a>
            </div>

            <div className="card-hover glassmorphism rounded-3xl p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🛡️</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-3">상세 가이드</h3>
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">모임 참여를 위한 완벽한 가이드와 FAQ</p>
              <a href="https://docs.google.com/document/d/1kDah2wc9qJOZ-JmbPHSsvmOn-QzUbtXguvDtf6tppHk/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 inline-flex items-center">
                <span className="mr-2">🔗</span>
                확인하기
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-3xl p-8 mb-12 border border-amber-500/30">
            <h3 className="text-2xl font-bold text-white mb-4">안녕하세요 환영합니다! 🍯</h3>
            <p className="text-lg text-gray-300 leading-relaxed">
              꿀맛빌리지에 오신걸 환영합니다.<br/>
              맛있는 것 먹고, 많은 것을 보고, 많은 재미난 일들 가득하세요!
            </p>
          </div>
          
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center">
              <span className="text-2xl">🍯</span>
            </div>
            <span className="text-2xl font-bold text-white">꿀맛빌리지</span>
          </div>
          <p className="text-gray-400 mb-3 text-lg">
            © 2024 꿀맛빌리지. 맛있는 것 먹고, 좋은 것만 보고, 즐거운 일만 가득하세요!
          </p>
          <p className="text-gray-500 flex items-center justify-center text-lg">
            <span className="text-red-400 mr-2">❤️</span>
            <span className="font-bold text-pink-400">돼지최고~~~♡</span>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App; 