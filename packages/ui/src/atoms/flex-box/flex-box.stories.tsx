import React from 'react'
import { Container } from '@/atoms/container'
import { Text } from '@/atoms/text'
import { FlexBox as FlexBoxComponent, FlexItem, FlexBoxProps } from './flex-box'
import { Meta } from '@storybook/react'
import type { StoryFn, StoryObj } from '@storybook/react'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof FlexBoxComponent> = {
  title: 'Atoms/FlexBox',
  component: FlexBoxComponent,
  subcomponents: { FlexItem },
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  decorators: [
    (Story) => (
      <Container padding="m">
        <Story />
      </Container>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof FlexBoxComponent & typeof Container>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof FlexBoxComponent> = (args: FlexBoxProps) => <FlexBoxComponent {...args} />

export const FlexBox: Story = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
FlexBox.args = {
  children: (
    <>
      <FlexItem padding={['xl', 'm']} flex={0} variant="outlined">
        <Text whiteSpace="pre">Item 1</Text>
      </FlexItem>
      <FlexItem padding="xl" flex={1} basis="100%" variant="outlined">
        <Text whiteSpace="pre">Item 2Item 2</Text>
      </FlexItem>
      <FlexItem padding="xl" grow={0} shrink={1} variant="outlined">
        <Text whiteSpace="wrap">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse mattis quam sed sem dictum dignissim. Sed
          ut justo elit. Cras non massa quis tortor sodales ultricies sed quis velit. Aliquam fermentum rhoncus
          dignissim. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In hac
          habitasse platea dictumst. Maecenas eu volutpat sem. Sed blandit posuere orci, eu hendrerit libero viverra
          quis. Ut pretium sit amet est et bibendum. Pellentesque a enim a risus imperdiet pulvinar id vitae mauris.
          Nulla luctus turpis ac erat scelerisque, in tincidunt risus sodales. Nullam vulputate tellus dolor, ac
          ullamcorper purus ultricies a.
        </Text>
      </FlexItem>
    </>
  ),
  padding: 's',
}
