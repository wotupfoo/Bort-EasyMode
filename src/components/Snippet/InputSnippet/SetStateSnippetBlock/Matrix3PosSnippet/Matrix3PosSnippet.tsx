import { Component, ReactNode } from 'react';

import Snippet from '../../../Snippet';
import Variable from '../../../Variable/Variable';

export interface Matrix2PosSnippetProps {
    controlIdentifier: string;
}

export default class Matrix3PosSnippet extends Component<Matrix2PosSnippetProps> {
    public render(): ReactNode {
        const { controlIdentifier } = this.props;
        const methodName = Snippet.snakeToCamelCase(`${controlIdentifier}`);

        return (
            <Snippet>
                DcsBios::EasyMode::Matrix3Pos {methodName}(
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;
                {`"${controlIdentifier}"`}
                {', // DCS-BIOS Control\n    '}
                <Variable>ROW_A</Variable>
                {',                    // Matrix row pin for position A\n    '}
                <Variable>COL_A</Variable>
                {',                    // Matrix column pin for position A\n    '}
                <Variable>ROW_B</Variable>
                {',                    // Matrix row pin for position B\n    '}
                <Variable>COL_B</Variable>
                {'                    // Matrix column pin for position B\n);'}
            </Snippet>
        );
    }
}
