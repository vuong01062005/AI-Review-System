import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Star, 
  MessageSquare, 
  Calendar, 
  ChevronRight, 
  MoreHorizontal,
  ThumbsUp,
  ThumbsDown,
  Quote,
  Hotel,
  CornerDownRight,
  ExternalLink,
  ChevronLeft,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

const reviewsData = [
  { 
    id: 1, 
    user: 'Jonathan Smith', 
    hotel: 'Ocean Breeze Resort', 
    content: "Our stay at Ocean Breeze was nothing short of perfection. The staff went above and beyond to ensure our comfort, and the sunset views from the balcony were worth every penny. Will definitely return!",
    date: 'Oct 24, 2023',
    rating: 5,
    sentiment: 'Positive',
    score: 0.98,
    tags: ['Staff', 'View', 'Comfort'],
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jonathan'
  },
  { 
    id: 2, 
    user: 'Sarah Miller', 
    hotel: 'Grand Plaza Hotel', 
    content: "The location is fantastic for business meetings, but the room itself was a bit dated. Carpets could use a deep clean or replacement. Service was professional but a bit cold.",
    date: 'Oct 23, 2023',
    rating: 3,
    sentiment: 'Neutral',
    score: 0.54,
    tags: ['Location', 'Cleanliness', 'Service'],
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
  },
  { 
    id: 3, 
    user: 'Kevin Chen', 
    hotel: 'Pineview Lodge', 
    content: "Terrible experience with the plumbing. No hot water for two days and the front desk didn't seem to care. The hiking trails nearby were the only saving grace of this trip.",
    date: 'Oct 22, 2023',
    rating: 1,
    sentiment: 'Negative',
    score: 0.12,
    tags: ['Plumbing', 'Service', 'Facilities'],
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kevin'
  },
  { 
    id: 4, 
    user: 'Elena Rodriguez', 
    hotel: 'Ocean Breeze Resort', 
    content: "Excellent breakfast buffet with local specialties. The pool area gets quite crowded on weekends, so arrive early for a lounge chair.",
    date: 'Oct 22, 2023',
    rating: 4,
    sentiment: 'Positive',
    score: 0.82,
    tags: ['Food', 'Pool'],
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena'
  },
];

const sentimentLabels = {
  Positive: 'Tích cực',
  Neutral: 'Trung tính',
  Negative: 'Tiêu cực',
};

const ReviewExplorer: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReview, setSelectedReview] = useState<typeof reviewsData[0] | null>(null);

  return (
    <div className="space-y-6 max-w-7xl mx-auto h-full flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-white tracking-tight">Khám phá đánh giá</h1>
          <p className="text-slate-400 mt-1">Tìm kiếm và lọc tương tác toàn bộ cơ sở dữ liệu đánh giá của bạn.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-800 rounded-lg p-1 border border-slate-700">
             <button className="px-3 py-1 text-xs font-bold text-white bg-blue-600 rounded-md">Tất cả</button>
             <button className="px-3 py-1 text-xs font-bold text-slate-500 hover:text-white transition-colors">Được đánh dấu</button>
             <button className="px-3 py-1 text-xs font-bold text-slate-500 hover:text-white transition-colors">Đã trả lời</button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0 overflow-hidden relative">
        <div className="flex-1 flex flex-col gap-6 min-w-0">
          {/* Search & Filter Bar */}
          <div className="glass rounded-2xl p-4 flex flex-wrap items-center gap-4">
             <div className="flex-1 relative min-w-[240px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Tìm theo tên người dùng, khách sạn, hoặc từ khóa..."
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all text-slate-100"
                />
             </div>
             <button className="px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl flex items-center gap-2 text-sm text-slate-300 hover:bg-slate-700 transition-all font-medium">
                <Filter className="w-4 h-4" /> Bộ lọc
             </button>
             <button className="px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl flex items-center gap-2 text-sm text-slate-300 hover:bg-slate-700 transition-all font-medium">
                <Calendar className="w-4 h-4" /> Khoảng ngày
             </button>
          </div>

          {/* List of Reviews */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
             {reviewsData.map((review) => (
               <motion.div 
                 key={review.id}
                 layout
                 onClick={() => setSelectedReview(review)}
                 className={cn(
                   "glass rounded-2xl p-6 cursor-pointer transition-all border shadow-sm",
                   selectedReview?.id === review.id ? "bg-slate-800/80 border-blue-500/50 ring-1 ring-blue-500/20" : "hover:bg-slate-800/30 border-slate-700/50"
                 )}
               >
                  <div className="flex items-start justify-between gap-4">
                     <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-slate-700 border border-slate-600 overflow-hidden flex-shrink-0">
                           <img src={review.avatar} alt="" />
                        </div>
                        <div>
                           <div className="flex items-center gap-2">
                             <h3 className="font-bold text-slate-100">{review.user}</h3>
                             <div className="flex items-center text-[10px] text-yellow-500">
                                {Array.from({length: review.rating}).map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                             </div>
                           </div>
                           <p className="text-xs text-blue-400 font-medium flex items-center gap-1 mt-0.5">
                              <Hotel className="w-3 h-3" /> {review.hotel}
                           </p>
                        </div>
                     </div>
                     <div className="text-right">
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">{review.date}</p>
                        <span className={cn(
                          "inline-block mt-2 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider",
                          review.sentiment === 'Positive' ? "bg-green-500/10 text-green-400" :
                          review.sentiment === 'Neutral' ? "bg-yellow-500/10 text-yellow-400" :
                          "bg-red-500/10 text-red-400"
                        )}>
                           {sentimentLabels[review.sentiment]}
                        </span>
                     </div>
                  </div>
                  
                  <p className="mt-4 text-sm text-slate-400 leading-relaxed line-clamp-2">
                     {review.content}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-2">
                     {review.tags.map(tag => (
                       <span key={tag} className="text-[10px] px-2 py-1 bg-slate-800/50 text-slate-500 rounded border border-slate-700/50 uppercase font-medium">#{tag}</span>
                     ))}
                     <div className="flex-1"></div>
                     <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                         Điểm AI: <span className={cn("font-bold", review.score > 0.8 ? "text-green-400" : review.score > 0.4 ? "text-yellow-400" : "text-red-400")}>{(review.score * 100).toFixed(0)}%</span>
                     </div>
                  </div>
               </motion.div>
             ))}
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-900 rounded-xl border border-slate-800">
             <div className="text-sm text-slate-500">Hiển thị <span className="text-slate-200 font-bold">4</span> trong <span className="text-slate-200 font-bold">1.240</span> đánh giá</div>
             <div className="flex items-center gap-2">
                <button className="p-2 bg-slate-800 rounded-lg text-slate-500 hover:bg-slate-700 transition-all">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-1">
                   <button className="w-8 h-8 rounded-lg bg-blue-600 text-white text-xs font-bold">1</button>
                   <button className="w-8 h-8 rounded-lg bg-slate-800 text-slate-400 text-xs font-bold hover:bg-slate-700">2</button>
                   <button className="w-8 h-8 rounded-lg bg-slate-800 text-slate-400 text-xs font-bold hover:bg-slate-700">3</button>
                </div>
                <button className="p-2 bg-slate-800 rounded-lg text-slate-500 hover:bg-slate-700 transition-all">
                  <ChevronRight className="w-4 h-4" />
                </button>
             </div>
          </div>
        </div>

        {/* Desktop Review Detail Sidebar */}
        <AnimatePresence>
           {selectedReview && (
             <motion.aside 
               initial={{ width: 0, opacity: 0 }}
               animate={{ width: 450, opacity: 1 }}
               exit={{ width: 0, opacity: 0 }}
               className="hidden xl:flex flex-col glass rounded-2xl border border-blue-500/20 shadow-2xl relative overflow-hidden"
             >
                <button 
                  onClick={() => setSelectedReview(null)}
                  className="absolute top-4 right-4 p-2 hover:bg-slate-800 rounded-full text-slate-500 hover:text-white transition-all z-10"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <div className="p-8 h-full flex flex-col overflow-y-auto">
                   <div className="space-y-6">
                      <div className="flex flex-col items-center text-center">
                         <div className="w-24 h-24 rounded-2xl bg-slate-800 border-2 border-slate-700 p-1 mb-4">
                            <img src={selectedReview.avatar} alt="" className="w-full h-full rounded-xl" />
                         </div>
                         <h2 className="text-xl font-bold text-white">{selectedReview.user}</h2>
                         <p className="text-sm text-slate-500">{selectedReview.hotel}</p>
                         <div className="flex items-center gap-1 mt-2 text-yellow-500">
                            {Array.from({length: selectedReview.rating}).map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                         </div>
                      </div>

                      <div className="pt-6 border-t border-slate-800 relative">
                         <Quote className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 text-slate-800" />
                         <p className="text-slate-300 leading-relaxed italic text-center">
                            "{selectedReview.content}"
                         </p>
                      </div>

                      <div className="space-y-4 pt-6 border-t border-slate-800">
                         <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest text-center">Phân tích cảm xúc AI</h4>
                         <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-slate-800/50 rounded-2xl text-center">
                               <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter mb-1">Cảm xúc</p>
                               <p className={cn(
                                 "text-lg font-black",
                                 selectedReview.sentiment === 'Positive' ? "text-green-400" : selectedReview.sentiment === 'Neutral' ? "text-yellow-400" : "text-red-400"
                               )}>{sentimentLabels[selectedReview.sentiment]}</p>
                            </div>
                            <div className="p-4 bg-slate-800/50 rounded-2xl text-center">
                               <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter mb-1">Độ cực</p>
                               <p className="text-lg font-black text-white">{(selectedReview.score * 100).toFixed(0)}%</p>
                            </div>
                         </div>
                      </div>

                      <div className="space-y-4">
                         <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest text-center">Trích xuất thực thể</h4>
                         <div className="flex flex-wrap items-center justify-center gap-2">
                            {selectedReview.tags.map(tag => (
                              <span key={tag} className="px-3 py-1.5 bg-blue-500/5 border border-blue-500/10 text-blue-400 rounded-lg text-xs font-medium">{tag}</span>
                            ))}
                         </div>
                      </div>

                      <div className="space-y-3 pt-6">
                         <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-xl shadow-blue-500/20 transition-all flex items-center justify-center gap-2">
                           Sinh phản hồi AI <MessageSquare className="w-4 h-4" />
                         </button>
                         <button className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-2xl border border-slate-700 transition-all flex items-center justify-center gap-2">
                           Xem nguồn gốc <ExternalLink className="w-4 h-4" />
                         </button>
                      </div>
                   </div>
                </div>
             </motion.aside>
           )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ReviewExplorer;
