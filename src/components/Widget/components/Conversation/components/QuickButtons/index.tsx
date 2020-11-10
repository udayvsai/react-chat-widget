import React, { CSSProperties } from 'react';
import { useSelector } from 'react-redux';

import { GlobalState, QuickButton } from 'src/store/types';
import { AnyFunction } from 'src/utils/types';

import './style.scss';

type Props = {
  onQuickButtonClicked?: AnyFunction;
}

const style = {
  display: 'flex',
  flexDirection: 'column'
} as CSSProperties

const style2 = {
  boxShadow: 'inset 0px 10px 10px -10px #000000'
} as CSSProperties

const style3 = {
  marginBottom: '10px'
} as CSSProperties

function QuickButtons({ onQuickButtonClicked }: Props) {
  const buttons = useSelector((state: GlobalState) => state.quickButtons.quickButtons);
  const isHorizontal = useSelector((state: GlobalState) => state.quickButtons.isHorizontal);

  const getComponentToRender = (button: QuickButton) => {
    const ComponentToRender = button.component;
    return (
      <ComponentToRender
        onQuickButtonClicked={onQuickButtonClicked}
        button={button}
      />
    );
  }

  if (!buttons.length) return null;

  return (
    <div className="quick-buttons-container" style={!isHorizontal ? { ...style2, height: buttons.length <= 5 ? `${buttons.length * 50}px` : '250px' } : {}}>
      <ul className="quick-buttons" style={!isHorizontal ? { ...style } : {}}>
        {buttons.map((button, index) =>
          <li className="quick-list-button" style={!isHorizontal ? { ...style3 } : {}} key={`${button.label}-${index}`}>
            {getComponentToRender(button)}
          </li>
        )
        }
      </ul>
    </div>
  );
}

export default QuickButtons;
