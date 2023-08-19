import React from 'react'
import { Meta } from '@storybook/react'
import type { StoryFn, StoryObj } from '@storybook/react'
import { Popup as Popup, PopupProps } from './popup'
import { Button, Scrollable } from '@/atoms'
import { LoremIpsum } from '@/stories'

const meta: Meta<typeof Popup> = {
  title: 'Atoms/Popup',
  component: Popup,
  tags: ['atoms', 'popup', 'autodocs'],
  argTypes: {
    children: { control: false },
    target: { control: false },
  },
  args: {
  },
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof Popup>

const Template: StoryFn<typeof Popup> = (args: PopupProps) => {
  const [visible, setVisible] = React.useState(false)
  return (
    <Popup
      {...args}
      onClickOutside={() => setVisible(false)}
      target={<Button onClick={() => setVisible((visible) => !visible)}>Target</Button>}
      visible={visible}
    >
      <Scrollable>
        <LoremIpsum size="medium" />
      </Scrollable>
    </Popup>
  )
}

const PopupStory: Story = Template.bind({})

// More on args: https://storybook.js.org/docs/react/writing-stories/args
PopupStory.args = {}

export {
  PopupStory as Popup,
}