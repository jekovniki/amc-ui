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

const RegisterCompanyPage = () => {
  const { t } = useTranslation();
  const [employees, setEmployees] = useState<RegisterEmployeeData[]>([]);

  const formSchema = z.object({
    name: z.string().min(1, {
      message: t("errors.name"),
    }),
    uic: z.string().min(1, {
      message: t("errors.uic"),
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      uic: "",
    },
  });

  const onSubmit = (data: Record<string, string>) => {
    console.log("data : ", data);
  };

  return (
    <div className="flex items-center justify-around h-screen">
      <div className="bg-white shadow-xl max-w-[768px] w-full mx-10 relative">
        <div className="p-8 border-b-[1px]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex gap-4">
                <div>
                  <FileBox
                    logo={<ImageIcon />}
                    label={t("register.company.form.logo.label")}
                    className="w-[135px] h-[135px]"
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
                        <FormMessage />
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
                        <FormMessage />
                      </FormItem>
                    )}
                  ></FormField>
                </div>
              </div>
              <div className="flex justify-between absolute bottom-[28px] right-[28px]">
                <div></div>
                <Button variant="default" size="lg" type="submit">
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
