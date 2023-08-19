import React from 'react'
import { TextField, TextFieldProps } from './text-field'
import { Meta } from '@storybook/react'
import type { StoryFn } from '@storybook/react'

const meta: Meta<typeof TextField> = {
  title: 'Molecules/TextField',
  component: TextField,
  args: {
    label: 'Label',
  }
}
export default meta

const Template: StoryFn<typeof TextField> = (args: TextFieldProps) => <TextField {...args} />

const TextFieldStory = Template.bind({})

export {
  TextFieldStory as TextField,
}

export const TextFieldWithError = Template.bind({})

TextFieldWithError.args = {
  error: 'Invalid value',
}
export const TextFieldWithHint = Template.bind({})

TextFieldWithHint.args = {
  hint: 'Introduce your name',
}