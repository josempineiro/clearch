import React from 'react'
import { List as ListComponent, ListProps } from './list'
import { ListItem as ListItemComponent, ListItemProps } from './list-item'
import { Meta } from '@storybook/react'
import type { StoryFn } from '@storybook/react'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof ListComponent> = {
  title: 'Atoms/List',
  component: ListComponent,
  subcomponents: { ListItem: ListItemComponent },
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
}
export default meta

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof ListComponent> = (args: ListProps) => <ListComponent {...args} />

export const List = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
List.args = {
  children: [
    <ListItemComponent key="1">List item 1</ListItemComponent>,
    <ListItemComponent key="2">List item 2</ListItemComponent>,
    <ListItemComponent key="3">List item 3</ListItemComponent>,
  ],
}

const ListItemTemplate: StoryFn<typeof ListItemComponent> = (args: ListItemProps) => <ListItemComponent {...args} />

export const ListItem = ListItemTemplate.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
ListItem.args = {
  children: 'List item',
}
