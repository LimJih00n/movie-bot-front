import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    // axios 기본 설정
    const setupAxios = (authToken) => {
        if (authToken) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    };

    // 초기 로드 시 토큰 검증
    useEffect(() => {
        const initializeAuth = async () => {
            if (token) {
                setupAxios(token);
                try {
                    const response = await axios.get('http://localhost:4000/auth/verify');
                    if (response.data.valid) {
                        const profileResponse = await axios.get('http://localhost:4000/auth/profile');
                        setUser(profileResponse.data.user);
                    } else {
                        logout();
                    }
                } catch (error) {
                    console.error('Token verification failed:', error);
                    logout();
                }
            }
            setLoading(false);
        };

        initializeAuth();
    }, [token, logout]);

    // 로그인
    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:4000/auth/login', {
                email,
                password
            });

            const { user: userData, token: authToken } = response.data;
            
            setUser(userData);
            setToken(authToken);
            localStorage.setItem('token', authToken);
            setupAxios(authToken);

            return { success: true };
        } catch (error) {
            console.error('Login error:', error);
            return { 
                success: false, 
                error: error.response?.data?.error || '로그인에 실패했습니다.' 
            };
        }
    };

    // 회원가입
    const register = async (email, password, name) => {
        try {
            const response = await axios.post('http://localhost:4000/auth/register', {
                email,
                password,
                name
            });

            const { user: userData, token: authToken } = response.data;
            
            setUser(userData);
            setToken(authToken);
            localStorage.setItem('token', authToken);
            setupAxios(authToken);

            return { success: true };
        } catch (error) {
            console.error('Registration error:', error);
            return { 
                success: false, 
                error: error.response?.data?.error || '회원가입에 실패했습니다.' 
            };
        }
    };

    // 로그아웃
    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        setupAxios(null);
    };

    // 토큰 갱신
    const refreshToken = async () => {
        if (!token) return false;
        
        try {
            const response = await axios.get('http://localhost:4000/auth/verify');
            return response.data.valid;
        } catch (error) {
            logout();
            return false;
        }
    };

    const value = {
        user,
        token,
        loading,
        login,
        register,
        logout,
        refreshToken,
        isAuthenticated: !!user
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}; 