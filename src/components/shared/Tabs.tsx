import { createContext, useContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export enum TabList {
  Instance = 0,
  Recipient = 1,
  Chat = 2,
}

interface TabsProps {
  children: React.ReactNode[];
}

interface TabsContext {
  tabIndex: number;
  setTabIndex: (index: number) => void;
}

const TabsContext = createContext<TabsContext | null>(null);

function Tabs({ children }: TabsProps) {
  const [tabIndex, setTabIndex] = useState(TabList.Instance);

  return (
    <TabsContext.Provider value={{ tabIndex, setTabIndex }}>
      {children[tabIndex]}
    </TabsContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTabs() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("useTabs must be used within an Tabs");
  }
  return context;
}

export default Tabs;
