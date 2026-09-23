# Session and project guidelines

## Project folder structure and project creation

Each user has a dedicated folder where project data is stored:

```text
/sbdata/projects/$username
```

Inside it, every project has its own folder with this structure:

```text
/sbdata/projects/$username/$project/
  |-- rawdata/
  |   |-- negative-stain/
  |   |-- cryo/
  |   |-- tomo/
  |   |-- misc/
  |-- cryosparc/   <-- the cryoSPARC project goes in here
  |-- relion/      <-- the RELION project goes in here
  |-- misc/        <-- any other data: volumes, maps, notes, ...
```

!!! warning "Please don't create any other folders inside"
    If you need to store custom data, use the `misc` folders.

Projects that don't follow this structure are **not** processed by the cluster automation and are
**not** eligible for automated data transfer. Each project **has to be initialized first** — create it
with `catchem-utils` from the [`catchem_dev` environment](software/catchem.md#load-the-catchem-environment):

```bash
catchem-utils init-project my-project
```

This creates `/sbdata/projects/$username/my-project` with the structure above. See all options with
`catchem-utils init-project --help`.

!!! danger "Do this before collecting your first session!"

Project name rules:

- 1–15 characters: letters, digits and `-` only, starting with a letter or digit
- unique among your projects, and **case-sensitive**
- the exact same name is used in your session names (below)

## Session collection

Sessions are named like this — for **cryo and negative-stain** data collection alike:

```text
YYYY-MM-DD_$username_$project_$comment
```

Where:

- `YYYY-MM-DD` is the collection date as **year-month-day** (e.g. `2024-12-26`).
- `$username` is the cluster username of the person who **receives** the data — exactly as you log in,
  same upper/lower case.
- `$project` is the project name, exactly as created above.
- `$comment` is a short descriptive comment. **Mandatory.**

!!! danger "Allowed characters"
    The username, project and comment parts may contain only letters, digits and `-`, must start with a
    letter or digit, and can be at most 20 characters long. **No spaces, underscores or other special
    characters** inside a part — the underscores only separate the four parts.

Also keep in mind:

- **The date must be current.** Sessions dated more than 3 days in the past or more than 1 day in the
  future are held until staff approve them — a typo in the date delays your data.
- **Each session name can only be used once**, even after the data has been removed.

Please take your time to double-check the session name before starting the collection. Wrong session
naming results in a microscope ban until apology sweets have been delivered to the department 😁

## cryoSPARC projects

### cryoSPARC project naming and creation

Each project should have **one** cryoSPARC project. Both cryo and negative-stain data should be processed
in the **same** cryoSPARC project. If multiple users collect data for the same project, **each user
should create their own cryoSPARC project if they process on their own**, even if the overall project is
the same. Only if the processing is done by another person can one cryoSPARC project be shared — see
[collecting data for other users](#collecting-data-for-other-users) below. This ensures that data is
properly managed and avoids conflicts when users leave. Name the cryoSPARC project:

```text
$project-$username
```

### cryoSPARC Live sessions

cryoSPARC Live sessions are **mandatory** for cryo-EM data collection. The Live session must have the
**same** name as the session used for data collection.

## Collecting data for other users

When collecting data for another user, the session's username must **not** be the person who collects
the data but the person who should **receive** it. If that user has no cluster account yet, ask for one
a **few days in advance**. Normally cryo sessions are not a spontaneous decision 😉

Following this naming convention keeps projects organized and easy to find.
