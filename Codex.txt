📦 Codex Scaffold Context

This project assumes Codex is used to help generate or refactor Bitburner scaffolds. To ensure Codex understands the complete game context, the following assumptions and baseline structure are provided:

Core Components to Generate:

ready.js: scans and roots all reachable servers; copies h/g/w scripts to valid hosts

set.js: scores rooted servers by money/sec/sec and writes to strategy.json

go.js: reads strategy and deploys h/g/w workers to valid servers with RAM

solver.js: scans the network and attempts coding contracts with custom logic

buy-servers.js: buys biggest server possible and pushes base scripts

contracts.js: visibility tool for locating .cct files

h.js, g.js, w.js: single-thread workers; take a target arg

hacknet.js: early-game hacknet investor loop, ROI-based

Shared Data Files:

strategy.json: object storing best hacking target, score, and mode

{
  "target": "n00dles",
  "score": 42.2,
  "mode": "money",
  "updated": true,
  "timestamp": 1710000000000
}

Script Constraints:

No Source-File 4: share(), formulas.exe, and singularity functions are disallowed

Scripts must manage their own memory and thread limits

No recursive or multithreaded imports

Execution assumes thread-based parallelism and relies on filesystem state

Intended Flow (Boot Sequence):

ready.js → Root & copy executors

set.js → Choose target

go.js → Push workers

This pattern can be used to create an early-game scaffold or refactor a late-game batcher.

Codex can extend this system by building:

A dynamic batcher or scheduler

A pserv load balancer

A daemon.js brain script

Or network visualizers

All context here is valid for Bitburner versions post-2024 and does not assume future expansion or home-RAM sharing mechanics unless specified.

