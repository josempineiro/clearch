import * as fs from 'fs'
import _ from 'lodash'

interface PropDefinition {
  name: string
  type: string
  required: boolean
  defaultValue?: string
  value?: string
}

interface PropsDefinition {
  extends?: string
  props: PropDefinition[]
}

interface ElementDefinition {
  name: string
  props: PropDefinition[]
}

interface ImportedModuleDefinition {
  namingImports?: string[]
  module: string
  defaultImport?: string
  importAll?: boolean
}

function generatePropValue(propDefinition: PropDefinition): string {
  switch (propDefinition.type) {
    case 'string':
      return `"${propDefinition.value}"`
    default:
      return `{${propDefinition.value}}`
  }
}

function generateProps(propDefinitions: PropDefinition[]): string {
  return propDefinitions
    .filter((propDefinition) => propDefinition.name !== 'children')
    .map((prop) => `${prop.name}=${generatePropValue(prop)}`)
    .join('\n    ')
}

function hasChildren(element: ElementDefinition): boolean {
  return element.props.some((prop) => prop.name === 'children')
}

function generateElement(element: ElementDefinition): string {
  const hasProps = element.props.filter((propDefinition) => propDefinition.name !== 'children').length > 0
  return `<${element.name} ${
    hasProps
      ? `
  ${generateProps(element.props)}`
      : ''
  }
  ${
    hasChildren(element)
      ? `>{${element.props.find((prop) => prop.name === 'children')?.value}}</${element.name}>`
      : '/>'
  }`
}

function generateImport({ namingImports, module, defaultImport }: ImportedModuleDefinition): string {
  return `import ${defaultImport ? defaultImport : ''}${
    defaultImport && namingImports && namingImports.length > 0 ? ',' : ''
  } ${namingImports ? `{ ${namingImports.join(', ')} }` : ''} from '${module}';`
}

function generateImports(importedModules: ImportedModuleDefinition[]) {
  return `${importedModules.map(generateImport).join('\n')}`
}

function generateComponent(
  componentName: string,
  propsDefinition: PropsDefinition,
  importedModules: ImportedModuleDefinition[],
  returnedElementDefinition: ElementDefinition,
): string {
  const propsInterface = generatePropsInterface(propsDefinition)
  const componentCode = `
${generateImports(importedModules)}

export interface ${_.capitalize(_.camelCase(componentName))}Props ${propsInterface}

export const ${_.capitalize(_.camelCase(componentName))}: React.FC<${_.capitalize(
    _.camelCase(componentName),
  )}Props> = (props) => {
  return (${generateElement(returnedElementDefinition)});
}

export default ${_.capitalize(_.camelCase(componentName))};
`

  return componentCode
}

function generatePropsInterface(propsDefinition: PropsDefinition): string {
  const propsInterface = propsDefinition.props
    .map(({ name, type, required }) => {
      const optionalMark = required ? '' : '?'
      return `${name}${optionalMark}: ${type};`
    })
    .join('\n  ')

  return `${propsDefinition.extends ? `extends ${propsDefinition.extends}` : ''} { ${propsInterface} }`
}

function saveComponentToFile(componentName: string, componentCode: string): void {
  fs.mkdirSync(`${_.kebabCase(componentName)}`, { recursive: true })
  fs.writeFileSync(`${_.kebabCase(componentName)}/index.tsx`, `export * from './${componentName}'`)
  fs.writeFileSync(`${_.kebabCase(componentName)}/${_.kebabCase(componentName)}.tsx`, componentCode)
  fs.writeFileSync(
    `${_.kebabCase(componentName)}/${_.kebabCase(componentName)}.module.css`,
    `.${_.kebabCase(componentName)} {}`,
  )
  fs.writeFileSync(
    `${_.kebabCase(componentName)}/${_.kebabCase(componentName)}.stories.tsx`,
    `import React from 'react'
import { ${_.capitalize(_.camelCase(componentName))}, ${_.capitalize(
      _.camelCase(componentName),
    )}Props } from './${_.kebabCase(componentName)}'
import { Meta } from '@storybook/react'
import type { StoryFn } from '@storybook/react'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof ${_.capitalize(_.camelCase(componentName))}> = {
  title: 'Atoms/${_.capitalize(_.camelCase(componentName))}',
  component: ${_.capitalize(_.camelCase(componentName))},
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    children: { control: 'text' },
  },
}
export default meta

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof ${_.capitalize(_.camelCase(componentName))}> = (args: ${_.capitalize(
      _.camelCase(componentName),
    )}Props) => <${_.capitalize(_.camelCase(componentName))} {...args} />

const ${_.capitalize(_.camelCase(componentName))}Story = Template.bind({})

// More on args: https://storybook.js.org/docs/react/writing-stories/args
${_.capitalize(_.camelCase(componentName))}Story.args = {
  children: '${_.capitalize(_.camelCase(componentName))}',
}
export {
  ${_.capitalize(_.camelCase(componentName))}Story as ${_.capitalize(_.camelCase(componentName))},
}
  `,
  )
}

// Ejemplo de uso
const componentName = 'absolute-position'

const propsDefinition: PropsDefinition = {
  props: [{ name: 'children', type: 'React.ReactNode', required: true }],
  extends: 'React.HTMLAttributes<HTMLLabelElement>',
}

const returnedElementDefinition: ElementDefinition = {
  name: 'div',
  props: [
    {
      name: 'className',
      type: 'ref',
      required: true,
      value: `cn(styles.absolute-position, props.className)`,
    },
    {
      name: 'children',
      type: 'React.ReactNode',
      required: true,
      value: 'props.children',
    },
  ],
}

const importedModulesDefinition = [
  {
    module: 'react',
    defaultImport: 'React',
    namingImports: ['useEffect', 'useState'],
  },
  {
    module: 'classnames',
    defaultImport: 'cn',
  },
  {
    module: './absolute-position.module.css',
    defaultImport: 'styles',
  },
]

const componentCode = generateComponent(
  componentName,
  propsDefinition,
  importedModulesDefinition,
  returnedElementDefinition,
)

saveComponentToFile(componentName, componentCode)
