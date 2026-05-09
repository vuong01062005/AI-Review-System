import React, { useState } from 'react';
import { 
  Hotel, 
  MapPin, 
  Star, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Activity,
  ArrowRight,
  MoreHorizontal,
  ChevronRight,
  Globe,
  Wifi,
  Coffee,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

const hotelsData = [
  { 
    id: 1, 
    name: 'Ocean Breeze Resort', 
    location: 'Da Nang, Vietnam', 
    score: 92, 
    reviews: 1240, 
    trend: '+4%', 
    sentiment: 'Positive',
    occupancy: '88%',
    activeReviewers: 34,
    tags: ['Coastal', 'Luxury', 'Family']
  },
  { 
    id: 2, 
    name: 'Grand Plaza Hotel', 
    location: 'Hanoi, Vietnam', 
    score: 74, 
    reviews: 3500, 
    trend: '-2%', 
    sentiment: 'Neutral',
    occupancy: '92%',
    activeReviewers: 82,
    tags: ['Business', 'Metropolitan', 'Iconic']
  },
  { 
    id: 3, 
    name: 'Pineview Lodge', 
    location: 'Da Lat, Vietnam', 
    score: 61, 
    reviews: 420, 
    trend: '-12%', 
    sentiment: 'Negative',
    occupancy: '45%',
    activeReviewers: 12,
    tags: ['Mountain', 'Quiet', 'Nature']
  },
  { 
    id: 4, 
    name: 'Metropole Legend', 
    location: 'HCMC, Vietnam', 
    score: 98, 
    reviews: 8900, 
    trend: '+1%', 
    sentiment: 'Positive',
    occupancy: '96%',
    activeReviewers: 156,
    tags: ['Heritage', 'Ultra-Luxury', 'Boutique']
  },
];

const sentimentLabels = {
  Positive: 'Tích cực',
  Neutral: 'Trung tính',
  Negative: 'Tiêu cực',
};

const Hotels: React.FC = () => {
  const [selectedHotel, setSelectedHotel] = useState<typeof hotelsData[0] | null>(null);

  return (
    <div className="space-y-6 max-w-7xl mx-auto relative h-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-white tracking-tight">Mạng khách sạn</h1>
          <p className="text-slate-400 mt-1">Quản lý và so sánh hiệu suất cảm xúc giữa các cơ sở.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-700 transition-all">
            <Globe className="w-4 h-4" />
            Xem toàn cầu
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium shadow-lg shadow-blue-500/20 transition-all">
            Thêm cơ sở
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Statistics Widgets */}
        <div className="xl:col-span-1 space-y-6">
           <div className="glass rounded-2xl p-6 bg-blue-600/5 border-blue-500/20">
              <h3 className="text-blue-400 font-bold uppercase text-[10px] tracking-widest mb-4">Tình trạng mạng</h3>
              <div className="flex items-end gap-2 mb-4">
                 <span className="text-4xl font-display font-black text-white">A-</span>
                 <span className="text-sm text-green-400 font-bold mb-1.5 flex items-center">
                   Tuyệt vời <Activity className="w-3.5 h-3.5 ml-1" />
                 </span>
              </div>
              <div className="space-y-3">
                 <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Tổng cơ sở</span>
                    <span className="text-white font-bold">12</span>
                 </div>
                 <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Cảnh báo quan trọng</span>
                    <span className="text-red-400 font-bold">2</span>
                 </div>
                 <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Giám sát trực tiếp</span>
                    <span className="text-green-400 font-bold">Live</span>
                 </div>
              </div>
           </div>

           <div className="glass rounded-2xl p-6">
              <h3 className="text-slate-500 font-bold uppercase text-[10px] tracking-widest mb-6">Đơn vị hàng đầu</h3>
              <div className="flex items-center gap-4 mb-4">
                 <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center border border-blue-500/30">
                    <Hotel className="text-blue-400 w-6 h-6" />
                 </div>
                 <div>
                    <p className="font-bold text-white text-sm">Metropole Legend</p>
                    <div className="flex items-center gap-1 text-[10px] text-yellow-500">
                       <Star className="w-3 h-3 fill-current" />
                       <Star className="w-3 h-3 fill-current" />
                       <Star className="w-3 h-3 fill-current" />
                       <Star className="w-3 h-3 fill-current" />
                       <Star className="w-3 h-3 fill-current" />
                    </div>
                 </div>
              </div>
              <div className="pt-4 border-t border-slate-800">
                 <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-500">Sentiment Score</span>
                    <span className="text-lg font-bold text-green-400">98%</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Hotels Table */}
        <div className="xl:col-span-3 glass rounded-2xl overflow-hidden">
           <div className="overflow-x-auto">
             <table className="w-full text-left text-sm">
               <thead className="bg-slate-900/50 border-b border-slate-800">
                 <tr>
                    <th className="px-6 py-5 font-bold text-xs text-slate-500 uppercase tracking-widest">Tên cơ sở</th>
                    <th className="px-6 py-5 font-bold text-xs text-slate-500 uppercase tracking-widest">Điểm</th>
                    <th className="px-6 py-5 font-bold text-xs text-slate-500 uppercase tracking-widest">Xu hướng</th>
                    <th className="px-6 py-5 font-bold text-xs text-slate-500 uppercase tracking-widest">Công suất</th>
                    <th className="px-6 py-5 font-bold text-xs text-slate-500 uppercase tracking-widest">Cảm xúc</th>
                    <th className="px-6 py-5"></th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-800/50">
                  {hotelsData.map((hotel) => (
                    <tr 
                      key={hotel.id} 
                      className="group hover:bg-slate-800/40 transition-all cursor-pointer"
                      onClick={() => setSelectedHotel(hotel)}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-500 group-hover:text-blue-400 transition-colors">
                              <Hotel className="w-5 h-5" />
                           </div>
                           <div>
                              <p className="font-bold text-slate-200">{hotel.name}</p>
                              <div className="flex items-center gap-1 text-[10px] text-slate-500 mt-0.5 underline decoration-dotted">
                                <MapPin className="w-3 h-3" />
                                {hotel.location}
                              </div>
                           </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                         <span className="text-lg font-display font-bold text-white">{hotel.score}%</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                         <span className={cn(
                           "flex items-center gap-1 text-xs font-bold",
                           hotel.trend.startsWith('+') ? "text-green-400" : "text-red-400"
                         )}>
                            {hotel.trend.startsWith('+') ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                            {hotel.trend}
                         </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-slate-400 font-medium">
                         {hotel.occupancy}
                      </td>
                      <td className="px-6 py-4">
                         <span className={cn(
                           "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border",
                           hotel.sentiment === 'Positive' ? "bg-green-500/10 text-green-400 border-green-500/20" :
                           hotel.sentiment === 'Neutral' ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" :
                           "bg-red-500/10 text-red-400 border-red-500/20"
                         )}>
                            {sentimentLabels[hotel.sentiment]}
                         </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                         <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                      </td>
                    </tr>
                  ))}
               </tbody>
             </table>
           </div>
        </div>
      </div>

      {/* Detail Sidebar Overlay */}
      <AnimatePresence>
        {selectedHotel && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedHotel(null)}
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm z-20"
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 20 }}
              className="absolute top-0 right-0 h-full w-full max-w-md bg-slate-900 border-l border-slate-700 shadow-2xl z-30 flex flex-col p-8 overflow-y-auto"
            >
               <button 
                 onClick={() => setSelectedHotel(null)}
                 className="absolute top-6 right-6 p-2 hover:bg-slate-800 rounded-lg text-slate-500 transition-all"
               >
                 <X className="w-5 h-5" />
               </button>

               <div className="space-y-8">
                  <div className="space-y-4">
                     <span className="px-3 py-1 bg-blue-600/10 text-blue-400 text-xs font-bold rounded-full border border-blue-500/20 uppercase tracking-widest">
                       Kiểm toán cơ sở
                     </span>
                     <h2 className="text-3xl font-display font-bold text-white">{selectedHotel.name}</h2>
                     <p className="text-slate-400 flex items-center gap-2">
                        <MapPin className="w-4 h-4" /> {selectedHotel.location}
                     </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Điểm cảm xúc</p>
                        <p className="text-2xl font-black text-white">{selectedHotel.score}%</p>
                     </div>
                     <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Đánh giá hoạt động</p>
                        <p className="text-2xl font-black text-white">{selectedHotel.reviews.toLocaleString()}</p>
                     </div>
                  </div>

                  <div className="space-y-4">
                     <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Thông tin tiện nghi</h4>
                     <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-2 p-3 bg-slate-800/30 rounded-xl text-slate-300 text-sm">
                           <Wifi className="w-4 h-4 text-blue-400" /> WiFi tốc độ cao
                        </div>
                        <div className="flex items-center gap-2 p-3 bg-slate-800/30 rounded-xl text-slate-300 text-sm">
                           <Coffee className="w-4 h-4 text-orange-400" /> Quầy sáng
                        </div>
                     </div>
                  </div>

                  <div className="space-y-4">
                     <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Hành động nhanh</h4>
                     <div className="space-y-2">
                        <button className="w-full p-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-500/20 flex items-center justify-between group">
                           Xem báo cáo cơ sở đầy đủ
                           <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className="w-full p-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-2xl transition-all border border-slate-700 flex items-center justify-between">
                           Kiểm tra đánh giá gần đây
                           <ChevronRight className="w-5 h-5" />
                        </button>
                     </div>
                  </div>
               </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Hotels;
