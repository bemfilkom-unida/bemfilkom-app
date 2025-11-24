import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { FadeIn, SlideInRight } from "@/components/effects";

interface ContactFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  submitting: boolean;
  status: string | null;
}

export default function ContactForm({ onSubmit, submitting, status }: ContactFormProps) {
  const getStatusClass = (message: string) => {
    if (message.includes("Failed") || message.includes("Please") || message.includes("Error")) return "text-destructive";
    if (message.includes("✅")) return "text-green-600 font-semibold";
    return "text-green-600";
  };

  return (
    <FadeIn delay={0}>
      <Card>
        <CardHeader>
          <CardTitle>Kirim Pesan Disini</CardTitle>
          <CardDescription>
            Isi formulir dan kami akan menghubungi anda kembali
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <SlideInRight delay={100}>
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" placeholder="Your name" required />
                </div>
              </SlideInRight>
              <SlideInRight delay={200}>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="you@example.com" required />
                </div>
              </SlideInRight>
            </div>
            <SlideInRight delay={300}>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" name="subject" placeholder="Subject" />
              </div>
            </SlideInRight>
            <SlideInRight delay={400}>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Your message..."
                  className="min-h-[140px]"
                  required
                />
              </div>
            </SlideInRight>
            {status && (
              <p className={`text-sm ${getStatusClass(status)}`} aria-live="polite">
                {status}
              </p>
            )}
            <SlideInRight delay={500}>
              <Button type="submit" disabled={submitting} className="bg-primary text-primary-foreground w-full">
                {submitting ? "Sending..." : "Send Message"}
              </Button>
            </SlideInRight>
          </form>
        </CardContent>
      </Card>
    </FadeIn>
  );
}