import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const TOOLBAR_MODULES = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['bold', 'italic', 'underline'],
  [{ color: [] }, { background: [] }],
  [{ script: 'sub' }, { script: 'super' }],
  [{ align: [] }],
  ['image', 'blockquote', 'code-block'],
  ['clean']
];

export default function TextEditor() {
  const [text, setText] = useState('');
  return (
    <div>
      <ReactQuill value={text} onChange={setText} modules={ { toolbar: TOOLBAR_MODULES} }></ReactQuill>
    </div>
  )
}