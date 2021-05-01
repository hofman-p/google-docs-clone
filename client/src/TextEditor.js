import React, { useState, useEffect, useRef } from 'react';
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
  const [socket, setSocket] = useState();
  const quillRef = useRef();

  useEffect(() => {
    const s = io('http://localhost:3001');
    setSocket(s);
    return () => {
      s.disconnect();
    }
  }, []);

  useEffect(() => {
    if (socket == null) return;
    const handler = delta => {
      quillRef.current.getEditor().updateContents(delta);
    }
    socket.on('received-delta', handler);
    return () => {
      socket.off('received-delta', handler);
    }
  }, [socket]);


  const handleChange = (changes, delta, source, editor) => {
    setText(changes);
    if (source !== 'user') return;
    socket.emit('send-delta', delta);
  }

  return (
    <div>
      <ReactQuill ref={quillRef} value={text} onChange={handleChange} modules={ { toolbar: TOOLBAR_MODULES} }></ReactQuill>
    </div>
  )
}