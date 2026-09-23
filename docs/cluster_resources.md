---
hide:
  - toc
---

# Cluster resources

What the SB-HPC cluster is made of. Your jobs run on the **compute nodes**; your data is stored on the
**storage nodes** (BeeGFS).

<div class="hw-stats" markdown>

<div class="hw-stat" markdown>
:material-server:{ .hw-stat__icon } <span class="hw-stat__value">17</span> <span class="hw-stat__label">Nodes</span> <span class="hw-stat__note">2 head · 9 compute · 6 storage</span>
</div>

<div class="hw-stat hw-stat--gpu" markdown>
:material-expansion-card-variant:{ .hw-stat__icon } <span class="hw-stat__value">70</span> <span class="hw-stat__label">GPUs</span> <span class="hw-stat__note"><span class="hw-gpu hw-gpu--a40">64× A40</span> <span class="hw-gpu hw-gpu--l40">4× L40</span> <span class="hw-gpu">2× RTX A2000</span></span>
</div>

<div class="hw-stat" markdown>
:material-memory:{ .hw-stat__icon } <span class="hw-stat__value">20 TB</span> <span class="hw-stat__label">Memory</span> <span class="hw-stat__note">Installed RAM, all nodes</span>
</div>

<div class="hw-stat" markdown>
:material-harddisk:{ .hw-stat__icon } <span class="hw-stat__value">70 TB</span> <span class="hw-stat__label">Scratch</span> <span class="hw-stat__note">Local NVMe on the compute nodes (approx.)</span>
</div>

<div class="hw-stat" markdown>
:material-database:{ .hw-stat__icon } <span class="hw-stat__value">2.6 PB</span> <span class="hw-stat__label">Data storage</span> <span class="hw-stat__note">BeeGFS capacity (approx.)</span>
</div>

</div>

<div class="hw-filter" markdown>
:material-magnify:{ .hw-filter__icon } <input id="node-filter" data-table-filter type="search" aria-label="Filter nodes" placeholder="Filter, e.g. A40 or samson"> <span class="hw-filter__count" data-filter-count aria-live="polite">17 nodes</span>
</div>

<p class="hw-empty" data-filter-empty hidden>No node matches this filter.</p>

<div class="hw-section" markdown>

## Compute

<p class="hw-chips"><span>9 nodes</span><span>68 GPUs</span><span>18.2 TB RAM</span><span>InfiniBand HDR</span></p>

| Node | CPU | RAM | GPUs | NVMe scratch | Network |
|---|---|--:|---|--:|---|
| `bert101` | 2× AMD EPYC 74F3 <span class="hw-muted">Milan</span> | 1 TB | <span class="hw-gpu hw-gpu--a40">8× A40</span> | 7.7 TB | InfiniBand HDR |
| `bert102` | 2× AMD EPYC 74F3 <span class="hw-muted">Milan</span> | 1 TB | <span class="hw-gpu hw-gpu--a40">8× A40</span> | 7.7 TB | InfiniBand HDR |
| `bert103` | 2× AMD EPYC 74F3 <span class="hw-muted">Milan</span> | 2 TB | <span class="hw-gpu hw-gpu--a40">8× A40</span> | 7.7 TB | InfiniBand HDR |
| `bert104` | 2× AMD EPYC 74F3 <span class="hw-muted">Milan</span> | 2 TB | <span class="hw-gpu hw-gpu--a40">8× A40</span> | 7.7 TB | InfiniBand HDR |
| `bert105` | 2× AMD EPYC 74F3 <span class="hw-muted">Milan</span> | 1 TB | <span class="hw-gpu hw-gpu--a40">8× A40</span> | 7.7 TB | InfiniBand HDR |
| `bert106` | 2× AMD EPYC 74F3 <span class="hw-muted">Milan</span> | 1 TB | <span class="hw-gpu hw-gpu--a40">8× A40</span> | 7.7 TB | InfiniBand HDR |
| `bert107` | 2× AMD EPYC 74F3 <span class="hw-muted">Milan</span> | 4 TB | <span class="hw-gpu hw-gpu--a40">8× A40</span> | 7.7 TB | InfiniBand HDR |
| `bert108` | 2× AMD EPYC 74F3 <span class="hw-muted">Milan</span> | 4 TB | <span class="hw-gpu hw-gpu--a40">8× A40</span> | 7.7 TB | InfiniBand HDR |
| `ernie101` | 2× AMD EPYC 9384X <span class="hw-muted">Genoa-X</span> | 2.2 TB | <span class="hw-gpu hw-gpu--l40">4× L40</span> | 7.7 TB | InfiniBand HDR |

</div>

<div class="hw-section" markdown>

## Storage

<p class="hw-chips"><span>6 nodes</span><span>BeeGFS</span><span>450 TB HDD each</span><span>InfiniBand HDR</span></p>

| Node | CPU | RAM | SSD/NVMe | HDD | Network |
|---|---|--:|--:|--:|---|
| `samson101` | 2× Intel Xeon Gold 6256 | 192 GB | 6.4 TB | 450 TB | InfiniBand HDR |
| `samson102` | 2× Intel Xeon Gold 6256 | 192 GB | 6.4 TB | 450 TB | InfiniBand HDR |
| `samson103` | 2× Intel Xeon Gold 6256 | 192 GB | 6.4 TB | 450 TB | InfiniBand HDR |
| `samson104` | 2× Intel Xeon Gold 6256 | 192 GB | 6.4 TB | 450 TB | InfiniBand HDR |
| `samson105` | 2× Intel Xeon Gold 6256 | 192 GB | 6.4 TB | 450 TB | InfiniBand HDR |
| `samson106` | 2× Intel Xeon Gold 6256 | 192 GB | 6.4 TB | 450 TB | InfiniBand HDR |

</div>

<div class="hw-section" markdown>

## Headnodes

<p class="hw-chips"><span>2 nodes</span><span>host the login node</span><span>10GbE + InfiniBand HDR</span></p>

| Node | CPU | RAM | GPU | SSD/NVMe | Network |
|---|---|--:|---|--:|---|
| `telly101` | 2× AMD EPYC 7313 <span class="hw-muted">Milan</span> | 256 GB | <span class="hw-gpu">RTX A2000</span> | 7.6 TB | 10GbE, InfiniBand HDR |
| `telly102` | 2× AMD EPYC 7313 <span class="hw-muted">Milan</span> | 256 GB | <span class="hw-gpu">RTX A2000</span> | 7.6 TB | 10GbE, InfiniBand HDR |

!!! info "There is one login node"
    telly101 and telly102 host the **login node**, a single VM that fails over between the two machines.
    You always connect to `cluster-address`; you never log in to telly101 or telly102 directly.

</div>
