import React, { useState, useEffect } from 'react';
import pdfLogo from './assset/pdf_logo.jpg';
import './landing.css';

export const Landing = () => {
  const loadedFiles = localStorage.getItem('files')
    ? JSON.parse(localStorage.getItem('files'))
    : [];
  const loadedUserName = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : '';

  const [files, setFiles] = useState(loadedFiles);
  const [file, setFile] = useState('');
  const [username, setUsername] = useState(loadedUserName);

  useEffect(() => {
    const json = JSON.stringify(files);
    window.localStorage.setItem('files', json);
    const addedUser = JSON.stringify(username);
    window.localStorage.setItem('user', addedUser);
  }, [files, username]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    reader.readAsDataURL(e.target[0].files[0]);

    reader.onload = () => {
      const newFile = {
        time: new Date().getTime(),
        name: e.target[0].files[0].name,
        user: username,
        base64: reader.result,
        type: e.target[0].files[0].type
      };

      setFiles([...files].concat(newFile));
      setFile('');
    };
  };

  return (
    <>
      <article className="user">
        <p className="user__p">
          <span role="img">👋</span> Hey, add your username!
        </p>
        <input
          type="text"
          name="username"
          id="username"
          className="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <div className="add__files">
          <div className="chosen__user">
            <p>
              Ok <span>{username}</span>, add your magic
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div>
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
              <button disabled={!username}>Add</button>
            </div>
          </form>
          <ul>
            {files.map((file) => {
              return (
                <li key={file.time}>
                  <div className="li__content">
                    {file.type === 'image/jpeg' && (
                      <>
                        <img src={file.base64} alt={file.name} />
                        <p>{file.name}</p>
                      </>
                    )}
                    {file.type === 'application/pdf' && (
                      <>
                        <img src={pdfLogo} alt="pdf logo" />
                        <p>{file.name}</p>
                      </>
                    )}
                  </div>
                  <a download={file.name} href={file.base64}>
                    <button>Download file</button>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </article>
    </>
  );
};
