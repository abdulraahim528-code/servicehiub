import React from 'react';
import Hero from '@/components/home/Hero';
import Categories from '@/components/home/Categories';
import FeaturedProviders from '@/components/home/FeaturedProviders';
import HowItWorks from '@/components/home/HowItWorks';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import Testimonials from '@/components/home/Testimonials';

const HomePage = () => {
  return (
    <main className="py-4">
      <Hero />
      <Categories />
      <FeaturedProviders />
      <WhyChooseUs />
      <HowItWorks />
      <Testimonials />
    </main>
  );
};

export default HomePage;
