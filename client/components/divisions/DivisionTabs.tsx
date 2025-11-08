import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface DivisionTabsProps {
  className?: string;
}

function Section({
  className,
  children,
}: React.PropsWithChildren<{ className?: string }>) {
  return <section className={cn("py-16 md:py-24", className)}>{children}</section>;
}

export default function DivisionTabs({ className }: DivisionTabsProps) {
  const kremasMembers = [
    { name: "Muhammad Rabbani Razaq", role: "Kepala Divisi", year: "2025" },
    { name: "Arief Hidayatullah", role: "Anggota Divisi", year: "2025" },
    { name: "Haikal Hidayat", role: "Anggota Divisi", year: "2025" },
    { name: "Ali Imannudin", role: "Anggota Divisi", year: "2025" },
  ];

  const netkomasMembers = [
    { name: "Muhammad Ray Putra", role: "Kepala Divisi", year: "2025" },
    { name: "Hilmi Ahmad Kamil", role: "Anggota Divisi", year: "2025" },
    { name: "Muhammad Barez Sapado Siregar", role: "Anggota Divisi", year: "2025" },
    { name: "Muhammad Pratama Rizky", role: "Anggota Divisi", year: "2025" },
    { name: "Sulis Sri Utami", role: "Anggota Divisi", year: "2025"},
  ];

  const peninfoMembers = [
    { name: "Muhammad Faatih Farhaan", role: "Kepala Divisi", year: "2025" },
    { name: "Ayi Reja Ardani", role: "Anggota Divisi", year: "2025" },
    { name: "Alfatir Muhammad Syafur", role: "Anggota Divisi", year: "2025" },
    { name: "Fadli Resmanda", role: "Anggota Divisi", year: "2025" },
    { name: "Suci Adri Avrillia", role: "Anggota Divisi", year: "2025" },
  ];

  const himpunanMembers = [
    { name: "Arjuna Aulia Ghifari", role: "Kepala Divisi", year: "2025" },
    { name: "Anggun Rahmadani", role: "Anggota Divisi", year: "2025" },
    { name: "Amanda Neisya Yulyana", role: "Anggota Divisi", year: "2025" },
    { name: "Siti Raudha Al-Zahra", role: "Anggota Divisi", year: "2025" },
    { name: "Arjuna Aulia Ghifari", role: "Anggota Divisi", year: "2025" },

  ];

  const MemberList = ({ members }: { members: any[] }) => (
    <div className="space-y-3">
      {members.map((member, index) => (
        <Card key={member.name} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{member.name}</h3>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                </div>
              </div>
              <Badge variant="outline" className="text-xs">
                {member.year}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <Section className={className}>
      <div className="container max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Anggota Divisi</h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Temui talenta penuh passion yang pimpin & gerakkan setiap divisi dengan dedikasi & keahlian Pancadarma.
          </p>
        </div>
        <Tabs defaultValue="kremas" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="kremas">Kremas</TabsTrigger>
            <TabsTrigger value="netkomas">Netkomas</TabsTrigger>
            <TabsTrigger value="peninfo">Peninfo</TabsTrigger>
            <TabsTrigger value="himpunan">Himpunan</TabsTrigger>
          </TabsList>
          <TabsContent value="kremas" className="mt-8">
            <MemberList members={kremasMembers} />
          </TabsContent>
          <TabsContent value="netkomas" className="mt-8">
            <MemberList members={netkomasMembers} />
          </TabsContent>
          <TabsContent value="peninfo" className="mt-8">
            <MemberList members={peninfoMembers} />
          </TabsContent>
          <TabsContent value="himpunan" className="mt-8">
            <MemberList members={himpunanMembers} />
          </TabsContent>
        </Tabs>
      </div>
    </Section>
  );
}