import { useState, useCallback } from "react";
import * as XLSX from "xlsx";

export const useExcelToJson = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const convertExcelToJSON = useCallback(async (file: File): Promise<any[]> => {
    setIsLoading(true);
    setError(null);

    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        try {
          const data = event.target?.result;
          const workbook = XLSX.read(data, { type: "binary" });

          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];

          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

          setIsLoading(false);
          resolve(jsonData);
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
  }, []);

  const convertExcelToJsonWithKeys = useCallback(
    async (file: File): Promise<any[]> => {
      setIsLoading(true);
      setError(null);

      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
          try {
            const data = event.target?.result;
            const workbook = XLSX.read(data, { type: "binary" });

            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];

            const jsonData = XLSX.utils.sheet_to_json(worksheet);

            setIsLoading(false);
            resolve(jsonData);
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
    convertExcelToJSON,
    convertExcelToJsonWithKeys,
    isLoading,
    error,
  };
};
