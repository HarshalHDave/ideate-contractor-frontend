import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
import Multiselect from 'multiselect-react-dropdown';
// @mui
import { Card, Table, Stack, Paper, Avatar, Button, TextField, Popover, Checkbox, Modal, Box, Grid, TableRow, MenuItem, TableBody, TableCell, Container, Typography, IconButton, TableContainer, TablePagination, } from '@mui/material';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/aplication';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'id', label: 'Quote', alignRight: false },
    { id: 'text', label: 'Description', alignRight: false },
    // { id: 'pocnum', label: 'POC Number', alignRight: false },
    // { id: 'pocname', label: 'POC Name', alignRight: false },
    { id: 'status', label: 'Status', alignRight: false },
    { id: '', label: 'See Map' },
    { id: '', label: 'More' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    if (query) {
        return filter(array, (_user) => _user.text.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
}

export default function ApplicationPage() {
    const [open, setOpen] = useState(null);
    const [openAdd, setOpenAdd] = useState(false);
    const [issues, setIssues] = useState(false);

    const [page, setPage] = useState(0);

    const [order, setOrder] = useState('asc');

    const [selected, setSelected] = useState([]);

    const [orderBy, setOrderBy] = useState('id');

    const [filterName, setFilterName] = useState('');

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleOpenMenu = (event) => {
        setOpen(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setOpen(null);
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = USERLIST.map((n) => n.text);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, text) => {
        const selectedIndex = selected.indexOf(text);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, text);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const handleFilterByName = (event) => {
        setPage(0);
        setFilterName(event.target.value);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

    const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

    const isNotFound = !filteredUsers.length && !!filterName;

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        borderRadius: '10px',
        boxShadow: 24,
        p: 4,
    };

    return (
        <>
            <Helmet>
                <title> My Applications </title>
            </Helmet>

            <Modal
                open={openAdd}
                onClose={() => setOpenAdd(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Multiselect
                                displayValue="subcategory"
                                groupBy="category"
                                placeholder="Select Issues"
                                onRemove={(selectedList) => setIssues(selectedList)}
                                onSelect={(selectedList) => setIssues(selectedList)}
                                options={[
                                    {
                                        category: 'Potholes',
                                        subcategory: '1234'
                                    },
                                    {
                                        category: 'Potholes',
                                        subcategory: '4674'
                                    },
                                    {
                                        category: 'Potholes',
                                        subcategory: '7384'
                                    },
                                    {
                                        category: 'Manholes',
                                        subcategory: '65465'
                                    },
                                    {
                                        category: 'Manholes',
                                        subcategory: '3164'
                                    },
                                    {
                                        category: 'Street Lights',
                                        subcategory: '5321'
                                    },
                                    {
                                        category: 'Street Lights',
                                        subcategory: '9456'
                                    },
                                    {
                                        category: 'Street Lights',
                                        subcategory: '74152'
                                    },
                                    {
                                        category: 'Street Lights',
                                        subcategory: '84594'
                                    }
                                ]}
                                showCheckbox
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField id="outlined-basic" label="Quote" variant="outlined" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Description"
                                multiline
                                maxRows={4}
                            // value={value}
                            // onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    <Button
                                        variant="contained"
                                        color="success"
                                        onClick={() => {
                                            // handleRaiseIssue();
                                            setOpenAdd(false);
                                        }}
                                    >
                                        Done
                                    </Button>
                                </Grid>
                                <Grid item xs={3}>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => {
                                            setOpenAdd(false);
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>

            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        My Applications
                    </Typography>
                    <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => {
                        setOpenAdd(true);
                    }}>
                        New Application
                    </Button>
                </Stack>

                <Card>
                    <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 800 }}>
                            <Table>
                                <UserListHead
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={USERLIST.length}
                                    numSelected={selected.length}
                                    onRequestSort={handleRequestSort}
                                />
                                <TableBody>
                                    {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                        const { id, text, pocname, status, pocnum, avatarUrl } = row;
                                        const selectedUser = selected.indexOf(text) !== -1;

                                        return (
                                            <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                                                <TableCell padding="checkbox">
                                                    {/* <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, text)} /> */}
                                                </TableCell>

                                                <TableCell component="th" scope="row" padding="none">
                                                    <Stack direction="row" alignItems="center" spacing={2}>
                                                        <Typography variant="subtitle2" noWrap>
                                                            ₹ {id}
                                                        </Typography>
                                                    </Stack>
                                                </TableCell>

                                                <TableCell align="left">{text}</TableCell>

                                                {/* <TableCell align="left">{pocnum}</TableCell> */}

                                                {/* <TableCell align="left">{pocname}</TableCell> */}


                                                <TableCell align="left">
                                                    <Label color={status === 'Submitted' ? 'warning' : status === 'Accepted' ? 'success' : 'error'}>{sentenceCase(status)}</Label>
                                                </TableCell>

                                                <TableCell align="left">
                                                    <Button variant="contained" startIcon={<Iconify icon="material-symbols:map" />}>
                                                        Map
                                                    </Button>
                                                </TableCell>

                                                <TableCell align="right">
                                                    <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                                                        <Iconify icon={'eva:more-vertical-fill'} />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>

                                {isNotFound && (
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                                                <Paper
                                                    sx={{
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    <Typography variant="h6" paragraph>
                                                        Not found
                                                    </Typography>

                                                    <Typography variant="body2">
                                                        No results found for &nbsp;
                                                        <strong>&quot;{filterName}&quot;</strong>.
                                                        <br /> Try checking for typos or using complete words.
                                                    </Typography>
                                                </Paper>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                )}
                            </Table>
                        </TableContainer>
                    </Scrollbar>

                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={USERLIST.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Card>
            </Container>

            <Popover
                open={Boolean(open)}
                anchorEl={open}
                onClose={handleCloseMenu}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                    sx: {
                        p: 1,
                        width: 140,
                        '& .MuiMenuItem-root': {
                            px: 1,
                            typography: 'body2',
                            borderRadius: 0.75,
                        },
                    },
                }}
            >
                <MenuItem>
                    <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
                    Edit
                </MenuItem>

                <MenuItem sx={{ color: 'error.main' }}>
                    <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                    Delete
                </MenuItem>

            </Popover>
        </>
    );
}
