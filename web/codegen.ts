import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
	schema: '../api/schema.js',
	documents: ['./**/.tsx'],
	generates: {
		'./__generated__/': {
			preset: 'client',
			plugins: [],
			presetConfig: {
				gqlTagName: 'gql',
			},
		},
	},
}

export default config
