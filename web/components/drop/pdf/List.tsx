import { View, Text, StyleSheet } from '@react-pdf/renderer'
import { format } from 'date-fns'

const styles = StyleSheet.create({

})

type ListItem = {

}

type ListProps = {
	category: string,
	comment: string,
	items?: Array<ListItem>
}
const List = ({}:{}