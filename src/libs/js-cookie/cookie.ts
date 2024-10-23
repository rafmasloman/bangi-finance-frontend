import Cookies from 'js-cookie';

class JSCookie {
  getCookie(tokenName: string) {
    return Cookies.get(tokenName);
  }

  setCookie(tokenName: string, value: string) {
    return Cookies.set(tokenName, value);
  }

  deleteCookie(name: string) {
    return Cookies.remove(name);
  }
}

const cookieLibs = new JSCookie();

export default cookieLibs;
