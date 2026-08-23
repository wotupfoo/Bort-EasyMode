import { Component, ReactNode } from 'react';

import FeatureSnippet from '../../../FeatureSnippet/FeatureSnippet';
import Snippet from '../../../Snippet';
import Variable from '../../../Variable/Variable';

export interface PotentiometerSnippetProps {
    controlIdentifier: string;
}

export default class PotentiometerSnippet extends Component<PotentiometerSnippetProps> {
    public render(): ReactNode {
        const { controlIdentifier } = this.props;
        const methodName = Snippet.snakeToCamelCase(`${controlIdentifier}`);

        return (
            <FeatureSnippet
                features={[
                    'DCS synchronization with periodic refresh',
                    'Bootup Calibration Mode support',
                    'Input smoothing',
                ]}
            >
                DcsBios::EasyMode::Potentiometer {methodName}(
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;
                {`"${controlIdentifier}"`}
                {', // DCS-BIOS Control\n    '}
                <Variable>PIN</Variable>
                {',                      // Analog pin connected to the potentiometer wiper\n    '}
                <Variable>false</Variable>
                {',                    // Reverse direction (true or false)\n    '}
                <Variable>2</Variable>
                {'                         // Raw ADC hysteresis in counts\n);'}
            </FeatureSnippet>
        );
    }
}
