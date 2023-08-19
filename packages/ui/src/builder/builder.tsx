import React from 'react'
import _ from 'lodash'
import { generateComponent, ComponentDefinition } from './builder.utils'
import { useTabsContext } from '@/atoms'
import { Selector, TextField } from '@/molecules'
import doc from '@/../docs.json'

export const Builder = () => {
  const [componentDefinition, setComponentDefinition] = React.useState<ComponentDefinition>({
    name: 'Builder',
    propsDefinition: {
      extends: 'React.HTMLAttributes<HTMLDivElement>',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'The content of the component.',
        },
      ],
    },
    importedModules: [
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
        module: './styles.module.css',
        defaultImport: 'styles',
      },
    ],
    returnedElementDefinition: {
      name: 'div',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          value: 'children',
        },
      ],
    },
  })

  const clearqUiInterfaces = (doc.children as any[]).filter((child) => child.kind === 256)

  const extendedTypesAndInterfaces = clearqUiInterfaces
    .filter(({ extendedTypes }) => extendedTypes?.length > 0)
    .flatMap((clearqUiExtendedInterface) => clearqUiExtendedInterface.extendedTypes)

  const typesAndInterfaces = _.uniqBy([clearqUiInterfaces, extendedTypesAndInterfaces].flat(), 'name')

  return (
    <div>
      <form>
        <TextField label={'Name'}
          type="text"
          name="name"
          value={componentDefinition.name}
          onChange={(name) => {
            setComponentDefinition((componentDefinition) => {
              return {
                ...componentDefinition,
                name
              }
            })
          }} />
        <Selector
          label={'extends'}
          value={componentDefinition.propsDefinition.extends}
          options={typesAndInterfaces.map((child) => ({
            label: child.name,
            value: child.name,
          }))}
          onChange={(option) => {
            console.log(typesAndInterfaces.find((child) => child.name === option?.value))
            setComponentDefinition((componentDefinition) => {
              return {
                ...componentDefinition,
                propsDefinition: {
                  ...componentDefinition.propsDefinition,
                  extends: option?.value,
                },
              }
            })
          }}
        />
        <TextField label={'Name'}
          type="text"
          name="name"
          value={componentDefinition.name}
          onChange={(name) => {
            setComponentDefinition((componentDefinition) => {
              return {
                ...componentDefinition,
                name
              }
            })
          }} />
      </form>
      <code>
        <pre>{JSON.stringify(componentDefinition, null, 2)}</pre>
      </code>
      <code>
        <pre>{JSON.stringify(componentDefinition, null, 2)}</pre>
      </code>
      <code>
        <pre>{generateComponent(componentDefinition)}</pre>
      </code>
      <div>
        <h2>{'useTabsContext'}</h2>
        <code>
          <pre>{JSON.stringify(useTabsContext, null, 2)}</pre>
        </code>
      </div>
    </div>
  )
}
