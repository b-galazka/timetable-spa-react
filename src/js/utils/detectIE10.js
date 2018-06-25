export default function detectIE10() {

    const { userAgent } = navigator;

    return userAgent.includes('MSIE ') || /Trident.*rv\:11\./.test(userAgent);
}