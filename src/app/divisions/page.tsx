import Layout from '@/components/layout/Layout';
import {
    HeroDivisions,
    ExecutiveBoard,
    DivisionsSection,
    DivisionTabs,
    CallToActionDivisions,
  } from "@/components/divisions";

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