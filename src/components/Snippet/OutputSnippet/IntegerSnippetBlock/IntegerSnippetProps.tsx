import Output from '../../../../@types/Output';

export interface IntegerSnippetProps {
    moduleName: string;
    controlIdentifier: string;
    output: Output;
    showEasyServoData: boolean;
    showEasyServoSg90Data: boolean;
    showEasyStepperData: boolean;
    showEasyStepper28Byj48Data: boolean;
    showAdvancedCodeSnippets: boolean;
    useAddressConstants: boolean;
}
