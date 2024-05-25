"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { updateEvent } from "@/actions/event";

interface TitleFormProps {
  initialData: {
    name: string;
  };
  eventId: string;
}

const formSchema = z.object({
  name: z.string().min(1, { message: "Title is required" }),
});

export const TitleForm = ({ initialData, eventId }: TitleFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });
  const { isSubmitting, isValid } = form.formState;
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      updateEvent(values, eventId);
      toast.success("Event updated successfully");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };
  return (
    <div className=" mt-6 border bg-slate-100 rounded-md p-4">
      <div className=" font-medium flex items-center justify-between">
        Event name
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <> Cancel</>
          ) : (
            <>
              <Pencil className=" h-4 w-4 mr-2" />
              Edit name
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <div className=" mt-2">
          <h2 className=" text-xl">{initialData.name}</h2>
        </div>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder=" e.g 'Advanced web development'"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    What will you teach in this course ?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className=" flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Save changes
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
