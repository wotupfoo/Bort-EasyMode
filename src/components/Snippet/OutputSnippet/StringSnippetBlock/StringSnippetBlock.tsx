import { Component, ReactNode } from 'react';

import SnippetGroupHeading from '../../SnippetGroupHeading/SnippetGroupHeading';
import OutputSnippetBlock from '../OutputSnippetBlock';
import StringBufferSnippet from './StringBufferSnippet/StringBufferSnippet';
import { StringSnippetProps } from './StringSnippetProps';

export default class StringSnippetBlock extends Component<StringSnippetProps> {
    public render(): ReactNode {
        const { controlIdentifier, output, showAdvancedCodeSnippets, useAddressConstants, scaffoldingMode } =
            this.props;
        const showPassThrough = scaffoldingMode === 'passthrough' || scaffoldingMode === 'both';
        const showStringBufferSnippet = showPassThrough && showAdvancedCodeSnippets;

        return (
            <OutputSnippetBlock output={output} useAddressConstants={useAddressConstants}>
                {showStringBufferSnippet ? (
                    <>
                        <SnippetGroupHeading title={'DCS-BIOS Pass-Through Snippets'}>
                            Lower-level snippets that expose the original DCS-BIOS inputs and outputs. Use these when
                            they work great already and you don't need any of the new features the EasyMode snippets
                            give you.
                        </SnippetGroupHeading>
                        <StringBufferSnippet
                            controlIdentifier={controlIdentifier}
                            output={output}
                            showAdvancedCodeSnippets={showAdvancedCodeSnippets}
                            useAddressConstants={useAddressConstants}
                        />
                    </>
                ) : (
                    <></>
                )}
            </OutputSnippetBlock>
        );
    }
}
