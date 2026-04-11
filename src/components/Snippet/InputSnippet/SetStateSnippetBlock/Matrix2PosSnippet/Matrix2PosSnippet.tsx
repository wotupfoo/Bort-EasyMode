import { Component, ReactNode } from 'react';

import Snippet from '../../../Snippet';
import Variable from '../../../Variable/Variable';

export interface Matrix2PosSnippetProps {
    controlIdentifier: string;
}

export default class Matrix2PosSnippet extends Component<Matrix2PosSnippetProps> {
    public render(): ReactNode {
        const { controlIdentifier } = this.props;
        const methodName = Snippet.snakeToCamelCase(`${controlIdentifier}`);

        return (
            <Snippet>
                DcsBios::EasyMode::Matrix2Pos {methodName}(
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;
                {`"${controlIdentifier}"`}
                {', // DCS-BIOS Control\n    '}
                <Variable>ROW</Variable>
                {',                      // Matrix row pin\n    '}
                <Variable>COL</Variable>
                {'                      // Matrix column pin\n);'}
            </Snippet>
        );
    }
}
