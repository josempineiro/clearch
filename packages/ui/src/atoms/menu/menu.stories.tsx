import React from 'react'
import { Meta } from '@storybook/react'
import type { StoryFn, StoryObj } from '@storybook/react'
import { Menu as MenuComponent, MenuProps, MenuItem } from '@/atoms'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof MenuComponent> = {
  title: 'Atoms/Menu',
  component: MenuComponent,
  subcomponents: { MenuItem },
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  args: {
    children: 'Menu',
  },
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof MenuComponent>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof MenuComponent> = (args: MenuProps) => {
  return (
    <MenuComponent {...args}>
      <MenuItem label="Item 1" />
      <MenuItem label="Item 2" />
      <MenuItem label="Item 3" />
    </MenuComponent>
  )
}

export const Menu: Story = Template.bind({})

// More on args: https://storybook.js.org/docs/react/writing-stories/args
Menu.args = {}
