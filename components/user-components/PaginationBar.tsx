import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

export function PaginationBar({
  currentPage,
  totalPages,
  baseUrl,
}: PaginationProps) {
  const getPaginationItems = () => {
    let items = [];

    // Previous button
    if (currentPage > 1) {
      items.push(
        <PaginationItem key="previous">
          <Link
            href={`${baseUrl}?page=${currentPage - 1}`}
            className="flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="ml-1 hidden sm:inline-block">Previous</span>
          </Link>
        </PaginationItem>
      );
    }

    // Add page numbers dynamically, showing ellipses when needed
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        items.push(
          <PaginationItem key={i}>
            <Link
              href={`${baseUrl}?page=${i}`}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
                i === currentPage
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-transparent"
              )}
            >
              {i}
            </Link>
          </PaginationItem>
        );
      } else if (
        (i === currentPage - 2 && i > 1) ||
        (i === currentPage + 2 && i < totalPages)
      ) {
        items.push(
          <PaginationItem key={`ellipsis-${i}`}>
            <span className="flex h-9 w-9 items-center justify-center">
              <span className="sr-only">More pages</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <circle cx="12" cy="12" r="1" />
                <circle cx="19" cy="12" r="1" />
                <circle cx="5" cy="12" r="1" />
              </svg>
            </span>
          </PaginationItem>
        );
      }
    }

    // Next button
    if (currentPage < totalPages) {
      items.push(
        <PaginationItem key="next">
          <Link
            href={`${baseUrl}?page=${currentPage + 1}`}
            className="flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            <span className="mr-1 hidden sm:inline-block">Next</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <Pagination className="my-8">
      <PaginationContent>{getPaginationItems()}</PaginationContent>
    </Pagination>
  );
}
