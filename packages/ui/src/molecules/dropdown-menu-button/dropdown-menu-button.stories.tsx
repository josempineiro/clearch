import React from 'react'
import { Meta } from '@storybook/react'
import type { StoryFn, StoryObj } from '@storybook/react'
import { MenuItem } from '@/atoms'
import {
  DropdownMenuButton as DropdownMenuButtonComponent,
  DropdownMenuItem,
  DropdownMenuButtonProps,
} from '@/molecules'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof DropdownMenuButtonComponent> = {
  title: 'Atoms/DropdownMenuButton',
  component: DropdownMenuButtonComponent,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  args: {
    children: 'DropdownMenuButton',
  },
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof DropdownMenuButtonComponent>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof DropdownMenuButtonComponent> = (args: DropdownMenuButtonProps) => {
  const [visible, setVisible] = React.useState(false)
  const onToggle = React.useCallback(() => {
    setVisible((visible) => !visible)
  }, [])
  console.log({ ...args })
  return (
    <DropdownMenuButtonComponent {...args} visible={visible} onToggle={onToggle}>
      <MenuItem label="Item 1" />
      <MenuItem label="Item 2" />
      <DropdownMenuItem label="Item 3">
        <MenuItem label="Item 3.1" />
        <MenuItem label="Item 3.2" />
      </DropdownMenuItem>
      <MenuItem label="Item 4" />
    </DropdownMenuButtonComponent>
  )
}

export const DropdownMenuButton: Story = Template.bind({})

// More on args: https://storybook.js.org/docs/react/writing-stories/args
DropdownMenuButton.args = {
  children: 'DropdownMenuButton',
}
