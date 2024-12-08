import { CronJob } from "cron";
import { AppServiceMap } from "../contract/service.contract";

class MonthEndChecker {
    private cronJob: CronJob;
    private service!: AppServiceMap;
    constructor() {
        // Run every day at midnight (00:00:00)
        this.cronJob = new CronJob("0 0 0 * * *", () => {
            if (this.isLastDayOfMonth()) {
                this.executeMonthEndTask();
            }
        });
    }

    /**
     * Checks if today is the last day of the current month
     */
    private isLastDayOfMonth(): boolean {
        const today = new Date();
        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        return today.getDate() === lastDayOfMonth.getDate();
    }

    /**
     * Execute the month-end task
     * You can modify this method to implement your specific logic
     */
    private executeMonthEndTask(): void {
        this.service.gaji.createGajiKaryawan();
    }

    /**
     * Start the cron job
     */
    public start(service: AppServiceMap): void {
        this.service = service;
        this.cronJob.start();
        console.log("Month-end checker started");
    }
}

export const cronModule = new MonthEndChecker();
