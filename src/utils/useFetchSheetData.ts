import { useState, useEffect } from "react";

interface SheetData {
  [key: string]: any; // adapt to your sheet columns
}

export function useFetchSheetData(tabName?: string) {
  const [data, setData] = useState<SheetData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const url = import.meta.env.VITE_GAS_URL;
        const sheetTab = tabName || import.meta.env.LANG_TAB;
        const res = await fetch(`${url}?tab=${sheetTab}`);
        if (!res.ok) throw new Error("Failed to fetch sheet data");
        const json = await res.json();
        setData(json);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [tabName]);

  return { data, loading, error };
}
