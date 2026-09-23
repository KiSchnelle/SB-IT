# Using EMAN2

## Load the EMAN2 environment

EMAN2 is provided as a conda environment. Load the Spack-provided miniforge3 and activate it:

```bash
spack load miniforge3
source $(spack location -i miniforge3)/bin/activate
conda activate eman2
```

If `$MINIFORGE3_ROOT` is set after loading, you can equivalently run `source $MINIFORGE3_ROOT/bin/activate`
before `conda activate eman2`. Now you can run EMAN2 commands directly in your terminal.
