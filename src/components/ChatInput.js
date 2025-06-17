import React, { useState } from 'react';

function ChatInput({ onSendMessage, disabled, onRestart }) {
    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim() && !disabled) {
            onSendMessage(input);
            setInput(''); // 입력창 초기화
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="border-t p-4 bg-white">
            <div className="flex space-x-4">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="메시지를 입력하세요..."
                    className={`flex-1 p-2 border rounded-lg focus:outline-none focus:border-blue-500 ${
                        disabled ? 'bg-gray-100 cursor-not-allowed' : ''
                    }`}
                    disabled={disabled}
                />
                {disabled ? (
                    <button
                        type="button"
                        onClick={onRestart}
                        className="bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-600 transition-colors"
                    >
                        다시 추천받기
                    </button>
                ) : (
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        전송
                    </button>
                )}
            </div>
        </form>
    );
}

export default ChatInput; 