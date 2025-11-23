
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Youtube, ExternalLink } from 'lucide-react';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  videoId: string;
}

const VIDEOS: Video[] = [
  {
    id: '1',
    title: 'Capital One: Banking Reimagined',
    thumbnail: 'https://img.youtube.com/vi/dyF7j7uYp_Y/maxresdefault.jpg',
    videoId: 'dyF7j7uYp_Y'
  },
  {
    id: '2',
    title: 'Digital Transformation in Banking',
    thumbnail: 'https://img.youtube.com/vi/b2j7t5Z7m8Y/maxresdefault.jpg',
    videoId: 'b2j7t5Z7m8Y'
  },
  {
    id: '4',
    title: 'Building a Zero-Trust Architecture',
    thumbnail: 'https://img.youtube.com/vi/9ywZ189sB4Y/maxresdefault.jpg',
    videoId: '9ywZ189sB4Y'
  },
  {
    id: '5',
    title: 'The Future of Payment APIs',
    thumbnail: 'https://img.youtube.com/vi/W7M94d8y55w/maxresdefault.jpg',
    videoId: 'W7M94d8y55w'
  }
];

export const VideoGallery = () => {
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  return (
    <section className="py-24 px-4 bg-[#020617] relative z-10">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-red-900/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-12 border-b border-slate-800 pb-6"
        >
          <div className="p-3 bg-red-600/10 rounded-xl border border-red-600/20">
            <Youtube className="w-8 h-8 text-[#D03027]" />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Multimedia Insights</h2>
            <p className="text-slate-400 mt-1">Explore visual deep dives into Capital One's technology stack.</p>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {VIDEOS.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-[#D03027]/50 shadow-lg hover:shadow-[0_0_30px_rgba(208,48,39,0.15)] transition-all duration-300 flex flex-col"
            >
              {/* Video Aspect Ratio Container */}
              <div className="relative aspect-video bg-black overflow-hidden">
                <AnimatePresence mode="wait">
                  {playingVideo === video.id ? (
                    <motion.div
                      key="video"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-20"
                    >
                      <iframe 
                        width="100%" 
                        height="100%" 
                        src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&rel=0`}
                        title={video.title} 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        allowFullScreen
                        className="w-full h-full"
                      />
                    </motion.div>
                  ) : (
                    <motion.button
                      key="thumbnail"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setPlayingVideo(video.id)}
                      className="absolute inset-0 w-full h-full group/btn cursor-pointer"
                    >
                      {/* Thumbnail Image with Scale Effect */}
                      <div className="absolute inset-0 w-full h-full overflow-hidden">
                        <img 
                          src={video.thumbnail} 
                          alt={video.title} 
                          className="w-full h-full object-cover opacity-80 group-hover/btn:opacity-60 group-hover/btn:scale-110 transition-all duration-700 ease-out"
                        />
                      </div>
                      
                      {/* Overlay Content */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative">
                          {/* Pulse Effect */}
                          <div className="absolute inset-0 bg-[#D03027] rounded-full opacity-0 group-hover/btn:opacity-30 group-hover/btn:animate-ping" />
                          
                          {/* Play Button */}
                          <div className="relative w-16 h-16 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center group-hover/btn:bg-[#D03027] group-hover/btn:border-[#D03027] transition-all duration-300 group-hover/btn:scale-110">
                            <Play className="w-6 h-6 text-white ml-1 fill-white" />
                          </div>
                        </div>
                      </div>
                      
                      {/* Bottom Gradient for Text Readability */}
                      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
              
              <div className="p-5 relative z-10 bg-slate-900 flex-1 flex flex-col justify-between">
                <h3 className="font-bold text-lg text-slate-200 group-hover:text-white line-clamp-2 leading-tight mb-3">
                  {video.title}
                </h3>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-800">
                    <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                        Video Source
                    </span>
                    <a 
                        href={`https://www.youtube.com/watch?v=${video.videoId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xs font-bold text-[#D03027] hover:text-red-400 hover:underline transition-colors uppercase tracking-wider"
                    >
                        <span>Watch on YouTube</span>
                        <ExternalLink className="w-3 h-3" />
                    </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
