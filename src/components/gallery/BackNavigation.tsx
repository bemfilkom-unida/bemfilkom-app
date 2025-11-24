import Link from "next/link";

interface BackNavigationProps {
  className?: string;
}

export default function BackNavigation({ className }: BackNavigationProps) {
  return (
    <div className={className}>
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="text-accent underline-offset-4 hover:underline"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}