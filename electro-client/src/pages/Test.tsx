import React from "react";
import { AppShell } from "@mantine/core";
import { HeaderSearch } from "../components/HeaderSearch/HeaderSearch";
import { NavbarSimple } from "../components/NavbarSimple/NavbarSimple";

export default function Test() {
  const links = [
    {
      link: "/",
      label: "Client",
    },
    {
      link: "/admin",
      label: "Admin",
    },
    {
      link: "/test",
      label: "Test",
    },
  ]

  return (
    <div>
      <AppShell
        padding="md"
        navbar={<NavbarSimple/>}
        header={<HeaderSearch links={links}/>}
        styles={(theme) => ({
          main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
        })}
      >
        {"Electro Application"}
      </AppShell>
    </div>
  )
}
