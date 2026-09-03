export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
};

export const formatTime = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
};

export const formatDateTime = (dateString) => {
  if (!dateString) return '';
  return `${formatDate(dateString)} ${formatTime(dateString)}`;
};

export const getRelativeTime = (dateString) => {
  if (!dateString) return '';
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  const date = new Date(dateString);
  const now = new Date();
  const diffInDays = Math.round((date - now) / (1000 * 60 * 60 * 24));
  
  if (Math.abs(diffInDays) > 7) {
    return formatDate(dateString);
  }
  
  if (diffInDays === 0) {
    const diffInHours = Math.round((date - now) / (1000 * 60 * 60));
    if (diffInHours === 0) {
      const diffInMinutes = Math.round((date - now) / (1000 * 60));
      return rtf.format(diffInMinutes, 'minute');
    }
    return rtf.format(diffInHours, 'hour');
  }
  
  return rtf.format(diffInDays, 'day');
};

export const formatSlot = (slot) => {
  return `${slot.day || ''} ${slot.startTime || ''}-${slot.endTime || ''}`.trim();
};
