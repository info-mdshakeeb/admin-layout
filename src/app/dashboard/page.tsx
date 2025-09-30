"use client";
import { SiteHeader } from "@/components/site-header";

import { Header } from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import { Wrapper } from "@/components/layout/wrapper";

export default function Page() {
  return (
    <Wrapper fixed>
      <Header>
        <SiteHeader />
      </Header>

      <Main shadow>
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6"></div>
        </div>
      </Main>
    </Wrapper>
  );
}
