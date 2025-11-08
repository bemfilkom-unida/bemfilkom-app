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
      "Beasiswa penuh untuk S2/S3 di bidang ilmu komputer dan TI, prioritas mahasiswa Jabodetabek seperti UI/Binus. Termasuk biaya hidup dan tiket pesawat.",
    duration: "2-4 Years",
    level: "Postgraduate",
    url: "https://lpdp.kemenkeu.go.id/en/beasiswa/umum/beasiswa-reguler-2025/",
  },
  {
    title: "Beasiswa Garuda 2025",
    description:
      "Beasiswa bergelar untuk prestasi di ilmu komputer, data science, dan TI. Terbuka untuk mahasiswa S1/S2 di universitas Jabodetabek, dengan kuota nasional.",
    duration: "1-3 Years",
    level: "Undergraduate to Postgraduate",
    url: "https://beasiswagaruda.kemdiktisaintek.go.id/",
  },
  {
    title: "Beasiswa BIMAN (Bina Pemuda Nusantara) 2025 - UI",
    description:
      "Beasiswa untuk mahasiswa UI Fakultas Ilmu Komputer di Depok/Jakarta, fokus pengembangan kepemimpinan IT. Kuota 10 orang dengan dukungan finansial penuh.",
    duration: "1 Year",
    level: "Undergraduate",
    url: "https://kemahasiswaan.ui.ac.id/penawaran-beasiswa-biman-bina-pemuda-nusantara-tahun-2025-2026/",
  },
];

 const techPrograms: Program[] = [
  {
    title: "Hacktiv8 Full-Stack JavaScript Bootcamp 2025",
    description:
      "Bootcamp intensif di Jakarta untuk full-stack dev dengan AI-enhanced curriculum. Termasuk job guarantee dan placement di perusahaan tech Jabodetabek.",
    duration: "12 Weeks",
    level: "Beginner",
    url: "https://www.hacktiv8.com/full-stack-javascript-immersive",
  },
  {
    title: "Impact Byte Full-Stack Coding Bootcamp 2025",
    description:
      "Pelatihan full-stack JS dengan proyek real-world di Jakarta/Tangerang. Fokus karir IT, dengan mentorship dari praktisi industri lokal.",
    duration: "8 Weeks",
    level: "Beginner",
    url: "https://impactbyte.com/",
  },
  {
    title: "DumbWays.id Coding Bootcamp 2025",
    description:
      "Bootcamp coding di Jakarta dengan penyaluran kerja pertama. Bekali skills industri IT seperti web dev dan mobile, cocok untuk fresh grad Jabodetabek.",
    duration: "4 Months",
    level: "Beginner to Intermediate",
    url: "https://dumbways.id/",
  },
];

  const communityPrograms: Program[] = [
  {
    title: "Indonesia Mengglobal Mentorship Program 2025",
    description:
      "Mentorship gratis 3 bulan untuk mahasiswa IT Jabodetabek yang mau studi abroad. Bimbingan aplikasi beasiswa dan funding dari mentor berpengalaman.",
    duration: "3 Months",
    level: "All Levels",
    url: "https://indonesiamengglobal.com/mentorship/",
  },
  {
    title: "RISTEK Sisters in Tech Mentorship 2025 - UI",
    description:
      "Program mentorship tech untuk mahasiswa perempuan IT di UI Depok/Jakarta. Fokus AI, coding, dan networking komunitas CS UI.",
    duration: "Ongoing",
    level: "All Levels",
    url: "https://cerebrum.ristek.cs.ui.ac.id/",
  },
  {
    title: "Exclusive Mentorship Class 2025 - Tech Community Jakarta",
    description:
      "Kelas mentorship gratis 1-on-5 dengan 15 mentor IT berpengalaman di Jakarta. Cocok untuk mahasiswa yang mau boost karir di ekosistem tech Jabodetabek.",
    duration: "3-6 Months",
    level: "Intermediate",
    url: "https://www.instagram.com/p/DIkfh3Ryn61/",  // Link IG resmi, bisa diarahkan ke form daftar
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
        program.description.toLowerCase().includes(searchQuery.toLowerCase()),
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
              INFO FILKOM
            </h2>
          </Reveal>
          <Reveal y={16} delay={100}>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              Informasi mengenai beasiswa, bootcamp, pelatihan, dan berbagai
              peluang pengembangan diri. Dengan ini mahasiswa dapat
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