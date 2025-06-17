import React from 'react';

function LoginPromptModal({ isOpen, onClose, onLogin, onRegister }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                <div className="text-center">
                    {/* 아이콘 */}
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 mb-4">
                        <span className="text-2xl">🎬</span>
                    </div>
                    
                    {/* 제목 */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        더 나은 추천을 받아보세요!
                    </h3>
                    
                    {/* 설명 */}
                    <p className="text-gray-600 mb-6">
                        로그인하시면 이전 대화 기록과 선택한 영화를 바탕으로 
                        더 정확하고 개인화된 영화 추천을 받을 수 있습니다.
                    </p>
                    
                    {/* 혜택 목록 */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                        <h4 className="font-medium text-gray-900 mb-2">로그인 혜택:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li className="flex items-center">
                                <span className="text-indigo-500 mr-2">✓</span>
                                개인화된 영화 추천
                            </li>
                            <li className="flex items-center">
                                <span className="text-indigo-500 mr-2">✓</span>
                                선택한 영화 히스토리 저장
                            </li>
                            <li className="flex items-center">
                                <span className="text-indigo-500 mr-2">✓</span>
                                추천받은 영화 목록 관리
                            </li>
                        </ul>
                    </div>
                    
                    {/* 버튼들 */}
                    <div className="flex space-x-3">
                        <button
                            onClick={onRegister}
                            className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
                        >
                            회원가입
                        </button>
                        <button
                            onClick={onLogin}
                            className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
                        >
                            로그인
                        </button>
                    </div>
                    
                    {/* 닫기 버튼 */}
                    <button
                        onClick={onClose}
                        className="mt-4 text-gray-500 hover:text-gray-700 text-sm"
                    >
                        나중에 하기
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LoginPromptModal; 