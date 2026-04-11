import { Component, ReactNode } from 'react';

import Snippet from '../../../Snippet';
import Variable from '../../../Variable/Variable';
import { IntegerSnippetProps } from '../IntegerSnippetProps';

export default class LedSnippet extends Component<IntegerSnippetProps> {
    public render(): ReactNode {
        const { controlIdentifier, output, useAddressConstants } = this.props;
        const methodName = Snippet.snakeToCamelCase(controlIdentifier);
        const usePackedIdentifier = useAddressConstants && !!output.address_mask_identifier;

        return (
            <Snippet>
                DcsBios::EasyMode::LED {methodName}(
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;
                {usePackedIdentifier ? (
                    <>
                        {output.address_mask_identifier}
                        {', // DCS-BIOS Channel\n    '}
                        <Variable>PIN</Variable>
                        {'                      // Arduino pin connected to the LED\n);'}
                    </>
                ) : (
                    <>
                        {Snippet.toHex(output.address)}
                        {', // DCS World: memory address containing the LED bit\n    '}
                        {Snippet.toHex(output.mask)}
                        {', // Bit mask used to select the LED state\n    '}
                        <Variable>PIN</Variable>
                        {'                      // Arduino pin connected to the LED\n);'}
                    </>
                )}
            </Snippet>
        );
    }
}
