import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';

const HomePage = () => {
    const navigate = useNavigate();
    const { isAuthenticated, user } = useAuth();

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            
            <main className="container mx-auto px-4 py-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        AI 영화 추천 챗봇
                    </h1>
                    <p className="text-xl text-gray-600">
                        당신의 취향에 맞는 영화를 찾아드립니다
                    </p>
                    {isAuthenticated && (
                        <p className="text-lg text-indigo-600 mt-2">
                            안녕하세요, {user?.name}님! 개인화된 추천을 받아보세요.
                        </p>
                    )}
                </div>

                <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
                    <h2 className="text-2xl font-semibold mb-4">
                        {isAuthenticated ? '개인화된 추천 받기' : '시작하기'}
                    </h2>
                    <p className="text-gray-600 mb-6">
                        {isAuthenticated 
                            ? '이전 대화 기록과 선택한 영화를 바탕으로 더 정확한 추천을 받아보세요.'
                            : '간단한 대화를 통해 당신의 취향을 파악하고, 그에 맞는 영화를 추천해드립니다.'
                        }
                    </p>
                    
                    <div className="space-y-4">
                        <button
                            onClick={() => navigate('/chat')}
                            className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                            {isAuthenticated ? '개인화 추천 시작하기' : '대화 시작하기'}
                        </button>
                        
                        {!isAuthenticated && (
                            <div className="text-center py-4">
                                <p className="text-indigo-600 font-medium">
                                    로그인하여 개인화된 추천을 받아보세요
                                </p>
                                <p className="text-sm text-gray-500 mt-1">
                                    이전 대화 기록과 선택한 영화를 바탕으로 더 정확한 추천을 제공합니다
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-3">🎬 다양한 장르</h3>
                        <p className="text-gray-600">
                            액션, 로맨스, 코미디 등 다양한 장르의 영화를 추천해드립니다.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-3">🤖 AI 분석</h3>
                        <p className="text-gray-600">
                            AI가 당신의 취향을 분석하여 최적의 영화를 찾아드립니다.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-3">
                            {isAuthenticated ? '💡 개인화 추천' : '💡 맞춤 추천'}
                        </h3>
                        <p className="text-gray-600">
                            {isAuthenticated 
                                ? '이전 대화 기록과 선택한 영화를 바탕으로 개인화된 추천을 제공합니다.'
                                : '기분, 선호도, 키워드를 기반으로 맞춤형 영화를 추천합니다.'
                            }
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default HomePage; 