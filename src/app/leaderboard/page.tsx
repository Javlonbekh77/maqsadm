import AppLayout from "@/components/layout/app-layout";
import LeaderboardTabs from "@/components/leaderboard/leaderboard-tabs";

export default function LeaderboardPage() {
  return (
    <AppLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold font-headline">Leaderboard</h1>
          <p className="text-muted-foreground">See who's leading the pack. Keep pushing forward!</p>
        </div>
        <LeaderboardTabs />
      </div>
    </AppLayout>
  );
}
