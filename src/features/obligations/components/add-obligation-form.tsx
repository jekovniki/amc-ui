import { TextIcon } from "@/components/icons/text-icon";
import { InputBox } from "@/components/input-box";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useGetCompanyEntities } from "@/features/entity/api/use-get-company-entities";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { useAddObligation } from "../api/use-add-obligation";
import { WalletIcon } from "@/components/icons/wallet-icon";
import { SelectBox } from "@/components/select-box";
import { CompanyIcon } from "@/components/icons/company-icon";
import { Button } from "@/components/ui/button";
import LoadingOverlay from "@/containers/loading-overlay";
import { Skeleton } from "@/components/ui/skeleton";

interface AddObligationFormProps {
  toggleFormVisibility: () => void;
}

export const AddObligationForm = ({
  toggleFormVisibility,
}: AddObligationFormProps) => {
  const { t } = useTranslation();
  const { data, isLoading } = useGetCompanyEntities();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const addObligation = useAddObligation();
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
    destription: z.string().optional(),
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
      name: "",
      destription: "",
      dueDateAt: "",
    },
  });

  const onSubmit = (input: z.infer<typeof formSchema>) => {
    setLoading(true);
    addObligation.mutate(input, {
      onSuccess: () => {
        setLoading(false);
        toggleFormVisibility();
      },
      onError: (error) => {
        console.error(error);
        setErrorMessage(t("errors.unknown"));
      },
    });
    toggleFormVisibility();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 p-6">
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
                      <InputBox
                        label={t("dialog.obligation.add.dueDateAt.label")}
                        placeholder={t(
                          "dialog.obligation.add.dueDateAt.placeholder"
                        )}
                        logo={<WalletIcon />}
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
            name="destription"
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
        <div className="border-t-[1px] p-6">
          <div className="flex items-center justify-between mt-2">
            <div className="text-red-500 text-sm">{errorMessage}</div>
            <div className="flex gap-4">
              <Button
                variant="secondary"
                type="button"
                onClick={toggleFormVisibility}
              >
                {t("dialog.obligation.add.buttons.cancel")}
              </Button>
              <Button type="submit">
                {t("dialog.obligation.add.buttons.submit")}
              </Button>
            </div>
          </div>
        </div>
        {loading ? (
          <LoadingOverlay showLoader={loading}>
            <div className="text-[14px]">Добавяне на задължението</div>
          </LoadingOverlay>
        ) : (
          ""
        )}
      </form>
    </Form>
  );
};
