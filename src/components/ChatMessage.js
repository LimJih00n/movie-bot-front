import React from 'react';

function ChatMessage({ message, isLoading }) {
    const isBot = message.type === 'bot';

    return (
        <div className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}>
            <div
                className={`max-w-[50%] rounded-lg p-3 ${
                    isBot
                        ? 'bg-white text-gray-800'
                        : 'bg-indigo-500 text-white'
                }`}
            >
                {isLoading ? (
                    <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                ) : (
                    <p className="whitespace-pre-wrap">{message.text}</p>
                )}
            </div>
        </div>
    );
}

export default ChatMessage; 