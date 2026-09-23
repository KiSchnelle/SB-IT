# Using catchem_mount

catchem_mount is the facility's data-management dashboard. It shows every collected session — where its
rawdata lives, its archive and backup copies, and the jobs that move it — and lets you act on your own
sessions.

## Open the dashboard

The dashboard runs on the login node on port **8642** and is only reachable through an
[SSH tunnel](../ssh_tunnels.md). On your own computer, run:

```bash
ssh -N -L 8642:localhost:8642 username@cluster-address
```

Then open `http://localhost:8642` in your browser.

--8<-- "tunnel-on-your-computer.md"

!!! warning "Never make the port public"
    Only open the dashboard through the SSH tunnel. Don't forward the port to other machines or share
    your tunnel with others.

## Log in

Sign in with your **university username and password** — the same credentials as for other university
services, **not** your SSH key. There is no separate account to create.

- After several wrong passwords, each further attempt has to wait a little longer (up to a minute).
- You stay signed in for up to 30 days, or until you haven't used the dashboard for 7 days.
- If your login is refused although your password is right, your account may not be enabled for the
  dashboard — contact IT.

## What you can do

Everyone who signs in can **see** all sessions, jobs and reports.

- As a regular user you can **act on your own sessions** — those with your username in the session name
  (`YYYY-MM-DD_username_project_comment`, see [session guidelines](../session_guidelines.md)). Actions
  you are not allowed to run are not shown.
- Deleting, renaming, moving or reclassifying data are **staff actions**; ask the staff for these.

For everything else — what each action does and when to use it — use the **documentation and the
assistant built into the dashboard**.
