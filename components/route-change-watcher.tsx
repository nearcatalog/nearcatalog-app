"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSearchStore } from "@/store/search-store";
import { useSearchModalStore } from "@/store/search-modal-store";

/**
 * Clears the global search key whenever the user navigates to a new route,
 * so stale search results don't persist across pages.
 */
export default function RouteChangeWatcher() {
  const pathname = usePathname();
  const { setSearchKey } = useSearchStore();
  const { setSearchKey: setModalSearchKey } = useSearchModalStore();

  useEffect(() => {
    setSearchKey("");
    setModalSearchKey("");
  }, [pathname, setSearchKey, setModalSearchKey]);

  return null;
}
