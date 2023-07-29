import React from 'react'
import { Meta } from '@storybook/react'
import type { StoryFn, StoryObj } from '@storybook/react'
import { useToggleState } from '@clearq/core'
import { Button } from '@/atoms'
import { Dropdown as Dropdown, DropdownProps } from './dropdown'
import { LoremIpsum, Box } from '@/stories'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Dropdown> = {
  title: 'Molecules/Dropdown',
  component: Dropdown,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  tags: ['autodocs'],
  argTypes: {},
  args: {},
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof Dropdown>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof Dropdown> = (args: DropdownProps) => {
  const [visible, toggle] = useToggleState(false)
  return (
    <Dropdown
      {...args}
      usePortal
      visible={visible}
      target={
        <Box size={100} onClick={toggle}>
          Target
        </Box>
      }
      onClickOutside={toggle}
    >
      <Box size={200}>Content</Box>
    </Dropdown>
  )
}

const DropdownStory: Story = Template.bind({})

// More on args: https://storybook.js.org/docs/react/writing-stories/args
DropdownStory.args = {
  children: 'Dropdown',
}

export { DropdownStory as Dropdown }
