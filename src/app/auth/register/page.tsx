import { GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";

import { RegisterForm } from "@/features/auth/forms/register-form";

export default function RegisterPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2">
        <a href="#" className="flex flex-col items-center gap-2 font-medium">
          <div className="flex size-8 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-6" />
          </div>
          <span className="sr-only">Acme Inc.</span>
        </a>
        <h1 className="text-xl font-bold">Create your account</h1>
        <div className="text-center text-sm">
          Already registered?{" "}
          <Link href="/auth/login" className="underline underline-offset-4">
            Login
          </Link>
        </div>
      </div>

      <RegisterForm />
    </div>
  );
}
