import * as fs from 'fs'

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
  return `<${element.name}
  ${generateProps(element.props)}
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

export interface ${componentName}Props ${propsInterface}

export const ${componentName}: React.FC<${componentName}Props> = (props) => {
  return (${generateElement(returnedElementDefinition)});
}

export default ${componentName};
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
  fs.writeFileSync(`${componentName}.tsx`, componentCode)
}

// Ejemplo de uso
const componentName = 'MyComponent'

const propsDefinition: PropsDefinition = {
  props: [{ name: 'children', type: 'React.ReactNode', required: true }],
  extends: 'React.HTMLAttributes<HTMLDivElement>',
}

const returnedElementDefinition: ElementDefinition = {
  name: 'div',
  props: [
    {
      name: 'className',
      type: 'ref',
      required: true,
      value: 'cn(styles.container, props.className)',
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
    module: 'lodash',
    defaultImport: '_',
  },
  {
    module: './my-module.module.css',
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
