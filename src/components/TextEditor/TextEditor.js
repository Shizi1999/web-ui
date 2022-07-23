import React from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt();

function TextEditor(props) {
  const { onChange, value } = props;
  return (
    <MdEditor
      value={value}
      style={{ height: '500px' }}
      renderHTML={(text) => mdParser.render(text)}
      onChange={onChange}
    />
  );
}

export default TextEditor;
