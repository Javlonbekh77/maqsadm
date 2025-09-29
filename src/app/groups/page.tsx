
'use client';

import AppLayout from "@/components/layout/app-layout";
import { getGroups } from "@/lib/data";
import GroupCard from "@/components/groups/group-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Search } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function GroupsPage() {
  const { t } = useTranslation();
  const groups = getGroups();

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold font-headline">{t('groups.title')}</h1>
            <p className="text-muted-foreground">{t('groups.subtitle')}</p>
          </div>
          <div className="flex gap-2">
             <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder={t('groups.searchPlaceholder')}
                className="pl-8 w-full"
              />
            </div>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              {t('groups.createGroup')}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {groups.map((group) => (
            <GroupCard key={group.id} group={group} />
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
