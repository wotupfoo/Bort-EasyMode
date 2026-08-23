import { Component, ReactNode } from 'react';

import Input from '../../../../@types/Input';
import SnippetGroupHeading from '../../SnippetGroupHeading/SnippetGroupHeading';
import InputSnippetBlock from '../InputSnippetBlock';
import ActionButtonSnippet from './ActionButtonSnippet/ActionButtonSnippet';

export interface ActionSnippetBlockProps {
    controlIdentifier: string;
    input: Input;
    scaffoldingMode: string;
}

export default class ActionSnippetBlock extends Component<ActionSnippetBlockProps> {
    public render(): ReactNode {
        const { controlIdentifier, input, scaffoldingMode } = this.props;
        const message = `${controlIdentifier} ${input.argument}`;
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
                        <ActionButtonSnippet controlIdentifier={controlIdentifier} input={input} />
                    </>
                ) : null}
            </InputSnippetBlock>
        );
    }
}
