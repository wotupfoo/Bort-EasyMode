import { Component, ReactNode } from 'react';

import Snippet from '../../../Snippet';
import Variable from '../../../Variable/Variable';
import { IntegerSnippetProps } from '../IntegerSnippetProps';

export default class EasyServoSnippet extends Component<IntegerSnippetProps> {
    public render(): ReactNode {
        const { controlIdentifier, output, useAddressConstants } = this.props;
        const methodName = Snippet.snakeToCamelCase(controlIdentifier);
        const useAddressIdentifier = useAddressConstants && !!output.address_identifier;
        const source = (useAddressIdentifier && output.address_identifier) || Snippet.toHex(output.address);

        return (
            <Snippet>
                DcsBios::EasyServo {methodName}(
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;
                {source}
                {useAddressIdentifier
                    ? ', // Telemetry source\n    '
                    : ', // DCS World: memory address with the value\n    '}
                <Variable>PIN</Variable>
                {',                      // Arduino pin connected to the servo signal wire\n    '}
                <Variable>0</Variable>
                {',                        // Minimum needle angle in degrees\n    '}
                <Variable>180</Variable>
                {',                     // Maximum needle angle in degrees\n    '}
                <Variable>false</Variable>
                {',                  // Reverse the direction (true or false)\n    '}
                <Variable>0</Variable>
                {'                        // Trim Degrees: rotate the whole scale to match the printed dial face\n);'}
            </Snippet>
        );
    }
}
