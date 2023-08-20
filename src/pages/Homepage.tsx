// src/pages/HomePage.tsx

import React from 'react';
import Header from '../components/homepage/Header';
import Features from '../components/homepage/Features';
import CTA from '../components/homepage/CTA';
import FAQAccordion from '../components/homepage/FAQ';
import Footer from '../components/homepage/Footer';

function HomePage() {
  return (
    <div>
        <Header />
        <Features/>
        <CTA/>
        <FAQAccordion/>
        <Footer/>
    </div>
  );
}

export default HomePage;
