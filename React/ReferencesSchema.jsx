import * as Yup from 'yup';

const refFormSchema = Yup.object().shape({
    date: Yup.string().required('Please select a date'),
    refName: Yup.string()
        .min(2, 'A Reference Name must be at least 2 characters')
        .max(255, 'A Reference Name must be 255 characters or less')
        .required('This is a required field'),
    fileId: Yup.number().min(1, 'A File Name Must Be At Least 1 Character').required('This is a required field'),
    electionYear: Yup.number()
        .min(1992, 'An Election Year must in or after 1992')
        .max(2060, 'An Election Year cannot go beyond 2060')
        .required('This is a required field'),
    statusId: Yup.number()
        .min(1, 'A Reference status ID must be between 1 and 5')
        .max(5, 'A Reference status ID must be between 1 and 5')
        .required('This is a required field'),
    name: Yup.string()
        .min(2, 'An Institution Name must be at least 2 characters')
        .max(255, 'An Institution Name must than 255 characters')
        .required('This is a required field'),
    siteUrl: Yup.string()
        .url()
        .min(9, 'A Valid Site URL must be at least 9 Characters')
        .max(255, 'A Valid Site URL must be 255 Characters or less')
        .required('This is a required field'),
    logoUrl: Yup.string()
        .url()
        .min(9, 'A Valid Logo URL must be at least 9 Characters')
        .max(255, 'A Valid Logo URL must be 255 Characters or less')
        .required('This is a required field'),
    stateId: Yup.number().min(1, 'A State Id Must Be Provided').required('This is a required field'),
    code: Yup.string()
        .min(2, 'A State Code must be 2 characters or more')
        .max(6, 'A State Code must be 6 characters or less')
        .required('This is a required field'),
});

export default refFormSchema;
