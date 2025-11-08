import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ExecutiveBoardProps {
  className?: string;
}

function Section({
  className,
  children,
}: React.PropsWithChildren<{ className?: string }>) {
  return <section className={cn("py-16 md:py-24", className)}>{children}</section>;
}

export default function ExecutiveBoard({ className }: ExecutiveBoardProps) {
  const leadershipPairs = [
    {
      group: "Duo Kepemimpinan",
      names: ["Muhammad Sahrullah Nursa'ban", "Aulia Alhafidz"],
      positions: ["Ketua Umum & Wakil"],
      roles: ["Pemimpin Visi", "Pendukung Operasional"],
      images: ["assets/divisions/ketum.webp"],
      color: "from-blue-500/20 to-cyan-500/20",
    },
    {
      group: "Duo Sekretariat",
      names: ["Nayla Awalia Syafitri", "Arinda Setyo Rini"],
      positions: ["Sekretaris 1 & 2"],
      roles: ["Pengelola Dokumentasi"],
      images: ["/assets/divisions/sekre-bem.jpeg"],
      color: "from-green-500/20 to-emerald-500/20",
    },
    {
      group: "Bendahara",
      names: ["Abilpa Siti Kholifah"],
      positions: ["Bendahara"],
      roles: ["Pengelola Keuangan"],
      images: ["/assets/divisions/bendahara.jpeg"],
      color: "from-orange-500/20 to-red-500/20",
    },
  ];

  return (
    <Section className={className}>
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Dewan Eksekutif</h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
        Tim eksekutif yang mengelola operasional harian untuk mendukung program BEM FILKOM.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-3">
          {leadershipPairs.map((pair, index) => (
            <Card key={pair.group} className="h-full">
              <CardHeader className="text-center">
                <div className="flex flex-col items-center md:flex-row gap-2 mb-4 justify-center">
                  {pair.images.map((imgSrc, imgIdx) => (
                    <div
                      key={imgIdx}
                      className={cn(
                        "aspect-[3/3] w-64 md:w-52 h-auto overflow-hidden rounded-lg bg-gradient-to-br",
                        pair.color,
                        "flex-shrink-0 border border-border/50"
                      )}
                      aria-label={`Foto ${pair.names[imgIdx]}`}
                    >
                      <img
                        src={imgSrc}
                        alt={`${pair.names[imgIdx]} - ${pair.positions[imgIdx] || pair.positions[0]}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
                <div className="space-y-1">
                  {pair.names.map((name, idx) => (
                    <CardTitle key={idx} className="text-lg leading-tight">{name}</CardTitle>
                  ))}
                </div>
                <div className="space-y-1">
                  {pair.positions.map((position, idx) => (
                    <CardDescription key={idx} className="font-medium text-primary">{position}</CardDescription>
                  ))}
                </div>
                <Badge variant="secondary" className="w-fit mx-auto text-xs">
                  {pair.roles.join(" & ")}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                   {/*  deskripsi */}
                </p>
               
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}