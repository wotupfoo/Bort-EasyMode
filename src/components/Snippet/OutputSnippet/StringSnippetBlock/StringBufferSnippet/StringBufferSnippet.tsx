import { Component, ReactNode } from 'react';

import Snippet from '../../../Snippet';
import { StringSnippetProps } from '../StringSnippetProps';

export default class StringBufferSnippet extends Component<StringSnippetProps> {
    public render(): ReactNode {
        const { controlIdentifier, output, useAddressConstants } = this.props;
        const methodName = Snippet.snakeToCamelCase(`${controlIdentifier}${output.suffix}_Buffer`);
        const callbackMethodName = Snippet.snakeToCamelCase(`on_${controlIdentifier}_change`);
        const useAddressIdentifier = useAddressConstants && !!output.address_identifier;
        const source = (useAddressIdentifier && output.address_identifier) || Snippet.toHex(output.address);

        return (
            <Snippet>
                void {callbackMethodName}(char* newValue) &#123;
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;/* your code here */
                <br />
                &#125;
                <br />
                DcsBios::EasyMode::StringBuffer&lt;{output.max_length}&gt; {methodName}(
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;
                {source}
                {useAddressIdentifier
                    ? ', // DCS-BIOS Channel\n    '
                    : ', // DCS World: memory address with the string\n    '}
                {callbackMethodName}
                {'       // Called when the string changes\n);'}
            </Snippet>
        );
    }
}
