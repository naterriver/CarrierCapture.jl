var documenterSearchIndex = {"docs":
[{"location":"lib/brooglie/#Public-Documentation-1","page":"Brooglie","title":"Public Documentation","text":"","category":"section"},{"location":"lib/brooglie/#","page":"Brooglie","title":"Brooglie","text":"Documentation for the module Brooglie.jl.","category":"page"},{"location":"lib/brooglie/#","page":"Brooglie","title":"Brooglie","text":"This module is a solver for the time-independent Schödinger equation and a copy of a project https://github.com/RedPointyJackson/Brooglie (MIT License).","category":"page"},{"location":"lib/brooglie/#Index-1","page":"Brooglie","title":"Index","text":"","category":"section"},{"location":"lib/brooglie/#","page":"Brooglie","title":"Brooglie","text":"Pages = [\"brooglie.md\"]","category":"page"},{"location":"lib/brooglie/#Public-Interface-1","page":"Brooglie","title":"Public Interface","text":"","category":"section"},{"location":"lib/brooglie/#","page":"Brooglie","title":"Brooglie","text":"Modules = [CarrierCapture.Brooglie]\nPrivate = false","category":"page"},{"location":"lib/brooglie/#CarrierCapture.Brooglie","page":"Brooglie","title":"CarrierCapture.Brooglie","text":"A copy of https://github.com/RedPointyJackson/Brooglie\n\n\n\n\n\n","category":"module"},{"location":"lib/brooglie/#CarrierCapture.Brooglie.buildH-Tuple{Any}","page":"Brooglie","title":"CarrierCapture.Brooglie.buildH","text":"buildH(V; N=20, a=-1, b=1, m=1)\n\nHamiltonian of a particle of mass m in a box spanning from a to b in all D dimensions with a basis of N elements (number of partitions of the space in each coordinate). The potential V(x, y, z, ...) is a function of D arguments.\n\n\n\n\n\n","category":"method"},{"location":"lib/brooglie/#CarrierCapture.Brooglie.solve-Tuple{Any}","page":"Brooglie","title":"CarrierCapture.Brooglie.solve","text":"solve(V; N=500, a=-1, b=1, m=1, nev=N÷20, maxiter=1000)\n\nSolve the potential V(x,y,z,...) in a grid xᵢ ∈ [a,b], discretized in N steps.\n\nThe particle is asumed to have mass m (by default 1, a electron mass).\n\nThe function will return the nev first energy levels (in Hartree[1]) and its normalized eigenfunctions.\n\n[1] A Hartree is equivalent to 27.21… eV. The global variable H2eV, equal to that value, can be accessed under Brooglie.H2eV for convenience.\n\n\n\n\n\n","category":"method"},{"location":"lib/public/#Public-Documentation-1","page":"Public","title":"Public Documentation","text":"","category":"section"},{"location":"lib/public/#","page":"Public","title":"Public","text":"Documentation for CarrierCapture.jl's public interface.","category":"page"},{"location":"lib/public/#Contents-1","page":"Public","title":"Contents","text":"","category":"section"},{"location":"lib/public/#","page":"Public","title":"Public","text":"Pages = [\"public.md\"]","category":"page"},{"location":"lib/public/#Index-1","page":"Public","title":"Index","text":"","category":"section"},{"location":"lib/public/#","page":"Public","title":"Public","text":"Pages = [\"public.md\"]","category":"page"},{"location":"lib/public/#Public-Interface-1","page":"Public","title":"Public Interface","text":"","category":"section"},{"location":"lib/public/#","page":"Public","title":"Public","text":"link to Brooglie.jl Documentation","category":"page"},{"location":"lib/public/#","page":"Public","title":"Public","text":"CarrierCapture\npotential\nconf_coord","category":"page"},{"location":"lib/public/#CarrierCapture","page":"Public","title":"CarrierCapture","text":"Main module for CarrierCapture.jl – A set of codes to compute carrier capture and recombination rates in semiconducting compounds.\n\nTwo structs are exported from this module for public use:\n\npotential. Potential.\nconf_coord. Configuration coordinate.\n\nExports\n\ncalc_capt_coeff!\ncalc_overlap!\ncc_from_dict\nconf_coord\ndouble_well\nfind_crossing\nfitHarmonicParams\nfitMorseParams\nfit_pot!\ngetHarmonicCapture\ngetHarmonicQ_m\ngetMorseCapture\ngetMorseQ_m\nget_bspline\nget_spline\nharmonic\nmorse\nplot_cc!\nplot_ccs\nplot_pot!\nplot_pots\npolyfunc\npot_from_dict\npotential\nsolve1D_ev_amu\nsolve_pot!\nsqwell\n\n\n\n\n\n","category":"module"},{"location":"lib/public/#CarrierCapture.potential","page":"Public","title":"CarrierCapture.potential","text":"Stores a potential in one-dimensional space Q, with discreet points (E0, Q0) and fitting function func.\n\nFields\n\nname – the name of potential.\ncolor  – the color for plotting.\nQE_data   – the (n X 2) DataFrame of data points (Q vs Energy). \nfunc_type     – the type of fitting function (\"bspline\", \"spline\", \"harmonic\", \"polyfunc\", \"morse_poly\", \"morse\").\nparams    – the list of hyper paramters for the fitting function.\np0  – the initial paramters for the fitting function.\nQ, E  – Q and E=func(Q, p_opt; params).\nneV  – the number of eigenvalues to be evaluated.\nϵ – the list of eigenvalues \n\nConstructor\n\npotential()\n\n\n\n\n\n","category":"type"},{"location":"lib/public/#CarrierCapture.conf_coord","page":"Public","title":"CarrierCapture.conf_coord","text":"Stores two potentials with e-ph coupling constant W to calculate the capture coefficient capt_coeff(temperature).\n\nFields\n\nname – the name of conf_coord.\nV1 and V2 – the initial and fianal potentials.\nW – the e-ph coupling matrix element.\ng – the degeneracy.\ntemperature – the temperature range where capt_coeff is calculated.\ncapt_coeff – the capture coefficient.\n\nConstructor\n\nconf_coord(pot_i::potential, pot_f::potential)\n\n\n\n\n\n","category":"type"},{"location":"#CarrierCapture.jl-1","page":"Home","title":"CarrierCapture.jl","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"Documentation for CarrierCapture.jl","category":"page"},{"location":"#","page":"Home","title":"Home","text":"(Image: Logo)","category":"page"},{"location":"#","page":"Home","title":"Home","text":"A set of codes to compute carrier capture and recombination rates in semiconducting compounds. This topic has a rich history starting from the work by Huang and Rhys. Our implementation was inspired by the approach (and FORTRAN code) employed by Alkauskas and coworkers, but has been adapted to also describe anharmonic potential energy surfaces.","category":"page"},{"location":"#Installation-1","page":"Home","title":"Installation","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"The codes are written in Julia, while the scripts and Jupyter Notebooks also contain Python and use pymatgen and pawpyseed, which are assumed to be installed. The Brooglie package is used to solve the time-independent Schrödinger equation.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Install the package by:","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Pkg.add(PackageSpec(url=\"https://github.com/WMD-group/CarrierCapture.jl.git\"))","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Add /cli in to your PATH so that you can use GetPotential.jl and GetRate.jl in your work directory.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"$ julia\n\njulia> using CarrierCapture\njulia> pathof(CarrierCapture)\n\"<YOUR_PATH_TO_PACKAGE>/src/CarrierCapture.jl\"\n\n$ export PATH=<YOUR_PATH_TO_PACKAGE>/cli;$PATH","category":"page"},{"location":"#Development-1","page":"Home","title":"Development","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"The project is hosted on Github. Please use the issue tracker for feature requests, bug reports and more general questions. If you would like to contribute, please do so via a pull request.","category":"page"},{"location":"#Usage-1","page":"Home","title":"Usage","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"A typical workflow will consist of several steps, implemented in a series of short programs, which may be run from the command line. Input for the calculations is provided in input.yaml.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Prepare a sequence of atomic structure models with displacements that interpolate between two defect configurations (e.g. a site vacancy in charge states q=0 and q=+1). Run single-point energy calculations on these structures, and extract the total energies. Scripts for preprocessing may be found in script.\nGenerate configuration coordinate diagrams with fits to the two potential energy surfaces (PES) using GetPotential.jl. Solve the 1D Schrödinger equation for each PES to obtain their phonon (nuclear) wavefunctions.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Calculate the wavefunction overlap between each PES, which forms part of the temperature-dependent capture coefficient that is obtained using GetRate.jl.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"(Image: schematics)","category":"page"},{"location":"#Examples-1","page":"Home","title":"Examples","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"The following examples are provided to illustrate some of the applications of these codes. The input data has been generated from density functional theory (DFT) using VASP, but the framework can easily be adapted to accept output from other electronic structure calculators. ","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Sn_Zn in CZTS: Harmonic approximation\nDX-center in GaAs: Anharmonic fitting","category":"page"},{"location":"#Theory-1","page":"Home","title":"Theory","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"The electronic matrix element frequently causes feelings of discomfort (Stoneham, 1981)","category":"page"},{"location":"#","page":"Home","title":"Home","text":"The capture of electrons or holes by point defects in a crystalline materials requires the consideration of a number of factors including the coupling between electronic and vibrational degrees of freeedom. Many theories and approximations have been developed to describe the reaction kinetics.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"The capture coefficient between an initial and final state for this computational set up is given by (eq. 22 in Alkauskas and coworkers):","category":"page"},{"location":"#","page":"Home","title":"Home","text":"(Image: equation)","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Here, V is the volume of the supercell, W<sub>if</sub> is the electron-phonon overlap and ξ<sub>im</sub> and ξ<sub>fn</sub> describe the wavefunctions of the m<sup>th</sup> and n<sup>th</sup> phonons in the initial i and final f states. The final delta-function term serves to conserve energy and in practice is replaced by a smearing Gaussian of finite width σ.","category":"page"},{"location":"#User-Warning-1","page":"Home","title":"User Warning","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"The values produced by this type of analysis procedure are sensitive to the quality of the input.  We expect that most input data will have been generated by DFT where the basis set, k-points, and ionic forces have been carefully converged. In addition, the alignment of energy surfaces for defects in different charge states requires appropriate finite-size corrections (e.g. see Freysoldt and coworkers).","category":"page"},{"location":"#Extended-Reading-List-1","page":"Home","title":"Extended Reading List","text":"","category":"section"},{"location":"#Theory-Development-1","page":"Home","title":"Theory Development","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"Heny and Lang, Nonradiative capture and recombination by multiphonon emission in GaAs and GaP (1977)","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Seminal contribution that introduces many important concepts","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Huang, Adiabatic approximation theory and static coupling theory of nonradiative transition (1981)","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Context for the static approximation that we employ","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Stoneham, Non-radiative transitions in semiconductors (1981)","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Review on theory and various models of recombination","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Markvart, Determination of potential surfaces from multiphonon transition rates (1981)","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Discussion and treatment of anharmonicity","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Markvart, Semiclassical theory of non-radiative transitions (1981)","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Semiclassical treatment of matrix elements following Landau and Holstein","category":"page"},{"location":"#Applications-1","page":"Home","title":"Applications","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"Kim et al, Anharmonic Lattice Relaxation during Non-radiative Carrier Capture (2019)\nKim et al, Lone-pair effect on carrier capture in Cu<sub>2</sub>ZnSnS<sub>4</sub> solar cells (2019)\nKim et al, Identification of killer defects in kesterite thin-film solar cells (2018)\nWickramaratne et al, Iron as a source of efficient Shockley-Read-Hall recombination in GaN (2016)","category":"page"}]
}
