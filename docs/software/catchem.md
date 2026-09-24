# Using catchEM

catchEM picks particles and segments liposomes in your micrographs with trained models, and comes with
helpers for projects and cryoSPARC data. It has two command-line tools and a web dashboard:

| Tool | What it does |
|---|---|
| `catchem-ml` | Particle detection (`detect`), liposome segmentation (`segment`), training and data import |
| `catchem-utils` | Project creation, cryoSPARC exposure rejection, particle export to RELION |
| catchEM dashboard | A web dashboard that fills in and submits the commands above for you, started with `typantic web serve` (typantic is the toolkit catchEM's commands are built on) |

!!! info "Use the `catchem_dev` environment"
    Everything on this page comes from the **`catchem_dev`** environment. The older `catchem` environment
    still contains the previous `catchEM` command, which is no longer documented here — if you need it,
    run `catchEM --help` inside that environment.

## Load the catchEM environment

catchEM is provided as a conda environment. Load the Spack-provided miniforge3 and activate it:

```bash
spack load miniforge3
source $(spack location -i miniforge3)/bin/activate
conda activate catchem_dev
```

If `$MINIFORGE3_ROOT` is set after loading, you can also run `source $MINIFORGE3_ROOT/bin/activate` before
`conda activate catchem_dev`.

Every command explains itself — add `--help` (or `-h`) at any level:

```bash
catchem-ml --help
catchem-ml detect --help
catchem-utils --help
```

## Example interactive session

Detection and segmentation need GPUs, so run them on a compute node. Start [screen](screen_usage.md) on
the login node first, so the session survives a dropped connection:

```bash
screen -S catchem-run
```

Then request an interactive Slurm session. Adjust partition, CPUs, memory and GPUs to your dataset:

```bash
srun --partition=p.cryo --ntasks=1 --cpus-per-task=30 --mem=300G --gres=gpu:4 --pty bash
```

Once on the node, load the environment as shown [above](#load-the-catchem-environment) and run your
commands. Detach with ++ctrl+a++ then ++d++, and reattach later with `screen -r catchem-run`.

## Common commands

`$motioncorrected_folder` is your input: a folder of motion-corrected micrographs, or a cryoSPARC
*Curate Exposures* or *Exported Exposures* job folder. Pass the number of CPUs you requested — inside a Slurm job
that is `$SLURM_CPUS_PER_TASK`. By default all GPUs of the job are used.

### Single particles

```bash
catchem-ml detect $motioncorrected_folder \
  --number-of-cpus $SLURM_CPUS_PER_TASK \
  --output-folder results_single
```

This writes the picked particle coordinates as STAR files. `--confidence` (default `0.25`) sets how
certain the model must be to keep a pick: lower values find more particles but also more false
positives, higher values keep only the most certain picks.

### Liposomes

```bash
catchem-ml segment $motioncorrected_folder \
  --number-of-cpus $SLURM_CPUS_PER_TASK \
  --output-folder results_liposomes \
  --image-operations-pipeline R \
  --resize-image-size 1280
```

For liposomes, always add the two image options: `--image-operations-pipeline R` resizes each whole
micrograph (instead of the default `TR`, which tiles it first) and `--resize-image-size 1280` sets the
size it is resized to (default 640).

`segment` uses the liposome model by default. It outlines each liposome and places particle coordinates
along its membrane — inside and outside (`--sampling-mode`), `--boundary-offset-px` away from the outline
(default 90), every `--point-spacing-px` (default 40), with a box of `--box-size-px` (default 120). These
values are **pixels of the original micrograph**: divide a distance in Å by your pixel size to get them.

### Utilities

```bash
catchem-utils init-project my-project   # create a project folder, see Session guidelines
catchem-utils reject-exposures --help   # handle exposures rejected in cryoSPARC
catchem-utils export-particles --help   # convert cryoSPARC particles to a RELION STAR file
```

See [Session and project guidelines](../session_guidelines.md) for when and how to create projects.

!!! tip "Output folder and saved settings"
    - `--output-folder` must not exist yet or be empty. Without it, results go to a new
      `catchEM_<command>_<timestamp>` folder in the current directory.
    - To reuse settings, write them to a file once and load them later:
      `catchem-ml detect --generate-config detect.yaml`, edit the file, then
      `catchem-ml detect --config detect.yaml $motioncorrected_folder`.

## Batch submission (sbatch) example

Submit an unattended job when you do not need to stay attached. Adjust partition, time, CPUs, GPUs and
memory to your dataset. The `logs` folder must exist before you submit (or change the log paths).

```bash
#!/bin/bash
#SBATCH --job-name=catchem_detect
#SBATCH --partition=p.cryo
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=30
#SBATCH --mem=300G
#SBATCH --gres=gpu:4
#SBATCH --output=logs/%x_%j.out
#SBATCH --error=logs/%x_%j.err

spack load miniforge3
source $(spack location -i miniforge3)/bin/activate
conda activate catchem_dev

motioncorrected_folder=/path/to/motioncorrected
output_folder=/path/to/results

catchem-ml detect "$motioncorrected_folder" \
  --number-of-cpus "$SLURM_CPUS_PER_TASK" \
  --output-folder "$output_folder"
```

For liposomes, use `catchem-ml segment` with the two image options from [above](#liposomes) instead of
`detect`. Tune CPUs and memory to your data size.

## Web dashboard

The catchEM dashboard runs in your browser: pick a command, fill in a form, and it submits the job to
Slurm for you, shows the live log, and keeps a history of your runs. It runs **as you** on the login node,
so it sees your files and submits jobs under your account.

### Start it

On the login node, inside [screen](screen_usage.md) so it keeps running when you disconnect:

```bash
screen -S catchem-dashboard
spack load miniforge3
source $(spack location -i miniforge3)/bin/activate
conda activate catchem_dev
typantic web serve --log-level warning
```

It prints something like this (with your own port, token, user and host):

```text
  catchEM is running.

  Open in a browser:
    http://127.0.0.1:41873/?token=Xq3…

  Remote host? First forward the port from your machine:
    ssh -N -L 41873:127.0.0.1:41873 username@login-node-name
  then open the URL above locally.

  The token in the URL is the credential; keep it private.
```

Detach from screen with ++ctrl+a++ then ++d++ — the dashboard keeps running.

`--log-level warning` keeps the log quiet so this message stays easy to find when you reattach. Each start
picks a free port automatically. To keep the same port (and the same tunnel command) every time, add
`--port` with a number between 20000 and 60000, e.g. `--port 43125`. If it reports that the address is
already in use, another user has that port — pick a different number.

### Open it in your browser

1. **On your own computer**, run the `ssh -N -L …` line from the output. If the host name in it differs
   from the address you normally connect to, use your usual `cluster-address` instead.
2. Open the full `http://127.0.0.1:…/?token=…` URL in your browser.

--8<-- "tunnel-on-your-computer.md"

!!! danger "The token is your password"
    Anyone with the full URL can submit jobs as you. Don't share it, and never start the dashboard with
    `--no-token`, or with `--token` (other users on the login node can see command-line arguments).

### Form tips

- **Output folder** — always set it. If left empty, results end up in your home folder under
  `~/.typantic/jobs/<job id>/`.
- **Backend** — keep **slurm** for all `catchem-ml` commands (it is preselected). `local` would run the job
  on the login node itself. The light `catchem-utils` commands default to `local`, which is fine.
- **Slurm options** — set **Partition** (e.g. `p.cryo`), **Cpus**, **Mem** (e.g. `300G`), **Time Minutes**
  and **Gpus**. If **Gpus** is left empty, no GPU is requested and the job runs on CPU only — very slowly.
  Leave the command's own **Gpu Ids** field empty; it then uses all GPUs of the job.
- **Liposomes (Segment)** — set **Image Operations Pipeline** to `R` and **Resize Image Size** to `1280`,
  as on the [command line](#liposomes).
- **Number Of Cpus** — set it to the same number as the Slurm **Cpus**. If left empty it uses up to 10
  processes, regardless of what you requested.

### Stopping and restarting

Stop the dashboard with ++ctrl+c++ in its screen session. Jobs you already submitted keep running, and
your job history is kept in `~/.typantic/jobs` — it shows up again after the next start. Each restart
creates a new token (and, without `--port`, a new port), so use the new URL and tunnel line it prints.
