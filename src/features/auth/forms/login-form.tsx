"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { authClient } from "@/lib/auth-client";
import { IconBrandGithub, IconBrandGooglePlay } from "@tabler/icons-react";
import Link from "next/link";
import { toast } from "sonner";

const loginFormSchema = z.object({
  email: z.email().min(1, "Email is required"),
  password: z.string().min(8),
});

export type ILoginForm = z.infer<typeof loginFormSchema>;

export function LoginForm({}: { callbackUrl?: string }) {
  const form = useForm<ILoginForm>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: ILoginForm) => {
    await authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
      },
      {
        onError: (error) => {
          toast.error(error.error.message);
        },
      }
    );
  };

  useEffect(() => {
    const subscription = form.watch((_value, { name }) => {
      if (name === "password" && form.formState.errors.email) {
        form.clearErrors("email");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [form]);

  const { isSubmitting } = form.formState;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset disabled={isSubmitting} className="space-y-3">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    placeholder="skb@example.com"
                    className="border-border bg-background text-foreground"
                    {...field}
                  />
                </FormControl>

                <FormMessage className="">
                  <span className="text-muted-foreground">
                    We&apos;ll never share your email with anyone else.
                  </span>
                </FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between">
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Button variant="link" type="button" size="sm" asChild>
                    <Link
                      href="/auth/recover"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      Forgot your password?
                    </Link>
                  </Button>
                </div>
                <FormControl>
                  <PasswordInput
                    id="password"
                    placeholder="••••••"
                    autoComplete="current-password"
                    className="border-border bg-background text-foreground"
                    {...field}
                  />
                </FormControl>
                <FormMessage>
                  <span className="text-muted-foreground">
                    Your password must be at least 8 characters long.
                  </span>
                </FormMessage>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            disabled={isSubmitting}
          >
            {isSubmitting && <Loader className="mr-2 h-4 w-4 animate-spin" />}
            Login
          </Button>

          <div className="relative text-center text-sm text-muted-foreground">
            <span
              className="absolute inset-0 top-1/2 border-t border-border"
              aria-hidden="true"
            />
            <span className="relative bg-background px-2">Or</span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Button variant="outline" type="button" className="w-full">
              <IconBrandGooglePlay size={18} />
              Continue with Google
            </Button>
            <Button variant="outline" type="button" className="w-full">
              <IconBrandGithub size={18} />
              Continue with GitHub
            </Button>
          </div>
        </fieldset>
      </form>
    </Form>
  );
}
