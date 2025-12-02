// Google Analytics tracking utilities

export const trackEvent = (eventName, eventParams = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
  } else {
    console.warn('Google Analytics not initialized');
  }
};

// Track interest button click
export const trackInterestClick = (userId) => {
  trackEvent('interest_button_click', {
    event_category: 'User Interaction',
    event_label: 'Interested',
    user_id: userId,
  });
};

// Track ignore button click
export const trackIgnoreClick = (userId) => {
  trackEvent('ignore_button_click', {
    event_category: 'User Interaction',
    event_label: 'Ignored',
    user_id: userId,
  });
};

// Track request accept button click
export const trackRequestAccept = (requestId) => {
  trackEvent('request_accept_click', {
    event_category: 'Request Interaction',
    event_label: 'Accepted',
    request_id: requestId,
  });
};

// Track request reject button click
export const trackRequestReject = (requestId) => {
  trackEvent('request_reject_click', {
    event_category: 'Request Interaction',
    event_label: 'Rejected',
    request_id: requestId,
  });
};
