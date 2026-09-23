# How to keep your data clean

## Clearing intermediate results

Use cryoSPARC's built-in feature to clear intermediate results as often as possible. It clears data on a
job-by-job basis instead of having to clear the entire project at once.

You can select and clear multiple jobs at once — typically around 10–15 — by ++ctrl++-clicking them. This
is especially worthwhile for refinement jobs, which generate a large amount of intermediate data. Clearing
these results regularly frees up storage space and keeps the system fast.

In RELION, use the *soft clean* function to clear intermediate results.

## Deleting unproductive jobs

Removing jobs that did not yield useful results is a crucial practice for keeping your storage clean and
your project organized. Deleting these unproductive jobs frees up valuable space and minimizes clutter.

!!! note
    In RELION, deleted jobs are moved to the `Trash` folder — empty it regularly to actually free up the
    space.

Removing these jobs also simplifies your processing tree, making it easier to navigate your workflow
in later steps.

## Clearing extract jobs

When the extracted particles are no longer needed — for example after completing a project, or after
restacking or re-extraction — clear the extract jobs. This deletes the actual particle data, which can be
quite large, while keeping the job itself, including its settings.

This way you free up storage space without losing the ability to rerun the extraction if needed. It is
one of the most effective ways to keep storage usage low.

## Rawdata on live storage

Rawdata sessions are archived automatically when they are collected. The data then exists both on the
tape archive and on the live BeeGFS storage, so removing a session from live storage does not remove the
archived copy.

This matters for the periodic rawdata cleanup: you only need to decide which of your sessions can be
removed from live storage — the removal itself is done by the staff. No manual archive check is needed.

!!! warning "Keep rawdata on live storage only while it is still needed for motion-correction related jobs"
    - motion correction itself
    - local motion correction
    - reference-based motion correction in cryoSPARC
    - Bayesian polishing in RELION

For all other processing steps, the rawdata is usually no longer needed on live storage. If it is needed
again later, recovery from tape typically takes 1–2 days. Your project only contains links to the
rawdata, so you don't need to do anything after recovery and can continue with the jobs above as soon as
the files are back.

## Deleting imported volumes

If you have imported volumes that are no longer needed, delete them. Volumes imported into cryoSPARC by
drag & drop end up in the `imports` folder of your project — please clean this folder regularly.

## Deleting projects

**cryoSPARC projects** — delete the project with the built-in feature of the cryoSPARC web interface.
This does not delete the project folder on the filesystem, so you have to delete it manually: go to the
folder containing the project in the terminal and run

```bash
rm -rf $project
```

where `$project` is the name of the project folder.

**RELION projects** — delete the project folder manually in the same way:

```bash
rm -rf $project
```

**Whole project folders** — a project under `/sbdata/projects/$username/$project` is deleted the same
way. **Delete its cryoSPARC project in the web interface first**, so it is also removed from the
cryoSPARC database. Deleting a project does not delete the rawdata: the `rawdata` folders inside the
project only contain links to the original files.

!!! danger "`rm -rf` cannot be undone"
    It deletes immediately and without asking. Double-check the folder name before pressing ++enter++.
