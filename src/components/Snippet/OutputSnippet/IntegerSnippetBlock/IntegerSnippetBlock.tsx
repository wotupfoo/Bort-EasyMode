import { Component, ReactNode } from 'react';

import SnippetGroupHeading from '../../SnippetGroupHeading/SnippetGroupHeading';
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
            scaffoldingMode,
        } = this.props;
        const showEasyMode = scaffoldingMode === 'easymode' || scaffoldingMode === 'both';
        const showPassThrough = scaffoldingMode === 'passthrough' || scaffoldingMode === 'both';
        const hasEasyModeSnippets =
            showEasyMode &&
            output.max_value != 1 &&
            (showEasyServoData || showEasyServoSg90Data || showEasyStepperData || showEasyStepper28Byj48Data);
        let showedPassThroughHeading = false;

        if (hasEasyModeSnippets) {
            yield (
                <SnippetGroupHeading key={'easymode-heading'} title={'DCS-BIOS EasyMode Snippets'}>
                    Recommended for EasyMode sketches. Includes easier to use devices, with real-world parameters and
                    additional EasyMode features.
                </SnippetGroupHeading>
            );
        }

        if (showEasyMode && output.max_value == 65535) {
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
        } else if (showEasyMode && output.max_value != 1) {
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
        }

        if (showPassThrough) {
            showedPassThroughHeading = true;
            yield (
                <SnippetGroupHeading key={'pass-through-heading'} title={'DCS-BIOS Pass-Through Snippets'}>
                    Lower-level snippets that expose the original DCS-BIOS inputs and outputs. Use these when they work
                    great already and you don't need any of the new features the EasyMode snippets give you.
                </SnippetGroupHeading>
            );
            if (output.max_value == 1) {
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
            } else {
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
        }

        if (showPassThrough && showAdvancedCodeSnippets) {
            if (!showedPassThroughHeading) {
                yield (
                    <SnippetGroupHeading key={'pass-through-heading'} title={'DCS-BIOS Pass-Through Snippets'}>
                        Lower-level snippets that expose the original DCS-BIOS inputs and outputs. Use these when they
                        work great already and you don't need any of the new features the EasyMode snippets give you.
                    </SnippetGroupHeading>
                );
            }
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
