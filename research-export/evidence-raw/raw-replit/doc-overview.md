> ## Documentation Index
> Fetch the complete documentation index at: https://docs.replit.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Replit Agent

> Replit Agent turns your ideas into apps, designs, slides, and more, all from plain language. No coding required.

export const YouTubeEmbed = ({videoId, title = "YouTube video", startAt}) => {
  if (!videoId) {
    return null;
  }
  let url = "https://www.youtube.com/embed/" + videoId;
  if (startAt) {
    url = url + "?start=" + startAt;
  }
  return <Frame>
      <iframe src={url} title={title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
    </Frame>;
};

export const AgentCarousel = ({correctChoice = ""}) => {
  const outputTypes = [{
    name: "Web",
    iconSvg: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M12 1.25c5.937 0 10.75 4.813 10.75 10.75S17.937 22.75 12 22.75 1.25 17.937 1.25 12 6.063 1.25 12 1.25Zm-9.217 11.5a9.25 9.25 0 0 0 7.468 8.333 15.25 15.25 0 0 1-2.982-8.333H2.783Zm13.948 0a15.249 15.249 0 0 1-2.983 8.333 9.25 9.25 0 0 0 7.469-8.333H16.73Zm-7.958 0A13.748 13.748 0 0 0 12 20.876a13.748 13.748 0 0 0 3.227-8.126H8.773Zm1.478-9.834a9.251 9.251 0 0 0-7.468 8.334H7.27a15.251 15.251 0 0 1 2.982-8.334ZM12 3.123a13.747 13.747 0 0 0-3.227 8.127h6.454A13.748 13.748 0 0 0 12 3.123Zm1.748-.207a15.25 15.25 0 0 1 2.983 8.334h4.486a9.251 9.251 0 0 0-7.469-8.334Z" clip-rule="evenodd" /></svg>'
  }, {
    name: "Mobile",
    iconSvg: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M7 2.75c-.69 0-1.25.56-1.25 1.25v16c0 .69.56 1.25 1.25 1.25h10c.69 0 1.25-.56 1.25-1.25V4c0-.69-.56-1.25-1.25-1.25H7ZM4.25 4A2.75 2.75 0 0 1 7 1.25h10A2.75 2.75 0 0 1 19.75 4v16A2.75 2.75 0 0 1 17 22.75H7A2.75 2.75 0 0 1 4.25 20V4Zm7 14a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" /></svg>'
  }, {
    name: "Slides",
    iconSvg: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M20 2.25A2.75 2.75 0 0 1 22.75 5v14A2.75 2.75 0 0 1 20 21.75h-8A2.75 2.75 0 0 1 9.25 19V5A2.75 2.75 0 0 1 12 2.25h8Zm-8 1.5c-.69 0-1.25.56-1.25 1.25v14c0 .69.56 1.25 1.25 1.25h8c.69 0 1.25-.56 1.25-1.25V5c0-.69-.56-1.25-1.25-1.25h-8Z" clip-rule="evenodd" /><path d="M6 4.25a.75.75 0 0 1 .75.75v14a.75.75 0 0 1-1.5 0V5A.75.75 0 0 1 6 4.25ZM2 6.25a.75.75 0 0 1 .75.75v10a.75.75 0 0 1-1.5 0V7A.75.75 0 0 1 2 6.25Z" /></svg>'
  }, {
    name: "Animation",
    iconSvg: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M10.024 7.25c.31.004.613.091.878.251l4.996 2.996a1.752 1.752 0 0 1 .625 2.367 1.75 1.75 0 0 1-.625.639v-.001l-4.995 2.995.001.001a1.75 1.75 0 0 1-2.654-1.505v-5.99a1.75 1.75 0 0 1 1.774-1.753Zm-.02 1.5a.252.252 0 0 0-.22.124.253.253 0 0 0-.034.127v5.998a.252.252 0 0 0 .127.219.253.253 0 0 0 .252-.004l.002-.001 4.997-2.997.002-.001a.252.252 0 0 0 .122-.215.25.25 0 0 0-.122-.215h-.002L10.13 8.786h-.002a.25.25 0 0 0-.125-.037Z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 1.25c5.937 0 10.75 4.813 10.75 10.75S17.937 22.75 12 22.75 1.25 17.937 1.25 12 6.063 1.25 12 1.25Zm0 1.5a9.25 9.25 0 1 0 0 18.5 9.25 9.25 0 0 0 0-18.5Z" clip-rule="evenodd" /></svg>'
  }, {
    name: "Design",
    iconSvg: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6.5 11.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM17.5 9.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM8.5 6.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM13.5 5.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z" /><path fill-rule="evenodd" d="M12 1.25c2.827 0 5.553 1.01 7.573 2.828C21.596 5.9 22.75 8.388 22.75 11A5.749 5.749 0 0 1 17 16.75h-2.25a1 1 0 0 0-.8 1.6l.3.4.1.143a2.5 2.5 0 0 1-2.1 3.857H12a10.75 10.75 0 1 1 0-21.5Zm0 1.5a9.25 9.25 0 1 0 0 18.5h.25a1 1 0 0 0 .8-1.6l-.3-.4a2.5 2.5 0 0 1 2-4H17l.21-.005A4.25 4.25 0 0 0 21.25 11c0-2.161-.953-4.252-2.68-5.807C16.84 3.636 14.476 2.75 12 2.75Z" clip-rule="evenodd" /></svg>'
  }, {
    name: "Data Visualization",
    iconSvg: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M5 14.25a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-1.5 0v-6a.75.75 0 0 1 .75-.75ZM12 8.25a.75.75 0 0 1 .75.75v12a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75ZM19 2.25a.75.75 0 0 1 .75.75v18a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75Z" /></svg>'
  }, {
    name: "Automation",
    iconSvg: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M13.376 1.253c.21-.02.422.012.616.096l.095.046.091.053c.178.115.323.274.423.46l.045.096.038.099a1.25 1.25 0 0 1 .01.755l-1.92 6.02c-.003.011-.007.023-.012.034a.253.253 0 0 0 .03.23.25.25 0 0 0 .206.108H20l.123.004a1.752 1.752 0 0 1 1.24 2.849.73.73 0 0 1-.045.05l-9.9 10.199v-.001a1.25 1.25 0 0 1-2.122-1.18l.01-.03 1.92-6.019.012-.035a.251.251 0 0 0-.12-.309.255.255 0 0 0-.056-.02l-.06-.008H4a1.752 1.752 0 0 1-1.363-2.852l.045-.05 9.9-10.2a1.25 1.25 0 0 1 .689-.38l.104-.015Zm-9.582 11.6a.252.252 0 0 0-.023.255.25.25 0 0 0 .227.142h7.001l.21.013a1.75 1.75 0 0 1 1.53 1.518c.034.269.003.54-.086.795l.002.001-1.591 4.986 9.14-9.418a.249.249 0 0 0 .047-.116.252.252 0 0 0-.115-.24.249.249 0 0 0-.064-.03l-.07-.009H13a1.753 1.753 0 0 1-1.74-1.531 1.752 1.752 0 0 1 .086-.797l1.588-4.985-9.14 9.417Z" clip-rule="evenodd" /></svg>'
  }, {
    name: "3D Game",
    iconSvg: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M11.25 9.675A3.751 3.751 0 0 1 12 2.25a3.75 3.75 0 0 1 .75 7.425v4.575H19A2.75 2.75 0 0 1 21.75 17v2A2.75 2.75 0 0 1 19 21.75H5A2.75 2.75 0 0 1 2.25 19v-2A2.75 2.75 0 0 1 5 14.25h.25V13a.75.75 0 0 1 1.5 0v1.25h4.5V9.675ZM9.75 6a2.25 2.25 0 1 0 4.5 0 2.25 2.25 0 0 0-4.5 0ZM4.116 16.116A1.25 1.25 0 0 1 5 15.75h14A1.25 1.25 0 0 1 20.25 17v2A1.25 1.25 0 0 1 19 20.25H5a1.25 1.25 0 0 1-1.244-1.126L3.75 19v-2c0-.331.132-.65.366-.884Z" clip-rule="evenodd" /></svg>'
  }, {
    name: "Document",
    iconSvg: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M11.88 11.251a2.873 2.873 0 0 1 2.028 4.904L8.89 21.168a2.75 2.75 0 0 1-1.174.694l-2.867.838a1.255 1.255 0 0 1-1.234-.316 1.251 1.251 0 0 1-.316-1.235l.836-2.868c.13-.443.37-.847.696-1.174l5.017-5.015a2.875 2.875 0 0 1 2.032-.841Zm-.001 1.5c-.319 0-.626.11-.87.31l-.1.091L5.89 18.17a1.251 1.251 0 0 0-.315.532l-.709 2.43 2.43-.708a1.25 1.25 0 0 0 .533-.317l5.019-5.012a1.372 1.372 0 0 0-.97-2.343Z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M14.038 1.251a3.148 3.148 0 0 1 2.198.925l3.587 3.587A3.152 3.152 0 0 1 20.75 8v12A2.75 2.75 0 0 1 18 22.75h-5.341a.75.75 0 0 1 0-1.5h5.34A1.25 1.25 0 0 0 19.25 20V8.75H15A1.75 1.75 0 0 1 13.25 7V2.75H6A1.25 1.25 0 0 0 4.75 4v9.34a.75.75 0 1 1-1.5 0V4A2.75 2.75 0 0 1 6 1.25h8l.039.001ZM14.75 7a.25.25 0 0 0 .25.25h4.071a1.65 1.65 0 0 0-.306-.425l-3.59-3.59a1.655 1.655 0 0 0-.425-.307V7Z" clip-rule="evenodd" /></svg>'
  }, {
    name: "Spreadsheet",
    iconSvg: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M21.75 6A3.75 3.75 0 0 0 18 2.25H6A3.75 3.75 0 0 0 2.25 6v12A3.75 3.75 0 0 0 6 21.75h12A3.75 3.75 0 0 0 21.75 18V6ZM18 3.75A2.25 2.25 0 0 1 20.25 6v2.25H9.75v-4.5H18Zm-9.75 0v4.5h-4.5V6A2.25 2.25 0 0 1 6 3.75h2.25Zm-4.5 6h4.5v4.5h-4.5v-4.5Zm0 6h4.5v4.5H6A2.25 2.25 0 0 1 3.75 18v-2.25Zm6 4.5v-4.5h10.5V18A2.25 2.25 0 0 1 18 20.25H9.75Zm10.5-6H9.75v-4.5h10.5v4.5Z" clip-rule="evenodd" /></svg>'
  }];
  const ITEMS_PER_PAGE = 5;
  const ITEM_WIDTH = 96;
  const VISIBLE_WIDTH = ITEMS_PER_PAGE * ITEM_WIDTH;
  const trackId = "ac-carousel-track";
  const checkSvg = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M20.53 5.47a.75.75 0 0 1 0 1.06l-11 11a.75.75 0 0 1-1.06 0l-5-5a.75.75 0 1 1 1.06-1.06L9 15.94 19.47 5.47a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" /></svg>';
  const updateHint = selectedName => {
    const hintEl = document.getElementById("ac-carousel-hint");
    if (!hintEl || !correctChoice) return;
    if (!selectedName) {
      hintEl.innerHTML = "";
      return;
    }
    if (selectedName === correctChoice) {
      hintEl.innerHTML = `<span class="ac-hint ac-hint-correct"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style="vertical-align:-2px;margin-right:4px"><path fill-rule="evenodd" d="M20.53 5.47a.75.75 0 0 1 0 1.06l-11 11a.75.75 0 0 1-1.06 0l-5-5a.75.75 0 1 1 1.06-1.06L9 15.94 19.47 5.47a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" /></svg>Great choice!</span>`;
    } else {
      hintEl.innerHTML = `<span class="ac-hint ac-hint-nudge">You can build anything you want! For this quickstart, try selecting <strong>${correctChoice}</strong>.</span>`;
    }
  };
  const toggleOutputType = name => {
    const btn = document.querySelector(`.agent-carousel-wrap [data-option-name="${name}"]`);
    const pillsContainer = document.getElementById("agent-input-pills");
    if (!btn) return;
    const isSelected = btn.dataset.selected === "true";
    const type = outputTypes.find(t => t.name === name);
    if (isSelected) {
      btn.dataset.selected = "false";
      btn.style.background = "var(--ai-option-bg)";
      const iconEl = btn.querySelector(".option-icon");
      if (iconEl && type) iconEl.innerHTML = type.iconSvg;
      if (pillsContainer) {
        const pill = document.getElementById(`pill-${name}`);
        if (pill) pill.remove();
      }
      updateHint(null);
    } else {
      document.querySelectorAll('[data-option-name][data-selected="true"]').forEach(prevBtn => {
        const prevName = prevBtn.dataset.optionName;
        prevBtn.dataset.selected = "false";
        prevBtn.style.background = "var(--ai-option-bg)";
        const prevIconEl = prevBtn.querySelector(".option-icon");
        const prevType = outputTypes.find(t => t.name === prevName);
        if (prevIconEl && prevType) prevIconEl.innerHTML = prevType.iconSvg;
        if (pillsContainer) {
          const prevPill = document.getElementById(`pill-${prevName}`);
          if (prevPill) prevPill.remove();
        }
      });
      btn.dataset.selected = "true";
      btn.style.background = "var(--ai-option-selected-bg)";
      const iconEl = btn.querySelector(".option-icon");
      if (iconEl) iconEl.innerHTML = checkSvg;
      if (pillsContainer && type) {
        const pill = document.createElement("span");
        pill.id = `pill-${name}`;
        pill.style.cssText = "display:inline-flex;align-items:center;gap:6px;height:32px;padding:0 8px 0 8px;border-radius:32px;background:var(--ai-pill-bg);color:var(--ai-pill-text);font-size:14px;white-space:nowrap;cursor:default;";
        pill.innerHTML = `<span style="display:flex;align-items:center"><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">${type.iconSvg.replace(/<svg[^>]*>/, "").replace("</svg>", "")}</svg></span><span>${name}</span><span class="ai-pill-close" style="display:flex;align-items:center;cursor:pointer;margin-left:2px" data-pill-remove="${name}"><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18.3 5.71a1 1 0 0 0-1.42 0L12 10.59 7.12 5.7A1 1 0 0 0 5.7 7.12L10.59 12 5.7 16.88a1 1 0 1 0 1.42 1.42L12 13.41l4.88 4.89a1 1 0 0 0 1.42-1.42L13.41 12l4.89-4.88a1 1 0 0 0 0-1.41Z"/></svg></span>`;
        pill.querySelector(`[data-pill-remove="${name}"]`).addEventListener("click", () => toggleOutputType(name));
        pillsContainer.appendChild(pill);
      }
      updateHint(name);
    }
  };
  const slideCarousel = direction => {
    const track = document.getElementById(trackId);
    if (!track) return;
    const currentPage = parseInt(track.dataset.page || "0", 10);
    const totalPages = Math.ceil(outputTypes.length / ITEMS_PER_PAGE);
    let newPage = currentPage + direction;
    if (newPage < 0) newPage = totalPages - 1;
    if (newPage >= totalPages) newPage = 0;
    track.dataset.page = String(newPage);
    track.style.transform = `translateX(-${newPage * ITEMS_PER_PAGE * ITEM_WIDTH}px)`;
  };
  if (typeof document !== "undefined" && !document.getElementById("agent-carousel-styles")) {
    const style = document.createElement("style");
    style.id = "agent-carousel-styles";
    style.textContent = `
      .agent-carousel-wrap {
        --ai-option-bg: var(--replit-docs-bg-muted, #F1F1EE);
        --ai-option-border: var(--replit-docs-border, #DEDAD5);
        --ai-option-hover-bg: var(--replit-docs-bg-elevated, #F1F1EE);
        --ai-option-selected-bg: var(--replit-docs-bg-elevated, #F1F1EE);
        --ai-text-secondary: var(--replit-docs-text-muted, #5C5C5C);
        --ai-icon-default: var(--replit-docs-text-subtle, #858585);
        --ai-icon-hover: var(--replit-docs-text-muted, #5C5C5C);
      }
      .dark .agent-carousel-wrap,
      html.dark .agent-carousel-wrap,
      [data-theme="dark"] .agent-carousel-wrap {
        --ai-option-bg: var(--replit-docs-bg-elevated, #222223);
        --ai-option-border: var(--replit-docs-border, #39393D);
        --ai-option-hover-bg: var(--replit-docs-bg-muted, #222223);
        --ai-option-selected-bg: var(--replit-docs-bg-muted, #222223);
        --ai-text-secondary: var(--replit-docs-text-muted, #B8B8BE);
        --ai-icon-default: var(--replit-docs-text-subtle, #8E8F97);
        --ai-icon-hover: var(--replit-docs-text-muted, #B8B8BE);
      }
      @keyframes agent-carousel-fade-in {
        from { transform: translateY(10px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      .agent-carousel-wrap .ac-option-btn[data-selected="true"] {
        background: var(--ai-option-selected-bg) !important;
      }
      .agent-carousel-wrap .ac-option-btn[data-correct="true"][data-selected="true"] {
        border-color: #22c55e !important;
        background: rgba(34, 197, 94, 0.08) !important;
      }
      @keyframes ac-hint-fade-in {
        from { opacity: 0; transform: translateY(-4px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .agent-carousel-wrap .ac-hint {
        text-align: center;
        font-size: 13px;
        margin-top: 12px;
        animation: ac-hint-fade-in 200ms ease-out;
      }
      .agent-carousel-wrap .ac-hint-correct {
        color: #22c55e;
      }
      .agent-carousel-wrap .ac-hint-nudge {
        color: var(--ai-text-secondary);
      }
      @media (hover: hover) {
        .agent-carousel-wrap .ac-option-btn:not([data-selected="true"]):hover {
          background: var(--ai-option-hover-bg);
        }
        .agent-carousel-wrap .ac-nav-btn:hover svg {
          color: var(--ai-icon-hover);
        }
      }
      .agent-carousel-wrap {
        overflow: hidden;
        box-sizing: border-box;
      }
    `;
    document.head.appendChild(style);
  }
  const ArrowLeftIcon = <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" d="M4.47 11.47a.75.75 0 0 0 0 1.06l7 7a.75.75 0 1 0 1.06-1.06l-5.72-5.72H19a.75.75 0 0 0 0-1.5H6.81l5.72-5.72a.75.75 0 0 0-1.06-1.06l-7 7Z" clipRule="evenodd" />
    </svg>;
  const ArrowRightIcon = <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" d="M19.53 11.47a.75.75 0 0 1 0 1.06l-7 7a.75.75 0 1 1-1.06-1.06l5.72-5.72H5a.75.75 0 0 1 0-1.5h12.19l-5.72-5.72a.75.75 0 0 1 1.06-1.06l7 7Z" clipRule="evenodd" />
    </svg>;
  const optionIconStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "48px",
    height: "48px",
    border: "1px solid var(--ai-option-border)",
    borderRadius: "12px",
    background: "var(--ai-option-bg)",
    cursor: "pointer",
    color: "var(--ai-text-secondary)",
    padding: 0,
    transition: "background 120ms ease-out",
    flexShrink: 0
  };
  return <div className="agent-carousel-wrap" style={{
    fontFamily: "'IBM Plex Sans', sans-serif",
    width: "100%",
    maxWidth: "734px",
    alignSelf: "center",
    margin: "48px auto",
    opacity: 0,
    animation: "agent-carousel-fade-in 300ms ease-out forwards"
  }}>
      <div style={{
    display: "flex",
    justifyContent: "center"
  }}>
        <div style={{
    display: "flex",
    alignItems: "flex-start",
    gap: "16px",
    maxWidth: "100%",
    minWidth: 0
  }}>
          <button className="ac-nav-btn" style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "24px",
    height: "48px",
    border: "none",
    background: "none",
    cursor: "pointer",
    color: "var(--ai-icon-default)",
    padding: 0,
    flexShrink: 0
  }} aria-label="Previous" type="button" onClick={() => slideCarousel(-1)}>
            {ArrowLeftIcon}
          </button>
          <div style={{
    display: "flex",
    overflow: "hidden",
    width: `${VISIBLE_WIDTH}px`,
    maxWidth: "calc(100vw - 140px)"
  }}>
            <div id={trackId} data-page="0" style={{
    display: "flex",
    transition: "transform 300ms ease-out",
    willChange: "transform"
  }}>
              {outputTypes.map(type => <div key={type.name} style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "6px",
    width: `${ITEM_WIDTH}px`,
    flexShrink: 0
  }}>
                  <button className="ac-option-btn" data-option-name={type.name} data-correct={correctChoice && type.name === correctChoice ? "true" : undefined} style={optionIconStyle} type="button" onClick={() => toggleOutputType(type.name)}>
                    <span className="option-icon" style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }} dangerouslySetInnerHTML={{
    __html: type.iconSvg
  }} />
                  </button>
                  <span style={{
    fontSize: "12px",
    color: "var(--ai-text-secondary)",
    textAlign: "center"
  }}>
                    {type.name}
                  </span>
                </div>)}
            </div>
          </div>
          <button className="ac-nav-btn" style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "24px",
    height: "48px",
    border: "none",
    background: "none",
    cursor: "pointer",
    color: "var(--ai-icon-default)",
    padding: 0,
    flexShrink: 0
  }} aria-label="Next" type="button" onClick={() => slideCarousel(1)}>
            {ArrowRightIcon}
          </button>
        </div>
      </div>
      {correctChoice && <div id="ac-carousel-hint" style={{
    minHeight: "24px"
  }}></div>}
    </div>;
};

export const AgentModes = () => {
  if (typeof document !== "undefined" && !document.getElementById("agent-modes-styles")) {
    const style = document.createElement("style");
    style.id = "agent-modes-styles";
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500&display=swap');
      #agent-modes-container {
        --am-surface: var(--replit-docs-bg, #F6F6F4);
        --am-surface-elevated: var(--replit-docs-bg-elevated, #F1F1EE);
        --am-surface-muted: var(--replit-docs-bg-muted, #ECE9E4);
        --am-border: var(--replit-docs-border, #DEDAD5);
        --am-border-strong: var(--replit-docs-border-strong, #CAC4BE);
        --am-text: var(--replit-docs-text, #1D1D1D);
        --am-text-dim: var(--replit-docs-text-muted, #5C5C5C);
        --am-text-dimmest: var(--replit-docs-text-subtle, #858585);
        --am-lite-bg: #FFF1C9;
        --am-lite-border: #F0D57A;
        --am-power-bg: #E8F2FF;
        --am-power-border: #8EBEFF;
        --am-power-turbo-bg: #FFF0E6;
        --am-power-turbo-border: #F7B16B;
        --am-switch-off: #CFC8BF;
        --am-switch-on: #4A90D9;
        --am-switch-turbo: #E6862E;
        --am-thumb: #FFFFFF;
        --am-pill-bg: rgba(74, 144, 217, 0.12);
        --am-pill-text: #3C6FA8;
        --am-divider: rgba(0, 0, 0, 0.08);
        --am-shadow: 0 8px 32px rgba(0, 0, 0, 0.10), 0 1px 3px rgba(0, 0, 0, 0.05);
      }
      .dark #agent-modes-container,
      html.dark #agent-modes-container,
      [data-theme="dark"] #agent-modes-container {
        --am-surface: var(--replit-docs-bg, #1E1E1F);
        --am-surface-elevated: var(--replit-docs-bg-elevated, #222223);
        --am-surface-muted: #27272A;
        --am-border: var(--replit-docs-border, #39393D);
        --am-border-strong: var(--replit-docs-border-strong, #4A4A50);
        --am-text: var(--replit-docs-text, #F5F5F5);
        --am-text-dim: var(--replit-docs-text-muted, #B8B8BE);
        --am-text-dimmest: var(--replit-docs-text-subtle, #8E8F97);
        --am-lite-bg: #463D20;
        --am-lite-border: #8A7030;
        --am-power-bg: #1F3146;
        --am-power-border: #5C8ED4;
        --am-power-turbo-bg: #3A2618;
        --am-power-turbo-border: #D18B49;
        --am-switch-off: #4A4A50;
        --am-switch-on: #4A90D9;
        --am-switch-turbo: #D97A1A;
        --am-pill-bg: rgba(74, 144, 217, 0.18);
        --am-pill-text: #B7D5FF;
        --am-divider: rgba(255, 255, 255, 0.08);
        --am-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
      }
      @keyframes agent-modes-fade-in {
        from { transform: translateY(8px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      #agent-modes-container button {
        font-family: inherit;
      }
      #agent-modes-container [data-mode-btn][data-selected="true"] {
        background: var(--am-surface-elevated);
        border-color: var(--am-border-strong);
        color: var(--am-text);
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
      }
      #agent-modes-container [data-mode-btn="lite"][data-selected="true"] {
        background: var(--am-lite-bg);
        border-color: var(--am-lite-border);
      }
      #agent-modes-container [data-mode-btn="power"][data-selected="true"] {
        background: var(--am-power-bg);
        border-color: var(--am-power-border);
      }
      #agent-modes-container [data-mode-btn="power"][data-selected="true"][data-turbo="true"] {
        background: var(--am-power-turbo-bg);
        border-color: var(--am-power-turbo-border);
      }
      #agent-modes-container [data-advanced-toggle][data-expanded="true"] [data-advanced-icon] {
        transform: rotate(90deg);
      }
      #agent-modes-container [data-feature-row][data-disabled="true"] {
        opacity: 0.45;
      }
      #agent-modes-container [data-switch][data-disabled="true"] {
        cursor: not-allowed;
      }
      #agent-modes-container [data-switch][data-selected="true"] [data-switch-track] {
        background: var(--am-switch-on);
      }
      #agent-modes-container [data-switch][data-selected="true"][data-colorway="turbo"] [data-switch-track] {
        background: var(--am-switch-turbo);
      }
      #agent-modes-container [data-switch][data-selected="true"] [data-switch-thumb] {
        transform: translateX(14px);
      }
    `;
    document.head.appendChild(style);
  }
  if (typeof document !== "undefined") {
    window.requestAnimationFrame(() => {
      const panel = document.getElementById("agent-modes-panel");
      if (!panel || panel.dataset.init) {
        return;
      }
      panel.dataset.init = "1";
      let mode = "power";
      let advancedOpen = false;
      const toggles = {
        appTesting: true,
        codeOptimization: true,
        turbo: false
      };
      const modeDescriptions = {
        lite: "Fast, lightweight models for quick edits and iterations. Best for small changes and visual tweaks.",
        economy: "Cost-optimized models for everyday tasks. Best mode for most builds when efficiency matters.",
        power: "Higher-performance models for more complex work. Best for larger changes, deeper reasoning, and longer builds."
      };
      const description = panel.querySelector("[data-mode-description]");
      const advancedToggle = panel.querySelector("[data-advanced-toggle]");
      const advancedSection = panel.querySelector("[data-advanced-section]");
      const setFeatureState = ({key, selected, disabled, descriptionText}) => {
        const row = panel.querySelector(`[data-feature-row="${key}"]`);
        const switchButton = panel.querySelector(`[data-switch="${key}"]`);
        const descriptionNode = panel.querySelector(`[data-feature-description="${key}"]`);
        if (row) {
          row.dataset.disabled = disabled ? "true" : "false";
        }
        if (switchButton) {
          switchButton.dataset.selected = selected ? "true" : "false";
          switchButton.dataset.disabled = disabled ? "true" : "false";
          switchButton.setAttribute("aria-checked", selected ? "true" : "false");
        }
        if (descriptionNode) {
          descriptionNode.textContent = descriptionText;
        }
      };
      const update = () => {
        panel.querySelectorAll("[data-mode-btn]").forEach(button => {
          const selected = button.dataset.modeBtn === mode;
          button.dataset.selected = selected ? "true" : "false";
          button.dataset.turbo = selected && mode === "power" && toggles.turbo ? "true" : "false";
        });
        if (description) {
          description.textContent = modeDescriptions[mode];
        }
        if (advancedToggle) {
          advancedToggle.dataset.expanded = advancedOpen ? "true" : "false";
        }
        if (advancedSection) {
          advancedSection.style.display = advancedOpen ? "flex" : "none";
        }
        const liteDisabled = mode === "lite";
        const turboDisabled = mode !== "power";
        setFeatureState({
          key: "appTesting",
          selected: !liteDisabled && toggles.appTesting,
          disabled: liteDisabled,
          descriptionText: "Agent tests your app automatically"
        });
        setFeatureState({
          key: "codeOptimization",
          selected: !liteDisabled && toggles.codeOptimization,
          disabled: liteDisabled,
          descriptionText: "Agent reviews code for bugs and improvements"
        });
        setFeatureState({
          key: "turbo",
          selected: !turboDisabled && toggles.turbo,
          disabled: turboDisabled,
          descriptionText: turboDisabled ? "Available when Power mode is selected" : "Fastest models, up to 2.5x speed and 6x cost"
        });
      };
      panel.querySelectorAll("[data-mode-btn]").forEach(button => {
        button.addEventListener("click", () => {
          mode = button.dataset.modeBtn;
          if (mode !== "power") {
            toggles.turbo = false;
          }
          update();
        });
      });
      if (advancedToggle) {
        advancedToggle.addEventListener("click", () => {
          advancedOpen = !advancedOpen;
          update();
        });
      }
      panel.querySelectorAll("[data-switch]").forEach(switchButton => {
        switchButton.addEventListener("click", () => {
          const key = switchButton.dataset.switch;
          if (mode === "lite" && key !== "turbo" || key === "turbo" && mode !== "power") {
            return;
          }
          toggles[key] = !toggles[key];
          update();
        });
      });
      update();
    });
  }
  const panelButton = {
    border: "1px solid transparent",
    borderRadius: "7px",
    background: "transparent",
    color: "var(--am-text-dim)",
    padding: "8px 10px",
    fontSize: "14px",
    lineHeight: 1.2,
    cursor: "pointer",
    transition: "all 150ms ease"
  };
  const featureRow = (key, label, descriptionText, colorway = "default") => <div data-feature-row={key} style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    padding: "8px 0"
  }}>
      <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    flex: 1
  }}>
        <div style={{
    display: "flex",
    alignItems: "center",
    gap: "6px"
  }}>
          <span style={{
    fontSize: "14px",
    color: "var(--am-text)"
  }}>{label}</span>
          {key === "turbo" ? <span style={{
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2px 6px",
    borderRadius: "999px",
    fontSize: "11px",
    color: "var(--am-pill-text)",
    background: "var(--am-pill-bg)"
  }}>
              +$$$
            </span> : null}
        </div>
        <span data-feature-description={key} style={{
    fontSize: "12px",
    color: "var(--am-text-dimmest)",
    lineHeight: 1.4
  }}>
          {descriptionText}
        </span>
      </div>
      <button type="button" role="switch" aria-checked="false" data-switch={key} data-selected="false" data-disabled="false" data-colorway={colorway} style={{
    border: 0,
    background: "transparent",
    padding: 0,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0
  }}>
        <span data-switch-track style={{
    width: "38px",
    height: "24px",
    borderRadius: "999px",
    background: "var(--am-switch-off)",
    position: "relative",
    transition: "background 150ms ease",
    display: "block"
  }}>
          <span data-switch-thumb style={{
    width: "16px",
    height: "16px",
    borderRadius: "999px",
    background: "var(--am-thumb)",
    position: "absolute",
    top: "4px",
    left: "4px",
    transition: "transform 150ms ease",
    display: "block"
  }} />
        </span>
      </button>
    </div>;
  return <div id="agent-modes-container" style={{
    fontFamily: "'IBM Plex Sans', sans-serif",
    width: "100%",
    maxWidth: "360px",
    margin: "48px auto",
    opacity: 0,
    animation: "agent-modes-fade-in 300ms ease-out forwards"
  }}>
      <div id="agent-modes-panel" style={{
    borderRadius: "12px",
    background: "var(--am-surface)",
    boxShadow: "var(--am-shadow)",
    border: "1px solid var(--am-border)",
    padding: "12px",
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  }}>
        <div style={{
    fontSize: "13px",
    color: "var(--am-text-dim)"
  }}>Agent modes</div>

        <div style={{
    display: "flex",
    alignItems: "center",
    gap: "4px",
    padding: "4px",
    borderRadius: "10px",
    background: "var(--am-surface-muted)"
  }}>
          <button type="button" data-mode-btn="lite" data-selected="false" style={{
    ...panelButton,
    flex: 1
  }}>
            Lite
          </button>
          <button type="button" data-mode-btn="economy" data-selected="false" style={{
    ...panelButton,
    flex: 1
  }}>
            Economy
          </button>
          <button type="button" data-mode-btn="power" data-selected="true" data-turbo="false" style={{
    ...panelButton,
    flex: 1
  }}>
            Power
          </button>
        </div>

        <div data-mode-description style={{
    fontSize: "13px",
    lineHeight: 1.5,
    color: "var(--am-text-dim)"
  }}>
          Higher-performance models for more complex work. Best for larger changes, deeper reasoning, and longer builds.
        </div>

        <div style={{
    height: "1px",
    background: "var(--am-divider)",
    margin: "2px 0"
  }} />

        <button type="button" data-advanced-toggle data-expanded="false" style={{
    border: 0,
    background: "transparent",
    padding: 0,
    display: "flex",
    alignItems: "center",
    gap: "6px",
    color: "var(--am-text-dimmest)",
    cursor: "pointer",
    fontSize: "13px"
  }}>
          <span data-advanced-icon style={{
    display: "inline-block",
    transition: "transform 150ms ease"
  }}>
            {">"}
          </span>
          <span>Advanced settings</span>
        </button>

        <div data-advanced-section style={{
    display: "none",
    flexDirection: "column",
    gap: "2px"
  }}>
          {featureRow("appTesting", "App testing", "Agent tests your app automatically")}
          {featureRow("codeOptimization", "Code optimization", "Agent reviews code for bugs and improvements")}
          <div style={{
    height: "1px",
    background: "var(--am-divider)",
    margin: "2px 0"
  }} />
          {featureRow("turbo", "Turbo", "Fastest models, up to 2.5x speed and 6x cost", "turbo")}
        </div>
      </div>
    </div>;
};

export const AgentInput = ({defaultPrompt = "", highlightPlan = false, highlightStart = false, showTypewriter = true}) => {
  const AGENT_INPUT_TYPEWRITER_SCRIPT_ID = "replit-docs-typewriter-core";
  const AGENT_INPUT_TYPEWRITER_SRC = "https://unpkg.com/typewriter-effect@2.18.2/dist/core.js";
  const AGENT_INPUT_TYPEWRITER_PROMPTS = ["Build a project tracker for my team", "Design a landing page for my coffee shop", "Add Stripe payments to my app"];
  const AGENT_INPUT_TYPING_SPEED = 40;
  const AGENT_INPUT_DELETE_SPEED = 20;
  const AGENT_INPUT_PAUSE_AFTER = 2000;
  const AGENT_INPUT_START_DELAY = 500;
  const getAgentInputTypewriterLoader = () => {
    if (typeof window === "undefined") {
      return null;
    }
    if (!window.__replitDocsAgentInputTypewriterLoader) {
      window.__replitDocsAgentInputTypewriterLoader = {};
    }
    return window.__replitDocsAgentInputTypewriterLoader;
  };
  const ensureAgentInputTypewriterCore = () => {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return Promise.resolve(null);
    }
    if (window.Typewriter) {
      return Promise.resolve(window.Typewriter);
    }
    const loader = getAgentInputTypewriterLoader();
    if (loader.promise) {
      return loader.promise;
    }
    loader.promise = new Promise((resolve, reject) => {
      const handleLoad = () => {
        if (window.Typewriter) {
          resolve(window.Typewriter);
          return;
        }
        loader.promise = null;
        reject(new Error("Typewriter core loaded without a global Typewriter export."));
      };
      const handleError = () => {
        loader.promise = null;
        reject(new Error("Failed to load typewriter core."));
      };
      const existingScript = document.getElementById(AGENT_INPUT_TYPEWRITER_SCRIPT_ID);
      if (existingScript) {
        existingScript.addEventListener("load", handleLoad, {
          once: true
        });
        existingScript.addEventListener("error", handleError, {
          once: true
        });
        return;
      }
      const script = document.createElement("script");
      script.id = AGENT_INPUT_TYPEWRITER_SCRIPT_ID;
      script.src = AGENT_INPUT_TYPEWRITER_SRC;
      script.async = true;
      script.addEventListener("load", handleLoad, {
        once: true
      });
      script.addEventListener("error", handleError, {
        once: true
      });
      document.head.appendChild(script);
    });
    return loader.promise;
  };
  const getAgentInputTypewriterRegistry = () => {
    if (typeof window === "undefined") {
      return null;
    }
    if (!window.__replitDocsAgentInputTypewriters) {
      window.__replitDocsAgentInputTypewriters = new WeakMap();
    }
    return window.__replitDocsAgentInputTypewriters;
  };
  const findAgentInputContainer = node => node?.closest?.("[data-agent-input-container]") || null;
  const getAgentInputElements = container => ({
    textarea: container?.querySelector?.('[data-agent-input-role="textarea"]') || null,
    startButton: container?.querySelector?.('[data-agent-input-role="start-button"]') || null,
    pillsContainer: container?.querySelector?.('[data-agent-input-role="pills"]') || null
  });
  const getAgentInputPromptValue = container => {
    const {textarea} = getAgentInputElements(container);
    return textarea?.value?.trim() || "";
  };
  const updateAgentInputButtonState = container => {
    const {startButton} = getAgentInputElements(container);
    if (!startButton) {
      return;
    }
    const hasText = getAgentInputPromptValue(container).length > 0;
    startButton.style.opacity = hasText ? "1" : "0.4";
    startButton.style.cursor = hasText ? "pointer" : "not-allowed";
  };
  const stopAgentInputTypewriter = (textarea, {placeholder, clearDemo = false} = {}) => {
    if (typeof window === "undefined" || !textarea) {
      return;
    }
    const registry = getAgentInputTypewriterRegistry();
    const record = registry?.get(textarea);
    if (!record) {
      if (placeholder) {
        textarea.setAttribute("placeholder", placeholder);
      }
      return;
    }
    record.stopped = true;
    if (record.startTimer) {
      window.clearTimeout(record.startTimer);
    }
    if (record.writeFrame) {
      window.cancelAnimationFrame(record.writeFrame);
    }
    if (record.typewriter?.stop) {
      record.typewriter.stop();
    }
    textarea.removeEventListener("focus", record.handleFocus);
    textarea.removeEventListener("pointerdown", record.handlePointerDown);
    textarea.removeEventListener("input", record.handleInput);
    if (clearDemo && textarea.value === record.pendingValue) {
      textarea.value = "";
    }
    textarea.setAttribute("placeholder", placeholder || "");
    updateAgentInputButtonState(record.container);
    registry.delete(textarea);
  };
  const startAgentInputTypewriter = (container, {defaultPrompt, placeholder, showTypewriter}) => {
    if (typeof window === "undefined" || typeof document === "undefined" || !container) {
      return;
    }
    const {textarea} = getAgentInputElements(container);
    if (!textarea) {
      return;
    }
    if (!showTypewriter || defaultPrompt) {
      stopAgentInputTypewriter(textarea, {
        placeholder
      });
      textarea.setAttribute("placeholder", placeholder);
      updateAgentInputButtonState(container);
      return;
    }
    const registry = getAgentInputTypewriterRegistry();
    const existingRecord = registry.get(textarea);
    if (existingRecord && !existingRecord.stopped) {
      updateAgentInputButtonState(container);
      return;
    }
    textarea.setAttribute("placeholder", "");
    if (textarea.value) {
      textarea.value = "";
    }
    updateAgentInputButtonState(container);
    const record = {
      container,
      element: textarea,
      pendingValue: "",
      renderedValue: "",
      stopped: false,
      startTimer: null,
      writeFrame: null,
      typewriter: null,
      handleFocus: null,
      handlePointerDown: null,
      handleInput: null
    };
    const queueValue = nextValue => {
      record.pendingValue = nextValue;
      if (record.writeFrame) {
        return;
      }
      record.writeFrame = window.requestAnimationFrame(() => {
        record.writeFrame = null;
        if (record.stopped || registry.get(textarea) !== record || !textarea.isConnected) {
          return;
        }
        if (textarea.value !== record.pendingValue) {
          textarea.value = record.pendingValue;
        }
        updateAgentInputButtonState(container);
      });
    };
    const stopDemo = () => {
      stopAgentInputTypewriter(textarea, {
        placeholder,
        clearDemo: true
      });
    };
    record.handleFocus = stopDemo;
    record.handlePointerDown = stopDemo;
    record.handleInput = stopDemo;
    registry.set(textarea, record);
    textarea.addEventListener("focus", record.handleFocus, {
      once: true
    });
    textarea.addEventListener("pointerdown", record.handlePointerDown, {
      once: true
    });
    textarea.addEventListener("input", record.handleInput, {
      once: true
    });
    record.startTimer = window.setTimeout(() => {
      ensureAgentInputTypewriterCore().then(Typewriter => {
        if (!Typewriter || record.stopped || registry.get(textarea) !== record || !textarea.isConnected) {
          return;
        }
        const typewriter = new Typewriter(null, {
          loop: true,
          delay: AGENT_INPUT_TYPING_SPEED,
          deleteSpeed: AGENT_INPUT_DELETE_SPEED,
          cursor: "",
          skipAddStyles: true,
          wrapperClassName: "",
          cursorClassName: "",
          onCreateTextNode: character => {
            record.renderedValue += character;
            queueValue(record.renderedValue);
            return null;
          },
          onRemoveNode: () => {
            record.renderedValue = record.renderedValue.slice(0, -1);
            queueValue(record.renderedValue);
          }
        });
        AGENT_INPUT_TYPEWRITER_PROMPTS.forEach(prompt => {
          typewriter.typeString(prompt).pauseFor(AGENT_INPUT_PAUSE_AFTER).deleteAll(AGENT_INPUT_DELETE_SPEED).pauseFor(400);
        });
        record.typewriter = typewriter;
        typewriter.start();
      }).catch(() => {
        stopAgentInputTypewriter(textarea, {
          placeholder
        });
      });
    }, AGENT_INPUT_START_DELAY);
  };
  if (typeof document !== "undefined" && !window.LZString) {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/lz-string/1.5.0/lz-string.min.js";
    document.head.appendChild(script);
  }
  const placeholder = "Describe your idea, Replit will bring it to life...";
  const outputTypes = [{
    name: "Web",
    iconSvg: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M12 1.25c5.937 0 10.75 4.813 10.75 10.75S17.937 22.75 12 22.75 1.25 17.937 1.25 12 6.063 1.25 12 1.25Zm-9.217 11.5a9.25 9.25 0 0 0 7.468 8.333 15.25 15.25 0 0 1-2.982-8.333H2.783Zm13.948 0a15.249 15.249 0 0 1-2.983 8.333 9.25 9.25 0 0 0 7.469-8.333H16.73Zm-7.958 0A13.748 13.748 0 0 0 12 20.876a13.748 13.748 0 0 0 3.227-8.126H8.773Zm1.478-9.834a9.251 9.251 0 0 0-7.468 8.334H7.27a15.251 15.251 0 0 1 2.982-8.334ZM12 3.123a13.747 13.747 0 0 0-3.227 8.127h6.454A13.748 13.748 0 0 0 12 3.123Zm1.748-.207a15.25 15.25 0 0 1 2.983 8.334h4.486a9.251 9.251 0 0 0-7.469-8.334Z" clip-rule="evenodd" /></svg>',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path fillRule="evenodd" d="M12 1.25c5.937 0 10.75 4.813 10.75 10.75S17.937 22.75 12 22.75 1.25 17.937 1.25 12 6.063 1.25 12 1.25Zm-9.217 11.5a9.25 9.25 0 0 0 7.468 8.333 15.25 15.25 0 0 1-2.982-8.333H2.783Zm13.948 0a15.249 15.249 0 0 1-2.983 8.333 9.25 9.25 0 0 0 7.469-8.333H16.73Zm-7.958 0A13.748 13.748 0 0 0 12 20.876a13.748 13.748 0 0 0 3.227-8.126H8.773Zm1.478-9.834a9.251 9.251 0 0 0-7.468 8.334H7.27a15.251 15.251 0 0 1 2.982-8.334ZM12 3.123a13.747 13.747 0 0 0-3.227 8.127h6.454A13.748 13.748 0 0 0 12 3.123Zm1.748-.207a15.25 15.25 0 0 1 2.983 8.334h4.486a9.251 9.251 0 0 0-7.469-8.334Z" clipRule="evenodd" />
        </svg>
  }, {
    name: "Mobile",
    iconSvg: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M7 2.75c-.69 0-1.25.56-1.25 1.25v16c0 .69.56 1.25 1.25 1.25h10c.69 0 1.25-.56 1.25-1.25V4c0-.69-.56-1.25-1.25-1.25H7ZM4.25 4A2.75 2.75 0 0 1 7 1.25h10A2.75 2.75 0 0 1 19.75 4v16A2.75 2.75 0 0 1 17 22.75H7A2.75 2.75 0 0 1 4.25 20V4Zm7 14a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" /></svg>',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path fillRule="evenodd" d="M7 2.75c-.69 0-1.25.56-1.25 1.25v16c0 .69.56 1.25 1.25 1.25h10c.69 0 1.25-.56 1.25-1.25V4c0-.69-.56-1.25-1.25-1.25H7ZM4.25 4A2.75 2.75 0 0 1 7 1.25h10A2.75 2.75 0 0 1 19.75 4v16A2.75 2.75 0 0 1 17 22.75H7A2.75 2.75 0 0 1 4.25 20V4Zm7 14a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
        </svg>
  }, {
    name: "Slides",
    iconSvg: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M20 2.25A2.75 2.75 0 0 1 22.75 5v14A2.75 2.75 0 0 1 20 21.75h-8A2.75 2.75 0 0 1 9.25 19V5A2.75 2.75 0 0 1 12 2.25h8Zm-8 1.5c-.69 0-1.25.56-1.25 1.25v14c0 .69.56 1.25 1.25 1.25h8c.69 0 1.25-.56 1.25-1.25V5c0-.69-.56-1.25-1.25-1.25h-8Z" clip-rule="evenodd" /><path d="M6 4.25a.75.75 0 0 1 .75.75v14a.75.75 0 0 1-1.5 0V5A.75.75 0 0 1 6 4.25ZM2 6.25a.75.75 0 0 1 .75.75v10a.75.75 0 0 1-1.5 0V7A.75.75 0 0 1 2 6.25Z" /></svg>',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path fillRule="evenodd" d="M20 2.25A2.75 2.75 0 0 1 22.75 5v14A2.75 2.75 0 0 1 20 21.75h-8A2.75 2.75 0 0 1 9.25 19V5A2.75 2.75 0 0 1 12 2.25h8Zm-8 1.5c-.69 0-1.25.56-1.25 1.25v14c0 .69.56 1.25 1.25 1.25h8c.69 0 1.25-.56 1.25-1.25V5c0-.69-.56-1.25-1.25-1.25h-8Z" clipRule="evenodd" />
          <path d="M6 4.25a.75.75 0 0 1 .75.75v14a.75.75 0 0 1-1.5 0V5A.75.75 0 0 1 6 4.25ZM2 6.25a.75.75 0 0 1 .75.75v10a.75.75 0 0 1-1.5 0V7A.75.75 0 0 1 2 6.25Z" />
        </svg>
  }, {
    name: "Animation",
    iconSvg: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M10.024 7.25c.31.004.613.091.878.251l4.996 2.996a1.752 1.752 0 0 1 .625 2.367 1.75 1.75 0 0 1-.625.639v-.001l-4.995 2.995.001.001a1.75 1.75 0 0 1-2.654-1.505v-5.99a1.75 1.75 0 0 1 1.774-1.753Zm-.02 1.5a.252.252 0 0 0-.22.124.253.253 0 0 0-.034.127v5.998a.252.252 0 0 0 .127.219.253.253 0 0 0 .252-.004l.002-.001 4.997-2.997.002-.001a.252.252 0 0 0 .122-.215.25.25 0 0 0-.122-.215h-.002L10.13 8.786h-.002a.25.25 0 0 0-.125-.037Z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 1.25c5.937 0 10.75 4.813 10.75 10.75S17.937 22.75 12 22.75 1.25 17.937 1.25 12 6.063 1.25 12 1.25Zm0 1.5a9.25 9.25 0 1 0 0 18.5 9.25 9.25 0 0 0 0-18.5Z" clip-rule="evenodd" /></svg>',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path fillRule="evenodd" d="M10.024 7.25c.31.004.613.091.878.251l4.996 2.996a1.752 1.752 0 0 1 .625 2.367 1.75 1.75 0 0 1-.625.639v-.001l-4.995 2.995.001.001a1.75 1.75 0 0 1-2.654-1.505v-5.99a1.75 1.75 0 0 1 1.774-1.753Zm-.02 1.5a.252.252 0 0 0-.22.124.253.253 0 0 0-.034.127v5.998a.252.252 0 0 0 .127.219.253.253 0 0 0 .252-.004l.002-.001 4.997-2.997.002-.001a.252.252 0 0 0 .122-.215.25.25 0 0 0-.122-.215h-.002L10.13 8.786h-.002a.25.25 0 0 0-.125-.037Z" clipRule="evenodd" />
          <path fillRule="evenodd" d="M12 1.25c5.937 0 10.75 4.813 10.75 10.75S17.937 22.75 12 22.75 1.25 17.937 1.25 12 6.063 1.25 12 1.25Zm0 1.5a9.25 9.25 0 1 0 0 18.5 9.25 9.25 0 0 0 0-18.5Z" clipRule="evenodd" />
        </svg>
  }, {
    name: "Design",
    iconSvg: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6.5 11.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM17.5 9.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM8.5 6.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM13.5 5.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z" /><path fill-rule="evenodd" d="M12 1.25c2.827 0 5.553 1.01 7.573 2.828C21.596 5.9 22.75 8.388 22.75 11A5.749 5.749 0 0 1 17 16.75h-2.25a1 1 0 0 0-.8 1.6l.3.4.1.143a2.5 2.5 0 0 1-2.1 3.857H12a10.75 10.75 0 1 1 0-21.5Zm0 1.5a9.25 9.25 0 1 0 0 18.5h.25a1 1 0 0 0 .8-1.6l-.3-.4a2.5 2.5 0 0 1 2-4H17l.21-.005A4.25 4.25 0 0 0 21.25 11c0-2.161-.953-4.252-2.68-5.807C16.84 3.636 14.476 2.75 12 2.75Z" clip-rule="evenodd" /></svg>',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6.5 11.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM17.5 9.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM8.5 6.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM13.5 5.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z" />
          <path fillRule="evenodd" d="M12 1.25c2.827 0 5.553 1.01 7.573 2.828C21.596 5.9 22.75 8.388 22.75 11A5.749 5.749 0 0 1 17 16.75h-2.25a1 1 0 0 0-.8 1.6l.3.4.1.143a2.5 2.5 0 0 1-2.1 3.857H12a10.75 10.75 0 1 1 0-21.5Zm0 1.5a9.25 9.25 0 1 0 0 18.5h.25a1 1 0 0 0 .8-1.6l-.3-.4a2.5 2.5 0 0 1 2-4H17l.21-.005A4.25 4.25 0 0 0 21.25 11c0-2.161-.953-4.252-2.68-5.807C16.84 3.636 14.476 2.75 12 2.75Z" clipRule="evenodd" />
        </svg>
  }];
  const checkSvg = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M20.53 5.47a.75.75 0 0 1 0 1.06l-11 11a.75.75 0 0 1-1.06 0l-5-5a.75.75 0 1 1 1.06-1.06L9 15.94 19.47 5.47a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" /></svg>';
  if (typeof document !== "undefined" && !document.getElementById("agent-input-styles")) {
    const style = document.createElement("style");
    style.id = "agent-input-styles";
    style.textContent = `
      /* Theme variables - light mode */
      [data-agent-input-container] {
        --ai-surface-bg: var(--replit-docs-bg, #F6F6F4);
        --ai-surface-higher: var(--replit-docs-bg-elevated, #F1F1EE);
        --ai-border-default: var(--replit-docs-border, #DEDAD5);
        --ai-border-strong: var(--replit-docs-border-strong, #CAC4BE);
        --ai-text-secondary: var(--replit-docs-text-muted, #5C5C5C);
        --ai-text-tertiary: var(--replit-docs-text-subtle, #858585);
        --ai-text-primary: var(--replit-docs-text, #1D1D1D);
        --ai-button-bg: var(--replit-docs-bg-muted, #F1F1EE);
        --ai-button-bg-hover: var(--replit-docs-bg-elevated, #F1F1EE);
        --ai-icon-default: var(--replit-docs-text-subtle, #858585);
        --ai-icon-hover: var(--replit-docs-text-muted, #5C5C5C);
        --ai-shadow: 0 2px 6px #00000005;
        --ai-option-bg: var(--replit-docs-bg-elevated, #F1F1EE);
        --ai-option-border: var(--replit-docs-border, #DEDAD5);
        --ai-option-hover-bg: var(--replit-docs-bg-muted, #F1F1EE);
        --ai-option-selected-bg: var(--replit-docs-bg-muted, #F1F1EE);
        --ai-pill-bg: #CDDCF1;
        --ai-pill-text: var(--replit-docs-text-muted, #5C5C5C);
      }

      /* Theme variables - dark mode */
      .dark [data-agent-input-container],
      html.dark [data-agent-input-container],
      [data-theme="dark"] [data-agent-input-container] {
        --ai-surface-bg: var(--replit-docs-bg, #1E1E1F);
        --ai-surface-higher: var(--replit-docs-bg-elevated, #222223);
        --ai-border-default: var(--replit-docs-border, #39393D);
        --ai-border-strong: var(--replit-docs-border-strong, #4A4A50);
        --ai-text-secondary: var(--replit-docs-text-muted, #B8B8BE);
        --ai-text-tertiary: var(--replit-docs-text-subtle, #8E8F97);
        --ai-text-primary: var(--replit-docs-text, #F5F5F5);
        --ai-button-bg: var(--replit-docs-bg-elevated, #222223);
        --ai-button-bg-hover: var(--replit-docs-bg-muted, #222223);
        --ai-icon-default: var(--replit-docs-text-subtle, #8E8F97);
        --ai-icon-hover: var(--replit-docs-text-muted, #B8B8BE);
        --ai-shadow: 0 2px 6px #00000020;
        --ai-option-bg: var(--replit-docs-bg-elevated, #222223);
        --ai-option-border: var(--replit-docs-border, #39393D);
        --ai-option-hover-bg: var(--replit-docs-bg-muted, #222223);
        --ai-option-selected-bg: var(--replit-docs-bg-muted, #222223);
        --ai-pill-bg: #2A3A4D;
        --ai-pill-text: #D0D8E4;
      }

      .agent-input-container {
        box-sizing: border-box;
      }

      /* Entry animation */
      @keyframes agent-input-fade-in-up {
        from { transform: translateY(10px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }

      /* Hover state for input box */
      [data-agent-input-container]:has([data-agent-input-role="inner"]:hover) [data-agent-input-role="inner"] {
        border-color: #85C7FF !important;
      }

      /* Focus state for input box */
      [data-agent-input-container]:has([data-agent-input-role="inner"]:focus-within) [data-agent-input-role="inner"] {
        border-color: #0079F2 !important;
      }

      /* Icon button hover */
      @media (hover: hover) {
        [data-agent-input-container] .ai-icon-btn:hover {
          background: var(--ai-button-bg-hover);
        }
        [data-agent-input-container] .ai-icon-btn:hover svg {
          color: var(--ai-icon-hover);
        }
        [data-agent-input-container] .ai-option-btn:not([data-selected="true"]):hover {
          background: var(--ai-option-hover-bg);
        }
        [data-agent-input-container] .ai-plan-btn:hover {
          background: var(--ai-button-bg-hover);
        }
        [data-agent-input-container] .ai-nav-btn:hover svg {
          color: var(--ai-icon-hover);
        }
        [data-agent-input-container] .ai-pill-close:hover {
          opacity: 0.7;
        }
      }
      @keyframes plan-border-spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      [data-agent-input-container] .ai-plan-wrap {
        position: relative;
        border-radius: 32px;
        padding: 2px;
        overflow: hidden;
      }
      [data-agent-input-container] .ai-plan-wrap::before {
        content: '';
        position: absolute;
        inset: -50%;
        background: conic-gradient(
          #3b82f6, #8b5cf6, #ec4899, #f59e0b, #10b981, #3b82f6
        );
        animation: plan-border-spin 1s linear infinite;
      }
      [data-agent-input-container] .ai-plan-wrap .ai-plan-btn-highlight {
        position: relative;
        background: var(--ai-surface-higher);
        color: var(--ai-text-primary);
        font-weight: 400;
        border: none;
        border-radius: 32px;
        z-index: 1;
      }
      [data-agent-input-container] .ai-plan-wrap.ai-plan-off::before {
        animation: none;
        background: transparent;
      }
      [data-agent-input-container] .ai-plan-wrap.ai-plan-off .ai-plan-btn-highlight {
        background: var(--ai-button-bg);
        color: var(--ai-text-secondary);
      }
      /* Plan checkbox styles */
      [data-agent-input-container] .ai-plan-checkbox-label {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        height: 32px;
        padding: 0 8px;
        border-radius: var(--border-radius-6, 6px);
        background: var(--ai-button-bg);
        cursor: pointer;
        font-size: 12px;
        font-family: inherit;
        color: var(--ai-text-secondary);
        transition: background 120ms ease-out;
        user-select: none;
      }
      @media (hover: hover) {
        [data-agent-input-container] .ai-plan-checkbox-label:hover {
          background: var(--ai-button-bg-hover);
        }
      }
      [data-agent-input-container] .ai-plan-checkbox-input {
        width: 20px;
        height: 20px;
        margin: 0;
        accent-color: #0079F2;
        cursor: pointer;
      }
      [data-agent-input-container] .ai-start-wrap {
        position: relative;
        display: inline-flex;
        padding: 3px;
        border-radius: 8px;
        overflow: hidden;
      }
      [data-agent-input-container] .ai-start-wrap::before {
        content: '';
        position: absolute;
        inset: -50%;
        background: conic-gradient(
          #3b82f6, #8b5cf6, #ec4899, #f59e0b, #10b981, #3b82f6
        );
        animation: plan-border-spin 1s linear infinite;
      }
      [data-agent-input-container] .ai-start-wrap .ai-start-btn-highlight {
        position: relative;
        background: var(--ai-surface-higher);
        border: none;
        border-radius: 6px;
        z-index: 1;
      }
    `;
    document.head.appendChild(style);
  }
  const getLink = (container, promptOverride) => {
    if (typeof document === "undefined" || !window.LZString) return "";
    const prompt = promptOverride || getAgentInputPromptValue(container);
    if (!prompt) return "";
    const encoded = window.LZString.compressToEncodedURIComponent(prompt);
    const utm = "utm_source=replit-docs&utm_medium=docs&utm_campaign=docs-intro-agent-input&utm_content=homepage-prompt-box";
    return `https://replit.com/?prompt=${encoded}&referrer=replit-docs&${utm}`;
  };
  const handleStartClick = e => {
    e.preventDefault();
    const container = findAgentInputContainer(e.currentTarget);
    const link = getLink(container);
    if (link) window.open(link, "_blank");
  };
  const toggleOutputType = name => {
    const btn = document.querySelector(`[data-option-name="${name}"]`);
    const pillsContainer = document.getElementById("agent-input-pills");
    if (!btn || !pillsContainer) return;
    const isSelected = btn.dataset.selected === "true";
    if (isSelected) {
      btn.dataset.selected = "false";
      btn.style.background = "var(--ai-option-bg)";
      const iconEl = btn.querySelector(".option-icon");
      const type = outputTypes.find(t => t.name === name);
      if (iconEl && type) iconEl.innerHTML = type.iconSvg;
      const pill = document.getElementById(`pill-${name}`);
      if (pill) pill.remove();
    } else {
      document.querySelectorAll('[data-option-name][data-selected="true"]').forEach(prevBtn => {
        const prevName = prevBtn.dataset.optionName;
        prevBtn.dataset.selected = "false";
        prevBtn.style.background = "var(--ai-option-bg)";
        const prevIconEl = prevBtn.querySelector(".option-icon");
        const prevType = outputTypes.find(t => t.name === prevName);
        if (prevIconEl && prevType) prevIconEl.innerHTML = prevType.iconSvg;
        const prevPill = document.getElementById(`pill-${prevName}`);
        if (prevPill) prevPill.remove();
      });
      btn.dataset.selected = "true";
      btn.style.background = "var(--ai-option-selected-bg)";
      const iconEl = btn.querySelector(".option-icon");
      if (iconEl) iconEl.innerHTML = checkSvg;
      const type = outputTypes.find(t => t.name === name);
      if (type) {
        const pill = document.createElement("span");
        pill.id = `pill-${name}`;
        pill.style.cssText = "display:inline-flex;align-items:center;gap:6px;height:32px;padding:0 8px 0 8px;border-radius:32px;background:var(--ai-pill-bg);color:var(--ai-pill-text);font-size:14px;white-space:nowrap;cursor:default;";
        pill.innerHTML = `<span style="display:flex;align-items:center"><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">${type.iconSvg.replace(/<svg[^>]*>/, "").replace("</svg>", "")}</svg></span><span>${name}</span><span class="ai-pill-close" style="display:flex;align-items:center;cursor:pointer;margin-left:2px" data-pill-remove="${name}"><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18.3 5.71a1 1 0 0 0-1.42 0L12 10.59 7.12 5.7A1 1 0 0 0 5.7 7.12L10.59 12 5.7 16.88a1 1 0 1 0 1.42 1.42L12 13.41l4.88 4.89a1 1 0 0 0 1.42-1.42L13.41 12l4.89-4.88a1 1 0 0 0 0-1.41Z"/></svg></span>`;
        pill.querySelector(`[data-pill-remove="${name}"]`).addEventListener("click", () => toggleOutputType(name));
        pillsContainer.appendChild(pill);
      }
    }
  };
  const PlusIcon = <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 4.25a.75.75 0 0 1 .75.75v6.25H19a.75.75 0 0 1 0 1.5h-6.25V19a.75.75 0 0 1-1.5 0v-6.25H5a.75.75 0 0 1 0-1.5h6.25V5a.75.75 0 0 1 .75-.75Z" />
    </svg>;
  const MicIcon = <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 9.25a.75.75 0 0 1 .75.75v2a7.75 7.75 0 0 1-7 7.713V22a.75.75 0 0 1-1.5 0v-2.287a7.75 7.75 0 0 1-6.99-7.328L4.25 12v-2a.75.75 0 0 1 1.5 0v2l.008.31A6.25 6.25 0 0 0 12 18.25l.31-.008a6.249 6.249 0 0 0 5.932-5.932l.008-.31v-2a.75.75 0 0 1 .75-.75Z" />
      <path fillRule="evenodd" d="M12 1.25A3.75 3.75 0 0 1 15.75 5v7a3.75 3.75 0 1 1-7.5 0V5A3.75 3.75 0 0 1 12 1.25Zm0 1.5A2.25 2.25 0 0 0 9.75 5v7a2.25 2.25 0 0 0 4.5 0V5A2.25 2.25 0 0 0 12 2.75Z" clipRule="evenodd" />
    </svg>;
  const ArrowUpIcon = <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" d="M11.47 4.47a.75.75 0 0 1 1.06 0l7 7a.75.75 0 1 1-1.06 1.06l-5.72-5.72V19a.75.75 0 0 1-1.5 0V6.81l-5.72 5.72a.75.75 0 0 1-1.06-1.06l7-7Z" clipRule="evenodd" />
    </svg>;
  const ArrowLeftIcon = <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" d="M4.47 11.47a.75.75 0 0 0 0 1.06l7 7a.75.75 0 1 0 1.06-1.06l-5.72-5.72H19a.75.75 0 0 0 0-1.5H6.81l5.72-5.72a.75.75 0 0 0-1.06-1.06l-7 7Z" clipRule="evenodd" />
    </svg>;
  const ArrowRightIcon = <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" d="M19.53 11.47a.75.75 0 0 1 0 1.06l-7 7a.75.75 0 1 1-1.06-1.06l5.72-5.72H5a.75.75 0 0 1 0-1.5h12.19l-5.72-5.72a.75.75 0 0 1 1.06-1.06l7 7Z" clipRule="evenodd" />
    </svg>;
  const iconBtnStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "28px",
    height: "28px",
    border: "none",
    borderRadius: "6px",
    background: "transparent",
    cursor: "pointer",
    color: "var(--ai-icon-default)",
    padding: 0,
    transition: "background 120ms ease-out"
  };
  const optionIconStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "48px",
    height: "48px",
    border: "1px solid var(--ai-option-border)",
    borderRadius: "12px",
    background: "var(--ai-option-bg)",
    cursor: "pointer",
    color: "var(--ai-text-secondary)",
    padding: 0,
    transition: "background 120ms ease-out",
    flexShrink: 0
  };
  const initAgentInput = container => {
    if (!container) {
      return;
    }
    updateAgentInputButtonState(container);
    startAgentInputTypewriter(container, {
      defaultPrompt,
      placeholder,
      showTypewriter
    });
    const ta = container.querySelector('[data-agent-input-role="textarea"]');
    if (ta && ta.value) {
      requestAnimationFrame(() => {
        ta.style.height = "auto";
        ta.style.height = ta.scrollHeight + "px";
      });
    }
  };
  return <div ref={initAgentInput} data-agent-input-container className="agent-input-container" style={{
    fontFamily: "'IBM Plex Sans', sans-serif",
    width: "100%",
    maxWidth: "734px",
    alignSelf: "center",
    margin: "48px auto",
    opacity: 0,
    animation: "agent-input-fade-in-up 300ms ease-out forwards"
  }}>
      <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "24px"
  }}>
        {}
        <div data-agent-input-role="inner" style={{
    position: "relative",
    borderRadius: "6px",
    border: "1px solid var(--ai-border-strong)",
    background: "var(--ai-surface-bg)",
    transition: "border-color 120ms ease-out",
    boxShadow: "var(--ai-shadow)"
  }}>
          {}
          <div style={{
    padding: "12px 12px 48px 12px"
  }}>
            <textarea data-agent-input-role="textarea" placeholder={placeholder} defaultValue={defaultPrompt} rows={1} onInput={e => {
    const ta = e.currentTarget;
    ta.style.height = "auto";
    ta.style.height = ta.scrollHeight + "px";
    updateAgentInputButtonState(findAgentInputContainer(ta));
  }} style={{
    display: "block",
    width: "100%",
    minHeight: "21px",
    maxHeight: "calc(14px * 1.5 * 10)",
    padding: 0,
    margin: 0,
    border: "none",
    outline: "none",
    resize: "none",
    fontSize: "14px",
    lineHeight: "1.5",
    color: "var(--ai-text-primary)",
    background: "transparent",
    fontFamily: "inherit",
    boxSizing: "border-box",
    overflowY: "auto"
  }} />
          </div>
          {}
          <div style={{
    position: "absolute",
    left: "8px",
    right: "8px",
    bottom: "8px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }}>
            {}
            <div style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    overflow: "hidden",
    minWidth: 0
  }}>
              <button className="ai-icon-btn" style={iconBtnStyle} aria-label="Add attachment" type="button">
                {PlusIcon}
              </button>
              <div id="agent-input-pills" data-agent-input-role="pills" style={{
    display: "flex",
    alignItems: "center",
    gap: "6px",
    overflow: "hidden"
  }}></div>
            </div>
            {}
            <div style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    flexShrink: 0
  }}>
              {highlightPlan ? <div className="ai-plan-wrap" onClick={e => {
    const wrap = e.currentTarget;
    wrap.classList.toggle("ai-plan-off");
  }}>
                  <label className="ai-plan-btn-highlight" style={{
    display: "flex",
    alignItems: "center",
    gap: "6px",
    height: "32px",
    padding: "0 8px",
    cursor: "pointer",
    fontSize: "12px",
    fontFamily: "inherit",
    transition: "background 120ms ease-out"
  }}>
                    <input className="ai-plan-checkbox-input" type="checkbox" aria-label="Plan mode" name="Plan mode" defaultChecked />
                    <span>Plan</span>
                  </label>
                </div> : <label className="ai-plan-checkbox-label">
                  <input className="ai-plan-checkbox-input" type="checkbox" aria-label="Plan mode" name="Plan mode" />
                  <span>Plan</span>
                </label>}
              <button className="ai-icon-btn" style={iconBtnStyle} aria-label="Start voice input" type="button">
                {MicIcon}
              </button>
              {highlightStart ? <div className="ai-start-wrap">
                  <button data-agent-input-role="start-button" className="ai-icon-btn ai-start-btn-highlight" onClick={handleStartClick} type="button" aria-label="Start" style={{
    ...iconBtnStyle,
    borderRadius: "6px",
    background: "#0079F2",
    color: "#fff",
    opacity: defaultPrompt ? "1" : "0.4",
    cursor: defaultPrompt ? "pointer" : "not-allowed"
  }}>
                    {ArrowUpIcon}
                  </button>
                </div> : <button data-agent-input-role="start-button" className="ai-icon-btn" onClick={handleStartClick} type="button" aria-label="Start" style={{
    ...iconBtnStyle,
    background: "#0079F2",
    color: "#fff",
    opacity: defaultPrompt ? "1" : "0.4",
    cursor: defaultPrompt ? "pointer" : "not-allowed"
  }}>
                  {ArrowUpIcon}
                </button>}
            </div>
          </div>
        </div>
      </div>
    </div>;
};

<YouTubeEmbed videoId="bAUVQfz_SIY" title="Introducing Replit Agent 4" />

## What is Replit Agent?

Agent is your creative partner. Agent takes your ideas, helps you refine them, and then makes them real. Unlike a chatbot that only answers questions, Agent takes action: it sets up your project, creates applications, checks its work, and fixes problems along the way.

Describe what you want in everyday language. No code or technical knowledge required. Agent handles the rest, from planning to deployment.

## How to use Replit Agent

### Getting started

<Steps>
  <Step title="Describe what you want">
    In the [Project Editor](/learn/projects-and-artifacts/project-editor), just start chatting. Describe an app you want to build, ask a question, research a topic, or pull data from [connected services](/features/agent/general-agent) like BigQuery, Slack, or Notion. There are no constraints. Replit Agent handles whatever you throw at it.

    <AgentInput />
  </Step>

  <Step title="Choose what to build">
    Optionally, select a project type: web app, mobile app, slides, design, data visualization, and more. If you already described what you want in step 1, Agent figures out the right setup automatically.

    <AgentCarousel />
  </Step>

  <Step title="Agent builds it">
    Agent writes code, sets up infrastructure, and tests the result. Once you're in your project, you can switch between [Agent modes](#agent-modes) to control how it builds.
  </Step>

  <Step>
    Chat with Agent to refine your project, then publish when you're ready. All artifacts publish together.
  </Step>
</Steps>

<Note>You're not locked into one type. Start with a web app and add a mobile app, slides, or a video later — all in the same project.</Note>

### Plan mode

Enable Plan mode to brainstorm, ask questions, and map out your project before Agent changes any code or data. In Plan mode, Agent will:

* **Break down complex projects** into ordered task lists
* **Explore different approaches** and weigh trade-offs
* **Review and refine** before any code is written

Click "Plan" in the chat input — or simply ask Agent — to switch to Plan mode. Example: "Create a plan to build a project tracker for my team"

<AgentInput highlightPlan={true} showTypewriter={false} />

Agent creates an ordered task list you can review and refine. When you're happy with the plan, approve it and Agent starts building.

<Frame>
  <img src="https://mintcdn.com/replit/L22mbBMLs80H8_c8/images/replitai/task-accept-plans.png?fit=max&auto=format&n=L22mbBMLs80H8_c8&q=85&s=e788fc99c5fce2644d144f88419ba00c" alt="Task plans created dialog showing four proposed tasks with Accept tasks and Revise plan options" width="3430" height="1986" data-path="images/replitai/task-accept-plans.png" />
</Frame>

Learn more in the [Plan mode guide](/features/agent/plan-mode).

### Agent modes

Choose how Agent builds your project:

<AgentModes />

* **Lite**: Make lightweight, inexpensive changes quickly. Lite mode is ideal for visual tweaks, bug fixes, and scoped features.
* **Economy**: Use Agent's cost-optimized models for everyday tasks. Expand **Advanced settings** to manage features like App Testing and High effort.
* **Power**: Use Agent's most capable models for harder problems, larger changes, and longer builds. In **Advanced settings**, you can also turn on **Turbo** for up to 2.5x faster builds at higher cost (Pro and Enterprise).

You can raise the [Effort](/features/agent/model-selector#effort) so Agent reaches for its most powerful frontier model on the most complex tasks.

<Note>Tip: You can also enable **[Plan mode](/features/agent/plan-mode)** to review and iterate on Agent's plan before building begins. Max mode is no longer available; use Power for the most capable standard builds.</Note>

## What you can build with the Replit Agent

* **Web apps, mobile apps, data dashboards, and AI-powered tools**
* **Visual designs and prototypes** — explore mockups on the [Design Canvas](/design/canvas) before committing to code
* **Multiple outputs in one project** — web apps, mobile apps, slides, and videos sharing the same backend
* **Files and documents** — CSVs, PDFs, PowerPoint files, Markdown docs
* **Connected service queries** — pull data from BigQuery, Linear, Slack, Notion, and more directly from chat

<Card title="Start building now" icon="arrow-up-right" href="https://replit.com">
  Describe your idea and let Agent bring it to life — no setup required.
</Card>

## Frequently asked questions

<Accordion title="Do I need to know how to code?">
  No. Agent handles all the technical work — writing code, setting up infrastructure, configuring databases. You describe what you want in plain language and Agent builds it.
</Accordion>

<Accordion title="What's the difference between Lite, Economy, and Power?">
  **Lite** is for quick, targeted changes (10-60 seconds) such as visual tweaks, bug fixes, and scoped features. **Economy** is the best default for most builds when you want to balance cost and quality. **Power** uses the most capable models for harder tasks, and **Turbo** is an optional Power-only toggle in Advanced settings when you need the fastest runs. You can raise the [Effort](/features/agent/model-selector#effort) so Agent applies its most powerful frontier model to the most complex tasks.
</Accordion>

<Accordion title="Can I build more than one thing in a project?">
  Yes. You can add web apps, mobile apps, slides, videos, and data visualizations to the [same project](/features/projects-and-artifacts/artifacts#multiple-artifacts-in-one-project) — all sharing the same backend and data.
</Accordion>

<Accordion title="What happens if Agent makes a mistake?">
  Agent tests its own work on a regular basis. Agent also creates checkpoints as it works, so you can roll back to any previous state. You can also chat with Agent to describe what went wrong and it will fix the issue.
</Accordion>

## Availability

| Capability              | Core | Pro |
| ----------------------- | ---- | --- |
| Agent chat and building | ✅    | ✅   |
| Lite mode               | ✅    | ✅   |
| Economy mode            | ✅    | ✅   |
| Power mode              | ✅    | ✅   |
| Design Canvas           | ✅    | ✅   |
| Multi-Artifacts         | ✅    | ✅   |
| Active background tasks | 1    | 10  |
| Turbo                   | ❌    | ✅   |

Turbo is off by default on every plan—turn it on per project when you need it. On Enterprise, it isn't available until an admin enables it for the organization.

For detailed pricing, see [Agent billing](/billing/ai-billing#agent-billing).

## Next steps

<CardGroup cols={2}>
  <Card title="Agent Skills" icon="puzzle-piece" href="/features/agent/skills">
    Teach Agent specialized knowledge — use pre-built skills or create your own.
  </Card>

  <Card title="Task system" icon="list-check" href="/core-concepts/agent/task-system">
    Kanban planning, background tasks, and changes applied back to the main version.
  </Card>

  <Card title="Design Canvas" icon="paintbrush" href="/design/canvas">
    Visual mockups and the hands-on visual editor.
  </Card>

  <Card title="Connectors" icon="plug" href="/features/agent/general-agent">
    Connect BigQuery, Linear, Slack, Notion, and more.
  </Card>

  <Card title="Billing" icon="credit-card" href="/billing/ai-billing#agent-billing">
    Agent pricing, plan comparison, and spending management.
  </Card>

  <Card title="Vibe coding guide" icon="wand-magic-sparkles" href="/learn/build-with-agent">
    Tips for effective prompting and building with AI.
  </Card>
</CardGroup>
