import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Container } from 'react-bootstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import refFormSchema from './ReferencesSchema';
import toastr from 'toastr';
import 'toastr/build/toastr.css';
import { Link, useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { updateReference } from '../../services/referenceService';
import PageTitle from './ReferencesTitle';
import getLookUps from '../../services/lookUpsService';
import './ref.css';

function ReferenceUpdate() {
    const briq = useLocation().state.payload;
    const location = useLocation();

    const [statusTypeValues, setStatusValues] = useState([]);
    const [statesValues, setStatesValues] = useState([]);
    const [codeValues, setCodeValues] = useState([]);

    const [initialFormValues] = useState({
        id: briq.id,
        date: briq.date.split('T')[0],
        refName: briq.name,
        fileId: briq.fileId,
        electionYear: briq.electionYear,
        statusId: briq.statusId,
        name: briq.institution.name,
        siteUrl: briq.institution.siteUrl,
        logoUrl: briq.institution.logoUrl,
        stateId: briq.institution.stateId,
        code: briq.institution.code,
    });

    const submitForm = (location) => {
        updateReference(location, location.id).then(onUpdateSuccess).catch(onUpdateErr);
    };

    const onUpdateSuccess = (response) => {
        toastr.success(`SUCCESS! Item has been updated.`);
        window.location.replace('/references');
    };

    const onUpdateErr = (err) => {
        toastr.error('Update failed. Please check comments under each field to ensure proper data entry.');
    };

    useEffect(() => {
        getLookUps(['StatusTypes', 'States']).then(onTypesSuccess).catch(onTypesError);
    }, []);

    const onTypesSuccess = (response) => {
        
        setStatusValues((prevState) => {
            let copy = { ...prevState };
            copy = response.item.StatusTypes;
            return copy;
        });
        setStatesValues((prevState) => {
            let copy = { ...prevState };
            copy = response.item.States;
            return copy;
        });
        setCodeValues((prevState) => {
            let copy = { ...prevState };
            copy = response.item.States;
            return copy;
        });
    };

    const onTypesError = (error) => {
    };

    const mapTypes = (values) => (
        <option value={values.id} key={`values_${values.id}`}>
            {values.name}
        </option>
    );

    const mapTypes2 = (values) => (
        <option value={values.code} key={`values_${values.code}`}>
            {values.name}
        </option>
    );

    return (
        <React.Fragment>
            <PageTitle
                breadCrumbItems={[
                    { label: 'References', path: '/references/' },
                    { label: 'Update Reference', path: '/references/update/:id', active: true },
                ]}
                title={location.pathname === '/references/update/:id' ? 'Add Reference' : 'Update Reference'}
            />
            <Formik initialValues={initialFormValues} validationSchema={refFormSchema} onSubmit={submitForm}>
                <Form>
                    <Container>
                        <Card className="mx-auto" style={{ width: '48rem' }}>
                            <Card.Body>
                                <h5 className="mb-4 text-uppercase">
                                    <i className="mdi mdi-account-circle me-1"></i> Reference Info
                                </h5>
                                <Row>
                                    <Col md={6} className="mb-3">
                                        <label className="form-label">Date</label>
                                        <br></br>
                                        <Field
                                            name={'date'}
                                            type="date"
                                            placeholder="Enter Date as YYYY-MM-DD"
                                            className="ref-style"
                                        />
                                        <ErrorMessage name={'date'} component="div" className="mx-3" />
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <label className="form-label">Reference Name</label>
                                        <br></br>
                                        <Field
                                            name={'refName'}
                                            placeholder="Enter Name for the Reference"
                                            className="ref-style"
                                        />
                                        <ErrorMessage name={'refName'} component="div" className="mx-3" />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6} className="mb-3">
                                        <label className="form-label">File ID</label>
                                        <br></br>
                                        <Field
                                            name={'fileId'}
                                            placeholder="Enter the ID of an existing File"
                                            className="ref-style"
                                        />
                                        <ErrorMessage name={'fileId'} component="div" className="mx-3" />
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <label className="form-label">Election Year</label>
                                        <br></br>
                                        <Field
                                            name={'electionYear'}
                                            placeholder="Enter the Election Year"
                                            className="ref-style"
                                        />
                                        <ErrorMessage name={'electionYear'} component="div" className="mx-3" />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6} className="mb-3">
                                        <label className="form-label">Status ID</label>
                                        <br></br>
                                        <Field
                                            component="select"
                                            name={'statusId'}
                                            placeholder="Enter an ID from Status Types; for example, 1 means Active"
                                            className="ref-style">
                                            <option value={briq?.status}>Please select an option</option>
                                            {statusTypeValues && statusTypeValues.map(mapTypes)}
                                        </Field>
                                        <ErrorMessage name={'statusId'} component="div" className="mx-3" />
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <label className="form-label">Institution Name</label>
                                        <br></br>
                                        <Field
                                            type="name"
                                            name="name"
                                            placeholder="Enter the name of the Institution"
                                            className="ref-style"
                                        />
                                        <ErrorMessage name="name" component="div" className="mx-3" />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6} className="mb-3">
                                        <label className="form-label">Site URL</label>
                                        <br></br>
                                        <Field
                                            name={'siteUrl'}
                                            placeholder="Enter a url for the Institution website"
                                            className="ref-style"
                                        />
                                        <ErrorMessage name={'siteUrl'} component="div" className="mx-3" />
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <label className="form-label">Logo URL</label>
                                        <br></br>
                                        <Field
                                            name={'logoUrl'}
                                            placeholder="Enter a url for the Institution logo"
                                            className="ref-style"
                                        />
                                        <ErrorMessage name={'logoUrl'} component="div" className="mx-3" />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6} className="mb-3">
                                        <label className="form-label">State ID</label>
                                        <br></br>
                                        <Field
                                            component="select"
                                            name={'stateId'}
                                            placeholder="Enter an ID from States"
                                            className="ref-style">
                                            <option value="">Please select a state to submit the ID</option>
                                            {statesValues && statesValues.map(mapTypes)}
                                        </Field>
                                        <ErrorMessage name={'stateId'} component="div" className="mx-3" />
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <label className="form-label">Code</label>
                                        <br></br>
                                        <Field
                                            component="select"
                                            name={'code'}
                                            placeholder="Enter corresponding code from States"
                                            className="ref-style">
                                            <option value="">
                                                Please select the same state as ID to submit the Code
                                            </option>
                                            {codeValues && codeValues.map(mapTypes2)}
                                        </Field>
                                        <ErrorMessage name={'code'} component="div" className="mx-3" />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div className=" text-start text-wrap">
                                            <Link to="/references">
                                                <Button className="btn btn-primary mt-2">
                                                    <i className="mdi mdi-arrow-left-bold"></i> Back to References
                                                </Button>
                                            </Link>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="text-end">
                                            <Button
                                                type="submit"
                                                className="btn btn-success mt-2 justify-content-md-end">
                                                <i className="mdi mdi-content-save"></i>Save
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Container>
                </Form>
            </Formik>
        </React.Fragment>
    );
}

export default ReferenceUpdate;
