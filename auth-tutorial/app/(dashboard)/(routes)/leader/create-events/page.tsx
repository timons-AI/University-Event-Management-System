"use client";

import * as z from "zod";
// import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import {
  Form,
  FormItem,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { createEvent } from "@/actions/event";
import { useState, useTransition } from "react";
import { CreateEventSchema } from "@/schemas";

const CreatePage = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof CreateEventSchema>>({
    resolver: zodResolver(CreateEventSchema),
    defaultValues: {
      name: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;
  const [isPending, startTransition] = useTransition();

  const onSubmit = async (values: z.infer<typeof CreateEventSchema>) => {
    try {
      // const response = await axios.post("/api/courses", values);
      startTransition(() => {
        createEvent(values).then((response) => {
          if (response.error) {
            toast.error(response.error);
            return;
          }
          toast.success("Event created successfully");
          if (!response.data) return;
          router.push(`/leader/events/${response.data.id}`);
        });
      });
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className=" max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <div>
        <h1 className="text-2xl">Start Creating your Event From Here</h1>
        <p className="text-sm text-slate-600">
          What would you like to name your Event? Don&lsquo;t worry, you can
          change this later.
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder=" e.g 'Makerere University Graduation Ceremony 2026'"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Give your Event a name that will make it stand out.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className=" flex items-center gap-x-2">
              <Link href="/leader/dashboard">
                <Button type="button" variant="ghost">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={!isValid || isPending}>
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreatePage;
