# SSH tunnels

Several tools on the cluster run a **web interface** — cryoSPARC, the
[catchem_mount](software/catchem_mount.md) dashboard and the [catchEM dashboard](software/catchem.md#web-dashboard).
For security, these listen only *on the cluster itself*, so your browser can't reach them directly. An SSH
tunnel connects a port on your computer to that port on the cluster:

```text
 your computer
┌──────────────────────────────┐
│ browser → localhost:PORT     │
└──────────────┬───────────────┘
               │ SSH tunnel (encrypted)
               ▼
┌──────────────────────────────┐
│ login node → 127.0.0.1:PORT  │
│ cryoSPARC, catchem_mount, …  │
└──────────────────────────────┘
 cluster
```

While the tunnel is open, everything your browser sends to `localhost:PORT` on your computer arrives at
`PORT` on the cluster.

## Open a tunnel

Run this **on your own computer** (replace `PORT`, `username` and `cluster-address`):

=== "macOS / Linux"

    ```bash
    ssh -N -L PORT:localhost:PORT username@cluster-address
    ```

=== "Windows (PowerShell)"

    Windows 10 and 11 include OpenSSH, so the command is the same:

    ```powershell
    ssh -N -L PORT:localhost:PORT username@cluster-address
    ```

=== "MobaXterm"

    Open a **local terminal** in MobaXterm and run the same command:

    ```bash
    ssh -N -L PORT:localhost:PORT username@cluster-address
    ```

=== "PuTTY"

    1. In **Session**, enter `cluster-address` as host name.
    2. Go to **Connection → SSH → Tunnels**, enter `PORT` as *Source port* and `localhost:PORT` as
       *Destination*, click **Add**.
    3. Under **Connection → SSH → Auth → Credentials**, select your private key. PuTTY needs it in
       `.ppk` format — convert your key once with PuTTYgen (*Conversions → Import key*).
    4. Click **Open** and log in. The tunnel is open as long as this window is.

Then open `http://localhost:PORT` in your browser.

What the options mean:

- `-L PORT:localhost:PORT` — forward `PORT` on your computer to `localhost:PORT` *as seen from the cluster*.
- `-N` — don't open a shell, only hold the tunnel. The command prints nothing and keeps running; that is
  expected. Press ++ctrl+c++ to close the tunnel.

!!! warning "The tunnel closes with the terminal"
    If you close the terminal window, your laptop sleeps, or the network drops, the tunnel is gone and
    the page stops loading. Just run the command again.

## Common ports

| Tool | Port | Tunnel command |
|---|---|---|
| cryoSPARC | 39000 | `ssh -N -L 39000:localhost:39000 username@cluster-address` |
| catchem_mount | 8642 | `ssh -N -L 8642:localhost:8642 username@cluster-address` |
| catchEM dashboard | printed at start | copy the `ssh -N -L …` line the dashboard prints |

You can forward several ports with one connection by repeating `-L`:

```bash
ssh -N -L 39000:localhost:39000 -L 8642:localhost:8642 username@cluster-address
```

## "Address already in use"

If the command fails with `bind: Address already in use`, that port is already taken **on your
computer** — often by a tunnel you opened earlier in another window. Close the old one, or use a
different local port (the first number) and keep the cluster port (the second number):

```bash
ssh -N -L 18642:localhost:8642 username@cluster-address
```

Then open `http://localhost:18642` instead.

## Save it in your SSH config

If you use the same tunnels regularly, put them in your SSH config file — `~/.ssh/config` on macOS/Linux,
`%USERPROFILE%\.ssh\config` on Windows:

```text
Host sb-tunnels
    HostName cluster-address
    User username
    LocalForward 39000 localhost:39000
    LocalForward 8642 localhost:8642
    ExitOnForwardFailure yes
    ServerAliveInterval 60
```

Then a single command opens all of them:

```bash
ssh -N sb-tunnels
```

`ExitOnForwardFailure yes` makes SSH stop with an error when a port is busy, instead of silently
connecting without the tunnel. `ServerAliveInterval 60` keeps idle connections from being dropped.
