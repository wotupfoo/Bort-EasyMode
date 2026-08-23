import { Box, Typography } from '@mui/material';
import { Component, ReactNode } from 'react';

export interface SnippetGroupHeadingProps {
    title: string;
    children: string;
}

export default class SnippetGroupHeading extends Component<SnippetGroupHeadingProps> {
    public render(): ReactNode {
        return (
            <Box sx={{ marginTop: '1rem', marginBottom: '-0.25rem' }}>
                <Typography variant={'subtitle1'} sx={{ fontWeight: theme => theme.typography.fontWeightBold }}>
                    {this.props.title}
                </Typography>
                <Typography variant={'body2'} color={'text.secondary'}>
                    {this.props.children}
                </Typography>
            </Box>
        );
    }
}
