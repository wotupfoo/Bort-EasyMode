import { Component, ReactNode } from 'react';

import Input from '../../../../../@types/Input';
import Snippet from '../../../Snippet';
import Variable from '../../../Variable/Variable';

export interface SetStringSnippetProps {
    controlIdentifier: string;
    input: Input;
}

export default class SetStringSnippet extends Component<SetStringSnippetProps> {
    public render(): ReactNode {
        const { controlIdentifier } = this.props;
        const methodName = Snippet.snakeToCamelCase(`${controlIdentifier}_Set_Freq`);

        return (
            <Snippet>
                DcsBios::EasyMode::ActionButton {methodName}(
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;
                {`"${controlIdentifier}"`}
                {', // DCS-BIOS Control\n    '}
                <Variable>FREQUENCY</Variable>
                {',                // Argument sent when the button is pressed\n    '}
                <Variable>PIN</Variable>
                {'                      // Arduino pin connected to the button\n);'}
            </Snippet>
        );
    }
}
