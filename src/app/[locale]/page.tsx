'use client';

import { SidebarLayout } from 'shared/ui';
import { AdditionalsSection } from 'widgets/additionals-section';
import { FeatureSection } from 'widgets/features-section';
import { HeroSection } from 'widgets/hero-section';
import { NewsSection } from 'widgets/news-list';
import { ReviewsSection } from 'widgets/reviews-section';
import { ServicesSection } from 'widgets/services-section';

export default function HomePage() {
  return (
    <SidebarLayout>
      <HeroSection />
      <ServicesSection />
      <AdditionalsSection />
      <FeatureSection />
      <ReviewsSection />
      <NewsSection />
    </SidebarLayout>
  );
}
