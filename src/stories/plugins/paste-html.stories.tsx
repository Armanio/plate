import React, { useMemo, useState } from 'react';
import { boolean } from '@storybook/addon-knobs';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import {
  EditablePlugins,
  ImagePlugin,
  LinkPlugin,
  withImage,
  withLink,
  withList,
  withPasteHtml,
} from 'slate-plugins';
import { BlockquotePlugin } from 'slate-plugins/elements/blockquote/BlockquotePlugin';
import { CodePlugin } from 'slate-plugins/elements/code/CodePlugin';
import { HeadingPlugin } from 'slate-plugins/elements/heading/HeadingPlugin';
import { ListPlugin } from 'slate-plugins/elements/list/ListPlugin';
import { BoldPlugin } from 'slate-plugins/marks/bold/BoldPlugin';
import { InlineCodePlugin } from 'slate-plugins/marks/inline-code/InlineCodePlugin';
import { ItalicPlugin } from 'slate-plugins/marks/italic/ItalicPlugin';
import { StrikethroughPlugin } from 'slate-plugins/marks/strikethrough/StrikethroughPlugin';
import { UnderlinePlugin } from 'slate-plugins/marks/underline/UnderlinePlugin';
import { Slate, withReact } from 'slate-react';
import { initialValuePasteHtml } from '../config/initialValues';

export default {
  title: 'Plugins/withPasteHtml',
};

export const PasteHtml = () => {
  const plugins = [
    ImagePlugin(),
    LinkPlugin(),
    ListPlugin(),
    BlockquotePlugin(),
    HeadingPlugin(),
    CodePlugin(),
    BoldPlugin(),
    InlineCodePlugin(),
    ItalicPlugin(),
    UnderlinePlugin(),
    StrikethroughPlugin(),
  ];

  const createReactEditor = () => () => {
    const [value, setValue] = useState(initialValuePasteHtml);

    const editor = useMemo(
      () =>
        withImage(
          withList(
            withPasteHtml(withLink(withHistory(withReact(createEditor()))))
          )
        ),
      []
    );

    return (
      <Slate
        editor={editor}
        value={value}
        onChange={newValue => setValue(newValue)}
      >
        <EditablePlugins
          plugins={plugins}
          placeholder="Paste in some HTML..."
        />
      </Slate>
    );
  };

  const Editor = createReactEditor();

  return <Editor />;
};