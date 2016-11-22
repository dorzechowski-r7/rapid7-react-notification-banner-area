import React from 'react';
import {
  render
} from 'react-dom';
import 'rapid7-icon-font/css/rapid7.css';

import NotificationBannerArea from '../src/js/index';

const NOTIFICATIONS_1 = [{
  id: 0,
  message: 'here is a sample notification of type `critical`.',
  type: 'critical'
}, {
  id: 0,
  message: 'here is a sample notification of type `error` (aliased to `critical` for now).',
  type: 'error'
}, {
  id: 0,
  message: 'here is a sample notification of type `info`.',
  type: 'info'
}, {
  id: 0,
  message: 'here is a sample notification of type `success`.',
  type: 'success'
}, {
  id: 0,
  message: 'here is a sample notification of type `warning`.',
  type: 'warning'
}];

const NOTIFICATIONS_2 = [{
  id: 0,
  isCloseable: true,
  message: 'here is a closeable notification',
  onDismiss() {
    alert('goodbye banner!');
  },
  title: 'Dismissable Notification',
  type: 'info'
}];

const NOTIFICATIONS_3 = [{
  id: 0,
  isInline: true,
  message: 'here is an inline notification',
  title: 'Heads Up',
  type: 'info'
}];

const NOTIFICATIONS_4 = [{
  id: 0,
  message: (
    <div>
      other things that can be embedded in notification messages:
      <ul>
        <li>HTML</li>
        <li>React components</li>
      </ul>
    </div>
  ),
  type: 'info'
}];

const NOTIFICATIONS_5 = [{
  id: 0,
  isCloseable: true,
  isInline: true,
  message: 'here is a closeable inline notification',
  type: 'info'
}];

const getDescription = (notificationBanner) => {
  return (
    <pre>
      {`{`}<br/>
      {Object.keys(notificationBanner).map((key) => {
         return (
           `  ${key}: '${notificationBanner[key]}'\n`
         );
      })}
      {`}`}
    </pre>
  );
};

const App = () => {
  return (
    <div>
      <pre>
        &lt;NotificationBannerArea<br/>
        &nbsp;&nbsp;notifications=&#123;&#91;&#123;<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;id: &lt;String|number&gt;, // required<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;isCloseable: &lt;boolean&gt;,<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;isInline: &lt;boolean&gt;,<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;message: &lt;String|Object&gt;,<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;onDismiss: &lt;function(void)&gt;, // implies isCloseable=true<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;title: &lt;String&gt;,<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;type: &lt;String&gt; // required<br/>
        &nbsp;&nbsp;&#125;&#93;&#125;<br/>
        /&gt;
      </pre>
      <p>
        default notification types:<br/>
      </p>
      {NOTIFICATIONS_1.map((notification, index) => {
         return (
           <div key={index}>
             {getDescription(notification)}
             <NotificationBannerArea notifications={[notification]} />
           </div>
         );
       })}
      <p>
        closeable notifications:
      </p>
      {getDescription(NOTIFICATIONS_2[0])}
      <NotificationBannerArea
        notifications={NOTIFICATIONS_2}
      />
      <p>
        inline notifications:
      </p>
      {getDescription(NOTIFICATIONS_3[0])}
      <NotificationBannerArea
        notifications={NOTIFICATIONS_3}
      />
      <p>
        rich notifications:
      </p>
      {getDescription({
         ...NOTIFICATIONS_4[0],
         message: '<MyComponent />'
       })}
      <NotificationBannerArea
        notifications={NOTIFICATIONS_4}
      />
      <p>
        these properties are not mutually exclusive:
      </p>
      {getDescription(NOTIFICATIONS_5[0])}
      <NotificationBannerArea
        notifications={NOTIFICATIONS_5}
      />
    </div>
  );
};

let div = document.createElement('div');

div.id = 'app-container';

document.body.appendChild(div);

render((
  <App
    style={{
      fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif'
    }}
  />
), div);
