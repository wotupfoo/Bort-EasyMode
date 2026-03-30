import { Component, ReactNode } from 'react';

import Snippet from '../../../Snippet';
import Variable from '../../../Variable/Variable';
import { IntegerSnippetProps } from '../IntegerSnippetProps';

export default class EasyStepper28Byj48BoundedSnippet extends Component<IntegerSnippetProps> {
    public render(): ReactNode {
        const { controlIdentifier, output, useAddressConstants } = this.props;
        const methodName = Snippet.snakeToCamelCase(controlIdentifier);
        const useAddressIdentifier = useAddressConstants && !!output.address_identifier;
        const source = (useAddressIdentifier && output.address_identifier) || Snippet.toHex(output.address);

        return (
            <Snippet>
                DcsBios::EasyStepper_28BYJ48_Bounded {methodName}(
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;
                {source}
                {useAddressIdentifier
                    ? ', // Telemetry source\n    '
                    : ', // DCS World: memory address with the value\n    '}
                <Variable>PIN1</Variable>
                {',                      // 28BYJ-48 / ULN2003 input pin 1\n    '}
                <Variable>PIN2</Variable>
                {',                      // 28BYJ-48 / ULN2003 input pin 2\n    '}
                <Variable>PIN3</Variable>
                {',                      // 28BYJ-48 / ULN2003 input pin 3\n    '}
                <Variable>PIN4</Variable>
                {',                      // 28BYJ-48 / ULN2003 input pin 4\n    '}
                <Variable>ZEROPIN</Variable>
                {',                   // Zero angle detection input pin\n    '}
                <Variable>true</Variable>
                {'                      // Zero is in the middle of the range (true or false)\n);'}
            </Snippet>
        );
    }
}
