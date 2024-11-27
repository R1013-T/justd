"use client"

import React from "react"

import { Switch } from "ui"

export default function SwitchUncontrolledDemo() {
  return (
    <>
      <Switch defaultSelected>
        {({ isSelected }) => <>{isSelected ? "Enable Dark Mode" : "Disable Dark Mode"}</>}
      </Switch>
    </>
  )
}
