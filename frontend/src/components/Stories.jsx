const stories = [
  { id: 1, username: 'Your story', isUser: true },
  { id: 2, username: 'alex_photos' },
  { id: 3, username: 'travel_daily' },
  { id: 4, username: 'foodie_life' },
  { id: 5, username: 'tech_news' },
  { id: 6, username: 'design_hub' },
  { id: 7, username: 'nature_shots' },
  { id: 8, username: 'art_world' },
  { id: 9, username: 'drant' },
  { id: 10, username: 'traverse' },
  { id: 11, username: 'cultivate' },
  { id: 12, username: 'herb' },
  { id: 13, username: 'poseidon' },
  { id: 14, username: 'putin' },
  { id: 15, username: 'dart' },
  { id: 16, username: 'ignoo' },
  { id: 17, username: 'drake' },
  { id: 18, username: 'eminem' },
  { id: 19, username: 'anyway' },
  { id: 20, username: 'tupac' }
];

export default function Stories() {
  return (
    <div className="bg-slate-800/40 backdrop-blur-md border border-white/5 shadow-glass rounded-2xl p-6 mb-8">
      <div className="flex gap-5 overflow-x-auto scrollbar-hide py-2 px-1">
        {stories.map((story) => (
          <button
            key={story.id}
            className="flex flex-col items-center gap-2 flex-shrink-0 group"
          >
            <div className={`w-[72px] h-[72px] rounded-full p-[3px] transition-all duration-300 group-hover:scale-105 ${story.isUser
                ? 'bg-slate-700'
                : 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 shadow-[0_0_10px_rgba(236,72,153,0.3)]'
              }`}>
              <div className="w-full h-full rounded-full bg-slate-900 p-[3px] border-2 border-transparent relative overflow-hidden">
                <div className="w-full h-full rounded-full bg-slate-800 overflow-hidden">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${story.username}`}
                    alt={story.username}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              </div>
            </div>
            <span className="text-xs font-medium text-slate-400 max-w-[70px] truncate group-hover:text-white transition-colors">
              {story.username}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
