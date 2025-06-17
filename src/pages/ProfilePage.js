import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const ProfilePage = () => {
    const { user, logout } = useAuth();
    const [selectedMovies, setSelectedMovies] = useState([]);
    const [recommendedMovies, setRecommendedMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('selected');

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            setLoading(true);
            
            // 선택한 영화 목록 가져오기
            const selectedResponse = await axios.get('http://localhost:4000/chat/selected-movies');
            setSelectedMovies(selectedResponse.data);

            // 추천받은 영화 목록 가져오기
            const recommendedResponse = await axios.get('http://localhost:4000/chat/recommended-movies');
            setRecommendedMovies(recommendedResponse.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleLogout = () => {
        logout();
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                {/* 프로필 헤더 */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                {user?.name}님의 프로필
                            </h1>
                            <p className="text-gray-600">{user?.email}</p>
                            <p className="text-sm text-gray-500">
                                가입일: {formatDate(user?.createdAt)}
                            </p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                        >
                            로그아웃
                        </button>
                    </div>
                </div>

                {/* 탭 네비게이션 */}
                <div className="bg-white rounded-lg shadow-md mb-8">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8 px-6">
                            <button
                                onClick={() => setActiveTab('selected')}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                    activeTab === 'selected'
                                        ? 'border-indigo-500 text-indigo-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                선택한 영화 ({selectedMovies.length})
                            </button>
                            <button
                                onClick={() => setActiveTab('recommended')}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                    activeTab === 'recommended'
                                        ? 'border-indigo-500 text-indigo-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                추천받은 영화 ({recommendedMovies.length})
                            </button>
                        </nav>
                    </div>

                    {/* 탭 컨텐츠 */}
                    <div className="p-6">
                        {activeTab === 'selected' && (
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-4">
                                    선택한 영화 목록
                                </h3>
                                {selectedMovies.length === 0 ? (
                                    <p className="text-gray-500 text-center py-8">
                                        아직 선택한 영화가 없습니다.
                                    </p>
                                ) : (
                                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                        {selectedMovies.map((movie, index) => (
                                            <div
                                                key={`${movie.movieId}-${index}`}
                                                className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                                            >
                                                <h4 className="font-medium text-gray-900 mb-2">
                                                    {movie.title}
                                                </h4>
                                                <p className="text-sm text-gray-500">
                                                    선택일: {formatDate(movie.selectedAt)}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'recommended' && (
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-4">
                                    추천받은 영화 목록
                                </h3>
                                {recommendedMovies.length === 0 ? (
                                    <p className="text-gray-500 text-center py-8">
                                        아직 추천받은 영화가 없습니다.
                                    </p>
                                ) : (
                                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                        {recommendedMovies.map((movie, index) => (
                                            <div
                                                key={`${movie.movieId}-${index}`}
                                                className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                                            >
                                                <h4 className="font-medium text-gray-900 mb-2">
                                                    {movie.title}
                                                </h4>
                                                {movie.reason && (
                                                    <p className="text-sm text-gray-600 mb-2 line-clamp-3">
                                                        {movie.reason}
                                                    </p>
                                                )}
                                                <p className="text-sm text-gray-500">
                                                    추천일: {formatDate(movie.recommendedAt)}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage; 