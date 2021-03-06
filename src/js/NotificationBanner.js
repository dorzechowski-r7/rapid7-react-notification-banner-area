import memoize from 'fast-memoize';
import React, {
  PropTypes
} from 'react';

import styles from '../scss/styles.scss';

const SHAPE = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  isCloseable: PropTypes.bool,
  isInline: PropTypes.bool,
  message: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string
  ]),
  onDismiss: PropTypes.func,
  title: PropTypes.string,
  type: PropTypes.oneOf([
    'critical',
    'error',
    'info',
    'success',
    'warning'
  ]).isRequired
};
const DEFAULT_TITLES = {
  critical: 'Critical',
  error: 'Error',
  info: 'Info',
  success: 'Success',
  warning: 'Warning'
};
const ICONS = {
  critical: 'r7-icon-alert-notification-open',
  error: 'r7-icon-failed-warning-exclamation',
  info: 'r7-icon-info',
  success: 'r7-icon-remediation',
  warning: 'r7-icon-alert-notification-open'
};

/**
 * build a notification banner title component
 *
 * @param {Object} props - NotificationBanner props
 * @return {JSX}
*/
const getTitleComponent = memoize((props) => {
  const {
    isInline,
    message,
    title,
    type
  } = props;

  return isInline ? (
    <span className={styles.bannerTitle}>
      <span className={styles.inlineBannerTitle}>{title}</span>
      <span className={styles.inlineBannerMessage}>{message}</span>
    </span>
  ) : (
    <span className={styles.bannerTitle}>
      {title || DEFAULT_TITLES[type]}
    </span>
  );
});

const NotificationBanner = (props) => {
  const {
    isCloseable,
    isInline,
    message,
    onDismiss,
    type: providedType
  } = props;
  const type = providedType === 'error' ? 'critical' : providedType;
  const bannerClassName = `${styles.banner} ${styles.banner}-${type}`;
  const titleComponent = getTitleComponent(props);

  return (
    <li className={bannerClassName}>
      <div className={styles['notification-header']}>
        <i className={`r7-icon ${ICONS[type]} ${styles.bannerIcon}`} />
        {titleComponent}
        {isCloseable && (
           <span className={`${styles.closeBanner} ${styles['destroy-btn']}`}>
             <i
               className={`r7-icon r7-icon-delete-x`}
               onClick={onDismiss}
               role="button"
               title="Dismiss this banner"
             />
           </span>
         )}
      </div>
      {!isInline && message && (
         <div className={styles['notification-info']}>
           {message}
         </div>
       )}
    </li>
  );
};

NotificationBanner.propTypes = SHAPE;

export {NotificationBanner};
export {SHAPE as shape};

export default NotificationBanner;
