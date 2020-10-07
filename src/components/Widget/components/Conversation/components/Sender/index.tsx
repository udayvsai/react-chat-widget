import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { GlobalState } from 'src/store/types';

const send = require('../../../../../../../assets/send_button.svg') as string;
const upload = require('../../../../../../../assets/file_upload.svg') as string;
const restart = require('../../../../../../../assets/restart.svg') as string;
const editInput = require('../../../../../../../assets/edit-input.svg') as string;

import './style.scss';

type Props = {
  placeholder: string;
  disabledInput: boolean;
  autofocus: boolean;
  sendMessage: (event: any) => void;
  buttonAlt: string;
  chatId: string;
  onTextInputChange?: (event: any) => void;
  onFileUpload?: (event: any) => void;
  onRestart?: (event: any) => void;
  onEdit?: (event: any) => void;
}

function Sender({ sendMessage, placeholder, disabledInput, autofocus, onTextInputChange, chatId, buttonAlt, onFileUpload, onRestart, onEdit }: Props) {
  const showChat = useSelector((state: GlobalState) => state.behavior[chatId].showChat);
  const inputRef = useRef(null);
  // @ts-ignore
  useEffect(() => { if (showChat) inputRef.current?.focus(); }, [showChat]);

  return (
    <form className="rcw-sender" onSubmit={sendMessage}>
      <div className="rcw-send">
        <img src={restart} className="rcw-send-icon" onClick={onRestart} alt="restart chat" />
      </div>
      <input
        type="text"
        className="rcw-new-message"
        name="message"
        ref={inputRef}
        placeholder={placeholder}
        disabled={disabledInput}
        autoFocus={autofocus}
        autoComplete="off"
        onChange={onTextInputChange}
      />
      <div className="rcw-send">
        <img src={editInput} className="rcw-send-icon" onClick={onEdit} alt="Edit Input" />
      </div>
      <div className="rcw-send">
        <label htmlFor="file-input">
          <img src={upload} className="rcw-send-icon" alt="File Input" />
        </label>
        <input id="file-input" type="file" onChange={onFileUpload} style={{ display: 'none' }} />
      </div>
      <button type="submit" className="rcw-send">
        <img src={send} className="rcw-send-icon" alt={buttonAlt} />
      </button>
    </form>
  );
}

export default Sender;
