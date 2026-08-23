import { Stack, Typography } from '@mui/material';
import React, { Component, ReactNode } from 'react';

import CategoryItem from '../../@types/Category';
import Control from '../Control/Control';

export interface CategoryProps {
    moduleName: string;
    categoryName: string;
    category: CategoryItem;
    focusedComponent?: string;
    focusedRef?: React.RefObject<HTMLDivElement>;
    showLiveData: boolean;
    ioFilterMode: string;
    scaffoldingMode: string;
    showEasyServoData: boolean;
    showEasyServoSg90Data: boolean;
    showEasyStepperData: boolean;
    showEasyStepper28Byj48Data: boolean;
    showAdvancedCodeSnippets: boolean;
    useAddressConstants: boolean;
}

export default class Category extends Component<CategoryProps> {
    public constructor(props: CategoryProps) {
        super(props);
    }

    public render(): ReactNode {
        const {
            moduleName,
            categoryName,
            category,
            focusedComponent,
            focusedRef,
            showLiveData,
            ioFilterMode,
            scaffoldingMode,
            showEasyServoData,
            showEasyServoSg90Data,
            showEasyStepperData,
            showEasyStepper28Byj48Data,
            showAdvancedCodeSnippets,
            useAddressConstants,
        } = this.props;
        const filteredControls = Object.entries(category)
            .filter(([, control]) => {
                if (ioFilterMode === 'inputs') {
                    return control.inputs.length > 0;
                }

                if (ioFilterMode === 'outputs') {
                    return control.outputs.length > 0;
                }

                return true;
            })
            .sort((e1, e2) => e1[0].localeCompare(e2[0]));

        return (
            <Stack spacing={2} className="category">
                <Typography variant={'h2'}>{categoryName}</Typography>
                {filteredControls.map((e, i) => (
                    <div key={i} ref={focusedComponent === e[1].identifier ? focusedRef : undefined}>
                        <Control
                            moduleName={moduleName}
                            control={e[1]}
                            key={e[1].identifier}
                            showLiveData={showLiveData}
                            ioFilterMode={ioFilterMode}
                            scaffoldingMode={scaffoldingMode}
                            showEasyServoData={showEasyServoData}
                            showEasyServoSg90Data={showEasyServoSg90Data}
                            showEasyStepperData={showEasyStepperData}
                            showEasyStepper28Byj48Data={showEasyStepper28Byj48Data}
                            showAdvancedCodeSnippets={showAdvancedCodeSnippets}
                            useAddressConstants={useAddressConstants}
                        />
                    </div>
                ))}
            </Stack>
        );
    }
}
