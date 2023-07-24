import React from 'react'
import { AutoSizer, Scrollable } from '@/atoms'
import { SearchBar as SearchBarComponent, SearchBarProps } from '@/organisms'
import { Meta } from '@storybook/react'
import type { StoryObj, StoryFn } from '@storybook/react'
import { LoremIpsum } from '@/stories'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof SearchBarComponent> = {
  title: 'Organisms/SearchBar',
  component: SearchBarComponent,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    children: { control: 'text' },
    variant: {
      options: ['sticky', 'fixed', 'absolute', 'static'],
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
    onSortBy: { action: true, control: false },
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
              <LoremIpsum />
              <Story />
              <LoremIpsum />
            </Scrollable>
          )
        }}
      </AutoSizer>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof meta>

const Template: StoryFn<typeof SearchBarComponent> = (args: SearchBarProps) => <SearchBarComponent {...args} />

export const SearchBar: Story = Template.bind({})
SearchBar.args = {
  variant: 'sticky',
  position: 'top',
  debounce: 500,
  placeholder: 'Search...',
  value: '',
  current: 1,
  matches: 4,
  total: 10,
  sortBy: [
    {
      label: 'Id',
      value: 'id',
    },
    {
      label: 'Name',
      value: 'name',
    },
  ],
}
