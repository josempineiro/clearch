import { Button } from './button'
import { Meta } from '@storybook/react'
import type { StoryObj } from '@storybook/react'
import { userEvent, waitFor, within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
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

type Story = StoryObj<typeof Button>

const ButtonStory: Story = {
  args: {
    children: 'Button',
    variant: 'filled',
    color: 'primary',
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('Click button', async () => {
      await userEvent.click(canvas.getByRole('button'))
    })

    await waitFor(() => expect(args.onClick).toHaveBeenCalled())
  },
}

export {
  ButtonStory as Button
}