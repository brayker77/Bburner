Bitburner Script Commands

This document outlines how to use each script in your Scriptcore suite. All scripts are written for the Bitburner game environment and depend on the ns object provided by the game API.

🟢 ready.js

Purpose: Scans the network and nukes all servers you have port tools for. Automatically pushes h.js, g.js, and w.js to new targets.

Run with:

run ready.js

🟡 set.js

Purpose: Analyzes rooted servers to pick the best target based on money, security, and hack time. Saves the result to strategy.json.

Run with:

run set.js

🔴 go.js

Purpose: Reads strategy.json and deploys hack/grow/weaken scripts to all rooted servers based on available RAM and fixed ratios.

Run with:

run go.js

🧐 solver.js

Purpose: Scans the entire network for coding contracts and attempts to solve known types using built-in algorithms.

Run with:

run solver.js

🧹 buy-servers.js

Purpose: Buys the biggest server you can afford and pushes h/g/w scripts to it immediately.

Run with:

run buy-servers.js

🧰 contracts.js

Purpose: Lists all coding contracts across the network with type and remaining tries.

Run with:

run contracts.js

🐞 h.js / g.js / w.js

Purpose: Direct worker scripts to run hack(), grow(), or weaken() against a target.

Run with:

run h.js [target]
run g.js [target]
run w.js [target]

⚙️ hacknet.js

Purpose: Auto-upgrades Hacknet nodes using ROI logic. SF4-safe. Optional utility.

Run with:

run hacknet.js

🧠 Bitburner API Highlights (Non-SF4 Only)

Function

Purpose

ns.scan()

Returns list of directly connected servers

ns.ls(server, extension)

Lists files on a server (e.g. .cct)

ns.getServerMoneyAvailable()

Amount of money currently on a server

ns.getServerRequiredHackingLevel()

Minimum hacking level required to hack a server

ns.hasRootAccess(server)

Boolean — whether you have root access to a server

ns.nuke(server)

Gains root access after opening required ports

ns.exec(script, server, threads, ...args)

Runs a script on a server with args

ns.write(filename, data, mode)

Writes to a text file (used for strategy.json)

ns.read(filename)

Reads content from a file

ns.codingcontract.*

Set of functions for contract scanning, reading, solving

🤖 Bitburner Scripting Environment Primer

Bitburner scripts operate inside a sandboxed JavaScript-like environment provided by the Bitburner game. Code is executed using a limited API exposed through the ns object (short for Netscript). All automation, hacking, server interaction, and contract solving must occur via this API.

Environment Constraints:

No access to the DOM, browser APIs, Node.js modules, or external libraries

No native console.log, fetch, or asynchronous HTTP calls

File I/O occurs via ns.read() and ns.write()

RAM cost is assigned per API call and per script — scripts must be designed around memory limits

Parallel execution is possible via ns.exec() with thread counts

Execution occurs in real-time with ticks and timers (e.g., await ns.sleep(1000))

Script Design Principles:

All scripts must start with /** @param {NS} ns */ to get type hints and enable the ns object

Scripts are modular and independently executable

Shared coordination happens via data files (strategy.json, .txt, etc.)

Worker scripts (h.js, g.js, w.js) are intended to be dispatched remotely to pservs or cracked servers

Source File Restrictions:

Assumes NO Source-File 4: cannot use features like share(), formulas.exe, or singularity-level automation

All solvers and upgrades are written to work without SF4 access

Project Layout Best Practices:

solver.js: handles all contract solving logic

ready.js, set.js, go.js: core target discovery and script distribution trio

buy-servers.js: handles infrastructure scaling

contracts.js: visibility tool only, non-intrusive

Codex integration and GitHub versioning are used to track and evolve script logic over time. Documentation and modularity are prioritized to enable portability and future automation.

