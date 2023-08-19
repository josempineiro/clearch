import React from 'react'
import { Checkbox, CheckboxProps } from './checkbox'
import { Meta } from '@storybook/react'
import type { StoryObj, StoryFn } from '@storybook/react'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Checkbox> = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],

}

export default meta

type Story = StoryObj<typeof Checkbox>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof Checkbox> = (args: CheckboxProps) => {
  const [value, setValue] = React.useState<boolean>(args.value)
  return <Checkbox {...args} value={value} onChange={(value) => {
    setValue(value)
  }} />
}

const CheckboxStory = Template.bind({})

// More on args: https://storybook.js.org/docs/react/writing-stories/args
CheckboxStory.args = {
  value: true,
  onChange: () => {
    // eslint-disable-next-line no-console
  },
}

export {
  CheckboxStory as Checkbox,
}


export const CheckboxWithLabel = Template.bind({})

// More on args: https://storybook.js.org/docs/react/writing-stories/args
CheckboxWithLabel.args = {
  label: 'Checkbox',
  value: true,
  onChange: () => {
    // eslint-disable-next-line no-console
  },
}