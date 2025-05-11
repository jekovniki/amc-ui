import { createContext, useContext, useState, ReactNode } from "react";

type PageTitleContextType = {
  pageTitle: string;
  setPageTitle: (title: string) => void;
};

const PageTitleContext = createContext<PageTitleContextType | undefined>(
  undefined
);

export const PageTitleProvider = ({ children }: { children: ReactNode }) => {
  const [pageTitle, setPageTitle] = useState("");

  return (
    <PageTitleContext.Provider value={{ pageTitle, setPageTitle }}>
      {children}
    </PageTitleContext.Provider>
  );
};

export const usePageTitleContext = () => {
  const context = useContext(PageTitleContext);
  if (!context) {
    throw new Error(
      "usePageTitleContext must be used within PageTitleProvider"
    );
  }
  return context;
};
