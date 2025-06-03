// --------------------------------------------------
// w.js v1.0
// Executes a weaken() call on a given target
// --------------------------------------------------

/** @param {NS} ns */
export async function main(ns) {
    const target = ns.args[0];
    if (!target) {
        ns.tprint("[WEAKEN] No target provided.");
        return;
    }
    await ns.weaken(target);
}
