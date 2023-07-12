import React, { createContext } from 'react'
import cn from 'classnames'
import styles from './tabs.module.css'
import { AnimatePresence } from 'framer-motion'

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
  children: React.ReactNode
  tabs: React.ReactNode
  active?: string
  onChange: (id: string) => void
}

export interface TabItemProps extends React.HTMLAttributes<HTMLLIElement> {
  children: React.ReactNode
  id: string
}

export interface TabsContextValue {
  active?: string
  onChange: (id: string) => void
}

export const TabsContext = createContext<TabsContextValue>({
  active: undefined,
  onChange: () => undefined,
})

export function useTabsContext() {
  const context = React.useContext(TabsContext)
  if (context === undefined) {
    throw new Error('useTabsContext must be used within a Tabs')
  }
  return context
}

export function TabItem({ children, className, id, ...rest }: TabItemProps) {
  const { active, onChange } = useTabsContext()
  return (
    <li
      className={cn(styles.tab, className, { [styles.active]: active === id })}
      onClick={() => {
        onChange(id)
      }}
      {...rest}
    >
      {children}
    </li>
  )
}

export function TabItems({ children, className, ...rest }: React.HTMLAttributes<HTMLUListElement>) {
  return (
    <ul className={cn(styles['tab-items'], className)} {...rest}>
      {children}
    </ul>
  )
}
export function Tabs({ children, tabs, className, active, onChange = () => undefined, ...rest }: TabsProps) {
  return (
    <TabsContext.Provider
      value={{
        active,
        onChange,
      }}
    >
      <nav className={cn(styles.tabsNav, className)} {...rest}>
        {tabs}
      </nav>
      <AnimatePresence exitBeforeEnter>{children}</AnimatePresence>
    </TabsContext.Provider>
  )
}
