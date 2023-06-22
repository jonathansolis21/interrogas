import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Row, Col, Card, Button } from 'react-bootstrap';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import * as referenceService from '../../services/referenceService';
import RefTitle from './ReferencesTitle';
import Table from './ReferencesTable';
import Swal from 'sweetalert2';

const References = () => {
    const [referenceData, setReferenceData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        referenceService.getReferences(0, 100).then(onGetReferenceSuccess).catch(onGetReferenceError);
    }, []);

    const onGetReferenceSuccess = (response) => {
        const refGet = response.item.pagedItems;
        setReferenceData(refGet);
    };

    const onGetReferenceError = (err) => {
    };

    const StatusColumn = ({ row }) => {
        return (
            <>
                <span
                    className={classNames('badge', {
                        'badge-success-lighten': row.original.status === 'Active',
                        'badge-secondary-lighten': row.original.status === 'Inactive',
                        'badge-warning-lighten': row.original.status === 'Pending',
                        'badge-info-lighten': row.original.status === 'Flagged',
                        'badge-danger-lighten': row.original.status === 'Removed',
                    })}>
                    {row.original.status}
                </span>
            </>
        );
    };

    StatusColumn.propTypes = {
        row: PropTypes.shape({
            original: PropTypes.shape({
                status: PropTypes.string.isRequired,
            }),
        }),
    };

    const onDelete = (tableProps) => {
        Swal.fire({
            title: 'Change to Removed?',
            text: 'This action will simply change Status to Removed. It will remain for your reference.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#727cf5',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirm',
        }).then((result) => {
            if (result.isConfirmed) {
                referenceService
                    .deleteReference(tableProps.row.original.id)
                    .then(onDeleteRefSuccess)
                    .catch(onDeleteRefError);
            }
            window.location.reload();
        });
        const onDeleteRefSuccess = (success) => {
            Swal.fire('Removed!', 'The status has successfully been changed.', 'success');
        };
        const onDeleteRefError = (err) => {
            return 'The operation has failed. Please try again.';
        };
    };

    const onUpdate = (tableProps) => {
        const stateForTransport = { type: 'REFRENCES_VIEW', payload: tableProps.row.original };
        navigate(`/references/update/${tableProps.row.original.id}`, { state: stateForTransport });
    };

    const ActionColumn = (tableProps, dataTable) => {
        return (
            <React.Fragment>
                <Button
                    className="btn btn-warning btn-sm mdi mdi-square-edit-outline"
                    onClick={() => onUpdate(tableProps)}></Button>
                &nbsp;
                <Button className="btn btn-danger btn-sm mdi mdi-delete" onClick={() => onDelete(tableProps)}></Button>
            </React.Fragment>
        );
    };

    const columns = [
        {
            Header: 'Name',
            accessor: 'name',
            sort: true,
        },
        {
            Header: 'Date',
            accessor: 'date',
            sort: true,
            Cell: (tableProps) => new Date(tableProps.row.original.date).toLocaleDateString(),
        },
        {
            Header: 'File Name',
            accessor: 'fileName',
            sort: true,
        },
        {
            Header: 'Year',
            accessor: 'electionYear',
            sort: true,
        },
        {
            Header: 'Status',
            accessor: 'status',
            sort: true,
            Cell: StatusColumn,
        },
        {
            Header: 'Institution',
            accessor: 'institution.name',
            sort: true,
        },
        {
            Header: 'Logo',
            accessor: 'institution.logoUrl',
            sort: true,
            Cell: (tableProps) => (
                <a href={tableProps.row.original.institution.siteUrl}>
                    <img src={tableProps.row.original.institution.logoUrl} width={90} height={30} alt="Logo URL"></img>
                </a>
            ),
        },
        {
            Header: 'State',
            accessor: 'institution.code',
            sort: true,
        },
        {
            Header: 'Action',
            accessor: 'action',
            sort: false,
            classes: 'table-action',
            Cell: ActionColumn,
        },
    ];

    const sizePerPageList = [
        {
            text: '10',
            value: 10,
        },
        {
            text: '25',
            value: 25,
        },
        {
            text: '50',
            value: 50,
        },
    ];

    return (
        <React.Fragment>
            <RefTitle
                breadCrumbItems={[
                    { label: 'References', path: '/references/' },
                    {
                        label: 'References',
                        path: '/references/',
                        active: true,
                    },
                ]}
                title={'References'}
            />
            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col sm={5}>
                                    <Link to="/references/new">
                                        <Button className="btn btn-warning mb-2">
                                            <i className="mdi mdi-plus-circle me-2"></i>Add Reference
                                        </Button>
                                    </Link>
                                </Col>
                            </Row>
                            <Table
                                columns={columns}
                                data={referenceData}
                                pageSize={10}
                                sizePerPageList={sizePerPageList}
                                isSortable={true}
                                pagination={true}
                                isSelectable={true}
                                isSearchable={true}
                                tableClass="table-striped"
                                searchBoxClass="mt-2 mb-3"
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

References.defaultProps = {
    references: '',
};
References.propTypes = {
    references: PropTypes.string.isRequired,
};

export default References;
