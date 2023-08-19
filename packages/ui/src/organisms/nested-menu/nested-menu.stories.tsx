import React from 'react'
import { Meta } from '@storybook/react'
import type { StoryFn, StoryObj } from '@storybook/react'
import { NestedMenu } from './nested-menu'
import { DropdownMenu as DropdownMenuComponent } from '@/molecules'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof DropdownMenuComponent> = {
  title: 'Organisms/NestedMenu',
  component: DropdownMenuComponent,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof DropdownMenuComponent>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof DropdownMenuComponent> = () => {
  return (
    <NestedMenu
      items={[
        {

          id: 'item-1',
          label: 'Item 1',
          description: 'Item 1 description',
          items: [
            {
              id: 'item-1-1',
              label: 'Item 1.1',
              description: 'Item 1.1 description',
              items: [
                {
                  id: 'item-1-1-1',
                  label: 'Item 1.1.1',
                  description: 'Item 1.1.1 description',
                },
                {
                  id: 'item-1-1-2',
                  label: 'Item 1.1.2',
                  description: 'Item 1.1.2 description',
                },
              ],
            },
            {
              id: 'item-1-2',
              label: 'Item 1.2',
              description: 'Item 1.2 description',
            },
          ],
        },
      ]}
    />
  )
}

const NestedMenuStory: Story = Template.bind({})

export { NestedMenuStory as NestedMenu }
