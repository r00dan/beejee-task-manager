const ttl = 24 * 60 * 60 * 1000; //token lifetime in ms

export function getExpiryToken () {
    if (!isTokenExpiredOrNotCreated()) {
        return JSON.parse(localStorage.getItem('act')).value;
    }
    else {
        return null;
    }
}

export function setExpiryToken (value) {
    const now = new Date();
    const item = {
        value: value,
        expiry: now.getTime() + ttl
    }
    localStorage.setItem('act', JSON.stringify(item));
}

export function isTokenExpiredOrNotCreated () {
    const itemStr = localStorage.getItem('act');
    const item = JSON.parse(itemStr);
    const now = new Date();

    if (!itemStr) {
        return true;
    } 
    else if (now.getTime() > item.expiry) {
        localStorage.removeItem('act');
        return true;
    }
    else {
        return false;
    }
}

export function destroyToken () {
    !isTokenExpiredOrNotCreated() && localStorage.removeItem('act');
}
