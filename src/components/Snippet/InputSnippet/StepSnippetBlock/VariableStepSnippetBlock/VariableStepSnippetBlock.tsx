import { Component, ReactNode } from 'react';

import Input from '../../../../../@types/Input';
import SnippetGroupHeading from '../../../SnippetGroupHeading/SnippetGroupHeading';
import InputSnippetBlock from '../../InputSnippetBlock';
import RotaryEncoderSnippet from '../RotaryEncoderSnippet/RotaryEncoderSnippet';

export interface VariableStepSnippetBlockProps {
    controlIdentifier: string;
    input: Input;
    scaffoldingMode: string;
}

export default class VariableStepSnippetBlock extends Component<VariableStepSnippetBlockProps> {
    public render(): ReactNode {
        const { controlIdentifier, input, scaffoldingMode } = this.props;
        const message = `${controlIdentifier} <new_value>|-<decrease_by>|+<increase_by>`;
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
                        <RotaryEncoderSnippet
                            controlIdentifier={controlIdentifier}
                            downArgument={`-${input.suggested_step}`}
                            upArgument={`+${input.suggested_step}`}
                        />
                    </>
                ) : null}
            </InputSnippetBlock>
        );
    }
}
