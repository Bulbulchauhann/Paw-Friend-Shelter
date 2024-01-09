"use client";

// ***** Library Imports *****
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";

// ***** Local Imports *****
import { Button } from "@/components/ui/button/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form/form";
import { Input } from "@/components/ui/input/input";
import prisma from "@/lib/prisma";
import axios from "axios";

const formSchema = z.object({
  fullName: z
    .string({
      required_error: "Name is required!",
    })
    .min(2),
  email: z.string().email("Invalid Email"),
  phone: z.string(),
  properConditions: z.string(),
  otherPets: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

const AdoptForm = ({ creatureId }: { creatureId: string }) => {
  const [isLoading, setIsLoading] = useState(false);

  // 1. Define your form.
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      properConditions: "",
      otherPets: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: FormValues) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true);

    try {
      const newForm = await axios.post("/api/creatures/adopt", {
        creatureId,
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        properConditions: values.properConditions,
        otherPets: values.otherPets,
      });

      console.log(newForm);

      toast.success("Form Submitted");
      form.reset();
    } catch (error) {
      console.log("ADOPT_FORM_SUBMIT_ERROR", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-96">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="max-w-sm space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <Input placeholder="+91 0000000000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="properConditions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Do you have proper conditions for an animal at home?
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Your message here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="otherPets"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Do you have other pets at home?</FormLabel>
                  <FormControl>
                    <Input placeholder="Your message here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full" disabled={isLoading}>
              Send
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AdoptForm;
