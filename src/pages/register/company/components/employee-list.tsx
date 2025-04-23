import { CompanyIcon } from "@/components/icons/company-icon";
import { EmailIcon } from "@/components/icons/email-icon";
import { InputBox } from "@/components/input-box";
import { SelectBox } from "@/components/select-box";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  email: z.string().email({
    message: "Please provide a valid email",
  }),
  accessLevel: z.string().min(1, {
    message: "Please select access level",
  }),
});

export const EmployeeList = () => {
  const [employees, setEmployees] = useState<
    Array<{
      id: number;
      email: string;
      accessLevel: {
        value: string;
        label: string;
      };
    }>
  >([]);

  const { t } = useTranslation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      accessLevel: "",
    },
  });

  const accessLevelOptions = [
    { label: "Администратор", value: "1" },
    { label: "Служител", value: "2" },
  ];

  const onSubmit = (data: any) => {
    const newEmployee = {
      id: Date.now(),
      email: data.email,
      accessLevel: accessLevelOptions.find(
        (opt) => opt.value === data.accessLevel
      ) || { label: "", value: "" },
    };

    setEmployees([...employees, newEmployee]);
    form.reset();
  };

  const handleRemoveEmployee = (id: number) => {
    setEmployees(employees.filter((employee) => employee.id !== id));
  };

  return (
    <>
      <div className="mt-6">
        <span className="text-[#0C213473]">
          {t("register.company.form.section.title")}
        </span>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mt-2 flex w-full">
            <div className="basis-1/2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputBox
                        label={t("register.company.form.email.label")}
                        placeholder={t(
                          "register.company.form.email.placeholder"
                        )}
                        logo={<EmailIcon />}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
            </div>
            <div className="basis-1/2">
              <FormField
                control={form.control}
                name="accessLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <SelectBox
                        logo={<CompanyIcon className="select-icon" />}
                        options={accessLevelOptions}
                        defaultPlaceholder="Изберете ниво на достъп"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
            </div>
          </div>
          <div className="flex items-end justify-end mt-2">
            <Button>{t("register.company.form.accessLevel.button")}</Button>
          </div>
        </form>
      </Form>
      <div className="mt-4">
        {employees.length > 0 && (
          <div>
            <ul className="space-y-2">
              {employees.map((employee) => (
                <li
                  key={employee.id}
                  className="flex justify-between items-center p-2 bg-gray-50 rounded"
                >
                  <div>
                    <span className="mr-2">{employee.email}</span>
                    <span className="text-sm text-gray-500">
                      {employee.accessLevel.label}
                    </span>
                  </div>
                  <div>
                    <span onClick={() => handleRemoveEmployee(employee.id)}>
                      Delete
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};
