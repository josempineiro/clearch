import React from 'react'
import { ForwardedVirtualizedList as VirtualizedListComponent, VirtualizedListProps } from './virtualized-list'
import { Meta } from '@storybook/react'
import type { StoryFn } from '@storybook/react'
import AutoSizer from '../auto-sizer/auto-sizer'

interface TestItem {
  title: string
}

const renderTestItem = ({ item }: any) => <div>{item.title}</div>

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof VirtualizedListComponent> = {
  title: 'Molecules/VirtualizedList',
  component: VirtualizedListComponent,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    height: { control: 'number' },
  },
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    items: Array.from({ length: 1000 }, (_, i) => ({ title: `List item ${i}` })),
    getItemKey: (item: any) => item.title,

    renderItem: renderTestItem,
    getItemHeight: () => 50,
  },
  decorators: [
    (Story) => (
      <div style={{ height: '100vh', width: '100%', display: 'flex' }}>
        <div
          style={{
            flex: '1',
            height: '100%',
          }}
        >
          <Story />
        </div>
      </div>
    ),
  ],
}
export default meta

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof VirtualizedListComponent> = (args: VirtualizedListProps<TestItem>, ref) => {
  console.log(args)
  console.log(ref)
  return <VirtualizedListComponent<TestItem> {...args} height={904} />
}

export const VirtualizedList = Template.bind({
  renderItem: ({ item }: any) => <div>{item.title}</div>,
})

// More on args: https://storybook.js.org/docs/react/writing-stories/args
VirtualizedList.args = {}
