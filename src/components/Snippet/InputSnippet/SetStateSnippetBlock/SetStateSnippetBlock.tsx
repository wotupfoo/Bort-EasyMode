import { Component, ReactNode } from 'react';

import Input from '../../../../@types/Input';
import SnippetGroupHeading from '../../SnippetGroupHeading/SnippetGroupHeading';
import InputSnippetBlock from '../InputSnippetBlock';
import AnalogMultiPosSnippet from './AnalogMultiPosSnippet/AnalogMultiPosSnippet';
import Matrix2PosSnippet from './Matrix2PosSnippet/Matrix2PosSnippet';
import Matrix3PosSnippet from './Matrix3PosSnippet/Matrix3PosSnippet';
import PotentiometerSnippet from './PotentiometerSnippet/PotentiometerSnippet';
import Switch2PosSnippet from './Switch2PosSnippet/Switch2PosSnippet';
import Switch3PosSnippet from './Switch3PosSnippet/Switch3PosSnippet';
import SwitchMultiPosSnippet from './SwitchMultiPosSnippet/SwitchMultiPosSnippet';

export interface SetStateSnippetBlockProps {
    controlIdentifier: string;
    input: Input;
    scaffoldingMode: string;
}

export default class SetStateSnippetBlock extends Component<SetStateSnippetBlockProps> {
    constructor(props: SetStateSnippetBlockProps) {
        super(props);

        this.easyModeSnippetsForInput = this.easyModeSnippetsForInput.bind(this);
    }

    private *easyModeSnippetsForInput(): Iterable<ReactNode> {
        const { controlIdentifier, input } = this.props;
        const maxValue = input.max_value!;

        if (maxValue < 33) {
            yield <SwitchMultiPosSnippet controlIdentifier={controlIdentifier} maxValue={maxValue} />;

            if (maxValue == 1) {
                yield <Switch2PosSnippet controlIdentifier={controlIdentifier} />;
                yield <Matrix2PosSnippet controlIdentifier={controlIdentifier} />;
            } else if (maxValue == 2) {
                yield <Switch3PosSnippet controlIdentifier={controlIdentifier} />;
                yield <Matrix3PosSnippet controlIdentifier={controlIdentifier} />;
            }
        }

        if (maxValue <= 20) {
            yield <AnalogMultiPosSnippet controlIdentifier={controlIdentifier} maxValue={maxValue} />;
        } else if (maxValue == 65535) {
            yield <PotentiometerSnippet controlIdentifier={controlIdentifier} />;
        }
    }

    public render(): ReactNode {
        const { controlIdentifier, input, scaffoldingMode } = this.props;
        const message = `${controlIdentifier} <new_value>`;
        const easyModeSnippets = [...this.easyModeSnippetsForInput()];
        const showEasyMode = scaffoldingMode === 'easymode' || scaffoldingMode === 'both';

        return (
            <InputSnippetBlock message={message} input={input}>
                {showEasyMode && easyModeSnippets.length > 0 ? (
                    <>
                        <SnippetGroupHeading title={'DCS-BIOS EasyMode Snippets'}>
                            Recommended for EasyMode sketches. Includes easier to use devices, with real-world
                            parameters and additional EasyMode features.
                        </SnippetGroupHeading>
                        {easyModeSnippets}
                    </>
                ) : null}
            </InputSnippetBlock>
        );
    }
}
