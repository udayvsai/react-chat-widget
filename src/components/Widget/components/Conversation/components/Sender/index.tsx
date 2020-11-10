import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { isMobile } from 'react-device-detect';
import ReactTooltip from "react-tooltip";

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
  onTextInputChange?: (event: any) => void;
  onFileUpload?: (event: any) => void;
  onRestart?: (event: any) => void;
  onEdit?: (event: any) => void;
}

function Sender({ sendMessage, placeholder, disabledInput, autofocus, onTextInputChange, buttonAlt, onFileUpload, onRestart, onEdit }: Props) {
  const showChat = useSelector((state: GlobalState) => state.behavior.showChat);
  const inputRef = useRef(null);
  // @ts-ignore
  useEffect(() => { if (showChat) inputRef.current?.focus(); }, [showChat]);

  const onKeyPress = (e) => {
    if (e.keyCode === 13 && (e.shiftKey || isMobile)) {
      e.preventDefault();
      let msg_text = e.target.value + "  \n";
      // @ts-ignore
      inputRef.current.value = msg_text
    } else if (e.keyCode === 13) {
      e.target['message'] = { value: e.target.value }
      e.target.value = ''
      sendMessage(e)
    }
  };

  return (
    <>
      <form className="rcw-sender" onSubmit={sendMessage}>
        <div className="rcw-send">
          <img src={restart} data-tip data-for="restart" className="rcw-send-icon" onClick={onRestart} alt="restart chat" />
        </div>
        <div className="rcw-send">
          <img src={editInput} data-tip data-for="edit" className="rcw-send-icon" onClick={onEdit} alt="Edit Input" />
        </div>
        <textarea
          className="rcw-new-message"
          name="message"
          ref={inputRef}
          placeholder={placeholder}
          disabled={disabledInput}
          autoFocus={autofocus}
          autoComplete="off"
          onKeyDown={onKeyPress}
          onChange={onTextInputChange}
        />
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
      <ReactTooltip id="restart" place="top" effect="solid">
        Refresh and Restart the journey from the first step
      </ReactTooltip>
      <ReactTooltip id="edit" place="top" effect="solid">
        Click here to Edit the responses entered by you till now
      </ReactTooltip>
    </>
  );
}

export default Sender;
