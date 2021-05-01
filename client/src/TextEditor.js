import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { io } from 'socket.io-client';

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

  useEffect(() => {
    const socket = io('http://localhost:3001');
    return () => {
      socket.disconnect();
    }
  }, []);

  return (
    <div>
      <ReactQuill value={text} onChange={setText} modules={ { toolbar: TOOLBAR_MODULES} }></ReactQuill>
    </div>
  )
}