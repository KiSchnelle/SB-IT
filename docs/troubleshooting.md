# Troubleshooting

Common issues and fast fixes for the SB-HPC cluster and EM workflows.

## Access and login

- **Cannot log in:** confirm your university account is active and your public SSH key is added at
  [https://myrz.uni-osnabrueck.de/](https://myrz.uni-osnabrueck.de/).
- **Permission denied:** double-check your username and that your SSH key is the one you uploaded.

## GUI and web interfaces

- **GUI apps do not open:** on a Mac, make sure XQuartz is running, then connect with
  `ssh -X username@cluster-address`.
- **cryoSPARC web interface not loading:** open an [SSH tunnel](ssh_tunnels.md) and use the local URL:

    ```bash
    ssh -N -L 39000:localhost:39000 username@cluster-address
    ```

    Then open `http://localhost:39000`.

- **Page stopped loading after a while:** the tunnel closed — the terminal was closed, the laptop slept or
  the network dropped. Run the tunnel command again.
- **`bind: Address already in use`:** the port is already taken on *your* computer, usually by an older
  tunnel. Close it or use another local port — see [SSH tunnels](ssh_tunnels.md#address-already-in-use).

## catchEM web interfaces

- **The catchEM dashboard says unauthorized / asks for a token:** open the *full* URL it printed,
  including `?token=…`. Every restart creates a new token, so old links stop working — use the newest one.
- **A GPU job from the catchEM dashboard ran on CPU / is very slow:** the **GPUs** field in the Slurm
  options was left empty, so no GPU was requested. Set it and submit again. See
  [catchEM form tips](software/catchem.md#form-tips).
- **Can't find the results of a job from the catchEM dashboard:** if **Output folder** was left empty,
  results are written to `~/.typantic/jobs/<job id>/` in your home folder.
- **catchem_mount login refused:** use your university username and password (not your SSH key). If it
  still fails, your account may not be enabled for the dashboard — contact IT.

## Slurm and job issues

- **Job stuck in queue:** check the partition and your resource request with `squeue` and `sinfo`.
- **Job ends immediately:** read your job's output and error logs; look for the first error line.

```bash
squeue -u $USER
sinfo
```

## Software loading

- **Command not found after loading:** confirm the package exists with `spack find`.
- **Not sure what is available:** list cryo-EM packages with `spack list -r cryo_em`.

```bash
spack find
spack list -r cryo_em
```

## Storage and cleanup

- **Storage full or project too large:** clear intermediate results and delete unproductive jobs.
- **RELION `Trash` still full:** empty the `Trash` folder to reclaim space.

See [Data cleanup](data_cleanup.md) for detailed guidance.

## Data transfer problems

- **Session not appearing:** check that the session name follows the naming rules and matches your
  project name exactly (same upper/lower case).
- **Links missing in the project folder:** confirm the project was created with
  `catchem-utils init-project` *before* the session was collected.

See [Session and project guidelines](session_guidelines.md) and [Data transfer](data_transfer.md) for
details.

## Need help?

If you are still stuck, note the exact error message and the command you ran. Share that with the team
for faster support.
