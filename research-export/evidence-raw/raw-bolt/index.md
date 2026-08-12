<!DOCTYPE html><html lang="en" data-theme="dark" data-theme-option="dark"><head><meta charSet="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><meta name="theme-color" content="#111114"/><script type="application/json" id="bolt-build-info">{"revision":"6195b0a","release":"6195b0a5848a4c992ff36d383ad21e2adf86c73d"}</script><script>(function setMinViewport() {
  const MIN_WIDTH = 360;
  const meta = document.querySelector('meta[name="viewport"]');

  if (!meta) {
    return;
  }

  function update() {
    /**
     * Never let the layout drop below the min width: on narrower screens the
     * browser scales the page down to fit instead of reflowing or scrolling.
     */
    const width = Math.max(window.screen.width, MIN_WIDTH);
    meta.setAttribute('content', 'width=' + width);
  }

  update();
  window.addEventListener('resize', update);
  window.addEventListener('orientationchange', update);
})();
</script><title>Index.Md (duplicated) - Bolt.new</title><meta name="description" content="Prompt, run, edit &amp; publish apps"/><meta property="og:type" content="object"/><meta property="og:site_name" content="bolt.new"/><meta property="og:title" content="Index.Md (duplicated) - Bolt.new"/><meta property="og:description" content="Prompt, run, edit &amp; publish apps"/><meta property="og:image" content="https://social-img.staticblitz.com/bolt-projects/index.md"/><meta name="twitter:card" content="summary_large_image"/><meta name="twitter:title" content="Index.Md (duplicated) - Bolt.new"/><meta name="twitter:description" content="Prompt, run, edit &amp; publish apps"/><meta name="twitter:image" content="https://social-img.staticblitz.com/bolt-projects/index.md"/><meta name="twitter:site" content="@StackBlitz"/><script>(function detectTheme() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  globalThis.prefersDark = prefersDark;

  const themeOption = document.documentElement.getAttribute('data-theme-option');

  if (themeOption === 'system') {
    document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  }
})();
</script><link rel="stylesheet" href="/assets/EmptyState-scVdpVyl.css#"/><link rel="stylesheet" href="/assets/root-BDr8v2JC.css"/><link rel="stylesheet" href="/assets/login-D3NdLlkk.css#"/><link rel="stylesheet" href="/assets/LightRays-apN2LHcc.css#"/><link rel="icon" href="/static/favicon.svg" type="image/svg+xml"/><link rel="icon" href="/static/favicon-48x48.png" type="image/png" sizes="48x48"/><link rel="icon" href="/static/favicon-96x96.png" type="image/png" sizes="96x96"/><link rel="icon" href="/static/favicon-192x192.png" type="image/png" sizes="192x192"/><link rel="apple-touch-icon" href="/static/apple-touch-icon.png" sizes="180x180"/><link rel="stylesheet" href="/assets/tailwind-compat-DeJTMLhw.css"/><link rel="stylesheet" href="/assets/index-9yinAZxV.css"/><link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous"/><link rel="preload" href="/static/fonts/inter-display-semibold.woff2" as="font" type="font/woff2" crossorigin="anonymous"/><link rel="preload" href="/static/fonts/inter-display-bold.woff2" as="font" type="font/woff2" crossorigin="anonymous"/><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;display=swap"/><link rel="stylesheet" href="/static/fonts/fonts.css"/><link rel="stylesheet" href="/assets/Chat-C-pxZWHb.css#"/><link rel="stylesheet" href="/assets/Markdown-DOeOYkw8.css#"/><link rel="stylesheet" href="/assets/Prompt-1LVg7nBt.css#"/><script>(function createWorkaroundGlobal() {
  /**
   * A bug in wrangler injects a __name call in these script tags.
   *
   * @see https://github.com/cloudflare/workers-sdk/issues/7107#issuecomment-2454829854
   */
  window['__' + 'name'] = () => {
    // noop
  };
})();
</script><script>// prevent modifications to the DOM until hydration is finished
(function blockDOMMutations() {
  let allowed = false;

  const observer = new MutationObserver((mutations) => {
    observer.disconnect();

    // we iterate backwards so that the oldValue is always correct by the end, in the case of simultaneous changes
    mutations.reverse().forEach((mutation) => {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((node) => {
          /**
           * Modifications to the head do not affect hydration (vite uses this for HMR styles).
           *
           * Nodes added as children of the body do not affect hydration (WebContainer uses this for the iframe).
           */
          if ([document.head, document.body, document.documentElement].includes(node.parentNode)) {
            return;
          }

          if (node.parentNode) {
            node.parentNode.removeChild(node);
          }
        });

        mutation.removedNodes.forEach((node) => {
          if (mutation.previousSibling) {
            mutation.target.insertBefore(node, mutation.previousSibling.nextSibling);
          } else if (mutation.target) {
            mutation.target.appendChild(node);
          }
        });
      }

      if (mutation.type === 'attributes') {
        const { target, attributeName, oldValue } = mutation;

        if (attributeName) {
          if (oldValue === null) {
            target.removeAttribute(attributeName);
          } else {
            target.setAttribute(attributeName, oldValue);
          }
        }
      }

      if (mutation.type === 'characterData') {
        mutation.target.data = mutation.oldValue ?? '';
      }
    });

    observe();
  });

  function observe() {
    /**
     * Deferred module scripts (the client entry that calls __allowDOMMutations and
     * starts hydration) run BEFORE DOMContentLoaded. Without this guard the observer
     * would re-arm here after hydration has already begun and revert React's own DOM
     * writes, breaking hydration ("Root did not complete").
     */
    if (allowed) {
      return;
    }

    observer.observe(document, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeOldValue: true,
      characterData: true,
      characterDataOldValue: true,
    });
  }

  window.addEventListener('DOMContentLoaded', observe);

  window.__allowDOMMutations = () => {
    allowed = true;
    window.removeEventListener('DOMContentLoaded', observe);
    observer.disconnect();
    window.__loadingPrompt = document.querySelector('textarea')?.value;
  };
})();
</script><meta name="sentry-trace" content="70a83ab5b4304ada897e7edc5d87f37d-ad38c49f3d9bb3cc-1"/><meta name="baggage" content="sentry-environment=production,sentry-release=6195b0a5848a4c992ff36d383ad21e2adf86c73d,sentry-public_key=a2f02ffb9d5f16260f262b40e72c0efe,sentry-trace_id=70a83ab5b4304ada897e7edc5d87f37d,sentry-org_id=4509445939331072,sentry-transaction=GET%20%2F~%2F%3Aslug,sentry-sampled=true,sentry-sample_rand=0.21704582529307015,sentry-sample_rate=0.5"/></head><body class="bg-bolt-ds-bgAlt"><div id="root" class="w-full h-full"><div class="flex size-full"><div class="flex min-h-0 min-w-0 flex-1 flex-col"><div class="flex min-w-0 flex-1 flex-col border-bolt-ds-borderPrimary light:bg-bolt-ds-bg min-h-0 overflow-hidden"><header class="flex shrink-0 select-none selection-accent items-center pl-5 pr-4 h-[var(--header-height)] z-21 fixed w-full border-bolt-ds-borderPrimary"><div class="flex grow-1 basis-60 items-center gap-2 text-bolt-ds-textPrimary"><div class="z-logo"><a href="/" class="text-2xl font-semibold text-accent flex items-center"><span class="i-bolt:logos-bolt-new?mask h-7 w-[80px] lg:h-6 lg:w-[70.5px] inline-block"></span></a></div></div><nav aria-label="Main" data-orientation="horizontal" dir="ltr" class="relative h-full grow-1 shrink-0 justify-center hidden lg:flex"><div style="position:relative"><ul data-orientation="horizontal" class="flex flex-row gap-3 h-full list-none m-0 p-0 py-0.5" dir="ltr"><li class="h-full"><a href="https://discord.com/invite/stackblitz" target="_blank" rel="noopener noreferrer" class="h-full flex text-sm font-medium items-center px-1 bg-transparent text-bolt-ds-textSecondary [&amp;:hover:where(:not(:disabled))]:text-bolt-ds-textPrimary lg:px-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bolt-ds-brandHover no-underline" data-radix-collection-item="">Community</a></li><li class="h-full"><a href="/enterprise" target="_blank" rel="noopener noreferrer" class="h-full flex text-sm font-medium items-center px-1 bg-transparent text-bolt-ds-textSecondary [&amp;:hover:where(:not(:disabled))]:text-bolt-ds-textPrimary lg:px-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bolt-ds-brandHover no-underline" data-radix-collection-item="">Enterprise</a></li><li class="h-full"><a href="/resources/templates" target="_blank" rel="noopener noreferrer" class="h-full flex text-sm font-medium items-center px-1 bg-transparent text-bolt-ds-textSecondary [&amp;:hover:where(:not(:disabled))]:text-bolt-ds-textPrimary lg:px-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bolt-ds-brandHover no-underline" data-radix-collection-item="">Templates</a></li><li class="h-full"><button id="radix-:Rcqalcj5:-trigger-radix-:R13cqalcj5:" data-state="closed" aria-expanded="false" aria-controls="radix-:Rcqalcj5:-content-radix-:R13cqalcj5:" class="h-full text-sm font-medium px-1 text-bolt-ds-textSecondary [&amp;:hover:where(:not(:disabled))]:text-bolt-ds-textPrimary lg:px-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bolt-ds-brandHover group flex items-center gap-1 bg-transparent border-0 cursor-default data-[state=open]:text-bolt-ds-textPrimary" data-radix-collection-item="">Resources<span class="i-ph:caret-down text-base transition-transform group-data-[state=open]:-rotate-180"></span></button></li><li class="h-full"><a href="/careers" target="_blank" rel="noopener noreferrer" class="h-full flex text-sm font-medium items-center px-1 bg-transparent text-bolt-ds-textSecondary [&amp;:hover:where(:not(:disabled))]:text-bolt-ds-textPrimary lg:px-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bolt-ds-brandHover no-underline" data-radix-collection-item="">Careers</a></li><li class="h-full"><a href="/pricing" target="_blank" rel="noopener noreferrer" class="h-full flex text-sm font-medium items-center px-1 bg-transparent text-bolt-ds-textSecondary [&amp;:hover:where(:not(:disabled))]:text-bolt-ds-textPrimary lg:px-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bolt-ds-brandHover no-underline" data-radix-collection-item="">Pricing</a></li></ul></div><div class="absolute top-full left-1/2 -translate-x-1/2"></div></nav><div class="flex grow-1 basis-60 justify-end items-center gap-2"><div class="items-center gap-3 flex"><button class="items-center justify-center font-medium shrink-0 min-w-0 max-w-full rounded-md focus-visible:outline-2 disabled:op-50 relative disabled:cursor-not-allowed transition-colors focus-visible:shadow-sm border border-bolt-ds-borderPrimary focus-visible:outline-bolt-ds-brandHover shadow-sm text-bolt-ds-textPrimary bg-transparent [&amp;:hover:where(:not(:disabled))]:bg-bolt-ds-bgHover focus-visible:bg-bolt-ds-bgHover gap-1 text-xs px-2.5 h-8 hidden lg:inline-flex whitespace-nowrap !bg-bolt-ds-bg hover:!bg-bolt-ds-bgAltHover" type="button"><span class="truncate">Sign in</span></button><button class="flex items-center justify-center font-medium shrink-0 min-w-0 max-w-full rounded-md focus-visible:outline-2 disabled:op-50 relative disabled:cursor-not-allowed transition-colors focus-visible:shadow-sm bg-bolt-ds-brand [&amp;:hover:where(:not(:disabled))]:bg-bolt-ds-brandHover shadow-sm text-bolt-ds-onNeutral focus-visible:outline-bolt-ds-brandHover gap-1 whitespace-nowrap h-7 px-2.5 text-xs lg:h-8" type="button"><span class="truncate">Get started</span></button></div><div class="lg:hidden flex items-center"><button class="flex items-center justify-center font-medium shrink-0 min-w-0 max-w-full leading-tight focus-visible:outline-2 disabled:op-50 relative disabled:cursor-not-allowed transition-colors focus-visible:shadow-sm bg-transparent [&amp;:hover:where(:not(:disabled))]:bg-bolt-ds-utilHover text-bolt-ds-textPrimary focus-visible:outline-bolt-ds-brandHover size-7 rounded" type="button" aria-label="Open menu"><div class=""><span class="i-heroicons:bars-3 block size-5"></span></div></button></div></div></header><!--$--><div role="status" aria-label="Loading" class="fixed inset-0 flex items-center justify-center bg-bolt-ds-bgSecondary"><div class="i-bolt:logos-bolt-b size-16 text-bolt-ds-textTertiary opacity-50 animate-pulse"></div></div><!--/$--></div></div></div><section aria-label="Notifications alt+T" tabindex="-1" aria-live="polite" aria-relevant="additions text" aria-atomic="false"></section></div><script>((storageKey2, restoreKey) => {
    if (!window.history.state || !window.history.state.key) {
      let key = Math.random().toString(32).slice(2);
      window.history.replaceState({ key }, "");
    }
    try {
      let positions = JSON.parse(sessionStorage.getItem(storageKey2) || "{}");
      let storedY = positions[restoreKey || window.history.state.key];
      if (typeof storedY === "number") {
        window.scrollTo(0, storedY);
      }
    } catch (error7) {
      console.error(error7);
      sessionStorage.removeItem(storageKey2);
    }
  })("react-router-scroll-positions", null)</script><link rel="modulepreload" href="/assets/entry.client-DGxdQAc4.js"/><link rel="modulepreload" href="/assets/react-vendor-DFS8c0-u.js"/><link rel="modulepreload" href="/assets/app-version-TgcyjiPD.js"/><link rel="modulepreload" href="/assets/index.esm-D-kwiTE8.js"/><link rel="modulepreload" href="/assets/sentry.client-B583diln.js"/><link rel="modulepreload" href="/assets/breadcrumbs-BBDL7Ot9.js"/><link rel="modulepreload" href="/assets/Toast-DBjQyIqs.js"/><link rel="modulepreload" href="/assets/EmptyState-B4uq9z6n.js"/><link rel="modulepreload" href="/assets/constants-DUULTuzt.js"/><link rel="modulepreload" href="/assets/index-hujMIAWZ.js"/><link rel="modulepreload" href="/assets/bundle-mjs-5MOacnAK.js"/><link rel="modulepreload" href="/assets/root-CNPUBw1H.js"/><link rel="modulepreload" href="/assets/index-DkUFz90d.js"/><link rel="modulepreload" href="/assets/stripIndents-pFh2tRUP.js"/><link rel="modulepreload" href="/assets/compare-IkewsJlg-CZqd2GR-.js"/><link rel="modulepreload" href="/assets/client-only-DwosFz52.js"/><link rel="modulepreload" href="/assets/analytics-CCqpfHQz.js"/><link rel="modulepreload" href="/assets/registration-C_mZCv07.js"/><link rel="modulepreload" href="/assets/ErrorBoundary-nf1YnF8u.js"/><link rel="modulepreload" href="/assets/growthbook-1Nz0whI3.js"/><link rel="modulepreload" href="/assets/theme-DrfSRIs9.js"/><link rel="modulepreload" href="/assets/index-DcbV6Jek.js"/><link rel="modulepreload" href="/assets/login-XafVWru6.js"/><link rel="modulepreload" href="/assets/settings-CQiZzHIQ.js"/><link rel="modulepreload" href="/assets/Alert-DZyNlf_T.js"/><link rel="modulepreload" href="/assets/cello-attribution-Biq_3tnl.js"/><link rel="modulepreload" href="/assets/login-CmtXJQP0.js"/><link rel="modulepreload" href="/assets/preload-helper-2mcYJXfA.js"/><link rel="modulepreload" href="/assets/authFlowRoutes-0PvSSBdp.js"/><link rel="modulepreload" href="/assets/cello-config-BXEYGcji.js"/><link rel="modulepreload" href="/assets/queryClient-BKSf7pHs.js"/><link rel="modulepreload" href="/assets/QueryClientProvider-CWoSfmfP.js"/><link rel="modulepreload" href="/assets/urls-DIAei6Vp.js"/><link rel="modulepreload" href="/assets/database-tabs-DvZimEH-.js"/><link rel="modulepreload" href="/assets/index-DyxeRtzf.js"/><link rel="modulepreload" href="/assets/logger-BLqFwVWq.js"/><link rel="modulepreload" href="/assets/lifecycle-events-Cn4S9rt8.js"/><link rel="modulepreload" href="/assets/Header-B0QkzPuy.js"/><link rel="modulepreload" href="/assets/config-DG6yYR4n.js"/><link rel="modulepreload" href="/assets/classNames-BM_Cwa33.js"/><link rel="modulepreload" href="/assets/Logo-LdsYBklI.js"/><link rel="modulepreload" href="/assets/Link-CE2WXvQp.js"/><link rel="modulepreload" href="/assets/Avatar-BaixDSjP.js"/><link rel="modulepreload" href="/assets/store-dau9lu-f.js"/><link rel="modulepreload" href="/assets/index-ApXL96Jy.js"/><link rel="modulepreload" href="/assets/ai-ptijkNWq.js"/><link rel="modulepreload" href="/assets/index-DRXXH9YX.js"/><link rel="modulepreload" href="/assets/chat-started-DnFATCws.js"/><link rel="modulepreload" href="/assets/noops-TSSrUl-c.js"/><link rel="modulepreload" href="/assets/page-visibility-6WPc68Q5.js"/><link rel="modulepreload" href="/assets/util-C8pwnKxy.js"/><link rel="modulepreload" href="/assets/url-Cws4dZ32.js"/><link rel="modulepreload" href="/assets/index-BwBwXA76.js"/><link rel="modulepreload" href="/assets/text_line_stream-DtdTslVH.js"/><link rel="modulepreload" href="/assets/path-C47uQrgn.js"/><link rel="modulepreload" href="/assets/workDir-sxxUHiEw.js"/><link rel="modulepreload" href="/assets/chat-hooks-BAqhNcy-.js"/><link rel="modulepreload" href="/assets/download-rUGbmDk0.js"/><link rel="modulepreload" href="/assets/retry-DX5j_tUn.js"/><link rel="modulepreload" href="/assets/debounce-SvodA6N5.js"/><link rel="modulepreload" href="/assets/plural-DHUPwgOU.js"/><link rel="modulepreload" href="/assets/artifacts-DxQBXx56.js"/><link rel="modulepreload" href="/assets/description-CjYtOCyk.js"/><link rel="modulepreload" href="/assets/unreachable-dJ0nIuQ4.js"/><link rel="modulepreload" href="/assets/projects-C4tFyRTs.js"/><link rel="modulepreload" href="/assets/useQuery-DdV1-BIE.js"/><link rel="modulepreload" href="/assets/query-B76Wiy5M.js"/><link rel="modulepreload" href="/assets/useMutation-ORLi4bPc.js"/><link rel="modulepreload" href="/assets/mutation-BN55KS5u.js"/><link rel="modulepreload" href="/assets/openWithStackblitzAuth-D0TMuezl.js"/><link rel="modulepreload" href="/assets/menu-A2GXftJB.js"/><link rel="modulepreload" href="/assets/useProjectsOwnerContext-BYx03_vE.js"/><link rel="modulepreload" href="/assets/user-DYxDnlA7.js"/><link rel="modulepreload" href="/assets/useProjectRename-JoKXpwMk.js"/><link rel="modulepreload" href="/assets/animationVariants-Bv1Hcyis.js"/><link rel="modulepreload" href="/assets/easings-BDvTs3Wp.js"/><link rel="modulepreload" href="/assets/teamTemplates-C4oNwVfd.js"/><link rel="modulepreload" href="/assets/queryOptions-dfte2Pzq.js"/><link rel="modulepreload" href="/assets/mutationOptions-DuEc1oJu.js"/><link rel="modulepreload" href="/assets/version-history-DIpAZG-Z.js"/><link rel="modulepreload" href="/assets/LazyLoadWrapper-4XVlJP6o.js"/><link rel="modulepreload" href="/assets/LightRays.client-BSVgysmx.js"/><link rel="modulepreload" href="/assets/LightRaysCore-DtpFr9mX.js"/><link rel="modulepreload" href="/assets/LightRays.module-Bxd9H68z.js"/><link rel="modulepreload" href="/assets/LoadingDots-C8V_WRqk.js"/><link rel="modulepreload" href="/assets/BoltLogoSimple-DkgFDo4D.js"/><link rel="modulepreload" href="/assets/infiniteQueryBehavior-hB9lIGYN.js"/><link rel="modulepreload" href="/assets/_chat-Dshb15Ox.js"/><link rel="modulepreload" href="/assets/AgentSwitchDialog-Cg1xMxjV.js"/><link rel="modulepreload" href="/assets/organizations-B-XNwEwJ.js"/><link rel="modulepreload" href="/assets/useV1AgentRetired-m4ZsQlMd.js"/><link rel="modulepreload" href="/assets/MembersTable-BYW7kcOr.js"/><link rel="modulepreload" href="/assets/designSystemStepper-zDM7dWl0.js"/><link rel="modulepreload" href="/assets/persistentBanner-4G5KdMFK.js"/><link rel="modulepreload" href="/assets/team-CghZTPY6.js"/><link rel="modulepreload" href="/assets/withSpinner-DGE-K6ya.js"/><link rel="modulepreload" href="/assets/MemberDescription-DfMd2lu7.js"/><link rel="modulepreload" href="/assets/TransferProjectDialogContent-BUNIp32q.js"/><link rel="modulepreload" href="/assets/site-protection-Bm94ydNc.js"/><link rel="modulepreload" href="/assets/useFeatureFlags-BjUJ-NRG.js"/><link rel="modulepreload" href="/assets/useDesignSystemMutationHelpers-BgDM5eEx.js"/><link rel="modulepreload" href="/assets/useDesignSystemDraft-DyYFcnaS.js"/><link rel="modulepreload" href="/assets/useDesignSystems-BIYgHZEW.js"/><link rel="modulepreload" href="/assets/StripeLogo-B38cJnFA.js"/><link rel="modulepreload" href="/assets/PricingSelector-BFzCGW48.js"/><link rel="modulepreload" href="/assets/format-FBMKGxjf.js"/><link rel="modulepreload" href="/assets/organizations-Cct6gh6F.js"/><link rel="modulepreload" href="/assets/IndexLayout-BQxawyl9.js"/><link rel="modulepreload" href="/assets/meta-CSEI1Gr2.js"/><link rel="modulepreload" href="/assets/agent-DLQxbdNA.js"/><link rel="modulepreload" href="/assets/SearchInput-B0olF-a6.js"/><link rel="modulepreload" href="/assets/ActionMenu-B3rzkx3R.js"/><link rel="modulepreload" href="/assets/useRequestUpgrade-Cc1znSCz.js"/><link rel="modulepreload" href="/assets/AccountDisplay-AsiqhGa4.js"/><link rel="modulepreload" href="/assets/plan-info-BKYKcyi_.js"/><link rel="modulepreload" href="/assets/ClippedTextTooltip-BZMWvqpa.js"/><link rel="modulepreload" href="/assets/Pagination-Cd3A1WpJ.js"/><link rel="modulepreload" href="/assets/usePaginatedData-DWNLe8aJ.js"/><link rel="modulepreload" href="/assets/confetti.module-W9IyG_S9.js"/><link rel="modulepreload" href="/assets/netlify-DdTwHWa8.js"/><link rel="modulepreload" href="/assets/sites-DAYwIqIZ.js"/><link rel="modulepreload" href="/assets/AccountSelectMenu-CyveSxMy.js"/><link rel="modulepreload" href="/assets/domains-BVrci1_5.js"/><link rel="modulepreload" href="/assets/designSystems-BkBnxKHY.js"/><link rel="modulepreload" href="/assets/index-Bbfe3ZR4.js"/><link rel="modulepreload" href="/assets/index-KQgO_-kF.js"/><link rel="modulepreload" href="/assets/index-JRXZ0H6Y.js"/><link rel="modulepreload" href="/assets/index-BR8qDd1J.js"/><link rel="modulepreload" href="/assets/formatDistanceToNow-COqANUcj.js"/><link rel="modulepreload" href="/assets/constructNow-9vxuxKIZ.js"/><link rel="modulepreload" href="/assets/command-BdUc-NRs.js"/><link rel="modulepreload" href="/assets/AccountSelector.client-D2IwIMe8.js"/><link rel="modulepreload" href="/assets/teamPlans-Db9phX9H.js"/><link rel="modulepreload" href="/assets/github-BDnUX5Hh.js"/><link rel="modulepreload" href="/assets/proctor-Dbcms9d6.js"/><link rel="modulepreload" href="/assets/init-ref-BMTlAF2a.js"/><link rel="modulepreload" href="/assets/Sheet-Cj1esrt6.js"/><link rel="modulepreload" href="/assets/subscription-C590ywkg.js"/><link rel="modulepreload" href="/assets/useInitializeUserStore-D257I7Q1.js"/><link rel="modulepreload" href="/assets/useApplicationOAuthError-BAw5TCUK.js"/><link rel="modulepreload" href="/assets/_chat.~._slug-DCz-fsoa.js"/><link rel="modulepreload" href="/assets/Chat.client-D0ETzo8t.js"/><link rel="modulepreload" href="/assets/useProjectCollaborationV2-BEth4DY0.js"/><link rel="modulepreload" href="/assets/index-CbycKnko.js"/><link rel="modulepreload" href="/assets/Markdown-CGkdVErq.js"/><link rel="modulepreload" href="/assets/index-B2AMVukF.js"/><link rel="modulepreload" href="/assets/stripe-tm7B9iTw.js"/><link rel="modulepreload" href="/assets/deploy.client-AgLypZGJ.js"/><link rel="modulepreload" href="/assets/UpgradeLink-BsXBzeo9.js"/><link rel="modulepreload" href="/assets/useFreeTrialVariant-BLIHvhYP.js"/><link rel="modulepreload" href="/assets/SupabaseConfigurationDialog.client-Bd1T2MX2.js"/><link rel="modulepreload" href="/assets/csv-DNicIMRr.js"/><link rel="modulepreload" href="/assets/useApplications-wyz5raez.js"/><link rel="modulepreload" href="/assets/UpgradePlanDialogs-Cti5i4Ty.js"/><link rel="modulepreload" href="/assets/ProPlansCard-Cq1ROd91.js"/><link rel="modulepreload" href="/assets/TeamPlansCard-C0sraFks.js"/><link rel="modulepreload" href="/assets/tokens-stats-BWsF6vgl.js"/><link rel="modulepreload" href="/assets/parseISO-C_HjKyON.js"/><link rel="modulepreload" href="/assets/DesignSources-Csmnawg6.js"/><link rel="modulepreload" href="/assets/zod-BOxl0May.js"/><link rel="modulepreload" href="/assets/index.esm-DoGqQlne.js"/><link rel="modulepreload" href="/assets/index-DuQ2pUCS.js"/><link rel="modulepreload" href="/assets/getDefaultOptions-BkjKNS_P.js"/><link rel="modulepreload" href="/assets/TextArea-rzg2-qGQ.js"/><link rel="modulepreload" href="/assets/ProgressBar-DyYbW4ip.js"/><link rel="modulepreload" href="/assets/ConfirmationDialog.client-BX-rM-hp.js"/><link rel="modulepreload" href="/assets/Prompt-CPMw9o2M.js"/><link rel="modulepreload" href="/assets/scroll-overflow-mask-qbmlsycm.js"/><link rel="modulepreload" href="/assets/index-7gO_P7I8.js"/><link rel="modulepreload" href="/assets/skill-frontmatter-DTYyFnVU.js"/><link rel="modulepreload" href="/assets/jszip.min-DhG_DPen.js"/><link rel="modulepreload" href="/assets/store-OUx78_yR.js"/><link rel="modulepreload" href="/assets/selectors-CWa3blmw.js"/><link rel="modulepreload" href="/assets/useSelectedDesignSystem-BN8Oq_2p.js"/><link rel="modulepreload" href="/assets/mcp-known-servers-C1cI3xF0.js"/><link rel="modulepreload" href="/assets/mcp-D4HLsS9S.js"/><link rel="modulepreload" href="/assets/useEnsureSkillsLoaded-BjHsAnjm.js"/><link rel="modulepreload" href="/assets/import-figma-CO2Y9XNI.js"/><link rel="modulepreload" href="/assets/figma-Z9eq1avG.js"/><link rel="modulepreload" href="/assets/Footer-BlANq9IK.js"/><link rel="modulepreload" href="/assets/DiscordSupportModal.client-CTdTcrRH.js"/><link rel="modulepreload" href="/assets/utils-B8-fJJrx.js"/><link rel="modulepreload" href="/assets/useTrackOnMount-C2B265Jf.js"/><link rel="modulepreload" href="/assets/differenceInDays-Cp7owLqy.js"/><link rel="modulepreload" href="/assets/isYesterday-gfcWJeP4.js"/><link rel="modulepreload" href="/assets/addDays-CqaFVKcq.js"/><link rel="modulepreload" href="/assets/sso-B66j0Kcf.js"/><link rel="modulepreload" href="/assets/AllProjects-CNsr67s4.js"/><link rel="modulepreload" href="/assets/FiltersBar-BGN0FsWG.js"/><link rel="modulepreload" href="/assets/RecentProjects-Df8xcfdk.js"/><link rel="modulepreload" href="/assets/sheetNavigation-B3KuRHxI.js"/><link rel="modulepreload" href="/assets/command-DsKLnxB7.js"/><link rel="modulepreload" href="/assets/chart-DdzRD9Kn.js"/><link rel="modulepreload" href="/assets/serialize-messages-B2Ycr75j.js"/><link rel="modulepreload" href="/assets/index-BDJlJzHK.js"/><link rel="modulepreload" href="/assets/client-error-DejbHZY5.js"/><link rel="modulepreload" href="/assets/support-BAxtWPS-.js"/><link rel="modulepreload" href="/assets/theme-CaxmedKW.js"/><link rel="modulepreload" href="/assets/unpublish-project-Dp98898e.js"/><link rel="modulepreload" href="/assets/organizationMembers-B873SvzC.js"/><link rel="modulepreload" href="/assets/mcp-oauth-listener--b-hiiIl.js"/><link rel="modulepreload" href="/assets/index-C_s9gSTi.js"/><link rel="modulepreload" href="/assets/prepare-body-BaZ3cpAp.js"/><link rel="modulepreload" href="/assets/usePaymentIntentStatusMessage-Pc_YX8Lb.js"/><link rel="modulepreload" href="/assets/_chat.~._slug._index-C1-WmLUQ.js"/><script>window.__reactRouterContext = {"basename":"/","future":{"unstable_optimizeDeps":false,"v8_passThroughRequests":false,"v8_trailingSlashAwareDataRequests":false,"unstable_previewServerPrerendering":false,"v8_middleware":false,"v8_splitRouteModules":false,"v8_viteEnvironmentApi":false},"routeDiscovery":{"mode":"lazy","manifestPath":"/__manifest"},"ssr":true,"isSpaMode":false};window.__reactRouterContext.stream = new ReadableStream({start(controller){window.__reactRouterContext.streamController = controller;}}).pipeThrough(new TextEncoderStream());</script><script type="module" async="">;
import * as route0 from "/assets/root-CNPUBw1H.js";
import * as route1 from "/assets/_chat-Dshb15Ox.js";
import * as route2 from "/assets/_chat.~._slug-DCz-fsoa.js";
import * as route3 from "/assets/_chat.~._slug._index-C1-WmLUQ.js";
  window.__reactRouterManifest = {
  "entry": {
    "module": "/assets/entry.client-DGxdQAc4.js",
    "imports": [
      "/assets/react-vendor-DFS8c0-u.js",
      "/assets/app-version-TgcyjiPD.js",
      "/assets/index.esm-D-kwiTE8.js",
      "/assets/sentry.client-B583diln.js",
      "/assets/breadcrumbs-BBDL7Ot9.js",
      "/assets/Toast-DBjQyIqs.js",
      "/assets/EmptyState-B4uq9z6n.js",
      "/assets/constants-DUULTuzt.js",
      "/assets/index-hujMIAWZ.js",
      "/assets/bundle-mjs-5MOacnAK.js"
    ],
    "css": [
      "/assets/EmptyState-scVdpVyl.css#"
    ]
  },
  "routes": {
    "root": {
      "id": "root",
      "path": "",
      "hasAction": false,
      "hasLoader": true,
      "hasClientAction": false,
      "hasClientLoader": false,
      "hasClientMiddleware": false,
      "hasDefaultExport": true,
      "hasErrorBoundary": true,
      "module": "/assets/root-CNPUBw1H.js",
      "imports": [
        "/assets/react-vendor-DFS8c0-u.js",
        "/assets/app-version-TgcyjiPD.js",
        "/assets/index.esm-D-kwiTE8.js",
        "/assets/sentry.client-B583diln.js",
        "/assets/breadcrumbs-BBDL7Ot9.js",
        "/assets/Toast-DBjQyIqs.js",
        "/assets/EmptyState-B4uq9z6n.js",
        "/assets/constants-DUULTuzt.js",
        "/assets/index-hujMIAWZ.js",
        "/assets/bundle-mjs-5MOacnAK.js",
        "/assets/index-DkUFz90d.js",
        "/assets/stripIndents-pFh2tRUP.js",
        "/assets/compare-IkewsJlg-CZqd2GR-.js",
        "/assets/client-only-DwosFz52.js",
        "/assets/analytics-CCqpfHQz.js",
        "/assets/registration-C_mZCv07.js",
        "/assets/ErrorBoundary-nf1YnF8u.js",
        "/assets/growthbook-1Nz0whI3.js",
        "/assets/theme-DrfSRIs9.js",
        "/assets/index-DcbV6Jek.js",
        "/assets/login-XafVWru6.js",
        "/assets/settings-CQiZzHIQ.js",
        "/assets/Alert-DZyNlf_T.js",
        "/assets/cello-attribution-Biq_3tnl.js",
        "/assets/login-CmtXJQP0.js",
        "/assets/preload-helper-2mcYJXfA.js",
        "/assets/authFlowRoutes-0PvSSBdp.js",
        "/assets/cello-config-BXEYGcji.js",
        "/assets/queryClient-BKSf7pHs.js",
        "/assets/QueryClientProvider-CWoSfmfP.js",
        "/assets/urls-DIAei6Vp.js",
        "/assets/database-tabs-DvZimEH-.js",
        "/assets/index-DyxeRtzf.js",
        "/assets/logger-BLqFwVWq.js",
        "/assets/lifecycle-events-Cn4S9rt8.js",
        "/assets/Header-B0QkzPuy.js",
        "/assets/config-DG6yYR4n.js",
        "/assets/classNames-BM_Cwa33.js",
        "/assets/Logo-LdsYBklI.js",
        "/assets/Link-CE2WXvQp.js",
        "/assets/Avatar-BaixDSjP.js",
        "/assets/store-dau9lu-f.js",
        "/assets/index-ApXL96Jy.js",
        "/assets/ai-ptijkNWq.js",
        "/assets/index-DRXXH9YX.js",
        "/assets/chat-started-DnFATCws.js",
        "/assets/noops-TSSrUl-c.js",
        "/assets/page-visibility-6WPc68Q5.js",
        "/assets/util-C8pwnKxy.js",
        "/assets/url-Cws4dZ32.js",
        "/assets/index-BwBwXA76.js",
        "/assets/text_line_stream-DtdTslVH.js",
        "/assets/path-C47uQrgn.js",
        "/assets/workDir-sxxUHiEw.js",
        "/assets/chat-hooks-BAqhNcy-.js",
        "/assets/download-rUGbmDk0.js",
        "/assets/retry-DX5j_tUn.js",
        "/assets/debounce-SvodA6N5.js",
        "/assets/plural-DHUPwgOU.js",
        "/assets/artifacts-DxQBXx56.js",
        "/assets/description-CjYtOCyk.js",
        "/assets/unreachable-dJ0nIuQ4.js",
        "/assets/projects-C4tFyRTs.js",
        "/assets/useQuery-DdV1-BIE.js",
        "/assets/query-B76Wiy5M.js",
        "/assets/useMutation-ORLi4bPc.js",
        "/assets/mutation-BN55KS5u.js",
        "/assets/openWithStackblitzAuth-D0TMuezl.js",
        "/assets/menu-A2GXftJB.js",
        "/assets/useProjectsOwnerContext-BYx03_vE.js",
        "/assets/user-DYxDnlA7.js",
        "/assets/useProjectRename-JoKXpwMk.js",
        "/assets/animationVariants-Bv1Hcyis.js",
        "/assets/easings-BDvTs3Wp.js",
        "/assets/teamTemplates-C4oNwVfd.js",
        "/assets/queryOptions-dfte2Pzq.js",
        "/assets/mutationOptions-DuEc1oJu.js",
        "/assets/version-history-DIpAZG-Z.js",
        "/assets/LazyLoadWrapper-4XVlJP6o.js",
        "/assets/LightRays.client-BSVgysmx.js",
        "/assets/LightRaysCore-DtpFr9mX.js",
        "/assets/LightRays.module-Bxd9H68z.js",
        "/assets/LoadingDots-C8V_WRqk.js",
        "/assets/BoltLogoSimple-DkgFDo4D.js",
        "/assets/infiniteQueryBehavior-hB9lIGYN.js"
      ],
      "css": [
        "/assets/EmptyState-scVdpVyl.css#",
        "/assets/root-BDr8v2JC.css",
        "/assets/login-D3NdLlkk.css#",
        "/assets/LightRays-apN2LHcc.css#"
      ]
    },
    "routes/_chat": {
      "id": "routes/_chat",
      "parentId": "root",
      "hasAction": false,
      "hasLoader": true,
      "hasClientAction": false,
      "hasClientLoader": false,
      "hasClientMiddleware": false,
      "hasDefaultExport": true,
      "hasErrorBoundary": false,
      "module": "/assets/_chat-Dshb15Ox.js",
      "imports": [
        "/assets/preload-helper-2mcYJXfA.js",
        "/assets/react-vendor-DFS8c0-u.js",
        "/assets/index-DkUFz90d.js",
        "/assets/client-only-DwosFz52.js",
        "/assets/EmptyState-B4uq9z6n.js",
        "/assets/AgentSwitchDialog-Cg1xMxjV.js",
        "/assets/index-DcbV6Jek.js",
        "/assets/Toast-DBjQyIqs.js",
        "/assets/organizations-B-XNwEwJ.js",
        "/assets/constants-DUULTuzt.js",
        "/assets/useV1AgentRetired-m4ZsQlMd.js",
        "/assets/MembersTable-BYW7kcOr.js",
        "/assets/designSystemStepper-zDM7dWl0.js",
        "/assets/persistentBanner-4G5KdMFK.js",
        "/assets/team-CghZTPY6.js",
        "/assets/classNames-BM_Cwa33.js",
        "/assets/withSpinner-DGE-K6ya.js",
        "/assets/analytics-CCqpfHQz.js",
        "/assets/registration-C_mZCv07.js",
        "/assets/settings-CQiZzHIQ.js",
        "/assets/MemberDescription-DfMd2lu7.js",
        "/assets/TransferProjectDialogContent-BUNIp32q.js",
        "/assets/store-dau9lu-f.js",
        "/assets/description-CjYtOCyk.js",
        "/assets/site-protection-Bm94ydNc.js",
        "/assets/useFeatureFlags-BjUJ-NRG.js",
        "/assets/Alert-DZyNlf_T.js",
        "/assets/useDesignSystemMutationHelpers-BgDM5eEx.js",
        "/assets/useDesignSystemDraft-DyYFcnaS.js",
        "/assets/useDesignSystems-BIYgHZEW.js",
        "/assets/config-DG6yYR4n.js",
        "/assets/urls-DIAei6Vp.js",
        "/assets/menu-A2GXftJB.js",
        "/assets/logger-BLqFwVWq.js",
        "/assets/index-hujMIAWZ.js",
        "/assets/useQuery-DdV1-BIE.js",
        "/assets/StripeLogo-B38cJnFA.js",
        "/assets/index-ApXL96Jy.js",
        "/assets/queryOptions-dfte2Pzq.js",
        "/assets/PricingSelector-BFzCGW48.js",
        "/assets/format-FBMKGxjf.js",
        "/assets/organizations-Cct6gh6F.js",
        "/assets/retry-DX5j_tUn.js",
        "/assets/LazyLoadWrapper-4XVlJP6o.js",
        "/assets/IndexLayout-BQxawyl9.js",
        "/assets/meta-CSEI1Gr2.js",
        "/assets/noops-TSSrUl-c.js",
        "/assets/bundle-mjs-5MOacnAK.js",
        "/assets/app-version-TgcyjiPD.js",
        "/assets/sentry.client-B583diln.js",
        "/assets/index-DRXXH9YX.js",
        "/assets/chat-started-DnFATCws.js",
        "/assets/page-visibility-6WPc68Q5.js",
        "/assets/cello-attribution-Biq_3tnl.js",
        "/assets/util-C8pwnKxy.js",
        "/assets/url-Cws4dZ32.js",
        "/assets/index-BwBwXA76.js",
        "/assets/chat-hooks-BAqhNcy-.js",
        "/assets/agent-DLQxbdNA.js",
        "/assets/growthbook-1Nz0whI3.js",
        "/assets/SearchInput-B0olF-a6.js",
        "/assets/debounce-SvodA6N5.js",
        "/assets/ActionMenu-B3rzkx3R.js",
        "/assets/useRequestUpgrade-Cc1znSCz.js",
        "/assets/AccountDisplay-AsiqhGa4.js",
        "/assets/Avatar-BaixDSjP.js",
        "/assets/plan-info-BKYKcyi_.js",
        "/assets/ClippedTextTooltip-BZMWvqpa.js",
        "/assets/Pagination-Cd3A1WpJ.js",
        "/assets/usePaginatedData-DWNLe8aJ.js",
        "/assets/openWithStackblitzAuth-D0TMuezl.js",
        "/assets/plural-DHUPwgOU.js",
        "/assets/index-DyxeRtzf.js",
        "/assets/theme-DrfSRIs9.js",
        "/assets/lifecycle-events-Cn4S9rt8.js",
        "/assets/confetti.module-W9IyG_S9.js",
        "/assets/LoadingDots-C8V_WRqk.js",
        "/assets/netlify-DdTwHWa8.js",
        "/assets/QueryClientProvider-CWoSfmfP.js",
        "/assets/useMutation-ORLi4bPc.js",
        "/assets/mutation-BN55KS5u.js",
        "/assets/projects-C4tFyRTs.js",
        "/assets/sites-DAYwIqIZ.js",
        "/assets/AccountSelectMenu-CyveSxMy.js",
        "/assets/Link-CE2WXvQp.js",
        "/assets/animationVariants-Bv1Hcyis.js",
        "/assets/easings-BDvTs3Wp.js",
        "/assets/domains-BVrci1_5.js",
        "/assets/designSystems-BkBnxKHY.js",
        "/assets/mutationOptions-DuEc1oJu.js",
        "/assets/index-Bbfe3ZR4.js",
        "/assets/query-B76Wiy5M.js",
        "/assets/ai-ptijkNWq.js",
        "/assets/text_line_stream-DtdTslVH.js",
        "/assets/path-C47uQrgn.js",
        "/assets/workDir-sxxUHiEw.js",
        "/assets/download-rUGbmDk0.js",
        "/assets/artifacts-DxQBXx56.js",
        "/assets/unreachable-dJ0nIuQ4.js",
        "/assets/Logo-LdsYBklI.js",
        "/assets/Header-B0QkzPuy.js",
        "/assets/login-CmtXJQP0.js",
        "/assets/login-XafVWru6.js",
        "/assets/BoltLogoSimple-DkgFDo4D.js",
        "/assets/useProjectsOwnerContext-BYx03_vE.js",
        "/assets/user-DYxDnlA7.js",
        "/assets/useProjectRename-JoKXpwMk.js",
        "/assets/teamTemplates-C4oNwVfd.js",
        "/assets/version-history-DIpAZG-Z.js",
        "/assets/index-KQgO_-kF.js",
        "/assets/index-JRXZ0H6Y.js",
        "/assets/index-BR8qDd1J.js",
        "/assets/formatDistanceToNow-COqANUcj.js",
        "/assets/constructNow-9vxuxKIZ.js",
        "/assets/command-BdUc-NRs.js",
        "/assets/AccountSelector.client-D2IwIMe8.js",
        "/assets/teamPlans-Db9phX9H.js",
        "/assets/github-BDnUX5Hh.js",
        "/assets/cello-config-BXEYGcji.js",
        "/assets/authFlowRoutes-0PvSSBdp.js",
        "/assets/proctor-Dbcms9d6.js",
        "/assets/init-ref-BMTlAF2a.js",
        "/assets/Sheet-Cj1esrt6.js",
        "/assets/subscription-C590ywkg.js",
        "/assets/useInitializeUserStore-D257I7Q1.js",
        "/assets/useApplicationOAuthError-BAw5TCUK.js"
      ],
      "css": [
        "/assets/EmptyState-scVdpVyl.css#",
        "/assets/login-D3NdLlkk.css#"
      ]
    },
    "routes/_chat.~.$slug": {
      "id": "routes/_chat.~.$slug",
      "parentId": "routes/_chat",
      "path": "~/:slug",
      "hasAction": false,
      "hasLoader": true,
      "hasClientAction": false,
      "hasClientLoader": false,
      "hasClientMiddleware": false,
      "hasDefaultExport": true,
      "hasErrorBoundary": false,
      "module": "/assets/_chat.~._slug-DCz-fsoa.js",
      "imports": [
        "/assets/react-vendor-DFS8c0-u.js",
        "/assets/EmptyState-B4uq9z6n.js",
        "/assets/client-only-DwosFz52.js",
        "/assets/Chat.client-D0ETzo8t.js",
        "/assets/Toast-DBjQyIqs.js",
        "/assets/index-ApXL96Jy.js",
        "/assets/analytics-CCqpfHQz.js",
        "/assets/lifecycle-events-Cn4S9rt8.js",
        "/assets/constants-DUULTuzt.js",
        "/assets/store-dau9lu-f.js",
        "/assets/index-DcbV6Jek.js",
        "/assets/settings-CQiZzHIQ.js",
        "/assets/github-BDnUX5Hh.js",
        "/assets/useProjectCollaborationV2-BEth4DY0.js",
        "/assets/agent-DLQxbdNA.js",
        "/assets/description-CjYtOCyk.js",
        "/assets/logger-BLqFwVWq.js",
        "/assets/index-hujMIAWZ.js",
        "/assets/index-DkUFz90d.js",
        "/assets/database-tabs-DvZimEH-.js",
        "/assets/sites-DAYwIqIZ.js",
        "/assets/chat-hooks-BAqhNcy-.js",
        "/assets/sentry.client-B583diln.js",
        "/assets/noops-TSSrUl-c.js",
        "/assets/meta-CSEI1Gr2.js",
        "/assets/bundle-mjs-5MOacnAK.js",
        "/assets/index-CbycKnko.js",
        "/assets/index-DyxeRtzf.js",
        "/assets/index-JRXZ0H6Y.js",
        "/assets/index-BR8qDd1J.js",
        "/assets/stripIndents-pFh2tRUP.js",
        "/assets/Markdown-CGkdVErq.js",
        "/assets/Alert-DZyNlf_T.js",
        "/assets/version-history-DIpAZG-Z.js",
        "/assets/workDir-sxxUHiEw.js",
        "/assets/index-DRXXH9YX.js",
        "/assets/theme-DrfSRIs9.js",
        "/assets/preload-helper-2mcYJXfA.js",
        "/assets/app-version-TgcyjiPD.js",
        "/assets/chat-started-DnFATCws.js",
        "/assets/page-visibility-6WPc68Q5.js",
        "/assets/classNames-BM_Cwa33.js",
        "/assets/index-B2AMVukF.js",
        "/assets/easings-BDvTs3Wp.js",
        "/assets/unreachable-dJ0nIuQ4.js",
        "/assets/stripe-tm7B9iTw.js",
        "/assets/withSpinner-DGE-K6ya.js",
        "/assets/Link-CE2WXvQp.js",
        "/assets/deploy.client-AgLypZGJ.js",
        "/assets/UpgradeLink-BsXBzeo9.js",
        "/assets/team-CghZTPY6.js",
        "/assets/config-DG6yYR4n.js",
        "/assets/openWithStackblitzAuth-D0TMuezl.js",
        "/assets/util-C8pwnKxy.js",
        "/assets/url-Cws4dZ32.js",
        "/assets/index-BwBwXA76.js",
        "/assets/cello-attribution-Biq_3tnl.js",
        "/assets/urls-DIAei6Vp.js",
        "/assets/organizations-B-XNwEwJ.js",
        "/assets/plural-DHUPwgOU.js",
        "/assets/useFreeTrialVariant-BLIHvhYP.js",
        "/assets/growthbook-1Nz0whI3.js",
        "/assets/SupabaseConfigurationDialog.client-Bd1T2MX2.js",
        "/assets/command-BdUc-NRs.js",
        "/assets/ai-ptijkNWq.js",
        "/assets/text_line_stream-DtdTslVH.js",
        "/assets/path-C47uQrgn.js",
        "/assets/download-rUGbmDk0.js",
        "/assets/retry-DX5j_tUn.js",
        "/assets/debounce-SvodA6N5.js",
        "/assets/artifacts-DxQBXx56.js",
        "/assets/site-protection-Bm94ydNc.js",
        "/assets/domains-BVrci1_5.js",
        "/assets/useQuery-DdV1-BIE.js",
        "/assets/QueryClientProvider-CWoSfmfP.js",
        "/assets/query-B76Wiy5M.js",
        "/assets/queryOptions-dfte2Pzq.js",
        "/assets/useMutation-ORLi4bPc.js",
        "/assets/mutation-BN55KS5u.js",
        "/assets/csv-DNicIMRr.js",
        "/assets/useApplications-wyz5raez.js",
        "/assets/Header-B0QkzPuy.js",
        "/assets/login-CmtXJQP0.js",
        "/assets/login-XafVWru6.js",
        "/assets/registration-C_mZCv07.js",
        "/assets/LoadingDots-C8V_WRqk.js",
        "/assets/BoltLogoSimple-DkgFDo4D.js",
        "/assets/Logo-LdsYBklI.js",
        "/assets/Avatar-BaixDSjP.js",
        "/assets/projects-C4tFyRTs.js",
        "/assets/menu-A2GXftJB.js",
        "/assets/useProjectsOwnerContext-BYx03_vE.js",
        "/assets/user-DYxDnlA7.js",
        "/assets/useProjectRename-JoKXpwMk.js",
        "/assets/animationVariants-Bv1Hcyis.js",
        "/assets/teamTemplates-C4oNwVfd.js",
        "/assets/mutationOptions-DuEc1oJu.js",
        "/assets/LazyLoadWrapper-4XVlJP6o.js",
        "/assets/UpgradePlanDialogs-Cti5i4Ty.js",
        "/assets/ProPlansCard-Cq1ROd91.js",
        "/assets/PricingSelector-BFzCGW48.js",
        "/assets/format-FBMKGxjf.js",
        "/assets/TeamPlansCard-C0sraFks.js",
        "/assets/teamPlans-Db9phX9H.js",
        "/assets/useFeatureFlags-BjUJ-NRG.js",
        "/assets/tokens-stats-BWsF6vgl.js",
        "/assets/formatDistanceToNow-COqANUcj.js",
        "/assets/constructNow-9vxuxKIZ.js",
        "/assets/parseISO-C_HjKyON.js",
        "/assets/designSystemStepper-zDM7dWl0.js",
        "/assets/useDesignSystemDraft-DyYFcnaS.js",
        "/assets/AccountDisplay-AsiqhGa4.js",
        "/assets/plan-info-BKYKcyi_.js",
        "/assets/ClippedTextTooltip-BZMWvqpa.js",
        "/assets/AccountSelectMenu-CyveSxMy.js",
        "/assets/DesignSources-Csmnawg6.js",
        "/assets/zod-BOxl0May.js",
        "/assets/index.esm-DoGqQlne.js",
        "/assets/index-DuQ2pUCS.js",
        "/assets/getDefaultOptions-BkjKNS_P.js",
        "/assets/TextArea-rzg2-qGQ.js",
        "/assets/init-ref-BMTlAF2a.js",
        "/assets/ProgressBar-DyYbW4ip.js",
        "/assets/ActionMenu-B3rzkx3R.js",
        "/assets/MemberDescription-DfMd2lu7.js",
        "/assets/confetti.module-W9IyG_S9.js",
        "/assets/useDesignSystems-BIYgHZEW.js",
        "/assets/designSystems-BkBnxKHY.js",
        "/assets/index-Bbfe3ZR4.js",
        "/assets/ConfirmationDialog.client-BX-rM-hp.js",
        "/assets/Prompt-CPMw9o2M.js",
        "/assets/scroll-overflow-mask-qbmlsycm.js",
        "/assets/useV1AgentRetired-m4ZsQlMd.js",
        "/assets/index-7gO_P7I8.js",
        "/assets/skill-frontmatter-DTYyFnVU.js",
        "/assets/jszip.min-DhG_DPen.js",
        "/assets/store-OUx78_yR.js",
        "/assets/selectors-CWa3blmw.js",
        "/assets/Sheet-Cj1esrt6.js",
        "/assets/subscription-C590ywkg.js",
        "/assets/useSelectedDesignSystem-BN8Oq_2p.js",
        "/assets/mcp-known-servers-C1cI3xF0.js",
        "/assets/mcp-D4HLsS9S.js",
        "/assets/useEnsureSkillsLoaded-BjHsAnjm.js",
        "/assets/persistentBanner-4G5KdMFK.js",
        "/assets/import-figma-CO2Y9XNI.js",
        "/assets/figma-Z9eq1avG.js",
        "/assets/StripeLogo-B38cJnFA.js",
        "/assets/Footer-BlANq9IK.js",
        "/assets/DiscordSupportModal.client-CTdTcrRH.js",
        "/assets/AgentSwitchDialog-Cg1xMxjV.js",
        "/assets/utils-B8-fJJrx.js",
        "/assets/useTrackOnMount-C2B265Jf.js",
        "/assets/compare-IkewsJlg-CZqd2GR-.js",
        "/assets/SearchInput-B0olF-a6.js",
        "/assets/proctor-Dbcms9d6.js",
        "/assets/differenceInDays-Cp7owLqy.js",
        "/assets/isYesterday-gfcWJeP4.js",
        "/assets/addDays-CqaFVKcq.js",
        "/assets/TransferProjectDialogContent-BUNIp32q.js",
        "/assets/netlify-DdTwHWa8.js",
        "/assets/sso-B66j0Kcf.js",
        "/assets/AllProjects-CNsr67s4.js",
        "/assets/FiltersBar-BGN0FsWG.js",
        "/assets/Pagination-Cd3A1WpJ.js",
        "/assets/RecentProjects-Df8xcfdk.js",
        "/assets/ErrorBoundary-nf1YnF8u.js",
        "/assets/LightRays.client-BSVgysmx.js",
        "/assets/LightRaysCore-DtpFr9mX.js",
        "/assets/LightRays.module-Bxd9H68z.js",
        "/assets/queryClient-BKSf7pHs.js",
        "/assets/infiniteQueryBehavior-hB9lIGYN.js",
        "/assets/usePaginatedData-DWNLe8aJ.js",
        "/assets/sheetNavigation-B3KuRHxI.js",
        "/assets/command-DsKLnxB7.js",
        "/assets/index-KQgO_-kF.js",
        "/assets/chart-DdzRD9Kn.js",
        "/assets/serialize-messages-B2Ycr75j.js",
        "/assets/index-BDJlJzHK.js",
        "/assets/cello-config-BXEYGcji.js",
        "/assets/client-error-DejbHZY5.js",
        "/assets/support-BAxtWPS-.js",
        "/assets/theme-CaxmedKW.js",
        "/assets/unpublish-project-Dp98898e.js",
        "/assets/organizationMembers-B873SvzC.js",
        "/assets/organizations-Cct6gh6F.js",
        "/assets/breadcrumbs-BBDL7Ot9.js",
        "/assets/mcp-oauth-listener--b-hiiIl.js",
        "/assets/index-C_s9gSTi.js",
        "/assets/prepare-body-BaZ3cpAp.js",
        "/assets/usePaymentIntentStatusMessage-Pc_YX8Lb.js",
        "/assets/authFlowRoutes-0PvSSBdp.js"
      ],
      "css": [
        "/assets/EmptyState-scVdpVyl.css#",
        "/assets/Chat-C-pxZWHb.css#",
        "/assets/Markdown-DOeOYkw8.css#",
        "/assets/login-D3NdLlkk.css#",
        "/assets/Prompt-1LVg7nBt.css#",
        "/assets/LightRays-apN2LHcc.css#"
      ]
    },
    "routes/_chat.~.$slug._index": {
      "id": "routes/_chat.~.$slug._index",
      "parentId": "routes/_chat.~.$slug",
      "index": true,
      "hasAction": false,
      "hasLoader": false,
      "hasClientAction": false,
      "hasClientLoader": false,
      "hasClientMiddleware": false,
      "hasDefaultExport": true,
      "hasErrorBoundary": false,
      "module": "/assets/_chat.~._slug._index-C1-WmLUQ.js",
      "imports": [
        "/assets/react-vendor-DFS8c0-u.js"
      ],
      "css": []
    },
    "routes/_chat._index": {
      "id": "routes/_chat._index",
      "parentId": "routes/_chat",
      "index": true,
      "hasAction": false,
      "hasLoader": false,
      "hasClientAction": false,
      "hasClientLoader": false,
      "hasClientMiddleware": false,
      "hasDefaultExport": true,
      "hasErrorBoundary": false,
      "module": "/assets/_chat._index-75s6Clj0.js",
      "imports": [
        "/assets/react-vendor-DFS8c0-u.js",
        "/assets/client-only-DwosFz52.js",
        "/assets/Chat.client-D0ETzo8t.js",
        "/assets/constants-DUULTuzt.js",
        "/assets/index-DcbV6Jek.js",
        "/assets/preload-helper-2mcYJXfA.js",
        "/assets/settings-CQiZzHIQ.js",
        "/assets/index-DRXXH9YX.js",
        "/assets/logger-BLqFwVWq.js",
        "/assets/index-hujMIAWZ.js",
        "/assets/analytics-CCqpfHQz.js",
        "/assets/app-version-TgcyjiPD.js",
        "/assets/sentry.client-B583diln.js",
        "/assets/index-DyxeRtzf.js",
        "/assets/EmptyState-B4uq9z6n.js",
        "/assets/bundle-mjs-5MOacnAK.js",
        "/assets/Toast-DBjQyIqs.js",
        "/assets/chat-started-DnFATCws.js",
        "/assets/noops-TSSrUl-c.js",
        "/assets/page-visibility-6WPc68Q5.js",
        "/assets/index-CbycKnko.js",
        "/assets/index-ApXL96Jy.js",
        "/assets/ai-ptijkNWq.js",
        "/assets/util-C8pwnKxy.js",
        "/assets/url-Cws4dZ32.js",
        "/assets/index-BwBwXA76.js",
        "/assets/lifecycle-events-Cn4S9rt8.js",
        "/assets/text_line_stream-DtdTslVH.js",
        "/assets/path-C47uQrgn.js",
        "/assets/workDir-sxxUHiEw.js",
        "/assets/store-dau9lu-f.js",
        "/assets/chat-hooks-BAqhNcy-.js",
        "/assets/index-DkUFz90d.js",
        "/assets/download-rUGbmDk0.js",
        "/assets/retry-DX5j_tUn.js",
        "/assets/urls-DIAei6Vp.js",
        "/assets/debounce-SvodA6N5.js",
        "/assets/plural-DHUPwgOU.js",
        "/assets/artifacts-DxQBXx56.js",
        "/assets/description-CjYtOCyk.js",
        "/assets/unreachable-dJ0nIuQ4.js",
        "/assets/index-JRXZ0H6Y.js",
        "/assets/index-BR8qDd1J.js",
        "/assets/stripIndents-pFh2tRUP.js",
        "/assets/Markdown-CGkdVErq.js",
        "/assets/Alert-DZyNlf_T.js",
        "/assets/version-history-DIpAZG-Z.js",
        "/assets/theme-DrfSRIs9.js",
        "/assets/classNames-BM_Cwa33.js",
        "/assets/index-B2AMVukF.js",
        "/assets/easings-BDvTs3Wp.js",
        "/assets/stripe-tm7B9iTw.js",
        "/assets/withSpinner-DGE-K6ya.js",
        "/assets/Link-CE2WXvQp.js",
        "/assets/database-tabs-DvZimEH-.js",
        "/assets/deploy.client-AgLypZGJ.js",
        "/assets/UpgradeLink-BsXBzeo9.js",
        "/assets/team-CghZTPY6.js",
        "/assets/config-DG6yYR4n.js",
        "/assets/openWithStackblitzAuth-D0TMuezl.js",
        "/assets/cello-attribution-Biq_3tnl.js",
        "/assets/organizations-B-XNwEwJ.js",
        "/assets/useFreeTrialVariant-BLIHvhYP.js",
        "/assets/growthbook-1Nz0whI3.js",
        "/assets/SupabaseConfigurationDialog.client-Bd1T2MX2.js",
        "/assets/command-BdUc-NRs.js",
        "/assets/site-protection-Bm94ydNc.js",
        "/assets/domains-BVrci1_5.js",
        "/assets/useQuery-DdV1-BIE.js",
        "/assets/QueryClientProvider-CWoSfmfP.js",
        "/assets/query-B76Wiy5M.js",
        "/assets/queryOptions-dfte2Pzq.js",
        "/assets/useMutation-ORLi4bPc.js",
        "/assets/mutation-BN55KS5u.js",
        "/assets/csv-DNicIMRr.js",
        "/assets/useApplications-wyz5raez.js",
        "/assets/Header-B0QkzPuy.js",
        "/assets/login-CmtXJQP0.js",
        "/assets/login-XafVWru6.js",
        "/assets/registration-C_mZCv07.js",
        "/assets/LoadingDots-C8V_WRqk.js",
        "/assets/BoltLogoSimple-DkgFDo4D.js",
        "/assets/Logo-LdsYBklI.js",
        "/assets/Avatar-BaixDSjP.js",
        "/assets/projects-C4tFyRTs.js",
        "/assets/menu-A2GXftJB.js",
        "/assets/useProjectsOwnerContext-BYx03_vE.js",
        "/assets/user-DYxDnlA7.js",
        "/assets/useProjectRename-JoKXpwMk.js",
        "/assets/animationVariants-Bv1Hcyis.js",
        "/assets/teamTemplates-C4oNwVfd.js",
        "/assets/mutationOptions-DuEc1oJu.js",
        "/assets/LazyLoadWrapper-4XVlJP6o.js",
        "/assets/UpgradePlanDialogs-Cti5i4Ty.js",
        "/assets/ProPlansCard-Cq1ROd91.js",
        "/assets/PricingSelector-BFzCGW48.js",
        "/assets/format-FBMKGxjf.js",
        "/assets/TeamPlansCard-C0sraFks.js",
        "/assets/teamPlans-Db9phX9H.js",
        "/assets/useFeatureFlags-BjUJ-NRG.js",
        "/assets/tokens-stats-BWsF6vgl.js",
        "/assets/formatDistanceToNow-COqANUcj.js",
        "/assets/constructNow-9vxuxKIZ.js",
        "/assets/parseISO-C_HjKyON.js",
        "/assets/designSystemStepper-zDM7dWl0.js",
        "/assets/useDesignSystemDraft-DyYFcnaS.js",
        "/assets/AccountDisplay-AsiqhGa4.js",
        "/assets/plan-info-BKYKcyi_.js",
        "/assets/ClippedTextTooltip-BZMWvqpa.js",
        "/assets/AccountSelectMenu-CyveSxMy.js",
        "/assets/DesignSources-Csmnawg6.js",
        "/assets/zod-BOxl0May.js",
        "/assets/index.esm-DoGqQlne.js",
        "/assets/index-DuQ2pUCS.js",
        "/assets/getDefaultOptions-BkjKNS_P.js",
        "/assets/TextArea-rzg2-qGQ.js",
        "/assets/init-ref-BMTlAF2a.js",
        "/assets/ProgressBar-DyYbW4ip.js",
        "/assets/ActionMenu-B3rzkx3R.js",
        "/assets/MemberDescription-DfMd2lu7.js",
        "/assets/confetti.module-W9IyG_S9.js",
        "/assets/useDesignSystems-BIYgHZEW.js",
        "/assets/designSystems-BkBnxKHY.js",
        "/assets/index-Bbfe3ZR4.js",
        "/assets/ConfirmationDialog.client-BX-rM-hp.js",
        "/assets/Prompt-CPMw9o2M.js",
        "/assets/scroll-overflow-mask-qbmlsycm.js",
        "/assets/useV1AgentRetired-m4ZsQlMd.js",
        "/assets/agent-DLQxbdNA.js",
        "/assets/index-7gO_P7I8.js",
        "/assets/skill-frontmatter-DTYyFnVU.js",
        "/assets/jszip.min-DhG_DPen.js",
        "/assets/store-OUx78_yR.js",
        "/assets/selectors-CWa3blmw.js",
        "/assets/Sheet-Cj1esrt6.js",
        "/assets/subscription-C590ywkg.js",
        "/assets/useSelectedDesignSystem-BN8Oq_2p.js",
        "/assets/mcp-known-servers-C1cI3xF0.js",
        "/assets/mcp-D4HLsS9S.js",
        "/assets/useEnsureSkillsLoaded-BjHsAnjm.js",
        "/assets/persistentBanner-4G5KdMFK.js",
        "/assets/import-figma-CO2Y9XNI.js",
        "/assets/figma-Z9eq1avG.js",
        "/assets/StripeLogo-B38cJnFA.js",
        "/assets/Footer-BlANq9IK.js",
        "/assets/DiscordSupportModal.client-CTdTcrRH.js",
        "/assets/AgentSwitchDialog-Cg1xMxjV.js",
        "/assets/utils-B8-fJJrx.js",
        "/assets/useTrackOnMount-C2B265Jf.js",
        "/assets/compare-IkewsJlg-CZqd2GR-.js",
        "/assets/SearchInput-B0olF-a6.js",
        "/assets/proctor-Dbcms9d6.js",
        "/assets/differenceInDays-Cp7owLqy.js",
        "/assets/isYesterday-gfcWJeP4.js",
        "/assets/addDays-CqaFVKcq.js",
        "/assets/TransferProjectDialogContent-BUNIp32q.js",
        "/assets/netlify-DdTwHWa8.js",
        "/assets/sites-DAYwIqIZ.js",
        "/assets/sso-B66j0Kcf.js",
        "/assets/AllProjects-CNsr67s4.js",
        "/assets/FiltersBar-BGN0FsWG.js",
        "/assets/Pagination-Cd3A1WpJ.js",
        "/assets/RecentProjects-Df8xcfdk.js",
        "/assets/github-BDnUX5Hh.js",
        "/assets/cello-config-BXEYGcji.js",
        "/assets/authFlowRoutes-0PvSSBdp.js",
        "/assets/ErrorBoundary-nf1YnF8u.js",
        "/assets/LightRays.client-BSVgysmx.js",
        "/assets/LightRaysCore-DtpFr9mX.js",
        "/assets/LightRays.module-Bxd9H68z.js",
        "/assets/queryClient-BKSf7pHs.js",
        "/assets/infiniteQueryBehavior-hB9lIGYN.js",
        "/assets/useProjectCollaborationV2-BEth4DY0.js",
        "/assets/usePaginatedData-DWNLe8aJ.js",
        "/assets/sheetNavigation-B3KuRHxI.js",
        "/assets/command-DsKLnxB7.js",
        "/assets/index-KQgO_-kF.js",
        "/assets/chart-DdzRD9Kn.js",
        "/assets/serialize-messages-B2Ycr75j.js",
        "/assets/index-BDJlJzHK.js",
        "/assets/client-error-DejbHZY5.js",
        "/assets/support-BAxtWPS-.js",
        "/assets/theme-CaxmedKW.js",
        "/assets/unpublish-project-Dp98898e.js",
        "/assets/organizationMembers-B873SvzC.js",
        "/assets/organizations-Cct6gh6F.js",
        "/assets/breadcrumbs-BBDL7Ot9.js",
        "/assets/mcp-oauth-listener--b-hiiIl.js",
        "/assets/index-C_s9gSTi.js",
        "/assets/prepare-body-BaZ3cpAp.js",
        "/assets/usePaymentIntentStatusMessage-Pc_YX8Lb.js"
      ],
      "css": [
        "/assets/Chat-C-pxZWHb.css#",
        "/assets/EmptyState-scVdpVyl.css#",
        "/assets/Markdown-DOeOYkw8.css#",
        "/assets/login-D3NdLlkk.css#",
        "/assets/Prompt-1LVg7nBt.css#",
        "/assets/LightRays-apN2LHcc.css#"
      ]
    },
    "routes/$slug": {
      "id": "routes/$slug",
      "parentId": "root",
      "path": ":slug",
      "hasAction": false,
      "hasLoader": true,
      "hasClientAction": false,
      "hasClientLoader": false,
      "hasClientMiddleware": false,
      "hasDefaultExport": true,
      "hasErrorBoundary": false,
      "module": "/assets/_slug-BCzp-jG3.js",
      "imports": [
        "/assets/react-vendor-DFS8c0-u.js"
      ],
      "css": []
    }
  },
  "url": "/assets/manifest-d25ae2a9.js",
  "version": "d25ae2a9"
};
  window.__reactRouterRouteModules = {"root":route0,"routes/_chat":route1,"routes/_chat.~.$slug":route2,"routes/_chat.~.$slug._index":route3};

import("/assets/entry.client-DGxdQAc4.js");</script></body></html><!--$?--><template id="B:0"></template><!--/$--><div hidden id="S:0"><script>window.__reactRouterContext.streamController.enqueue("[{\"_1\":2,\"_3\":-5,\"_4\":-5},\"loaderData\",{\"_5\":6,\"_7\":8,\"_9\":10},\"actionData\",\"errors\",\"root\",{\"_28\":-7,\"_29\":30,\"_19\":-5,\"_31\":32,\"_33\":34,\"_35\":36,\"_37\":16,\"_38\":16,\"_39\":40,\"_41\":42,\"_43\":44,\"_45\":46},\"routes/_chat\",{\"_19\":-5},\"routes/_chat.~.$slug\",{\"_11\":12,\"_13\":14,\"_15\":16,\"_17\":18,\"_19\":-5,\"_20\":-7,\"_21\":-5,\"_22\":-5},\"slug\",\"index.md\",\"projectId\",\"null\",\"collaborationV2\",false,\"projectInfo\",{\"_23\":-5,\"_24\":14,\"_11\":12,\"_25\":26,\"_27\":-5},\"user\",\"github\",\"chatAgent\",\"chatModel\",\"description\",\"id\",\"title\",\"Index.Md (duplicated)\",\"storageUid\",\"banner\",\"growthbookPayload\",{\"_54\":55,\"_56\":57,\"_58\":59,\"_60\":61},\"serverTime\",\"2026-08-07T13:57:20.999Z\",\"country\",\"HK\",\"cello\",{\"_47\":16,\"_48\":49,\"_50\":51,\"_52\":53},\"isMobileExperience\",\"sidebarCollapsed\",\"turnstileSiteKey\",\"0x4AAAAAABt_LacRZZp7J2A6\",\"swk\",\"ta1kDK49qdEDEfd8KYxI37mW0GPkLKn1\",\"gbk\",\"sdk-ye5YC6vB6I5SoRX\",\"ldk\",\"691f98ebed094f09c14ffbeb\",\"enabled\",\"configured\",true,\"scriptSrc\",\"https://assets.cello.so/app/latest/cello.js\",\"attributionScriptSrc\",\"https://assets.cello.so/attribution/latest/cello-attribution.js\",\"status\",200,\"features\",{\"_62\":63,\"_64\":65,\"_66\":67,\"_68\":69,\"_70\":71,\"_72\":73,\"_74\":75,\"_76\":77,\"_78\":79,\"_80\":81,\"_82\":83,\"_84\":85,\"_86\":87,\"_88\":89,\"_90\":91,\"_92\":93,\"_94\":95,\"_96\":97,\"_98\":99},\"experiments\",[],\"dateUpdated\",\"2026-08-07T12:36:49.479Z\",\"insta-teams\",{\"_100\":16},\"team-aware-switcher\",{\"_100\":16},\"plan-mode-enable\",{\"_100\":16},\"free-trial-popup\",{\"_100\":636},\"free-tier-min-messages-per-day\",{\"_100\":352,\"_102\":574},\"anthropic-model-provider\",{\"_100\":562,\"_102\":563},\"glm-5-1-provider\",{\"_100\":316},\"standard-model-routing\",{\"_100\":370,\"_102\":371},\"max-model-routing\",{\"_100\":331,\"_102\":332},\"harness\",{\"_100\":330},\"kimi-k2-6-provider\",{\"_100\":316},\"glm-5-2-provider\",{\"_100\":316,\"_102\":317},\"google_one_tap\",{\"_100\":16,\"_102\":303},\"send-button-exp\",{\"_100\":16},\"retention-coupon\",{\"_100\":201,\"_102\":202},\"gateway-route-limits\",{\"_100\":148,\"_102\":149},\"agent-activity\",{\"_100\":16,\"_102\":111},\"retire-v1-agent\",{\"_100\":16,\"_102\":108},\"multimodal-failback-model\",{\"_100\":101,\"_102\":103},\"defaultValue\",\"claude-sonnet-4-6\",\"rules\",[104],{\"_24\":105,\"_106\":107},\"fr_msdu2ktp\",\"force\",\"gpt-5.6-luna\",[109],{\"_24\":110,\"_106\":49},\"fr_msdl4qvv\",[112,113],{\"_24\":118,\"_115\":119,\"_120\":121,\"_122\":24,\"_123\":124,\"_125\":126,\"_127\":124,\"_128\":129,\"_130\":131,\"_132\":133,\"_134\":135,\"_136\":137},{\"_24\":114,\"_115\":116,\"_106\":49},\"fr_mrxejxl3\",\"condition\",{\"_117\":49},\"internal\",\"fr_19g6mmrumev5o\",{\"_143\":16,\"_144\":145},\"coverage\",1,\"hashAttribute\",\"bucketVersion\",2,\"seed\",\"d531ee26-396d-4c26-8cc1-f2fe6635fe19\",\"hashVersion\",\"variations\",[16,49],\"weights\",[141,142],\"key\",\"agent-activity-ui\",\"meta\",[138,139],\"phase\",\"1\",{\"_132\":140},{\"_132\":137},\"0\",0.9,0.1,\"isPaid\",\"createdAt\",{\"_146\":147},\"$gt\",\"2026-07-27T00:00\",{\"_153\":199,\"_155\":200},[150],{\"_24\":151,\"_106\":152},\"fr_mrl5c69w\",{\"_153\":154,\"_155\":156},\"mode\",\"enforce\",\"routes\",{\"_157\":158,\"_159\":160,\"_161\":162,\"_163\":164,\"_165\":166,\"_167\":168,\"_169\":170,\"_171\":172,\"_173\":174,\"_175\":176,\"_177\":178,\"_179\":180,\"_181\":182,\"_183\":184},\"azure-foundry-oss/glm-5.2\",{\"_185\":198},\"azure-foundry-claude/claude-opus-5\",{\"_185\":187},\"azure-foundry-claude/claude-opus-4-6\",{\"_185\":197},\"azure-foundry-claude/claude-opus-4-7\",{\"_185\":196},\"azure-foundry-claude/claude-opus-4-8\",{\"_185\":195},\"azure-foundry-claude/claude-sonnet-4-6\",{\"_185\":194},\"baseten-dedicated/glm-5.2\",{\"_185\":193},\"baseten-mapi/glm-5.2\",{\"_185\":192},\"baseten-mapi/kimi-k3\",{\"_185\":191},\"bedrock/gpt-5.6-sol\",{\"_185\":190},\"bedrock/gpt-5.6-terra\",{\"_185\":190},\"bedrock/gpt-5.6-luna\",{\"_185\":189},\"bedrock/claude-fable-5\",{\"_185\":187,\"_188\":49},\"azure-foundry-claude/claude-fable-5\",{\"_185\":186},\"itpm\",1899000,9500000,\"disabled\",47500000,19000000,9000000,3000000,100000000,23749000,18999000,15199000,9499000,30000000,\"off\",{},{},[203,204],{\"_24\":262,\"_115\":263,\"_120\":121,\"_122\":24,\"_123\":121,\"_125\":264,\"_127\":124,\"_128\":265,\"_130\":266,\"_132\":267,\"_134\":268,\"_136\":140},{\"_24\":205,\"_115\":206,\"_120\":121,\"_122\":24,\"_123\":121,\"_125\":207,\"_127\":124,\"_128\":208,\"_130\":209,\"_132\":210,\"_134\":211,\"_136\":140},\"fr_19g6qmroxhvqj\",{\"_245\":246,\"_247\":248},\"dee60c23-8e9e-47f1-89ed-002cb94a8842\",[221,222,223,224,225],[220,220,220,220,220],\"cancellation-save-flow---pro-50-\",[212,213,214,215,216],{\"_132\":140},{\"_132\":137},{\"_132\":219},{\"_132\":218},{\"_132\":217},\"4\",\"3\",\"2\",0.2,{},{\"_226\":243,\"_228\":244,\"_230\":238,\"_232\":-5,\"_233\":241,\"_235\":242},{\"_226\":239,\"_228\":240,\"_230\":231,\"_232\":-5,\"_233\":241,\"_235\":242},{\"_226\":236,\"_228\":237,\"_230\":238,\"_232\":-5,\"_233\":234,\"_235\":-5},{\"_226\":227,\"_228\":229,\"_230\":231,\"_232\":-5,\"_233\":234,\"_235\":-5},\"coupon_id\",\"XhuX5u2E\",\"name\",\"33% off for 1 month\",\"percent_off\",33,\"amount_off\",\"duration\",\"once\",\"duration_in_months\",\"C0QNwnHJ\",\"50% off for 1 month\",50,\"DKuQ9DNy\",\"33% off for 3 months\",\"repeating\",3,\"lIpeHL6s\",\"50% off for 3 months\",\"tier\",{\"_249\":250},\"interval\",\"monthly\",\"$in\",[124,242,251,252,253,254,255,256,257,258,259,260,261],4,5,6,7,8,9,10,11,12,13,14,\"fr_19g6rmroxhp6r\",{\"_245\":121,\"_247\":248},\"2055f8c6-38b2-4cba-8c08-6a591c31de17\",[279,280,281,282,283,284,285],[278,278,278,278,278,278,278],\"cancellation-save-flow---pro-25\",[269,270,271,272,273,274,275],{\"_132\":140},{\"_132\":137},{\"_132\":219},{\"_132\":218},{\"_132\":217},{\"_132\":277},{\"_132\":276},\"6\",\"5\",0.14285714285714285,{},{\"_226\":301,\"_228\":302,\"_230\":-5,\"_232\":298,\"_233\":241,\"_235\":242},{\"_226\":299,\"_228\":300,\"_230\":-5,\"_232\":295,\"_233\":241,\"_235\":242},{\"_226\":296,\"_228\":297,\"_230\":-5,\"_232\":298,\"_233\":234,\"_235\":-5},{\"_226\":293,\"_228\":294,\"_230\":-5,\"_232\":295,\"_233\":234,\"_235\":-5},{\"_226\":290,\"_228\":291,\"_230\":292,\"_232\":-5,\"_233\":234,\"_235\":-5},{\"_226\":286,\"_228\":287,\"_230\":-5,\"_232\":288,\"_233\":289,\"_235\":-5},\"81No41IJ\",\"$9 Lite plan\",1600,\"forever\",\"UyfJr6Pl\",\"30-day pause\",100,\"3GAG19Cm\",\"$15 off for 1 month\",1500,\"uveycV0z\",\"$10 off for 1 month\",1000,\"CdP3CQfi\",\"$15 off for 3 months\",\"fMcAcvSX\",\"$10 off for 3 months\",[304],{\"_24\":305,\"_115\":306,\"_120\":121,\"_122\":24,\"_123\":121,\"_125\":307,\"_127\":124,\"_128\":308,\"_130\":309,\"_132\":310,\"_134\":311,\"_136\":140},\"fr_19g6rmr0xpfd9\",{\"_144\":314},\"b7ce3c6c-baae-4f18-a685-17a0f6d4cc49\",[16,49],[141,142],\"google-one-tap-anonymous-signup\",[312,313],{\"_132\":140},{\"_132\":137},{\"_315\":16},\"$exists\",\"baseten\",[318],{\"_24\":319,\"_120\":121,\"_122\":320,\"_125\":321,\"_127\":124,\"_128\":322,\"_130\":323,\"_132\":84,\"_134\":324,\"_136\":140},\"fr_mrupy094\",\"email\",\"ac26aa9d-fd12-46a7-99c2-f563139e92ec\",[316,329],[327,328],[325,326],{\"_132\":140},{\"_132\":137},0.68,0.32,\"foundry\",\"v3\",{\"_363\":364},[333],{\"_24\":334,\"_115\":335,\"_120\":121,\"_122\":24,\"_123\":259,\"_125\":336,\"_127\":124,\"_128\":337,\"_130\":338,\"_132\":339,\"_134\":340,\"_136\":341},\"fr_19g6smq178k71\",{\"_143\":49},\"ce4b8c4e-9ab7-494c-9071-70313598c609\",[355,356,357,358,359,360,361,362],[351,142,142,352,353,354,352,352],\"max-agent-underlying-model\",[342,343,344,345,346,347,348,349],\"13\",{\"_132\":140},{\"_132\":137},{\"_132\":219},{\"_132\":218},{\"_132\":217},{\"_132\":277},{\"_132\":276},{\"_132\":350},\"7\",0.72,0,0.05,0.03,{\"_363\":364},{\"_363\":369},{\"_363\":368},{\"_363\":367},{\"_363\":366},{\"_363\":365},{\"_363\":107},{\"_363\":364},\"default\",\"claude-opus-4-6\",\"gpt-5.6-terra\",\"gpt-5.6-sol\",\"claude-fable-5\",\"claude-opus-4-8\",\"claude-opus-4-7\",{\"_363\":394},[372,373,374],{\"_24\":515,\"_115\":516,\"_120\":121,\"_122\":24,\"_125\":517,\"_127\":124,\"_128\":518,\"_130\":519,\"_132\":520,\"_134\":521,\"_136\":140},{\"_24\":439,\"_115\":440,\"_120\":121,\"_122\":24,\"_125\":441,\"_127\":124,\"_128\":442,\"_130\":443,\"_132\":444,\"_134\":445,\"_136\":140},{\"_24\":375,\"_115\":376,\"_120\":121,\"_122\":24,\"_125\":377,\"_127\":124,\"_128\":378,\"_130\":379,\"_132\":380,\"_134\":381,\"_136\":140},\"fr_19g6mmseyueih\",{\"_397\":398},\"90c844db-350d-4033-9007-9c47f08eef75\",[389,390,391,392,393],[387,388,388,388,388],\"free-users_models-limits_tier-3-countries-2\",[382,383,384,385,386],{\"_132\":140},{\"_132\":137},{\"_132\":219},{\"_132\":217},{\"_132\":350},0.4,0.15,{\"_363\":394},{\"_363\":101,\"_396\":394},{\"_363\":395,\"_396\":394},{\"_363\":395,\"_396\":394},{\"_363\":394},\"zai-org/GLM-5.2\",\"claude-sonnet-5\",\"followup\",\"$and\",[399,400],{\"_143\":16,\"_144\":436},{\"_401\":402},\"$or\",[403,404],{\"_33\":420},{\"_33\":405},{\"_249\":406},[407,408,409,410,411,412,413,414,415,416,417,418,419],\"IS\",\"PR\",\"CY\",\"MT\",\"SI\",\"LU\",\"RE\",\"MV\",\"PY\",\"BA\",\"PA\",\"GN\",\"MU\",{\"_249\":421},[422,34,423,424,425,426,427,428,429,430,431,432,433,434,435],\"JO\",\"SG\",\"MA\",\"PH\",\"UG\",\"CN\",\"KE\",\"NG\",\"VN\",\"EG\",\"IN\",\"ID\",\"PK\",\"BD\",{\"_437\":438},\"$gte\",\"2026-08-04T00:00\",\"fr_19g6mmseyzwo2\",{\"_397\":460},\"a640ec35-d769-4b1b-b351-280ba4d042a8\",[454,455,456,457,458,459],[453,388,388,388,388,354],\"free-users_models-limits_tier-2-countries-2\",[446,447,448,449,450,451],{\"_132\":140},{\"_132\":137},{\"_132\":219},{\"_132\":217},{\"_132\":350},{\"_132\":452},\"8\",0.37,{\"_363\":394},{\"_363\":101,\"_396\":394},{\"_363\":395,\"_396\":394},{\"_363\":395,\"_396\":394},{\"_363\":394},{\"_363\":107,\"_396\":394},[461,462],{\"_143\":16,\"_144\":514},{\"_33\":463},{\"_249\":464},[465,466,467,468,469,470,471,472,473,474,475,476,477,478,479,480,481,482,483,484,485,486,487,488,489,490,491,492,493,494,495,496,497,498,499,500,501,502,503,504,505,506,507,508,509,510,511,512,513],\"UY\",\"RO\",\"JP\",\"HR\",\"CR\",\"AE\",\"EE\",\"KR\",\"KH\",\"KW\",\"SA\",\"XK\",\"NL\",\"RS\",\"DE\",\"GR\",\"PL\",\"CL\",\"ES\",\"DO\",\"FI\",\"QA\",\"LT\",\"JM\",\"PT\",\"TR\",\"IT\",\"TH\",\"LV\",\"MX\",\"OM\",\"GE\",\"UA\",\"TW\",\"ZA\",\"SN\",\"MY\",\"AR\",\"CD\",\"BH\",\"CI\",\"AM\",\"GT\",\"KZ\",\"EC\",\"TZ\",\"BR\",\"CO\",\"LB\",{\"_437\":438},\"fr_19g6nmsevj8j8\",{\"_397\":538},\"5037e190-f4ca-4348-8133-40d7a198532f\",[531,532,533,534,535,536,537],[529,530,530,530,530,354,530],\"free-users_models-limits_tier-1-countries\",[522,523,524,525,526,527,528],{\"_132\":140},{\"_132\":137},{\"_132\":219},{\"_132\":217},{\"_132\":350},{\"_132\":277},{\"_132\":276},0.42,0.11,{\"_363\":394},{\"_363\":101,\"_396\":394},{\"_363\":395,\"_396\":394},{\"_363\":395,\"_396\":394},{\"_363\":394},{\"_363\":107,\"_396\":394},{\"_363\":368,\"_396\":394},[539,540],{\"_143\":16,\"_144\":561},{\"_33\":541},{\"_249\":542},[543,544,545,546,547,548,549,550,551,552,553,554,555,556,557,558,559,560],\"NO\",\"CH\",\"AU\",\"US\",\"NZ\",\"DK\",\"BE\",\"GB\",\"CA\",\"AT\",\"FR\",\"SE\",\"IE\",\"HU\",\"SK\",\"IL\",\"CZ\",\"BG\",{\"_437\":438},\"anthropic\",[564],{\"_24\":565,\"_120\":121,\"_122\":320,\"_123\":260,\"_125\":72,\"_127\":124,\"_128\":566,\"_130\":567,\"_132\":72,\"_134\":568,\"_136\":140},\"fr_19g6rmpd0xd9h\",[562,573,329],[352,353,572],[569,570,571],{\"_132\":140},{\"_132\":137},{\"_132\":219},0.95,\"bedrock\",[575,576,577,578],{\"_24\":618,\"_115\":619,\"_120\":121,\"_122\":24,\"_125\":517,\"_127\":124,\"_128\":620,\"_130\":621,\"_132\":520,\"_134\":622,\"_136\":140},{\"_24\":601,\"_115\":602,\"_120\":121,\"_122\":24,\"_125\":441,\"_127\":124,\"_128\":603,\"_130\":604,\"_132\":444,\"_134\":605,\"_136\":140},{\"_24\":580,\"_115\":581,\"_120\":121,\"_122\":24,\"_125\":377,\"_127\":124,\"_128\":582,\"_130\":583,\"_132\":380,\"_134\":584,\"_136\":140},{\"_24\":579,\"_106\":242},\"fr_mpx0zzuq\",\"fr_19g6mmseyuxj6\",{\"_397\":590},[242,242,242,124,124],[387,388,388,388,388],[585,586,587,588,589],{\"_132\":140},{\"_132\":137},{\"_132\":219},{\"_132\":217},{\"_132\":350},[591,592],{\"_143\":16,\"_144\":600},{\"_401\":593},[594,595],{\"_33\":598},{\"_33\":596},{\"_249\":597},[407,408,409,410,411,412,413,414,415,416,417,418,419],{\"_249\":599},[422,34,423,424,425,426,427,428,429,430,431,432,433,434,435],{\"_437\":438},\"fr_19g6mmsez0jw3\",{\"_397\":612},[242,242,242,124,124,242],[453,388,388,388,388,354],[606,607,608,609,610,611],{\"_132\":140},{\"_132\":137},{\"_132\":219},{\"_132\":217},{\"_132\":350},{\"_132\":452},[613,614],{\"_143\":16,\"_144\":617},{\"_33\":615},{\"_249\":616},[465,466,467,468,469,470,471,472,473,474,475,476,477,478,479,480,481,482,483,484,485,486,487,488,489,490,491,492,493,494,495,496,497,498,499,500,501,502,503,504,505,506,507,508,509,510,511,512,513],{\"_437\":438},\"fr_19g6mmsevjshg\",{\"_397\":630},[242,242,242,124,124,242,124],[529,530,530,530,530,354,530],[623,624,625,626,627,628,629],{\"_132\":140},{\"_132\":137},{\"_132\":219},{\"_132\":217},{\"_132\":350},{\"_132\":277},{\"_132\":276},[631,632],{\"_143\":16,\"_144\":635},{\"_33\":633},{\"_249\":634},[543,544,545,546,547,548,549,550,551,552,553,554,555,556,557,558,559,560],{\"_437\":438},\"OFF\"]\n");</script><!--$?--><template id="B:1"></template><!--/$--></div><script>function $RC(a,b){a=document.getElementById(a);b=document.getElementById(b);b.parentNode.removeChild(b);if(a){a=a.previousSibling;var f=a.parentNode,c=a.nextSibling,e=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d)if(0===e)break;else e--;else"$"!==d&&"$?"!==d&&"$!"!==d||e++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;b.firstChild;)f.insertBefore(b.firstChild,c);a.data="$";a._reactRetry&&a._reactRetry()}};$RC("B:0","S:0")</script><div hidden id="S:1"><script>window.__reactRouterContext.streamController.close();</script></div><script>$RC("B:1","S:1")</script>