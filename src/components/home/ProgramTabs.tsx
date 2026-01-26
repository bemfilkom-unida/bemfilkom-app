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
      title: "Beasiswa LPDP Reguler Tahap 1 2026",
      description:
        "Beasiswa magister (S2) dan doktor (S3) untuk WNI, full biaya kuliah + hidup + buku + dana penelitian + asuransi. Prioritas bidang STEM termasuk AI, Data Science, Cybersecurity. Dibuka Jan-Feb 2026.",
      duration: "2–4 Tahun",
      level: "S2 / S3",
      url: "https://lpdp.kemenkeu.go.id/beasiswa-reguler-2026/",
    },
    {
      title: "Beasiswa Unggulan Kemendikbudristek 2026",
      description:
        "Beasiswa S1, S2, S3 dalam negeri & luar negeri untuk calon pemimpin bangsa. Fokus riset teknologi & inovasi digital. Termasuk biaya hidup, buku, dan tunjangan penelitian.",
      duration: "4–5 Tahun (S1), 2–4 Tahun (S2/S3)",
      level: "S1 / S2 / S3",
      url: "https://beasiswaunggulan.kemdikbud.go.id/",
    },
    {
      title: "Beasiswa SEMESTA Batch 2 2026 – SEVIMA & Kampus Mitra",
      description:
        "Beasiswa full S1/S2 IT & Data Science di ITS, BINUS, Telkom University, dll. Termasuk biaya kuliah, hidup, laptop, mentoring karir, dan gaji magang bulanan.",
      duration: "4 Tahun (S1), 2 Tahun (S2)",
      level: "S1 / S2",
      url: "https://sevima.com/beasiswa-semesta-2026/",
    },
  ];

  const techPrograms: Program[] = [
    {
      title: "Belajar Dasar Pemrograman Web - Dicoding",
      description:
        "Kelas gratis & bersertifikat untuk pemula. Pelajari HTML, CSS, dan JavaScript dasar. Cocok untuk mahasiswa FILKOM yang baru mulai web development.",
      duration: "Self-paced (~20 jam)",
      level: "Pemula",
      url: "https://www.dicoding.com/academies/123",
    },
    {
      title: "Menjadi Front-End Web Developer Expert - Dicoding",
      description:
        "Kelas expert Dicoding dengan proyek real-world (React, Next.js, Tailwind, PWA). Sertifikat resmi + portofolio siap kerja. Banyak alumni diterima di startup besar.",
      duration: "Self-paced (~120 jam)",
      level: "Menengah",
      url: "https://www.dicoding.com/academies/261",
    },
    {
      title: "Belajar Machine Learning untuk Pemula - Dicoding",
      description:
        "Kelas ML dasar dengan TensorFlow/Keras. Cocok untuk mahasiswa IT yang ingin masuk AI/Data Science. Termasuk proyek prediksi & klasifikasi.",
      duration: "Self-paced (~40 jam)",
      level: "Pemula → Menengah",
      url: "https://www.dicoding.com/academies/184",
    },
    {
      title: "Google IT Support Professional Certificate (via Dicoding)",
      description:
        "Sertifikasi internasional Google via Dicoding. Fokus troubleshooting, networking, OS, security. Cocok untuk karir IT Support atau entry-level tech.",
      duration: "Self-paced (~6 bulan)",
      level: "Pemula",
      url: "https://www.dicoding.com/certifications/google-it-support",
    },
    {
      title: "Cloud Practitioner Essentials - Dicoding x AWS",
      description:
        "Kelas cloud computing dasar dengan AWS. Pelajari EC2, S3, Lambda, dan konsep cloud. Sertifikat AWS + Dicoding, siap uji coba AWS Cloud Practitioner.",
      duration: "Self-paced (~30 jam)",
      level: "Pemula",
      url: "https://www.dicoding.com/academies/390",
    },
  ];

  const communityPrograms: Program[] = [
    {
      title: "Indonesia Mengglobal Mentorship Cohort 2026",
      description:
        "Mentorship 4 bulan gratis untuk aplikasi S2/S3 luar negeri. Bimbingan essay, CV, LoR, dan beasiswa dari mentor alumni Harvard, Stanford, Oxford, dll.",
      duration: "4 Bulan (Feb–Mei 2026)",
      level: "Semua Tingkat",
      url: "https://indonesiamengglobal.com/mentorship-2026/",
    },
    {
      title: "RISTEK UI Sisters in Tech Mentorship 2026",
      description:
        "Mentorship khusus perempuan di tech (AI, Data, Software Eng). Termasuk career talk, project guidance, dan networking dengan praktisi dari Google, Microsoft, Gojek.",
      duration: "Ongoing (Batch utama: Mar 2026)",
      level: "Semua Tingkat",
      url: "https://ristek.cs.ui.ac.id/sistech",
    },
    {
      title: "Google for Startups Campus Indonesia – Women in Tech Program 2026",
      description:
        "Program komunitas + mentorship untuk perempuan di startup/tech. Termasuk workshop AI, cloud, leadership, dan akses ke Google Cloud Credits + funding pitch.",
      duration: "6–12 Bulan",
      level: "Semua Tingkat",
      url: "https://startup.google.com/programs/campus/indonesia/",
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
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{program.title}</h3>
                  <p className="text-muted-foreground text-sm mt-1 leading-relaxed">
                    {program.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
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
                  className="hover:bg-primary/5 hover:text-primary transition-colors shrink-0"
                >
                  <a
                    href={program.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Daftar untuk ${program.title}`}
                  >
                    Daftar
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </Reveal>
      ))}
      {filterPrograms(programs).length === 0 && (
        <p className="text-center text-muted-foreground mt-8 py-8">
          Tidak ada program yang cocok dengan pencarian. Coba kata kunci lain.
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
              INFO PROGRAM 2026
            </h2>
          </Reveal>
          <Reveal y={16} delay={100}>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              Update terkini beasiswa, bootcamp, pelatihan, dan peluang pengembangan diri di bidang IT & teknologi. Ikuti terus untuk mendukung karier dan prestasi masa depanmu.
            </p>
          </Reveal>
        </div>

        <Tabs defaultValue="academic" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="academic">Academic</TabsTrigger>
            <TabsTrigger value="technology">Technology</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
          </TabsList>

          <Input
            id="program-search"
            name="program-search"
            placeholder="Cari program..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md mx-auto mb-8"
          />

          <TabsContent value="academic">
            <ProgramList programs={tabData.academic} category="academic" />
          </TabsContent>
          <TabsContent value="technology">
            <ProgramList programs={tabData.technology} category="technology" />
          </TabsContent>
          <TabsContent value="community">
            <ProgramList programs={tabData.community} category="community" />
          </TabsContent>
        </Tabs>
      </div>
    </Section>
  );
}