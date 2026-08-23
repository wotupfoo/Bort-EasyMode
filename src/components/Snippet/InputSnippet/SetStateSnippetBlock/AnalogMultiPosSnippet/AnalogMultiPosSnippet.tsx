import { Component, ReactNode } from 'react';

import FeatureSnippet from '../../../FeatureSnippet/FeatureSnippet';
import Snippet from '../../../Snippet';
import Variable from '../../../Variable/Variable';

export interface AnalogMultiPosSnippetProps {
    controlIdentifier: string;
    maxValue: number;
}

export default class AnalogMultiPosSnippet extends Component<AnalogMultiPosSnippetProps> {
    public render(): ReactNode {
        const { controlIdentifier, maxValue } = this.props;
        const methodName = Snippet.snakeToCamelCase(`${controlIdentifier}`);

        return (
            <FeatureSnippet
                features={[
                    'DCS synchronization with periodic refresh',
                    'Bootup Calibration Mode support',
                    'Input smoothing',
                ]}
            >
                DcsBios::EasyMode::AnalogMultiPos {methodName}(
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;
                {`"${controlIdentifier}"`}
                {', // DCS-BIOS Control\n    '}
                <Variable>PIN</Variable>
                {',                      // Analog pin connected to the resistor ladder\n    '}
                {maxValue}
                {',                        // Highest switch state, e.g. 1 for a two-position control\n    '}
                <Variable>3</Variable>
                {',                        // ADC boundary hysteresis in counts\n    '}
                <Variable>false</Variable>
                {'                    // Fast polling, true uses 50 ms instead of 750 ms\n);'}
            </FeatureSnippet>
        );
    }
}
