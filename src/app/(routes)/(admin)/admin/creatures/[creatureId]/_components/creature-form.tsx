"use client";

import { Category, Creature } from "@prisma/client";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select/select";
import { Input } from "@/components/ui/input/input";
import FileUpload from "../../../_components/file-upload/file-upload";

type CreatureFormProps = {
  initialData: Creature | null;
  categories: Category[];
};

const formSchema = z.object({
  name: z
    .string({ required_error: "Name is required!" })
    .min(1, "Name is required!"),
  imageUrl: z.string(),
  categoryId: z.string(),
});

type CreatureFormValues = z.infer<typeof formSchema>;

const CreatureForm = ({ initialData, categories }: CreatureFormProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const router = useRouter();

  const title = initialData ? "Edit creature" : "Create creature";
  const description = initialData ? "Edit a creature" : "Add a new creature";
  const successToastMessage = initialData
    ? "Creature updated!"
    : "Creature created!";
  const loadingToastMessage = initialData ? "Updating..." : "Creating...";
  const action = initialData ? "Save Changes" : "Create";

  const form = useForm<CreatureFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      imageUrl: "",
    },
  });

  const { isDirty } = form.formState;

  const onSubmit = async (values: CreatureFormValues) => {
    console.log(values);

    const loadingToast = toast.loading(loadingToastMessage);

    try {
      setLoading(true);

      if (initialData) {
        await axios.patch(`/api/creatures/${params.creatureId}`, values);
      } else {
        await axios.post(`/api/creatures`, values);
      }

      router.push(`/admin/creatures`);
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

      await axios.delete(`/api/creatures/${params.creatureId}`);

      router.refresh();
      router.push(`/admin/creatures`);
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
                    <FormLabel>Creature Image</FormLabel>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => {
                  return (
                    <FormItem className="">
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Creature name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        disabled={loading}
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              defaultValue={field.value}
                              placeholder="Select a category"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((cat) => {
                            return (
                              <SelectItem key={cat.id} value={cat.id}>
                                {cat.name}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
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

export default CreatureForm;
