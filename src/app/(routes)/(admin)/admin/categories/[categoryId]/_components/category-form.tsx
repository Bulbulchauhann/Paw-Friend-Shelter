"use client";

import { Category } from "@prisma/client";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";

import Heading from "../../../_components/ui/heading/heading";
import { Button } from "@/components/ui/button/button";
import { AlertModal } from "../../../_components/ui/alert-modal/alert-modal";
import { Separator } from "@/components/ui/separator/separator";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form/form";
import { Input } from "@/components/ui/input/input";
import FileUpload from "../../../_components/file-upload/file-upload";

type CategoryFormProps = {
  initialData: Category | null;
};

const formSchema = z.object({
  name: z
    .string({ required_error: "Name is required!" })
    .min(1, "Name is required!"),
  imageUrl: z.string(),
});

type CategoryFormValues = z.infer<typeof formSchema>;

const CategoryForm = ({ initialData }: CategoryFormProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const router = useRouter();

  const title = initialData ? "Edit category" : "Create category";
  const description = initialData ? "Edit a category" : "Add a new category";
  const successToastMessage = initialData
    ? "Category updated!"
    : "Category created!";
  const loadingToastMessage = initialData ? "Updating..." : "Creating...";
  const action = initialData ? "Save Changes" : "Create";

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      imageUrl: "",
    },
  });

  const { isDirty } = form.formState;

  const onSubmit = async (values: CategoryFormValues) => {
    console.log(values);

    const loadingToast = toast.loading(loadingToastMessage);

    try {
      setLoading(true);

      if (initialData) {
        await axios.patch(`/api/categories/${params.categoryId}`, values);
      } else {
        await axios.post(`/api/categories`, values);
      }

      router.push(`/admin/categories`);
      router.refresh();
      toast.success(successToastMessage);
    } catch (error) {
      const Error = error as AxiosError;
      toast.error(
        (Error.response?.data as { message: string; success: boolean })
          .message || "Something went wrong"
      );
    } finally {
      toast.dismiss(loadingToast);
      setLoading(false);
    }
  };

  const onDelete = async () => {
    const loadingToast = toast.loading("Processing...");

    try {
      setLoading(true);

      await axios.delete(`/api/categories/${params.categoryId}`);

      router.refresh();
      router.push(`/admin/categories`);
      toast.success("Category deleted!");
    } catch (error) {
      console.log("", error);
      toast.error("Something went wrong while deleting category.");
    } finally {
      toast.dismiss(loadingToast);
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />

      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />

        {initialData && (
          <Button
            size="icon"
            variant="destructive"
            onClick={() => setOpen(true)}
            disabled={loading}
          >
            <Trash className="w-4 h-4" />
          </Button>
        )}
      </div>

      <Separator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="flex flex-col gap-8">
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => {
                return (
                  <FormItem className="w-[300px]">
                    <FormLabel>Category Image</FormLabel>
                    <FormControl>
                      <FileUpload
                        endPoint="imageUpload"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem className="w-[300px]">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Category name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>

          <Button
            disabled={loading || !isDirty}
            className="ml-auto"
            type="submit"
          >
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default CategoryForm;
