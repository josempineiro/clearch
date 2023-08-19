import React from 'react'
import { IconButton } from './icon-button'
import { Meta } from '@storybook/react'
import type { StoryObj } from '@storybook/react'
import { userEvent, waitFor, within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import { Icon } from '@/atoms/icon'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof IconButton> = {
  title: 'Atoms/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: true, control: false },
    variant: {
      control: { type: 'radio' },
    },
    color: {
      control: { type: 'radio' },
    },
    size: {
      control: { type: 'radio' },
    },
  },
  parameters: {
    layout: 'centered',
  },
}
export default meta

type Story = StoryObj<typeof IconButton>

const IconButtonStory: Story = {
  args: {
    children: (<Icon viewBox="0 0 32 32">
      <polygon style={{ fill: "none", stroke: "currentColor", strokeWidth: 2, strokeMiterlimit: 10 }} points="6.9,8 16,17.1 25.1,8 29,11.9 16,24.9 
	3,11.9 "/>
    </Icon>),
    variant: 'filled',
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('Click icon button', async () => {
      await userEvent.click(canvas.getByRole('icon-button'))
    })

    await waitFor(() => expect(args.onClick).toHaveBeenCalled())
  },
}

export {
  IconButtonStory as IconButton
}