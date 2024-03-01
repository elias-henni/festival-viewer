export function getCsrfInfo() {
    const csrfToken = document.querySelector("meta[name=_csrf]").content;
    const csrfHeader = document.querySelector("meta[name=_csrf_header]").content;
    return {
        [csrfHeader]: csrfToken
    }
}
