"use client";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import { SidebarTrigger } from "../ui/sidebar";

type HeaderProps = React.HTMLAttributes<HTMLElement> & {
  fixed?: boolean;
};
export function Header({ className, fixed, children, ...props }: HeaderProps) {
  // const offsetW = useScrollOffset(".wrapper-body");
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setOffset(
        document.body.scrollTop ||
          document.documentElement.scrollTop ||
          window.scrollY
      );
    };

    // Add scroll listener to the body
    document.addEventListener("scroll", onScroll, { passive: true });

    // Clean up the event listener on unmount
    return () => document.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-layout-header={fixed ? "fixed" : "auto"}
      className={cn(
        "z-50 h-16",
        offset > 10 &&
          fixed &&
          "sticky top-0 w-inherit rounded-t-2xl border-b bg-background peer/header",
        // offsetW > 15 &&
        // "group-data-[layout=fixed]/layout:border-b",
        "group-data-[layout=fixed]/layout:bg-background",
        className
      )}
      {...props}
    >
      <div className="relative flex h-full items-center gap-3 p-4 sm:gap-4">
        <SidebarTrigger variant="outline" className="max-md:scale-125" />
        <Separator orientation="vertical" className="h-6" />
        {children}
      </div>
    </header>
  );
}
