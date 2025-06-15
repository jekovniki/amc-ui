import { DialogTitle } from "@/components/ui/dialog";
import { Obligation } from "../types/obligation";

interface ObligationControlFormProps {
  obligation: Obligation;
}

export const ObligationControlForm = ({
  obligation,
}: ObligationControlFormProps) => {
  console.log("obligation : ", obligation);
  return (
    <>
      <DialogTitle className="pt-6 pb-2 px-4">Title</DialogTitle>
      <div className="bg-white border-t-[1px] md:rounded-b"></div>
    </>
  );
};
