import { useTranslation } from "react-i18next";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { TextIcon } from "@/components/icons/text-icon";
import { InputBox } from "@/components/input-box";
import { CompanyIcon } from "@/components/icons/company-icon";
import { WalletIcon } from "@/components/icons/wallet-icon";
import { AutographIcon } from "@/components/icons/autograph-icon";
import { SelectBox } from "@/components/select-box";
import { Button } from "@/components/ui/button";
import { useGetEntityTypeQueries } from "@/features/entity-type/api/use-get-entity-type-queries";
import { Skeleton } from "@/components/ui/skeleton";
import { useAddCompanyEntity } from "../api/use-add-company-entity";
import { useState } from "react";
import LoadingOverlay from "@/containers/loading-overlay";
import { getEntityNameByLanguage } from "../utils/entity-translation";
import { fundApiErrorHandler } from "../utils/errors";
import { useNavigate } from "react-router-dom";
import { PrivateRoutePath } from "@/pages/routes";

interface AddEntityFormProps {
  toggleFormVisibility: () => void;
}

export const AddEntityForm = ({ toggleFormVisibility }: AddEntityFormProps) => {
  const { t, i18n } = useTranslation();
  const { data, isLoading } = useGetEntityTypeQueries();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const addCompanyEntity = useAddCompanyEntity();
  const navigate = useNavigate();
  const entityTypes = data?.data
    ? data.data.map((item) => ({
        label: getEntityNameByLanguage(item.name, i18n.language),
        value: item.id.toString(),
      }))
    : [];

  const formSchema = z.object({
    name: z.string().min(1, {
      message: t("errors.required"),
    }),
    uic: z.string().min(1, {
      message: t("errors.required"),
    }),
    lei: z.string().optional(),
    entityTypeId: z.string().min(1, {
      message: t("errors.required"),
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      uic: "",
      lei: "",
      entityTypeId: "",
    },
  });

  const onSubmit = (input: z.infer<typeof formSchema>) => {
    setLoading(true);
    addCompanyEntity.mutate(
      {
        ...input,
        entityTypeId: Number(input.entityTypeId),
      },
      {
        onSuccess: (response) => {
          setLoading(false);
          toggleFormVisibility();
          navigate(
            `/${response.data.company.id}/${PrivateRoutePath.Entity}/${response.data.id}`
          );
        },
        onError: (error) =>
          fundApiErrorHandler(error, setLoading, setErrorMessage, t),
      }
    );
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
                    label={t("dialog.entity.add.name.label")}
                    placeholder={t("dialog.entity.add.name.placeholder")}
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
                name="uic"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputBox
                        label={t("dialog.entity.add.uic.label")}
                        placeholder={t("dialog.entity.add.uic.placeholder")}
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
              <FormField
                control={form.control}
                name="lei"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputBox
                        label={t("dialog.entity.add.lei.label")}
                        placeholder={t("dialog.entity.add.lei.placeholder")}
                        logo={<AutographIcon />}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormField
            control={form.control}
            name="entityTypeId"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  {isLoading ? (
                    <Skeleton className="w-full h-[62px] mb-2" />
                  ) : (
                    <SelectBox
                      logo={<CompanyIcon className="select-icon" />}
                      options={entityTypes}
                      defaultPlaceholder={t(
                        "dialog.entity.add.type.placeholder"
                      )}
                      label={t("dialog.entity.add.type.label")}
                      error={!!fieldState.error}
                      {...field}
                    />
                  )}
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
                {t("dialog.entity.add.buttons.cancel")}
              </Button>
              <Button type="submit">
                {t("dialog.entity.add.buttons.submit")}
              </Button>
            </div>
          </div>
        </div>
        {loading ? (
          <LoadingOverlay showLoader={loading}>
            <div className="text-[14px]">Добавяне на дружеството</div>
          </LoadingOverlay>
        ) : (
          ""
        )}
      </form>
    </Form>
  );
};
