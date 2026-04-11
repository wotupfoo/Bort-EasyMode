import { Component, ReactNode } from 'react';

import Snippet from '../../../Snippet';
import Variable from '../../../Variable/Variable';
import { IntegerSnippetProps } from '../IntegerSnippetProps';

export default class EasyServoSg90Snippet extends Component<IntegerSnippetProps> {
    public render(): ReactNode {
        const { controlIdentifier, output, useAddressConstants } = this.props;
        const methodName = Snippet.snakeToCamelCase(controlIdentifier);
        const usePackedIdentifier = useAddressConstants && !!output.address_mask_shift_identifier;

        return (
            <Snippet>
                DcsBios::EasyMode::Servo_SG90 {methodName}(
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;
                {usePackedIdentifier ? (
                    <>
                        {output.address_mask_shift_identifier}
                        {', // DCS-BIOS Channel\n    '}
                    </>
                ) : (
                    <>
                        {Snippet.toHex(output.address)}
                        {', // DCS World: memory address with the value\n    '}
                        {Snippet.toHex(output.mask)}
                        {', // Bit mask for packed integer fields\n    '}
                        {output.shift_by}
                        {', // Right shift for packed integer fields\n    '}
                    </>
                )}
                <Variable>PIN</Variable>
                {'                          // Arduino pin connected to the servo signal wire\n);'}
            </Snippet>
        );
    }
}
