import { cn } from "@/lib/utils"
import { Target } from "lucide-react"

export default function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Target className="h-6 w-6 text-primary" />
      <span className="text-xl font-bold font-headline text-foreground">
        MaqsadM
      </span>
    </div>
  )
}
