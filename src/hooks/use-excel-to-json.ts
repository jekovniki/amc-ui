import {
  ExcelSheetTabs,
  ImportRulesStructure,
  ImportWalletStructure,
  ImportWalletStructureAssets,
  ImportWalletStructureOther,
} from "@/features/wallets/types/wallet-structure";
import { useState, useCallback } from "react";
import * as XLSX from "xlsx";

export const useExcelToJson = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const convertExcelToJsonWalletStructure = useCallback(
    async (file: File): Promise<ImportWalletStructure> => {
      setIsLoading(true);
      setError(null);

      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
          try {
            const data = event.target?.result;
            const workbook = XLSX.read(data, { type: "binary" });
            const securitiesWorksheet =
              workbook.Sheets[ExcelSheetTabs.Securities];
            const otherWorksheet = workbook.Sheets[ExcelSheetTabs.Other];

            const securitiesJSONData = XLSX.utils.sheet_to_json(
              securitiesWorksheet
            ) as ImportWalletStructureAssets[];
            const otherJSONData = XLSX.utils.sheet_to_json(
              otherWorksheet
            ) as ImportWalletStructureOther[];

            setIsLoading(false);
            resolve({
              securities: securitiesJSONData,
              other: otherJSONData,
            });
          } catch (error) {
            setIsLoading(false);
            setError(
              error instanceof Error
                ? error.message
                : "Failed to convert Excel to JSON"
            );
            reject(error);
          }
        };
        reader.onerror = () => {
          setIsLoading(false);
          setError("Failed to read file");
          reject(new Error("Failed to read file"));
        };

        reader.readAsBinaryString(file);
      });
    },
    []
  );

  const convertExcelToJsonRules = useCallback(
    async (file: File): Promise<ImportRulesStructure[]> => {
      setIsLoading(true);
      setError(null);

      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
          try {
            const data = event.target?.result;
            const workbook = XLSX.read(data, { type: "binary" });

            const rulesWorksheet = workbook.Sheets["Ограничения"];

            const rulesJSONData = XLSX.utils.sheet_to_json(
              rulesWorksheet
            ) as ImportRulesStructure[];
            setIsLoading(false);
            resolve(rulesJSONData);
          } catch (error) {
            setIsLoading(false);
            setError(
              error instanceof Error
                ? error.message
                : "Failed to convert Excel to JSON"
            );
            reject(error);
          }
        };
        reader.onerror = () => {
          setIsLoading(false);
          setError("Failed to read file");
          reject(new Error("Failed to read file"));
        };

        reader.readAsBinaryString(file);
      });
    },
    []
  );

  return {
    convertExcelToJsonWalletStructure,
    convertExcelToJsonRules,
    isLoading,
    error,
  };
};
