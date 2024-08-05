ALTER TABLE "movements" ALTER COLUMN "description" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "purchases" ALTER COLUMN "date" SET DATA TYPE date;--> statement-breakpoint
ALTER TABLE "sales" ALTER COLUMN "date" SET DATA TYPE date;