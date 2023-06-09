import axios from 'axios';
import * as helper from './serviceHelpers';
import { API_HOST_PREFIX } from './serviceHelpers';
import logger from 'sabio-debug';
const _logger = logger.extend('ReferencesService');
const endpoint = `${API_HOST_PREFIX}/api/references`;

const getReferences = (pageIndex, pageSize) => { 
    const config = {
        method: 'GET',
        url: `${endpoint}/paginate/?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    _logger('from getreferences', config.url); 
    return axios(config).then(helper.onGlobalSuccess);
};

const getReferenceById = (id) => { 
    const config = {
        method: 'GET',
        url: `${endpoint}/${id}`,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(helper.onGlobalSuccess);
};

const deleteReference = (id) => {    
    const config = {
        method: 'PUT',
        url: `${endpoint}/status/${id} `, 
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(helper.onGlobalSuccess);
};

const addReference = (payload) => {
    const config = {
        method: 'POST',
        url: `${endpoint}`,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(helper.onGlobalSuccess);
};

const updateReference = (payload, id) => {
    const config = {
        method: 'PUT',
        url: `${endpoint}/${id}`,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(helper.onGlobalSuccess);
};

export { getReferences, getReferenceById, deleteReference, addReference, updateReference };
