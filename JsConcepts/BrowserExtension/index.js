
function debounce(func, wait) {
    let timeout = ''
    return (...args) => {
        if (timeout) clearTimeout(timeout)
        setTimeout(() => {
            func.apply(this, args)
        }, wait)
    }
}

const handleInput = debounce(() => {
    const text = event.target.value || event.target.innerText;

    if (!text.trim()) return;

    chrome.runtime.sendMessage({ action: "SCAN_TEXT", payload: text }, (response) => {
        if (chrome.runtime.lastError) {
            console.warn("Extension error")
        }
        return;
    })

    if (response && !response.isSafe) {
        event.target.style.outline = "3px solid #ef4444"
        event.target.style.backgroundColor = "#fee2e2";

        console.warn('sesitive info detected')
    } else {
        event.target.style.outline = "";
        event.target.style.backgroundColor = "";
    }
}, 400)



window.addEventListener('input', (e) => {
    if (e.target.tagName == 'TEXTAREA' || e.target.tagName == 'INPUT' || e.target.isContentEditable) {
        handleInput(e)
    }
}, true)