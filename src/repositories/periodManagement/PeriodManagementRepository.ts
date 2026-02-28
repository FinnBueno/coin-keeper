import { firebaseApp } from "../../services/firebase";
import {
  child,
  Database,
  get,
  getDatabase,
  onValue,
  ref,
  set,
  type DatabaseReference,
} from "firebase/database";
import type {
  IPeriodManagementRepository,
  MonthlyPeriod,
} from "./IPeriodManagementRepository";

export class FirebasePeriodManagementRepository implements IPeriodManagementRepository {
  private db: Database;
  private periodListRef: DatabaseReference;

  constructor() {
    this.db = getDatabase(firebaseApp);
    const mainRef = ref(this.db);
    this.periodListRef = child(mainRef, "periods");
  }

  public subscribeToPeriod(
    id: string,
    callback: (period: MonthlyPeriod) => void,
  ): () => void {
    return onValue(child(this.periodListRef, id), (snapshot) =>
      callback(snapshot.val() as MonthlyPeriod),
    );
  }

  public async getPeriodById(periodId: string): Promise<MonthlyPeriod> {
    const snapshot = await get(child(this.periodListRef, periodId));
    return snapshot.val() as MonthlyPeriod;
  }

  public async upsertPeriodById(
    id: string,
    period: MonthlyPeriod,
  ): Promise<void> {
    return await set(child(this.periodListRef, id), period);
  }

  public async setClosedManually(
    periodId: string,
    expectedExpenseId: string,
    value: boolean,
  ): Promise<void> {
    return await set(
      child(
        this.periodListRef,
        `${periodId}/planning/scheduledExpenses/${expectedExpenseId}/isClosedManually`,
      ),
      value,
    );
  }
}
