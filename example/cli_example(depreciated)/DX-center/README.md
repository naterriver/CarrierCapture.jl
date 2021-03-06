# Usage

A typical usage will consist of about three steps, implemented in a series of short programs which may be run from the command line. Input for the calculations is provided in `input.yaml`.

## 1. Preparation

Before `CarrierCapture`, you need to calculate potential energy surfaces of atomic vibrations (one-dimensional Configuration Coordinate diagram; `1D-CC`) and _e-ph_ coupling matrix element (`W_if`). Prepare a sequence of structures with displacements which interpolate between two defect states. Run single-point energy calculations on these structures, and extract the total energies. Scripts for preprocessing can be found in `/script` which require a python library [`pymatgen`](http://pymatgen.org). Find more [details](../README.md).

## 2. Potential

1. Generate CC diagrams with polynomial fits to the data. Solve these potential energy surfaces for the phonon wavefunctions for each defect. Use `GetPotential.jl` as follows,
```
GetPotential.jl [-i INPUT] [--dryrun] [-p] [-v] 
optional arguments:
-i, --input INPUT     INPUT = input file in yaml format (default:input.yaml)
--dryrun              Turn off the Schroedinger equation solver
-p, --plot            Plot potentials (saved as potential.pdf)
-v, --verbose         Write verbose capture coefficient
```

See the sample input file `example/DX-center/input.yaml` and `example/DX-center/potential_<>.csv`. Example `input.yaml`:

    ```yaml
    # Qi and Qf [amu^(1/2)*Å] define the domain over which the potentials will be solved (Q ∈ [Qi, Qf]), discretised in `NQ` steps
    Qi: -5
    Qf: 35
    NQ: 3000
    
    # PLOT INPUT
    # defining plot axes limits for the E vs Q (solving potentials) and the C vs 1/T (carrier capture rate vs inverse temperature) plots
    plot:
        Qmin: 5
        Qmax: 25
        Emin: -0.2
        Emax: 3.7
        Cmin: 1E-30
        Cmax: 1E-2
        invTmin: 1
        invTmax: 17
    
    # POTENTIAL INPUT
    # potential:    contains all information about a given potential including name
    # data:         may be entered as Q and E values or loaded from csv files. If
    #               from file, each potential is read assuming Q and E in columns 1 and 2 respectively.
    # nev:          the number of energy levels to be solved for the potentials (eigenstates).
    # E0:           energy offset of potential minimum with respoect to zero [eV]
    # function:     defines the type and the parameters of function used to fit the potential
    
    # spline and bspline: bspline assumes the data is uniformly spaced on the grid
    potentials:
        - potential:
            name: d0+e+h
            data:
                Q: 0.0000 0.8070 1.6142 2.4214 3.2286 4.0357 4.8428 5.6501 6.4571 7.2643 8.0715 8.8787 9.6857 10.4930 11.3000 12.1072 12.9144 13.7215 14.5287 15.3359 16.1430 16.9502 17.7574 18.5644 19.3716 20.1788 20.9859 21.7931 22.6002
                E: -953.1843 -991.3164 -1019.6837 -1041.2625 -1058.1281 -1070.3129 -1078.6854 -1084.3352 -1088.1507 -1090.7382 -1092.4813 -1093.6187 -1094.3120 -1094.6724 -1094.7791 -1094.6931 -1094.4715 -1094.2920 -1094.1575 -1094.0447 -1093.9488 -1093.8619 -1093.7599 -1093.6182 -1093.4127 -1093.1290 -1092.7661 -1092.3560 -1091.9551
            nev: 25
            E0: 1.69834
            function:
                type: bspline
            color: "#b2182b"
        - potential:
            name: DX-+h
            data: Potential_DX-.csv
            nev: 55
            E0: 1.69834
            function:
                type: spline
                params:
                    order: 4
                    smoothness: 0.001
                    weight: 1 1 1 1 1 0.5 0.4 0.4 0.5 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
            color: "#2166ac"
        - potential:
            name: d0
            data: Potential_d0.csv
            nev: 130
            E0: 0
            function:
                type: bspline
            color: "#b2182b"
    
    findcross:
        - crossing:
            pot_name_1: d0+e+h
            pot_name_2: DX-+h
        - crossing:
            pot_name_1: DX-+h
            pot_name_2: d0
    ```

    <center>
    <img src="potential.png" width="500" />
    </center>

2. Make sure your best-fit curves describe the crossing point well and number of eigenvalues `nev` are large enough. Find `potential.pdf` (run `GetPotential.jl -p` to enable plotting).

## 3. Capture rate

1. Calculate the overlap between vibrational wavefunctions of initial and fianal potentials to give the capture coefficient for a specified temperature range (`GetRate.jl`). Usage is as follows,
```
GetRate.jl [-i INPUT] [-w] [-p] [-v]
optional arguments:
-i, --input INPUT     INPUT = input file in yaml format (default:input.yaml)
-w, --wave WAVE       WAVE = wave function serialized (default:wave.jld)
-p, --plot            plot potentials 
-v, --verbose         write verbose capture coefficient
``` 

You need `wave.jld` calculated by `GetPotential.jl` in [the previous step](#2.-Potential). Example `input.yaml`:

    ```yaml
    # Qi and Qf [amu^(1/2)*Å] define the domain over which the potentials will be solved (Q ∈ [Qi, Qf]), discretised in `NQ` steps
    Qi: -5
    Qf: 35
    NQ: 3000

    # PLOT INPUT
    # defining plot axes limits for the E vs Q (solving potentials) and the C vs 1/T (carrier capture rate vs inverse temperature) plots
    plot:
        Cmin: 1E-30
        Cmax: 1E-2
        invTmin: 1
        invTmax: 17

    # CAPTURE INPUT

    # V: 	volume of supercell [cm³]
    # g: 	configurational degeneracy 
    # W: 	electron-phonon coupling matrix element [ev/(amu^(1/2)*Å)]
    # Tmin, Tmax: temperature range for calculating capture coefficient [K]
    # NT: 	number of grid points for temperature dependent calculations

    # cut_off: energetic difference criteria for overlap of phonons (Δϵ < cut_off) [eV]
    # σ: amount of smearing of delta functions for determining phonon overlap

    captures:
        Tmin: 10
        Tmax: 800
        NT: 100
        Volume: 4.72276E-21
        cut_off: 0.25
        σ: 0.010
        ccs:
            - cc:
                W: 0.06754919103705884
                g: 1
                initial: d0+e+h
                final: DX-+h
            - cc:
                W: 0.021733641278758646
                g: 1
                initial: DX-+h
                final: d0
    ```
    <center>
    <img src="captcoeff.png" width="500" />
    </center>

2.  Calculate the lifetimes and rates for a given defect. You may need more tools. 😼

