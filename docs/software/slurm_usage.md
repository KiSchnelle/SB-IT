# Slurm usage guidelines

- Use `sbatch` to submit jobs to the queue.
- Use `squeue` to check the status of your jobs.
- Use `scancel` to cancel jobs.
- Use `sinfo` to check the status of the cluster nodes.

For interactive jobs, use `srun`. For example:

```bash
srun --partition=p.cryo --ntasks=1 --cpus-per-task=4 --mem=8G --pty bash
```

This allocates 1 task with 4 CPUs and 8 GB of memory on the `p.cryo` partition and opens a bash shell.

To submit a job script, create a file (e.g. `job.sh`) with the following content:

```bash
#!/bin/bash
#SBATCH --job-name=my_job
#SBATCH --output=my_job.out
#SBATCH --error=my_job.err
#SBATCH --partition=p.cryo
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=4
#SBATCH --mem=8G

# Load necessary modules
spack load relion

# Run your command
relion --some-option
```

Then submit the job script:

```bash
sbatch job.sh
```

Often used additional options are:

- `--time=HH:MM:SS` to set a time limit for the job.
- `--gres=gpu:X` to request GPUs, where `X` is the number of GPUs needed.
- `--nodes=X` to specify the number of nodes required.
- `--exclusive` to request exclusive access to the allocated nodes.
- `--tasks-per-node=X` to specify the number of tasks per node.

For more information, see the [Slurm documentation](https://slurm.schedmd.com/documentation.html).

## Check queue and partitions

Use these commands to see node states and your jobs:

```bash
sinfo
squeue -u $USER
```

To see detailed information about a job:

```bash
scontrol show job <job_id>
```

## Choosing resources

Request only what you need to reduce queue time. Match `--cpus-per-task` to your software's thread count.

Example CPU-only job with an explicit time limit:

```bash
#!/bin/bash
#SBATCH --job-name=cpu_job
#SBATCH --partition=p.cryo
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=8
#SBATCH --mem=16G
#SBATCH --time=04:00:00
```

## Setting time limits

Always set a realistic time limit with `--time`, in your script or on the command line.

In a job script:

```bash
#SBATCH --time=HH:MM:SS
```

For an interactive session:

```bash
srun --partition=p.cryo --ntasks=1 --cpus-per-task=4 --mem=8G --time=02:00:00 --pty bash
```

## GPU jobs

Request GPUs with `--gres=gpu:X` and match CPUs and memory to the workload:

```bash
#!/bin/bash
#SBATCH --job-name=gpu_job
#SBATCH --partition=p.cryo
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=8
#SBATCH --mem=32G
#SBATCH --gres=gpu:1
#SBATCH --time=08:00:00
```

## Interactive sessions

Interactive jobs are ideal for testing, GUI tools, and short runs. Always do heavy work on a compute node,
not the login node. For long sessions, start [screen](screen_usage.md) on the login node **first** and
run `srun` inside it, so the job survives if your network drops:

```bash
screen -S myrun
srun --partition=p.cryo --ntasks=1 --cpus-per-task=4 --mem=8G --time=02:00:00 --pty bash
```

## Job arrays

Use arrays for many similar jobs (e.g. processing multiple micrographs):

```bash
#!/bin/bash
#SBATCH --job-name=array_job
#SBATCH --partition=p.cryo
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=4
#SBATCH --mem=8G
#SBATCH --time=02:00:00
#SBATCH --array=1-100

echo "Running task ${SLURM_ARRAY_TASK_ID}"
```

## Output logs

Keep outputs organized in a dedicated logs folder. `%x` is replaced by the job name and `%j` by the job
ID. The `logs` folder must exist before the job starts.

```bash
#SBATCH --output=logs/%x_%j.out
#SBATCH --error=logs/%x_%j.err
```

## Monitoring and canceling

Common commands while a job is running:

```bash
squeue -u $USER
scancel <job_id>
```

To cancel all your jobs:

```bash
scancel -u $USER
```

## Hold and release jobs

Pause or resume a queued job without canceling it:

```bash
scontrol hold <job_id>
scontrol release <job_id>
```

## Exclusive node usage

Use exclusive mode when you need the full node to yourself:

```bash
#SBATCH --exclusive
```

You can also request a specific node if needed:

```bash
#SBATCH --nodelist=bert101
```

## Post-run resource usage

Check the actual CPU, memory, and runtime usage after a job finishes:

```bash
sacct -j <job_id> --format=JobID,State,Elapsed,MaxRSS,ReqMem,AllocCPUS
```

`MaxRSS` is the peak memory the job actually used — use it to size `--mem` for the next, similar job.

## Good practices

- Set a realistic `--time` to avoid premature termination.
- Size `--mem` from the **peak** usage of similar jobs (`MaxRSS` above) plus a safety margin of about
  20%. A job that exceeds its memory request is killed.
- Keep outputs and logs organized with `--output` and `--error`.
