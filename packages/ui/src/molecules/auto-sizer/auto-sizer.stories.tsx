import React from 'react'
import { AutoSizer as AutoSizerComponent, AutoSizerProps } from './auto-sizer'
import { Meta } from '@storybook/react'
import type { StoryFn } from '@storybook/react'

const meta: Meta<typeof AutoSizerComponent> = {
  title: 'Molecules/AutoSizer',
  component: AutoSizerComponent,
  argTypes: {
    height: { control: 'number' },
  },
  args: {
    children: ({ height, width }: any) => (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height, width }}>
        <div>
          <div>Height: {height}</div>
          <div>Width: {width}</div>
        </div>
      </div>
    ),
  },
  parameters: {
    layout: 'fullscreen',
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

const Template: StoryFn<typeof AutoSizerComponent> = (args: AutoSizerProps) => <AutoSizerComponent {...args} />

export const AutoSizer = Template.bind({})

AutoSizer.args = {}
