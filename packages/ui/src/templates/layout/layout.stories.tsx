import React from 'react'
import { Layout as LayoutComponent, LayoutProps } from './layout'
import { Meta } from '@storybook/react'
import type { StoryFn, StoryObj } from '@storybook/react'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof LayoutComponent> = {
  title: 'Atoms/Layout',
  component: LayoutComponent,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    children: { control: 'text' },
    onClick: { action: 'clicked' },
  },
}
export default meta

type Story = StoryObj<typeof LayoutComponent>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof LayoutComponent> = (args: LayoutProps) => <LayoutComponent {...args} />

export const Layout: Story = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Layout.args = {
  children: 'Layout',
}
