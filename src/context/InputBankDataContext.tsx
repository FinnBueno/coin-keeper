import {
  createContext,
  useCallback,
  useContext,
  useState,
  type FC,
  type ReactNode,
} from "react";
import { parseStatementsFromHtml, type BankExport } from "../services/banking";
import { useDataClient } from "./DatabaseContext";

interface InputBankDataControls {
  setSourceHtml: (data: string) => void;
  importData?: BankExport;
}

const InputBankDataContext = createContext<InputBankDataControls>({
  setSourceHtml: () => {},
});

export const InputBankDataContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { lastRunResult } = useDataClient();
  const [importData, setHtmlData] = useState<BankExport | undefined>(undefined);

  const setSourceHtml = useCallback(
    (data: string) => {
      const bankExport = parseStatementsFromHtml(
        data,
        lastRunResult?.dateLabel ?? 0,
        lastRunResult?.amountOfEntries ?? 0,
      );
      setHtmlData(bankExport);
    },
    [setHtmlData, lastRunResult],
  );

  return (
    <InputBankDataContext.Provider
      value={{
        setSourceHtml,
        importData,
      }}
    >
      {children}
    </InputBankDataContext.Provider>
  );
};

export const useInputBankData = () => useContext(InputBankDataContext);
