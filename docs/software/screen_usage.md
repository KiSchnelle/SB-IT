# Using screen for long-running shells

`screen` keeps your shell running when you disconnect, so interactive Slurm jobs and long commands survive
a dropped network connection or a closed laptop.

## Where to start it

Start `screen` **on the login node**, right after you connect — and then start your interactive job
*inside* it:

```bash
screen -S myrun
srun --partition=p.cryo --ntasks=1 --cpus-per-task=4 --mem=8G --time=02:00:00 --pty bash
```

!!! warning "Not the other way round"
    If you start `srun` first and `screen` inside the job, the job itself still hangs on your SSH
    connection: when the connection drops, the job ends — and the screen session with it.

The heavy work still runs on the compute node; the login node only holds the screen session. See
[Slurm interactive sessions](slurm_usage.md#interactive-sessions).

## Quick start

```bash
# Start a named session
screen -S myrun

# Detach (keep it running): press Ctrl+A, then D

# List your sessions
screen -ls

# Reattach
screen -r myrun

# If it is still attached somewhere else
screen -d -r myrun

# End the session when done (inside it)
exit
```

**Shortcut:** remember ++ctrl+a++ then ++d++ to detach and `screen -r name` to return.

## Tips

- Name sessions meaningfully: `screen -S catchem-run`, `screen -S preprocessing`.
- Keep logs inside the session: `python script.py > logs/run.out 2>&1`.
- To scroll back through output, use copy mode: ++ctrl+a++ then ++bracket-left++, navigate with the arrow
  keys, exit with ++esc++.
- If a session looks frozen, detach with ++ctrl+a++ then ++d++ and reattach.
- Close unused sessions with `exit` inside them so they stop using resources.

!!! note "Login node restarts"
    If the login node is restarted — for maintenance or during a failover — all screen sessions end.
    Jobs you submitted with `sbatch` keep running; interactive `srun` sessions end with the screen session.
