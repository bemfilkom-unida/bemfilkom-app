'use client';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import Reveal from "@/components/effects/Reveal";

interface ProgramTabsProps {
  className?: string;
}

interface Program {
  title: string;
  description: string;
  duration: string;
  level: string;
  url: string;
}

interface TabData {
  academic: Program[];
  technology: Program[];
  community: Program[];
}

function Section({
  className,
  id,
  children,
}: React.PropsWithChildren<{ className?: string; id?: string }>) {
  return (
    <section id={id} className={cn("py-16 md:py-24", className)} role="main">
      {children}
    </section>
  );
}

export default function ProgramTabs({ className }: ProgramTabsProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const academicPrograms: Program[] = [
    {
      title: "Beasiswa LPDP Reguler 2025",
      description:
        "Beasiswa jenjang magister (S2) dan doktor (S3) untuk Warga Negara Indonesia melalui mekanisme LPDP. Termasuk biaya kuliah, hidup, dan dana darurat, terbuka untuk berbagai bidang studi termasuk IT di dalam dan luar negeri.",
      duration: "2-4 Years",
      level: "Postgraduate",
      url: "https://lpdp.kemenkeu.go.id/en/beasiswa/umum/beasiswa-reguler-2025/",
    },
    {
      title: "Beasiswa Garuda 2025",
      description:
        "Beasiswa bergelar untuk S1 di bidang sains dan teknologi dari Kemdiktisaintek. Fokus pada pengembangan SDM unggul, terbuka untuk mahasiswa Indonesia dengan prioritas kolaborasi riset internasional.",
      duration: "4 Years",
      level: "Undergraduate",
      url: "https://beasiswagaruda.kemdiktisaintek.go.id/",
    },
    {
      title: "Beasiswa SEMESTA 2025",
      description:
        "Beasiswa penuh S1 dan S2 di bidang IT dari SEVIMA, bekerja sama dengan ITS Surabaya, BINUS University, dan kampus lain. Termasuk mentoring skill dan gaji bulanan untuk talenta terpilih.",
      duration: "4 Years (S1)",
      level: "Undergraduate to Postgraduate",
      url: "https://sevima.com/beasiswa-semesta-tahun-2025-resmi-dibuka-kuliah-gratis-s1-dan-s2-di-bidang-it/",
    },
  ];

  const techPrograms: Program[] = [
    {
      title: "Hacktiv8 Full-Stack JavaScript Bootcamp 2025",
      description:
        "Bootcamp intensif full-time selama 16 minggu untuk pemula, fokus full-stack JS dengan AI-enhanced curriculum. Termasuk job guarantee dan placement di perusahaan tech Indonesia.",
      duration: "16 Weeks",
      level: "Beginner",
      url: "https://www.hacktiv8.com/full-stack-javascript-immersive",
    },
    {
      title: "Impact Byte Full-Stack Coding Bootcamp 2025",
      description:
        "Pelatihan full-time 8 minggu full-stack JS dengan proyek real-world. Fokus karir IT, mentorship dari praktisi, dan dukungan karir untuk penyaluran kerja di industri digital.",
      duration: "8 Weeks",
      level: "Beginner",
      url: "https://impactbyte.com/",
    },
    {
      title: "DumbWays.id Coding Bootcamp 2025",
      description:
        "Bootcamp gratis full-stack dan DevOps dengan penyaluran kerja pertama. Bekali skills industri seperti web dev dan mobile, cocok untuk fresh grad dan pemula di seluruh Indonesia.",
      duration: "8-12 Weeks",
      level: "Beginner to Intermediate",
      url: "https://dumbways.id/",
    },
  ];

  const communityPrograms: Program[] = [
    {
      title: "Indonesia Mengglobal Mentorship Program 2025",
      description:
        "Mentorship gratis 3 bulan untuk calon mahasiswa S2 luar negeri. Bimbingan aplikasi universitas, beasiswa, dan funding dari mentor alumni top global universities.",
      duration: "3 Months (Sep-Nov 2025)",
      level: "All Levels",
      url: "https://indonesiamengglobal.com/mentorship/",
    },
    {
      title: "RISTEK Sisters in Tech Mentorship 2025",
      description:
        "Program mentorship tech untuk perempuan di bidang STEM, fokus AI, coding, dan networking. Terbuka internasional (ASEAN), dengan career coaching dan portfolio building.",
      duration: "Ongoing (Main: Jul 2025)",
      level: "All Levels",
      url: "https://event.ristek.cs.ui.ac.id/sistech",
    },
    {
      title: "Skill Our Future EdTech Impact Bootcamp 2025",
      description:
        "Bootcamp komunitas untuk digital skills dan youth entrepreneurship dari UNDP. Fokus underserved groups, termasuk mentorship dari industry experts dan kolaborasi ekosistem.",
      duration: "Varies (Grants until Nov 2025)",
      level: "All Levels",
      url: "https://www2.fundsforngos.org/community-development-2/skill-our-future-edtech-impact-bootcamp-2025-indonesia/",
    },
  ];

  const tabData: TabData = {
    academic: academicPrograms,
    technology: techPrograms,
    community: communityPrograms,
  };

  const filterPrograms = (programs: Program[]) => {
    return programs.filter(
      (program) =>
        program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        program.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const ProgramList = ({ programs, category }: { programs: Program[]; category: keyof TabData }) => (
    <div className="space-y-4">
      {filterPrograms(programs).map((program, index) => (
        <Reveal key={`${program.title}-${index}`} y={10} delay={index * 50}>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{program.title}</h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    {program.description}
                  </p>
                  <div className="flex gap-2 mt-3">
                    <Badge variant="outline" className="text-xs">
                      {program.duration}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {program.level}
                    </Badge>
                  </div>
                </div>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="hover:bg-primary/5 hover:text-primary transition-colors"
                >
                  <a
                    href={program.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Daftar untuk program ${program.title} di situs resmi`}
                  >
                    Register
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </Reveal>
      ))}
      {filterPrograms(programs).length === 0 && (
        <p className="text-center text-muted-foreground mt-4">
          No programs match your search. Try another keyword.
        </p>
      )}
    </div>
  );

  return (
    <Section className={className}>
      <div className="container max-w-4xl">
        <div className="text-center mb-12">
          <Reveal y={16}>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              INFO PROGRAM
            </h2>
          </Reveal>
          <Reveal y={16} delay={100}>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              Informasi mengenai beasiswa, bootcamp, pelatihan, dan berbagai
              peluang pengembangan diri di bidang IT dan teknologi. Dengan ini, siapa pun dapat
              terus mengikuti update terkini untuk mendukung prestasi dan karier
              di masa depan.
            </p>
          </Reveal>
        </div>
        <Tabs defaultValue="academic" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="academic">Academic</TabsTrigger>
            <TabsTrigger value="technology">Technology</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
          </TabsList>
          <div className="mt-6">
            <Input
              placeholder="Search programs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md mx-auto mb-6"
            />
          </div>
          <TabsContent value="academic" className="mt-8">
            <ProgramList programs={tabData.academic} category="academic" />
          </TabsContent>
          <TabsContent value="technology" className="mt-8">
            <ProgramList programs={tabData.technology} category="technology" />
          </TabsContent>
          <TabsContent value="community" className="mt-8">
            <ProgramList programs={tabData.community} category="community" />
          </TabsContent>
        </Tabs>
      </div>
    </Section>
  );
}