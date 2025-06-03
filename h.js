// --------------------------------------------------
// h.js v1.0
// Executes a hack() call on a given target
// --------------------------------------------------

/** @param {NS} ns */
export async function main(ns) {
    const target = ns.args[0];
    if (!target) {
        ns.tprint("[HACK] No target provided.");
        return;
    }
    await ns.hack(target);
}
