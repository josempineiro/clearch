import React from 'react'
import { Meta } from '@storybook/react'
import type { StoryFn, StoryObj } from '@storybook/react'
import { Popup as PopupComponent, PopupProps } from './popup'
import { Button } from '@/atoms/button'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof PopupComponent> = {
  title: 'Atoms/Popup',
  component: PopupComponent,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  args: {
    children: 'Popup',
    target: <Button>Target</Button>,
    variant: 'filled',
    color: 'primary',
    padding: ['s', 'xs'],
  },
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof PopupComponent>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof PopupComponent> = (args: PopupProps) => <PopupComponent {...args} />

export const Popup: Story = Template.bind({})

// More on args: https://storybook.js.org/docs/react/writing-stories/args
Popup.args = {
  children: 'Popup',
}

export const VisibleWithHover: Story = Template.bind({})

// More on args: https://storybook.js.org/docs/react/writing-stories/args
VisibleWithHover.args = {
  trigger: 'hover',
}

export const ContentWidth: Story = Template.bind({})

// More on args: https://storybook.js.org/docs/react/writing-stories/args
ContentWidth.args = {
  trigger: 'hover',
  width: 'content',
  children: <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>,
}

export const TargetWidth: Story = Template.bind({})

// More on args: https://storybook.js.org/docs/react/writing-stories/args
TargetWidth.args = {
  trigger: 'hover',
  width: 'target',
  children: <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>,
}

export const SmallWidth: Story = Template.bind({})

// More on args: https://storybook.js.org/docs/react/writing-stories/args
SmallWidth.args = {
  trigger: 'hover',
  width: 's',
  children: <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>,
}
