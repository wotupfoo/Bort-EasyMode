import { Component, ReactNode } from 'react';

import OutputSnippetBlock from '../OutputSnippetBlock';
import EasyServoSnippet from './EasyServoSnippet/EasyServoSnippet';
import EasyServoSg90Snippet from './EasyServoSg90Snippet/EasyServoSg90Snippet';
import EasyStepperBoundedSnippet from './EasyStepperBoundedSnippet/EasyStepperBoundedSnippet';
import EasyStepper28Byj48BoundedSnippet from './EasyStepper28Byj48BoundedSnippet/EasyStepper28Byj48BoundedSnippet';
import EasyStepper28Byj48ContinuousSnippet from './EasyStepper28Byj48ContinuousSnippet/EasyStepper28Byj48ContinuousSnippet';
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
            showEasyModeData,
            showEasyServoData,
            showEasyServoSg90Data,
            showEasyStepperData,
            showEasyStepper28Byj48Data,
            useAddressConstants,
        } = this.props;
        yield (
            <IntegerBufferSnippet
                moduleName={moduleName}
                controlIdentifier={controlIdentifier}
                output={output}
                showEasyModeData={showEasyModeData}
                showEasyServoData={showEasyServoData}
                showEasyServoSg90Data={showEasyServoSg90Data}
                showEasyStepperData={showEasyStepperData}
                showEasyStepper28Byj48Data={showEasyStepper28Byj48Data}
                useAddressConstants={useAddressConstants}
                key={'integer-buffer-snippet'}
            />
        );

        if (output.max_value == 1) {
            yield (
                <LedSnippet
                    moduleName={moduleName}
                    controlIdentifier={controlIdentifier}
                    output={output}
                    showEasyModeData={showEasyModeData}
                    showEasyServoData={showEasyServoData}
                    showEasyServoSg90Data={showEasyServoSg90Data}
                    showEasyStepperData={showEasyStepperData}
                    showEasyStepper28Byj48Data={showEasyStepper28Byj48Data}
                    useAddressConstants={useAddressConstants}
                    key={'led-snippet'}
                />
            );
        } else if (output.max_value == 65535) {
            yield (
                <ServoSnippet
                    moduleName={moduleName}
                    controlIdentifier={controlIdentifier}
                    output={output}
                    showEasyModeData={showEasyModeData}
                    showEasyServoData={showEasyServoData}
                    showEasyServoSg90Data={showEasyServoSg90Data}
                    showEasyStepperData={showEasyStepperData}
                    showEasyStepper28Byj48Data={showEasyStepper28Byj48Data}
                    useAddressConstants={useAddressConstants}
                    key={'servo-snippet'}
                />
            );
        }

        if (showEasyModeData && moduleName === 'CommonData' && controlIdentifier === 'ALT_MSL_FT') {
            if (showEasyServoData) {
                yield (
                    <EasyServoSnippet
                        moduleName={moduleName}
                        controlIdentifier={controlIdentifier}
                        output={output}
                        showEasyModeData={showEasyModeData}
                        showEasyServoData={showEasyServoData}
                        showEasyServoSg90Data={showEasyServoSg90Data}
                        showEasyStepperData={showEasyStepperData}
                        showEasyStepper28Byj48Data={showEasyStepper28Byj48Data}
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
                        showEasyModeData={showEasyModeData}
                        showEasyServoData={showEasyServoData}
                        showEasyServoSg90Data={showEasyServoSg90Data}
                        showEasyStepperData={showEasyStepperData}
                        showEasyStepper28Byj48Data={showEasyStepper28Byj48Data}
                        useAddressConstants={useAddressConstants}
                        key={'easy-stepper-bounded-snippet'}
                    />
                );
            }
            if (showEasyServoSg90Data) {
                yield (
                    <EasyServoSg90Snippet
                        moduleName={moduleName}
                        controlIdentifier={controlIdentifier}
                        output={output}
                        showEasyModeData={showEasyModeData}
                        showEasyServoData={showEasyServoData}
                        showEasyServoSg90Data={showEasyServoSg90Data}
                        showEasyStepperData={showEasyStepperData}
                        showEasyStepper28Byj48Data={showEasyStepper28Byj48Data}
                        useAddressConstants={useAddressConstants}
                        key={'easy-servo-sg90-snippet'}
                    />
                );
            }
            if (showEasyStepper28Byj48Data) {
                yield (
                    <EasyStepper28Byj48BoundedSnippet
                        moduleName={moduleName}
                        controlIdentifier={controlIdentifier}
                        output={output}
                        showEasyModeData={showEasyModeData}
                        showEasyServoData={showEasyServoData}
                        showEasyServoSg90Data={showEasyServoSg90Data}
                        showEasyStepperData={showEasyStepperData}
                        showEasyStepper28Byj48Data={showEasyStepper28Byj48Data}
                        useAddressConstants={useAddressConstants}
                        key={'easy-stepper-28byj48-bounded-snippet'}
                    />
                );
            }
        }

        if (showEasyModeData && moduleName === 'CommonData' && controlIdentifier === 'HDG_DEG') {
            if (showEasyStepperData) {
                yield (
                    <EasyStepperContinuousSnippet
                        moduleName={moduleName}
                        controlIdentifier={controlIdentifier}
                        output={output}
                        showEasyModeData={showEasyModeData}
                        showEasyServoData={showEasyServoData}
                        showEasyServoSg90Data={showEasyServoSg90Data}
                        showEasyStepperData={showEasyStepperData}
                        showEasyStepper28Byj48Data={showEasyStepper28Byj48Data}
                        useAddressConstants={useAddressConstants}
                        key={'easy-stepper-continuous-snippet'}
                    />
                );
            }
            if (showEasyStepper28Byj48Data) {
                yield (
                    <EasyStepper28Byj48ContinuousSnippet
                        moduleName={moduleName}
                        controlIdentifier={controlIdentifier}
                        output={output}
                        showEasyModeData={showEasyModeData}
                        showEasyServoData={showEasyServoData}
                        showEasyServoSg90Data={showEasyServoSg90Data}
                        showEasyStepperData={showEasyStepperData}
                        showEasyStepper28Byj48Data={showEasyStepper28Byj48Data}
                        useAddressConstants={useAddressConstants}
                        key={'easy-stepper-28byj48-continuous-snippet'}
                    />
                );
            }
        }
    }

    public render(): ReactNode {
        const { output } = this.props;

        return <OutputSnippetBlock output={output}>{[...this.snippetsForInput()]}</OutputSnippetBlock>;
    }
}
