import React from 'react'
import { Input, InputProps } from './input'
import { Meta } from '@storybook/react'
import type { StoryObj, StoryFn } from '@storybook/react'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  tags: ['autodocs']
}

export default meta

type Story = StoryObj<typeof Input>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof Input> = (args: InputProps) => <Input {...args} />

const InputStory = Template.bind({})

// More on args: https://storybook.js.org/docs/react/writing-stories/args
InputStory.args = {
  value: 'Input',
}
export {
  InputStory as Input,
}
