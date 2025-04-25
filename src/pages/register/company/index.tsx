import { FileBox } from "@/components/file-box";
import { AutographIcon } from "@/components/icons/autograph-icon";
import { CompanyIcon } from "@/components/icons/company-icon";
import { ImageIcon } from "@/components/icons/image-icon";
import { InputBox } from "@/components/input-box";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { RegisterEmployeeData } from "@/features/auth/types/role";
import { z } from "zod";
import { AddCompanyEmployeeList } from "@/features/auth/components/add-company-employee-list";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { EmailIcon } from "@/components/icons/email-icon";
import { getDuplicatesFromArrayByKey } from "@/utils/array";
import { Loader } from "@/components/loader";
import { useAddCompany } from "@/features/company/api/use-add-company";
import { useAddUserToCompany } from "@/features/user/api/use-add-user-to-company";
import { Link } from "react-router-dom";
import { PublicRoutePath } from "@/pages/routes";
import { apiErrorHandler } from "@/utils/errors";

const RegisterCompanyPage = () => {
  const { t } = useTranslation();
  const [employees, setEmployees] = useState<RegisterEmployeeData[]>([]);
  const [error, setError] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);
  const [loaderMessage, setLoaderMessage] = useState<string>("");

  const addCompany = useAddCompany();
  const addUsers = useAddUserToCompany();

  const formSchema = z.object({
    name: z.string().min(1, {
      message: t("errors.name"),
    }),
    uic: z.string().min(1, {
      message: t("errors.uic"),
    }),
    email: z.string().email({
      message: t("errors.email"),
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      uic: "",
      email: "",
    },
  });

  const onSubmit = (data: { name: string; uic: string; email: string }) => {
    setError("");
    setLoaderMessage("");
    const allUsers = [
      ...employees,
      {
        id: Date.now(),
        email: data.email,
        accessLevel: { id: 1, name: "Administrator" },
      },
    ];
    const duplicateUsers = getDuplicatesFromArrayByKey(allUsers, "email");
    if (duplicateUsers.length) {
      setError(
        `${t("register.company.form.errors.duplicateUsers")} ${duplicateUsers
          .map((user) => user.email)
          .join(", ")}`
      );

      return;
    }
    setLoader(true);
    setLoaderMessage(t("register.company.form.loading.steps.1"));

    addCompany.mutate(
      {
        name: data.name,
        uic: data.uic,
        logo: "",
      },
      {
        onSuccess: () => {
          setLoaderMessage(t("register.company.form.loading.steps.2"));
          addUsers.mutate(
            {
              users: allUsers.map((user) => ({
                email: user.email,
                role_id: user.accessLevel.id,
              })),
            },
            {
              onSuccess: () => {
                setLoaderMessage(t("register.company.form.loading.steps.3"));
              },
              onError: (error) =>
                apiErrorHandler(
                  error,
                  setLoader,
                  setError,
                  setLoaderMessage,
                  t
                ),
            }
          );
        },
        onError: (error) =>
          apiErrorHandler(error, setLoader, setError, setLoaderMessage, t),
      }
    );
  };

  return (
    <div className="flex items-center justify-around h-screen">
      <div className="relative bg-white shadow-xl max-w-[768px] w-full mx-10 relative">
        {loader && (
          <div className="w-full h-full bg-[rgba(0,0,0,0.33)] z-[1] absolute top-[0] flex items-center justify-center">
            <div className="bg-white shadow-md text-center mx-4 transition-all rounded-sm p-10 flex gap-4 items-center justify-center flex-col">
              {loaderMessage !== t("register.company.form.loading.steps.3") && (
                <Loader />
              )}
              <div className="text-[14px]">{loaderMessage}</div>
              {loaderMessage === t("register.company.form.loading.steps.3") && (
                <Link to={PublicRoutePath.Login}>
                  {t("register.company.form.loading.button")}
                </Link>
              )}
            </div>
          </div>
        )}

        <div className="p-8 border-b-[1px]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex gap-4 mb-4">
                <div>
                  <FileBox
                    logo={<ImageIcon />}
                    label={t("register.company.form.logo.label")}
                    className="w-[132px] h-[132px]"
                    logoPlaceholder="150 x 150"
                  />
                </div>
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <InputBox
                            label={t("register.company.form.name.label")}
                            logo={<CompanyIcon />}
                            placeholder={t(
                              "register.company.form.name.placeholder"
                            )}
                            className="mb-2"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="mt-[-5px] mb-[10px]" />
                      </FormItem>
                    )}
                  ></FormField>
                  <FormField
                    control={form.control}
                    name="uic"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <InputBox
                            label={t("register.company.form.uic.label")}
                            logo={<AutographIcon />}
                            placeholder={t(
                              "register.company.form.uic.placeholder"
                            )}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="mt-[-5px] mb-[10px]" />
                      </FormItem>
                    )}
                  ></FormField>
                </div>
              </div>
              <div className="mt-6 mb-2">
                <span className="text-[#0C213473]">
                  {t("register.company.form.section.ownerTitle")}
                </span>
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputBox
                        label={t("register.company.form.owner.label")}
                        logo={<EmailIcon />}
                        placeholder={t(
                          "register.company.form.owner.placeholder"
                        )}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="mt-[-5px] mb-[10px]" />
                  </FormItem>
                )}
              ></FormField>
              <div className="flex items-center justify-between w-full absolute bottom-[28px] right-[28px]">
                <div className="text-red-500 h-[50px] flex items-center register-company-error-width text-[14px] pl-[28px] absolute bottom-[0px] left-[28px] w-[calc(100% - 150px)]">
                  {error}
                </div>
                <Button
                  variant="default"
                  size="lg"
                  type="submit"
                  className="absolute bottom-[0px] right-[0px]"
                >
                  {t("register.company.form.submit")}
                </Button>
              </div>
            </form>
          </Form>
          <AddCompanyEmployeeList
            employees={employees}
            setEmployees={setEmployees}
          />
        </div>
        <div className="h-[108px]"></div>
      </div>
    </div>
  );
};

export default RegisterCompanyPage;
