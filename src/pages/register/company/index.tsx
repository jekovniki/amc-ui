import { FileBox } from "@/components/file-box";
import { AutographIcon } from "@/components/icons/autograph-icon";
import { CompanyIcon } from "@/components/icons/company-icon";
import { ImageIcon } from "@/components/icons/image-icon";
import { InputBox } from "@/components/input-box";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { RegisterEmployeeData } from "@/features/auth/types/role";
import { AddCompanyEmployeeList } from "@/features/auth/components/add-company-employee-list";

const RegisterCompanyPage = () => {
  const { t } = useTranslation();
  const [employees, setEmployees] = useState<RegisterEmployeeData[]>([]);

  return (
    <div className="flex items-center justify-around h-screen">
      <div className="bg-white shadow-xl max-w-[768px] w-full mx-10">
        <div className="p-8 border-b-[1px]">
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
              <InputBox
                label={t("register.company.form.name.label")}
                logo={<CompanyIcon />}
                placeholder={t("register.company.form.name.placeholder")}
                className="mb-2"
              />
              <InputBox
                label={t("register.company.form.uic.label")}
                logo={<AutographIcon />}
                placeholder={t("register.company.form.uic.placeholder")}
              />
            </div>
          </div>
          <AddCompanyEmployeeList
            employees={employees}
            setEmployees={setEmployees}
          />
        </div>
        <div className="p-8 flex justify-end">
          <Button variant="default" size="lg">
            {t("register.company.form.submit")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RegisterCompanyPage;
