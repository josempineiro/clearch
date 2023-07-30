import React from 'react'
import { Meta } from '@storybook/react'
import type { StoryFn, StoryObj } from '@storybook/react'
import { useToggleState } from '@clearq/core'
import { MenuItem, Menu } from '@/atoms'
import { Tooltip, DropdownMenu as DropdownMenuComponent, DropdownMenuItem, DropdownMenuProps } from '@/molecules'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof DropdownMenuComponent> = {
  title: 'Molecules/DropdownMenu',
  component: DropdownMenuComponent,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof DropdownMenuComponent>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof DropdownMenuComponent> = (args: DropdownMenuProps) => {
  const [visible, toggle] = useToggleState()
  return (
    <Menu>
      <DropdownMenuComponent
        {...args}
        visible={visible}
        onClickOutside={toggle}
        target={<MenuItem onClick={toggle} active={visible} label={'Item'} />}
      >
        <Tooltip usePortal={false} offsetX={8} position="left" alignment="middle" target={<MenuItem label="Item 1" />}>
          Item 1 description
        </Tooltip>
        <Tooltip usePortal={false} offsetX={8} position="left" alignment="middle" target={<MenuItem label="Item 2" />}>
          Item 2 description
        </Tooltip>

        <Tooltip
          usePortal={false}
          offsetX={8}
          position="left"
          alignment="middle"
          target={
            <DropdownMenuItem label="Item 3" position="right" alignment="start">
              <MenuItem label="Item 3.1" />
              <MenuItem label="Item 3.2" />
            </DropdownMenuItem>
          }
        >
          Item 3 description
        </Tooltip>
        <MenuItem label="Item 4" />
      </DropdownMenuComponent>
    </Menu>
  )
}

export const DropdownMenu: Story = Template.bind({})

// More on args: https://storybook.js.org/docs/react/writing-stories/args
DropdownMenu.args = {
  children: 'DropdownMenu',
}
