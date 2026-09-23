# Data transfer

!!! note "Read the [session guidelines](session_guidelines.md) before creating a session"
    Data is only transferred into your project when the project exists and the session is named correctly.

## Negative-stain data

For negative-stain data, the transfer is semi-automated (Moeller group only). Run the transfer script on
the microscope computer: it transfers the data to the cluster, where it is automatically converted to MRC
and clipped to 3700×5000 pixels. The rawdata (TIFF and MRC) is stored under:

```text
/sbdata/rawdata/JEM/$session_name
```

In your project, a session folder is created under:

```text
/sbdata/projects/$username/$project/rawdata/negative-stain/$session_name
```

This folder contains links to the MRC files in the rawdata folder. The session name is the same as the
one used for the data collection.

## Cryo-EM data

For cryo-EM data, the transfer is fully automated. The rawdata, including atlas, grid square images and
gain reference, is stored under:

```text
/sbdata/rawdata/Elenor/$session_name
```

In your project, a session folder is created under:

```text
/sbdata/projects/$username/$project/rawdata/cryo/$session_name
```

This folder contains links to the EER files in the rawdata folder. An `mrc` folder is also created with
the atlas and grid square images, and the gain reference is stored in the `gain` folder. The session name
is the same as the one used for the data collection.
