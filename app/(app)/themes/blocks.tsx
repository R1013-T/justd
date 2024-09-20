"use client"

import React from "react"

import { Buttons } from "@/app/(app)/themes/blocks/buttons"
import { RangeCalendarBlocks } from "@/app/(app)/themes/blocks/range-calendar-blocks"
import ChoiceboxDemo from "@/components/docs/collections/choicebox-demo"
import TableBulkDemo from "@/components/docs/collections/table-bulk-demo"
import { twJoin } from "tailwind-merge"
import { Choicebox, Tooltip } from "ui"

import { LoginForm } from "./blocks/login-form"

export function Blocks() {
  const colors = [
    "bg-primary",
    "bg-primary-fg",
    "bg-secondary",
    "bg-secondary-fg",
    "bg-tertiary",
    "bg-tertiary-fg",
    "bg-overlay",
    "bg-overlay-fg",
    "bg-muted",
    "bg-muted-fg",
    "bg-accent",
    "bg-accent-fg",
    "bg-accent-subtle",
    "bg-accent-subtle-fg"
  ]
  return (
    <div>
      <div className="flex sm:justify-center flex-wrap gap-2 sm:gap-3 [&_.clr]:size-6 text-xs font-mono mb-6 [&_.clr]:grid [&_.clr]:rounded-md [&>div]:place-content-center">
        {colors.map((color) => (
          <Tooltip key={color} delay={0}>
            <Tooltip.Trigger
              className={twJoin("clr ring-1 focus:ring-bg ring-fg/10 ring-inset", color)}
            />
            <Tooltip.Content>
              <span className="text-xs font-mono capitalize">
                {color.replace("bg-", "").replaceAll("-", " ").replace("fg", "foreground")}
              </span>
            </Tooltip.Content>
          </Tooltip>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
        <LoginForm />
        <RangeCalendarBlocks />
        <Buttons />

        <div className="col-span-full grid grid-cols-3 gap-2">
          <div className="col-span-2">
            <TableBulkDemo />
          </div>
          <div>
            <Choicebox
              gap={2}
              columns={1}
              defaultSelectedKeys={["standard"]}
              aria-label="Select items"
              selectionMode="multiple"
            >
              <Choicebox.Item
                id="basic"
                title="Basic"
                description="Just the essentials to get started."
              />
              <Choicebox.Item
                id="standard"
                title="Standard"
                description="A step up with more features and support."
              />
              <Choicebox.Item
                id="premium"
                title="Premium"
                description="Advanced options for growing needs."
              />
              <Choicebox.Item
                id="deluxe"
                title="Deluxe"
                description="Top-tier features for maximum performance."
              />
              <Choicebox.Item
                title="Ultimate"
                description="All-inclusive plan with every feature available."
              />
              <Choicebox.Item
                title="Enterprise"
                description="Custom solutions for large-scale operations."
              />
            </Choicebox>
          </div>
        </div>
      </div>
    </div>
  )
}
