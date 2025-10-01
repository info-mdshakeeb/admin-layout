"use client";

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

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z.email({ message: "Please enter a valid email address." }),
});

const RecoverForm = () => {
  const [isPending, startTransition] = useTransition();

  //! form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  //! submit handler
  const onSubmit = async (data: { email: string }) => {
    startTransition(async () => {});
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset disabled={isPending} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Provide your email"
                    {...field}
                  />
                </FormControl>
                <FormMessage>
                  Make sure to check your spam folder for the OTP email.
                </FormMessage>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            {isPending && (
              <Loader
                className="animate-spin"
                size={16}
                strokeWidth={2}
                aria-hidden="true"
              />
            )}
            Send OTP
          </Button>
        </fieldset>
      </form>
    </Form>
  );
};

export default RecoverForm;
