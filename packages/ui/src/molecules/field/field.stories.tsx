import React from 'react'
import { Input } from '@/atoms'
import { Field, FieldProps } from './field'
import { Meta } from '@storybook/react'
import type { StoryFn } from '@storybook/react'

const meta: Meta<typeof Field> = {
  title: 'Molecules/Field',
  component: Field,
  args: {
    children: <Input value="" />,
    label: 'Label',
  }
}
export default meta

const Template: StoryFn<typeof Field> = (args: FieldProps) => <Field {...args} />

const FieldStory = Template.bind({})

export {
  FieldStory as Field,
}

export const FieldWithError = Template.bind({})

FieldWithError.args = {
  error: 'Invalid value',
}
export const FieldWithHint = Template.bind({})

FieldWithHint.args = {
  hint: 'Introduce your name',
}