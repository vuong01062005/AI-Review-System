import React, { useState } from 'react';
import { 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Map as MapIcon,
  Download,
  Plus,
  PlayCircle,
  FileJson,
  Sparkles,
  Table as TableIcon
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

const recentBatches = [
  { id: 'B-29001', name: 'Q1 Tripadvisor Export', date: '24 Tháng 10 2023', reviews: 1250, status: 'Hoàn thành', logo: 'https://cdn.iconscout.com/icon/free/png-256/free-tripadvisor-logo-icon-download-in-svg-png-gif-file-formats--social-media-pack-logos-icons-2151608.png' },
  { id: 'B-29002', name: 'Booking.com Beachfront', date: '22 Tháng 10 2023', reviews: 840, status: 'Hoàn thành', logo: 'https://cdn.iconscout.com/icon/free/png-256/free-booking-logo-icon-download-in-svg-png-gif-file-formats--social-media-pack-logos-icons-2151590.png' },
  { id: 'B-29003', name: 'Google Reviews - North', date: '21 Tháng 10 2023', reviews: 3100, status: 'Đang xử lý', logo: 'https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png' },
  { id: 'B-29004', name: 'Internal Feedback Forms', date: '20 Tháng 10 2023', reviews: 156, status: 'Thất bại', logo: 'https://api.dicebear.com/7.x/initials/svg?seed=IF' },
];

const CloudDownloadOutlined = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
    <path d="M12 12v9" /><path d="m8 17 4 4 4-4" />
  </svg>
);

const BatchUpload: React.FC = () => {
  const [dragActive, setDragActive] = useState(false);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-white tracking-tight">Xử lý hàng loạt</h1>
          <p className="text-slate-400 mt-1">Tải lên bộ dữ liệu lớn để trích xuất cảm xúc sâu.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium shadow-lg shadow-blue-500/20 transition-all">
            <Plus className="w-4 h-4" />
            Lô mới
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Đồng bộ tổng', value: '14,290', icon: CloudDownloadOutlined, color: 'text-blue-400' },
          { label: 'Đã xử lý', value: '12,840', icon: CheckCircle2, color: 'text-green-400' },
          { label: 'Đang chờ', value: '1,250', icon: Clock, color: 'text-yellow-400' },
          { label: 'Thất bại', value: '200', icon: AlertCircle, color: 'text-red-400' },
        ].map((s, i) => (
          <div key={i} className="glass rounded-xl p-4 flex items-center gap-3">
            <div className={cn("p-2 rounded-lg bg-slate-800", s.color)}>
               <s.icon className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider leading-none mb-1">{s.label}</p>
              <p className="text-xl font-bold text-white leading-none">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Area */}
        <div className="lg:col-span-2 space-y-6">
           <div 
             className={cn(
               "relative border-2 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center transition-all min-h-[350px]",
               dragActive ? "border-blue-500 bg-blue-500/5" : "border-slate-700 bg-slate-900/40"
             )}
             onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
             onDragLeave={() => setDragActive(false)}
             onDrop={(e) => { e.preventDefault(); setDragActive(false); }}
           >
              <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-6 shadow-xl border border-slate-700 group transition-all">
                <UploadCloud className="w-10 h-10 text-blue-400 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Thả tệp vào đây hoặc nhấp để tải lên</h3>
              <p className="text-slate-500 text-sm mb-8 text-center max-w-sm">
                Hỗ trợ tệp CSV, XLSX và JSON. Dung lượng tối đa 50MB mỗi lô.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-500/20">
                  Chọn tệp
                </button>
                <div className="flex items-center gap-3 px-4 py-2.5 bg-slate-800 rounded-xl border border-slate-700">
                  <FileJson className="w-4 h-4 text-orange-400" />
                  <TableIcon className="w-4 h-4 text-green-400" />
                  <FileText className="w-4 h-4 text-blue-400" />
                  <span className="text-xs text-slate-400 font-medium border-l border-slate-700 pl-3">Tích hợp API</span>
                </div>
              </div>
           </div>

           {/* Recent Table */}
           <div className="glass rounded-2xl overflow-hidden">
             <div className="p-4 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between">
                <h3 className="font-bold text-sm text-slate-200">Lô xử lý gần đây</h3>
                <button className="text-xs text-slate-500 flex items-center gap-1 hover:text-white transition-colors">
                  Xem nhật ký đầy đủ <Clock className="w-3 h-3" />
                </button>
             </div>
             <div className="overflow-x-auto">
               <table className="w-full text-left text-xs">
                 <thead className="bg-slate-900/30 text-slate-500 uppercase tracking-widest font-bold border-b border-slate-800">
                   <tr>
                     <th className="px-6 py-4">ID & nguồn lô</th>
                     <th className="px-6 py-4">Ngày tải lên</th>
                     <th className="px-6 py-4">Đánh giá</th>
                     <th className="px-6 py-4">Trạng thái</th>
                     <th className="px-6 py-4"></th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-800/40">
                    {recentBatches.map((b) => (
                      <tr key={b.id} className="hover:bg-slate-800/20 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center overflow-hidden p-2 text-white">
                               {b.logo.includes('initials') ? (
                                  <span className="font-bold text-[10px]">IF</span>
                               ) : (
                                  <img src={b.logo} alt="" className="w-full h-full object-contain" />
                               )}
                             </div>
                             <div>
                               <p className="font-bold text-slate-200">{b.name}</p>
                               <p className="text-slate-500 font-mono text-[10px] mt-0.5">{b.id}</p>
                             </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-slate-400">{b.date}</td>
                        <td className="px-6 py-4">
                          <span className="text-slate-200 font-bold">{b.reviews.toLocaleString()}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={cn(
                            "px-2 py-0.5 rounded-md font-bold tracking-tighter uppercase text-[10px]",
                            b.status === 'Hoàn thành' ? "bg-green-500/10 text-green-400" :
                            b.status === 'Đang xử lý' ? "bg-blue-500/10 text-blue-400 animate-pulse" :
                            "bg-red-500/10 text-red-400"
                          )}>
                             {b.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="p-1 px-2.5 bg-slate-800 rounded-md border border-slate-700 text-slate-400 hover:text-white transition-all opacity-0 group-hover:opacity-100">
                             Kết quả
                          </button>
                        </td>
                      </tr>
                    ))}
                 </tbody>
               </table>
             </div>
           </div>
        </div>

        {/* Sidebar Settings/Activity */}
        <div className="space-y-6">
           <div className="glass rounded-2xl p-6 bg-gradient-to-br from-bg-card to-slate-900 border-none ring-1 ring-slate-800">
              <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-6">
                <MapIcon className="w-5 h-5 text-blue-400" />
                Xử lý trực tiếp
              </h3>
              <div className="aspect-video bg-slate-950 rounded-xl relative overflow-hidden flex items-center justify-center border border-slate-800">
                 <div className="absolute inset-0 opacity-20">
                   <div className="w-full h-full grid grid-cols-12 grid-rows-6 opacity-30">
                     {Array.from({length: 72}).map((_, i) => <div key={i} className="border-[0.5px] border-blue-500/30"></div>)}
                   </div>
                 </div>
                 <div className="relative text-center space-y-2">
                    <p className="text-3xl font-display font-black text-blue-500 animate-pulse">402</p>
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Đánh giá / giây</p>
                 </div>
                 <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
                 <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-green-500 rounded-full animate-ping [animation-delay:0.5s]"></div>
              </div>
              <div className="mt-4 space-y-2">
                 <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Công việc hiện tại:</span>
                    <span className="text-blue-400 font-bold">Đồng bộ Google Maps</span>
                 </div>
                 <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-blue-500 rounded-full"
                      initial={{ width: "30%" }}
                      animate={{ width: "70%" }}
                      transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
                    />
                 </div>
              </div>
           </div>

           <div className="glass rounded-2xl p-6">
              <h3 className="font-bold text-white mb-6">Extraction Settings</h3>
              <div className="space-y-4">
                 <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl border border-slate-700">
                    <div className="flex items-center gap-3">
                       <PlayCircle className="w-5 h-5 text-purple-400" />
                       <span className="text-sm font-medium text-slate-300">Auto-Tagging</span>
                    </div>
                    <div className="w-10 h-5 bg-blue-600 rounded-full relative cursor-pointer">
                       <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full"></div>
                    </div>
                 </div>
                 <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl border border-slate-700">
                    <div className="flex items-center gap-3">
                       <Sparkles className="w-5 h-5 text-yellow-400" />
                       <span className="text-sm font-medium text-slate-300">Entity Detection</span>
                    </div>
                     <div className="w-10 h-5 bg-blue-600 rounded-full relative cursor-pointer">
                       <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full"></div>
                    </div>
                 </div>
                 <div className="pt-4 border-t border-slate-800">
                    <p className="text-xs text-slate-500 mb-3">Chọn mô hình</p>
                    <select className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm text-slate-300 focus:outline-none">
                       <option>Sentiment Pro Llama-3.1 v2 (Nhanh)</option>
                       <option>Bộ máy tiếng Việt V2.0 (Chuyên sâu)</option>
                       <option>Phân tích sâu (đa ngôn ngữ)</option>
                    </select>
                 </div>
                 <button className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-lg border border-slate-700 transition-all">
                    Reset To Default
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default BatchUpload;
