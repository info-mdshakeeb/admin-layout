import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <div className=" flex items-center gap-3  sm:gap-4 w-full">
      <h1 className="text-base font-medium">Documents</h1>
      <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
          <a
            href="https://github.com/shadcn-ui/ui/tree/main/apps/v4/app/(examples)/dashboard"
            rel="noopener noreferrer"
            target="_blank"
            className="dark:text-foreground"
          >
            GitHub
          </a>
        </Button>
      </div>
    </div>
  );
}
