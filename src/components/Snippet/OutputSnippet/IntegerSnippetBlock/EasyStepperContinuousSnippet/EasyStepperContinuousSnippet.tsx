import { Component, ReactNode } from 'react';

import Snippet from '../../../Snippet';
import Variable from '../../../Variable/Variable';
import { IntegerSnippetProps } from '../IntegerSnippetProps';

export default class EasyStepperContinuousSnippet extends Component<IntegerSnippetProps> {
    public render(): ReactNode {
        const { controlIdentifier, output, useAddressConstants } = this.props;
        const methodName = Snippet.snakeToCamelCase(controlIdentifier);
        const usePackedIdentifier = useAddressConstants && !!output.address_mask_shift_identifier;

        return (
            <Snippet>
                DcsBios::EasyStepper_Continuous {methodName}(
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;
                {usePackedIdentifier ? (
                    <>
                        {output.address_mask_shift_identifier}
                        {', // Telemetry source\n'}
                    </>
                ) : (
                    <>
                        {Snippet.toHex(output.address)}
                        {', // DCS World: memory address with the value\n    '}
                        {Snippet.toHex(output.mask)}
                        {',   // Bit mask for packed integer fields\n    '}
                        {output.shift_by}
                        {',              // Right shift for packed integer fields\n'}
                    </>
                )}
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Variable>PIN1</Variable>
                {',                 // Stepper driver input pin 1\n    '}
                <Variable>PIN2</Variable>
                {',                 // Stepper driver input pin 2\n    '}
                <Variable>PIN3</Variable>
                {',                 // Stepper driver input pin 3\n    '}
                <Variable>PIN4</Variable>
                {',                 // Stepper driver input pin 4\n    '}
                <Variable>ZEROPIN</Variable>
                {',              // Zero angle detection input pin\n    '}
                <Variable>true</Variable>
                {'                 // Zero is in the middle of the range (true or false)\n);'}
            </Snippet>
        );
    }
}
