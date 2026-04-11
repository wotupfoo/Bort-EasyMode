import { Component, ReactNode } from 'react';

import Snippet from '../../../Snippet';
import Variable from '../../../Variable/Variable';
import { IntegerSnippetProps } from '../IntegerSnippetProps';

export default class ServoSnippet extends Component<IntegerSnippetProps> {
    public render(): ReactNode {
        const { controlIdentifier, output, useAddressConstants } = this.props;
        const methodName = Snippet.snakeToCamelCase(controlIdentifier);
        const useAddressIdentifier = useAddressConstants && !!output.address_identifier;
        const source = (useAddressIdentifier && output.address_identifier) || Snippet.toHex(output.address);

        return (
            <Snippet>
                DcsBios::EasyMode::ServoOutput {methodName}(
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;
                {source}
                {useAddressIdentifier
                    ? ', // DCS-BIOS Channel\n    '
                    : ', // DCS World: memory address with the value\n    '}
                <Variable>PIN</Variable>
                {',                      // Arduino pin connected to the servo signal wire\n    '}
                <Variable>544</Variable>
                {',                      // Minimum pulse width in microseconds\n    '}
                <Variable>2400</Variable>
                {'                     // Maximum pulse width in microseconds\n);'}
            </Snippet>
        );
    }
}
