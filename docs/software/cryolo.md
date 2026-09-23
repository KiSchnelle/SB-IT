# Using crYOLO

## Load the crYOLO environment

crYOLO is provided as a conda environment. Load the Spack-provided miniforge3 and activate it:

```bash
spack load miniforge3
source $(spack location -i miniforge3)/bin/activate
conda activate cryolo
```

If `$MINIFORGE3_ROOT` is set after loading, you can equivalently run `source $MINIFORGE3_ROOT/bin/activate`
before `conda activate cryolo`. Now you can run crYOLO commands directly in your terminal.

!!! note "napari boxmanager"
    The napari boxmanager does not work over X11 forwarding and has to be installed locally on your own
    computer. See the [crYOLO installation guide](https://cryolo.readthedocs.io/en/stable/installation.html).
