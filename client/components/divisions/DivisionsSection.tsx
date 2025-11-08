import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface DivisionsSectionProps {
  className?: string;
}

function Section({
  className,
  children,
}: React.PropsWithChildren<{ className?: string }>) {
  return <section className={cn("py-16 md:py-24", className)}>{children}</section>;
}

export default function DivisionsSection({ className }: DivisionsSectionProps) {
  const divisions = [
    {
       name: "Divisi Kremas",
      fullName: "Divisi Kreativitas dan Seni Digital",
      description: "Kembangkan potensi dan kreativitas mahasiswa melalui program inspiratif, pelatihan, dan apresiasi karya. Berperan aktif dalam membangun lingkungan kampus yang produktif, inovatif, dan berprestasi.",
      head: "M Rabbani Razaq",
      members: 4,
     
responsibilities: [
  "Merancang dan melaksanakan program pengembangan potensi mahasiswa",
  "Menyelenggarakan seminar, pelatihan, dan kompetisi untuk peningkatan prestasi",
  "Memberi apresiasi dan publikasi terhadap karya mahasiswa berprestasi",
  "Membina serta menyalurkan kreativitas mahasiswa melalui berbagai media kampus",
  "Mendorong budaya berpikir inovatif dan kolaboratif di lingkungan fakultas"
],
      programs: [
        "Career Path Series",
        "BINPRESMA Binaan Prestasi Mahasiswa",
        "Showup",
        "RAME Ruang Materi"
      ],
      image: "/assets/divisions/kremas.png",
      color: "from-indigo-500/20 to-purple-500/20",
    },
    {
    name: "Divisi Netkomas",
      fullName: "Divisi Networking dan Komunikasi",
     description: "Bangun koneksi, perluas jaringan, dan kelola citra digital FILKOM. Humas berperan sebagai jembatan komunikasi antara BEM, mahasiswa, alumni, dan mitra eksternal melalui publikasi, kolaborasi, dan kegiatan interaktif.",
      head: "M Ray Putra",
      members: 5,
     
responsibilities: [
  "Menjalin kerja sama dengan organisasi atau pihak eksternal",
  "Mengelola publikasi dan informasi resmi BEM serta fakultas",
  "Meningkatkan engagement dan citra digital FILKOM",
  "Mengadakan kegiatan networking dengan alumni dan praktisi IT",
  "Mendukung promosi event dan kolaborasi strategis kampus"
],
      programs: [
        "Gathering Komunitas Tech",
        "Netkomas Connect",
        "Workshop Pengembangan Skill",
        "Networking Day"
      ],
      image: "/assets/divisions/netkomas.png",
      color: "from-blue-500/20 to-cyan-500/20",
    },
    {
       name: "Divisi Peninfo",
      fullName: "Divisi Penelitian dan Informasi",
   description: "Kelola informasi dan konten kreatif BEM FILKOM mulai dari dokumentasi kegiatan hingga edukasi digital. Sebarkan informasi dan inspirasi lewat desain, multimedia, dan komunikasi yang menarik.",

      head: "M Faatih Farhan",
      members: 5,
     responsibilities: [
  "Dokumentasikan kegiatan BEM FILKOM",
  "Kelola konten dan publikasi di media sosial",
  "Desain poster dan materi publikasi",
  "Bagikan informasi dan edukasi melalui konten kreatif",
  "Selenggarakan workshop seputar multimedia"
],

      programs: [
        "Dokumentasi kegiatan BEM FILKOM",
        "Education Feed Instagram",
        "Education Poster Mading",
        "Reels/Meme Instagram",
        "Poster Event/Perayaan",
        
      ],
      image: "/assets/divisions/peninfo.png",
      color: "from-green-500/20 to-emerald-500/20",
    },
    {
      name: "Divisi Himpunan",
      fullName: "Divisi Himpunan Mahasiswa",
     description: "Bangun kader yang berkualitas dan solid melalui pembinaan, rekrutmen, serta peningkatan kualitas pengurus. Fokus pada pengembangan kepemimpinan, profesionalisme, dan keharmonisan internal organisasi.",
      head: "Arjuna Aulia Ghifari",
      members: 4,
     
responsibilities: [
  "Merancang dan melaksanakan kegiatan kaderisasi untuk calon anggota",
  "Mengelola proses rekrutmen serta administrasi keanggotaan Himpunan",
  "Melakukan monitoring dan evaluasi kinerja pengurus secara berkala",
  "Meningkatkan profesionalisme dan tanggung jawab setiap anggota aktif",
  "Menyelenggarakan kegiatan internal relations dan team building untuk mempererat kekompakan organisasi"
],
      programs: [
        "Kaderisasi dan Pembinaan Anggota",
        "Manajemen Keanggotaan dan Rekrutmen",
        "Peningkatan Kualitas Pengurus",
        "Internal Relations dan Team Building"
      ],
      image: "/assets/divisions/himpunan.png",
      color: "from-orange-500/20 to-red-500/20",
    },
  ];

  return (
    <Section className={cn("relative", className)}>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,hsl(var(--primary)/0.06),transparent_70%)]" />
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Divisi-Divisi</h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
           Setiap divisi memiliki spesialisasi unik dan berkolaborasi untuk program holistik yang mendukung visi FILKOM, dari kreativitas hingga riset berkelanjutan.
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-4">
          {divisions.map((division, index) => (
            <Card key={division.name} className="h-full overflow-hidden">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={division.image}
                  alt={division.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  aria-label={`Gambar Divisi ${division.name}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <CardTitle className="text-white text-xl drop-shadow-lg">{division.name}</CardTitle>
                  <CardDescription className="text-white/90 text-sm drop-shadow-lg">
                    {division.fullName}
                  </CardDescription>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="secondary" className="text-xs bg-white/20 text-white border-white/30">
                      {division.members} Anggota
                    </Badge>
                    <Badge variant="outline" className="text-xs bg-white/20 text-white border-white/30">
                      Ketua: {division.head}
                    </Badge>
                  </div>
                </div>
              </div>

              <CardContent className="p-6 space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {division.description}
                </p>

                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Tanggung Jawab Utama:</h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {division.responsibilities.map((responsibility, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{responsibility}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Program Unggulan:</h4>
                    <div className="flex flex-wrap gap-1">
                      {division.programs.map((program, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {program}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}