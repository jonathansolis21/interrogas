import React, { useState, useRef, useEffect, forwardRef } from 'react';
import {
    useTable,
    useSortBy,
    usePagination,
    useRowSelect,
    useGlobalFilter,
    useAsyncDebounce,
    useExpanded,
} from 'react-table';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import RefPagination from './ReferencesPagination';
import debug from 'sabio-debug';

const _logger = debug.extend('ReferencesTable');

const GlobalFilter = ({ preGlobalFilteredRows, globalFilter, setGlobalFilter, searchBoxClass }) => {
    const count = preGlobalFilteredRows.length;
    const [value, setValue] = useState(globalFilter);
    const onChange = useAsyncDebounce((value) => {
        setGlobalFilter(value || undefined);
    }, 200);

    return (
        <div className={classNames(searchBoxClass)}>
            <span className="d-flex align-items-center">
                Search :{' '}
                <input
                    value={value || ''}
                    onChange={(e) => {
                        setValue(e.target.value);
                        onChange(e.target.value);
                    }}
                    placeholder={`${count} records...`}
                    className="form-control w-auto ms-1"
                />
            </span>
        </div>
    );
};

GlobalFilter.propTypes = {
    preGlobalFilteredRows: PropTypes.arrayOf(null),
    length: PropTypes.number,
    globalFilter: PropTypes.arrayOf(null),
    setGlobalFilter: PropTypes.arrayOf(null),
    searchBoxClass: PropTypes.string,
};

const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }, ref) => {
    const defaultRef = useRef();
    const resolvedRef = ref || defaultRef;

    useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
        <>
            <div className="form-check">
                <input type="checkbox" className="form-check-input" ref={resolvedRef} {...rest} />
                <label htmlFor="form-check-input" className="form-check-label"></label>
            </div>
        </>
    );
});

IndeterminateCheckbox.propTypes = {
    indeterminate: PropTypes.arrayOf,
};

const Table = (props) => {
    _logger('props from ReferencesTable', props);
    const isSearchable = props['isSearchable'] || false;
    const isSortable = props['isSortable'] || false;
    const pagination = props['pagination'] || false;
    const isSelectable = props['isSelectable'] || false;
    const isExpandable = props['isExpandable'] || false;

    const dataTable = useTable(
        {
            columns: props['columns'],
            data: props['data'],
            initialState: { pageSize: props['pageSize'] || 10 },
        },
        isSearchable && useGlobalFilter,
        isSortable && useSortBy,
        isExpandable && useExpanded,
        pagination && usePagination,
        isSelectable && useRowSelect,
        (hooks) => {
            isSelectable &&
                hooks.visibleColumns.push((columns) => [
                    {
                        id: 'selection',

                        Header: ({ getToggleAllPageRowsSelectedProps }) => (
                            <div>
                                <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
                            </div>
                        ),

                        Cell: ({ row }) => (
                            <div>
                                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                            </div>
                        ),
                    },
                    ...columns,
                ]);

            isExpandable &&
                hooks.visibleColumns.push((columns) => [
                    {
                        id: 'expander',
                        Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
                            <span {...getToggleAllRowsExpandedProps()}>{isAllRowsExpanded ? '-' : '+'}</span>
                        ),
                        Cell: ({ row }) =>
                            row.canExpand ? (
                                <span
                                    {...row.getToggleRowExpandedProps({
                                        style: {
                                            paddingLeft: `${row.depth * 2}rem`,
                                        },
                                    })}>
                                    {row.isExpanded ? '-' : '+'}
                                </span>
                            ) : null,
                    },
                    ...columns,
                ]);
        }
    );

    Table.propTypes = {
        isSearchable: PropTypes.bool,
        isSortable: PropTypes.bool,
        pagination: PropTypes.number,
        isSelectable: PropTypes.bool,
        isExpandable: PropTypes.bool,
        columns: PropTypes.number,
        data: PropTypes.number,
        pageSize: PropTypes.number,
        getToggleAllPageRowsSelectedProps: PropTypes.number,
        getToggleAllRowsExpandedProps: PropTypes.number,
        isAllRowsExpanded: PropTypes.number,
        canExpand: PropTypes.number,
        row: PropTypes.number,
        getToggleRowExpandedProps: PropTypes.number,
        getToggleRowSelectedProps: PropTypes.number,
        depth: PropTypes.number,
        isExpanded: PropTypes.number,
        searchBoxClass: PropTypes.string,
        tableClass: PropTypes.string,
        theadClass: PropTypes.string,
        sizePerPageList: PropTypes.number,
    };

    _logger('datatable.page', dataTable.page);
    _logger('datatable.rows', dataTable.rows);
    _logger('just dataTable', dataTable);

    let rows = pagination ? dataTable.page : dataTable.rows;

    return (
        <>
            {isSearchable && (
                <GlobalFilter
                    preGlobalFilteredRows={dataTable.preGlobalFilteredRows}
                    globalFilter={dataTable.state.globalFilter}
                    setGlobalFilter={dataTable.setGlobalFilter}
                    searchBoxClass={props['searchBoxClass']}
                />
            )}

            <div className="table-responsive">
                <table
                    {...dataTable.getTableProps()}
                    className={classNames('table table-centered react-table', props['tableClass'])}>
                    <thead className={props['theadClass']}>
                        {dataTable.headerGroups.map((headerGroup) => (
                            <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th
                                        key={column.id}
                                        {...column.getHeaderProps(column.sort && column.getSortByToggleProps())}
                                        className={classNames({
                                            sortingDesc: column.isSortedDesc === true,
                                            sortingSsc: column.isSortedDesc === false,
                                            sortable: column.sort === true,
                                        })}>
                                        {column.render('Header')}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    {/* changing data here  */}
                    <tbody {...dataTable.getTableBodyProps()}>
                        {(rows || []).map((row) => {
                            dataTable.prepareRow(row);
                            return (
                                <tr key={row.id} {...row.getRowProps()}>
                                    {row.cells.map((cell) => {
                                        return (
                                            <td key={cell.id} {...cell.getCellProps()}>
                                                {cell.render('Cell')}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {pagination && <RefPagination tableProps={dataTable} sizePerPageList={props['sizePerPageList']} />}
        </>
    );
};

Table.defaultProps = {
    Tables: '',
};

Table.propTypes = {
    tableProps: PropTypes.string,
};
export default Table;
