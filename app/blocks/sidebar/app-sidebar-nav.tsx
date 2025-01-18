"use client"
import { Breadcrumbs, Separator, SidebarNav, SidebarTrigger } from "ui"

export default function AppSidebarNav() {
  return (
    <SidebarNav>
      <span className="flex items-center gap-x-4">
        <SidebarTrigger className="-mx-2" />
        <Separator className="h-6" orientation="vertical" />
        <Breadcrumbs className="@md:flex hidden">
          <Breadcrumbs.Item href="/blocks/sidebar/sidebar-01">Dashboard</Breadcrumbs.Item>
          <Breadcrumbs.Item>Newsletter</Breadcrumbs.Item>
        </Breadcrumbs>
      </span>
    </SidebarNav>
  )
}
