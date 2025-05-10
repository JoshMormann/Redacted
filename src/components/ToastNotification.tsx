"use client";

import React from 'react';

interface ToastNotificationProps {
  message: string;
  type: 'error' | 'success' | 'info' | 'warning';
  onClose: () => void;
  autoClose?: boolean;
  duration?: number;
}

const ToastNotification: React.FC<ToastNotificationProps> = ({
  message,
  type,
  onClose,
  autoClose = true,
  duration = 5000
}) => {
  React.useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, onClose]);

  // Determine styles based on type
  const getStyles = () => {
    switch (type) {
      case 'error':
        return {
          bg: 'bg-red-600',
          border: 'border-red-400',
          icon: '❌',
          iconBg: 'bg-red-700'
        };
      case 'success':
        return {
          bg: 'bg-green-600',
          border: 'border-green-400',
          icon: '✅',
          iconBg: 'bg-green-700'
        };
      case 'warning':
        return {
          bg: 'bg-yellow-600',
          border: 'border-yellow-400',
          icon: '⚠️',
          iconBg: 'bg-yellow-700'
        };
      case 'info':
      default:
        return {
          bg: 'bg-primary',
          border: 'border-blue-400',
          icon: 'ℹ️',
          iconBg: 'bg-blue-700'
        };
    }
  };

  const styles = getStyles();

  return (
    <div className={`fixed top-4 right-4 ${styles.bg} text-white p-3 rounded-xl shadow-lg max-w-md z-50 flex items-start border ${styles.border} card-shadow`}>
      <div className={`mr-3 ${styles.iconBg} p-1 rounded-full flex items-center justify-center`}>
        {styles.icon}
      </div>
      <div className="flex-1">
        <p className="font-medium text-sm">{message}</p>
      </div>
      <button 
        onClick={onClose}
        className="ml-2 text-white hover:text-gray-200 w-5 h-5 flex items-center justify-center rounded-full hover:bg-black hover:bg-opacity-20"
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
};

export default ToastNotification;
