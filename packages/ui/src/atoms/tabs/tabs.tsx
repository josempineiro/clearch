import React, { forwardRef, createContext } from 'react'
import cn from 'classnames'
import styles from './tabs.module.css'

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

/**
 * This is a custom hook that will throw an error if the component is not wrapped in a Tabs component.
 * This is useful for making sure that the component is used correctly.
 **/
export function useTabsContext() {
  const context = React.useContext(TabsContext)
  if (context === undefined) {
    throw new Error('useTabsContext must be used within a Tabs')
  }
  return context
}

export const TabItem = forwardRef<HTMLLIElement, TabItemProps>(({ children, className, id, ...rest }, ref) => {
  const { active, onChange } = useTabsContext()
  return (
    <li
      ref={ref}
      className={cn(styles.tab, className, { [styles.active]: active === id })}
      onClick={() => {
        if (active !== id) {
          onChange(id)
        }
      }}
      {...rest}
    >
      {children}
    </li>
  )
})

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
      <div>
        <nav className={cn(styles['tabs-nav'], className)} {...rest}>
          {tabs}
        </nav>
        <section>{children}</section>
      </div>
    </TabsContext.Provider>
  )
}
