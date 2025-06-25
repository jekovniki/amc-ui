import { Dispatch, SetStateAction } from "react";
import { Obligation } from "../types/obligation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputBox } from "@/components/input-box";
import { DatePickerBox } from "@/components/datepicker-box";
import { useGetCompanyEntities } from "@/features/entity/api/use-get-company-entities";
import { Skeleton } from "@/components/ui/skeleton";
import { SelectBox } from "@/components/select-box";
import { CompanyIcon } from "@/components/icons/company-icon";
import { TextIcon } from "@/components/icons/text-icon";
import { Button } from "@/components/ui/button";

interface ObligationControlFormProps {
  obligation: Obligation;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const ObligationControlFormEdit = ({
  obligation,
  open,
  setOpen,
}: ObligationControlFormProps) => {
  const { t } = useTranslation();
  const { data, isLoading } = useGetCompanyEntities();
  const entityOptions = data?.data
    ? data.data.map((item) => ({
        label: item.name,
        value: item.id,
      }))
    : [];

  const formSchema = z.object({
    name: z.string().min(1, {
      message: t("errors.required"),
    }),
    description: z.string().optional(),
    dueDateAt: z.string().min(1, {
      message: t("errors.required"),
    }),
    entityId: z.string().uuid({
      message: t("errors.required"),
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: obligation.name,
      description: obligation.description,
      dueDateAt: obligation.dueDateAt,
      entityId: obligation.entity.id,
    },
  });

  const onSubmit = (input: z.infer<typeof formSchema>) => {
    console.log("input : ", input);
    // setLoading(true);
    // addObligation.mutate(input, {
    //   onSuccess: () => {
    //     setLoading(false);
    //     toggleFormVisibility();
    //   },
    //   onError: (error) => {
    //     console.error(error);
    //     setErrorMessage(t("errors.unknown"));
    //   },
    // });
    // toggleFormVisibility();
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 p-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputBox
                    label={t("dialog.obligation.add.name.label")}
                    placeholder={t("dialog.obligation.add.name.placeholder")}
                    logo={<TextIcon />}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-full gap-4">
            <div className="basis-1/2">
              <FormField
                control={form.control}
                name="dueDateAt"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <DatePickerBox
                        label={t("dialog.obligation.add.dueDateAt.label")}
                        placeholder={new Date().toLocaleDateString()}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="basis-1/2">
              {isLoading ? (
                <Skeleton className="w-full h-[62px] mb-2" />
              ) : (
                <FormField
                  control={form.control}
                  name="entityId"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormControl>
                        <SelectBox
                          logo={<CompanyIcon className="select-icon" />}
                          options={entityOptions}
                          defaultPlaceholder={t(
                            "dialog.obligation.add.entity.placeholder"
                          )}
                          label={t("dialog.obligation.add.entity.label")}
                          error={!!fieldState.error}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
          </div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputBox
                    label={t("dialog.obligation.add.description.label")}
                    placeholder={t(
                      "dialog.obligation.add.description.placeholder"
                    )}
                    logo={<TextIcon />}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="border-t-[1px] md:rounded-b flex justify-between items-center p-4">
          <Button
            variant="outline"
            autoFocus={false}
            onClick={() => setOpen(!open)}
          >
            {t("dialog.obligation.preview.buttons.cancel")}
          </Button>
          <Button type="submit">
            {t("dialog.obligation.preview.buttons.done")}
          </Button>
        </div>
      </form>
    </Form>
  );
};
