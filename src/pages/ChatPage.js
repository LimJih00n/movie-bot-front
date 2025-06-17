import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import ChatMessage from '../components/ChatMessage';
import MovieRecommendation from '../components/MovieRecommendation';
import ChatInput from '../components/ChatInput';

const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [recommendations, setRecommendations] = useState(null);
    const [sessionId, setSessionId] = useState(null);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isPersonalized, setIsPersonalized] = useState(false);
    const messagesEndRef = useRef(null);
    const { isAuthenticated, user } = useAuth();

    // 자동 스크롤 함수
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // 메시지가 추가될 때마다 스크롤
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        // 세션 ID 생성
        const newSessionId = Math.random().toString(36).substring(7);
        setSessionId(newSessionId);
        
        // 초기 메시지 설정
        const initialMessage = isAuthenticated 
            ? `안녕하세요, ${user?.name}님! 오늘 기분이 어떠신가요?`
            : '안녕하세요! 오늘 기분이 어떠신가요?';
            
        setMessages([
            {
                type: 'bot',
                text: initialMessage
            }
        ]);
    }, [isAuthenticated, user]);

    const sendMessage = async (text) => {
        if (!text.trim()) return;

        // 사용자 메시지 추가
        const userMessage = { type: 'user', text };
        setMessages(prev => [...prev, userMessage]);

        // 로딩 상태 시작
        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:4000/chat', {
                message: text,
                sessionId
            });

            // 봇 응답 추가
            const botMessage = { type: 'bot', text: response.data.text };
            setMessages(prev => [...prev, botMessage]);

            // 추천 영화가 있으면 추가
            if (response.data.recommendations) {
                setRecommendations(response.data.recommendations);
                setIsPersonalized(response.data.isPersonalized || false);
            }

            // 로딩 상태 종료 (메시지가 추가된 후에)
            setTimeout(() => {
                setIsLoading(false);
            }, 300);

        } catch (error) {
            console.error('Error:', error);
            setMessages(prev => [...prev, {
                type: 'bot',
                text: '죄송합니다. 오류가 발생했습니다.'
            }]);
            setIsLoading(false);
        }
    };

    const handleSelectMovie = async (movie) => {
        setSelectedMovie(movie);
        setMessages(prev => [...prev, {
            type: 'bot',
            text: `${movie.title}을(를) 선택하셨네요! 좋은 선택이에요. 다른 영화도 추천받고 싶으시다면 '다시 추천받기' 버튼을 눌러주세요.`
        }]);

        // 로그인된 사용자의 경우 영화 선택을 서버에 저장
        if (isAuthenticated) {
            try {
                await axios.post('http://localhost:4000/chat/select-movie', {
                    sessionId,
                    movie
                });
            } catch (error) {
                console.error('Error saving movie selection:', error);
            }
        }
    };

    const handleRestart = () => {
        // 새로운 세션 ID 생성
        const newSessionId = Math.random().toString(36).substring(7);
        setSessionId(newSessionId);
        
        // 상태 초기화
        const initialMessage = isAuthenticated 
            ? `안녕하세요, ${user?.name}님! 오늘 기분이 어떠신가요?`
            : '안녕하세요! 오늘 기분이 어떠신가요?';
            
        setMessages([
            {
                type: 'bot',
                text: initialMessage
            }
        ]);
        setRecommendations(null);
        setSelectedMovie(null);
        setIsPersonalized(false);
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <Header />
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                    <ChatMessage 
                        key={index} 
                        message={message} 
                        isLoading={isLoading && index === messages.length - 1 && message.type === 'bot'}
                    />
                ))}
                {isLoading && messages[messages.length - 1]?.type === 'user' && (
                    <ChatMessage 
                        message={{ type: 'bot', text: '' }} 
                        isLoading={true}
                    />
                )}
                {recommendations && !selectedMovie && (
                    <div>
                        {isPersonalized && (
                            <div className="bg-indigo-100 border border-indigo-300 text-indigo-800 px-4 py-2 rounded-lg mb-4">
                                <div className="flex items-center">
                                    <span className="text-indigo-600 mr-2">🎯</span>
                                    <span className="font-medium">개인화된 추천</span>
                                    <span className="text-sm ml-2">이전 대화와 선택한 영화를 바탕으로 추천드립니다</span>
                                </div>
                            </div>
                        )}
                        <MovieRecommendation 
                            recommendations={recommendations}
                            onSelectMovie={handleSelectMovie}
                        />
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <ChatInput 
                onSendMessage={sendMessage} 
                disabled={recommendations !== null}
                onRestart={handleRestart}
            />
        </div>
    );
};

export default ChatPage; 