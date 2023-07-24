import React from 'react'
import { Meta } from '@storybook/react'
import type { StoryFn, StoryObj } from '@storybook/react'
import { DropdownButton as DropdownButtonComponent, DropdownButtonProps } from '@/molecules'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof DropdownButtonComponent> = {
  title: 'Atoms/DropdownButton',
  component: DropdownButtonComponent,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  args: {
    children: 'DropdownButton',
  },
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof DropdownButtonComponent>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof DropdownButtonComponent> = (args: DropdownButtonProps) => (
  <DropdownButtonComponent {...args} />
)

export const DropdownButton: Story = Template.bind({})

// More on args: https://storybook.js.org/docs/react/writing-stories/args
DropdownButton.args = {
  children: 'DropdownButton',
}
