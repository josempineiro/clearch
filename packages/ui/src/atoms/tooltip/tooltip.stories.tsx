import React from 'react'
import { Tooltip as TooltipComponent, TooltipProps } from './tooltip'
import { Meta } from '@storybook/react'
import type { StoryFn, StoryObj } from '@storybook/react'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof TooltipComponent> = {
  title: 'Atoms/Tooltip',
  component: TooltipComponent,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  args: {
    children: 'Tooltip',
    target: <div>Target</div>,
  },
}

export default meta

type Story = StoryObj<typeof TooltipComponent>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof TooltipComponent> = (args: TooltipProps) => <TooltipComponent {...args} />

export const Tooltip: Story = Template.bind({})

// More on args: https://storybook.js.org/docs/react/writing-stories/args
Tooltip.args = {
  children: 'Tooltip',
  target: <div>Target</div>,
}

export const VisibleWithHover: Story = Template.bind({})

// More on args: https://storybook.js.org/docs/react/writing-stories/args
VisibleWithHover.args = {
  trigger: 'hover',
}
