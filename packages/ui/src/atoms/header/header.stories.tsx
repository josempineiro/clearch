import React from 'react'
import { Header as HeaderComponent, HeaderProps } from './header'
import { Meta } from '@storybook/react'
import type { StoryFn } from '@storybook/react'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof HeaderComponent> = {
  title: 'Atoms/Header',
  component: HeaderComponent,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    children: { control: 'text' },
  },
}
export default meta

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof HeaderComponent> = (args: HeaderProps) => <HeaderComponent {...args} />

export const Header = Template.bind({})

// More on args: https://storybook.js.org/docs/react/writing-stories/args
Header.args = {
  children: 'Header',
}
