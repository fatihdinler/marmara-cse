// /src/pages/HallOfFame.js

import React, { useState, useEffect } from 'react';
import { getHallOfFame, voteExcuse } from '../services/api';
import {
  Trophy,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Share2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const HallOfFame = () => {
  const [entries, setEntries] = useState([]);
  const [voting, setVoting]   = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadHall();
    verifyUserToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Token doğrula (geçersizse login’e at)
  const verifyUserToken = async () => {
    try {
      await getHallOfFame();
    } catch (err) {
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  // Hall of Fame listesi
  const loadHall = async () => {
    try {
      const res = await getHallOfFame();
      setEntries(res.data);
    } catch (err) {
      console.error('Hall of Fame yüklenemedi:', err);
    }
  };

  // Upvote / Downvote işlemi
  const handleVote = async (id, type) => {
    setVoting(true);
    try {
      await voteExcuse(id, type);
      await loadHall();
    } catch (err) {
      console.error('Oy verme hatası:', err);
    }
    setVoting(false);
  };

  const copyText = (text) => navigator.clipboard.writeText(text);

  const shareText = (text) => {
    if (navigator.share) {
      navigator.share({ title: 'Top Excuse', text });
    } else {
      copyText(text);
    }
  };

  return (
    <>
      {/* Navbar eklendi */}
      <Navbar />

      <div className="min-h-screen bg-gray-100">
        <div className="max-w-5xl mx-auto py-8 px-4">
          <div className="grid gap-6 md:grid-cols-2">
            {entries.map((exc) => (
              <div
                key={exc._id}
                className="bg-white rounded-xl shadow p-6 relative"
              >
                <div className="absolute top-4 right-4 text-gray-400 text-sm">
                  {new Date(exc.createdAt).toLocaleDateString()}
                </div>

                {/* Scenario ve Type Etiketi */}
                <div className="flex items-center mb-3">
                  <span className="text-2xl mr-2">
                    {exc.scenario === 'work'
                      ? '💼'
                      : exc.scenario === 'school'
                      ? '🎓'
                      : '🎉'}
                  </span>
                  <span className="uppercase text-xs font-semibold px-2 py-1 bg-gray-200 rounded">
                    {exc.type}
                  </span>
                </div>

                {/* Mazeret Metni */}
                <p className="text-gray-800 mb-2 leading-snug">
                  "{exc.text}"
                </p>

                {/* Oluşturan Kullanıcı Bilgisi */}
                <p className="text-sm text-gray-500 mb-4">
                  Created By: {exc.user?.name || 'Bilinmiyor'}
                </p>

                {/* Oy Butonları ve Kopyala/Paylaş */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleVote(exc._id, 'upvote')}
                      disabled={voting}
                      className="flex items-center space-x-1 hover:text-green-600 transition"
                    >
                      <ThumbsUp size={18} />
                      <span>{exc.upvotes}</span>
                    </button>
                    <button
                      onClick={() => handleVote(exc._id, 'downvote')}
                      disabled={voting}
                      className="flex items-center space-x-1 hover:text-red-600 transition"
                    >
                      <ThumbsDown size={18} />
                      <span>{exc.downvotes}</span>
                    </button>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => copyText(exc.text)}
                      className="hover:text-blue-600"
                    >
                      <Copy size={18} />
                    </button>
                    <button
                      onClick={() => shareText(exc.text)}
                      className="hover:text-purple-600"
                    >
                      <Share2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {entries.length === 0 && (
            <p className="text-center text-gray-500 mt-12">
              There is no public excuse yet.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default HallOfFame;
