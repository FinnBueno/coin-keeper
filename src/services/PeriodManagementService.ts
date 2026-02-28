import type { MonthPlanning } from "../repositories/periodManagement/IPeriodManagementRepository";
import type {
  IPeriodManagementRepository,
  MonthlyPeriod,
} from "../repositories/periodManagement/IPeriodManagementRepository";

const CURRENT_PERIOD_KEY = "currentPeriod";

export class PeriodManagementService {
  private repository: IPeriodManagementRepository;
  private currentPeriod?: MonthlyPeriod;

  constructor(repository: IPeriodManagementRepository) {
    this.repository = repository;
  }

  public getCurrentPeriod(): MonthlyPeriod | undefined {
    return this.currentPeriod;
  }

  public async fetchCurrentPeriod(): Promise<MonthlyPeriod | undefined> {
    return await this.repository.getPeriodById(CURRENT_PERIOD_KEY);
  }

  subscribeToCurrentPeriod(onChange: () => void): () => void {
    const unsubscribe = this.repository.subscribeToPeriod(
      CURRENT_PERIOD_KEY,
      (currentPeriod: MonthlyPeriod) => {
        this.currentPeriod = currentPeriod;
        onChange();
      },
    );
    return unsubscribe;
  }

  public async startNewPeriod(
    startAmount: number,
    toSharedAccount: number,
    toPersonalAccount: number,
    personalSpending: number,
    planning: MonthPlanning,
  ) {
    const now = Date.now();

    const newPeriod: MonthlyPeriod = {
      id: crypto.randomUUID(),
      startAmount,
      toSharedAccount,
      toPersonalAccount,
      personalSpending,
      planning,
      startTime: now,
    };

    if (this.currentPeriod) {
      // copy old current period to its own ID
      this.repository.upsertPeriodById(this.currentPeriod.id, {
        ...this.currentPeriod,
        endTimestamp: now,
      });
    }

    // insert newly created period into currentPeriod key
    this.repository.upsertPeriodById(CURRENT_PERIOD_KEY, newPeriod);
  }

  async manuallyCloseExpectedExpense(id: string) {
    return await this.repository.setClosedManually(
      CURRENT_PERIOD_KEY,
      id,
      true,
    );
  }

  async undoManualCloseExpectedExpense(id: string) {
    return await this.repository.setClosedManually(
      CURRENT_PERIOD_KEY,
      id,
      false,
    );
  }
}
