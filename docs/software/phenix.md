# Using Phenix

## Load Phenix

Load the Phenix package, then source its environment file to set up the environment variables:

```bash
spack load phenix
source $PHENIX_ENV_FILE
```

After that you can run Phenix commands directly in your terminal.

## Run interactively (recommended)

Most Phenix workflows should run on a compute node, not the login node. Start an interactive session
(ideally inside [screen](screen_usage.md)) and run Phenix there:

```bash
srun --partition=p.cryo --ntasks=1 --cpus-per-task=8 --mem=16G --pty bash
```

## Use multiple CPU cores

Request the number of CPU cores in Slurm (see above) and set the thread count before running Phenix:

```bash
export OMP_NUM_THREADS=8
```

Some Phenix tools also accept a per-command CPU setting. Check the tool's help for the exact parameter
name:

```bash
phenix.<tool> --help
```
