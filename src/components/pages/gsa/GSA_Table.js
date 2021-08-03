import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { withStyles } from '@material-ui/core/styles'
import TableCell from '@material-ui/core/TableCell'
import Paper from '@material-ui/core/Paper'
import { AutoSizer, Column, Table } from 'react-virtualized'

const styles = theme => ({
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box'
  },
  table: {
    // temporary right-to-left patch, waiting for
    // https://github.com/bvaughn/react-virtualized/issues/454
    '& .ReactVirtualized__Table__headerRow': {
      flip: false,
      paddingRight: theme.direction === 'rtl' ? '0 !important' : undefined
    }
  },
  tableRow: {
    cursor: 'pointer'
  },
  tableRowHover: {
    '&:hover': {
      backgroundColor: theme.palette.grey[200]
    }
  },
  tableCell: {
    flex: 1
  },
  noClick: {
    cursor: 'initial'
  }
})

class MuiVirtualizedTable extends React.PureComponent {
  static defaultProps = {
    headerHeight: 88,
    rowHeight: 48
  }

  getRowClassName = ({ index }) => {
    const { classes, onRowClick } = this.props

    return clsx(classes.tableRow, classes.flexContainer, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null
    })
  }

  cellRenderer = ({ cellData, columnIndex }) => {
    const { columns, classes, rowHeight, onRowClick } = this.props
    return (
      <TableCell
        component='div'
        className={clsx(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null
        })}
        variant='body'
        style={{ height: rowHeight, fontSize: 8 }}
        align={
          (columnIndex != null && columns[columnIndex].numeric) || false
            ? 'right'
            : 'left'
        }
      >
        {cellData}
      </TableCell>
    )
  }

  headerRenderer = ({ label, columnIndex }) => {
    const { headerHeight, columns, classes } = this.props

    return (
      <TableCell
        component='div'
        className={clsx(
          classes.tableCell,
          classes.flexContainer,
          classes.noClick
        )}
        variant='head'
        style={{ height: headerHeight, fontSize: 10, fontWeight: 'bold' }}
        align={columns[columnIndex].numeric || false ? 'right' : 'left'}
      >
        <span>{label}</span>
      </TableCell>
    )
  }

  render () {
    const {
      classes,
      columns,
      rowHeight,
      headerHeight,
      ...tableProps
    } = this.props
    return (
      <AutoSizer>
        {({ height, width }) => (
          <Table
            height={height}
            width={width}
            rowHeight={rowHeight}
            gridStyle={{
              direction: 'inherit'
            }}
            headerHeight={headerHeight}
            className={classes.table}
            {...tableProps}
            rowClassName={this.getRowClassName}
          >
            {columns.map(({ dataKey, ...other }, index) => {
              return (
                <Column
                  key={dataKey}
                  headerRenderer={headerProps =>
                    this.headerRenderer({
                      ...headerProps,
                      columnIndex: index
                    })
                  }
                  className={classes.flexContainer}
                  cellRenderer={this.cellRenderer}
                  dataKey={dataKey}
                  {...other}
                />
              )
            })}
          </Table>
        )}
      </AutoSizer>
    )
  }
}

MuiVirtualizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      dataKey: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      numeric: PropTypes.bool,
      width: PropTypes.number.isRequired
    })
  ).isRequired,
  headerHeight: PropTypes.number,
  onRowClick: PropTypes.func,
  rowHeight: PropTypes.number
}

const VirtualizedTable = withStyles(styles)(MuiVirtualizedTable)

// ---

// const sample = {
//     GSA_Item_List: "Past GSA",
//     hasNewSKU: null,
//     Last_Mod: "Modification PO-0066",
//     Brand: "ARROWHEAD",
//     SKU: "10063",
//     Product_Name: "CORE Lt Wt Bottom Coyote Small",
//     Description: "ARROWHEAD CORE Lt Wt Bottom Coyote Small",
//     Unit_of_Measure: "PR",
//     Retail: " $ 69.00 ",
//     GSA_Discount: "20.00%",
//     GSA_Price_without_IFF: " $ 55.20 ",
//     GSA_Price_with_IFF: " $ 55.62 ",
//     Country_of_Origin: "SV"
// };

// function createData(id, dessert, calories, fat, carbs, protein) {
//   return { id, dessert, calories, fat, carbs, protein };
// }

// const rows = [];

// for (let i = 0; i < 200; i += 1) {
// //   const randomSelection = sample[Math.floor(Math.random() * sample.length)];
//   rows.push(createData(...Object.keys(sample)));
// }

export default function ReactVirtualizedTable (props) {
  let gsaList = props.gsaList

  let columnMaker = () => {
    return Object.keys(gsaList[0]).map((itemProperty, index) => {
      let columnObject = {
        width: index === 12 ? 520 : 120,
        label: itemProperty,
        dataKey: itemProperty
      }
      return columnObject
    })
  }

  let gsaColumns = columnMaker()
  //   console.log(`gsaColumns: ${gsaColumns}`)

  return (
    <Paper style={{ height: 600, width: '100%' }}>
      <VirtualizedTable
        rowCount={gsaList.length}
        rowGetter={({ index }) => gsaList[index]}
        columns={gsaColumns}
      />
    </Paper>
  )
}
