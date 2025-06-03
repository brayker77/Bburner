// --------------------------------------------------
// set.js v1.2
// Chooses the best hacking target and writes strategy.json
// Runs on home only
// --------------------------------------------------

/** @param {NS} ns */
export async function main(ns) {
    ns.disableLog("ALL");

    const strategyFile = "strategy.json";

    while (true) {
        const servers = getAllServers(ns);
        const rooted = servers.filter(s => ns.hasRootAccess(s) && ns.getServerMaxMoney(s) > 0);

        const ranked = rooted
            .filter(s => ns.getHackingLevel() >= ns.getServerRequiredHackingLevel(s))
            .map(s => ({
                name: s,
                score: getTargetScore(ns, s),
                money: ns.getServerMaxMoney(s),
                hackTime: ns.getHackTime(s),
                minSec: ns.getServerMinSecurityLevel(s),
                currentSec: ns.getServerSecurityLevel(s),
            }))
            .sort((a, b) => b.score - a.score);

        if (ranked.length > 0) {
            const target = ranked[0];
            const data = {
                target: target.name,
                score: target.score,
                mode: "money",
                updated: true,
                timestamp: Date.now()
            };
            await ns.write(strategyFile, JSON.stringify(data, null, 2), 'w');
            ns.print(`[SET] Target: ${target.name}, Score: ${target.score.toFixed(2)}`);
        } else {
            ns.print("[SET] No valid targets found.");
        }

        await ns.sleep(10000);
    }
}
