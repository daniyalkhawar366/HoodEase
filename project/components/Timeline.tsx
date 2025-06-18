'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

interface TimelineEvent {
  date: string;
  year: number;
  title: string;
  description: string;
  icon: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    date: 'Jan 2018',
    year: 2018,
    title: 'Founding of HoodEase',
    description: 'Our journey began with a vision to revolutionize streetwear, focusing on comfort, style, and quality.',
    icon: 'https://images.pexels.com/photos/1036808/pexels-photo-1036808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    date: 'Aug 2018',
    year: 2018,
    title: 'First Collection Launch',
    description: 'We proudly launched our inaugural collection of premium hoodies, met with enthusiastic reception from our community.',
    icon: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    date: 'Mar 2019',
    year: 2019,
    title: 'Expansion into Womens Wear',
    description: 'Responding to popular demand, we introduced our first line of womens hoodies, blending elegance with urban edge.',
    icon: 'https://images.pexels.com/photos/1578982/pexels-photo-1578982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    date: 'Oct 2019',
    year: 2019,
    title: 'Sustainable Initiatives',
    description: 'A major milestone in our commitment to the planet: implementing eco-friendly materials and production processes.',
    icon: 'https://images.pexels.com/photos/210384/pexels-photo-210384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    date: 'Jul 2020',
    year: 2020,
    title: 'Kids Collection Unveiled',
    description: 'Bringing comfort and style to the next generation with our vibrant and durable kids hoodie collection.',
    icon: 'https://images.pexels.com/photos/1016834/pexels-photo-1016834.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    date: 'Dec 2021',
    year: 2021,
    title: 'Global Shipping Launched',
    description: 'HoodEase goes global! We started shipping our products worldwide, reaching customers across continents.',
    icon: 'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

export default function Timeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollToEvent = (index: number) => {
    setActiveIndex(index);
    if (carouselRef.current) {
      const eventElement = carouselRef.current.children[index] as HTMLElement;
      if (eventElement) {
        eventElement.scrollIntoView({
          behavior: 'auto',
          inline: 'center',
        });
      }
    }
  };

  return (
    <div className="relative flex flex-col justify-center items-center py-20 bg-white font-sans" style={{ minHeight: 'unset', height: 'auto' }}>
      {/* Background HISTORY Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <h1
          className="text-[15vw] font-bold text-gray-200 uppercase minimal-text select-none"
          style={{ fontFamily: 'Poppins, sans-serif', opacity: 0.05 }}
        >
          HISTORY
        </h1>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
        <h2 className="text-center text-4xl md:text-5xl font-bold mb-16 text-text minimal-text">
          HOODEASE'S JOURNEY
        </h2>

        {/* Timeline Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="flex items-center space-x-6">
            <div className="relative w-24 h-24 flex-shrink-0">
              <div className="absolute inset-0 rounded-full border-2 border-black flex items-center justify-center">
                <Image src={timelineEvents[activeIndex].icon} alt="Event Icon" width={64} height={64} className="rounded-full object-cover" />
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-text mb-2 minimal-text">{timelineEvents[activeIndex].title}</h3>
              <p className="text-lg text-text/70 leading-relaxed">
                {timelineEvents[activeIndex].description}
              </p>
            </div>
          </div>
        </div>

        {/* Timeline Navigation */}
        <div
          ref={carouselRef}
          className="relative w-full flex overflow-x-scroll no-scrollbar mb-8 snap-x snap-mandatory bg-transparent"
        >
          <div className="flex items-center relative z-10 mx-auto">
            {timelineEvents.map((event, index) => (
              <div
                key={index}
                className="flex flex-col items-center flex-shrink-0 mx-6 cursor-pointer snap-center"
                onClick={() => scrollToEvent(index)}
                style={{ transition: 'transform 0.2s' }}
              >
                <div
                  className={`w-4 h-4 rounded-full transition-all duration-300 transform ${index === activeIndex ? 'bg-black scale-125' : 'bg-gray-400'}`}
                />
                <p className={`mt-3 text-sm font-medium ${index === activeIndex ? 'text-black font-bold' : 'text-gray-500'}`}>
                  {event.date}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 