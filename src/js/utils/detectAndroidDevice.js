export default function detectAndroidDevice() {

    const userAgent = navigator.userAgent.toLowerCase();

    return userAgent.includes('android');
}