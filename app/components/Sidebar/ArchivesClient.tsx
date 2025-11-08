'use client'

import {
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { ChevronRight } from 'lucide-react'
import { useState } from 'react'

export default function ArchivesClient({ archives }: { archives: string[] }) {
  const [open, setOpen] = useState(false)

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className="group/collapsible"
    >
      <CollapsibleTrigger asChild>
        <SidebarMenuButton>
          <span>Previous Challenges</span>
          <ChevronRight
            className={`ml-auto h-4 w-4 transition-transform ${
              open ? 'rotate-90' : ''
            }`}
          />
        </SidebarMenuButton>
      </CollapsibleTrigger>

      <CollapsibleContent>
        <SidebarMenuSub>
          <SidebarMenuSubItem>
            {archives.map((archive, i) => {
              return (
                <SidebarMenuSubButton key={i}>{archive}</SidebarMenuSubButton>
              )
            })}
          </SidebarMenuSubItem>
        </SidebarMenuSub>
      </CollapsibleContent>
    </Collapsible>
  )
}
