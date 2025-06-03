// --------------------------------------------------
// g.js v1.0
// Executes a grow() call on a given target
// --------------------------------------------------

/** @param {NS} ns */
export async function main(ns) {
    const target = ns.args[0];
    if (!target) {
        ns.tprint("[GROW] No target provided.");
        return;
    }
    await ns.grow(target);
}
