import { useTranslation } from "react-i18next";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { InputBox } from "@/components/input-box";
import { EmailIcon } from "@/components/icons/email-icon";
import { LockIcon } from "@/components/icons/lock-icon";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { PrivateRoutePath, PublicRoutePath } from "../routes";
import { Link, useNavigate } from "react-router-dom";
import { useSignIn } from "@/features/auth/api/use-sign-in";
import { apiErrorHandler } from "@/utils/errors";
import LoadingOverlay from "@/containers/loading-overlay";
import session from "@/features/auth/services/session";
import { navigateToDashboard } from "@/utils/navigation";

const LoginPage = () => {
  const { t } = useTranslation();
  const [error, setError] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);
  const [loaderMessage, setLoaderMessage] = useState<string>("");
  const navigate = useNavigate();
  const signIn = useSignIn();
  const formSchema = z.object({
    email: z.string().email({
      message: t("errors.email"),
    }),
    password: z.string().min(8, {
      message: t("errors.password.length"),
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setLoader(true);
    setLoaderMessage(t("login.form.loading"));
    setError("");
    signIn.mutate(data, {
      onSuccess: (response) => {
        session.set(response.data.sessionData);
        const { companyId } = JSON.parse(atob(response.data.sessionData));
        navigateToDashboard(navigate, PrivateRoutePath.Dashboard, companyId);
      },
      onError: (error) =>
        apiErrorHandler(error, setLoader, setError, setLoaderMessage, t),
    });
  };

  return (
    <div className="flex items-center justify-around h-screen">
      <div className="relative bg-white shadow-xl max-w-[430px] w-full mx-10 relative">
        {loader && (
          <LoadingOverlay showLoader={loader}>
            <div className="text-[14px]">{loaderMessage}</div>
          </LoadingOverlay>
        )}
        <div className="p-8">
          <h1 className="mb-4 font-light text-[24px] ">{t("login.title")}</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormControl>
                      <InputBox
                        label={t("login.form.email.label")}
                        placeholder={t("login.form.email.placeholder")}
                        logo={<EmailIcon />}
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
              <div className="">
                <Button
                  variant="default"
                  size="full"
                  type="submit"
                  className="font-light text-[18px]"
                >
                  {t("login.form.submit")}
                </Button>
                <div className="text-red-500 text-[14px]">{error}</div>
              </div>
              <div className="flex justify-end mt-2">
                <Link
                  to={PublicRoutePath.ForgotPassword}
                  className="text-[15px] text-primary hover:underline"
                >
                  {t("login.form.links.forgotPassword")}
                </Link>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
