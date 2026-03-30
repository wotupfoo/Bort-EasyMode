import { Component, ReactNode } from 'react';

import Snippet from '../../../Snippet';
import Variable from '../../../Variable/Variable';
import { IntegerSnippetProps } from '../IntegerSnippetProps';

export default class EasyServoSg90Snippet extends Component<IntegerSnippetProps> {
    public render(): ReactNode {
        const { output, useAddressConstants } = this.props;
        const source = (useAddressConstants && output.address_identifier) || Snippet.toHex(output.address);

        return (
            <Snippet>
                DcsBios::EasyServo_SG90 altimeterNeedle(
                {source}, <Variable>PIN</Variable>, <Variable>0</Variable>, <Variable>180</Variable>,{' '}
                <Variable>false</Variable>, <Variable>0</Variable>);
            </Snippet>
        );
    }
}
