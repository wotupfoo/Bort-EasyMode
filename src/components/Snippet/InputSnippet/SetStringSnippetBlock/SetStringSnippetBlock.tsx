import { Component, ReactNode } from 'react';

import Input from '../../../../@types/Input';
import SnippetGroupHeading from '../../SnippetGroupHeading/SnippetGroupHeading';
import InputSnippetBlock from '../InputSnippetBlock';
import SetStringSnippet from './SetStringSnippet/SetStringSnippet';

export interface SetStringSnippetBlockProps {
    controlIdentifier: string;
    input: Input;
    scaffoldingMode: string;
}

export default class SetStringSnippetBlock extends Component<SetStringSnippetBlockProps> {
    public render(): ReactNode {
        const { controlIdentifier, input, scaffoldingMode } = this.props;
        const message = `${controlIdentifier} Set String Value`;
        const showPassThrough = scaffoldingMode === 'passthrough' || scaffoldingMode === 'both';

        return (
            <InputSnippetBlock message={message} input={input}>
                {showPassThrough ? (
                    <>
                        <SnippetGroupHeading title={'DCS-BIOS Pass-Through Snippets'}>
                            Lower-level snippets that expose the original DCS-BIOS inputs and outputs. Use these when
                            they work great already and you don't need any of the new features the EasyMode snippets
                            give you.
                        </SnippetGroupHeading>
                        <SetStringSnippet controlIdentifier={controlIdentifier} input={input} />
                    </>
                ) : null}
            </InputSnippetBlock>
        );
    }
}
