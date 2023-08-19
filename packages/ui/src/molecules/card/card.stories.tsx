import React from 'react'
import { Card, CardProps } from './card'
import { Meta } from '@storybook/react'
import type { StoryFn } from '@storybook/react'
import { Text, Tag, GroupedButtons, IconButton } from '@/atoms'
import { Tooltip } from '@/molecules'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Card> = {
  title: 'Atoms/Card',
  component: Card,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    children: { control: 'text' },
  },
  args: {
    multimedia: 'https://placehold.co/200x300',
    label: (
      <Tooltip
        width="m"
        target={
          <Tag>
            <Text variant="overline" transform="uppercase">
              Tag
            </Text>
          </Tag>
        }
      >
        Card is open to extension by composition. This means that you can add new functionality to a component by
        wrapping it, without having to modify the component itself.
      </Tooltip>
    ),
    children: <Text>Card</Text>,
    heading: 'Heading',
    subheading: 'Subheading',
    actions: (
      <GroupedButtons>
        <Tooltip
          width="content"
          color="surface"
          target={
            <IconButton variant="filled" color="primary">
              <svg viewBox="0 0 32 32">
                <path
                  d="M16,2C8.3,2,2,8.3,2,16s6.3,14,14,14s14-6.3,14-14S23.7,2,16,2z M16,26c-5.5,0-10-4.5-10-10S10.5,6,16,6s10,4.5,10,10
        S21.5,26,16,26z"
                />
              </svg>
            </IconButton>
          }
        >
          Action 1
        </Tooltip>
        <Tooltip
          width="content"
          color="surface"
          target={
            <IconButton variant="filled" color="primary">
              <svg viewBox="0 0 32 32">
                <path
                  d="M16,2C8.3,2,2,8.3,2,16s6.3,14,14,14s14-6.3,14-14S23.7,2,16,2z M16,26c-5.5,0-10-4.5-10-10S10.5,6,16,6s10,4.5,10,10
          S21.5,26,16,26z"
                />
              </svg>
            </IconButton>
          }
        >
          Action 2
        </Tooltip>
      </GroupedButtons>
    ),
  },
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story, context) => {
      console.log(context)
      return (
        <div style={{ width: context.args.size === 'l' ? '400px' : '200px' }}>
          <Story />
        </div>
      )
    },
  ],
}
export default meta

const Template: StoryFn<typeof Card> = (args: CardProps) => <Card {...args} />

const CardStory = Template.bind({})

CardStory.args = {}

export { CardStory as Card }

export const CardL = Template.bind({})

CardL.args = {
  size: 'l',
}
