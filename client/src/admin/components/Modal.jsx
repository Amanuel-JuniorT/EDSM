import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ isOpen, onClose, title, children, actions }) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div className="modal-overlay" role="dialog" aria-modal="true" tabIndex="-1" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        {title && <h2 className="modal-title">{title}</h2>}
        <div className="modal-content">{children}</div>
        {actions !== undefined && actions}
        {actions === undefined && (
          <div className="modal-actions">
            <button className="close-btn" onClick={onClose}>Close</button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default Modal; 