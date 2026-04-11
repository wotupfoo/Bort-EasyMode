import { Component, ReactNode } from 'react';

import OutputSnippetBlock from '../OutputSnippetBlock';
import StringBufferSnippet from './StringBufferSnippet/StringBufferSnippet';
import { StringSnippetProps } from './StringSnippetProps';

export default class StringSnippetBlock extends Component<StringSnippetProps> {
    public render(): ReactNode {
        const { controlIdentifier, output, showAdvancedCodeSnippets, useAddressConstants } = this.props;

        return (
            <OutputSnippetBlock output={output} useAddressConstants={useAddressConstants}>
                <StringBufferSnippet
                    controlIdentifier={controlIdentifier}
                    output={output}
                    showAdvancedCodeSnippets={showAdvancedCodeSnippets}
                    useAddressConstants={useAddressConstants}
                />
            </OutputSnippetBlock>
        );
    }
}
