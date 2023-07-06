import React from 'react'
import { Button, ButtonProps } from './button'
import { Meta } from '@storybook/react'
import type { StoryFn } from '@storybook/react'

const objectValuesToControls = (obj: Record<string, string>, control = 'select') => ({
  control,
  options: Object.keys(obj),
})
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    children: { control: 'text' },
    variant: objectValuesToControls({
      primary: 'primary',
      secondary: 'secondary',
    }),
    onClick: { action: 'clicked' },
  },
}
export default meta

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof Button> = (args: ButtonProps) => <Button {...args} />

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  children: 'Button',
  variant: 'primary',
  onClick: () => alert('clicking primary'),
}

export const Secondary = Template.bind({})
Secondary.args = {
  children: 'Button',
  variant: 'secondary',
}

export const Disabled = Template.bind({})
Disabled.args = {
  children: 'Button',
  disabled: true,
}
