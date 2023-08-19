import React from 'react'
import { Text } from '@/atoms/text'
import { AbsolutePosition, AbsolutePositionProps } from './absolute-position'
import { Meta } from '@storybook/react'
import type { StoryFn } from '@storybook/react'

const meta: Meta<typeof AbsolutePosition> = {
  title: 'Atoms/Absoluteposition',
  component: AbsolutePosition,
  argTypes: {
    children: { control: 'text' },
    position: {
      control: {
        type: 'radio',
      },
    },
  },
}
export default meta

const Template: StoryFn<typeof AbsolutePosition> = (args: AbsolutePositionProps) => <AbsolutePosition {...args} />

const AbsolutepositionStory = Template.bind({})

// More on args: https://storybook.js.org/docs/react/writing-stories/args
AbsolutepositionStory.args = {
  children: <Text>Absoluteposition</Text>,
}
export { AbsolutepositionStory as Absoluteposition }
