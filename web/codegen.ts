import { CodegenConfig } from '@graphql-codegen/cli'

// ToDo: codegen is a little rough
const config: CodegenConfig = {
	schema: '../api/schema.ts',
	// documents: ['./**/*.{ts,tsx}', '!./__generated__/**'],
	documents: ['./lib/apollo/queries.ts'],
	generates: {
		'./__generated__/graphql.ts': {
			plugins: [
				'typescript',
				'typescript-operations',
				// 'typescript-react-apollo',
				// 'typescript-graphql-request',
			],
			config: {
				// withHooks: true,
				// withHOC: false,
				// withComponent: false,
				exportFragmentSpreadSubTypes: true,
				dedupeFragments: true,
				fragmentMasking: false,
				skipTypename: false,
				documentMode: 'documentNode',
				strictScalars: true,
				scalars: {
					Date: 'Date',
				},
			},
		},
	},
}

export default config
