import { Component, ReactNode } from 'react';

import OutputSnippetBlock from '../OutputSnippetBlock';
import EasyServoSg90Snippet from './EasyServoSg90Snippet/EasyServoSg90Snippet';
import EasyServoSnippet from './EasyServoSnippet/EasyServoSnippet';
import EasyStepper28Byj48BoundedSnippet from './EasyStepper28Byj48BoundedSnippet/EasyStepper28Byj48BoundedSnippet';
import EasyStepper28Byj48ContinuousSnippet from './EasyStepper28Byj48ContinuousSnippet/EasyStepper28Byj48ContinuousSnippet';
import EasyStepperBoundedSnippet from './EasyStepperBoundedSnippet/EasyStepperBoundedSnippet';
import EasyStepperContinuousSnippet from './EasyStepperContinuousSnippet/EasyStepperContinuousSnippet';
import IntegerBufferSnippet from './IntegerBufferSnippet/IntegerBufferSnippet';
import { IntegerSnippetProps } from './IntegerSnippetProps';
import LedSnippet from './LedSnippet/LedSnippet';
import ServoSnippet from './ServoSnippet/ServoSnippet';

export default class IntegerSnippetBlock extends Component<IntegerSnippetProps> {
    constructor(props: IntegerSnippetProps) {
        super(props);

        this.snippetsForInput = this.snippetsForInput.bind(this);
    }

    private *snippetsForInput(): Iterable<ReactNode> {
        const {
            moduleName,
            controlIdentifier,
            output,
            showEasyServoData,
            showEasyServoSg90Data,
            showEasyStepperData,
            showEasyStepper28Byj48Data,
            showAdvancedCodeSnippets,
            useAddressConstants,
        } = this.props;

        if (output.max_value == 1) {
            // On/Off
            yield (
                <LedSnippet
                    moduleName={moduleName}
                    controlIdentifier={controlIdentifier}
                    output={output}
                    showEasyServoData={showEasyServoData}
                    showEasyServoSg90Data={showEasyServoSg90Data}
                    showEasyStepperData={showEasyStepperData}
                    showEasyStepper28Byj48Data={showEasyStepper28Byj48Data}
                    showAdvancedCodeSnippets={showAdvancedCodeSnippets}
                    useAddressConstants={useAddressConstants}
                    key={'led-snippet'}
                />
            );
        } else if (output.max_value == 65535) {
            // Full-range 16-bit input. This can still drive bounded hardware such as servos.
            if (showEasyServoSg90Data) {
                yield (
                    <EasyServoSg90Snippet
                        moduleName={moduleName}
                        controlIdentifier={controlIdentifier}
                        output={output}
                        showEasyServoData={showEasyServoData}
                        showEasyServoSg90Data={showEasyServoSg90Data}
                        showEasyStepperData={showEasyStepperData}
                        showEasyStepper28Byj48Data={showEasyStepper28Byj48Data}
                        showAdvancedCodeSnippets={showAdvancedCodeSnippets}
                        useAddressConstants={useAddressConstants}
                        key={'easy-servo-sg90-snippet'}
                    />
                );
            }
            if (showEasyServoData) {
                yield (
                    <EasyServoSnippet
                        moduleName={moduleName}
                        controlIdentifier={controlIdentifier}
                        output={output}
                        showEasyServoData={showEasyServoData}
                        showEasyServoSg90Data={showEasyServoSg90Data}
                        showEasyStepperData={showEasyStepperData}
                        showEasyStepper28Byj48Data={showEasyStepper28Byj48Data}
                        showAdvancedCodeSnippets={showAdvancedCodeSnippets}
                        useAddressConstants={useAddressConstants}
                        key={'easy-servo-snippet'}
                    />
                );
            }
            if (showEasyStepperData) {
                yield (
                    <EasyStepperBoundedSnippet
                        moduleName={moduleName}
                        controlIdentifier={controlIdentifier}
                        output={output}
                        showEasyServoData={showEasyServoData}
                        showEasyServoSg90Data={showEasyServoSg90Data}
                        showEasyStepperData={showEasyStepperData}
                        showEasyStepper28Byj48Data={showEasyStepper28Byj48Data}
                        showAdvancedCodeSnippets={showAdvancedCodeSnippets}
                        useAddressConstants={useAddressConstants}
                        key={'easy-stepper-bounded-snippet'}
                    />
                );
            }
            if (showEasyStepper28Byj48Data) {
                yield (
                    <EasyStepper28Byj48BoundedSnippet
                        moduleName={moduleName}
                        controlIdentifier={controlIdentifier}
                        output={output}
                        showEasyServoData={showEasyServoData}
                        showEasyServoSg90Data={showEasyServoSg90Data}
                        showEasyStepperData={showEasyStepperData}
                        showEasyStepper28Byj48Data={showEasyStepper28Byj48Data}
                        showAdvancedCodeSnippets={showAdvancedCodeSnippets}
                        useAddressConstants={useAddressConstants}
                        key={'easy-stepper-28byj48-bounded-snippet'}
                    />
                );
            }
            yield (
                <ServoSnippet
                    moduleName={moduleName}
                    controlIdentifier={controlIdentifier}
                    output={output}
                    showEasyServoData={showEasyServoData}
                    showEasyServoSg90Data={showEasyServoSg90Data}
                    showEasyStepperData={showEasyStepperData}
                    showEasyStepper28Byj48Data={showEasyStepper28Byj48Data}
                    showAdvancedCodeSnippets={showAdvancedCodeSnippets}
                    useAddressConstants={useAddressConstants}
                    key={'servo-snippet'}
                />
            );
        } else {
            // Bounded angle-like telemetry. eg Compass output.max_value == 360
            if (showEasyServoSg90Data) {
                yield (
                    <EasyServoSg90Snippet
                        moduleName={moduleName}
                        controlIdentifier={controlIdentifier}
                        output={output}
                        showEasyServoData={showEasyServoData}
                        showEasyServoSg90Data={showEasyServoSg90Data}
                        showEasyStepperData={showEasyStepperData}
                        showEasyStepper28Byj48Data={showEasyStepper28Byj48Data}
                        showAdvancedCodeSnippets={showAdvancedCodeSnippets}
                        useAddressConstants={useAddressConstants}
                        key={'easy-servo-sg90-snippet'}
                    />
                );
            }
            if (showEasyServoData) {
                yield (
                    <EasyServoSnippet
                        moduleName={moduleName}
                        controlIdentifier={controlIdentifier}
                        output={output}
                        showEasyServoData={showEasyServoData}
                        showEasyServoSg90Data={showEasyServoSg90Data}
                        showEasyStepperData={showEasyStepperData}
                        showEasyStepper28Byj48Data={showEasyStepper28Byj48Data}
                        showAdvancedCodeSnippets={showAdvancedCodeSnippets}
                        useAddressConstants={useAddressConstants}
                        key={'easy-servo-snippet'}
                    />
                );
            }
            if (showEasyStepper28Byj48Data) {
                yield (
                    <EasyStepper28Byj48ContinuousSnippet
                        moduleName={moduleName}
                        controlIdentifier={controlIdentifier}
                        output={output}
                        showEasyServoData={showEasyServoData}
                        showEasyServoSg90Data={showEasyServoSg90Data}
                        showEasyStepperData={showEasyStepperData}
                        showEasyStepper28Byj48Data={showEasyStepper28Byj48Data}
                        showAdvancedCodeSnippets={showAdvancedCodeSnippets}
                        useAddressConstants={useAddressConstants}
                        key={'easy-stepper-28byj48-continuous-snippet'}
                    />
                );
            }
            if (showEasyStepperData) {
                yield (
                    <EasyStepperContinuousSnippet
                        moduleName={moduleName}
                        controlIdentifier={controlIdentifier}
                        output={output}
                        showEasyServoData={showEasyServoData}
                        showEasyServoSg90Data={showEasyServoSg90Data}
                        showEasyStepperData={showEasyStepperData}
                        showEasyStepper28Byj48Data={showEasyStepper28Byj48Data}
                        showAdvancedCodeSnippets={showAdvancedCodeSnippets}
                        useAddressConstants={useAddressConstants}
                        key={'easy-stepper-continuous-snippet'}
                    />
                );
            }
            // DCS-BIOS Servo
            yield (
                <ServoSnippet
                    moduleName={moduleName}
                    controlIdentifier={controlIdentifier}
                    output={output}
                    showEasyServoData={showEasyServoData}
                    showEasyServoSg90Data={showEasyServoSg90Data}
                    showEasyStepperData={showEasyStepperData}
                    showEasyStepper28Byj48Data={showEasyStepper28Byj48Data}
                    showAdvancedCodeSnippets={showAdvancedCodeSnippets}
                    useAddressConstants={useAddressConstants}
                    key={'servo-snippet'}
                />
            );

        }

        // Advanced code snippet
        if (showAdvancedCodeSnippets) {
            yield (
                <IntegerBufferSnippet
                    moduleName={moduleName}
                    controlIdentifier={controlIdentifier}
                    output={output}
                    showEasyServoData={showEasyServoData}
                    showEasyServoSg90Data={showEasyServoSg90Data}
                    showEasyStepperData={showEasyStepperData}
                    showEasyStepper28Byj48Data={showEasyStepper28Byj48Data}
                    showAdvancedCodeSnippets={showAdvancedCodeSnippets}
                    useAddressConstants={useAddressConstants}
                    key={'integer-buffer-snippet'}
                />
            );
        }
    }

    public render(): ReactNode {
        const { output } = this.props;

        return (
            <OutputSnippetBlock output={output} useAddressConstants={this.props.useAddressConstants}>
                {[...this.snippetsForInput()]}
            </OutputSnippetBlock>
        );
    }
}
