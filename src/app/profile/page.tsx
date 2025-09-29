import AppLayout from "@/components/layout/app-layout";
import { getUserById } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Coins, Edit, Upload } from "lucide-react";
import ProfileForm from "@/components/profile/profile-form";
import type { User } from "@/lib/types";

export default function ProfilePage() {
  // In a real app, this would come from an auth context
  const user = getUserById('user-1') as User;

  return (
    <AppLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold font-headline">My Profile</h1>
          <p className="text-muted-foreground">Manage your personal information, goals, and habits.</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row gap-6">
                <div className="relative w-32 h-32">
                  <Avatar className="w-32 h-32 border-4 border-background ring-4 ring-primary">
                    <AvatarImage src={user.avatarUrl} alt={user.name} />
                    <AvatarFallback className="text-4xl">{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <Button size="icon" className="absolute -bottom-2 -right-2 rounded-full h-10 w-10">
                    <Upload className="h-5 w-5"/>
                  </Button>
                </div>
                <div className="flex flex-col justify-center">
                    <h2 className="text-3xl font-bold font-headline">{user.name}</h2>
                    <div className="flex items-center gap-2 mt-2">
                        <Coins className="h-6 w-6 text-amber-500" />
                        <span className="text-2xl font-semibold">{user.coins}</span>
                        <span className="text-muted-foreground">coins earned</span>
                    </div>
                </div>
            </div>
          </CardHeader>
          <CardContent>
             <ProfileForm user={user} />
          </CardContent>
        </Card>

      </div>
    </AppLayout>
  );
}
