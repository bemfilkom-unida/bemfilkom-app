import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapPin, Mail, Phone, Clock } from "lucide-react";

export default function ContactInfo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informasi Kontak</CardTitle>
        <CardDescription>
          Hubungi kami melalui kontak berikut.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
          <span>Fakultas Ilmu Komputer, Universitas Djuanda, Bogor</span>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-primary" aria-hidden="true" />
          <span>bem.filkom@unida.ac.id</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-primary" aria-hidden="true" />
          <span>+62 882‑9199‑1658 (Hilmi)</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-primary" aria-hidden="true" />
          <span>Mon–Fri, 09:00–17:00 WIB</span>
        </div>
      </CardContent>
    </Card>
  );
}