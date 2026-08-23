import { Component, ReactNode } from 'react';

import FeatureSnippet from '../../../FeatureSnippet/FeatureSnippet';
import Snippet from '../../../Snippet';
import Variable from '../../../Variable/Variable';
import { IntegerSnippetProps } from '../IntegerSnippetProps';

export default class EasyStepperContinuousSnippet extends Component<IntegerSnippetProps> {
    public render(): ReactNode {
        const { controlIdentifier, output, useAddressConstants } = this.props;
        const methodName = Snippet.snakeToCamelCase(controlIdentifier);
        const usePackedIdentifier = useAddressConstants && !!output.address_mask_shift_identifier;

        return (
            <FeatureSnippet
                features={['Generic stepper motor support', 'Stepper homing', 'Stepper 360\u00b0 wrapping support']}
            >
                {'const long STEPS_PER_OUTPUT_REVOLUTION = 200;\n'}
                DcsBios::EasyMode::Stepper {methodName}(
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;
                {usePackedIdentifier ? (
                    <>
                        {output.address_mask_shift_identifier}
                        {', // DCS-BIOS Channel\n    '}
                    </>
                ) : (
                    <>
                        {Snippet.toHex(output.address)}
                        {', // DCS World: memory address with the value\n    '}
                        {Snippet.toHex(output.mask)}
                        {', // Bit mask for packed integer fields\n    '}
                        {output.shift_by}
                        {', // Right shift for packed integer fields\n    '}
                    </>
                )}
                <Variable>PIN1</Variable>
                {',                      // Stepper driver input pin 1\n    '}
                <Variable>PIN2</Variable>
                {',                      // Stepper driver input pin 2\n    '}
                <Variable>PIN3</Variable>
                {',                      // Stepper driver input pin 3\n    '}
                <Variable>PIN4</Variable>
                {',                      // Stepper driver input pin 4\n    '}
                <Variable>STEPS_PER_OUTPUT_REVOLUTION</Variable>
                {', // Stepper steps per output shaft revolution after any gearing\n    '}
                <Variable>ZEROPIN</Variable>
                {',                   // Zero angle detection input pin\n    '}LOW
                {'                       // ZEROPIN active state\n);\n'}
                {methodName}
                {'.setInputMaxValue('}
                {output.max_value}
                {');\n'}
                {methodName}
                {'.configureContinuousBehavior(true, true, true);'}
            </FeatureSnippet>
        );
    }
}

