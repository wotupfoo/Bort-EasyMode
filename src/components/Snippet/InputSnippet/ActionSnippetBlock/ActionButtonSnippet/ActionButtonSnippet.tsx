import { Component, ReactNode } from 'react';

import Input from '../../../../../@types/Input';
import Snippet from '../../../Snippet';
import Variable from '../../../Variable/Variable';

export interface ActionButtonSnippetProps {
    controlIdentifier: string;
    input: Input;
}

export default class ActionButtonSnippet extends Component<ActionButtonSnippetProps> {
    public render(): ReactNode {
        const { controlIdentifier, input } = this.props;
        const methodName = Snippet.snakeToCamelCase(`${controlIdentifier}_${input.argument}`);

        return (
            <Snippet>
                DcsBios::EasyMode::ActionButton {methodName}(
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;
                {`"${controlIdentifier}"`}
                {', // DCS-BIOS Control\n    '}
                {`"${input.argument}"`}
                {', // Argument sent when the button is pressed\n    '}
                <Variable>PIN</Variable>
                {'                      // Arduino pin connected to the button\n);'}
            </Snippet>
        );
    }
}
