# Using the SB-HPC cluster

## Getting access to the SB-HPC cluster

To get access to the cluster you need to:

- have a university account,
- have filled in the access request for the SB cluster with the division, and
- have added your public SSH key to your account at [https://myrz.uni-osnabrueck.de/](https://myrz.uni-osnabrueck.de/).

Then connect with:

```bash
ssh username@cluster-address
```

## Create an SSH key (ed25519 only)

If you do not already have an ed25519 key, create one on your own computer. When asked for the file
location, press ++enter++ to accept the default. Adding a passphrase is recommended.

```bash
ssh-keygen -t ed25519 -C "your_email@uni.edu"
```

To copy the public key, print the contents of the `.pub` file and paste it into the university portal:

=== "macOS / Linux"

    ```bash
    cat ~/.ssh/id_ed25519.pub
    ```

=== "Windows PowerShell"

    ```powershell
    Get-Content $env:USERPROFILE\.ssh\id_ed25519.pub
    ```

=== "Windows Command Prompt"

    ```bat
    type %USERPROFILE%\.ssh\id_ed25519.pub
    ```

!!! note
    If you already have an `id_ed25519` key, do not create a second one — just use the existing `.pub` file.

## Using software on the cluster

We use Spack to manage software on the cluster. To load a software package:

```bash
spack load $software
```

For example, to load RELION:

```bash
spack load relion
```

To load a specific version, add the version number:

```bash
spack load relion@5.1.0
```

To see which software packages are available:

```bash
spack find
```

To look for a package whose exact name you don't know, filter the list, for example:

```bash
spack find | grep aretomo
```

## GUI applications

To use GUI applications like RELION, you need X11 forwarding (install XQuartz on a Mac). Connect with
the `-X` option:

```bash
ssh -X username@cluster-address
```

After loading the software, start the application from that terminal, for example:

```bash
relion
```

## Web interfaces

Software that runs a web interface on the cluster (cryoSPARC, catchem_mount, the catchEM dashboard) is
reached through an SSH tunnel. For example, for cryoSPARC on port 39000:

```bash
ssh -N -L 39000:localhost:39000 username@cluster-address
```

Then open `http://localhost:39000` in your browser.

--8<-- "tunnel-on-your-computer.md"
