import React from 'react';

function MovieRecommendation({ recommendations, onSelectMovie }) {
    if (!recommendations) return null;

    return (
        <div className="mt-4 p-4 bg-white rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">추천 영화</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recommendations.map((movie, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                        <div className="flex gap-4">
                            {/* 포스터 이미지 */}
                            <div className="flex-shrink-0">
                                <img
                                    src={movie.poster}
                                    alt={`${movie.title} 포스터`}
                                    className="w-24 h-36 object-cover rounded-lg shadow-md"
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/96x144/cccccc/666666?text=No+Image';
                                    }}
                                />
                            </div>
                            
                            {/* 영화 정보 */}
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center min-w-0">
                                        <h3 className="text-lg font-semibold truncate">{movie.title}</h3>
                                        {movie.isPersonalized && (
                                            <span className="ml-2 bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full flex-shrink-0">
                                                🎯 개인화
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center bg-yellow-100 px-2 py-1 rounded flex-shrink-0">
                                        <span className="text-yellow-500 text-lg">★</span>
                                        <span className="ml-1 font-semibold">{movie.rating}</span>
                                    </div>
                                </div>
                                
                                <div className="mb-3">
                                    <p className="text-sm text-gray-500 mb-1">
                                        {movie.year} • {movie.director}
                                    </p>
                                    <p className="text-sm text-gray-600 line-clamp-2">
                                        {movie.description}
                                    </p>
                                </div>
                                
                                <div className="mb-4">
                                    <p className="text-gray-600 text-sm mb-2">추천 이유:</p>
                                    <div className="bg-gray-50 p-3 rounded text-sm max-h-24 overflow-y-auto">
                                        <p className="text-gray-700">{movie.reason}</p>
                                    </div>
                                </div>
                                
                                <button
                                    onClick={() => onSelectMovie(movie)}
                                    className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors text-sm font-medium"
                                >
                                    이 영화 선택하기
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MovieRecommendation; 