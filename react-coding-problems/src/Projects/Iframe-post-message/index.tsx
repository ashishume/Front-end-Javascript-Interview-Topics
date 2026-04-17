import { useEffect, useMemo, useRef, useState } from "react";
import iframePageUrl from "./iframe.html?url";

function App() {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [lastFromIframe, setLastFromIframe] = useState<string>(
        "Nothing received yet — use the buttons inside the iframe."
    );

    const iframeSrc = useMemo(() => {
        const u = new URL(iframePageUrl, window.location.href);
        u.searchParams.set("parent", window.location.origin);
        return u.toString();
    }, []);

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.origin !== window.location.origin) return;
            const { type, payload } = event.data as {
                type?: string;
                payload?: unknown;
            };
            if (type === "USER_ACTION") {
                setLastFromIframe(JSON.stringify(payload, null, 2));
            }
        };
        window.addEventListener("message", handleMessage);
        return () => {
            window.removeEventListener("message", handleMessage);
        };
    }, []);

    const sendPing = () => {
        iframeRef.current?.contentWindow?.postMessage(
            { type: "PING", sentAt: Date.now() },
            window.location.origin
        );
    };

    return (
        <div style={{ padding: 16, maxWidth: 720 }}>
            <p style={{ marginTop: 0 }}>
                The child UI lives in <code>iframe.html</code>. The parent sets{" "}
                <code>src</code> to that file with{" "}
                <code>
                    ?parent=
                    {encodeURIComponent(window.location.origin)}
                </code>{" "}
                so the iframe reads the expected parent origin and both sides can
                validate <code>postMessage</code> with{" "}
                <code>window.location.origin</code>.
            </p>
            <button type="button" onClick={sendPing} style={{ marginBottom: 12 }}>
                Send PING to iframe
            </button>
            <section style={{ marginBottom: 12 }}>
                <strong>Last payload from iframe (parent state)</strong>
                <pre
                    style={{
                        margin: "8px 0 0",
                        padding: 12,
                        background: "#f4f4f5",
                        borderRadius: 8,
                        fontSize: 13,
                        overflow: "auto",
                    }}
                >
                    {lastFromIframe}
                </pre>
            </section>
            <iframe
                ref={iframeRef}
                src={iframeSrc}
                title="Embedded app (iframe.html)"
                style={{
                    width: "100%",
                    height: 280,
                    border: "1px solid #d4d4d8",
                    borderRadius: 8,
                }}
            />
        </div>
    );
}

export default App;
