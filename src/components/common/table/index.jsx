import { ArrowDropDown, ArrowDropUp, MoreVertOutlined } from '@mui/icons-material';
import {
  Checkbox,
  IconButton,
  Menu,
  MenuItem,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import useStyles from './styles';

// MAIN Component
const CustomTable = ({
  isMulti = true,
  tableHeads,
  tableData,
  onEdit,
  onDelete,
  loading = false,
  rowsPerPage = 10,
  setRowsPerPage,
  page = 0,
  setPage,
  total = 1,
  padding
}) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [actionSelectedData, setActionSelectedData] = useState(null);
  const open = Boolean(anchorEl);
  const handleActionButtonClick = (event, data) => {
    setAnchorEl(event.currentTarget);
    setActionSelectedData(data);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleEditClicked = () => {
    onEdit(actionSelectedData);
    handleClose();
  };

  const handleDeleteClicked = () => {
    onDelete(actionSelectedData);
    handleClose();
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const classes = useStyles();

  const onSelectAllClick = (e, tableData) => {
    if (!e.target.checked) return setSelectedRows([]);
    const newDatas = tableData.map((singleData, idx) => ({
      ...singleData,
      id: idx
    }));
    setSelectedRows(newDatas);
  };

  const handleSingleRowSelect = (singleData, idx) => {
    const singleRow = { id: idx, ...singleData };
    if (selectedRows.find((el) => el.id === idx)) {
      return setSelectedRows(selectedRows.filter((el) => el.id !== idx));
    }
    return setSelectedRows([...selectedRows, singleRow]);
  };

  const checkChecked = (idx) => {
    const el = selectedRows.find((el) => el.id === idx);
    if (el) return true;
    return false;
  };

  const startIndex = page * rowsPerPage;

  const arrowIcons = () => {
    return (
      <span className={classes.tableHeadSpan}>
        <ArrowDropUp className={classes.arrowIcon1} />
        <ArrowDropDown className={classes.arrowIcon2} />
      </span>
    );
  };

  return (
    <TableContainer className={classes.root} sx={padding && { padding: '20px' }}>
      <Table>
        <TableHead>
          <TableRow className={classes.tableHead}>
            {isMulti && (
              <TableCell padding="checkbox">
                <Checkbox
                  onChange={(e) => onSelectAllClick(e, tableData)}
                  inputProps={{ 'aria-label': 'select all desserts' }}
                />
              </TableCell>
            )}
            {tableHeads?.map((element, idx) => {
              return (
                <TableCell className={classes.tableHeadItem} key={idx} width={element?.minWidth}>
                  {typeof element.title == 'object'
                    ? element.title
                    : `${element.title}`.toUpperCase()}
                  {element.isSortable && arrowIcons()}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>

        <TableBody>
          {!loading
            ? (tableData ?? [])?.map((singleData, index) => {
                return (
                  <TableRow key={index}>
                    {isMulti && (
                      <TableCell>
                        <Checkbox
                          checked={checkChecked(index)}
                          onChange={() => handleSingleRowSelect(singleData, index)}
                          inputProps={{ 'aria-label': 'select all desserts' }}
                        />
                      </TableCell>
                    )}
                    {tableHeads.map((el, idx) => {
                      if (el.type?.toLowerCase() === 'index') {
                        return (
                          <TableCell className={classes.tableItem} key={idx}>
                            {startIndex + index + 1}
                          </TableCell>
                        );
                      }

                      if (typeof el.field === 'function') {
                        return (
                          <TableCell className={classes.tableItem} key={idx}>
                            {el.field(singleData, el.field, index)}
                          </TableCell>
                        );
                      }
                      if (el.type?.toLowerCase() === 'actions') {
                        return (
                          <TableCell className={classes.tableItem} key={idx}>
                            <IconButton
                              onClick={(event) => handleActionButtonClick(event, singleData)}>
                              <MoreVertOutlined />
                            </IconButton>
                          </TableCell>
                        );
                      }
                      return (
                        <TableCell className={classes.tableItem} key={idx}>
                          {singleData[el.field]}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            : [...Array(8).keys()].map((index) => (
                <TableRow key={index}>
                  {tableHeads?.map((item, list) => (
                    <TableCell key={list} sx={{ minWidth: item?.minWidth }} align={item?.align}>
                      <Skeleton height={30} />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
        </TableBody>
      </Table>
      <TablePagination
        className={classes.paginationBox}
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={total}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}>
        <MenuItem onClick={handleEditClicked}>Edit</MenuItem>
        <MenuItem onClick={handleDeleteClicked}>Delete</MenuItem>
      </Menu>
    </TableContainer>
  );
};

export default CustomTable;

CustomTable.propTypes = {
  isMulti: PropTypes.bool, // this is to render the multiple row selectbox
  tableHeads: PropTypes.array, // header for table (will write custom documentation on it later)
  tableData: PropTypes.array,
  onEdit: PropTypes.func
};
CustomTable.defaultProps = {
  isMulti: false,
  onEdit: () => {},
  tableHeads: [],
  tableData: []
};
