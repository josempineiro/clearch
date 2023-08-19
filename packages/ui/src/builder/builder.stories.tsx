import { Builder as BuilderComponent } from './builder'
import { Meta } from '@storybook/react'
import type { StoryObj } from '@storybook/react'
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof BuilderComponent> = {
  title: 'Builder/Builder',
  component: BuilderComponent,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    onClick: { action: true, control: false },
    variant: {
      options: ['primary', 'secondary', 'tertiary'],
      control: { type: 'radio' },
    },
    size: {
      options: ['s', 'm', 'l'],
      control: { type: 'radio' },
    },
  },
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof BuilderComponent>

export const Builder: Story = {
  args: {
    children: 'Builder',
    variant: 'primary',
  },
}
