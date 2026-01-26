import Layout from '@/components/layout/Layout';
import {
  HeroDivisions,
  ExecutiveBoard,
  DivisionsSection,
  DivisionTabs,
  CallToActionDivisions,
} from "@/components/divisions";

export const metadata = {
  title: "BEM FILKOM UNIDA",
  description: "Struktur organisasi dan divisi BEM FILKOM UNIDA beserta program unggulannya.",
};

export default function Divisions() {
  return (
    <Layout>
      <HeroDivisions />
      <ExecutiveBoard />
      <DivisionsSection />
      <DivisionTabs />
      <CallToActionDivisions />
    </Layout>
  );
}