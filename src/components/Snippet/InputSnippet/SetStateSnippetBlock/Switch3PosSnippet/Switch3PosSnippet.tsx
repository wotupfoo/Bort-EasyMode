import { Component, ReactNode } from 'react';

import Snippet from '../../../Snippet';
import Variable from '../../../Variable/Variable';

export interface Switch3PosSnippetProps {
    controlIdentifier: string;
}

export default class Switch3PosSnippet extends Component<Switch3PosSnippetProps> {
    public render(): ReactNode {
        const { controlIdentifier } = this.props;
        const methodName = Snippet.snakeToCamelCase(`${controlIdentifier}`);

        return (
            <Snippet>
                DcsBios::EasyMode::Switch3Pos {methodName}(
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;
                {`"${controlIdentifier}"`}
                {', // DCS-BIOS Control\n    '}
                <Variable>PIN_A</Variable>
                {',                    // Arduino pin connected to switch position A\n    '}
                <Variable>PIN_B</Variable>
                {'                    // Arduino pin connected to switch position B\n);'}
            </Snippet>
        );
    }
}
