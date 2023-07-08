import React from 'react'
import { Tag, TagProps } from './Tag'
import { Meta } from '@storybook/react'
import type { StoryFn, StoryObj } from '@storybook/react'

const objectValuesToControls = (obj: Record<string, string>, control = 'select') => ({
  control,
  options: Object.keys(obj),
})
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Tag> = {
  title: 'Atoms/Tag',
  component: Tag,
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

type Story = StoryObj<typeof Tag>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof Tag> = (args: TagProps) => <Tag {...args} />

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  children: 'Tag',
  variant: 'primary',
  onClick: () => alert('clicking primary'),
}

export const Secondary: Story = Template.bind({})
Secondary.args = {
  children: 'Tag',
  variant: 'secondary',
}

export const Disabled = Template.bind({})
Disabled.args = {
  children: 'Tag',
  disabled: true,
}
