// import { LoDashStatic } from 'lodash'
// import { CoreApis, ExternalApis } from './core/core-apis'
import ReactTypes from '@types/react';
import ReactDomTypes from '@types/react-dom';

declare global {
  /** @deprecated Use window.lodash instead. */
  // const _: LoDashStatic

  // const lodash: LoDashStatic
  // const Vue: typeof import('vue/types/umd');
  // const React: ReactTypes;
  // const ReactDOM: ReactDomTypes;
  // const $: JQueryTypes;

  interface CompilationInfo {
    commitHash: string;
    branch: string;
    version: string;
    nearestTag: string;
    versionWithTag: string;
    // buildTime: number
  }
  const webpackCompilationInfo: CompilationInfo;

  // const BwpElement: {
  //   new (): HTMLVideoElement;
  //   prototype: HTMLVideoElement;
  // };
  interface Window {
    aid: string | undefined;
    cid: string | undefined;
    pageno: string | number | undefined;
    // bilibiliEvolved: ExternalApis
    [key: string]: any;
  }
  const unsafeWindow: Window & typeof globalThis;
  // const coreApis: CoreApis
  // const dq: CoreApis['utils']['dq']
  // const dqa: CoreApis['utils']['dqa']
  // const none: CoreApis['utils']['none']
  // const componentsTags: CoreApis['componentApis']['component']['componentsTags']

  interface MonkeyXhrResponse {
    finalUrl: string;
    readyState: number;
    status: number;
    statusText: string;
    responseHeaders: any;
    response: any;
    responseXML: Document;
    responseText: string;
  }
  interface MonkeyXhrBasicDetails {
    url: string;
    method?: 'GET' | 'POST' | 'HEAD';
    headers?: { [name: string]: string };
    data?: string;
    binary?: boolean;
    timeout?: number;
    context?: any;
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text' | 'document';
    overrideMimeType?: string;
    anonymous?: boolean;
    fetch?: boolean;
    username?: string;
    password?: string;
  }
  interface MonkeyXhrDetails extends MonkeyXhrBasicDetails {
    onabort?: (response: MonkeyXhrResponse) => void;
    onerror?: (response: MonkeyXhrResponse) => void;
    onloadstart?: (response: MonkeyXhrResponse) => void;
    onprogress?: (response: MonkeyXhrResponse) => void;
    onreadystatechange?: (response: MonkeyXhrResponse) => void;
    ontimeout?: (response: MonkeyXhrResponse) => void;
    onload?: (response: MonkeyXhrResponse) => void;
  }
  type RunAtOptions = 'document-start' | 'document-end' | 'document-idle' | 'document-body' | 'context-menu';
  interface MonkeyInfo {
    script: {
      author: string;
      copyright: string;
      description: string;
      excludes: string[];
      homepage: string;
      icon: string;
      icon64: string;
      includes: string[];
      lastUpdated: number;
      matches: string[];
      downloadMode: string;
      name: string;
      namespace: string;
      options: {
        awareOfChrome: boolean;
        compat_arrayleft: boolean;
        compat_foreach: boolean;
        compat_forvarin: boolean;
        compat_metadata: boolean;
        compat_prototypes: boolean;
        compat_uW_gmonkey: boolean;
        noframes: boolean;
        override: {
          excludes: false;
          includes: false;
          orig_excludes: string[];
          orig_includes: string[];
          use_excludes: string[];
          use_includes: string[];
        };
        run_at: RunAtOptions;
      };
      position: number;
      resources: string[];
      'run-at': RunAtOptions;
      system: boolean;
      unwrap: boolean;
      version: string;
    };
    scriptMetaStr: string;
    scriptSource: string;
    scriptUpdateURL: string;
    scriptWillUpdate: boolean;
    scriptHandler: string;
    isIncognito: boolean;
    version: string;
  }
  const GM_info: MonkeyInfo;
  function GM_xmlhttpRequest(details: MonkeyXhrDetails): { abort: () => void };
  function GM_setValue<T>(name: string, value: T): void;
  function GM_getValue<T>(name: string, defaultValue?: T): T;
  function GM_deleteValue(name: string): void;
  function GM_getResourceText(name: string): string;
  function GM_getResourceURL(name: string): string;
  function GM_addStyle(name: string): string;
  function GM_addElement(name: string): string;
  function GM_notification(name: string): string;
  function GM_openInTab(name: string): string;
}
