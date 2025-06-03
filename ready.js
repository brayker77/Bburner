// --------------------------------------------------
// ready.js v1.2
// Scans the network and nukes all servers you have enough port tools for
// Automatically pushes executor scripts to newly rooted servers
// --------------------------------------------------

/** @param {NS} ns */
export async function main(ns) {
    ns.disableLog("ALL");
    ns.tprint("[READY] Starting root sweep...");

    const tools = [
        { name: "BruteSSH.exe", fn: ns.brutessh },
        { name: "FTPCrack.exe", fn: ns.ftpcrack },
        { name: "relaySMTP.exe", fn: ns.relaysmtp },
        { name: "HTTPWorm.exe", fn: ns.httpworm },
        { name: "SQLInject.exe", fn: ns.sqlinject }
    ];

    const availableTools = tools.filter(t => ns.fileExists(t.name, "home"));
    const allHosts = scanAll(ns);
    const scripts = ["h.js", "g.js", "w.js"];

    for (const host of allHosts) {
        if (ns.hasRootAccess(host) || host === "home") continue;

        const requiredPorts = ns.getServerNumPortsRequired(host);
        if (requiredPorts > availableTools.length) continue;

        for (let i = 0; i < requiredPorts; i++) {
            availableTools[i].fn(host);
        }

        ns.nuke(host);
        ns.tprint(`[READY] Rooted ${host}`);

        for (const file of scripts) {
            await ns.scp(file, host);
            ns.print(`[READY] Pushed ${file} to ${host}`);
        }
    }

    ns.tprint("[READY] Sweep complete.");
}

// Recursively scan all servers
function scanAll(ns) {
    const scanned = new Set();
    const queue = ["home"];

    while (queue.length > 0) {
        const current = queue.shift();
        if (scanned.has(current)) continue;
        scanned.add(current);
        for (const neighbor of ns.scan(current)) {
            if (!scanned.has(neighbor)) {
                queue.push(neighbor);
            }
        }
    }

    return [...scanned];
}
