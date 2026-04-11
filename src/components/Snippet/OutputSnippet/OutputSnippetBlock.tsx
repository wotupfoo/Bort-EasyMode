import { Divider } from '@mui/material';
import { Component, ReactNode } from 'react';

import Output from '../../../@types/Output';
import Snippet from '../Snippet';
import SnippetContainer from '../SnippetContainer/SnippetContainer';
import SnippetContainerHeaderItem from '../SnippetContainer/SnippetContainerHeader/SnippetContainerHeaderItem/SnippetContainerHeaderItem';

export interface OutputSnippetBlockProps {
    output: Output;
    useAddressConstants?: boolean;
    children: ReactNode;
}

export default class OutputSnippetBlock extends Component<OutputSnippetBlockProps> {
    constructor(props: OutputSnippetBlockProps) {
        super(props);

        this.headerText = this.headerText.bind(this);
    }

    private getChannelIdentifier(): string | undefined {
        const { output } = this.props;
        return output.address_mask_shift_identifier ?? output.address_mask_identifier ?? output.address_identifier;
    }

    private *headerText(): Iterable<ReactNode> {
        const { output, useAddressConstants } = this.props;
        const channelIdentifier = useAddressConstants ? this.getChannelIdentifier() : undefined;

        if (channelIdentifier !== undefined) {
            yield (
                <SnippetContainerHeaderItem title={'DCS-BIOS Channel'} monospace>
                    {channelIdentifier}
                </SnippetContainerHeaderItem>
            );
        } else {
            yield (
                <SnippetContainerHeaderItem title={'Address'} monospace>
                    {Snippet.toHex(output.address)}
                </SnippetContainerHeaderItem>
            );
            if (output.mask !== undefined) {
                yield (
                    <SnippetContainerHeaderItem title={'Mask'} monospace>
                        {Snippet.toHex(output.mask)}
                    </SnippetContainerHeaderItem>
                );
            }
            if (output.shift_by !== undefined) {
                yield <SnippetContainerHeaderItem title={'Shift By'}>{output.shift_by}</SnippetContainerHeaderItem>;
            }
        }
        if (output.max_value !== undefined) {
            yield <SnippetContainerHeaderItem title={'Max Value'}>{output.max_value}</SnippetContainerHeaderItem>;
        }
        if (output.max_length !== undefined) {
            yield <SnippetContainerHeaderItem title={'Max Length'}>{output.max_length}</SnippetContainerHeaderItem>;
        }
        if (output.description !== undefined) {
            yield <SnippetContainerHeaderItem title={'Description'}>{output.description}</SnippetContainerHeaderItem>;
        }
        yield <Divider sx={{ margin: '1rem 0' }} />;
        yield (
            <SnippetContainerHeaderItem title={'Code Snippets'}>
                Choose one of the following code snippets to subscribe to this telemetry.
                <br />
                Copy the snippet that
                best matches your hardware into your application, then replace any placeholder pins or setup
                values to match your project.
            </SnippetContainerHeaderItem>
        );
    }

    public render(): ReactNode {
        return (
            <SnippetContainer>
                {[...this.headerText()]}
                <Divider sx={{ margin: '1rem 0' }} />
                {this.props.children}
            </SnippetContainer>
        );
    }
}
