import { GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";

import { LoginForm } from "@/features/auth/forms/login-form";

export default async function login() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2">
        <a href="#" className="flex flex-col items-center gap-2 font-medium">
          <div className="flex size-8 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-6" />
          </div>
          <span className="sr-only">Acme Inc.</span>
        </a>
        <h1 className="text-xl font-bold">Welcome to Acme Inc.</h1>
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="underline underline-offset-4">
            Register
          </Link>
        </div>
      </div>

      <LoginForm />
    </div>
  );
}
