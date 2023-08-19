import { ReactElement } from 'react'

interface Prop {
  name: string
  type: 'ref' | 'string' | 'boolean' | 'number' | 'React.ReactNode'
}

interface PropValue<TValue = any> extends Prop {
  value: TValue
}

interface PropDefinition extends Prop {
  required: boolean
  defaultValue?: string
  description?: string
}

interface RefPropValue extends PropValue<string> {
  type: 'ref'
}

interface NumberPropValue extends PropValue<number> {
  type: 'number'
}

interface BooleanPropValue extends PropValue<boolean> {
  type: 'boolean'
}

interface StringPropValue extends PropValue<string> {
  type: 'string'
}

interface ReactElementPropValue extends PropValue<ReactElement> {
  type: 'React.ReactNode'
}

const isReactElementPropValue = (propValue: PropValue): propValue is ReactElementPropValue =>
  propValue.type === 'React.ReactNode'

const isStringPropValue = (propValue: PropValue): propValue is StringPropValue => propValue.type === 'string'

const isBooleanPropValue = (propValue: PropValue): propValue is BooleanPropValue => propValue.type === 'boolean'

const isNumberPropValue = (propValue: PropValue): propValue is NumberPropValue => propValue.type === 'number'

const isRefPropValue = (propValue: PropValue): propValue is RefPropValue => propValue.type === 'ref'

interface PropsDefinition {
  extends?: string
  props: PropDefinition[]
}

interface ElementDefinition {
  name: string
  props: PropValue[]
}

interface ImportedModuleDefinition {
  namingImports?: string[]
  module: string
  defaultImport?: string
  importAll?: boolean
}

export interface ComponentDefinition {
  name: string
  propsDefinition: PropsDefinition
  importedModules: ImportedModuleDefinition[]
  returnedElementDefinition: ElementDefinition
}

function generatePropValue(propValue: PropValue): string {
  if (
    isRefPropValue(propValue) ||
    isBooleanPropValue(propValue) ||
    isNumberPropValue(propValue) ||
    isReactElementPropValue(propValue)
  ) {
    return `{${propValue.value}}`
  }
  if (isStringPropValue(propValue)) {
    return `"${propValue.value}"`
  }
  return `{undefined}`
}

function generateProps(propValues: PropValue[]): string {
  return propValues
    .filter((propValue) => propValue.name !== 'children')
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

export function generateComponent({
  name,
  propsDefinition,
  importedModules,
  returnedElementDefinition,
}: {
  name: string
  propsDefinition: PropsDefinition
  importedModules: ImportedModuleDefinition[]
  returnedElementDefinition: ElementDefinition
}): string {
  const propsInterface = generatePropsInterface(propsDefinition)
  const componentCode = `
${generateImports(importedModules)}

export interface ${name}Props ${propsInterface}

export const ${name}: React.FC<${name}Props> = (props) => {
  return (${generateElement(returnedElementDefinition)});
}

export default ${name};
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
