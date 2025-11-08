import { Link } from "react-router-dom";

interface BackNavigationProps {
  className?: string;
}

export default function BackNavigation({ className }: BackNavigationProps) {
  return (
    <div className={className}>
      <div className="flex items-center gap-3">
        <Link
          to="/"
          className="text-accent underline-offset-4 hover:underline"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}