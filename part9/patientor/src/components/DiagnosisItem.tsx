import { useCallback, useEffect, useState } from "react";
import { getByCode } from "../services/diagnosis";
import type { Diagnosis } from "../types";

export const DiagnosisItem = ({ code }: { code: string }) => {
  const [data, setData] = useState<Diagnosis | null>(null);

  const getCodeData = useCallback(async () => {
    const data = await getByCode(code);
    if (data) {
      setData(data.data);
    }
  }, [code]);

  useEffect(() => {
    getCodeData();
  }, [getCodeData]);

  return (
    <li>
      {data?.code} {data?.name}
    </li>
  );
};
