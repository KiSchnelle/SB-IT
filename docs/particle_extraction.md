# Guidelines on particle extraction

Particles never need to be extracted at full box size at the start. Binning 2–4 times is more than
enough to sort out bad particles.

## Choosing the right box size

The box size should be around 1.3 to 2 times your particle diameter:

<div class="formula">
<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
  <mrow>
    <mi>Box size</mi><mo>(px)</mo>
    <mo>=</mo>
    <mfrac>
      <mrow><mi>Particle diameter</mi><mo>(Å)</mo></mrow>
      <mrow><mi>Pixel size</mi><mo>(Å/px)</mo></mrow>
    </mfrac>
    <mo>×</mo>
    <mn>1.3–2</mn>
  </mrow>
</math>
</div>

To reduce computation time, the box size should only have 2, 3, 5 and 7 as prime factors — the Fourier
transforms used everywhere in processing are fastest for these sizes. Good box sizes are:

```text
  32,   36,   40,   42,   48,   56,   60,   64,   70,   72,   80,
  84,   90,   96,  100,  108,  112,  120,  128,  144,  160,  180,
 192,  200,  216,  224,  240,  256,  270,  288,  300,  320,  324,
 336,  384,  400,  432,  448,  450,  512,  576,  640,  648,  672,
 720,  768,  784,  810,  864,  882, 1024, 1152, 1280, 1296, 1344,
1440, 1568, 1620, 1728, 1792, 2000, 2048
```

For binning, the **binned** box (in cryoSPARC: *Fourier crop to box size*) must be a good size as well.
Dividing by the binning factor doesn't always give one — pick the closest good size instead.

!!! example "Worked example"
    - Particle diameter 150 Å, pixel size 0.83 Å/px → 150 / 0.83 ≈ 181 px → × 1.3–2 = **235–361 px**.
    - Pick a good size in that range, e.g. **256**. Binned 4×: 256 / 4 = **64** — also a good size. ✔
    - Had you picked 270: 270 / 4 = 67.5 isn't even a whole number. Crop to **72** (≈ 3.75× binning)
      or **64** instead.
    - The binned pixel size is then 0.83 × 256 / 64 = 3.32 Å/px, so the Nyquist limit is 2 × 3.32 ≈
      **6.6 Å**. Once your map approaches that, re-extract unbinned (next section).

## When to unbin particles

In cryo-EM workflows, initial processing is often carried out on binned data. Binning reduces the image
resolution by combining adjacent pixels, which greatly speeds up early particle picking, alignment, and
classification. This lower resolution is sufficient to discard bad particles and perform initial
sorting while keeping computational demands manageable.

However, as your reconstruction improves, you'll eventually reach a point where the resolution of your
binned data nears the Nyquist limit — the maximum detail that your pixel size can theoretically resolve
(2 × your pixel size). At this stage, continuing with binned particles means you are losing critical
high-resolution details. Re-extracting the particles at the original, unbinned pixel size allows you to
capture these finer features and improve the overall resolution of your final map.

To determine when you've reached the resolution limit, monitor the Fourier Shell Correlation (FSC)
curve. When the FSC indicates that your reconstruction is approaching half the sampling frequency (the
Nyquist limit), the benefits of using the full-resolution data outweigh the computational cost. In
practical terms: if your current resolution is close to the theoretical maximum given your pixel size,
it's time to switch to unbinned particles to push the resolution further.

## When to restack

After several rounds of classification and quality filtering, you may remove a significant portion —
often around 50% — of your particles. At this point, it is beneficial to restack your dataset by creating
a new particle stack that contains only the high-quality particles. This reduction in data size speeds up
loading the particles onto the SSDs of the compute nodes.

While restacking might be less critical for binned data due to its smaller file size, it becomes
especially important when working with unbinned data, where larger file sizes can significantly impact
data transfer and processing times.

Additionally, if your dataset contains multiple conformations, it can be advantageous to restack the
particles for each conformation separately. Processing them in distinct jobs ensures that only the
necessary particles are loaded for each conformation, avoiding the overhead of loading unwanted
particles from an older, larger stack.
