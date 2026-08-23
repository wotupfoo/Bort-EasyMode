import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';
import { Component, ReactNode } from 'react';

export interface SnippetFeatureRowProps {
    features: string[];
}

export default class SnippetFeatureRow extends Component<SnippetFeatureRowProps> {
    public render(): ReactNode {
        const { features } = this.props;

        if (features.length === 0) {
            return null;
        }

        return (
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    columnGap: 2,
                    rowGap: 0.25,
                    marginTop: 0.25,
                    marginBottom: 0.5,
                    '& .MuiFormControlLabel-root': { marginLeft: 0, marginRight: 0 },
                    '& .MuiFormControlLabel-label': { fontSize: '0.875rem' },
                }}
            >
                {features.map(feature => (
                    <FormControlLabel
                        key={feature}
                        control={<Checkbox checked disabled size="small" sx={{ padding: '2px 4px 2px 0' }} />}
                        label={<Typography variant={'body2'}>{feature}</Typography>}
                    />
                ))}
            </Box>
        );
    }
}
