import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BASE_URL } from '@/lib/constants';

interface BreadcrumbsProps {
  items: { label: string; path: string; active?: boolean }[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  const location = useLocation();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": BASE_URL
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": item.label,
        "item": `${BASE_URL}${item.path}`
      }))
    ]
  };

  return (
    <nav className={cn("flex items-center gap-2 mb-8", className)} aria-label="Breadcrumb">
      {/* Breadcrumb Schema */}
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>

      <Link 
        to="/" 
        className="p-1.5 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
      >
        <Home className="h-4 w-4" />
      </Link>
      
      {items.map((item, index) => (
        <div key={item.path} className="flex items-center gap-2">
          <ChevronRight className="h-4 w-4 text-muted-foreground/30" />
          {item.active ? (
            <span className="text-sm font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">
              {item.label}
            </span>
          ) : (
            <Link
              to={item.path}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
