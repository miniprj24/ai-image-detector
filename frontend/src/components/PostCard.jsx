import { Heart, MessageCircle } from 'lucide-react';
import { useState } from 'react';

export default function PostCard({ post }) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(100);

  const handleLike = () => {
    setLiked(!liked);
    setLikesCount(liked ? likesCount - 1 : likesCount + 1);
  };

  const label =
    post.label === 'AI-generated'
      ? 'AI Generated'
      : post.label === 'Human-made'
        ? 'Human Made'
        : 'Unknown';

  const badgeClass =
    post.label === 'AI-generated'
      ? 'bg-gradient-to-r from-purple-500 to-pink-500'
      : post.label === 'Human-made'
        ? 'bg-gradient-to-r from-green-500 to-emerald-500'
        : 'bg-gray-500';

  return (
    <div className="bg-slate-800/40 backdrop-blur-md border border-white/5 shadow-glass rounded-2xl overflow-hidden mb-8 transition-all duration-300 hover:bg-slate-800/50 hover:shadow-glass-sm group">
      <div className="relative p-4 pb-2">
        <div className="relative rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10 bg-slate-900/50">
          <img
            src={post.image}
            alt=""
            className="w-full aspect-square object-cover rounded-lg"
          />
        </div>
        <div
          className={`absolute top-6 right-6 ${badgeClass} text-white text-xs font-bold px-4 py-2 rounded-full shadow-[0_0_15px_rgba(0,0,0,0.5)] backdrop-blur-md bg-opacity-90 tracking-wide border border-white/10`}
        >
          {label}
        </div>
      </div>

      <div className="px-6 pb-6 pt-2">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={handleLike}
            className="p-2 text-slate-300 hover:text-red-500 hover:drop-shadow-[0_0_10px_rgba(239,68,68,0.5)] transition-all duration-300 group/like"
          >
            <Heart
              className={`w-7 h-7 transition-all duration-300 ${liked ? 'fill-red-500 text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)] scale-110' : 'group-hover/like:scale-110'}`}
            />
          </button>
          <button className="p-2 text-slate-300 hover:text-sky-500 hover:drop-shadow-[0_0_10px_rgba(56,189,248,0.5)] transition-all duration-300 group/comment">
            <MessageCircle className="w-7 h-7 group-hover/comment:scale-110 transition-transform duration-300" />
          </button>
        </div>

        <p className="text-sm font-bold text-white mb-2 ml-1">
          {likesCount.toLocaleString()} likes
        </p>

        {post.caption && (
          <p className="text-sm text-slate-300 ml-1 leading-relaxed">
            <span className="font-bold mr-2 text-white">{post.username}</span>
            {post.caption}
          </p>
        )}
      </div>
    </div>
  );
}
