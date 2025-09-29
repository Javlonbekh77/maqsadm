
'use client';

import { getGoalMates } from "@/lib/data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { useTranslation } from "react-i18next";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";

interface GoalMatesProps {
    userId: string;
}

export default function GoalMates({ userId }: GoalMatesProps) {
    const { t } = useTranslation();
    const goalMates = getGoalMates(userId);

    if (goalMates.length === 0) {
        return null;
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t('profile.goalMates')}</CardTitle>
                <CardDescription>
                    {t('profile.goalMatesDescription', { count: goalMates.length })}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {goalMates.map(mate => (
                        <Link href={`/profile/${mate.id}`} key={mate.id} className="group flex flex-col items-center gap-2 text-center">
                            <Avatar className="h-20 w-20 ring-2 ring-offset-2 ring-offset-background ring-transparent group-hover:ring-primary transition-all">
                                <AvatarImage src={mate.avatarUrl} alt={mate.name} />
                                <AvatarFallback>{mate.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="text-sm font-medium">{mate.name}</div>
                        </Link>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
