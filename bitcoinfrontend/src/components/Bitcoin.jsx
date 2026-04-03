import React, { useState } from "react";

const Bitcoin = () => {
  // Backend-required keys (DO NOT CHANGE)
  const [inputs, setInputs] = useState({
    price: ""
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/bitcoin/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs),
      });

      if (!response.ok) {
        throw new Error(`Server Error: ${response.status}`);
      }

      const data = await response.json();

      setResult({
        currentPrice: data.current_price,
        predictedPrice: data.predicted_price,
        priceChange: data.price_change,
        priceChangePercent: data.price_change_percent,
        timeframe: data.prediction_timeframe
      });

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* BTC particles background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-orange-400 rounded-full animate-ping delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-yellow-300 rounded-full animate-bounce delay-2000"></div>
        <div className="absolute bottom-20 right-1/3 w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></div>
      </div>
      

        {/* Header with glow */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-xl font-bold text-black">₿</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 bg-clip-text text-transparent drop-shadow-2xl">
              BTC Predictor
            </h1>
          </div>
          <p className="text-gray-400 text-lg font-medium">
            AI-powered Bitcoin price forecast • Next 2 minutes
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="relative group">
            <label className="block text-white font-bold mb-3 text-xl tracking-wide">
              Current BTC Price
            </label>
            <span className="block text-gray-500 text-sm mb-4 font-medium">
              Enter live USD price for 2-min prediction
            </span>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-400 font-bold text-lg">$</span>
              <input
                type="number"
                name="price"
                value={inputs.price}
                onChange={handleInputChange}
                step="0.01"
                required
                placeholder="65000.00"
                className="w-full bg-gray-800/50 border border-gray-600 hover:border-yellow-500 focus:border-yellow-400 rounded-2xl px-12 py-6 text-2xl font-bold text-white placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-yellow-500/20 transition-all duration-300 shadow-lg hover:shadow-xl"
              />
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <button
              type="submit"
              disabled={loading}
              className="group relative bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-600 hover:from-yellow-400 hover:via-orange-400 hover:to-yellow-500 disabled:from-gray-600 disabled:to-gray-700 text-black font-black py-6 px-12 rounded-2xl text-xl transition-all duration-300 shadow-2xl hover:shadow-3xl hover:-translate-y-1 disabled:shadow-lg disabled:cursor-not-allowed overflow-hidden"
            >
              <span className="relative z-10">
                {loading ? (
                  <>
                    <span className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin mr-2 inline-block"></span>
                    Computing...
                  </>
                ) : (
                  "⚡ PREDICT NOW"
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
            </button>
          </div>
        </form>

        {loading && (
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 text-yellow-400">
              <div className="w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-xl font-semibold">Analyzing blockchain patterns...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-12 p-8 bg-red-900/30 border border-red-500/50 rounded-2xl backdrop-blur-sm text-center">
            <p className="text-red-300 text-lg font-medium">{error}</p>
          </div>
        )}

        {result && !loading && (
          <div className="mt-12 p-10 bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-yellow-500/20 rounded-3xl shadow-2xl">
            <h2 className="text-3xl font-black text-center mb-8 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent drop-shadow-lg">
              🚀 Prediction Results
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="group bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 rounded-2xl p-8 hover:border-yellow-400 transition-all duration-300 hover:shadow-2xl">
                <p className="text-gray-400 text-sm uppercase tracking-wider mb-2 font-bold">Current Price</p>
                <p className="text-4xl font-black text-white">
                  ${result.currentPrice.toLocaleString()}
                </p>
              </div>
              
              <div className="group bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 rounded-2xl p-8 hover:border-yellow-400 transition-all duration-300 hover:shadow-2xl">
                <p className="text-gray-400 text-sm uppercase tracking-wider mb-2 font-bold">Predicted (2min)</p>
<p className={`text-3xl font-black ${result.predictedPrice > result.currentPrice ? 'text-green-400' : 'text-orange-400'}`}>
                  ${result.predictedPrice.toLocaleString()}
                </p>
              </div>
              
              <div className="lg:col-span-2 group bg-gradient-to-r from-gray-800/50 to-transparent backdrop-blur-sm border border-yellow-500/30 rounded-2xl p-8 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-2xl">
                    <span className={`text-2xl font-bold ${result.priceChange >= 0 ? 'text-black' : 'text-white'}`}>
                      {result.priceChange >= 0 ? '📈' : '📉'}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-400 uppercase tracking-wider mb-2 font-bold">Expected Change</p>
                    <p className={`text-3xl lg:text-4xl font-black ${result.priceChange >= 0 ? "text-green-400" : "text-red-400"}`}>
                      {result.priceChange >= 0 ? "+" : ""}${Math.abs(result.priceChange).toLocaleString()} 
                      <span className="text-xl">({result.priceChangePercent >= 0 ? "+" : ""}{result.priceChangePercent.toFixed(2)}%)</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
  );
};

export default Bitcoin;

