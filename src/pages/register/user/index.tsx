import { useTranslation } from "react-i18next";
import { Link, useSearchParams } from "react-router-dom";
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
import { InputBox } from "@/components/input-box";
import { AutographIcon } from "@/components/icons/autograph-icon";
import { CompanyIcon } from "@/components/icons/company-icon";
import { LockIcon } from "@/components/icons/lock-icon";
import { Button } from "@/components/ui/button";
import { useSignUp } from "@/features/auth/api/use-sign-up";
import { useState } from "react";
import { apiErrorHandler } from "@/utils/errors";
import LoadingOverlay from "@/containers/loading-overlay";
import { PublicRoutePath } from "@/pages/routes";

const RegisterUserPage = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const signUp = useSignUp();
  const [error, setError] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);
  const [loaderMessage, setLoaderMessage] = useState<string>("");

  const email = searchParams.get("email");
  const companyName = searchParams.get("companyName");
  const registerToken = searchParams.get("registerToken");

  const formSchema = z
    .object({
      firstName: z.string().min(1, {
        message: t("errors.required"),
      }),
      lastName: z.string().min(1, {
        message: t("errors.required"),
      }),
      job: z.string().min(1, {
        message: t("errors.required"),
      }),
      password: z
        .string()
        .min(8, { message: t("errors.password.length") })
        .refine((password) => /[A-Z]/.test(password), {
          message: t("errors.password.uppercase"),
        })
        .refine((password) => /[a-z]/.test(password), {
          message: t("errors.password.lowercase"),
        })
        .refine((password) => /[0-9]/.test(password), {
          message: t("errors.password.number"),
        })
        .refine((password) => /[^A-Za-z0-9]/.test(password), {
          message: t("errors.password.special"),
        }),
      confirmPassword: z.string().min(1, {
        message: t("errors.required"),
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("errors.password.match"),
      path: ["confirmPassword"],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      job: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = ({
    firstName,
    lastName,
    job,
    password,
  }: z.infer<typeof formSchema>) => {
    setLoader(true);
    setError("");
    setLoaderMessage(t("register.user.form.loading.steps.1"));
    signUp.mutate(
      {
        firstName,
        lastName,
        job,
        password,
        registrationToken: registerToken || "",
      },
      {
        onSuccess: () => {
          setLoaderMessage(t("register.user.form.loading.steps.2"));
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
          <LoadingOverlay
            showLoader={
              loaderMessage !== t("register.user.form.loading.steps.2")
            }
          >
            <div className="text-[14px]">{loaderMessage}</div>
            {loaderMessage === t("register.user.form.loading.steps.2") && (
              <Link
                to={PublicRoutePath.Login}
                className="text-primary hover:underline"
              >
                {t("register.user.form.loading.button")}
              </Link>
            )}
          </LoadingOverlay>
        )}
        <div className="p-8 border-b-[1px]">
          <h2 className="text-[#0c2134] text-[24px] mb-2">
            {t("register.user.title")}
          </h2>
          <p className="mb-4">{t("register.user.description.1")}</p>
          <p className="mb-2 text-[18px]">
            <strong>{t("register.user.description.2")}:</strong>
          </p>
          <p>
            {t("register.user.description.3")}: <strong>{companyName}</strong>
          </p>
          <p>
            {t("register.user.description.4")}: <strong>{email}</strong>
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="p-8 border-b-[1px]">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormControl>
                      <InputBox
                        label={t("register.user.form.firstName.label")}
                        placeholder={t(
                          "register.user.form.firstName.placeholder"
                        )}
                        logo={<AutographIcon />}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="mt-[-5px]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormControl>
                      <InputBox
                        label={t("register.user.form.lastName.label")}
                        placeholder={t(
                          "register.user.form.lastName.placeholder"
                        )}
                        logo={<AutographIcon />}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="mt-[-5px]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="job"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormControl>
                      <InputBox
                        label={t("register.user.form.position.label")}
                        placeholder={t(
                          "register.user.form.position.placeholder"
                        )}
                        logo={<CompanyIcon />}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="mt-[-5px]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormControl>
                      <InputBox
                        label={t("register.user.form.password.label")}
                        placeholder={t(
                          "register.user.form.password.placeholder"
                        )}
                        type="password"
                        logo={<LockIcon size={24} />}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="mt-[-5px]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputBox
                        label={t("register.user.form.repeatPassword.label")}
                        placeholder={t(
                          "register.user.form.repeatPassword.placeholder"
                        )}
                        type="password"
                        logo={<LockIcon size={24} />}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="mt-[-5px]" />
                  </FormItem>
                )}
              />
            </div>
            <div className="p-8 flex items-center justify-between">
              <div className="text-red-500 text-[14px]">{error}</div>
              <Button variant="default" size="lg" type="submit">
                {t("register.user.form.submit")}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default RegisterUserPage;
