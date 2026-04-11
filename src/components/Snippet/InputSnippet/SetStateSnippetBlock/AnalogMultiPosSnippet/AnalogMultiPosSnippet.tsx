import { Component, ReactNode } from 'react';

import Snippet from '../../../Snippet';
import Variable from '../../../Variable/Variable';

export interface AnalogMultiPosSnippetProps {
    controlIdentifier: string;
}

export default class AnalogMultiPosSnippet extends Component<AnalogMultiPosSnippetProps> {
    public render(): ReactNode {
        const { controlIdentifier } = this.props;
        const methodName = Snippet.snakeToCamelCase(`${controlIdentifier}`);

        return (
            <Snippet>
                DcsBios::EasyMode::AnalogMultiPos {methodName}(
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;
                {`"${controlIdentifier}"`}
                {', // DCS-BIOS Control\n    '}
                <Variable>PIN</Variable>
                {',                      // Analog pin connected to the resistor ladder\n    '}
                <Variable>STEPS</Variable>
                {'                    // Number of switch positions\n);'}
            </Snippet>
        );
    }
}
