import { Icon } from '@iconify/react';

import './loveButtonStyles.css';

export default function LoveButton({ isActive, onClick }) {
  return (
    <span
      onClick={onClick}
      className={`heart ${isActive ? 'heart-active' : ''}`}
    />
  );
}
