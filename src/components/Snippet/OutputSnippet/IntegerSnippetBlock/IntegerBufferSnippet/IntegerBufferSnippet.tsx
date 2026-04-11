import { Component, ReactNode } from 'react';

import Snippet from '../../../Snippet';
import { IntegerSnippetProps } from '../IntegerSnippetProps';

export default class IntegerBufferSnippet extends Component<IntegerSnippetProps> {
    public render(): ReactNode {
        const { controlIdentifier, output, useAddressConstants } = this.props;
        const methodName = Snippet.snakeToCamelCase(`${controlIdentifier}_Buffer`);
        const callbackMethodName = Snippet.snakeToCamelCase(`on_${controlIdentifier}_change`);
        const usePackedIdentifier = useAddressConstants && !!output.address_mask_shift_identifier;

        return (
            <Snippet>
                void {callbackMethodName}(unsigned int newValue) &#123;
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;/* your code here */
                <br />
                &#125;
                <br />
                DcsBios::EasyMode::IntegerBuffer {methodName}(
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;
                {usePackedIdentifier ? (
                    <>
                        {output.address_mask_shift_identifier}
                        {', // DCS-BIOS Channel\n    '}
                        {callbackMethodName}
                        {'       // Called when the value changes\n);'}
                    </>
                ) : (
                    <>
                        {Snippet.toHex(output.address)}
                        {', // DCS World: memory address with the value\n    '}
                        {Snippet.toHex(output.mask)}
                        {', // Bit mask used to extract this value\n    '}
                        {output.shift_by}
                        {', // Number of bits to right-shift after masking\n    '}
                        {callbackMethodName}
                        {'       // Called when the value changes\n);'}
                    </>
                )}
            </Snippet>
        );
    }
}
