"use client";

import { Provider } from "react-redux";
import { store } from "./_lib/store";

function StoreProviders({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
export default StoreProviders;
