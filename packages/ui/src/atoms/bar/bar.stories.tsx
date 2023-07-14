import React from 'react'
import { Bar as BarComponent, BarProps, AutoSizer, Scrollable, Container } from '@/atoms'
import { Meta } from '@storybook/react'
import type { StoryObj, StoryFn } from '@storybook/react'
import { LoremIpsum } from '@/stories'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof BarComponent> = {
  title: 'Atoms/Bar',
  component: BarComponent,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    children: { control: 'text' },
    variant: {
      options: ['sticky', 'fixed', 'absolute'],
      control: { type: 'radio' },
    },
    position: {
      options: ['top', 'bottom'],
      control: { type: 'radio' },
    },
    size: {
      options: ['s', 'm', 'l'],
      control: { type: 'radio' },
    },
  },
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <AutoSizer style={{ height: '100vh' }}>
        {({ height }) => {
          return (
            <Scrollable style={{ height }} role="scrollable">
              <Story />
              <LoremIpsum />
              <Story />
            </Scrollable>
          )
        }}
      </AutoSizer>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof meta>

const Template: StoryFn<typeof BarComponent> = (args: BarProps) => <BarComponent {...args} />

export const Bar: Story = Template.bind({})
Bar.args = {
  children: (
    <Container variant="filled" color="primary" height="full">
      Bar
    </Container>
  ),
  variant: 'sticky',
  position: 'top',
}
