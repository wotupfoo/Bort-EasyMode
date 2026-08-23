import { Box } from '@mui/material';
import { Component, ReactNode } from 'react';

import Snippet from '../Snippet';
import SnippetFeatureRow from '../SnippetFeatureRow/SnippetFeatureRow';

export interface FeatureSnippetProps {
    features: string[];
    children: ReactNode;
}

export default class FeatureSnippet extends Component<FeatureSnippetProps> {
    public render(): ReactNode {
        const { features, children } = this.props;

        return (
            <Box
                sx={{
                    borderTop: theme => `1px solid ${theme.palette.divider}`,
                    marginTop: 1.25,
                    paddingTop: 0.75,
                }}
            >
                <SnippetFeatureRow features={features} />
                <Snippet>{children}</Snippet>
            </Box>
        );
    }
}
