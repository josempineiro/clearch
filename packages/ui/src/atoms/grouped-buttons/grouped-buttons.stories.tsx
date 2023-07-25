import React from 'react'
import { Button } from '@/atoms'
import { GroupedButtons as GroupedButtonsComponent, GroupedButtonsProps } from './grouped-buttons'
import { Meta } from '@storybook/react'
import type { StoryFn, StoryObj } from '@storybook/react'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof GroupedButtonsComponent> = {
  title: 'Atoms/GroupedButtons',
  component: GroupedButtonsComponent,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  parameters: {
    layout: 'centered',
  },
}
export default meta

type Story = StoryObj<typeof GroupedButtonsComponent>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof GroupedButtonsComponent> = (args: GroupedButtonsProps) => {
  return (
    <GroupedButtonsComponent {...args}>
      <Button>A</Button>
      <Button>B</Button>
      <Button>C</Button>
    </GroupedButtonsComponent>
  )
}

export const GroupedButtons: Story = Template.bind({})

// More on args: https://storybook.js.org/docs/react/writing-stories/args
GroupedButtons.args = {}
