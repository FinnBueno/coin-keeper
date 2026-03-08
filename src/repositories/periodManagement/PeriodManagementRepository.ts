import { firebaseApp } from "../../services/firebase";
import {
  child,
  Database,
  get,
  getDatabase,
  onValue,
  push,
  ref,
  set,
  type DatabaseReference,
} from "firebase/database";
import type {
  IPeriodManagementRepository,
  MonthlyPeriod,
} from "./IPeriodManagementRepository";
import type {
  BankExportLastRun,
  BankExportStatement,
} from "../../services/banking";
import type { IAuthService } from "../../services/auth/IAuthService";

export class FirebasePeriodManagementRepository implements IPeriodManagementRepository {
  private db: Database;
  private periodListRef: () => DatabaseReference;
  private lastRunResultRef: () => DatabaseReference;

  constructor(auth: IAuthService) {
    this.db = getDatabase(firebaseApp);
    const mainRef = ref(this.db);
    this.periodListRef = () => child(mainRef, `${auth.getUserId()}/periods`);
    this.lastRunResultRef = () =>
      child(mainRef, `${auth.getUserId()}/lastRunResult`);
  }

  public subscribeToPeriod(
    id: string,
    callback: (period: MonthlyPeriod) => void,
  ): () => void {
    return onValue(child(this.periodListRef(), id), (snapshot) => {
      const value = snapshot.val();
      return callback({
        ...value,
        planning: {
          ...value.planning,
          scheduledExpenses: value.scheduledExpenses ?? [],
        },
        bankEntries: Object.values(value.bankEntries ?? {}),
      } as MonthlyPeriod);
    });
  }

  public subscribeToLastRunResult(
    callback: (period: BankExportLastRun) => void,
  ): () => void {
    return onValue(this.lastRunResultRef(), (snapshot) =>
      callback(snapshot.val() as BankExportLastRun),
    );
  }

  public async setLastRunResult(data: BankExportLastRun): Promise<void> {
    await set(this.lastRunResultRef(), data);
  }

  public async insertBankEntries(
    periodId: string,
    entries: BankExportStatement[],
  ): Promise<void> {
    const bankEntriesRef = child(
      this.periodListRef(),
      `${periodId}/bankEntries`,
    );
    for (const entry of entries) {
      const itemRef = push(bankEntriesRef);
      if (!entry.plannedExpenseId) delete entry["plannedExpenseId"];
      await set(itemRef, entry);
    }
  }

  public async getPeriodById(periodId: string): Promise<MonthlyPeriod> {
    const snapshot = await get(child(this.periodListRef(), periodId));
    return snapshot.val() as MonthlyPeriod;
  }

  public async upsertPeriodById(
    id: string,
    period: MonthlyPeriod,
  ): Promise<void> {
    return await set(child(this.periodListRef(), id), period);
  }

  public async setClosedManually(
    periodId: string,
    expectedExpenseId: string,
    value: boolean,
  ): Promise<void> {
    return await set(
      child(
        this.periodListRef(),
        `${periodId}/planning/scheduledExpenses/${expectedExpenseId}/isClosedManually`,
      ),
      value,
    );
  }
}
