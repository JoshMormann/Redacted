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

  // Determine background color based on type
  const getBgColor = () => {
    switch (type) {
      case 'error':
        return 'bg-red-500';
      case 'success':
        return 'bg-green-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'info':
      default:
        return 'bg-blue-500';
    }
  };

  // Determine icon based on type
  const getIcon = () => {
    switch (type) {
      case 'error':
        return '❌';
      case 'success':
        return '✅';
      case 'warning':
        return '⚠️';
      case 'info':
      default:
        return 'ℹ️';
    }
  };

  return (
    <div className={`fixed bottom-4 right-4 ${getBgColor()} text-white p-4 rounded-xl shadow-lg max-w-md animate-fade-in-up z-50 flex items-start`}>
      <div className="mr-2">{getIcon()}</div>
      <div className="flex-1">
        <p className="font-semibold">{message}</p>
      </div>
      <button 
        onClick={onClose}
        className="ml-4 text-white hover:text-gray-200"
      >
        ×
      </button>
    </div>
  );
};

export default ToastNotification;
