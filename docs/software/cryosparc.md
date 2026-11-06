# Using cryoSPARC

The cluster runs two cryoSPARC instances. Use the **primary** instance for your normal processing. The
**secondary** instance is meant for projects that are no longer actively processed, for example during
publication or review.

| | Primary | Secondary |
|---|---|---|
| **Port** | 61000 | 62000 |
| **Meant for** | Active processing | Projects no longer actively processed (publication, review) |
| **Processing** | Available | No lane connected; a lane is available on request |
| **Speed** | Normal | May be a bit slower, because its database is on slower NFS storage |

## Open an instance

Both instances are reached through an [SSH tunnel](../ssh_tunnels.md). On your own computer, run the
command for the instance you need, then open its address in your browser:

=== "Primary"

    ```bash
    ssh -N -L 61000:localhost:61000 username@cluster-address
    ```

    Then open `http://localhost:61000`.

=== "Secondary"

    ```bash
    ssh -N -L 62000:localhost:62000 username@cluster-address
    ```

    Then open `http://localhost:62000`.

--8<-- "tunnel-on-your-computer.md"

## Move a project to the secondary instance

When you are no longer actively processing a project, for example once it is in publication or review,
it should move to the secondary instance. Ask IT administration to do this: they detach the project from
the primary instance and attach it to the secondary one.

## Processing on the secondary instance

The secondary instance has no lane connected by default, so jobs there can't run right away. If you need
to process something, for example because a reviewer asks for a change, ask IT administration for a lane.
