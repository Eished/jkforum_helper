// decode base64url payload -> JSON
function decodeJwt(token: string | undefined) {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length < 2) return null;
  try {
    const payload = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const json = decodeURIComponent(
      atob(payload)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(json);
  } catch (e) {
    return null;
  }
}

// try common storages and cookies
function getTokenFromCookie() {
  // cookies
  const cookieNames = ['jkf-ap-pot'];
  for (const name of cookieNames) {
    const m = document.cookie.split('; ').find((s) => s.startsWith(name + '='));
    if (m) {
      const val = decodeURIComponent(m.split('=')[1] || '');
      if (val.split('.').length === 3) return val;
    }
  }
  return null;
}

// inject small script into page to capture page-context vars and fetch/XHR headers
// function injectPageScript() {
//   const script = document.createElement('script');
//   script.textContent =
//     '(' +
//     function () {
//       try {
//         // try common global variables (customize per-site)
//         const possible = [
//           window.__INITIAL_STATE__ &&
//             (window.__INITIAL_STATE__.token || (window.__INITIAL_STATE__.auth && window.__INITIAL_STATE__.auth.token)),
//           window.__APP_STATE__ && window.__APP_STATE__.auth && window.__APP_STATE__.auth.token,
//         ];
//         possible.forEach((t) => {
//           if (t && typeof t === 'string') {
//             window.dispatchEvent(new CustomEvent('tm-token', { detail: t }));
//           }
//         });
//       } catch (e) {}

//       // wrap fetch to capture Authorization header if present
//       try {
//         const origFetch = window.fetch;
//         window.fetch = function (...args) {
//           try {
//             const config = args[1];
//             if (config && config.headers) {
//               const h = config.headers;
//               const auth = (h.get && h.get('Authorization')) || h['Authorization'] || h['authorization'];
//               if (auth && auth.startsWith('Bearer ')) {
//                 window.dispatchEvent(new CustomEvent('tm-token', { detail: auth.split(' ')[1] }));
//               }
//             }
//           } catch (e) {}
//           return origFetch.apply(this, args);
//         };
//       } catch (e) {}
//       // wrap XHR to capture setRequestHeader('Authorization', ...)
//       try {
//         const XHR = window.XMLHttpRequest;
//         const open = XHR.prototype.open;
//         XHR.prototype.open = function () {
//           this._isTM = true;
//           return open.apply(this, arguments);
//         };
//         const setRequestHeader = XHR.prototype.setRequestHeader;
//         XHR.prototype.setRequestHeader = function (k, v) {
//           try {
//             if (k.toLowerCase() === 'authorization' && v && v.startsWith('Bearer ')) {
//               window.dispatchEvent(new CustomEvent('tm-token', { detail: v.split(' ')[1] }));
//             }
//           } catch (e) {}
//           return setRequestHeader.apply(this, arguments);
//         };
//       } catch (e) {}
//     } +
//     ')();';
//   document.documentElement.appendChild(script);
//   script.remove();
// }

// listen for token events from injected script
// window.addEventListener('tm-token', function (e) {
//   const token = e.detail;
//   if (token) {
//     const info = decodeJwt(token);
//     console.log('Token from page context:', token);
//     console.log('Decoded payload:', info);
//   }
// });

// run detection
// injectPageScript();
export const getUserUidFromJwt = () => {
  const token = getTokenFromCookie();
  if (token) {
    const jwtObj = decodeJwt(token);
    if (jwtObj) {
      return String(jwtObj.uid);
    }
  } else {
    console.log(
      'No JWT found in local/session storage or non-httpOnly cookies. If site uses httpOnly cookie, it cannot be read from userscript.'
    );
  }
};
