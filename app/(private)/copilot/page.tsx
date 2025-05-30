"use client"
import Page from "@/components/layout/Page"
import Chat from "./chat"
import MainPanel from "./main-panel"
import { AddColumnProvider } from "@/context/newColumn"

export default function CoPilotChat() {
  return (
    <AddColumnProvider>
      <Page title="Copilot Test">
        <MainPanel />
      </Page>
    </AddColumnProvider>
  )
}
