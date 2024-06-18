import { Grid,VirtualTable, TableHeaderRow} from '@devexpress/dx-react-grid-material-ui';
import { Sheet } from '@mui/joy';

const COLUMNS =[
    { name: 'date', title: 'Date' },
    { name: 'type', title: 'Type' },
    { name: 'category', title: 'Category' },
    { name: 'description', title: 'Description' },
    { name: 'amount', title: 'Amount' },    
  ]

const ROWS = [
{
	date: '1212',
	type: 'ddss',
	category: 'sds',
	description: 'description',
	amount: 1212
}
]


export default function OrderTable1 (){
    return (
			<Sheet>				
				<Grid columns={COLUMNS} rows={ROWS}>
        	<VirtualTable/>
					<TableHeaderRow />
				</Grid>
			</Sheet>
    )
}