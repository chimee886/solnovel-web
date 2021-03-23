export function realPx(px) {
    const maxWidth = window.innerWidth > 500 ? 500 : window.innerWidth
    return px * (maxWidth / 375)
}
let $ratio = 375 / 10;
export function px2rem(px) {
    return px / $ratio + 'rem'
}