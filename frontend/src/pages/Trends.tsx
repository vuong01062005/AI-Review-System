//Trend
import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  PieChart as PieChartIcon, 
  Calendar,
  Filter,
  Download,
  Activity,
  ArrowUp,
  ArrowDown,
  Info
} from 'lucide-react';
import { 
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, PieChart, Pie
} from 'recharts';
import { motion } from 'motion/react';

const trendData = [
  { day: 'Thứ 2', score: 72, volume: 120 },
  { day: 'Thứ 3', score: 75, volume: 150 },
  { day: 'Thứ 4', score: 68, volume: 180 },
  { day: 'Thứ 5', score: 82, volume: 140 },
  { day: 'Thứ 6', score: 78, volume: 210 },
  { day: 'Thứ 7', score: 85, volume: 240 },
  { day: 'CN', score: 88, volume: 260 },
];

const topicData = [
  { topic: 'Dịch vụ khách hàng', sentiment: 85 },
  { topic: 'Chất lượng phòng', sentiment: 72 },
  { topic: 'Vệ sinh', sentiment: 91 },
  { topic: 'Giá trị', sentiment: 65 },
  { topic: 'Vị trí', sentiment: 94 },
];

const donutData = [
  { name: 'Hài lòng', value: 340, color: '#10b981' },
  { name: 'Cần chú ý', value: 45, color: '#f59e0b' },
  { name: 'Khẩn cấp', value: 12, color: '#ef4444' },
];

const stats = [
  { label: 'Cảm xúc chung', value: '82%', change: '+4.2%', trend: 'up', icon: BarChart3 },
  { label: 'Tỷ lệ phản hồi', value: '94%', change: '+0.8%', trend: 'up', icon: Activity },
  { label: 'Tốc độ đánh giá', value: '2.4/hr', change: '-5.1%', trend: 'down', icon: TrendingDown },
  { label: 'Độ tin cậy TB', value: '0.92', change: '+0.1%', trend: 'up', icon: Info },
];

const Trends: React.FC = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-white tracking-tight">Xu hướng & Phân tích</h1>
          <p className="text-slate-400 mt-1">Phân tích sâu sự thay đổi cảm xúc và hiệu suất chủ đề.</p>
        </div>
        <div className="flex items-center gap-3">
           <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-700 transition-all">
            <Calendar className="w-4 h-4" />
            30 ngày qua
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium shadow-lg shadow-blue-500/20 transition-all">
            <Download className="w-4 h-4" />
            Báo cáo
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass rounded-2xl p-6 group cursor-default"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-slate-800 rounded-lg group-hover:scale-110 transition-transform">
                <stat.icon className="w-5 h-5 text-blue-400" />
              </div>
              <span className={`flex items-center gap-1 text-xs font-bold ${stat.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                {stat.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {stat.change}
              </span>
            </div>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{stat.label}</p>
            <p className="text-3xl font-display font-bold text-white mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Trend Line */}
        <div className="lg:col-span-2 glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-display font-bold text-white">Tiến trình cảm xúc</h3>
              <p className="text-sm text-slate-500">Hiệu suất lịch sử trên mọi kênh</p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="flex items-center gap-1.5 px-2 py-1 bg-blue-500/10 text-blue-400 rounded-lg border border-blue-500/20">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> Điểm
              </span>
               <span className="flex items-center gap-1.5 px-2 py-1 bg-purple-500/10 text-purple-400 rounded-lg border border-purple-500/20">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div> Lượng
              </span>
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="day" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
                />
                <Area type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                <Line type="monotone" dataKey="volume" stroke="#a855f7" strokeWidth={2} dot={{ fill: '#a855f7', strokeWidth: 2, r: 4 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Donut distribution */}
        <div className="glass rounded-2xl p-6">
           <h3 className="text-lg font-display font-bold text-white mb-6">Phân tích trạng thái đánh giá</h3>
           <div className="h-[250px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={donutData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {donutData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-3xl font-bold text-white">397</span>
                <span className="text-xs text-slate-500 uppercase tracking-widest">Tổng đánh giá</span>
              </div>
           </div>
           
           <div className="mt-8 space-y-4">
              {donutData.map((d, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: d.color }}></div>
                    <span className="text-sm font-medium text-slate-300">{d.name}</span>
                  </div>
                  <span className="text-sm font-bold text-white">{d.value}</span>
                </div>
              ))}
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Topic Sentiment */}
        <div className="glass rounded-2xl p-6">
          <h3 className="text-lg font-display font-bold text-white mb-6">Từ khóa & chủ đề hàng đầu</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topicData} layout="vertical" margin={{ left: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="topic" type="category" stroke="#94a3b8" fontSize={11} width={100} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Bar dataKey="sentiment" radius={[0, 4, 4, 0]} barSize={20}>
                  {topicData.map((entry, index) => (
                    <Cell key={index} fill={entry.sentiment > 80 ? '#10b981' : entry.sentiment > 70 ? '#3b82f6' : '#f59e0b'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Critical Shifts Card */}
        <div className="glass rounded-2xl p-6 bg-gradient-to-br from-bg-card to-slate-900 shadow-xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 blur-3xl rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/5 blur-3xl rounded-full"></div>
          
          <div className="relative z-10 flex flex-col h-full">
            <h3 className="text-lg font-display font-bold text-white mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-red-400" />
              Thay đổi cảm xúc quan trọng
            </h3>
            <div className="space-y-4 flex-1">
              <div className="p-4 bg-red-500/5 border border-red-500/10 rounded-xl">
                 <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-red-400">Tăng giảm mạnh</span>
                    <span className="text-[10px] text-slate-500 bg-red-400/10 px-1.5 py-0.5 rounded uppercase tracking-tighter">Khẩn cấp</span>
                 </div>
                 <p className="text-sm text-slate-300 leading-relaxed">
                   Breakfast quality mentions have dropped by <span className="font-bold text-red-400">24%</span> this week in the South Wing property. High correlation with plumbing complaints.
                 </p>
              </div>

              <div className="p-4 bg-green-500/5 border border-green-500/10 rounded-xl">
                 <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-green-400">Phục hồi tích cực</span>
                    <span className="text-[10px] text-slate-500 bg-green-400/10 px-1.5 py-0.5 rounded uppercase tracking-tighter">Normalizing</span>
                 </div>
                 <p className="text-sm text-slate-300 leading-relaxed">
                   Check-in speed sentiment has improved by <span className="font-bold text-green-400">18%</span> since the new kiosk implementation at City Hub.
                 </p>
              </div>
            </div>
            
            <button className="mt-6 w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm font-semibold transition-all border border-slate-700">
              Tạo phân tích AI chi tiết
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trends;
