import { Component, ReactNode } from 'react';

import Input from '../../../../../@types/Input';
import SnippetGroupHeading from '../../../SnippetGroupHeading/SnippetGroupHeading';
import InputSnippetBlock from '../../InputSnippetBlock';
import RotaryEncoderSnippet from '../RotaryEncoderSnippet/RotaryEncoderSnippet';

export interface FixedStepSnippetBlockProps {
    controlIdentifier: string;
    input: Input;
    scaffoldingMode: string;
}

export default class FixedStepSnippetBlock extends Component<FixedStepSnippetBlockProps> {
    public render(): ReactNode {
        const { controlIdentifier, input, scaffoldingMode } = this.props;
        const message = `${controlIdentifier} <DEC|INC>`;
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
                            downArgument={'DEC'}
                            upArgument={'INC'}
                        />
                    </>
                ) : null}
            </InputSnippetBlock>
        );
    }
}
