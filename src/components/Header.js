import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header className="bg-indigo-600 text-white p-4">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
                <Link to="/" className="text-xl font-bold hover:text-indigo-200 transition-colors">
                    🎬 AI 영화 추천 챗봇
                </Link>
                
                <div className="flex items-center space-x-4">
                    {isAuthenticated ? (
                        <>
                            <span className="text-sm text-indigo-200">
                                안녕하세요, {user?.name}님!
                            </span>
                            <Link
                                to="/profile"
                                className="text-sm hover:text-indigo-200 transition-colors"
                            >
                                프로필
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="text-sm hover:text-indigo-200 transition-colors"
                            >
                                로그아웃
                            </button>
                        </>
                    ) : (
                        <>
                            {location.pathname !== '/login' && (
                                <Link
                                    to="/login"
                                    className="text-sm hover:text-indigo-200 transition-colors"
                                >
                                    로그인
                                </Link>
                            )}
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header; 