// components/sections/LocalTime.tsx
// Current time in Colombo, so visitors know whether I am likely awake.
"use client";

import { useEffect, useState } from "react";

const fmt = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Asia/Colombo",
});

export default function LocalTime() {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 20_000);
    return () => window.clearInterval(id);
  }, []);

  return <time suppressHydrationWarning>{now ? `${now} local` : "UTC+5:30"}</time>;
}
