import React from 'react'
import { Button as ButtonComponent, ButtonProps } from './button'
import { Meta } from '@storybook/react'
import type { StoryFn, StoryObj } from '@storybook/react'
import { userEvent, waitFor, within } from '@storybook/testing-library'
import { DocsContainer } from '@storybook/addon-docs/blocks'
import { TabContainer } from 'storybook-addon-docs-tabs'
import { expect } from '@storybook/jest'

const objectValuesToControls = (obj: Record<string, string>, control = 'select') => ({
  control,
  options: Object.keys(obj),
})

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof ButtonComponent> = {
  title: 'Atoms/Button',
  component: ButtonComponent,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
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
    docs: {
      container: ({ children, context }) => (
        <DocsContainer context={context}>
          <TabContainer context={context}>{children}</TabContainer>
        </DocsContainer>
      ),
    },
  },
}
export default meta

type Story = StoryObj<typeof ButtonComponent>

export const Button: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('Click button', async () => {
      await userEvent.click(canvas.getByRole('button'))
    })

    await waitFor(() => expect(args.onClick).toHaveBeenCalled())
  },
}
