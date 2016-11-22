import React, {
  PropTypes
} from 'react';

import styles from '../scss/styles.scss';
import NotificationBanner, {
  shape as NotificationBannerShape
} from './NotificationBanner';

/**
 * create and return a banner-dismiss callback
 *
 * @param {String} id - banner id
 * @param {function(String):?} callback - function to invoke upon banner dismissal
 * @return {function():void}
 */
const onBannerDismiss = (id, callback) => {
  return () => {
    callback(id);
  };
};

const NotificationBannerArea = (props) => {
  const {
    className: givenClassName,
    notifications
  } = props;
  const className = `${styles.notificationBannerArea} ${givenClassName}`;

  return (
    <ul className={className}>
      {notifications.map((notification, index) => {
         const {
           id,
           onDismiss,
           ...bannerProps
         } = notification;

         return (
           <NotificationBanner
             id={id}
             key={index}
             onDismiss={onBannerDismiss(id, onDismiss)}
             {...bannerProps}
           />
         );
      })}
    </ul>
  );
};

NotificationBannerArea.propTypes = {
  className: PropTypes.string,
  notifications: PropTypes.arrayOf(React.PropTypes.shape(NotificationBannerShape)).isRequired
};
NotificationBannerArea.defaultProps = {
  className: ''
};

export {NotificationBanner};
export {NotificationBannerArea};
export {NotificationBannerShape as bannerShape};

export default NotificationBannerArea;
