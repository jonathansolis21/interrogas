import React from 'react';
import { Row, Col, Breadcrumb } from 'react-bootstrap';
import PropTypes from 'prop-types';
import debug from 'sabio-debug';
const _logger = debug.extend('ReferencesTitle');

const RefTitle = (props) => {
    _logger(props, 'RefTitle props');

    return (
        <Row>
            <Col>
                <div className="page-title-box">
                    <div className="page-title-right">
                        <Breadcrumb listProps={{ className: 'm-0' }}>
                            <Breadcrumb.Item href="/">Interrogas</Breadcrumb.Item>
                            {props.breadCrumbItems.map((item, index) => {
                                return item.active ? (
                                    <Breadcrumb.Item active key={index}>
                                        {item.label}
                                    </Breadcrumb.Item>
                                ) : (
                                    <Breadcrumb.Item key={index} href={item.path}>
                                        {item.label}
                                    </Breadcrumb.Item>
                                );
                            })}
                        </Breadcrumb>
                    </div>
                    <h4 className="page-title">{props.title}</h4>
                </div>
            </Col>
        </Row>
    );
};

RefTitle.propTypes = {
    breadCrumbItems: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            path: PropTypes.string.isRequired,
            active: PropTypes.bool,
        })
    ),
    title: PropTypes.string.isRequired,
};
RefTitle.defaultProps = {
    arrayData: [],
};

export default RefTitle;
