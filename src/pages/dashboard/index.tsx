import { CompanyWelcomeCard } from "@/features/company/components/company-welcome-card";
import EntityListContainer from "@/features/entity/containers/entity-list-container";
import { useState } from "react";

const DashboardPage = () => {
  const [selectedCard, setSelectedCard] = useState<string>("");
  console.log("selectCard: ", selectedCard);
  return (
    <div className="p-4 grid grid-cols-12 gap-4">
      <div className="col-span-8">
        <CompanyWelcomeCard />
      </div>
      <div className="col-span-4">
        <EntityListContainer
          selectedCard={selectedCard}
          onSelectCard={setSelectedCard}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
