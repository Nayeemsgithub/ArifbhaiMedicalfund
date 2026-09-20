import React, { useState, useEffect } from 'react';
import { Camera, Maximize2, X, ChevronLeft, ChevronRight, Heart, ShieldCheck, Users, Anchor, UserCheck } from 'lucide-react';

export function CasePhotoGallery() {
  const [selectedIdx, setSelectedIdx] = useState(null);

  const images = [
    {
      src: "/images/arif-uniform.jpg",
      title: "Second Officer Arif Ahmed in Marine Uniform",
      category: "Seafaring Career",
      icon: Anchor,
      location: "Onboard M.V. Meghna Fortune",
      description: "Arif Ahmed in official Second Officer uniform. Over 15 years at sea on international merchant vessels before sudden illness developed during his recent voyage.",
      badge: "Verified Seafarer"
    },
    {
      src: "/images/arif-family-park.jpg",
      title: "Family Portrait with Farhana & 2 Young Sons",
      category: "Family Portrait",
      icon: Users,
      location: "With Wife & Children",
      description: "Arif sitting alongside his wife Farhana Aktar, their 3.5-year-old elder son, and their 10-month-old baby son. His young family is his greatest anchor.",
      badge: "Family Anchor"
    },
    {
      src: "/images/arif-baby-sea.jpg",
      title: "Father & 10-Month-Old Infant Son",
      category: "Father & Son",
      icon: Heart,
      location: "Precious Family Moments",
      description: "Arif holding his 10-month-old baby boy. A young, dedicated father fighting to recover and be there for his sons' future.",
      badge: "Human Story"
    },
    {
      src: "/images/arif-family-outdoor.jpg",
      title: "Arif with His Beloved Family",
      category: "Cherished Memories",
      icon: UserCheck,
      location: "Family Outdoors",
      description: "Treasured moments with his young family. Every contribution directly funds Arif's ongoing medical investigations, biopsy confirmation, and cancer care.",
      badge: "Family Bond"
    }
  ];

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIdx === null) return;
      if (e.key === 'Escape') setSelectedIdx(null);
      if (e.key === 'ArrowRight') setSelectedIdx((prev) => (prev + 1) % images.length);
      if (e.key === 'ArrowLeft') setSelectedIdx((prev) => (prev - 1 + images.length) % images.length);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIdx, images.length]);

  return (
    <section id="photo-gallery" className="py-12 max-w-7xl mx-auto px-4 sm:px-8 border-t border-neutral-200">
      <div className="space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-black bg-neutral-100 px-3 py-1 rounded-full border border-neutral-300 font-mono flex items-center gap-1.5">
                <Camera className="h-3.5 w-3.5 text-black" /> Dedicated Photo Album
              </span>
              <span className="text-xs font-mono font-bold text-black bg-neutral-100 px-2.5 py-1 rounded-full border border-neutral-300 flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5 text-black" /> Authentic Case Photos
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-black mt-2">
              Life, Family & Career Gallery
            </h2>
            <p className="text-sm text-neutral-600 mt-1 max-w-2xl">
              Real photographs documenting Second Officer Arif Ahmed's 15-year career at sea and his young family in Bangladesh. Click any image to view in high resolution.
            </p>
          </div>

          <a
            href="#donate"
            className="self-start md:self-auto px-4 py-2 rounded-xl bg-black text-white hover:bg-neutral-800 text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Heart className="h-3.5 w-3.5 fill-white" /> Support Arif's Family
          </a>
        </div>

        {/* Dedicated Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {images.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                onClick={() => setSelectedIdx(idx)}
                className="group cursor-pointer rounded-3xl border border-neutral-300 bg-white hover:border-black hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
              >
                {/* Image Container */}
                <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-neutral-100">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105 filter contrast-[1.02]"
                  />

                  {/* Gradient & Top Badges */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="text-[10px] font-mono font-bold uppercase bg-black/80 text-white px-2.5 py-1 rounded-lg backdrop-blur-xs border border-white/20 flex items-center gap-1">
                      <IconComponent className="h-3 w-3" />
                      {item.category}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-xl bg-white text-black shadow-md">
                    <Maximize2 className="h-4 w-4" />
                  </div>

                  {/* Bottom Image Overlay Title */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] font-mono text-neutral-300 block">{item.location}</span>
                    <h3 className="text-base font-bold text-white leading-tight mt-0.5">{item.title}</h3>
                  </div>
                </div>

                {/* Card Content Description */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3 bg-white">
                  <p className="text-xs text-neutral-700 leading-relaxed font-sans">
                    {item.description}
                  </p>

                  <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-[11px] font-mono text-neutral-500">
                    <span className="font-bold text-black">{item.badge}</span>
                    <span className="text-neutral-900 font-bold group-hover:underline flex items-center gap-1">
                      Enlarge Photo →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Gallery Quote Strip */}
        <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-black text-white flex items-center justify-center shrink-0">
              <Heart className="h-4 w-4 fill-white" />
            </div>
            <div>
              <span className="font-bold text-black block">Direct Support to Family</span>
              <span className="text-neutral-600">Every donation directly funds Arif's ongoing hospital investigations and oncology care.</span>
            </div>
          </div>
          <a
            href="#donate"
            className="px-5 py-2.5 rounded-xl bg-black text-white hover:bg-neutral-800 font-bold text-xs shrink-0 cursor-pointer shadow-xs"
          >
            Donate to Farhana Aktar
          </a>
        </div>

      </div>

      {/* High-Resolution Interactive Lightbox Modal */}
      {selectedIdx !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedIdx(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border-2 border-black flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-neutral-200 bg-white">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase bg-black text-white px-2.5 py-1 rounded-lg">
                  {images[selectedIdx].category}
                </span>
                <h4 className="text-sm sm:text-base font-bold text-black truncate max-w-md">
                  {images[selectedIdx].title}
                </h4>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-neutral-500 hidden sm:inline">
                  {selectedIdx + 1} / {images.length}
                </span>
                <button
                  onClick={() => setSelectedIdx(null)}
                  className="p-1.5 rounded-xl hover:bg-neutral-100 text-neutral-700 hover:text-black transition-colors cursor-pointer"
                  title="Close (Esc)"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Modal Image Area with Navigation Buttons */}
            <div className="relative flex-1 bg-neutral-950 flex items-center justify-center overflow-hidden min-h-[300px] sm:min-h-[450px]">
              <img
                src={images[selectedIdx].src}
                alt={images[selectedIdx].title}
                className="max-h-[60vh] w-auto max-w-full object-contain select-none"
              />

              {/* Prev Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIdx((prev) => (prev - 1 + images.length) % images.length);
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 hover:bg-white text-black flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer"
                title="Previous (Left Arrow)"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {/* Next Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIdx((prev) => (prev + 1) % images.length);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 hover:bg-white text-black flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer"
                title="Next (Right Arrow)"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Footer Caption & Action */}
            <div className="p-4 sm:p-5 bg-neutral-50 border-t border-neutral-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1 max-w-xl">
                <span className="text-[11px] font-mono text-neutral-500 uppercase block">
                  Location: {images[selectedIdx].location}
                </span>
                <p className="text-xs text-neutral-700 leading-relaxed font-medium">
                  {images[selectedIdx].description}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href="#donate"
                  onClick={() => setSelectedIdx(null)}
                  className="px-5 py-2.5 rounded-xl bg-black text-white hover:bg-neutral-800 text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <Heart className="h-3.5 w-3.5 fill-white" /> Donate to Family
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
