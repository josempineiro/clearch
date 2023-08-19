import React from 'react'
import { Label, LabelProps } from './label'
import { Meta } from '@storybook/react'
import type { StoryFn } from '@storybook/react'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Label> = {
  title: 'Atoms/Label',
  component: Label,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    children: { control: 'text' },
  },
}
export default meta

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof Label> = (args: LabelProps) => <Label {...args} />

const LabelStory = Template.bind({})

// More on args: https://storybook.js.org/docs/react/writing-stories/args
LabelStory.args = {
  children: 'Label',
}
export {
  LabelStory as Label,
}
