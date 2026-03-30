import { Component, ReactNode } from 'react';

import Snippet from '../../../Snippet';
import Variable from '../../../Variable/Variable';
import { IntegerSnippetProps } from '../IntegerSnippetProps';

export default class EasyStepperContinuousSnippet extends Component<IntegerSnippetProps> {
    public render(): ReactNode {
        const { output, useAddressConstants } = this.props;
        const source =
            (useAddressConstants && output.address_mask_shift_identifier) ||
            `${Snippet.toHex(output.address)}, ${Snippet.toHex(output.mask)}, ${output.shift_by}`;

        return (
            <Snippet>
                DcsBios::EasyStepper compassCard(
                {source}, <Variable>PIN1</Variable>, <Variable>PIN2</Variable>, <Variable>PIN3</Variable>,{' '}
                <Variable>PIN4</Variable>, <Variable>false</Variable>, <Variable>0.0f</Variable>,{' '}
                <Variable>6.0f</Variable>, <Variable>12.0f</Variable>,{' '}
                <Variable>-1</Variable>, <Variable>true</Variable>, <Variable>-1</Variable>,{' '}
                <Variable>0.0f</Variable>, <Variable>360</Variable>);
            </Snippet>
        );
    }
}
