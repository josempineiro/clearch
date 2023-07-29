import React from 'react'
import { Meta } from '@storybook/react'
import type { StoryFn, StoryObj } from '@storybook/react'
import { Popup as PopupComponent, PopupProps } from './popup'
import { Button, Scrollable } from '@/atoms'
import { LoremIpsum } from '@/stories'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof PopupComponent> = {
  title: 'Atoms/Popup',
  component: PopupComponent,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    children: { control: false },
    target: { control: false },
  },
  args: {
    children: 'Popup',
    target: <Button>Target</Button>,
    variant: 'filled',
    color: 'primary',
  },
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof PopupComponent>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof PopupComponent> = (args: PopupProps) => {
  const [visible, setVisible] = React.useState(false)
  return (
    <PopupComponent
      {...args}
      onClickOutside={() => setVisible(false)}
      target={<Button onClick={() => setVisible((visible) => !visible)}>Target</Button>}
      visible={visible}
    >
      <Scrollable>
        <LoremIpsum />
      </Scrollable>
    </PopupComponent>
  )
}

export const Popup: Story = Template.bind({})

// More on args: https://storybook.js.org/docs/react/writing-stories/args
Popup.args = {}
