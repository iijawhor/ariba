const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-100 to-blue-400 text-blue-900">
      {/* Animated Spinner */}
      <div className="w-24 h-24 border-4 border-t-4 border-blue-600 border-t-blue-900 rounded-full animate-spin mb-6"></div>

      {/* Loading Text */}
      <h1 className="text-2xl font-bold mb-2 animate-pulse">Loading...</h1>
      <p className="text-blue-700">Preparing your dashboard. Please wait!</p>

      {/* Optional small progress dots */}
      <div className="flex space-x-2 mt-4">
        <span className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"></span>
        <span className="w-3 h-3 bg-blue-700 rounded-full animate-bounce delay-150"></span>
        <span className="w-3 h-3 bg-blue-800 rounded-full animate-bounce delay-300"></span>
      </div>
    </div>
  );
};

export default Loading;
