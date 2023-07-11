import React from 'react'
import { Text as TextComponent, TextProps } from './text'
import { Meta } from '@storybook/react'
import type { StoryFn, StoryObj } from '@storybook/react'

const objectValuesToControls = (obj: Record<string, string>, control = 'select') => ({
  control,
  options: Object.keys(obj),
})
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof TextComponent> = {
  title: 'Atoms/Text',
  component: TextComponent,
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

type Story = StoryObj<typeof TextComponent>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof TextComponent> = (args: TextProps) => <TextComponent {...args} />

export const Default: Story = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  children: 'Text',
}

export const Primary: Story = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  children: 'Primary',
  color: 'primary',
}

export const Secondary: Story = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Secondary.args = {
  children: 'Secondary',
  color: 'secondary',
}

export const Tertiary: Story = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Tertiary.args = {
  children: 'Tertiary',
  color: 'tertiary',
}

export const Title: Story = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Title.args = {
  children: 'Title',
  variant: 'title',
}

export const Subtitle: Story = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Subtitle.args = {
  children: 'Subtitle',
  variant: 'subtitle',
}

export const Body: Story = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Body.args = {
  children: 'Body',
  variant: 'body',
}

export const Caption: Story = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Caption.args = {
  children: 'Caption',
  variant: 'caption',
}
