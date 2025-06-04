import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
	schema: '../api/schema.ts',
	documents: './lib/apollo/queries.ts',
	generates: {
		'./__generated__/': {
			preset: 'client',
			documents: ['./**/*.{ts,tsx}', '!./__generated__'],
			plugins: [],
			presetConfig: {
				gqlTagName: 'gql',
			},
		},
	},
}

export default config
