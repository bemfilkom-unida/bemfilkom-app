import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LocationMap() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Lokasi</CardTitle>
        <CardDescription>
          Temui Kami di Universitas Djuanda.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full rounded-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.9382309549555!2d106.84977649999999!3d-6.654578499999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c95387c8d3eb%3A0x941f12ea770a2c9e!2sDjuanda%20University!5e0!3m2!1sen!2sid!4v1759589847287!5m2!1sen!2sid"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </CardContent>
    </Card>
  );
}