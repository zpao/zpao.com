const React = require('react');

/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it

// Add Twitter embed script
// exports.onPreRenderHTML = ({ getHeadComponents, replaceHeadComponents }) => {
//   const twitterScript = (
//     <script
//       key="twitter-script-tag"
//       dangerouslySetInnerHTML={{
//         __html: `
//         window.twttr = (function(d, s, id) {
//           var js, fjs = d.getElementsByTagName(s)[0],
//             t = window.twttr || {};
//           if (d.getElementById(id)) return t;
//           js = d.createElement(s);
//           js.id = id;
//           js.src = "https://platform.twitter.com/widgets.js";
//           fjs.parentNode.insertBefore(js, fjs);

//           t._e = [];
//           t.ready = function(f) {
//             t._e.push(f);
//           };

//           return t;
//         }(document, "script", "twitter-wjs"));
//         console.log('hi');
//     `,
//       }}
//     />
//   );
//   const fbScript = (
//     <script
//       key="fb-script-tag"
//       dangerouslySetInnerHTML={{
//         __html: `
//           (function(d, s, id) {
//             var js, fjs = d.getElementsByTagName(s)[0];
//             if (d.getElementById(id)) return;
//             js = d.createElement(s); js.id = id;
//             js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0";
//             fjs.parentNode.insertBefore(js, fjs);
//           }(document, 'script', 'facebook-jssdk'));
//         `,
//       }}
//     />
//   );
//   replaceHeadComponents([...getHeadComponents(), twitterScript, fbScript]);
// };
