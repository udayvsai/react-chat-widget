import React from 'react';
import cn from 'classnames';

import Header from './components/Header';
import Messages from './components/Messages';
import Sender from './components/Sender';
import QuickButtons from './components/QuickButtons';
import Address from './components/Address';

import { AnyFunction } from '../../../../utils/types';

import './style.scss';

type Props = {
  title: string;
  subtitle: string;
  senderPlaceHolder: string;
  showCloseButton: boolean;
  disabledInput: boolean;
  autofocus: boolean;
  className: string;
  sendMessage: AnyFunction;
  toggleChat: AnyFunction;
  profileAvatar?: string;
  titleAvatar?: string;
  onQuickButtonClicked?: AnyFunction;
  onFileUpload?: (event: any) => void;
  onRestart?: (event: any) => void;
  onEdit?: (event: any) => void;
  onTextInputChange?: (event: any) => void;
  sendButtonAlt: string;
  showTimeStamp: boolean;
  showMap?: boolean;
  onMapClose?: AnyFunction;
  onLocationSubmit?: AnyFunction;
  defaultMapProps?: object;
};

function Conversation({
  title,
  subtitle,
  senderPlaceHolder,
  showCloseButton,
  disabledInput,
  autofocus,
  className,
  sendMessage,
  toggleChat,
  profileAvatar,
  titleAvatar,
  onQuickButtonClicked,
  onTextInputChange,
  onFileUpload,
  sendButtonAlt,
  onRestart,
  onEdit,
  showTimeStamp,
  showMap,
  onMapClose,
  onLocationSubmit,
  defaultMapProps
}: Props) {
  return (
    <div className={cn('rcw-conversation-container', className)} aria-live="polite">
      {showMap ? <Address onMapClose={onMapClose} onLocationSubmit={onLocationSubmit} defaultMapProps={defaultMapProps} /> :
      <>
        <Header
        title={title}
        subtitle={subtitle}
        toggleChat={toggleChat}
        showCloseButton={showCloseButton}
        titleAvatar={titleAvatar}
      />
      <Messages profileAvatar={profileAvatar} showTimeStamp={showTimeStamp} />
      <QuickButtons onQuickButtonClicked={onQuickButtonClicked} />
      <Sender
        sendMessage={sendMessage}
        placeholder={senderPlaceHolder}
        disabledInput={disabledInput}
        autofocus={autofocus}
        onTextInputChange={onTextInputChange}
        onFileUpload={onFileUpload}
        onRestart={onRestart}
        onEdit={onEdit}
        buttonAlt={sendButtonAlt}
      />
      </>
      }
    </div>
  );
}

export default Conversation;
