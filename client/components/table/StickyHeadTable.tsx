import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { CiEdit } from 'react-icons/ci';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import Image from 'next/image';

export interface Column {
    id: 'id' | 'seller' | 'name' | 'description' | 'price' | 'category' | 'status' | 'action';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

export interface Data {
    id: string;
    seller?: string;
    duration: number;
    name: string;
    deposit: number;
    description: string;
    price: number;
    material: string;
    dimension: string;
    color: string;
    category: string;
    status: string;
    action: string;
    image: string;
    weight: number;
    condition: string;
    style: string;
    manufacturer: string;
    year: number;
    origin: string;
}

export default function StickyHeadTable({ rows, role }: { rows: Data[]; role?: string }) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const [dataInRow, setDataInRow] = React.useState<Data>();

    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);

    const handleOpen = (data: Data) => {
        setOpen(true);
        setDataInRow(data);
    };

    const columns: readonly Column[] = role
        ? [
              { id: 'id', label: 'Id', minWidth: 50 },
              { id: 'seller', label: 'Seller', minWidth: 50 },
              { id: 'name', label: 'Name', minWidth: 70 },
              { id: 'description', label: 'Description', minWidth: 170 },
              { id: 'price', label: 'Price', minWidth: 50 },
              { id: 'category', label: 'Category', minWidth: 50 },
              { id: 'status', label: 'Status', minWidth: 50 },
              { id: 'action', label: 'Action', minWidth: 50 },
          ]
        : [
              { id: 'id', label: 'Id', minWidth: 50 },
              { id: 'name', label: 'Name', minWidth: 70 },
              { id: 'description', label: 'Description', minWidth: 170 },
              { id: 'price', label: 'Price', minWidth: 50 },
              { id: 'category', label: 'Category', minWidth: 50 },
              { id: 'status', label: 'Status', minWidth: 50 },
              { id: 'action', label: 'Action', minWidth: 50 },
          ];

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', borderTop: 1 }}>
            <TableContainer sx={{ maxHeight: 280 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                    {columns &&
                                        columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {value === 'edit' ? (
                                                        <CiEdit
                                                            onClick={() => {
                                                                handleOpen(row);
                                                            }}
                                                            className="text-2xl text-black cursor-pointer"
                                                        />
                                                    ) : column.format && typeof value === 'number' ? (
                                                        column.format(value)
                                                    ) : (
                                                        value
                                                    )}
                                                </TableCell>
                                            );
                                        })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <BasicModal handleClose={handleClose} open={open} data={dataInRow} role={role} />
        </Paper>
    );
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '75%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const BasicModal = ({
    open,
    handleClose,
    data,
    role,
}: {
    open: boolean;
    handleClose: () => void;
    data?: Data;
    role?: string;
}) => {
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                {data?.status !== 'Inactive' && role !== 'admin' ? (
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Bạn không được chỉnh sản phảm đã lên sàn
                        </Typography>
                    </Box>
                ) : (
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Thông tin sản phẩm của bạn
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Bạn có thể điều chỉnh tùy thích
                        </Typography>
                        <div className="mt-5 flex flex-col ">
                            <div
                                className="flex flex-col gap-4 border-y-2 py-3"
                                style={{ maxHeight: '300px', overflowY: 'auto' }}
                            >
                                <TextField id="name" label="Name" variant="outlined" value={data?.name} />
                                <Image
                                    src={data?.image || 'null'}
                                    alt="product model"
                                    width={500}
                                    height={500}
                                    className="object-contain"
                                />
                                <input
                                    onChange={(event) => {
                                        // setFile(event.target.files?.[0]);
                                    }}
                                    id="image"
                                    name="image"
                                    type="file"
                                    accept="image/png, image/gif, image/jpeg"
                                    className="py-8 appearance-none rounded-none relative block w-full px-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Description"
                                ></input>
                                <TextField id="price" label="Price" variant="outlined" value={data?.price} />
                                <TextField
                                    multiline
                                    id="description"
                                    label="Description"
                                    variant="outlined"
                                    rows={4}
                                    value={data?.description}
                                />
                                <TextField id="duration" label="Duration" variant="outlined" value={data?.duration} />
                                <TextField
                                    id="dimension"
                                    label="Dimension"
                                    variant="outlined"
                                    value={data?.dimension}
                                />
                                <TextField id="color" label="Color" variant="outlined" value={data?.color} />
                                <TextField id="Color" label="Color" variant="outlined" value={data?.duration} />
                            </div>

                            <div className="flex justify-end mt-3 gap-2">
                                <Button variant="contained" onClick={handleClose}>
                                    Save
                                </Button>
                                <Button variant="contained" onClick={handleClose}>
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </Box>
                )}
            </Modal>
        </div>
    );
};
