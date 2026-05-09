import React from 'react';
import { 
  FileText, 
  Download, 
  Search, 
  Plus, 
  Calendar, 
  Clock, 
  ArrowRight, 
  LayoutPanelLeft,
  PieChart as PieIcon,
  BarChart as BarIcon,
  Zap,
  MoreVertical,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

const reportTemplates = [
  { id: 1, title: 'Daily Sentiment Digest', desc: 'Summary of the last 24 hours of incoming reviews across all hotels.', type: 'Digest', icon: Zap, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
  { id: 2, title: 'Monthly Performance', desc: 'Deep dive into KPI trends and long-term guest satisfaction goals.', type: 'Strategic', icon: PieIcon, color: 'text-blue-400', bg: 'bg-blue-400/10' },
  { id: 3, title: 'Hotel Comparison', desc: 'Side-by-side benchmarking of your properties based on sentiment.', type: 'Comparative', icon: LayoutPanelLeft, color: 'text-purple-400', bg: 'bg-purple-400/10' },
  { id: 4, title: 'Keyword Insights', desc: 'Linguistic analysis of the most frequent praise and complaints.', type: 'Analytical', icon: BarIcon, color: 'text-green-400', bg: 'bg-green-400/10' },
];

const recentExports = [
  { id: 'EXP-101', name: 'Q3_DaNang_Portfolio.pdf', date: '2 giờ trước', size: '2.4 MB', status: 'Sẵn sàng' },
  { id: 'EXP-102', name: 'Full_Year_2023_Reviews.csv', date: 'Hôm qua', size: '15.8 MB', status: 'Sẵn sàng' },
  { id: 'EXP-103', name: 'Executive_Summary_Jan.pptx', date: '22 Tháng 10 2023', size: '8.1 MB', status: 'Hết hạn' },
];

const Reports: React.FC = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-white tracking-tight">Báo cáo & Xuất</h1>
          <p className="text-slate-400 mt-1">Tạo các phân tích chuyên nghiệp và tải dữ liệu có cấu trúc.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium shadow-lg shadow-blue-500/20 transition-all">
            <Plus className="w-4 h-4" />
            Tạo yêu cầu
          </button>
        </div>
      </div>

       {/* Analytics Overview Bar */}
       <div className="glass rounded-2xl p-6 bg-gradient-to-r from-blue-600/10 to-purple-600/10 border-blue-500/20 flex flex-col md:flex-row items-center gap-8">
          <div className="flex items-center gap-4 border-r border-slate-700/50 pr-8">
             <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <FileText className="w-8 h-8 text-white" />
             </div>
             <div>
                <p className="text-blue-400 text-[10px] font-black uppercase tracking-widest leading-none mb-1">Báo cáo sẵn có</p>
                <p className="text-4xl font-display font-black text-white leading-none">248</p>
             </div>
          </div>
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
             {[
               { label: 'Tháng này', val: '42' },
               { label: 'Tự động', val: '12' },
               { label: 'Tùy chỉnh', val: '86' },
               { label: 'Đã chia sẻ', val: '108' }
             ].map((s, i) => (
                <div key={i}>
                   <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">{s.label}</p>
                   <p className="text-xl font-bold text-slate-200">{s.val}</p>
                </div>
             ))}
          </div>
          <button className="px-6 py-3 bg-white text-slate-900 rounded-xl font-bold text-sm hover:scale-105 transition-all whitespace-nowrap">
             Cài đặt xuất toàn cầu
          </button>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Templates Section */}
          <div className="space-y-6">
             <div className="flex items-center justify-between">
                <h3 className="font-bold text-white text-lg">Mẫu báo cáo</h3>
                <div className="relative">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                   <input 
                     type="text" 
                     placeholder="Tìm mẫu..." 
                     className="bg-slate-800/50 border border-slate-700 rounded-full py-1.5 pl-9 pr-4 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all text-slate-300"
                   />
                </div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reportTemplates.map((t) => (
                  <motion.div 
                    key={t.id}
                    whileHover={{ y: -4 }}
                    className="glass rounded-2xl p-6 cursor-pointer group transition-all"
                  >
                     <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-6 border border-slate-700 shadow-sm transition-all group-hover:scale-110", t.bg, t.color)}>
                        <t.icon className="w-6 h-6" />
                     </div>
                     <h4 className="font-bold text-white mb-2">{t.title}</h4>
                     <p className="text-xs text-slate-400 leading-relaxed mb-6">{t.desc}</p>
                     <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                        <span className="text-[10px] uppercase font-bold text-slate-500">{t.type}</span>
                        <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                     </div>
                  </motion.div>
                ))}
             </div>
          </div>

          {/* Right Section: Recent & Request */}
          <div className="space-y-6">
             <div className="glass rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-4 bg-slate-900/40 relative overflow-hidden group border-dashed border-2 border-slate-800">
                <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 relative z-10">
                   <PieIcon className="w-8 h-8 text-blue-400" />
                </div>
                <div className="relative z-10">
                   <h4 className="text-xl font-bold text-white mb-1">Yêu cầu phân tích tùy chỉnh?</h4>
                   <p className="text-sm text-slate-500 px-8">Bộ máy AI của chúng tôi có thể tạo báo cáo đa cơ sở theo yêu cầu. Hãy mô tả nhu cầu của bạn.</p>
                </div>
                <button className="relative z-10 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-xl shadow-blue-500/20 transition-all">
                   Bắt đầu xây dựng AI
                </button>
             </div>

             <div className="glass rounded-2xl overflow-hidden">
                <div className="p-4 bg-slate-900/50 border-b border-slate-800 flex items-center justify-between">
                   <h3 className="font-bold text-sm text-white">Recent Exports</h3>
                   <button className="text-[10px] text-slate-500 uppercase font-black tracking-widest hover:text-white transition-colors">Xóa tất cả</button>
                </div>
                <div className="divide-y divide-slate-800/50">
                   {recentExports.map((exp) => (
                     <div key={exp.id} className="p-4 flex items-center justify-between hover:bg-slate-800/30 transition-all group">
                        <div className="flex items-center gap-4">
                           <div className="p-2 bg-slate-800 rounded-lg text-slate-500 group-hover:text-blue-400 transition-colors">
                              <Download className="w-5 h-5" />
                           </div>
                           <div>
                              <p className="text-sm font-bold text-slate-200">{exp.name}</p>
                              <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                                 <span>{exp.date}</span>
                                 <span>•</span>
                                 <span>{exp.size}</span>
                              </div>
                           </div>
                        </div>
                        <div className="flex items-center gap-3">
                           {exp.status === 'Ready' ? (
                             <span className="flex items-center gap-1.5 text-[10px] font-bold text-green-400 bg-green-400/10 px-2 py-0.5 rounded uppercase tracking-tighter">
                               <CheckCircle2 className="w-3 h-3" /> Sẵn sàng
                             </span>
                           ) : (
                             <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 bg-slate-800 px-2 py-0.5 rounded uppercase tracking-tighter">
                               <Lock className="w-3 h-3" /> Hết hạn
                             </span>
                           )}
                           <button className="p-1 hover:bg-slate-700 rounded transition-colors text-slate-600 hover:text-white">
                             <MoreVertical className="w-4 h-4" />
                           </button>
                        </div>
                     </div>
                   ))}
                </div>
                <button className="w-full p-4 text-xs font-bold text-blue-400 hover:text-blue-300 hover:bg-slate-800/30 transition-all border-t border-slate-800">
                   Quản lý tất cả xuất đã lên lịch
                </button>
             </div>
          </div>
       </div>
    </div>
  );
};

export default Reports;
