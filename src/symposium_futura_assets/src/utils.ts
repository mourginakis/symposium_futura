export function rand_nth(a: Array<String>): String {
    return a[Math.floor(Math.random() * a.length)];
}