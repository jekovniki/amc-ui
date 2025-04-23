import { FileBox } from "@/components/file-box";
import { AutographIcon } from "@/components/icons/autograph-icon";
import { CompanyIcon } from "@/components/icons/company-icon";
import { EmailIcon } from "@/components/icons/email-icon";
import { ImageIcon } from "@/components/icons/image-icon";
import { InputBox } from "@/components/input-box";
import { SelectBox } from "@/components/select-box";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const RegisterCompany = () => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-around h-screen">
      <div className="bg-white shadow-xl max-w-[768px] w-full mx-10">
        <div className="p-8 border-b-[1px]">
          <div className="flex gap-2">
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
          <div className="mt-6">
            <span className="text-[#0C213473]">
              {t("register.company.form.section.title")}
            </span>
          </div>
          <div className="mt-2 flex w-full">
            <div className="basis-1/2">
              <InputBox
                label={t("register.company.form.email.label")}
                placeholder={t("register.company.form.email.placeholder")}
                logo={<EmailIcon />}
              />
            </div>
            <div className="basis-1/2">
              <SelectBox
                logo={<CompanyIcon className="select-icon" />}
                options={[
                  { label: "Администратор", value: "1" },
                  { label: "Служител", value: "2" },
                ]}
                defaultPlaceholder="Изберете ниво на достъп"
              />
            </div>
          </div>
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

export default RegisterCompany;
