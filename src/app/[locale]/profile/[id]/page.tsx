
'use client';

import { useParams, notFound } from 'next/navigation';
import AppLayout from "@/components/layout/app-layout";
import { getUserById } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Coins, Upload, Briefcase } from "lucide-react";
import ProfileForm from "@/components/profile/profile-form";
import HabitTracker from '@/components/profile/habit-tracker';
import type { User } from "@/lib/types";
import { useTranslation } from "react-i18next";
import { Separator } from '@/components/ui/separator';
import GoBackButton from '@/components/go-back-button';
import GoalMates from '@/components/profile/goal-mates';


export default function ProfilePage() {
  const { t } = useTranslation();
  const params = useParams();
  const userId = params.id as string;
  // In a real app, this would come from an auth context
  const currentUserId = 'user-1';
  const isCurrentUser = userId === currentUserId;
  
  const user = getUserById(userId);

  if (!user) {
      notFound();
  }

  return (
    <AppLayout>
      <div className="space-y-8">
        <GoBackButton />
        <div>
          <h1 className="text-3xl font-bold font-headline">{isCurrentUser ? t('profile.title') : user.fullName}</h1>
          {!isCurrentUser && <p className="text-muted-foreground">{user.occupation}</p>}
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row gap-6">
                <div className="relative w-32 h-32">
                  <Avatar className="w-32 h-32 border-4 border-background ring-4 ring-primary">
                    <AvatarImage src={user.avatarUrl} alt={user.fullName} />
                    <AvatarFallback className="text-4xl">{user.fullName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {isCurrentUser && (
                    <Button size="icon" className="absolute -bottom-2 -right-2 rounded-full h-10 w-10">
                        <Upload className="h-5 w-5"/>
                    </Button>
                  )}
                </div>
                <div className="flex flex-col justify-center gap-1">
                    <h2 className="text-3xl font-bold font-headline">{user.fullName}</h2>
                     <div className="flex items-center gap-2 text-muted-foreground">
                        <Briefcase className="h-5 w-5" />
                        <span className="text-lg">{user.occupation}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                        <Coins className="h-6 w-6 text-amber-500" />
                        <span className="text-2xl font-semibold">{user.coins}</span>
                        <span className="text-muted-foreground">{t('profile.coinsEarned')}</span>
                    </div>
                </div>
            </div>
          </CardHeader>
          <CardContent>
             {isCurrentUser ? (
                <ProfileForm user={user} />
             ) : (
                <>
                 <Separator className="my-6" />
                  <div className="space-y-6">
                      <div>
                          <h3 className="text-lg font-semibold">{t('profile.myGoals')}</h3>
                          <p className="mt-1 text-muted-foreground">{user.goals}</p>
                      </div>
                       <div>
                          <h3 className="text-lg font-semibold">{t('profile.myHabits')}</h3>
                          <p className="mt-1 text-muted-foreground">{user.habits}</p>
                      </div>
                  </div>
                </>
             )}
          </CardContent>
        </Card>
        
        <HabitTracker user={user} />

        <GoalMates userId={user.id} />

      </div>
    </AppLayout>
  );
}
