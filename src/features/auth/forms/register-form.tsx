"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
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
import { toast } from "sonner";
import { SocialAuthButtons } from "../components/social-auth-buttons";

const registerFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(64, { message: "Name must be 64 characters or fewer." }),
  email: z.email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .trim()
    .min(6, { message: "Password must be at least 6 characters long." })
    .max(100, { message: "Password must be 100 characters or fewer." }),
});

export type RegisterFormValues = z.infer<typeof registerFormSchema>;

export function RegisterForm({}: { callbackUrl?: string }) {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    await authClient.signUp.email(
      {
        email: values.email,
        name: values.name,
        password: values.password,
      },
      {
        onError: (error) => {
          toast.error(error.error.message);
        },
        onSuccess: () => {
          toast.success("Account created successfully");
          form.reset();
        },
      }
    );
  };
  const { isSubmitting } = form.formState;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset disabled={isSubmitting} className="space-y-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="name">Full name</FormLabel>
                <FormControl>
                  <Input
                    id="name"
                    autoComplete="name"
                    placeholder="Ex. shakeeb"
                    className="border-border bg-background text-foreground"
                    {...field}
                  />
                </FormControl>
                <FormMessage>
                  <span className="text-muted-foreground">
                    Please enter your full name.
                  </span>
                </FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="border-border bg-background text-foreground"
                    {...field}
                  />
                </FormControl>
                <FormMessage>
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
          >
            {isSubmitting && <Loader className="mr-2 size-4 animate-spin" />}
            Create account
          </Button>

          <div className="relative text-center text-sm text-muted-foreground">
            <span
              className="absolute inset-0 top-1/2 border-t border-border"
              aria-hidden="true"
            />
            <span className="relative bg-background px-2">Or</span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <SocialAuthButtons />
          </div>
        </fieldset>
      </form>
    </Form>
  );
}
