import { Component, ReactNode } from 'react';

import Snippet from '../../../Snippet';
import Variable from '../../../Variable/Variable';

export interface RotaryEncoderSnippetProps {
    controlIdentifier: string;
    downArgument: string;
    upArgument: string;
}

export default class RotaryEncoderSnippet extends Component<RotaryEncoderSnippetProps> {
    public render(): ReactNode {
        const { controlIdentifier, downArgument, upArgument } = this.props;
        const methodName = Snippet.snakeToCamelCase(`${controlIdentifier}`);

        return (
            <Snippet>
                DcsBios::EasyMode::RotaryEncoder {methodName}(
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;
                {`"${controlIdentifier}"`}
                {', // DCS-BIOS Control\n    '}
                "{downArgument}"
                {', // Argument sent for one step in the negative direction\n    '}
                "{upArgument}"
                {',   // Argument sent for one step in the positive direction\n    '}
                <Variable>PIN_A</Variable>
                {',                  // Encoder channel A pin\n    '}
                <Variable>PIN_B</Variable>
                {'                   // Encoder channel B pin\n);'}
            </Snippet>
        );
    }
}
