import React from 'react';
import { compiler } from 'markdown-to-jsx';

export interface RichTextProps {
  text: string;
}

export const RichText = (props: RichTextProps) => {
  const { text } = props;

  return <span className="rich-text">{compiler(text, { wrapper: null })}</span>;
};
