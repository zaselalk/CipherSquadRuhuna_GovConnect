import * as Yup from 'yup';

export const residentValidation = Yup.object({
    contactNumber: Yup.string()
        .matches(/^[0-9]{10}$/, 'Please enter a valid 10-digit contact number.')
        .required('Contact number is required.'),

    weight: Yup.string()
        .matches(/^[0-9]+(\.[0-9]+)?$/, 'Invalid weight format')
        .test('positive', 'Weight must be greater than 0', value => !value || parseFloat(value) > 0),

    height: Yup.string()
        .matches(/^[0-9]+(\.[0-9]+)?$/, 'Invalid height format')
        .test('positive', 'Height must be greater than 0', value => !value || parseFloat(value) > 0),

    nic: Yup.string()
        .trim()
        .matches(
            /^\d{9}V$|^\d{12}$/,
            "NIC must be 9 digits followed by 'V' or 'X' OR a 12-digit number"
        ),

    email: Yup.string()
        .email('Invalid email format'),

    bloodPressure: Yup.string()
        .matches(/^\d{2,3}\/\d{2,3}$/, 'Blood pressure must be in format: systolic/diastolic (e.g. 120/80)')
        .required('Blood pressure is required'),

    heartRate: Yup.number()
        .typeError('Heart rate must be a number')
        .min(40, 'Heart rate must be at least 40 bpm')
        .max(200, 'Heart rate must be less than or equal to 200 bpm')
        .required('Heart rate is required'),





});