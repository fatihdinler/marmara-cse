import React, { useState, useEffect } from 'react';
import {
  generateExcuse,
  surpriseMe,
  getOptions,
  fetchExcuses
} from '../services/api';
import {
  Sparkles,
  Copy,
  Share2,
  Heart,
  Zap,
  Clock,
  Users
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const [excuses, setExcuses] = useState([]);
  const [currentExcuse, setCurrentExcuse] = useState(null);
  const [scenario, setScenario] = useState('work');
  const [type, setType] = useState('believable');
  const [options, setOptions] = useState({ scenarios: [], types: [] });
  const [loading, setLoading] = useState(false);
  const [isPublic, setIsPublic] = useState(false);

  const navigate = useNavigate();

  // On mount, load excuses, options, and verify token
  useEffect(() => {
    loadExcuses();
    loadOptions();
    verifyUserToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Verify token; if invalid, logout
  const verifyUserToken = async () => {
    try {
      await fetchExcuses(); // simple request to check token validity
    } catch (err) {
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  // Fetch the user's excuses
  const loadExcuses = async () => {
    try {
      const res = await fetchExcuses();
      setExcuses(res.data);
    } catch (error) {
      console.error('Failed to load excuses:', error);
    }
  };

  // Fetch scenario and type options
  const loadOptions = async () => {
    try {
      const res = await getOptions();
      setOptions(res.data);
    } catch (error) {
      console.error('Failed to load options:', error);
    }
  };

  // When "Generate Excuse" is clicked
  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await generateExcuse({ scenario, type, isPublic });
      setCurrentExcuse(res.data);
      await loadExcuses();
    } catch (error) {
      console.error('Generate error:', error);
    }
    setLoading(false);
  };

  // When "Surprise Me!" is clicked
  const handleSurprise = async () => {
    setLoading(true);
    try {
      const res = await surpriseMe();
      setCurrentExcuse(res.data);
      await loadExcuses();
    } catch (error) {
      console.error('Surprise Me error:', error);
    }
    setLoading(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const shareExcuse = (text) => {
    if (navigator.share) {
      navigator.share({ title: 'My Excuse', text });
    } else {
      copyToClipboard(text);
    }
  };

  // Return an icon based on scenario
  const getScenarioIcon = (scenario) => {
    switch (scenario) {
      case 'work':
        return '💼';
      case 'school':
        return '🎓';
      case 'social':
        return '🎉';
      default:
        return '📝';
    }
  };

  // Return a gradient color based on type
  const getTypeColor = (type) => {
    switch (type) {
      case 'believable':
        return 'bg-gradient-to-r from-green-400 to-green-600';
      case 'funny':
        return 'bg-gradient-to-r from-yellow-400 to-orange-500';
      case 'dramatic':
        return 'bg-gradient-to-r from-purple-400 to-pink-600';
      case 'sarcastic':
        return 'bg-gradient-to-r from-gray-400 to-gray-600';
      case 'urgent':
        return 'bg-gradient-to-r from-red-500 to-red-700';
      default:
        return 'bg-gradient-to-r from-blue-400 to-blue-600';
    }
  };

  return (
    <>
      {/* Navbar is always rendered here */}
      <Navbar />

      {/* Main content area */}
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative max-w-7xl mx-auto px-4 py-16">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-6xl font-extrabold text-white mb-4 tracking-tight">
                EXCUSETOR
                <Sparkles
                  className="inline-block ml-4 text-yellow-400 animate-fade-in"
                  size={48}
                />
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Generate excuses for any situation. From believable to hilarious!
              </p>
            </div>

            {/* Generator Controls */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 mb-8 border border-white/20">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-white font-semibold mb-3">
                    Scenario
                  </label>
                  <select
                    value={scenario}
                    onChange={(e) => setScenario(e.target.value)}
                    className="w-full p-4 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:ring-4 focus:ring-purple-500/50 focus:border-purple-400 transition-all duration-300"
                  >
                    {options.scenarios.map((s) => (
                      <option key={s} value={s} className="text-gray-800">
                        {getScenarioIcon(s)}{' '}
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-3">
                    Style
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full p-4 rounded-XL bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:ring-4 focus:ring-purple-500/50 focus:border-purple-400 transition-all duration-300"
                  >
                    {options.types.map((t) => (
                      <option key={t} value={t} className="text-gray-800">
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center mb-6">
                <input
                  type="checkbox"
                  id="isPublic"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                  className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                />
                <label htmlFor="isPublic" className="ml-3 text-white">
                  Make this excuse public (for Hall of Fame)
                </label>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleGenerate}
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <Zap size={20} />
                  <span>
                    {loading ? 'Generating...' : 'Generate Excuse'}
                  </span>
                </button>

                <button
                  onClick={handleSurprise}
                  disabled={loading}
                  className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <Sparkles size={20} />
                  <span>Surprise Me!</span>
                </button>
              </div>
            </div>

            {/* Display Generated Excuse */}
            {currentExcuse && (
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 mb-8 border border-white/20 animate-fade-in">
                <div className="text-center">
                  <div className="text-6xl mb-4">
                    {getScenarioIcon(currentExcuse.scenario)}
                  </div>
                  <span
                    className={`inline-block px-4 py-2 rounded-full text-white font-semibold mb-4 ${getTypeColor(
                      currentExcuse.type
                    )}`}
                  >
                    {currentExcuse.type.charAt(0).toUpperCase() +
                      currentExcuse.type.slice(1)}
                  </span>
                  <p className="text-2xl text-white leading-relaxed mb-6 font-medium">
                    "{currentExcuse.text}"
                  </p>
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={() => copyToClipboard(currentExcuse.text)}
                      className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105"
                    >
                      <Copy size={20} />
                      <span>Copy</span>
                    </button>
                    <button
                      onClick={() => shareExcuse(currentExcuse.text)}
                      className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105"
                    >
                      <Share2 size={20} />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20">
                <Heart className="mx-auto mb-4 text-red-400" size={32} />
                <div className="text-3xl font-bold text-white mb-2">
                  {excuses.length}
                </div>
                <div className="text-gray-300">Total Excuses</div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20">
                <Clock className="mx-auto mb-4 text-blue-400" size={32} />
                <div className="text-3xl font-bold text-white mb-2">2s</div>
                <div className="text-gray-300">Average Creation Time</div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20">
                <Users className="mx-auto mb-4 text-green-400" size={32} />
                <div className="text-3xl font-bold text-white mb-2">∞</div>
                <div className="text-gray-300">Probability</div>
              </div>
            </div>

            {/* My Recent Excuses */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                <Clock className="mr-3" size={32} />
                My Recent Excuses
              </h2>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {excuses.slice(0, 10).map((excuse) => (
                  <div
                    key={excuse._id}
                    className="bg-white/10 rounded-xl p-4 border border-white/10 hover:bg-white/20 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="text-2xl">
                            {getScenarioIcon(excuse.scenario)}
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getTypeColor(
                              excuse.type
                            )}`}
                          >
                            {excuse.type}
                          </span>
                          <span className="text-gray-400 text-sm">
                            {new Date(excuse.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-white leading-relaxed">
                          {excuse.text}
                        </p>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <button
                          onClick={() => copyToClipboard(excuse.text)}
                          className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all duration-300"
                        >
                          <Copy size={16} className="text-white" />
                        </button>
                        <button
                          onClick={() => shareExcuse(excuse.text)}
                          className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all duration-300"
                        >
                          <Share2 size={16} className="text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
