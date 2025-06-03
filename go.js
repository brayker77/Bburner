// --------------------------------------------------
// go.js v1.2
// Reads strategy.json and deploys basic hack/grow/weaken scripts based on available RAM
// Temporary executor for early deployment – to be replaced by batcher/deploy system
// --------------------------------------------------

/** @param {NS} ns */
export async function main(ns) {
    ns.disableLog("ALL");

    const strategyFile = "strategy.json";
    const scriptMap = {
        hack: "h.js",
        grow: "g.js",
        weaken: "w.js"
    };

    const ramPerThread = {
        hack: 1.7,
        grow: 1.75,
        weaken: 1.75
    };

    const threadRatios = {
        hack: 0.25,
        grow: 0.50,
        weaken: 0.25
    };

    const servers = getAllServers(ns).filter(s => ns.hasRootAccess(s) && ns.getServerMaxRam(s) > 0);

    while (true) {
        if (!ns.fileExists(strategyFile)) {
            ns.print("[GO] No strategy.json found.");
            await ns.sleep(5000);
            continue;
        }

        const strategy = JSON.parse(ns.read(strategyFile));
        const target = strategy.target;

        for (const host of servers) {
            if (host === "home") continue;

            const maxRam = ns.getServerMaxRam(host);
            const usedRam = ns.getServerUsedRam(host);
            const available = maxRam - usedRam;

            if (available < Math.min(...Object.values(ramPerThread))) continue;

            const totalThreads = Math.floor(available / 1.75);
            const hackThreads = Math.floor(totalThreads * threadRatios.hack);
            const growThreads = Math.floor(totalThreads * threadRatios.grow);
            const weakenThreads = Math.floor(totalThreads * threadRatios.weaken);

            if (hackThreads > 0) ns.exec(scriptMap.hack, host, hackThreads, target);
            if (growThreads > 0) ns.exec(scriptMap.grow, host, growThreads, target);
            if (weakenThreads > 0) ns.exec(scriptMap.weaken, host, weakenThreads, target);

            ns.print(`[GO] Launched on ${host}: hack(${hackThreads}), grow(${growThreads}), weaken(${weakenThreads}) → ${target}`);
        }

        await ns.sleep(15000);
    }
}

function getAllServers(ns) {
    const seen = new Set();
    const queue = ["home"];
    while (queue.length) {
        const host = queue.shift();
        if (seen.has(host)) continue;
        seen.add(host);
        queue.push(...ns.scan(host));
    }
    return [...seen];
}
