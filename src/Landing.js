import React, { useState, useEffect } from 'react';

export const Landing = () => {
  const loadedFiles = localStorage.getItem('files')
    ? JSON.parse(localStorage.getItem('files'))
    : [];

  const [files, setFiles] = useState(loadedFiles);

  const [file, setFile] = useState('');

  useEffect(() => {
    const json = JSON.stringify(files);
    window.localStorage.setItem('files', json);
  }, [files]);

  function handleSubmit(e) {
    e.preventDefault();

    const newFile = {
      id: new Date().getTime(),
      text: file
    };

    setFiles([...files].concat(newFile));
    setFile('');
  }

  return (
    <div className="App">
      <div>
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="file"
              accept="application/pdf, image/jpeg,"
              name="addFile"
              id="addFile"
              onChange={(e) => {
                setFile(e.target.value);
              }}
              value={file}
            />
            <button> add </button>
          </form>
        </div>
        <ul>
          {files.map((file) => {
            return (
              <li key={file.id}>
                <p>{file.text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
