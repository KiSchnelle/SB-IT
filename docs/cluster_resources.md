# Cluster resources

<div class="stat-grid" markdown>
<div><span class="stat-label">Total nodes</span><span class="stat-value">17</span><span class="stat-note">Headnodes + compute + storage</span></div>
<div><span class="stat-label">Total memory</span><span class="stat-value">20 TB</span><span class="stat-note">Sum of installed RAM</span></div>
<div><span class="stat-label">Compute scratch NVMe</span><span class="stat-value">70 TB</span><span class="stat-note">Local scratch for jobs (approx.)</span></div>
<div><span class="stat-label">Data storage</span><span class="stat-value">2.6 PB</span><span class="stat-note">BeeGFS capacity (approx.)</span></div>
<div><span class="stat-label">GPUs</span><span class="stat-value">70</span><span class="stat-note">64× A40 + 4× L40 (compute), 2× RTX A2000 (headnodes)</span></div>
</div>

<div class="table-filter">
  <label for="node-filter">Filter nodes:</label>
  <input id="node-filter" data-table-filter type="search" placeholder="e.g. A40, EPYC, 256 GB, InfiniBand, samson…">
</div>

## Headnodes

| Node | CPU | RAM | GPU | SSD/NVMe | HDD | Network |
|---|---|---|---|---|---|---|
| telly101 | 2x AMD EPYC MILAN 7313 | 256 GB | Nvidia RTX A2000 | 7.6 TB | - | 10GbE, InfiniBand HDR |
| telly102 | 2x AMD EPYC MILAN 7313 | 256 GB | Nvidia RTX A2000 | 7.6 TB | - | 10GbE, InfiniBand HDR |

!!! info "There is one login node"
    telly101 and telly102 host the **login node**, a single VM that fails over between the two machines.
    You always connect to `cluster-address`; you never log in to telly101 or telly102 directly.

## Compute

| Node | CPU | RAM | GPU | SSD/NVMe | HDD | Network |
|---|---|---|---|---|---|---|
| bert101 | 2x AMD EPYC MILAN 74F3 | 1 TB | 8x Nvidia A40 | 7.7 TB | - | InfiniBand HDR |
| bert102 | 2x AMD EPYC MILAN 74F3 | 1 TB | 8x Nvidia A40 | 7.7 TB | - | InfiniBand HDR |
| bert103 | 2x AMD EPYC MILAN 74F3 | 2 TB | 8x Nvidia A40 | 7.7 TB | - | InfiniBand HDR |
| bert104 | 2x AMD EPYC MILAN 74F3 | 2 TB | 8x Nvidia A40 | 7.7 TB | - | InfiniBand HDR |
| bert105 | 2x AMD EPYC MILAN 74F3 | 1 TB | 8x Nvidia A40 | 7.7 TB | - | InfiniBand HDR |
| bert106 | 2x AMD EPYC MILAN 74F3 | 1 TB | 8x Nvidia A40 | 7.7 TB | - | InfiniBand HDR |
| bert107 | 2x AMD EPYC MILAN 74F3 | 4 TB | 8x Nvidia A40 | 7.7 TB | - | InfiniBand HDR |
| bert108 | 2x AMD EPYC MILAN 74F3 | 4 TB | 8x Nvidia A40 | 7.7 TB | - | InfiniBand HDR |
| ernie101 | 2x AMD EPYC GENOA-X 9384X | 2.2 TB | 4x Nvidia L40 | 7.7 TB | - | InfiniBand HDR |

## Storage

| Node | CPU | RAM | GPU | SSD/NVMe | HDD | Network |
|---|---|---|---|---|---|---|
| samson101 | 2x Intel Xeon Gold 6256 | 192 GB | - | 6.4 TB | 450 TB | InfiniBand HDR |
| samson102 | 2x Intel Xeon Gold 6256 | 192 GB | - | 6.4 TB | 450 TB | InfiniBand HDR |
| samson103 | 2x Intel Xeon Gold 6256 | 192 GB | - | 6.4 TB | 450 TB | InfiniBand HDR |
| samson104 | 2x Intel Xeon Gold 6256 | 192 GB | - | 6.4 TB | 450 TB | InfiniBand HDR |
| samson105 | 2x Intel Xeon Gold 6256 | 192 GB | - | 6.4 TB | 450 TB | InfiniBand HDR |
| samson106 | 2x Intel Xeon Gold 6256 | 192 GB | - | 6.4 TB | 450 TB | InfiniBand HDR |
