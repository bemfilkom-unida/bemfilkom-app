import Layout from '@/components/layout/Layout';
import {
  HeroAbout,
  VisionMissionAbout,
  LeadershipAbout,
  ValuesAbout,
  CallToActionAbout,
} from '@/components/about';

export const metadata = {
  title: "BEM FILKOM UNIDA",
  description: "Informasi tentang BEM FILKOM UNIDA dan Kabinet Neogenesis",
};

export default function AboutPage() {
  return (
    <Layout>
      <div>
        <HeroAbout />
        <VisionMissionAbout />
        <LeadershipAbout />
        <ValuesAbout />
        <CallToActionAbout />
      </div>
    </Layout>
  );
}
