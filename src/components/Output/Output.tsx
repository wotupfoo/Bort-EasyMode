import { Chip, Divider, Grid, Typography } from '@mui/material';
import { Component, ReactNode } from 'react';

import OutputItem from '../../@types/Output';
import { OutputType } from '../../@types/OutputType';
import IntegerSnippetBlock from '../Snippet/OutputSnippet/IntegerSnippetBlock/IntegerSnippetBlock';
import StringSnippetBlock from '../Snippet/OutputSnippet/StringSnippetBlock/StringSnippetBlock';
import IntegerOutput from './Integer/IntegerOutput';
import StringOutput from './String/StringOutput';

export interface OutputProps {
    moduleName: string;
    identifier: string;
    output: OutputItem;
    showLiveData: boolean;
    showArduinoData: boolean;
    showEasyServoData: boolean;
    showEasyServoSg90Data: boolean;
    showEasyStepperData: boolean;
    showEasyStepper28Byj48Data: boolean;
    showAdvancedCodeSnippets: boolean;
    useAddressConstants: boolean;
    onIntegerUpdate: (v: number) => void;
    color?: string;
}

export default class Output extends Component<OutputProps> {
    public constructor(props: OutputProps) {
        super(props);
        this.controlForInterface = this.controlForInterface.bind(this);
        this.snippetForInterface = this.snippetForInterface.bind(this);
    }

    private controlForInterface(): ReactNode {
        const { output } = this.props;

        switch (output.type) {
            case OutputType.INTEGER:
                return (
                    <IntegerOutput
                        address={output.address}
                        mask={output.mask!}
                        maxValue={output.max_value!}
                        shiftBy={output.shift_by!}
                        onValueChanged={this.props.onIntegerUpdate}
                    />
                );
            case OutputType.STRING:
                return <StringOutput address={output.address} maxLength={output.max_length!} />;
        }
        console.error('no matching output!');
    }

    private snippetForInterface(): ReactNode {
        const {
            moduleName,
            identifier,
            output,
            showEasyServoData,
            showEasyServoSg90Data,
            showEasyStepperData,
            showEasyStepper28Byj48Data,
            showAdvancedCodeSnippets,
            useAddressConstants,
        } = this.props;
        switch (output.type) {
            case OutputType.INTEGER:
                return (
                    <IntegerSnippetBlock
                        moduleName={moduleName}
                        controlIdentifier={identifier}
                        output={output}
                        showEasyServoData={showEasyServoData}
                        showEasyServoSg90Data={showEasyServoSg90Data}
                        showEasyStepperData={showEasyStepperData}
                        showEasyStepper28Byj48Data={showEasyStepper28Byj48Data}
                        showAdvancedCodeSnippets={showAdvancedCodeSnippets}
                        useAddressConstants={useAddressConstants}
                    />
                );
            case OutputType.STRING:
                return (
                    <StringSnippetBlock
                        controlIdentifier={identifier}
                        output={output}
                        showAdvancedCodeSnippets={showAdvancedCodeSnippets}
                        useAddressConstants={useAddressConstants}
                    />
                );
        }

        console.error('no snippet!');

        return <></>;
    }

    public render(): ReactNode {
        const { output, showLiveData, showArduinoData, color } = this.props;
        return (
            <Grid
                container
                item
                columnSpacing={2}
                rowSpacing={1}
                sx={{ marginTop: '.1rem', marginBottom: '1rem', alignItems: 'center' }}
                className={'input'}
            >
                <Grid
                    item
                    xs={2}
                    sx={{
                        fontWeight: theme => theme.typography.fontWeightBold,
                    }}
                    className={'right-align'}
                >
                    <Typography variant={'h6'} component={'h5'}>
                        Type:
                    </Typography>
                </Grid>
                <Grid item xs={color === undefined ? 10 : 4} lg={2}>
                    <Typography>{output.type}</Typography>
                </Grid>
                {color !== undefined && (
                    <>
                        <Grid
                            item
                            xs={2}
                            sx={{
                                fontWeight: theme => theme.typography.fontWeightBold,
                            }}
                            className={'right-align'}
                        >
                            <Typography variant={'h6'} component={'h5'}>
                                Color:
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Chip label={color} variant={'outlined'} />
                        </Grid>
                    </>
                )}
                {showLiveData ? (
                    <>
                        <Grid item xs={2} className={'right-align'}>
                            <Typography
                                variant={'body1'}
                                component={'h6'}
                                sx={{
                                    fontWeight: theme => theme.typography.fontWeightBold,
                                }}
                            >
                                Current Value:
                            </Typography>
                        </Grid>
                        <Grid container item xs={10} lg={6}>
                            {this.controlForInterface()}
                        </Grid>
                    </>
                ) : (
                    <></>
                )}
                {showLiveData && showArduinoData ? (
                    <Grid item xs={12}>
                        <Divider sx={{ margin: '0.5rem 0' }} />
                    </Grid>
                ) : (
                    <></>
                )}
                {showArduinoData ? (
                    <Grid container item xs={12}>
                        {this.snippetForInterface()}
                    </Grid>
                ) : (
                    <></>
                )}
            </Grid>
        );
    }
}
