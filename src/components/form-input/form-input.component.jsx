import React from 'react';

import { GroupContainer, FormInputLabel, Input } from './form-input.styles';

const FormInput = ({ label, ...otherProps }) => {
    return (
        <GroupContainer>
            <Input {...otherProps} />
            {label && <FormInputLabel shrink={otherProps.value.length} >{label}</FormInputLabel>}
        </GroupContainer>
    )
}

export default FormInput;