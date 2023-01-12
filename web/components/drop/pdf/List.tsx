import { View, Text, StyleSheet } from '@react-pdf/renderer'
import { format } from 'date-fns'
import { GearListItem } from '../../../__generated__/graphql'

const styles = StyleSheet.create({

})


type ListProps = {
	category: string,
	comment: string,
	items?: Array<GearListItem>
}
const List = ({}:{}