'use client';

import Layout from '@/components/layout/Layout';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Globe, Github } from "lucide-react";
import Image from "next/image";
import projectsData from "@/data/projects.json";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/effects";

export default function GalleryPage() {
  return (
    <Layout>
      <div className="py-16 md:py-24">
        <div className="w-full px-4 md:px-8 lg:px-12">
          {/* Header Section */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <FadeIn delay={0}>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                Hasil Karya LDKM Angkatan 2025
              </h1>
              <p className="text-xl text-muted-foreground">
                Showcase hasil inovasi dan kreativitas mahasiswa FILKOM dalam pengembangan teknologi web dan aplikasi.
              </p>
            </FadeIn>
          </div>

          {/* Projects List */}
          <StaggerContainer delay={200} className="flex flex-col gap-12 w-full">
            {projectsData.map((project, index) => (
              <StaggerItem key={index} className="w-full">
                <Card className="flex flex-col md:flex-row overflow-hidden group hover:shadow-xl transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm h-[60vh] md:h-[70vh]">
                  {/* Image Section - Maximized */}
                  <div className="relative w-full md:w-[70%] h-full overflow-hidden bg-muted border-b md:border-b-0 md:border-r border-border/50">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      priority={index < 2}
                      loading={index < 2 ? "eager" : "lazy"}
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 70vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                  </div>

                  {/* Content Section */}
                  <div className="flex flex-col justify-center p-6 md:p-10 md:w-[30%] h-full">
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant="outline" className="text-sm px-3 py-1 font-normal">
                          {project.author}
                        </Badge>
                        <Globe className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <h3 className="text-3xl md:text-4xl font-bold group-hover:text-primary transition-colors mb-2">
                        {project.title}
                      </h3>
                    </div>

                    <p className="text-lg text-muted-foreground mb-8 leading-relaxed line-clamp-6">
                      {project.description}
                    </p>

                    <div className="flex flex-col gap-3 mt-auto">
                      <Button asChild size="lg" className="w-full text-lg h-12 gap-3 group-hover:bg-primary/90">
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center"
                        >
                          Kunjungi Website
                          <ExternalLink className="h-5 w-5 ml-2" />
                        </a>
                      </Button>
                      <Button asChild variant="outline" size="lg" className="w-full text-lg h-12 gap-3">
                        <a
                          href={project.repo || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center"
                        >
                          GitHub Repository
                          <Github className="h-5 w-5 ml-2" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </Layout>
  );
}