import React, { useState } from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  TrendingDown, 
  MessageSquare, 
  ArrowUpRight,
  Filter,
  Download,
  Calendar,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ChevronRight,
  Play
} from 'lucide-react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend 
} from 'recharts';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { analyzeReview, type AnalysisResult } from '../services/geminiService';

const sentimentData = [
  { name: 'Tích cực', value: 65, color: '#10b981' },
  { name: 'Trung tính', value: 20, color: '#f59e0b' },
  { name: 'Tiêu cực', value: 15, color: '#ef4444' },
];

const sentimentLabels = {
  Positive: 'Tích cực',
  Neutral: 'Trung tính',
  Negative: 'Tiêu cực',
};

const distributionData = [
  { name: 'Jan', positive: 45, neutral: 25, negative: 15 },
  { name: 'Feb', positive: 52, neutral: 20, negative: 18 },
  { name: 'Mar', positive: 48, neutral: 30, negative: 12 },
  { name: 'Apr', positive: 61, neutral: 22, negative: 10 },
  { name: 'May', positive: 55, neutral: 28, negative: 14 },
  { name: 'Jun', positive: 65, neutral: 20, negative: 15 },
];

const recentReviews = [
  { id: 1, hotel: 'Ocean Breeze Resort', content: 'Incredible stay! The staff was attentive and the view was breathtaking.', sentiment: 'Positive', score: 0.94, date: '2 mins ago' },
  { id: 2, hotel: 'Grand Plaza Hotel', content: 'Room was a bit noisy from the construction next door, but clean.', sentiment: 'Neutral', score: 0.52, date: '15 mins ago' },
  { id: 3, hotel: 'Pineview Lodge', content: 'Disappointing service at breakfast. Waited 40 minutes for coffee.', sentiment: 'Negative', score: 0.21, date: '1 hour ago' },
];

const Dashboard: React.FC = () => {
  const [reviewInput, setReviewInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = async () => {
    if (!reviewInput.trim()) return;
    
    setIsAnalyzing(true);
    try {
      const result = await analyzeReview(reviewInput);
      setAnalysisResult(result);
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-white tracking-tight">Bảng điều khiển chính</h1>
          <p className="text-slate-400 mt-1">Tổng quan phân tích cảm xúc bằng AI cho danh mục khách sạn của bạn.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-700 transition-all">
            <Calendar className="w-4 h-4" />
            30 ngày qua
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-700 transition-all">
            <Filter className="w-4 h-4" />
            Bộ lọc
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium shadow-lg shadow-blue-500/20 transition-all">
            <Download className="w-4 h-4" />
            Xuất dữ liệu
          </button>
        </div>
      </div>

      {/* Analyzer Input Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Sparkles className="w-32 h-32 text-blue-400" />
          </div>
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-2 text-blue-400 font-semibold tracking-wide uppercase text-xs">
              <Sparkles className="w-4 h-4" />
              Trình phân tích cảm xúc thông minh
            </div>
            <h2 className="text-2xl font-display font-bold text-white">Dán đánh giá để phân tích</h2>
            <div className="relative">
              <textarea 
                value={reviewInput}
                onChange={(e) => setReviewInput(e.target.value)}
                placeholder="Dán đánh giá của khách hàng ở đây... Ví dụ: 'Vị trí hoàn hảo và dịch vụ vượt ngoài mong đợi!'"
                className="w-full h-32 bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none"
              />
              <div className="absolute bottom-3 right-3 flex items-center gap-2">
                <span className="text-xs text-slate-500">Bộ máy tiếng Việt V2.0</span>
                <button 
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !reviewInput.trim()}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg text-sm font-bold transition-all shadow-lg shadow-blue-500/20"
                >
                  {isAnalyzing ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <Play className="w-3.5 h-3.5 fill-current" />
                  )}
                  {isAnalyzing ? 'Đang phân tích...' : 'Phân tích ngay'}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="glass rounded-2xl p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Kết quả phân tích</span>
              {analysisResult && (
                <div className="px-2 py-0.5 bg-green-500/10 text-green-400 text-[10px] font-bold rounded border border-green-500/20 uppercase tracking-tighter">AI xác thực</div>
              )}
            </div>
            {analysisResult ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="pt-2"
              >
                <div className="flex items-end gap-2">
                  <span className="text-5xl font-display font-bold text-white">{(analysisResult.score * 100).toFixed(0)}%</span>
                  <span className={cn(
                    "font-semibold mb-2 flex items-center text-sm",
                    analysisResult.sentiment === 'Positive' ? 'text-green-400' : 
                    analysisResult.sentiment === 'Neutral' ? 'text-yellow-400' : 'text-red-400'
                  )}>
                    {sentimentLabels[analysisResult.sentiment]}
                  </span>
                </div>
                <p className="text-slate-400 text-sm mt-1 leading-tight">{analysisResult.explanation}</p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {analysisResult.tags.map((tag, i) => (
                    <span key={i} className="px-2 py-0.5 bg-slate-800 text-slate-400 text-[10px] rounded border border-slate-700">
                      #{tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ) : (
              <div className="pt-2">
                <div className="flex items-end gap-2">
                  <span className="text-5xl font-display font-bold text-slate-800">--%</span>
                </div>
                <p className="text-slate-600 text-sm mt-1 italic">Đang chờ phân tích...</p>
              </div>
            )}
          </div>
          
          <div className="pt-6 border-t border-slate-800 grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-slate-500 uppercase">Độ tin cậy</p>
              <p className="text-lg font-bold text-slate-200">{analysisResult ? analysisResult.confidence.toFixed(2) : '--'}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase">Bộ máy</p>
              <p className="text-lg font-bold text-slate-200">Gemini 3</p>
            </div>
          </div>
        </div>
      </section>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-display font-bold text-white">Phân bổ cảm xúc</h3>
            <button className="text-slate-400 hover:text-white transition-colors">
              <HelpCircle className="w-5 h-5" />
            </button>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {sentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
                  itemStyle={{ color: '#f1f5f9' }}
                />
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-display font-bold text-white">Xu hướng hàng tháng</h3>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-800 rounded-md text-[10px] font-medium text-slate-400">
                <div className="w-2 h-2 rounded-full bg-[#10b981]"></div> Tích cực
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-800 rounded-md text-[10px] font-medium text-slate-400">
                <div className="w-2 h-2 rounded-full bg-[#f59e0b]"></div> Trung tính
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-800 rounded-md text-[10px] font-medium text-slate-400">
                <div className="w-2 h-2 rounded-full bg-[#ef4444]"></div> Tiêu cực
              </div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={distributionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
                />
                <Bar dataKey="positive" fill="#10b981" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="neutral" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="negative" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Reviews Table */}
      <section className="glass rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-display font-bold text-white">Luồng đánh giá trực tiếp</h3>
          </div>
          <button className="text-sm text-blue-400 font-medium flex items-center gap-1 hover:underline">
            Xem tất cả <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800/50">
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Khách sạn</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Nội dung đánh giá</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Cảm xúc</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Điểm</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Thời gian</th>
                <th className="px-6 py-4 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {recentReviews.map((review) => (
                <tr key={review.id} className="group hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-medium text-slate-200">{review.hotel}</span>
                  </td>
                  <td className="px-6 py-4 max-w-md">
                    <p className="text-sm text-slate-400 line-clamp-1 group-hover:text-slate-300 transition-colors">{review.content}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={cn(
                      "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border",
                      review.sentiment === 'Positive' ? "bg-green-500/10 text-green-400 border-green-500/20" :
                      review.sentiment === 'Neutral' ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" :
                      "bg-red-500/10 text-red-400 border-red-500/20"
                    )}>
                      {sentimentLabels[review.sentiment]}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                       <div className="w-16 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                        <div 
                          className={cn(
                            "h-full rounded-full transition-all duration-1000",
                            review.sentiment === 'Positive' ? "bg-green-500" :
                            review.sentiment === 'Neutral' ? "bg-yellow-500" :
                            "bg-red-500"
                          )}
                          style={{ width: `${review.score * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-mono text-slate-400">{(review.score * 100).toFixed(0)}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-500">
                    {review.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-500 hover:text-white transition-all">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
