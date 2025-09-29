
'use client';

import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import AppLayout from '@/components/layout/app-layout';
import { getGroupById, getUserById, getTasksByGroupId } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Coins, Crown, Plus, UserPlus } from 'lucide-react';
import CreateTaskDialog from '@/components/groups/create-task-dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTranslation } from 'react-i18next';
import Link from 'next/link';


export default function GroupDetailPage() {
  const { t } = useTranslation();
  const params = useParams();
  const id = params.id as string;
  const group = getGroupById(id);
  // In a real app, this would be from an auth context
  const currentUserId = 'user-1';

  if (!group) {
    notFound();
  }
  
  const members = group.members.map(id => getUserById(id)).filter(Boolean);
  const tasks = getTasksByGroupId(group.id);
  const isAdmin = group.adminId === currentUserId;

  return (
    <AppLayout>
      <div className="space-y-8">
        <header className="relative w-full h-64 rounded-xl overflow-hidden">
          <Image
            src={group.imageUrl}
            alt={group.name}
            fill
            className="object-cover"
            data-ai-hint={group.imageHint}
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-8">
            <h1 className="text-4xl font-bold text-white font-headline">{group.name}</h1>
            <p className="text-lg text-white/80 max-w-2xl mt-2">{group.description}</p>
          </div>
           <div className="absolute top-4 right-4">
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                {t('groupDetail.joinGroup')}
              </Button>
            </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>{t('groupDetail.tasksTitle')}</CardTitle>
                  <CardDescription>{t('groupDetail.tasksDescription')}</CardDescription>
                </div>
                {isAdmin && <CreateTaskDialog />}
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('groupDetail.taskColumn')}</TableHead>
                      <TableHead className='text-right'>{t('groupDetail.rewardColumn')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tasks.map(task => (
                      <TableRow key={task.id}>
                        <TableCell>
                          <div className="font-medium">{task.title}</div>
                          <div className="text-sm text-muted-foreground hidden md:block">{task.description}</div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1 font-semibold text-amber-500">
                             <Coins className="w-4 h-4" />
                             <span>{task.coins}</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>{t('groupDetail.membersTitle', { count: members.length })}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {members.map(member => member && (
                  <div key={member.id} className="flex items-center justify-between">
                    <Link href={`/profile/${member.id}`} className="flex items-center gap-3 hover:underline">
                      <Avatar>
                        <AvatarImage src={member.avatarUrl} alt={member.name} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className='flex flex-col'>
                         <p className="font-medium">{member.name}</p>
                          {group.adminId === member.id && (
                            <Badge variant="secondary" className="gap-1 pl-1.5 w-fit">
                              <Crown className="h-3 w-3 text-amber-500" />
                              {t('groupDetail.adminBadge')}
                            </Badge>
                          )}
                      </div>
                    </Link>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <Coins className="w-4 h-4 text-amber-500"/>
                        {member.coins}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
