
import DataTable, { TableColumn } from 'react-data-table-component';
import { forTable, DataRow } from '../History';



const TableTab = () => {

    const columns: TableColumn<DataRow>[] = [

        {
            name: 'Flood Level',
            selector: row => row.data["water level"],

        },
        {
            name: 'Flood Warning',
            selector: row => row.data["flood warning"],

        },
        {
            name: 'Flood Rate',
            selector: row => row.data["other sensor data"],

        },
        {
            name: 'timestamp',
            selector: row => row.created_at,
            sortable: true,
        },

    ];


    const tableData = forTable



    const customStyles = {
        // rows: {
        //     style: {
        //         minHeight: '72px', // override the row height
        //     },
        // },
        headCells: {
            style: {
                minHeight: '72px',
                paddingLeft: '12px', // override the cell padding for head cells
                paddingRight: '12px',
                backgroundColor: 'teal',
                fontSize: '22px',
                fontWeight: 700,


            },
        },
        // cells: {
        //     style: {
        //         paddingLeft: '8px', // override the cell padding for data cells
        //         paddingRight: '8px',
        //     },
        // },
    };
    return (
        <div className="FirstTab">
            <DataTable
                columns={columns}
                data={tableData}
                customStyles={customStyles}
                pagination

            />
        </div>
    );
};
export default TableTab;




