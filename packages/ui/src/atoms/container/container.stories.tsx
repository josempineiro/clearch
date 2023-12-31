import React from 'react'
import { Container as ContainerComponent, ContainerProps } from './container'
import { Meta } from '@storybook/react'
import type { StoryFn, StoryObj } from '@storybook/react'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof ContainerComponent> = {
  title: 'Atoms/Container',
  component: ContainerComponent,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    children: { control: 'text' },
  },
}
export default meta

type Story = StoryObj<typeof ContainerComponent>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof ContainerComponent> = (args: ContainerProps) => <ContainerComponent {...args} />

export const Container: Story = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Container.args = {
  children: 'Container',
  padding: 's',
  variant: 'filled',
  color: 'primary',
}
